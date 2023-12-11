<template>
  <view><web-view :src="url"></web-view></view>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app';
  import { ref } from 'vue';

  const url = ref('');
  onLoad((options) => {
    url.value = decodeURIComponent(options.url);
  });
</script>

<style lang="scss" scoped></style>
