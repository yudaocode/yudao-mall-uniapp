<template>
  <s-layout class="set-wrap" title="编辑资料">
    <view class="header-box ss-flex-col ss-row-center ss-col-center">
      <image
        class="logo-img ss-m-b-40"
        src="/static/img/shop/tabbar/find2.png"
        mode="aspectFit"
      ></image>
      <view class="name ss-m-b-24">SHEEP商城</view>
      <view class="version">V1.3.0</view>
    </view>

    <uni-list :border="true">
      <uni-list-item title="清除缓存" rightText="2M" showArrow></uni-list-item>
      <uni-list-item title="当前版本" rightText="V1.3.1" showArrow></uni-list-item>
      <uni-list-item title="意见反馈" showArrow></uni-list-item>
      <uni-list-item title="关于我们" showArrow></uni-list-item>
    </uni-list>

    <view class="set-footer ss-flex-col ss-row-center ss-col-center">
      <view class="agreement-box ss-flex ss-col-center ss-m-b-30">
        <view class="ss-flex ss-col-center ss-m-b-10">
          <view class="tcp-text">《用户协议》</view>
          <view class="agreement-text">与</view>
          <view class="tcp-text">《隐私协议》</view>
        </view>
      </view>
      <view class="copyright-text ss-m-b-10">******版权所有</view>
      <view class="copyright-text">Copyright© 2018-2022</view>
    </view>
  </s-layout>
</template>

<script setup></script>

<style lang="scss" scoped>
  .set-title {
    margin: 0 30rpx;
  }

  .header-box {
    padding: 100rpx 0;

    .logo-img {
      width: 160rpx;
      height: 160rpx;
    }

    .name {
      font-size: 42rpx;
      line-height: 42rpx;
      font-weight: bold;
      color: $dark-3;
    }

    .version {
      font-size: 32rpx;
      font-weight: 500;
      line-height: 32rpx;
      color: $gray-b;
    }
  }

  .set-footer {
    margin: 200rpx 0;

    .copyright-text {
      font-size: 22rpx;
      font-weight: 500;
      color: $gray-c;
      line-height: 30rpx;
    }

    .agreement-box {
      margin: 80rpx auto 0;

      .tcp-text {
        color: var(--ui-BG-Main);
      }

      .agreement-text {
        font-size: 26rpx;
        font-weight: 500;
        color: $dark-9;
      }
    }
  }
</style>
