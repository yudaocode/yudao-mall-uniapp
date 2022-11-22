<!-- 装修组件 - 拼团 -->
<template>
  <view>
    <view
      v-if="mode === 1"
      class="goods-sm-box ss-flex ss-flex-wrap"
      :style="[{ margin: '-' + data.space + 'rpx' }]"
    >
      <view
        v-for="item in goodsList"
        :key="item.id"
        class="goods-card-box"
        :style="[
          {
            padding: data.space + 'rpx',
          },
        ]"
      >
        <s-goods-column
          class="goods-card"
          size="sm"
          :goodsFields="goodsFields"
          :tagStyle="tagStyle"
          :data="item"
          :titleColor="goodsFields.title?.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @click="
            sheep.$router.go('/pages/goods/groupon', {
              id: item.id,
              activity_id: props.data.activityId,
            })
          "
        ></s-goods-column>
      </view>
    </view>
    <!-- 样式2 一行一个 图片左 文案右 -->
    <view class="goods-box" v-if="mode == 2">
      <view
        class="goods-list"
        v-for="(item, index) in goodsList"
        :key="index"
        :style="[{ marginBottom: space + 'px' }]"
      >
        <s-goods-column
          class="goods-card"
          size="lg"
          :includes="goodsFields"
          :tagStyle="tagStyle"
          :data="item"
          :titleColor="goodsFields.title?.color"
          :subTitleColor="goodsFields.subtitle.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @click="
            sheep.$router.go('/pages/goods/groupon', {
              id: item.id,
              activity_id: props.data.activityId,
            })
          "
        >
          <template v-slot:cart>
            <button class="ss-reset-button cart-btn" :style="[buyStyle]">
              {{ buyNowStyle.mode === 1 ? buyNowStyle.text : '' }}
            </button>
          </template>
        </s-goods-column>
      </view>
    </view>
  </view>
</template>

<script setup>
  /**
   * 拼团
   *
   * @property {Array} list 											- 商品列表
   *
   *
   */
  import { computed, onMounted, ref } from 'vue';
  import sheep from '@/sheep';

  // 接收参数
  const props = defineProps({
    data: {
      type: Object,
      default() {},
    },
    styles: {
      type: Object,
      default() {},
    },
  });

  let { mode, tagStyle, buyNowStyle, goodsFields, space } = props.data;
  let { marginLeft, marginRight } = props.styles;

  // 购买按钮样式
  const buyStyle = computed(() => {
    let buyNowStyle = props.data.buyNowStyle;
    if (buyNowStyle.mode == 1) {
      return {
        background: `linear-gradient(to right, ${buyNowStyle.color1}, ${buyNowStyle.color2})`,
      };
    }

    if (buyNowStyle.mode == 2) {
      return {
        width: '54rpx',
        height: '54rpx',
        background: `url(${sheep.$url.cdn(buyNowStyle.src)}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    }
  });

  const goodsList = ref([]);
  onMounted(async () => {
    let { data } = await sheep.$api.goods.activity({ activity_id: props.data.activityId });
    goodsList.value = data;
  });
</script>

<style lang="scss" scoped>
  .goods-list {
    position: relative;
    .cart-btn {
      position: absolute;
      bottom: 10rpx;
      right: 20rpx;
      z-index: 11;
      height: 50rpx;
      line-height: 50rpx;
      padding: 0 20rpx;
      border-radius: 25rpx;
      font-size: 24rpx;
      color: #fff;
    }
  }
  .goods-list {
    &:nth-last-of-type(1) {
      margin-bottom: 0 !important;
    }
  }
  .goods-sm-box {
    margin: 0 auto;
    box-sizing: border-box;
    .goods-card-box {
      flex-shrink: 0;
      overflow: hidden;
      width: 33.3%;
      box-sizing: border-box;
    }
  }
</style>
