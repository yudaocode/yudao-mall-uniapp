<!-- 页面  -->
<template>
  <view>
    <view v-for="item in props.data.children[activeMenu].children" :key="item.id">
      <view class="title-box ss-flex ss-col-center ss-row-between ss-p-b-30">
        <view class="title-text">{{ item.name }}</view>
        <button
          class="ss-reset-button more-btn"
          @tap="
            sheep.$router.go('/pages/goods/list', {
              categoryId: item.id,
            })
          "
        >
          查看更多
          <text class="cicon-forward"></text>
        </button>
      </view>
      <view class="goods-item-box ss-flex ss-flex-wrap ss-p-b-20">
        <view class="goods-item" v-for="i in item.children" :key="i">
          <view
            @tap="
              sheep.$router.go('/pages/goods/list', {
                categoryId: i.id,
              })
            "
          >
            <image class="goods-img" :src="sheep.$url.cdn(i.image)" mode="aspectFill"></image>
            <view class="ss-p-10">
              <view class="goods-title ss-line-1">{{ i.name }}</view>
            </view>
          </view>
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
    .title-text {
      font-size: 28rpx;
      font-weight: bold;
      color: #333333;
    }

    .more-btn {
      font-size: 26rpx;
      font-weight: 400;
      color: #999999;
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
      font-size: 24rpx;
      font-weight: 500;
      color: #333333;
      text-align: center;
    }

    .goods-price {
      color: $red;
      line-height: 40rpx;
    }
  }
</style>
