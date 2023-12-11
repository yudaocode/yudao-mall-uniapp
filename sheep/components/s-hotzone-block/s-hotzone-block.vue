<template>
  <view class="hotzone-wrap">
    <image :src="sheep.$url.cdn(data.src)" style="width: 100%" mode="widthFix"></image>
    <view
      class="hotzone-box"
      v-for="item in data.list"
      :key="item.width"
      :style="[
        {
          top: item.top + 'rpx',
          left: item.left + 'rpx',
          width: item.width + 'rpx',
          height: item.height + 'rpx',
        },
      ]"
      @tap.stop="sheep.$router.go(item.url)"
    >
    </view>
  </view>
</template>

<script setup>
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

<style lang="scss" scoped>
  .hotzone-wrap {
    position: relative;
  }
  .hotzone-box {
    position: absolute;
  }
</style>
