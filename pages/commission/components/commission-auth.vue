<!-- 页面  -->
<template>
  <su-popup
    :show="state.show"
    type="center"
    round="10"
    @close="state.show = false"
    :isMaskClick="false"
    maskBackgroundColor="rgba(0, 0, 0, 0.7)"
  >
    <view class="notice-box">
      <view class="img-wrap">
        <image
          class="notice-img"
          :src="sheep.$url.static(state.event.image)"
          mode="aspectFill"
        ></image>
      </view>
      <view class="notice-title">{{ state.event.title }}</view>
      <view class="notice-detail">{{ state.event.subtitle }}</view>
      <button
        class="ss-reset-button notice-btn ui-Shadow-Main ui-BG-Main-Gradient"
        @tap="onTap(state.event.action)"
      >
        {{ state.event.button }}
      </button>
      <button class="ss-reset-button back-btn" @tap="sheep.$router.back()"> 返回 </button>
    </view>
  </su-popup>
</template>

<script setup>
  import sheep from '@/sheep';
  import { reactive, watch } from 'vue';

  const props = defineProps({
    error: {
      type: Number,
      default: 0,
    },
  });
  const emits = defineEmits(['getAgentInfo']);
  const state = reactive({
    event: {},
    show: false,
  });

  watch(
    () => props.error,
    (error) => {
      if (error !== 0 && error !== 100) {
        state.event = eventMap[error];
        state.show = true;
      }
    },
  );

  async function onTap(eventName) {
    switch (eventName) {
      case 'back': // 返回
        sheep.$router.back();
        break;
      case 'apply': // 需提交资料
        sheep.$router.go('/pages/commission/apply');
        break;
      case 'reApply': // 直接重新申请
        let { error } = await sheep.$api.commission.apply();
        if (error === 0) {
          emits('getAgentInfo');
        }
        break;
    }
  }
  const eventMap = {
    // 关闭
    101: {
      image: '/static/img/shop/commission/close.png',
      title: '分销中心已关闭',
      subtitle: '该功能暂不可用',
      button: '知道了',
      action: 'back',
    },
    // 禁用
    102: {
      image: '/static/img/shop/commission/forbidden.png',
      title: '账户已被禁用',
      subtitle: '该功能暂不可用',
      button: '知道了',
      action: 'back',
    },
    // 补充信息
    103: {
      image: '/static/img/shop/commission/apply.png',
      title: '待完善信息',
      subtitle: '请补充您的信息后提交审核',
      button: '完善信息',
      action: 'apply',
    },
    // 审核中
    104: {
      image: '/static/img/shop/commission/pending.png',
      title: '正在审核中',
      subtitle: '请耐心等候结果',
      button: '知道了',
      action: 'back',
    },
    // 重新提交
    105: {
      image: '/static/img/shop/commission/reject.png',
      title: '抱歉!您的申请信息未通过',
      subtitle: '请尝试修改后重新提交',
      button: '重新申请',
      action: 'apply',
    },
    // 直接重新申请
    106: {
      image: '/static/img/shop/commission/reject.png',
      title: '抱歉!您的申请未通过',
      subtitle: '请尝试重新申请',
      button: '重新申请',
      action: 'reApply',
    },
    // 冻结
    107: {
      image: '/static/img/shop/commission/freeze.png',
      title: '抱歉!您的账户已被冻结',
      subtitle: '如有疑问请联系客服',
      button: '联系客服',
      action: 'chat',
    },
  };
</script>

<style lang="scss" scoped>
  .notice-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 612rpx;
    min-height: 658rpx;
    background: #ffffff;
    padding: 30rpx;
    border-radius: 20rpx;
    .img-wrap {
      margin-bottom: 50rpx;
      .notice-img {
        width: 180rpx;
        height: 170rpx;
      }
    }
    .notice-title {
      font-size: 35rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 28rpx;
    }
    .notice-detail {
      font-size: 28rpx;
      font-weight: 400;
      color: #999999;
      line-height: 36rpx;
      margin-bottom: 50rpx;
    }
    .notice-btn {
      width: 492rpx;
      line-height: 70rpx;
      border-radius: 35rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 10rpx;
    }
    .back-btn {
      width: 492rpx;
      line-height: 70rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: var(--ui-BG-Main-gradient);
      background: none;
    }
  }
</style>
