<template>
  <view>
    <s-layout :onShareAppMessage="state.shareInfo" navbar="goods">
      <!-- 标题栏 -->
      <detailNavbar />
      <detailSkeleton v-if="state.skeletonLoading" />
      <!-- 空置页 -->

      <s-empty
        v-else-if="state.goodsInfo === null"
        text="商品不存在或已下架"
        icon="/static/soldout-empty.png"
        showAction
        actionText="再逛逛"
        actionUrl="/pages/goods/list"
      />
      <block v-else>
        <!-- 商品轮播图  -->
        <su-swiper
          class="ss-m-b-14 detail-swiper-selector"
          isPreview
          :list="state.goodsSwiper"
          dotStyle="tag"
          imageMode="widthFix"
          dotCur="bg-mask-40"
          :seizeHeight="750"
        />

        <!-- 价格+标题 -->
        <view class="title-card detail-card ss-p-y-40 ss-p-x-20">
          <view class="ss-flex ss-row-between ss-col-center ss-m-b-18">
            <view class="price-box ss-flex ss-col-bottom">
              <view v-if="goodsPrice.price > 0" class="price-text"> ￥{{ goodsPrice.price }} </view>
              <text v-if="goodsPrice.price > 0 && goodsPrice.score > 0">+</text>
              <image
                :src="sheep.$url.static('/static/img/shop/goods/score1.svg')"
                class="score-img"
              ></image>
              <view class="score-text ss-m-r-16">
                {{ goodsPrice.score }}
              </view>
            </view>
            <view class="sales-text">
              {{ formatExchange(state.goodsInfo.sales_show_type, state.goodsInfo.sales) }}
            </view>
          </view>
          <view class="origin-price-text ss-m-b-60" v-if="state.goodsInfo.original_price">
            原价：￥{{ state.selectedSkuPrice.original_price || state.goodsInfo.original_price }}
          </view>
          <view class="title-text ss-line-2 ss-m-b-6">{{ state.goodsInfo.title }}</view>
          <view class="subtitle-text ss-line-1">{{ state.goodsInfo.subtitle }}</view>
        </view>

        <!-- 功能卡片 -->
        <view class="detail-cell-card detail-card ss-flex-col">
          <detail-cell-sku
            v-model="state.selectedSkuPrice.goods_sku_text"
            :skus="state.goodsInfo.skus"
            @tap="state.showSelectSku = true"
          />
          <detail-cell-service v-model="state.goodsInfo.service" />
          <detail-cell-params v-model="state.goodsInfo.params" />
        </view>
        <!-- 规格与数量弹框 -->
        <s-select-sku
          :goodsInfo="state.goodsInfo"
          :show="state.showSelectSku"
          :isScore="true"
          @addCart="onAddCart"
          @buy="onBuy"
          @change="onSkuChange"
          @close="state.showSelectSku = false"
        />

        <!-- 评价 -->
        <view class="detail-comment-selector">
          <detail-comment-card :goodsId="state.goodsId" />
        </view>

        <!-- 详情 -->
        <view class="detail-content-selector"></view>
        <detail-content-card :content="state.goodsInfo.content" />

        <!-- 详情tabbar -->
        <detail-tabbar v-model="state.goodsInfo" :shareIcon="false" :collectIcon="false">
          <!-- TODO: 缺货中 已售罄 判断 设计-->
          <view class="buy-box ss-flex ss-col-center ss-p-r-20" v-if="state.goodsInfo.stock > 0">
            <button class="ss-reset-button buy-btn" @tap="state.showSelectSku = true">
              立即兑换
            </button>
          </view>
          <view class="buy-box ss-flex ss-col-center ss-p-r-20" v-else>
            <button class="ss-reset-button disabled-btn" disabled> 已兑完 </button>
          </view>
        </detail-tabbar>
      </block>
    </s-layout>
  </view>
</template>

