<template>
  <s-layout class="widthdraw-log-wrap" title="提现记录">
    <!-- 记录卡片 -->
    <view class="wallet-log-box ss-p-b-30">
      <view class="log-list" v-for="item in state.pagination.data" :key="item">
        <view class="head ss-flex ss-col-center ss-row-between">
          <view class="title">{{
            item.withdraw_type === 'bank'
              ? '提现至银行卡'
              : item.withdraw_type === 'alipay'
              ? '提现至支付宝'
              : '提现至微信'
          }}</view>
          <view
            class="num"
            :class="
              item.status === -1
                ? 'danger-color'
                : item.status === 2
                ? 'success-color'
                : 'warning-color'
            "
            >{{ item.amount }}元</view
          >
        </view>
        <view class="status-box item ss-flex ss-col-center ss-row-between">
          <view class="item-title">申请状态</view>
          <view
            class="status-text"
            :class="
              item.status === -1
                ? 'danger-color'
                : item.status === 2
                ? 'success-color'
                : 'warning-color'
            "
            >{{ item.status_text }}</view
          >
        </view>
        <view class="time-box item ss-flex ss-col-center ss-row-between">
          <text class="item-title">账户信息</text>
          <view class="time ss-ellipsis-1" v-if="item.withdraw_type === 'bank'"
            >{{ item.withdraw_info_hidden.开户行 }}[{{ item.withdraw_info_hidden.银行卡号 }}]</view
          >
          <view class="time ss-ellipsis-1" v-if="item.withdraw_type === 'alipay'">
            支付宝[{{ item.withdraw_info_hidden.支付宝账户 }}]
          </view>
          <view class="time ss-ellipsis-1" v-if="item.withdraw_type === 'wechat'">微信零钱</view>
        </view>
        <view class="time-box item ss-flex ss-col-center ss-row-between">
          <text class="item-title">提现单号</text>
          <view class="time"> {{ item.withdraw_sn }} </view>
        </view>
        <view class="time-box item ss-flex ss-col-center ss-row-between">
          <text class="item-title">手续费</text>
          <view class="time">{{ item.charge_fee }}元</view>
        </view>
        <view class="time-box item ss-flex ss-col-center ss-row-between">
          <text class="item-title">申请时间</text>
          <view class="time"> {{ item.create_time }}</view>
        </view>
      </view>
    </view>
    <s-empty
      v-if="state.pagination.total === 0"
      icon="/static/comment-empty.png"
      text="暂无提现记录"
    ></s-empty>
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
  import sheep from '@/sheep';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import _ from 'lodash';
  const state = reactive({
    currentTab: 0,
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
  });
  async function getList(page = 1, list_rows = 6) {
    const res = await sheep.$api.pay.withdraw.list({ list_rows, page });
    if (res.error === 0) {
      let logList = _.concat(state.pagination.data, res.data.data);
      state.pagination = {
        ...res.data,
        data: logList,
      };
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getList(state.pagination.current_page + 1);
    }
  }
  onLoad(() => {
    getList();
  });
  onReachBottom(() => {
    loadmore();
  });
</script>

<style lang="scss" scoped>
  // 记录卡片
  .log-list {
    min-height: 213rpx;
    background: $white;
    margin-bottom: 10rpx;
    padding-bottom: 10rpx;

    .head {
      padding: 0 35rpx;
      height: 80rpx;
      border-bottom: 1rpx solid $gray-e;
      margin-bottom: 20rpx;

      .title {
        font-size: 28rpx;
        font-weight: 500;
        color: $dark-3;
      }

      .num {
        font-size: 28rpx;
        font-weight: 500;
      }
    }

    .item {
      padding: 0 30rpx 10rpx;

      .item-icon {
        color: $gray-d;
        font-size: 36rpx;
        margin-right: 8rpx;
      }

      .item-title {
        width: 180rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
      }

      .status-text {
        font-size: 24rpx;
        font-weight: 500;
      }

      .time {
        font-size: 24rpx;
        font-weight: 400;
        color: #c0c0c0;
      }
    }
  }
  .warning-color {
    color: #faad14;
  }
  .danger-color {
    color: #ff4d4f;
  }
  .success-color {
    color: #67c23a;
  }
</style>
