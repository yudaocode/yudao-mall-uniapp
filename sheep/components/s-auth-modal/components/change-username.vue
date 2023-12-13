<!-- 修改用户名 changeUsername  -->
<template>
  <view>
    <!-- 标题栏 -->
    <view class="head-box ss-m-b-60">
      <view class="head-title ss-m-b-20">修改用户名</view>
      <view class="head-subtitle">用户名仅限修改一次</view>
    </view>

    <!-- 表单项 -->
    <uni-forms
      ref="formRef"
      v-model="state.model"
      :rules="state.rules"
      validateTrigger="bind"
      labelWidth="140"
      labelAlign="center"
    >
      <uni-forms-item name="username" label="用户名">
        <uni-easyinput
          placeholder="请输入用户名"
          v-model="state.model.username"
          :inputBorder="false"
        ></uni-easyinput>
      </uni-forms-item>

      <view class="editPwd-btn-box ss-m-t-80">
        <button class="ss-reset-button save-btn ui-Shadow-Main" @tap="changeUsernameSubmit">
          保存
        </button>
      </view>
    </uni-forms>
  </view>
</template>

<script setup>
  import { computed, watch, ref, reactive, unref } from 'vue';
  import sheep from '@/sheep';
  import { username } from '@/sheep/validate/form';
  import { showAuthModal, closeAuthModal } from '@/sheep/hooks/useModal';
  const formRef = ref(null);

  // 数据
  const state = reactive({
    model: {
      username: '',
    },
    rules: {
      username,
    },
  });

  // 7.修改用户名
  async function changeUsernameSubmit() {
    const validate = await unref(formRef)
      .validate()
      .catch((error) => {
        console.log('error: ', error);
      });
    if (!validate) return;
    sheep.$api.user.changeUsername(state.model).then((res) => {
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
