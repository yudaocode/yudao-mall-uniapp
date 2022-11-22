<template>
  <!-- 规格弹窗 -->
  <su-popup :show="authType !== ''" round="10" :showClose="true" @close="closeAuthModal">
    <view class="login-wrap">
      <!-- 1. 账号密码登录 accountLogin -->
      <account-login
        v-if="authType === 'accountLogin'"
        :agreeStatus="state.protocol"
      ></account-login>

      <!-- 2.短信登录  smsLogin -->
      <sms-login v-if="authType === 'smsLogin'" :agreeStatus="state.protocol"></sms-login>
      <!-- 3.短信注册 smsRegister-->
      <sms-register v-if="authType === 'smsRegister'" :agreeStatus="state.protocol"></sms-register>

      <!-- 4.忘记密码 resetPassword-->
      <reset-password v-if="authType === 'resetPassword'"></reset-password>

      <!-- 5.绑定手机号 changeMobile -->
      <change-mobile v-if="authType === 'changeMobile'"></change-mobile>

      <!-- 6.修改密码 changePassword-->
      <change-passwrod v-if="authType === 'changePassword'"></change-passwrod>

      <!-- 7.修改用户名 changeUsername-->
      <change-username v-if="authType === 'changeUsername'"></change-username>

      <!-- 第三方登录 -->
      <view
        v-if="['accountLogin', 'smsLogin'].includes(authType)"
        class="auto-login-box ss-flex ss-row-center ss-col-center"
      >
        <!-- 微信小程序登录 -->
        <button
          v-if="sheep.$platform.name === 'WechatMiniProgram'"
          open-type="getPhoneNumber"
          @getphonenumber="thirdLogin('wechat', $event)"
          class="ss-reset-button auto-login-btn"
        >
          <image
            class="auto-login-img"
            :src="sheep.$url.static('/static/img/shop/platform/wechat.png')"
          ></image>
        </button>

        <!-- 公众号|App微信登录 -->
        <button
          v-if="
            ['WechatOfficialAccount', 'App'].includes(sheep.$platform.name) &&
            sheep.$platform.isWechatInstalled
          "
          @tap="thirdLogin('wechat')"
          class="ss-reset-button auto-login-btn"
        >
          <image
            class="auto-login-img"
            :src="sheep.$url.static('/static/img/shop/platform/wechat.png')"
          ></image>
        </button>

        <!-- iOS登录 -->
        <button
          v-if="sheep.$platform.os === 'ios' && sheep.$platform.name === 'App'"
          @tap="thirdLogin('apple')"
          class="ss-reset-button auto-login-btn"
        >
          <image
            class="auto-login-img"
            :src="sheep.$url.static('/static/img/shop/platform/apple.png')"
          ></image>
        </button>
      </view>

      <view
        v-if="['accountLogin', 'smsLogin', 'smsRegister'].includes(authType)"
        class="agreement-box ss-flex ss-row-center"
      >
        <label class="radio ss-flex" @tap="onChange">
          <radio
            :checked="state.protocol"
            color="var(--ui-BG-Main)"
            style="transform: scale(0.8)"
          />
          <view class="agreement-text ss-flex ss-col-center">
            我已阅读并遵守
            <view
              class="tcp-text"
              @tap.stop="onProtocol(appInfo.user_protocol.id, appInfo.user_protocol.title)"
            >
              《{{ appInfo.user_protocol.title }}》
            </view>
            <view class="agreement-text">与</view>
            <view
              class="tcp-text"
              @tap.stop="onProtocol(appInfo.privacy_protocol.id, appInfo.privacy_protocol.title)"
            >
              《{{ appInfo.privacy_protocol.title }}》
            </view>
          </view>
        </label>
      </view>
      <view class="safe-box"></view>
    </view>
  </su-popup>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import sheep from '@/sheep';
  import accountLogin from './components/account-login.vue';
  import smsLogin from './components/sms-login.vue';
  import smsRegister from './components/sms-register.vue';
  import resetPassword from './components/reset-password.vue';
  import changeMobile from './components/change-mobile.vue';
  import changePasswrod from './components/change-password.vue';
  import changeUsername from './components/change-username.vue';
  import { closeAuthModal } from '@/sheep/hooks/useModal';

  const appInfo = computed(() => sheep.$store('app').info);

  const modalStore = sheep.$store('modal');
  // 授权弹窗类型
  const authType = computed(() => modalStore.auth);

  const state = reactive({
    protocol: false,
  });

  //勾选协议
  function onChange() {
    state.protocol = !state.protocol;
  }

  // 查看协议
  function onProtocol(id, title) {
    closeAuthModal();
    sheep.$router.go('/pages/public/richtext', {
      id,
      title,
    });
  }

  // 第三方授权登陆
  const thirdLogin = async (provider, event = null) => {
    if (!state.protocol) {
      sheep.$helper.toast('请勾选同意');
      return;
    }
    const loginRes = await sheep.$platform.useProvider(provider).login(event?.detail || null);
    if (loginRes) {
      closeAuthModal();
      const userInfo = await sheep.$store('user').getInfo();
    }
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';

  .safe-box {
    height: calc(constant(safe-area-inset-bottom) / 5 * 3);
    height: calc(env(safe-area-inset-bottom) / 5 * 3);
  }

  .tcp-text {
    color: var(--ui-BG-Main);
  }

  .agreement-text {
    color: $dark-9;
  }
</style>
