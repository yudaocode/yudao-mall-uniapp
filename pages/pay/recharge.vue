<template>
  <s-layout title="充值" class="withdraw-wrap" navbar="inner">
    <view
      class="wallet-num-box ss-flex ss-col-center ss-row-between"
      :style="[
        {
          marginTop: '-' + Number(statusBarHeight + 88) + 'rpx',
          paddingTop: Number(statusBarHeight + 108) + 'rpx',
        },
      ]"
    >
      <view class="">
        <view class="num-title">当前余额（元）</view>
        <view class="wallet-num">{{ userInfo.money }}</view>
      </view>
      <button class="ss-reset-button log-btn" @tap="sheep.$router.go('/pages/pay/recharge-log')"
        >充值记录</button
      >
    </view>
    <view class="recharge-box">
      <view class="recharge-card-box" v-if="state.data.status">
        <view class="input-label ss-m-b-50">充值金额</view>
        <view class="input-box ss-flex border-bottom ss-p-b-20" v-if="state.data.custom_status">
          <view class="unit">￥</view>
          <uni-easyinput
            v-model="state.recharge_money"
            type="digit"
            placeholder="请输入充值金额"
            :inputBorder="false"
          >
          </uni-easyinput>
        </view>
        <view class="face-value-box ss-flex ss-flex-wrap ss-m-y-40">
          <button
            class="ss-reset-button face-value-btn"
            v-for="item in state.faceValueList"
            :key="item.money"
            :class="[{ 'btn-active': state.recharge_money == parseFloat(item.money) }]"
            @tap="onCard(item.money)"
          >
            <text class="face-value-title">{{ item.money }}</text>
            <view v-if="item.gift" class="face-value-tag">
              送{{ item.gift }}{{ state.data.gift_type == 'money' ? '元' : '积分' }}</view
            >
          </button>
        </view>
        <button
          class="ss-reset-button save-btn ui-BG-Main-Gradient ss-m-t-60 ui-Shadow-Main"
          @tap="onConfirm"
        >
          确认充值
        </button>
      </view>
      <view class="" v-if="state.data.status === 0"> 关闭充值 </view>
    </view>
  </s-layout>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';

  const userInfo = computed(() => sheep.$store('user').userInfo);
  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  const headerBg = sheep.$url.css('/static/img/shop/user/withdraw_bg.png');

  const state = reactive({
    recharge_money: '',
    data: {},
    faceValueList: [],
  });
  // 点击卡片

  function onCard(e) {
    state.recharge_money = e;
  }
  async function getRechargeTabs() {
    const res = await sheep.$api.trade.rechargeRules();
    if (res.error === 0) {
      state.data = res.data;
      state.data.status = res.data.status;
      state.faceValueList = res.data.quick_amounts;
    }
  }

  function onChange(e) {
    state.data.gift_type = e.detail.value;
  }

  async function onConfirm() {
    const { error, data } = await sheep.$api.trade.recharge({
      recharge_money: state.recharge_money,
    });
    if (error === 0) {
      sheep.$router.go('/pages/pay/index', { orderSN: data.order_sn, type: 'recharge' });
    }
  }
  onLoad(() => {
    getRechargeTabs();
  });
</script>

<style lang="scss" scoped>
  :deep() {
    .uni-input-input {
      font-family: OPPOSANS !important;
    }
  }

  .wallet-num-box {
    padding: 0 40rpx 80rpx;
    background: var(--ui-BG-Main) v-bind(headerBg) center/750rpx 100% no-repeat;
    border-radius: 0 0 5% 5%;

    .num-title {
      font-size: 26rpx;
      font-weight: 500;
      color: $white;
      margin-bottom: 20rpx;
    }

    .wallet-num {
      font-size: 60rpx;
      font-weight: 500;
      color: $white;
      font-family: OPPOSANS;
    }

    .log-btn {
      width: 170rpx;
      height: 60rpx;
      line-height: 60rpx;
      border: 1rpx solid $white;
      border-radius: 30rpx;
      padding: 0;
      font-size: 26rpx;
      font-weight: 500;
      color: $white;
    }
  }

  .recharge-box {
    position: relative;
    padding: 0 30rpx;
    margin-top: -60rpx;
  }

  .save-btn {
    width: 620rpx;
    height: 86rpx;
    border-radius: 44rpx;
    font-size: 30rpx;
  }

  .recharge-card-box {
    width: 690rpx;
    background: var(--ui-BG);
    border-radius: 20rpx;
    padding: 30rpx;
    box-sizing: border-box;

    .input-label {
      font-size: 30rpx;
      font-weight: 500;
      color: #333;
    }

    .unit {
      display: flex;
      align-items: center;
      font-size: 48rpx;
      font-weight: 500;
    }

    .uni-easyinput__placeholder-class {
      font-size: 30rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
    }

    :deep(.uni-easyinput__content-input) {
      font-size: 48rpx;
    }

    .face-value-btn {
      width: 200rpx;
      height: 144rpx;
      border: 1px solid var(--ui-BG-Main);
      border-radius: 10rpx;
      position: relative;
      z-index: 1;
      margin-bottom: 15rpx;
      margin-right: 15rpx;

      &:nth-of-type(3n) {
        margin-right: 0;
      }

      .face-value-title {
        font-size: 36rpx;
        font-weight: 500;
        color: var(--ui-BG-Main);
        font-family: OPPOSANS;

        &::after {
          content: '元';
          font-size: 24rpx;
          margin-left: 6rpx;
        }
      }

      .face-value-tag {
        position: absolute;
        z-index: 2;
        height: 40rpx;
        line-height: 40rpx;
        background: var(--ui-BG-Main);
        opacity: 0.8;
        border-radius: 10rpx 0 20rpx 0;
        top: 0;
        left: -2rpx;
        padding: 0 16rpx;
        font-size: 22rpx;
        color: $white;
        font-family: OPPOSANS;
      }

      &::before {
        position: absolute;
        content: ' ';
        width: 100%;
        height: 100%;
        background: var(--ui-BG-Main);
        opacity: 0.1;
        z-index: 0;
        left: 0;
        top: 0;
      }
    }

    .btn-active {
      z-index: 1;

      &::before {
        content: '';
        background: var(--ui-BG-Main);
        opacity: 1;
      }

      .face-value-title {
        color: $white;
        position: relative;
        z-index: 1;
        font-family: OPPOSANS;
      }

      .face-value-tag {
        background: $white;
        color: var(--ui-BG-Main);
        font-family: OPPOSANS;
      }
    }
  }
</style>
