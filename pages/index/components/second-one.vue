<!-- 页面  -->
<template>
  <view>
    <view class="title-box ss-flex ss-col-center ss-row-center ss-p-b-30">
      <view class="title-line-left"></view>
      <view class="title-text ss-p-x-20">{{ props.data.children[activeMenu].name }}</view>
      <view class="title-line-right"></view>
    </view>
    <view class="goods-item-box ss-flex ss-flex-wrap ss-p-b-20">
      <view
        class="goods-item"
        v-for="item in props.data.children[activeMenu].children"
        :key="item.id"
      >
        <image class="goods-img" :src="sheep.$url.cdn(item.image)" mode="aspectFill"></image>
        <view class="ss-p-10">
          <view class="goods-title ss-line-1">{{ item.name }}</view>
        </view>
      </view>
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
  .title-box {
    .title-line-left,
    .title-line-right {
      width: 15px;
      height: 1px;
      background: #d2d2d2;
    }
  }

  .goods-item {
    width: calc((100% - 20px) / 3);
    margin-right: 10px;
    margin-bottom: 10px;

    &:nth-of-type(3n) {
      margin-right: 0;
    }

    .goods-img {
      width: calc((100vw - 140px) / 3);
      height: calc((100vw - 140px) / 3);
    }

    .goods-title {
      font-size: 26rpx;
      font-weight: bold;
      color: #333333;
      line-height: 40rpx;
      text-align: center;
    }

    .goods-price {
      color: $red;
      line-height: 40rpx;
    }
  }
</style>
