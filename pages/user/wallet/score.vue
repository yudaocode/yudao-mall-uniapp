<!-- 页面  -->
<template>
  <s-layout class="wallet-wrap" title="我的积分" navbar="inner">
    <view
      class="header-box ss-flex ss-flex-col ss-row-center ss-col-center"
      :style="[
        {
          marginTop: '-' + Number(statusBarHeight + 88) + 'rpx',
          paddingTop: Number(statusBarHeight + 88) + 'rpx',
        },
      ]"
    >
      <view class="header-bg"><view class="bg"></view></view>
      <view class="score-box ss-flex-col ss-row-center ss-col-center">
        <view class="ss-m-b-30">
          <text class="all-title ss-m-r-8">当前积分</text>
          <!-- <text class="cicon-help-o"></text> -->
        </view>
        <text class="all-num">{{ userInfo.score || 0 }}</text>
      </view>
    </view>
    <!-- tab -->
    <su-sticky :customNavHeight="sys_navBar">
      <!-- 统计 -->
      <view class="filter-box ss-p-x-30 ss-flex ss-col-center ss-row-between">
        <uni-datetime-picker v-model="state.data" type="daterange" @change="onChangeTime" :end="state.today">
          <button class="ss-reset-button date-btn">
            <text>{{ dateFilterText }}</text>
            <text class="cicon-drop-down ss-seldate-icon"></text>
          </button>
        </uni-datetime-picker>

        <view class="total-box">
          <view class="ss-m-b-10">总收入￥{{ state.pagination.income }}</view>
          <view>总支出￥{{ -state.pagination.expense }}</view>
        </view>
      </view>
      <su-tabs
        :list="tabMaps"
        @change="onChange"
        :scrollable="false"
        :current="state.currentTab"
      ></su-tabs>
    </su-sticky>
    <!-- list -->
    <view class="list-box">
      <view v-if="state.pagination.total > 0">
        <view
          class="list-item ss-flex ss-col-center ss-row-between"
          v-for="item in state.pagination.data"
          :key="item.id"
        >
          <view class="ss-flex-col">
            <view class="name">{{ item.event_text }}{{ item.memo ? '-' + item.memo : '' }}</view>
            <view class="time">{{ item.create_time }}</view>
          </view>
          <view class="add" v-if="item.amount > 0">+{{ parseInt(item.amount) }}</view>
          <view class="minus" v-else>{{ parseInt(item.amount) }}</view>
        </view>
      </view>
      <s-empty v-else text="暂无数据" icon="/static/data-empty.png" />
    </view>

    <uni-load-more
      v-if="state.pagination.total > 0"
      :status="state.loadStatus"
      :content-text="{
        contentdown: '上拉加载更多',
      }"
      @tap="onLoadMore"
    />
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import _ from 'lodash';
  import dayjs from 'dayjs';
  import { onPageScroll } from '@dcloudio/uni-app';
  onPageScroll(() => {});

  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  const userInfo = computed(() => sheep.$store('user').userInfo);
  const sys_navBar = sheep.$platform.navbar;

  const pagination = {
    data: [],
    current_page: 1,
    total: 1,
    last_page: 1,
    expense: 0,
    income: 0,
  };

  const state = reactive({
    currentTab: 0,
    pagination,
    loadStatus: '',
    date: [],
    today:'',
  });

  const tabMaps = [
    {
      name: '全部',
      value: 'all',
    },

    {
      name: '收入',
      value: 'income',
    },
    {
      name: '支出',
      value: 'expense',
    },
  ];

  const dateFilterText = computed(() => {
    if (state.date[0] === state.date[1]) {
      return state.date[0];
    } else {
      return state.date.join('~');
    }
  });

  async function getLogList(page = 1, list_rows = 8) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.user.wallet.log({
      type: 'score',
      list_rows,
      page,
      tab: tabMaps[state.currentTab].value,
      date: appendTimeHMS(state.date),
    });
    if (res.error === 0) {
      let list = _.concat(state.pagination.data, res.data.list.data);
      state.pagination = {
        ...res.data.list,
        data: list,
        income: res.data.income,
        expense: res.data.expense,
      };
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  onLoad(async (options) => {
    state.today = dayjs().format('YYYY-MM-DD');
    state.date = [state.today, state.today];
    getLogList();
  });

  function onChange(e) {
    state.pagination = pagination;
    state.currentTab = e.index;
    getLogList();
  }
  function onChangeTime(e) {
    state.date[0] = e[0];
    state.date[1] = e[e.length - 1];
    state.pagination = pagination;
    getLogList();
  }

  function appendTimeHMS(arr) {
    return [arr[0] + ' 00:00:00', arr[1] + ' 23:59:59'];
  }

  function onLoadMore() {
    if (state.loadStatus !== 'noMore') {
      getLogList(state.pagination.current_page + 1);
    }
  }
  onReachBottom(() => {
    onLoadMore();
  });
</script>

<style lang="scss" scoped>
  .header-box {
    width: 100%;
    background: linear-gradient(180deg, var(--ui-BG-Main) 0%, var(--ui-BG-Main-gradient) 100%)
      no-repeat;
    background-size: 750rpx 100%;
    padding: 0 0 120rpx 0;
    box-sizing: border-box;

    .score-box {
      height: 100%;

      .all-num {
        font-size: 50rpx;
        font-weight: bold;
        color: #fff;
        font-family: OPPOSANS;
      }

      .all-title {
        font-size: 26rpx;
        font-weight: 500;
        color: #fff;
      }

      .cicon-help-o {
        color: #fff;
        font-size: 28rpx;
      }
    }
  }
  // 筛选
  .filter-box {
    height: 114rpx;
    background-color: $bg-page;

    .total-box {
      font-size: 24rpx;
      font-weight: 500;
      color: $dark-9;
    }

    .date-btn {
      background-color: $white;
      line-height: 54rpx;
      border-radius: 27rpx;
      padding: 0 20rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: $dark-6;

      .ss-seldate-icon {
        font-size: 50rpx;
        color: $dark-9;
      }
    }
  }

  .list-box {
    .list-item {
      background: #fff;
      border-bottom: 1rpx solid #dfdfdf;
      padding: 30rpx;

      .name {
        font-size: 28rpx;

        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 28rpx;
        margin-bottom: 20rpx;
      }

      .time {
        font-size: 24rpx;

        font-weight: 500;
        color: rgba(196, 196, 196, 1);
        line-height: 24px;
      }

      .add {
        font-size: 30rpx;

        font-weight: 500;
        color: #e6b873;
      }

      .minus {
        font-size: 30rpx;

        font-weight: 500;
        color: $dark-3;
      }
    }
  }
</style>
