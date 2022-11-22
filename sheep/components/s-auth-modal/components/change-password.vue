<!-- 修改密码 - changePassword  -->
<template>
  <view>
    <!-- 标题栏 -->
    <view class="head-box ss-m-b-60">
      <view class="head-title ss-m-b-20">修改密码</view>
      <view class="head-subtitle">如密码丢失或未设置,请点击忘记密码重新设置</view>
    </view>

    <!-- 表单项 -->
    <uni-forms
      ref="changePasswordRef"
      v-model="state.model"
      :rules="state.rules"
      validateTrigger="bind"
      labelWidth="140"
      labelAlign="center"
    >
      <uni-forms-item name="oldPassword" label="旧密码">
        <uni-easyinput
          placeholder="请输入旧密码"
          v-model="state.model.oldPassword"
          type="text"
          :inputBorder="false"
        />
      </uni-forms-item>

      <uni-forms-item name="newPassword" label="新密码">
        <uni-easyinput
          type="password"
          placeholder="请输入新密码"
          v-model="state.model.newPassword"
          :inputBorder="false"
        />
      </uni-forms-item>

      <uni-forms-item name="reNewPassword" label="确认密码">
        <uni-easyinput
          type="password"
          placeholder="请重新输入您的新密码"
          v-model="state.model.reNewPassword"
          :inputBorder="false"
        >
          <template v-slot:right>
            <button class="ss-reset-button login-btn-start" @tap="changePasswordSubmit">
              确认
            </button>
          </template>
        </uni-easyinput>
      </uni-forms-item>
    </uni-forms>

    <view class="editPwd-btn-box ss-m-t-80">
      <button class="ss-reset-button forgot-btn" @tap="showAuthModal('resetPassword')">
        忘记密码
      </button>
    </view>
  </view>
</template>

<script setup>
  import { computed, watch, ref, reactive, unref } from 'vue';
  import sheep from '@/sheep';
  import { password } from '@/sheep/validate/form';
  import { showAuthModal, closeAuthModal } from '@/sheep/hooks/useModal';

  const changePasswordRef = ref(null);

  // 数据
  const state = reactive({
    isMobileEnd: false, // 手机号输入完毕
    model: {
      oldPassword: '', //旧密码
      newPassword: '', //新密码
      reNewPassword: '', //确认密码
    },
    rules: {
      oldPassword: password,
      newPassword: password,
      reNewPassword: {
        rules: [
          {
            required: true,
            errorMessage: '请确认密码',
          },
          {
            validateFunction: function (rule, value, data, callback) {
              if (value !== state.model.newPassword) {
                callback('两次输入的密码不一致');
              }
              if (value === state.model.oldPassword) {
                callback('新密码不能与旧密码相同');
              }
              return true;
            },
          },
        ],
      },
    },
  });

  // 6.更改密码
  async function changePasswordSubmit() {
    const validate = await unref(changePasswordRef)
      .validate()
      .catch((error) => {
        console.log('error: ', error);
      });
    if (!validate) return;
    sheep.$api.user.changePassword(state.model).then((res) => {
      if (res.error === 0) {
        sheep.$store('user').getInfo();
        closeAuthModal();
      }
    });
  }
</script>

<style lang="scss" scoped>
  @import '../index.scss';
</style>
