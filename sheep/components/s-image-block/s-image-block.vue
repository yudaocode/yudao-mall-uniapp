<template>
  <view @tap="sheep.$router.go(data?.url)">
    <su-image :src="sheep.$url.cdn(data.src)" mode="widthFix"></su-image>
  </view>
</template>

<script setup>
  /**
   * 图片组件
   */
  import sheep from '@/sheep';

  // 接收参数
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  });
</script>

<style lang="scss" scoped></style>
