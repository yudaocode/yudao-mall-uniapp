<!-- 装修组件 - 秒杀 -->
<template>
  <view>
    <!-- 样式一：三列 - 上图下文 -->
    <view
      v-if="layoutType === 'threeCol'"
      class="goods-sm-box ss-flex ss-flex-wrap"
      :style="[{ margin: '-' + data.space + 'rpx' }]"
    >
      <view
        v-for="product in productList"
        :key="product.id"
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
          :goodsFields="data.fields"
          :tagStyle="tagStyle"
          :data="product"
          :titleColor="data.fields.name?.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @click="
            sheep.$router.go('/pages/goods/seckill', {
              id: props.data.activityId,
            })
          "
        ></s-goods-column>
      </view>
    </view>
    <!-- 样式二：一列 - 左图右文 -->
    <view class="goods-box" v-if="layoutType === 'oneCol'">
      <view
        class="goods-list"
        v-for="(product, index) in productList"
        :key="index"
        :style="[{ marginBottom: space + 'px' }]"
      >
        <s-goods-column
          class="goods-card"
          size="lg"
          :goodsFields="data.fields"
          :tagStyle="tagStyle"
          :data="product"
          :titleColor="data.fields.name?.color"
          :subTitleColor="data.fields.introduction?.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @click="
            sheep.$router.go('/pages/goods/seckill', {
              id: props.data.activityId,
            })
          "
        >
          <template v-slot:cart>
            <button class="ss-reset-button cart-btn" :style="[buyStyle]">
              {{ btnBuy?.type === 'text' ? btnBuy.text : '' }}
            </button>
          </template>
        </s-goods-column>
      </view>
    </view>
  </view>
</template>

<script setup>
  /**
   * 秒杀商品列表
   *
   * @property {Array} list 商品列表
   */
  import { computed, onMounted, ref } from 'vue';
  import sheep from '@/sheep';
  import SeckillApi from "@/sheep/api/promotion/seckill";
  import SpuApi from "@/sheep/api/product/spu";

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

  let { layoutType, tagStyle, btnBuy, space } = props.data;
  let { marginLeft, marginRight } = props.styles;

  // 购买按钮样式
  const buyStyle = computed(() => {
    let btnBuy = props.data.btnBuy;
    if (btnBuy?.type === 'text') {
      return {
        background: `linear-gradient(to right, ${btnBuy.bgBeginColor}, ${btnBuy.bgEndColor})`,
      };
    }
    if (btnBuy?.type === 'img') {
      return {
        width: '54rpx',
        height: '54rpx',
        background: `url(${sheep.$url.cdn(btnBuy.imgUrl)}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    }
  });

  // 商品列表
  const productList = ref([]);
  // 查询秒杀活动商品
  onMounted(async () => {
    // todo：@owen 与Yudao结构不一致，待重构
    const { data: activity } = await SeckillApi.getSeckillActivity(props.data.activityId);
    const { data: spu } = await SpuApi.getSpuDetail(activity.spuId)
    productList.value = [spu];
  });
</script>

<style lang="scss" scoped>
  .header-box {
    height: 100rpx;
  }

  .goods-list {
    position: relative;
    &:nth-last-child(1) {
      margin-bottom: 0 !important;
    }
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
