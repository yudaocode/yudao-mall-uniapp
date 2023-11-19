<template>
  <view>
    <!-- 布局1. 两列商品，图片左文案右 -->
    <view
      v-if="layoutType === 'twoCol'"
      class="goods-xs-box ss-flex ss-flex-wrap"
      :style="[{ margin: '-' + data.space + 'rpx' }]"
    >
      <view
        class="goods-xs-list"
        v-for="item in goodsList"
        :key="item.id"
        :style="[
          {
            padding: data.space + 'rpx',
          },
        ]"
      >
        <s-goods-column
          class="goods-card"
          size="xs"
          :goodsFields="productFields"
          :tagStyle="tagStyle"
          :data="item"
          :titleColor="productFields.title?.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          :titleWidth="(454 - marginRight * 2 - data.space * 2 - marginLeft * 2) / 2"
          @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
        ></s-goods-column>
      </view>
    </view>
    <!-- 布局. 三列商品：图片上文案下 -->
    <view
      v-if="layoutType === 'threeCol'"
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
          :goodsFields="productFields"
          :tagStyle="tagStyle"
          :data="item"
          :titleColor="productFields.title?.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
        ></s-goods-column>
      </view>
    </view>

    <!-- 布局3. 一行商品，水平滑动 -->
    <view v-if="layoutType === 'horizSwiper'" class="">
      <scroll-view class="scroll-box goods-scroll-box" scroll-x scroll-anchoring>
        <view class="goods-box ss-flex">
          <view
            class="goods-card-box"
            v-for="item in goodsList"
            :key="item.id"
            :style="[{ marginRight: data.space * 2 + 'rpx' }]"
          >
            <s-goods-column
              class="goods-card"
              size="sm"
              :goodsFields="productFields"
              :tagStyle="tagStyle"
              :data="item"
              :titleColor="productFields.title?.color"
              :titleWidth="(750 - marginRight * 2 - data.space * 4 - marginLeft * 2) / 3"
              @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            ></s-goods-column>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
  /**
   * 商品栏
   */
  import { onMounted, ref, computed } from 'vue';
  import sheep from '@/sheep';
  import SpuApi from "@/sheep/api/product/spu";

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
  const { layoutType, tagStyle, spuIds } = props.data;
  let { marginLeft, marginRight } = props.styles;
  const goodsList = ref([]);
  onMounted(async () => {
    if (spuIds.length > 0) {
      let { data } = await SpuApi.getSpuListByIds(spuIds.join(','));
      goodsList.value = data;
    }
  });

  // 商品字段配置，todo @owen 字段名称与服务端对齐，这里先转换，后期重构时再修改
  const productFields = computed(()  => {
    return {
      title: props.data.fields.name,
      subtitle: props.data.fields.introduction,
      price: props.data.fields.price,
      original_price: props.data.fields.marketPrice,
      stock: props.data.fields.stock,
      salesCount: props.data.fields.salesCount,
    }
  })

  // 角标，todo @owen 规范命名，这里先转换，后期重构时再修改
  const badge = computed(() => {
    return {
      show: props.data.badge.show,
      src: props.data.badge.imgUrl,
    }
  })
</script>

<style lang="scss" scoped>
  .goods-xs-box {
    // margin: 0 auto;
    width: 100%;
    .goods-xs-list {
      box-sizing: border-box;
      flex-shrink: 0;
      overflow: hidden;
      width: 50%;
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
  .goods-scroll-box {
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }
</style>
