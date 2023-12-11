<template>
  <view class="order">
    <view class="top ss-flex ss-row-between">
      <span>{{ orderData.order_sn }}</span>
      <span>{{ orderData.create_time.split(' ')[1] }}</span>
    </view>
    <template v-if="from != 'msg'">
      <view class="bottom ss-flex" v-for="item in orderData.items" :key="item">
        <image class="image" :src="sheep.$url.cdn(item.goods_image)" mode="aspectFill"> </image>
        <view class="ss-flex-1">
          <view class="title ss-line-2">
            {{ item.goods_title }}
          </view>
          <view v-if="item.goods_num" class="num ss-m-b-10"> 数量：{{ item.goods_num }} </view>
          <view class="ss-flex ss-row-between ss-m-t-8">
            <span class="price">￥{{ item.goods_price }}</span>
            <span class="status">{{ orderData.status_text }}</span>
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <view class="bottom ss-flex" v-for="item in [orderData.items[0]]" :key="item">
        <image class="image" :src="sheep.$url.cdn(item.goods_image)" mode="aspectFill"> </image>
        <view class="ss-flex-1">
          <view class="title title-1 ss-line-1">
            {{ item.goods_title }}
          </view>
          <view class="order-total ss-flex ss-row-between ss-m-t-8">
            <span>共{{ orderData.items.length }}件商品</span>
            <span>合计 ¥{{ orderData.pay_fee }}</span>
          </view>
          <view class="ss-flex ss-row-right ss-m-t-8">
            <span class="status">{{ orderData.status_text }}</span>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup>
  import sheep from '@/sheep';

  const props = defineProps({
    from: String,
    orderData: {
      type: Object,
      default: {},
    },
  });
</script>

<style lang="scss" scoped>
  .order {
    background: #fff;
    padding: 20rpx;
    border-radius: 12rpx;

    .top {
      line-height: 40rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #999;
      border-bottom: 1px solid rgba(223, 223, 223, 0.5);
      margin-bottom: 20rpx;
    }

    .bottom {
      margin-bottom: 20rpx;

      &:last-of-type {
        margin-bottom: 0;
      }

      .image {
        flex-shrink: 0;
        width: 116rpx;
        height: 116rpx;
        margin-right: 20rpx;
      }

      .title {
        height: 64rpx;
        line-height: 32rpx;
        font-size: 26rpx;
        font-weight: 500;
        color: #333;

        &.title-1 {
          height: 32rpx;
          width: 300rpx;
        }
      }

      .num {
        font-size: 24rpx;
        font-weight: 400;
        color: #999;
      }

      .price {
        font-size: 26rpx;
        font-weight: 500;
        color: #ff3000;
      }

      .status {
        font-size: 24rpx;
        font-weight: 500;
        color: var(--ui-BG-Main);
      }

      .order-total {
        line-height: 28rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #999;
      }
    }
  }
</style>
