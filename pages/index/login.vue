<template>
  <!-- 空登陆页 -->
  <view></view>
</template>

<script setup>
  import { isEmpty } from 'lodash';
  import sheep from '@/sheep';
  import { onLoad, onShow } from '@dcloudio/uni-app';

  onLoad(async (options) => {
    // #ifdef H5
    let event = '';
    if (options.login_code) {
      event = 'login';
      const { error } = await sheep.$platform.useProvider().login(options.login_code);
      if (error === 0) {
        sheep.$store('user').getInfo();
      }
    }
    if (options.bind_code) {
      event = 'bind';
      const { error } = await sheep.$platform.useProvider().bind(options.bind_code);
    }

    // 检测H5登录回调
    let returnUrl = uni.getStorageSync('returnUrl');
    if (returnUrl) {
      uni.removeStorage('returnUrl');
      location.replace(returnUrl);
    } else {
      uni.switchTab({
        url: '/',
      });
    }

    // #endif
  });
</script>
