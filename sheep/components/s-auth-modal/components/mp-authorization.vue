<!-- 微信授权信息 mpAuthorization  -->
<template>
  <view>
    <!-- 标题栏 -->
    <view class="head-box ss-m-b-60 ss-flex-col">
      <view class="ss-flex ss-m-b-20">
        <view class="head-title ss-m-r-40 head-title-animation">授权信息</view>
      </view>
      <view class="head-subtitle">完善您的头像、昵称、手机号</view>
    </view>

    <!-- 表单项 -->
    <uni-forms
      ref="accountLoginRef"
      v-model="state.model"
      :rules="state.rules"
      validateTrigger="bind"
      labelWidth="140"
      labelAlign="center"
    >
      <uni-forms-item name="avatar" label="头像">
        <button
          class="ss-reset-button avatar-btn"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <image
            class="avatar-img"
            :src="sheep.$url.cdn(state.model.avatar)"
            mode="aspectFill"
            @tap="sheep.$router.go('/pages/user/info')"
          ></image>
          <text class="cicon-forward"></text>
        </button>
      </uni-forms-item>
      <uni-forms-item name="nickname" label="昵称">
        <uni-easyinput
          type="nickname"
          placeholder="请输入昵称"
          v-model="state.model.nickname"
          :inputBorder="false"
        >
        </uni-easyinput>
      </uni-forms-item>

      <view class="foot-box">
        <button class="ss-reset-button authorization-btn" @tap="onConfirm"> 确认授权 </button>
      </view>
    </uni-forms>
  </view>
</template>

<script setup>
  import { computed, watch, ref, reactive, unref } from 'vue';
  import sheep from '@/sheep';
  import { showAuthModal, closeAuthModal } from '@/sheep/hooks/useModal';

  const props = defineProps({
    agreeStatus: {
      type: Boolean,
      default: false,
    },
  });

  const userInfo = computed(() => sheep.$store('user').userInfo);

  const accountLoginRef = ref(null);

  // 数据
  const state = reactive({
    model: {
      nickname: userInfo.value.nickname,
      avatar: userInfo.value.avatar,
    },
    rules: {

    },
    disabledStyle: {
      color: '#999',
      disableColor: '#fff',
    },
  });
  // 选择头像
  function onChooseAvatar(e) {
    const tempUrl = e.detail.avatarUrl || '';
    uploadAvatar(tempUrl);
  }
  async function uploadAvatar(tempUrl) {
    if (!tempUrl) return;
    let { path } = await sheep.$api.app.upload(tempUrl, 'ugc');
    state.model.avatar = path;
  }

  // 确认授权
  async function onConfirm() {
    const { model } = state;
    const { nickname, avatar } = model;
    if (!nickname) {
      sheep.$helper.toast('请输入昵称');
      return;
    }
    if (!avatar) {
      sheep.$helper.toast('请选择头像');
      return;
    }
    const { error, msg } = await sheep.$api.user.updateMpUserInfo(model);
    if (error === 0) {
      sheep.$helper.toast('授权成功');
      await sheep.$store('user').getInfo();
      closeAuthModal();
    }else {
      sheep.$helper.toast(msg);
    }
  }
</script>

<style lang="scss" scoped>
  @import '../index.scss';

  .foot-box {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .authorization-btn {
    width: 686rpx;
    height: 80rpx;
    background-color: var(--ui-BG-Main);
    border-radius: 40rpx;
    color: #fff;
  }
  .avatar-img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 36rpx;
  }
  .cicon-forward {
    font-size: 30rpx;
    color: #595959;
  }
  .avatar-btn {
    width: 100%;
    justify-content: space-between;
  }
</style>
