<template>
  <s-layout class="activity-wrap" :title="state.activityInfo.title">
    <su-sticky bgColor="#fff">
      <view class="ss-flex ss-col-top tip-box">
        <view class="type-text ss-flex ss-row-center">{{ state.activityInfo.type_text }}：</view>
        <view class="ss-flex-1">
          <view class="tip-content" v-for="item in state.activityInfo.texts" :key="item">
            {{ item }}
          </view>
        </view>
        <image class="activity-left-image" src="/static/activity-left.png" />
        <image class="activity-right-image" src="/static/activity-right.png" />
      </view>
    </su-sticky>

    <view class="ss-flex ss-flex-wrap ss-p-x-20 ss-m-t-20 ss-col-top">
      <view class="goods-list-box">
        <view class="left-list" v-for="item in state.leftGoodsList" :key="item.id">
          <s-goods-column
            class="goods-md-box"
            size="md"
            :data="item"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            @getHeight="mountMasonry($event, 'left')"
          >
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn"> </button>
            </template>
          </s-goods-column>
        </view>
      </view>
      <view class="goods-list-box">
        <view class="right-list" v-for="item in state.rightGoodsList" :key="item.id">
          <s-goods-column
            class="goods-md-box"
            size="md"
            :data="item"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            @getHeight="mountMasonry($event, 'right')"
          >
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn"> </button>
            </template>
          </s-goods-column>
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
  import { reactive } from 'vue';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import _ from 'lodash';

  const state = reactive({
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
    leftGoodsList: [],
    rightGoodsList: [],
    activityId: 0,
    activityInfo: {},
  });
  // 加载瀑布流
  let count = 0;
  let leftHeight = 0;
  let rightHeight = 0;

  function mountMasonry(height = 0, where = 'left') {
    if (!state.pagination.data[count]) return;

    if (where === 'left') {
      leftHeight += height;
    } else {
      rightHeight += height;
    }
    if (leftHeight <= rightHeight) {
      state.leftGoodsList.push(state.pagination.data[count]);
    } else {
      state.rightGoodsList.push(state.pagination.data[count]);
    }
    count++;
  }
  async function getList(activityId, page = 1, list_rows = 6) {
    state.loadStatus = 'loading';
    const res = await sheep.$api.goods.activityList({
      list_rows,
      activity_id: activityId,
      page,
    });
    if (res.error === 0) {
      if (page >= 2) {
        let couponList = _.concat(state.pagination.data, res.data.data);
        state.pagination = {
          ...res.data,
          data: couponList,
        };
      } else {
        state.pagination = res.data;
      }
      mountMasonry();
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  async function getActivity(id) {
    const { error, data } = await sheep.$api.activity.activity(id);
    if (error === 0) {
      state.activityInfo = data;
    }
  }
  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getList(state.activityId, state.pagination.current_page + 1);
    }
  }
  // 上拉加载更多
  onReachBottom(() => {
    loadmore();
  });
  onLoad((options) => {
    state.activityId = options.activityId;
    getList(state.activityId);
    getActivity(state.activityId);
  });
</script>
<style lang="scss" scoped>
  .goods-list-box {
    width: 50%;
    box-sizing: border-box;
    .left-list {
      margin-right: 10rpx;
      margin-bottom: 20rpx;
    }
    .right-list {
      margin-left: 10rpx;
      margin-bottom: 20rpx;
    }
  }
  .tip-box {
    background: #fff0e7;
    padding: 20rpx;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    .activity-left-image {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 58rpx;
      height: 36rpx;
    }
    .activity-right-image {
      position: absolute;
      top: 0;
      right: 0;
      width: 72rpx;
      height: 50rpx;
    }
    .type-text {
      font-size: 26rpx;
      font-weight: 500;
      color: #ff6000;
      line-height: 42rpx;
    }
    .tip-content {
      font-size: 26rpx;
      font-weight: 500;
      color: #ff6000;
      line-height: 42rpx;
    }
  }
</style>
