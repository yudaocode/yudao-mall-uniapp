<template>
  <s-layout title="发货内容">
    <view class="order-card ss-m-x-20 ss-r-20">
      <s-goods-item
        :img="state.data.goods_image"
        :title="state.data.goods_title"
        :skuText="state.data.goods_sku_text"
        :price="state.data.goods_price"
        :num="state.data.goods_num"
        radius="20"
      >
        <template #priceSuffix>
          <button class="ss-reset-button tag-btn" v-if="state.data.status_text">
            {{ state.data.status_text }}
          </button>
        </template>
      </s-goods-item>
    </view>
    <view class="bg-white ss-p-20 ss-m-x-20 ss-r-20">
      <view class="title ss-m-b-26">发货信息</view>
      <view v-if="state.data.ext?.dispatch_content_type === 'params'">
        <view class="desc ss-m-b-20" v-for="item in state.data.ext.dispatch_content" :key="item">
          {{ item.title }}: {{ item.content }}
        </view>
      </view>
      <view class="desc" v-else>{{ state.data.ext?.dispatch_content }}</view>
    </view>
  </s-layout>
</template>
<script setup>
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import sheep from '@/sheep';

  const state = reactive({
    data: [],
  });
  async function getDetail(id, item_id) {
    const { error, data } = await sheep.$api.order.itemDetail(id,item_id);
    if (error === 0) {
      state.data = data;
    }
  }
  onLoad((options) => {
    getDetail(options.id, options.item_id);
  });
</script>
<style lang="scss" scoped>
  .order-card {
    padding: 20rpx 0;

    .order-sku {
      font-size: 24rpx;

      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      width: 450rpx;
      margin-bottom: 20rpx;

      .order-num {
        margin-right: 10rpx;
      }
    }
    .tag-btn {
      margin-left: 16rpx;
      font-size: 24rpx;
      height: 36rpx;
      color: var(--ui-BG-Main);
      border: 2rpx solid var(--ui-BG-Main);
      border-radius: 14rpx;
      padding: 0 4rpx;
    }
  }
  .title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
  }
  .desc {
    font-size: 26rpx;
    font-weight: 400;
    color: #333333;
  }
</style>
