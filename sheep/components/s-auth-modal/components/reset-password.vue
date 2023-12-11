<!-- 重置密码 - resetPassword--  -->
<template>
  <view>
    <!-- 标题栏 -->
    <view class="head-box ss-m-b-60">
      <view class="head-title ss-m-b-20">重置密码</view>
      <view class="head-subtitle">为了您的账号安全，设置密码前请先进行安全验证</view>
    </view>

    <!-- 表单项 -->
    <uni-forms
      ref="resetPasswordRef"
      v-model="state.model"
      :rules="state.rules"
      validateTrigger="bind"
      labelWidth="140"
      labelAlign="center"
    >
      <uni-forms-item name="mobile" label="手机号">
        <uni-easyinput
          placeholder="请输入手机号"
          v-model="state.model.mobile"
          type="number"
          :inputBorder="false"
        >
          <template v-slot:right>
            <button
              class="ss-reset-button code-btn code-btn-start"
              :disabled="state.isMobileEnd"
              :class="{ 'code-btn-end': state.isMobileEnd }"
              @tap="getSmsCode('resetPassword', state.model.mobile)"
            >
              {{ getSmsTimer('resetPassword') }}
            </button>
          </template>
        </uni-easyinput>
      </uni-forms-item>

      <uni-forms-item name="code" label="验证码">
        <uni-easyinput
          placeholder="请输入验证码"
          v-model="state.model.code"
          type="number"
          maxlength="4"
          :inputBorder="false"
        ></uni-easyinput>
      </uni-forms-item>

      <uni-forms-item name="password" label="密码">
        <uni-easyinput
          type="password"
          placeholder="请输入密码"
          v-model="state.model.password"
          :inputBorder="false"
        >
          <template v-slot:right>
            <button class="ss-reset-button login-btn-start" @tap="resetPasswordSubmit">
              确认
            </button>
          </template>
        </uni-easyinput>
      </uni-forms-item>
    </uni-forms>

    <button v-if="!isLogin" class="ss-reset-button type-btn" @tap="showAuthModal('accountLogin')">
      返回登录
    </button>
  </view>
</template>

<script setup>
  import { computed, watch, ref, reactive, unref } from 'vue';
  import sheep from '@/sheep';
  import { code, mobile, password } from '@/sheep/validate/form';
  import { showAuthModal, closeAuthModal, getSmsCode, getSmsTimer } from '@/sheep/hooks/useModal';

  const resetPasswordRef = ref(null);
  const isLogin = computed(() => sheep.$store('user').isLogin);

  // 数据
  const state = reactive({
    isMobileEnd: false, // 手机号输入完毕
    model: {
      mobile: '', //手机号
      code: '', //验证码
      password: '', //密码
    },
    rules: {
      code,
      mobile,
      password,
    },
  });

  // 4.重置密码
  const resetPasswordSubmit = async () => {
    const validate = await unref(resetPasswordRef)
      .validate()
      .catch((error) => {
        console.log('error: ', error);
      });
    if (!validate) return;
    sheep.$api.user.resetPassword(state.model).then((res) => {
      if (res.error === 0) {
        sheep.$store('user').getInfo();
        closeAuthModal();
      }
    });
  };
</script>

<style lang="scss" scoped>
  @import '../index.scss';
</style>
