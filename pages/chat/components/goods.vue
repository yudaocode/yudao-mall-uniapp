<template>
  <view class="goods ss-flex">
    <image class="image" :src="sheep.$url.cdn(goodsData.image)" mode="aspectFill"> </image>
    <view class="ss-flex-1">
      <view class="title ss-line-2">
        {{ goodsData.title }}
      </view>
      <view v-if="goodsData.subtitle" class="subtitle ss-line-1">
        {{ goodsData.subtitle }}
      </view>
      <view class="price ss-m-t-8">
        ￥{{ isArray(goodsData.price) ? goodsData.price[0] : goodsData.price }}
      </view>
    </view>
  </view>
</template>

<script setup>
  import sheep from '@/sheep';
  import { isArray } from 'lodash';

  const props = defineProps({
    goodsData: {
      type: Object,
      default: {},
    },
  });
</script>

<style lang="scss" scoped>
  .goods {
    background: #fff;
    padding: 20rpx;
    border-radius: 12rpx;

    .image {
      width: 116rpx;
      height: 116rpx;
      flex-shrink: 0;
      margin-right: 20rpx;
    }

    .title {
      height: 64rpx;
      line-height: 32rpx;
      font-size: 26rpx;
      font-weight: 500;
      color: #333;
    }

    .subtitle {
      font-size: 24rpx;
      font-weight: 400;
      color: #999;
    }

    .price {
      font-size: 26rpx;
      font-weight: 500;
      color: #ff3000;
    }
  }
</style>
