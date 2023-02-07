<!-- 售后列表 -->
<template>
  <s-layout title="售后列表">
    <!-- tab -->
    <su-sticky bgColor="#fff">
      <su-tabs
        :list="tabMaps"
        :scrollable="false"
        @change="onTabsChange"
        :current="state.currentTab"
      ></su-tabs>
    </su-sticky>
    <s-empty v-if="state.pagination.total === 0" icon="/static/data-empty.png" text="暂无数据">
    </s-empty>
    <!-- 列表 -->
    <view v-if="state.pagination.total > 0">
      <view
        class="list-box ss-m-y-20"
        v-for="order in state.pagination.data"
        :key="order.id"
        @tap="sheep.$router.go('/pages/order/aftersale/detail', { id: order.id })"
      >
        <view class="order-head ss-flex ss-col-center ss-row-between">
          <text class="no">服务单号：{{ order.aftersale_sn }}</text>
          <text class="state">{{ order.aftersale_status_text }}</text>
        </view>
        <s-goods-item
          :img="order.goods_image"
          :title="order.goods_title"
          :skuText="order.goods_sku_text"
          :price="order.goods_price"
          :num="order.goods_num"
        ></s-goods-item>
        <view class="apply-box ss-flex ss-col-center ss-row-between border-bottom ss-p-x-20">
          <view class="ss-flex ss-col-center">
            <view class="title ss-m-r-20">{{ order.type_text }}</view>
            <view class="value">{{ order.aftersale_status_desc }}</view>
          </view>
          <text class="_icon-forward"></text>
        </view>
        <view class="tool-btn-box ss-flex ss-col-center ss-row-right ss-p-r-20">
          <view>
            <button
              class="ss-reset-button tool-btn"
              @tap.stop="onApply(order.id)"
              v-if="order.btns.includes('cancel')"
              >取消申请</button
            >
          </view>
          <view>
            <button
              class="ss-reset-button tool-btn"
              @tap.stop="onDelete(order.id)"
              v-if="order.btns.includes('delete')"
              >删除</button
            >
          </view>
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
  const state = reactive({
    currentTab: 0,
    showApply: false,
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
  });

  const tabMaps = [
    {
      name: '全部',
      value: 'all',
    },
    {
      name: '申请中',
      value: 'nooper',
    },
    {
      name: '处理中',
      value: 'ing',
    },
    {
      name: '已完成',
      value: 'completed',
    },
    {
      name: '已拒绝',
      value: 'refuse',
    },
  ];
  // 切换选项卡
  function onTabsChange(e) {
    state.pagination = pagination
    state.currentTab = e.index;
    getOrderList();
  }

  // 获取售后列表
  async function getOrderList(page = 1, list_rows = 5) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.order.aftersale.list({
      type: tabMaps[state.currentTab].value,
      list_rows,
      page,
    });
    if (res.error === 0) {
        let orderList = _.concat(state.pagination.data, res.data.data);
        state.pagination = {
          ...res.data,
          data: orderList,
        };

      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }

  function onApply(orderId) {
    uni.showModal({
      title: '提示',
      content: '确定要取消此申请吗？',
      success: async function (res) {
        if (res.confirm) {
          const { error } = await sheep.$api.order.aftersale.cancel(orderId);
          if (error === 0) {
            state.pagination = pagination
            getOrderList();
          }
        }
      },
    });
  }

  function onDelete(orderId) {
    uni.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: async function (res) {
        if (res.confirm) {
          const { error } = await sheep.$api.order.aftersale.delete(orderId);
          if (error === 0) {
            state.pagination = pagination
            getOrderList();
          }
        }
      },
    });
  }

  onLoad(async (options) => {
    if (options.type) {
      state.currentTab = options.type;
    }
    getOrderList();
  });

  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getOrderList(state.pagination.current_page + 1);
    }
  }

  // 上拉加载更多
  onReachBottom(() => {
    loadmore();
  });
</script>

<style lang="scss" scoped>
  .list-box {
    background-color: #fff;

    .order-head {
      padding: 0 25rpx;
      height: 77rpx;
    }

    .apply-box {
      height: 82rpx;

      .title {
        font-size: 24rpx;
      }

      .value {
        font-size: 22rpx;
        color: $dark-6;
      }
    }

    .tool-btn-box {
      height: 100rpx;

      .tool-btn {
        width: 160rpx;
        height: 60rpx;
        background: #f6f6f6;
        border-radius: 30rpx;
        font-size: 26rpx;
        font-weight: 400;
      }
    }
  }
</style>
