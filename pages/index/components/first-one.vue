<template>
  <view class="ss-flex-col">
    <view class="goods-box" v-for="item in pagination.data" :key="item.id">
      <s-goods-column
        size="sl"
        :data="item"
        @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
      ></s-goods-column>
    </view>
  </view>
</template>

<script setup>
  import sheep from '@/sheep';
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
    activeMenu: [Number, String],
    pagination: Object,
  });
</script>

<style lang="scss" scoped>
  .goods-box {
    width: 100%;
  }
</style>
