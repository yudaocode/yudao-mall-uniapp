<template>
  <s-layout navbar="inner" :bgStyle="{ color: '#FE832A' }">
    <view
      class="page-bg"
      :style="[{ marginTop: '-' + Number(statusBarHeight + 88) + 'rpx' }]"
    ></view>
    <view class="list-content">
      <view class="content-header ss-flex-col ss-col-center ss-row-center">
        <view class="content-header-title ss-m-b-22 ss-flex ss-row-center">
          <view>{{ state.activityInfo.title }}</view>
          <!-- <view class="more">更多</view> -->
        </view>
        <view class="content-header-box ss-flex ss-row-center">
          <view class="countdown-box ss-flex" v-if="endTime?.ms > 0 && state.activityInfo">
            <view class="countdown-title ss-m-r-12">距结束</view>
            <view class="ss-flex countdown-time">
              <view class="ss-flex countdown-h">{{ endTime.h }}</view>
              <view class="ss-m-x-4">:</view>
              <view class="countdown-num ss-flex ss-row-center">{{ endTime.m }}</view>
              <view class="ss-m-x-4">:</view>
              <view class="countdown-num ss-flex ss-row-center">{{ endTime.s }}</view>
            </view>
          </view>
          <view class="" v-if="endTime?.ms < 0 && state.activityInfo"> 活动已结束 </view>
        </view>
      </view>
      <scroll-view
        class="scroll-box"
        :style="{ height: pageHeight + 'rpx' }"
        scroll-y="true"
        :scroll-with-animation="false"
        :enable-back-to-top="true"
      >
        <view class="goods-box ss-m-b-20" v-for="item in state.pagination.data" :key="item.id">
          <s-goods-column
            class=""
            size="lg"
            :data="item"
            :grouponTag="true"
            @click="
              sheep.$router.go('/pages/goods/groupon', {
                id: item.id,
                activity_id: state.activityId,
              })
            "
          >
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn">去拼团</button>
            </template>
          </s-goods-column>
        </view>
        <uni-load-more
          v-if="state.pagination.total > 0"
          :status="state.loadStatus"
          :content-text="{
            contentdown: '上拉加载更多',
          }"
          @tap="loadmore"
        />
      </scroll-view>
    </view>
  </s-layout>
</template>
<script setup>
  import { reactive, computed } from 'vue';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import _ from 'lodash';
  import { useDurationTime } from '@/sheep/hooks/useGoods';

  const { screenHeight, safeAreaInsets, screenWidth, safeArea } = sheep.$platform.device;
  const sys_navBar = sheep.$platform.navbar;
  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  const pageHeight =
    (safeArea.height + safeAreaInsets.bottom) * 2 + statusBarHeight - sys_navBar - 350;
  const headerBg = sheep.$url.css('/static/img/shop/goods/groupon-header.png');

  const state = reactive({
    activityId: 0,
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
    activityInfo: {},
  });
  // 倒计时
  const endTime = computed(() => {
    if (state.activityInfo.end_time) {
      return useDurationTime(state.activityInfo.end_time);
    }
  });

  async function getList(activityId, page = 1, list_rows = 4) {
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
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  async function getActivity(id) {}
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
  onLoad(async (options) => {
    if (!options.id) {
      state.activityInfo = null;
      return;
    }
    state.activityId = options.id;
    getList(state.activityId);
    const { error, data } = await sheep.$api.activity.activity(options.id);
    if (error === 0) {
      state.activityInfo = data;
    } else {
      state.activityInfo = null;
    }
  });
</script>
<style lang="scss" scoped>
  .page-bg {
    width: 100%;
    height: 458rpx;
    margin-top: -88rpx;
    background: v-bind(headerBg) no-repeat;
    background-size: 100% 100%;
  }
  .list-content {
    position: relative;
    z-index: 3;
    margin: -190rpx 20rpx 0 20rpx;
    background: #fff;
    border-radius: 20rpx 20rpx 0 0;
    .content-header {
      width: 100%;
      border-radius: 20rpx 20rpx 0 0;
      height: 150rpx;
      background: linear-gradient(180deg, #fff4f7, #ffe4d1);
      .content-header-title {
        width: 100%;
        font-size: 30rpx;
        font-weight: 500;
        color: #ff2923;
        line-height: 30rpx;
        position: relative;
        .more {
          position: absolute;
          right: 30rpx;
          top: 0;
          font-size: 24rpx;
          font-weight: 400;
          color: #999999;
          line-height: 30rpx;
        }
      }
      .content-header-box {
        width: 678rpx;
        height: 64rpx;
        background: rgba($color: #fff, $alpha: 0.66);
        border-radius: 32px;
        .num {
          font-size: 24rpx;
          font-family: OPPOSANS;
          font-weight: 500;
          color: #f51c11;
          line-height: 30rpx;
        }
        .title {
          font-size: 24rpx;
          font-weight: 400;
          font-family: OPPOSANS;
          color: #333;
          line-height: 30rpx;
        }
        .countdown-title {
          font-size: 28rpx;
          font-weight: 500;
          color: #333333;
          line-height: 28rpx;
        }

        .countdown-time {
          font-size: 28rpx;
          color: rgba(#ed3c30, 0.23);
          .countdown-h {
            font-size: 24rpx;
            font-family: OPPOSANS;
            font-weight: 500;
            color: #ffffff;
            padding: 0 4rpx;
            height: 40rpx;
            background: rgba(#ed3c30, 0.23);
            border-radius: 6rpx;
          }
          .countdown-num {
            font-size: 24rpx;
            font-family: OPPOSANS;
            font-weight: 500;
            color: #ffffff;
            width: 40rpx;
            height: 40rpx;
            background: rgba(#ed3c30, 0.23);
            border-radius: 6rpx;
          }
        }
      }
    }
    .scroll-box {
      height: 900rpx;
      .goods-box {
        position: relative;
        .cart-btn {
          position: absolute;
          bottom: 10rpx;
          right: 20rpx;
          z-index: 11;
          height: 50rpx;
          line-height: 50rpx;
          padding: 0 20rpx;
          border-radius: 25rpx;
          font-size: 24rpx;
          color: #fff;
          background: linear-gradient(90deg, #ff6600 0%, #fe832a 100%);
        }
      }
    }
  }
</style>
