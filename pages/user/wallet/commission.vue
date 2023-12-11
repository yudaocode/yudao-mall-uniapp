<template>
  <s-layout class="wallet-wrap" title="佣金">
    <!-- 钱包卡片 -->
    <view class="header-box ss-flex ss-row-center ss-col-center">
      <view class="card-box ui-BG-Main ui-Shadow-Main">
        <view class="card-head ss-flex ss-col-center">
          <view class="card-title ss-m-r-10">我的佣金（元）</view>
          <view
            @tap="state.showMoney = !state.showMoney"
            class="ss-eye-icon"
            :class="state.showMoney ? 'cicon-eye' : 'cicon-eye-off'"
          ></view>
        </view>
        <view class="ss-flex ss-row-between ss-col-center ss-m-t-30">
          <view class="money-num">{{ state.showMoney ? userInfo.commission : '*****' }}</view>
          <view class="ss-flex">
            <view class="ss-m-r-20">
              <button
                class="ss-reset-button withdraw-btn"
                @tap="sheep.$router.go('/pages/pay/withdraw')"
              >
                提现
              </button>
            </view>
            <button class="ss-reset-button balance-btn ss-m-l-20" @tap="state.showModal = true">
              转余额
            </button>
          </view>
        </view>

        <view class="ss-flex">
          <view class="loading-money">
            <view class="loading-money-title">待入账佣金</view>
            <view class="loading-money-num">{{
              state.showMoney ? agentInfo.pending_reward || '0.00' : '*****'
            }}</view>
          </view>
          <view class="loading-money ss-m-l-100">
            <view class="loading-money-title">可提现佣金</view>
            <view class="loading-money-num">{{
              state.showMoney ? userInfo.commission || '0.00' : '*****'
            }}</view>
          </view>
        </view>
      </view>
    </view>
    <su-sticky>
      <!-- 统计 -->
      <view class="filter-box ss-p-x-30 ss-flex ss-col-center ss-row-between">
        <uni-datetime-picker
          v-model="state.data"
          type="daterange"
          @change="onChangeTime"
          :end="state.today"
        >
          <button class="ss-reset-button date-btn">
            <text>{{ dateFilterText }}</text>
            <text class="cicon-drop-down ss-seldate-icon"></text>
          </button>
        </uni-datetime-picker>

        <view class="total-box">
          <view class="ss-m-b-10">总收入￥{{ state.pagination.income.toFixed(2) }}</view>
          <view>总支出￥{{ (-state.pagination.expense).toFixed(2) }}</view>
        </view>
      </view>
      <su-tabs
        :list="tabMaps"
        @change="onChangeTab"
        :scrollable="false"
        :current="state.currentTab"
      ></su-tabs>
    </su-sticky>
    <s-empty
      v-if="state.pagination.total === 0"
      icon="/static/data-empty.png"
      text="暂无数据"
    ></s-empty>
    <!-- 转余额弹框 -->
    <su-popup
      :show="state.showModal"
      type="bottom"
      round="20"
      @close="state.showModal = false"
      showClose
    >
      <view class="ss-p-x-20 ss-p-y-30">
        <view class="model-title ss-m-b-30 ss-m-l-20">转余额</view>
        <view class="model-subtitle ss-m-b-100 ss-m-l-20">将您的佣金转到余额中继续消费</view>
        <view class="input-box ss-flex ss-col-center border-bottom ss-m-b-70 ss-m-x-20">
          <view class="unit">￥</view>
          <uni-easyinput
            :inputBorder="false"
            class="ss-flex-1 ss-p-l-10"
            v-model="state.amount"
            type="number"
            placeholder="请输入金额"
          />
        </view>
        <button
          class="ss-reset-button model-btn ui-BG-Main-Gradient ui-Shadow-Main"
          @tap="onConfirm"
        >
          确定
        </button>
      </view>
    </su-popup>
    <!-- 钱包记录 -->
    <view v-if="state.pagination.total > 0">
      <view
        class="wallet-list ss-flex border-bottom"
        v-for="item in state.pagination.data"
        :key="item.id"
      >
        <view class="list-content">
          <view class="title-box ss-flex ss-row-between ss-m-b-20">
            <text class="title ss-line-1"
              >{{ item.event_text }}{{ item.memo ? '-' + item.memo : '' }}</text
            >
            <view class="money">
              <text v-if="item.amount >= 0" class="add">+{{ item.amount }}</text>
              <text v-else class="minus">{{ item.amount }}</text>
            </view>
          </view>
          <text class="time">{{ item.create_time }}</text>
        </view>
      </view>
    </view>

    <!-- <u-gap></u-gap> -->
    <uni-load-more
      v-if="state.pagination.total > 0"
      :status="state.loadStatus"
      :content-text="{
        contentdown: '上拉加载更多',
      }"
    />
  </s-layout>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import dayjs from 'dayjs';
  import _ from 'lodash';

  const headerBg = sheep.$url.css('/static/img/shop/user/wallet_card_bg.png');

  // 数据
  const pagination = {
    data: [],
    current_page: 1,
    total: 1,
    last_page: 1,
    expense: 0,
    income: 0,
  };
  const state = reactive({
    showMoney: false,
    date: [],
    currentTab: 0,
    pagination,
    loadStatus: '',
    showModal: false,
    today: '',
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
  const userInfo = computed(() => sheep.$store('user').userInfo);

  const agentInfo = computed(() => sheep.$store('user').agentInfo);

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
      type: 'commission',
      tab: tabMaps[state.currentTab].value,
      list_rows,
      page,
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

  function onChangeTab(e) {
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

  // 确认操作
  async function onConfirm() {
    if (state.amount <= 0) {
      sheep.$helper.toast('请输入正确的金额');
      return;
    }
    uni.showModal({
      title: '提示',
      content: '确认把您的佣金转入到余额钱包中？',
      success: async function (res) {
        if (res.confirm) {
          const { error } = await sheep.$api.commission.transfer({
            amount: state.amount,
          });
          if (error === 0) {
            state.showModal = false;
            sheep.$store('user').getInfo();
            onChangeTab({ index: 0 });
          }
        }
      },
    });
  }
  async function getAgentInfo() {
    const { code, data } = await sheep.$store('user').getAgentInfo();
  }
  onLoad(async (options) => {
    state.today = dayjs().format('YYYY-MM-DD');
    state.date = [state.today, state.today];
    getLogList();
    getAgentInfo();
  });

  onReachBottom(() => {
    if (state.loadStatus !== 'noMore') {
      getLogList(state.pagination.current_page + 1);
    }
  });
</script>

<style lang="scss" scoped>
  // 钱包
  .header-box {
    background-color: $white;
    padding: 30rpx;

    .card-box {
      width: 100%;
      min-height: 300rpx;
      padding: 40rpx;
      background-size: 100% 100%;
      border-radius: 30rpx;
      overflow: hidden;
      position: relative;
      z-index: 1;
      box-sizing: border-box;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        background: v-bind(headerBg) no-repeat;
        pointer-events: none;
      }

      .card-head {
        color: $white;
        font-size: 24rpx;
      }

      .ss-eye-icon {
        font-size: 40rpx;
        color: $white;
      }

      .money-num {
        font-size: 40rpx;
        line-height: normal;
        font-weight: 500;
        color: $white;
        font-family: OPPOSANS;
      }

      .reduce-num {
        font-size: 26rpx;
        font-weight: 400;
        color: $white;
      }

      .withdraw-btn {
        width: 120rpx;
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 30px;
        font-size: 24rpx;
        font-weight: 500;
        background-color: $white;
        color: var(--ui-BG-Main);
      }

      .balance-btn {
        width: 120rpx;
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 30px;
        font-size: 24rpx;
        font-weight: 500;
        color: $white;
        border: 1px solid $white;
      }
    }
  }

  .loading-money {
    margin-top: 56rpx;
    .loading-money-title {
      font-size: 24rpx;
      font-weight: 400;
      color: #ffffff;
      line-height: normal;
      margin-bottom: 30rpx;
    }

    .loading-money-num {
      font-size: 30rpx;
      font-family: OPPOSANS;
      font-weight: 500;
      color: #fefefe;
    }
  }

  // 筛选

  .filter-box {
    height: 120rpx;
    padding: 0 30rpx;
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

  // tab
  .wallet-tab-card {
    .tab-item {
      height: 80rpx;
      position: relative;

      .tab-title {
        font-size: 30rpx;
      }

      .cur-tab-title {
        font-weight: $font-weight-bold;
      }

      .tab-line {
        width: 60rpx;
        height: 6rpx;
        border-radius: 6rpx;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 2rpx;
        background-color: var(--ui-BG-Main);
      }
    }
  }

  // 钱包记录
  .wallet-list {
    padding: 30rpx;
    background-color: #ffff;

    .head-img {
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
      background: $gray-c;
    }

    .list-content {
      justify-content: space-between;
      align-items: flex-start;
      flex: 1;

      .title {
        font-size: 28rpx;
        color: $dark-3;
        width: 400rpx;
      }

      .time {
        color: $gray-c;
        font-size: 22rpx;
      }
    }

    .money {
      font-size: 28rpx;
      font-weight: bold;
      font-family: OPPOSANS;

      .add {
        color: var(--ui-BG-Main);
      }

      .minus {
        color: $dark-3;
      }
    }
  }

  .model-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
  }

  .model-subtitle {
    font-size: 26rpx;
    color: #c2c7cf;
  }

  .model-btn {
    width: 100%;
    height: 80rpx;
    border-radius: 40rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: normal;
  }

  .input-box {
    height: 100rpx;

    .unit {
      font-size: 48rpx;
      color: #333;
      font-weight: 500;
      line-height: normal;
    }

    .uni-easyinput__placeholder-class {
      font-size: 30rpx;
      height: 40rpx;
      line-height: normal;
    }
  }
</style>