<script setup>
  import { reactive, computed } from 'vue';
  import { onLoad, onPageScroll } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import { isEmpty } from 'lodash';
  import { formatExchange, formatGoodsSwiper } from '@/sheep/hooks/useGoods';
  import detailNavbar from './components/detail/detail-navbar.vue';
  import detailCellSku from './components/detail/detail-cell-sku.vue';
  import detailCellService from './components/detail/detail-cell-service.vue';
  import detailCellParams from './components/detail/detail-cell-params.vue';
  import detailTabbar from './components/detail/detail-tabbar.vue';
  import detailSkeleton from './components/detail/detail-skeleton.vue';
  import detailCommentCard from './components/detail/detail-comment-card.vue';
  import detailContentCard from './components/detail/detail-content-card.vue';

  const headerBg = sheep.$url.css('/static/img/shop/goods/score-bg.png');
  const seckillBg = sheep.$url.css('/static/img/shop/goods/seckill-tip-bg.png');
  const grouponBg = sheep.$url.css('/static/img/shop/goods/seckill-tip-bg.png');

  onPageScroll(() => {});

  const state = reactive({
    goodsId: 0,
    skeletonLoading: true,
    goodsInfo: {},
    showSelectSku: false,
    goodsSwiper: [],
    selectedSkuPrice: {},
    shareInfo: {},
    showModel: false,
    total: 0,
    couponInfo: [],
  });

  const goodsPrice = computed(() => {
    let price, score;
    if (isEmpty(state.selectedSkuPrice)) {
      price = state.goodsInfo.price[0];
      score = state.goodsInfo.score || 0;
    } else {
      price = state.selectedSkuPrice.price;
      score = state.selectedSkuPrice.score || 0;
    }
    return { price, score };
  });

  // 规格变更
  function onSkuChange(e) {
    state.selectedSkuPrice = e;
  }
  // 格式化价格
  function formatPrice(e) {
    if (Number(e[0]) > 0) {
      return e.length === 1 ? e[0] : e.join('~');
    } else {
      return '';
    }
  }
  // 添加购物车
  function onAddCart(e) {
    sheep.$store('cart').add(e);
  }
  // 立即购买
  function onBuy(e) {
    sheep.$router.go('/pages/order/confirm', {
      data: JSON.stringify({
        order_type: 'score',
        goods_list: [
          {
            goods_id: e.goods_id,
            goods_num: e.goods_num,
            goods_sku_price_id: e.id,
          },
        ],
      }),
    });
  }

  onLoad((options) => {
    // 非法参数
    if (!options.id) {
      state.goodsInfo = null;
      return;
    }
    state.goodsId = options.id;
    // 加载商品信息
    sheep.$api.app.scoreShop.detail(state.goodsId).then((res) => {
      state.skeletonLoading = false;
      if (res.error === 0) {
        state.goodsInfo = res.data;
        state.goodsSwiper = formatGoodsSwiper(state.goodsInfo.images);
      } else {
        // 未找到商品
        state.goodsInfo = null;
      }
    });
  });
</script>

<style lang="scss" scoped>
  .detail-card {
    background-color: #ffff;
    margin: 14rpx 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
  }

  // 价格标题卡片
  .title-card {
    width: 710rpx;
    box-sizing: border-box;
    background-size: 100% 100%;
    border-radius: 10rpx;
    background-image: v-bind(headerBg);
    background-repeat: no-repeat;
    .price-box {
      .score-img {
        width: 36rpx;
        height: 36rpx;
        margin: 0 4rpx;
      }
      .score-text {
        font-size: 42rpx;
        font-weight: 500;
        color: #ff3000;
        line-height: 36rpx;
        font-family: OPPOSANS;
      }
      .price-text {
        font-size: 42rpx;
        font-weight: 500;
        color: #ff3000;
        line-height: 36rpx;
        font-family: OPPOSANS;
      }
    }
    .origin-price-text {
      font-size: 26rpx;
      font-weight: 400;
      text-decoration: line-through;
      color: $gray-c;
      font-family: OPPOSANS;
    }

    .sales-text {
      font-size: 26rpx;
      font-weight: 500;
      color: $gray-c;
    }

    .discounts-box {
      .discounts-tag {
        padding: 4rpx 10rpx;
        font-size: 24rpx;
        font-weight: 500;
        border-radius: 4rpx;
        color: var(--ui-BG-Main);
        // background: rgba(#2aae67, 0.05);
        background: var(--ui-BG-Main-tag);
      }

      .discounts-title {
        font-size: 24rpx;
        font-weight: 500;
        color: var(--ui-BG-Main);
        line-height: normal;
      }

      .cicon-forward {
        color: var(--ui-BG-Main);
        font-size: 24rpx;
        line-height: normal;
        margin-top: 4rpx;
      }
    }

    .title-text {
      font-size: 30rpx;
      font-weight: bold;
      line-height: 42rpx;
    }

    .subtitle-text {
      font-size: 26rpx;
      font-weight: 400;
      color: $dark-9;
      line-height: 42rpx;
    }
  }

  // 购买
  .buy-box {
    .buy-btn {
      width: 630rpx;
      height: 80rpx;
      border-radius: 40rpx;
      background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
      color: $white;
    }
    .disabled-btn {
      width: 630rpx;
      height: 80rpx;
      border-radius: 40rpx;
      background: #999999;
      color: $white;
    }
  }

  //秒杀卡片
  .seckill-box {
    background: v-bind(seckillBg) no-repeat;
    background-size: 100% 100%;
  }

  .groupon-box {
    background: v-bind(grouponBg) no-repeat;
    background-size: 100% 100%;
  }

  //活动卡片
  .activity-box {
    width: 100%;
    height: 80rpx;
    box-sizing: border-box;
    margin-bottom: 10rpx;

    .activity-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #ffffff;
      line-height: 42rpx;

      .activity-icon {
        width: 38rpx;
        height: 38rpx;
      }
    }

    .activity-go {
      width: 70rpx;
      height: 32rpx;
      background: #ffffff;
      border-radius: 16rpx;
      font-weight: 500;
      color: #ff6000;
      font-size: 24rpx;
      line-height: normal;
    }
  }

  .model-box {
    height: 60vh;
    .model-content {
      height: 56vh;
    }
    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
    }

    .subtitle {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
    }
  }
</style>
