<template>
  <s-layout
    title="我的"
    tabbar="/pages/index/user"
    navbar="custom"
    :bgStyle="template.style?.background"
    :navbarStyle="template.style?.navbar"
    onShareAppMessage
    :showFloatButton="true"
  >
    <s-block v-for="(item, index) in template.data" :key="index" :styles="item.style">
      <s-block-item :type="item.type" :data="item.data" :styles="item.style" />
    </s-block>
  </s-layout>
</template>

<script setup>
  import { computed } from 'vue';
  import { onShow, onPageScroll, onPullDownRefresh } from '@dcloudio/uni-app';
  import sheep from '@/sheep';

  // 隐藏原生tabBar
  uni.hideTabBar();

  const template = computed(() => sheep.$store('app').template.user);
  const isLogin = computed(() => sheep.$store('user').isLogin);

  onShow(() => {
    sheep.$store('user').updateUserData();
  });

  onPullDownRefresh(() => {
    sheep.$store('user').updateUserData();
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 800);
  });

  onPageScroll(() => {});
</script>

<style></style>
