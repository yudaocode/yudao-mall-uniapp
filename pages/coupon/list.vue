<!-- 优惠券中心  -->
<template>
  <s-layout title="优惠券" :bgStyle="{ color: '#f2f2f2' }">
    <su-sticky bgColor="#fff">
      <su-tabs
        :list="tabMaps"
        :scrollable="false"
        @change="onTabsChange"
        :current="state.currentTab"
      ></su-tabs>
    </su-sticky>
    <s-empty
      v-if="state.pagination.total === 0"
      icon="/static/coupon-empty.png"
      text="暂无优惠券"
    ></s-empty>
    <template v-if="state.currentTab == '0'">
      <view v-for="item in state.pagination.data" :key="item.id">
        <s-coupon-list
          :data="item"
          @tap="
            sheep.$router.go('/pages/coupon/detail', {
              id: item.id,
            })
          "
        >
          <template #default>
            <button
              class="ss-reset-button card-btn ss-flex ss-row-center ss-col-center"
              :class="item.get_status != 'can_get' ? 'border-btn' : ''"
              @click.stop="getBuy(item.id)"
              :disabled="item.get_status != 'can_get'"
            >
              {{ item.get_status_text }}
            </button>
          </template>
        </s-coupon-list>
      </view>
    </template>
    <template v-else>
      <view v-for="item in state.pagination.data" :key="item.id">
        <s-coupon-list
          :data="item"
          type="user"
          @tap="
            sheep.$router.go('/pages/coupon/detail', {
              id: item.coupon_id,
              user_coupon_id: item.id,
            })
          "
        >
          <template #default>
            <button
              class="ss-reset-button card-btn ss-flex ss-row-center ss-col-center"
              :class="
                item.status == 'can_get' || item.status == 'can_use'
                  ? ''
                  : item.status == 'used' || item.status == 'expired'
                  ? 'disabled-btn'
                  : 'border-btn'
              "
              :disabled="item.status != 'can_get' && item.status != 'can_use'"
              @click.stop="
                sheep.$router.go('/pages/coupon/detail', {
                  id: item.coupon_id,
                  user_coupon_id: item.id,
                })
              "
            >
              {{ item.status_text }}
            </button>
          </template>
        </s-coupon-list>
      </view>
    </template>

    <uni-load-more
      v-if="state.pagination.total > 0"
      :status="state.loadStatus"
      :content-text="{
        contentdown: '上拉加载更多',
      }"
      @tap="loadmore"
    />
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import _ from 'lodash';

  const pagination = {
    data: [],
    current_page: 1,
    total: 1,
    last_page: 1,
  };
  // 数据
  const state = reactive({
    currentTab: 0,
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
    type: '',
  });

  const tabMaps = [
    {
      name: '领券中心',
      value: 'all',
    },
    {
      name: '已领取',
      value: 'geted',
    },
    {
      name: '已使用',
      value: 'used',
    },
    {
      name: '已失效',
      value: 'expired',
    },
  ];
  function onTabsChange(e) {
    state.pagination = pagination
    state.currentTab = e.index;
    state.type = e.value;
    if (state.currentTab == 0) {
      getData();
    } else {
      getCoupon();
    }
  }
  async function getData(page = 1, list_rows = 5) {
    state.loadStatus = 'loading';
    const res = await sheep.$api.coupon.list({ list_rows, page });
    if (res.error === 0) {
      let couponlist = _.concat(state.pagination.data, res.data.data);
      state.pagination = {
        ...res.data,
        data: couponlist,
      };
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }

  async function getCoupon(page = 1, list_rows = 5) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.coupon.userCoupon({
      type: state.type,
      list_rows,
      page,
    });
    if (res.error === 0) {
      if (page >= 2) {
        let couponlist = _.concat(state.pagination.data, res.data.data);
        state.pagination = {
          ...res.data,
          data: couponlist,
        };
      } else {
        state.pagination = res.data;
      }
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  async function getBuy(id) {
    const { error, msg } = await sheep.$api.coupon.get(id);
    if (error === 0) {
      uni.showToast({
        title: msg,
      });
      setTimeout(() => {
        state.pagination = pagination
        getData();
      }, 1000);
    }
  }

  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      if (state.currentTab == 0) {
        getData(state.pagination.current_page + 1);
      } else {
        getCoupon(state.pagination.current_page + 1);
      }
    }
  }
  onLoad((Option) => {
    if (Option.type === 'all' || !Option.type) {
      getData();
    } else {
      state.type = Option.type;
      Option.type === 'geted'
        ? (state.currentTab = 1)
        : Option.type === 'used'
        ? (state.currentTab = 2)
        : (state.currentTab = 3);
      getCoupon();
    }
  });
  onReachBottom(() => {
    loadmore();
  });
</script>
<style lang="scss" scoped>
  .card-btn {
    // width: 144rpx;
    padding: 0 16rpx;
    height: 50rpx;
    border-radius: 40rpx;
    background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    color: #ffffff;
    font-size: 24rpx;
    font-weight: 400;
  }
  .border-btn {
    background: linear-gradient(90deg, var(--ui-BG-Main-opacity-4), var(--ui-BG-Main-light));
    color: #fff !important;
  }
  .disabled-btn {
    background: #cccccc;
    background-color: #cccccc !important;
    color: #fff !important;
  }
</style>
