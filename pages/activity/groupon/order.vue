<!-- 页面 -->
<template>
  <s-layout title="我的拼团">
    <su-sticky bgColor="#fff">
      <su-tabs
        :list="tabMaps"
        :scrollable="false"
        @change="onTabsChange"
        :current="state.currentTab"
      ></su-tabs>
    </su-sticky>
    <s-empty v-if="state.pagination.total === 0" icon="/static/goods-empty.png"> </s-empty>
    <view v-if="state.pagination.total > 0">
      <view
        class="order-list-card-box bg-white ss-r-10 ss-m-t-14 ss-m-20"
        v-for="order in state.pagination.data"
        :key="order.id"
      >
        <view class="order-card-header ss-flex ss-col-center ss-row-between ss-p-x-20">
          <view class="order-no">订单号：{{ order.my.order.order_sn }}</view>
          <view
            class="ss-font-26"
            :class="
              order.status === 'ing'
                ? 'warning-color'
                : order.status === 'invalid'
                ? 'danger-color'
                : 'success-color'
            "
            >{{ order.status_text }}</view
          >
        </view>
        <view class="border-bottom">
          <s-goods-item
            :img="order.goods.image"
            :title="order.goods.title"
            :price="order.goods.price[0]"
            priceColor="#E1212B"
            radius="20"
          >
            <template #groupon>
              <view class="ss-flex">
                <view class="sales-title"> {{ order.num }}人团 </view>
                <!-- <view class="num-title ss-m-l-20"> 已拼{{ order.goods.sales }}件 </view> -->
              </view>
            </template>
          </s-goods-item>
        </view>
        <view class="order-card-footer ss-flex ss-row-right ss-p-x-20">
          <button
            class="detail-btn ss-reset-button"
            @tap="sheep.$router.go('/pages/order/detail', { id: order.my.order_id })"
          >
            订单详情
          </button>
          <button
            class="tool-btn ss-reset-button"
            :class="{ 'ui-BG-Main-Gradient': order.status === 'ing' }"
            @tap="sheep.$router.go('/pages/activity/groupon/detail', { id: order.id })"
          >
            {{ order.status === 'ing' ? '邀请拼团' : '拼团详情' }}
          </button>
        </view>
      </view>
    </view>
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
  import { computed, reactive } from 'vue';
  import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import _ from 'lodash';

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
    deleteOrderId: 0,
  });

  const tabMaps = [
    {
      name: '全部',
      value: 'all',
    },
    {
      name: '进行中',
      value: 'ing',
    },
    {
      name: '拼团成功',
      value: 'finish',
    },
    {
      name: '拼团失败',
      value: 'invalid',
    },
  ];

  // 切换选项卡
  function onTabsChange(e) {
    state.pagination = {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    };
    state.currentTab = e.index;
    getGrouponList();
  }

  // 订单详情
  function onDetail(orderSN) {
    sheep.$router.go('/pages/order/detail', {
      orderSN,
    });
  }

  // 继续支付
  function onPay(orderSN) {
    sheep.$router.go('/pages/pay/index', {
      orderSN,
    });
  }

  // 评价
  function onComment(orderSN) {
    sheep.$router.go('/pages/order/comment/add', {
      orderSN,
    });
  }

  // 确认收货
  async function onConfirm(orderId) {
    const { error, data } = await sheep.$api.order.confirm(orderId);
    if (error === 0) {
      let index = state.pagination.data.findIndex((order) => order.id === orderId);
      state.pagination.data[index] = data;
    }
  }

  // 取消订单
  async function onCancel(orderId) {
    const { error, data } = await sheep.$api.order.cancel(orderId);
    if (error === 0) {
      let index = state.pagination.data.findIndex((order) => order.id === orderId);
      state.pagination.data[index] = data;
    }
  }

  // 获取订单列表
  async function getGrouponList(page = 1, list_rows = 5) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.activity.myGroupon({
      type: tabMaps[state.currentTab].value,
    });
    if (res.error === 0) {
      if (page >= 2) {
        let orderList = _.concat(state.pagination.data, res.data.data);
        state.pagination = {
          ...res.data,
          data: orderList,
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

  onLoad((options) => {
    if (options.type) {
      state.currentTab = options.type;
    }
    getGrouponList();
  });

  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getGrouponList(state.pagination.current_page + 1);
    }
  }

  // 上拉加载更多
  onReachBottom(() => {
    loadmore();
  });
  //下拉刷新
  onPullDownRefresh(() => {
    getGrouponList();
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 800);
  });
</script>

<style lang="scss" scoped>
  .swiper-box {
    flex: 1;

    .swiper-item {
      height: 100%;
      width: 100%;
    }
  }

  .order-list-card-box {
    .order-card-header {
      height: 80rpx;

      .order-no {
        font-size: 26rpx;
        font-weight: 500;
      }
    }

    .order-card-footer {
      height: 100rpx;

      .detail-btn {
        width: 210rpx;
        height: 66rpx;
        border: 2rpx solid #dfdfdf;
        border-radius: 33rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: #999999;
        margin-right: 20rpx;
      }
      .tool-btn {
        width: 210rpx;
        height: 66rpx;
        border-radius: 33rpx;
        font-size: 26rpx;
        font-weight: 400;
        margin-right: 20rpx;
        background: #f6f6f6;
      }

      .invite-btn {
        width: 210rpx;
        height: 66rpx;
        background: linear-gradient(90deg, #fe832a, #ff6600);
        box-shadow: 0px 8rpx 6rpx 0px rgba(255, 104, 4, 0.22);
        border-radius: 33rpx;
        color: #fff;
        font-size: 26rpx;
        font-weight: 500;
      }
    }
  }

  .sales-title {
    height: 32rpx;
    background: rgba(#ffe0e2, 0.29);
    border-radius: 16rpx;
    font-size: 24rpx;
    font-weight: 400;
    padding: 6rpx 20rpx;
    color: #f7979c;
  }

  .num-title {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
  }
  .warning-color {
    color: #faad14;
  }
  .danger-color {
    color: #ff3000;
  }
  .success-color {
    color: #52c41a;
  }
</style>
