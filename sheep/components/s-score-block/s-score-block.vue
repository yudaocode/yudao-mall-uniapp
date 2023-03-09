<template>
  <view>
    <view
      v-if="mode === 1 && state.scoreList.length"
      class="goods-md-wrap ss-flex ss-flex-wrap ss-col-top"
    >
      <view class="goods-list-box">
        <view
          class="left-list"
          :style="[{ paddingRight: data.space + 'rpx', marginBottom: data.space + 'px' }]"
          v-for="item in state.leftScoreList"
          :key="item.id"
        >
          <s-score-card
            class="goods-md-box"
            size="md"
            :goodsFields="goodsFields"
            :data="item"
            :titleColor="goodsFields.title?.color"
            :subTitleColor="goodsFields.subtitle.color"
            :topRadius="data.borderRadiusTop"
            :bottomRadius="data.borderRadiusBottom"
            :titleWidth="330 - marginLeft - marginRight"
            @click="sheep.$router.go('/pages/goods/score', { id: item.id })"
            @getHeight="mountMasonry($event, 'left')"
          >
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn" :style="[buyStyle]">
                {{ buyNowStyle.mode === 1 ? buyNowStyle.text : '' }}
              </button>
            </template>
          </s-score-card>
        </view>
      </view>
      <view class="goods-list-box">
        <view
          class="right-list"
          :style="[{ paddingLeft: data.space + 'rpx', marginBottom: data.space + 'px' }]"
          v-for="item in state.rightScoreList"
          :key="item.id"
        >
          <s-score-card
            class="goods-md-box"
            size="md"
            :goodsFields="goodsFields"
            :data="item"
            :titleColor="goodsFields.title?.color"
            :subTitleColor="goodsFields.subtitle.color"
            :topRadius="data.borderRadiusTop"
            :bottomRadius="data.borderRadiusBottom"
            :titleWidth="330 - marginLeft - marginRight"
            @click="sheep.$router.go('/pages/goods/score', { id: item.id })"
            @getHeight="mountMasonry($event, 'right')"
          >
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn" :style="[buyStyle]">
                {{ buyNowStyle.mode === 1 ? buyNowStyle.text : '' }}
              </button>
            </template>
          </s-score-card>
        </view>
      </view>

      <!-- <view class="goods-hack" v-if="state.scoreList.length % 2 == 1" style="width: 345rpx"></view> -->
    </view>
    <view v-if="mode === 2 && state.scoreList.length" class="goods-lg-box">
      <view
        class="goods-box"
        :style="[{ marginBottom: data.space + 'px' }]"
        v-for="item in state.scoreList"
        :key="item.id"
      >
        <s-score-card
          class="goods-card"
          size="lg"
          :goodsFields="goodsFields"
          :data="item"
          :titleColor="goodsFields.title?.color"
          :subTitleColor="goodsFields.subtitle.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @tap="sheep.$router.go('/pages/goods/score', { id: item.id })"
        >
          <template v-slot:cart>
            <button class="ss-reset-button cart-btn" :style="[buyStyle]">
              {{ buyNowStyle.mode === 1 ? buyNowStyle.text : '' }}
            </button>
          </template>
        </s-score-card>
      </view>
    </view>
  </view>
</template>
<script setup>
  import { computed, reactive, onMounted } from 'vue';
  import sheep from '@/sheep';

  const state = reactive({
    scoreList: [],
    leftScoreList: [],
    rightScoreList: [],
  });
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
  const { mode, buyNowStyle, goodsFields, goodsIds } = props.data ?? {};
  const { marginLeft, marginRight } = props.styles ?? {};
  async function getScoreListByIds(ids) {
    let { data } = await sheep.$api.app.scoreShop.ids({ ids });
    return data;
  }

  onMounted(async () => {
    state.scoreList = await getScoreListByIds(goodsIds.join(','));
    if (mode === 1) {
      mountMasonry();
    }
  });

  // 加载瀑布流
  let count = 0;
  let leftHeight = 0;
  let rightHeight = 0;

  function mountMasonry(height = 0, where = 'left') {
    if (!state.scoreList[count]) return;
    if (where === 'left') leftHeight += height;
    if (where === 'right') rightHeight += height;
    if (leftHeight <= rightHeight) {
      state.leftScoreList.push(state.scoreList[count]);
    } else {
      state.rightScoreList.push(state.scoreList[count]);
    }
    count++;
  }
  // 购买按钮样式
  const buyStyle = computed(() => {
    if (buyNowStyle.mode == 1) {
      // button
      return {
        background: `linear-gradient(to right, ${buyNowStyle.color1}, ${buyNowStyle.color2})`,
      };
    }

    if (buyNowStyle.mode == 2) {
      // image
      return {
        width: '54rpx',
        height: '54rpx',
        background: `url(${sheep.$url.cdn(buyNowStyle.src)}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    }
  });
</script>
<style lang="scss" scoped>
  .goods-md-wrap {
    width: 100%;
  }

  .goods-list-box {
    width: 50%;
    box-sizing: border-box;
    .left-list {
      &:nth-last-child(1) {
        margin-bottom: 0 !important;
      }
    }
  }

  .goods-box {
    &:nth-last-of-type(1) {
      margin-bottom: 0 !important;
    }
  }

  .goods-md-box,
  .goods-sl-box,
  .goods-lg-box {
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
</style>
