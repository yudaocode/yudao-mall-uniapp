<template>
  <view>
    <!-- 1  两张图片并排 图片坐文案右 -->
    <view
      v-if="mode === 1"
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
          :goodsFields="goodsFields"
          :tagStyle="tagStyle"
          :data="item"
          :titleColor="goodsFields.title?.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          :titleWidth="(454 - marginRight * 2 - data.space * 2 - marginLeft * 2) / 2"
          @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
        ></s-goods-column>
      </view>
    </view>
    <!-- 2  三张商品卡片并排 图片上文案下 -->
    <view
      v-if="mode === 2"
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
          @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
        ></s-goods-column>
      </view>
    </view>

    <!-- 3 商品卡片并排 轮播 -->
    <view v-if="mode === 3" class="">
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
              :goodsFields="goodsFields"
              :tagStyle="tagStyle"
              :data="item"
              :titleColor="goodsFields.title?.color"
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
   * 商品栏s-goods-column
   *
   * @description style 1:横向两个，左图右内容 2：横向三个，上图下内容 3：左右滚动
   */
  import { onMounted, ref } from 'vue';
  import sheep from '@/sheep';

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
  const { mode, tagStyle, buyNowStyle, goodsFields, goodsIds } = props.data;
  let { marginLeft, marginRight } = props.styles;
  const goodsList = ref([]);
  onMounted(async () => {
    if (goodsIds.length > 0) {
      let { data } = await sheep.$api.goods.ids({ ids: goodsIds.join(',') });
      goodsList.value = data;
    }
  });
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
