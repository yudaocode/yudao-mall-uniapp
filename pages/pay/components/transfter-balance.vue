<!-- 提现方式 -->
<template>
  <ui-modal
    class="ss-checkout-counter-wrap"
    name="walletTransfterBalance"
    mask="40"
    align="bottom"
    ui="ss-r-t-30"
    :showCancel="false"
    :option="false"
  >
    <view class="ss-modal-box bg-white ss-flex-col">
      <view class="modal-header ss-flex-col ss-col-left">
        <text class="cicon-close-round close-icon" @tap="hideModal"></text>
        <text class="modal-title ss-m-b-20">转余额</text>
        <text class="modal-subtitle">将您的佣金转到钱包中继续消费</text>
      </view>
      <view class="modal-content ss-flex-1">
        <view class="input-box ss-flex ss-col-center border-bottom">
          <view calss="unit">￥</view>
          <ui-input class="ss-flex-1 ss-p-l-10" type="number" placeholder="请输入金额" />
        </view>
      </view>
      <view class="modal-footer ss-flex ss-row-center ss-col-center">
        <button class="ss-reset-button save-btn" @tap="hideModal">确定</button>
      </view>
    </view>
  </ui-modal>
</template>

<script setup>
  /**
   * 转余额弹窗
   */
</script>

<style lang="scss" scoped>
  .ss-modal-box {
    border-radius: 30rpx 30rpx 0 0;
    max-height: 1000rpx;

    .modal-header {
      position: relative;
      padding: 60rpx 40rpx 40rpx;

      .modal-title {
        font-size: 32rpx;
        font-weight: bold;
      }

      .modal-subtitle {
        font-size: 26rpx;
        font-weight: 400;
        color: $gray-d;
      }

      .close-icon {
        position: absolute;
        top: 10rpx;
        right: 20rpx;
        font-size: 46rpx;
        opacity: 0.2;
      }
    }

    .modal-content {
      overflow-y: auto;
      padding: 40rpx;

      .input-box {
        width: 624rpx;
        height: 100rpx;
        margin-bottom: 40rpx;

        .unit {
          font-size: 48rpx;
          color: #333;
        }
      }
    }

    .modal-footer {
      height: 120rpx;

      .save-btn {
        width: 710rpx;
        height: 80rpx;
        border-radius: 40rpx;
        background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
        color: $white;
      }
    }
  }
</style>
