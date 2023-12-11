<template>
  <s-layout :onShareAppMessage="shareInfo" navbar="goods">
    <!-- 标题栏 -->
    <detailNavbar />
    <!-- 骨架屏 -->
    <detailSkeleton v-if="state.skeletonLoading" />
    <!-- 空置页 -->
    <s-empty
      v-else-if="state.goodsInfo === null || state.goodsInfo.activity_type !== 'seckill'"
      text="活动不存在或已结束"
      icon="/static/soldout-empty.png"
      showAction
      actionText="再逛逛"
      actionUrl="/pages/goods/list"
    />
    <block v-else>
      <view class="detail-swiper-selector">
        <!-- 轮播  -->
        <su-swiper
          class="ss-m-b-14"
          isPreview
          :list="state.goodsSwiper"
          dotStyle="tag"
          imageMode="widthFix"
          dotCur="bg-mask-40"
          :seizeHeight="750"
        />

        <!-- 价格+标题 -->
        <view class="title-card ss-m-y-14 ss-m-x-20 ss-p-x-20 ss-p-y-34">
          <view class="price-box ss-flex ss-row-between ss-m-b-18">
            <view class="ss-flex">
              <view class="price-text ss-m-r-16">
                {{ state.selectedSkuPrice.price || formatPrice(state.goodsInfo.price) }}
              </view>
              <view class="tig ss-flex ss-col-center">
                <view class="tig-icon ss-flex ss-col-center ss-row-center">
                  <text class="cicon-alarm"></text>
                </view>
                <view class="tig-title">秒杀价</view>
              </view>
            </view>
            <view class="countdown-box" v-if="endTime.ms > 0">
              <view class="countdown-title ss-m-b-20">距结束仅剩</view>
              <view class="ss-flex countdown-time">
                <view class="ss-flex countdown-h">{{ endTime.h }}</view>
                <view class="ss-m-x-4">:</view>
                <view class="countdown-num ss-flex ss-row-center">{{ endTime.m }}</view>
                <view class="ss-m-x-4">:</view>
                <view class="countdown-num ss-flex ss-row-center">{{ endTime.s }}</view>
              </view>
            </view>
            <view class="countdown-title" v-else> 活动已结束 </view>
          </view>
          <view class="ss-flex ss-row-between ss-m-b-60">
            <view class="origin-price ss-flex ss-col-center" v-if="state.goodsInfo.original_price">
              原价
              <view class="origin-price-text">
                {{ state.selectedSkuPrice.original_price || state.goodsInfo.original_price }}
              </view>
            </view>
            <detail-progress :percent="state.percent" />
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
        <s-select-seckill-sku
          v-model="state.goodsInfo"
          :show="state.showSelectSku"
          @buy="onBuy"
          @change="onSkuChange"
          @close="state.showSelectSku = false"
        />
      </view>

      <!-- 评价 -->
      <detail-comment-card class="detail-comment-selector" :goodsId="state.goodsId" />
      <!-- 详情 -->
      <detail-content-card class="detail-content-selector" :content="state.goodsInfo.content" />

      <!-- 详情tabbar -->
      <detail-tabbar v-model="state.goodsInfo">
        <!-- TODO: 缺货中 已售罄 判断 设计-->
        <view class="buy-box ss-flex ss-col-center ss-p-r-20">
          <button
            class="ss-reset-button origin-price-btn ss-flex-col"
            v-if="state.goodsInfo.original_price"
            @tap="sheep.$router.go('/pages/goods/index', { id: state.goodsInfo.id })"
          >
            <view>
              <view class="btn-price">{{ state.goodsInfo.original_price }}</view>
              <view>原价购买</view>
            </view>
          </button>
          <button v-else class="ss-reset-button origin-price-btn ss-flex-col">
            <view
              class="no-original"
              :class="
                state.goodsInfo.stock === 0 || state.goodsInfo.activity.status != 'ing' ? '' : ''
              "
              >秒杀价</view
            >
          </button>
          <button
            class="ss-reset-button btn-box ss-flex-col"
            @tap="state.showSelectSku = true"
            :class="
              state.goodsInfo.activity.status === 'ing' && state.goodsInfo.stock != 0
                ? 'check-btn-box'
                : 'disabled-btn-box'
            "
            :disabled="state.goodsInfo.stock === 0 || state.goodsInfo.activity.status != 'ing'"
          >
            <view class="btn-price">{{ state.goodsInfo.price[0] }}</view>
            <view v-if="state.goodsInfo.activity.status === 'ing'">
              <view v-if="state.goodsInfo.stock === 0">已售罄</view>
              <view v-else>立即秒杀</view>
            </view>
            <view v-else>{{ state.goodsInfo.activity.status_text }}</view>
          </button>
        </view>
      </detail-tabbar>
    </block>
  </s-layout>
</template>

<script setup>
  import { reactive, computed } from 'vue';
  import { onLoad, onPageScroll } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import { isEmpty } from 'lodash';
  import { useDurationTime, formatGoodsSwiper, formatPrice } from '@/sheep/hooks/useGoods';
  import detailNavbar from './components/detail/detail-navbar.vue';
  import detailCellSku from './components/detail/detail-cell-sku.vue';
  import detailCellService from './components/detail/detail-cell-service.vue';
  import detailCellParams from './components/detail/detail-cell-params.vue';
  import detailTabbar from './components/detail/detail-tabbar.vue';
  import detailSkeleton from './components/detail/detail-skeleton.vue';
  import detailCommentCard from './components/detail/detail-comment-card.vue';
  import detailContentCard from './components/detail/detail-content-card.vue';
  import detailProgress from './components/detail/detail-progress.vue';

  const headerBg = sheep.$url.css('/static/img/shop/goods/seckill-bg.png');
  const btnBg = sheep.$url.css('/static/img/shop/goods/seckill-btn.png');
  const disabledBtnBg = sheep.$url.css(
    '/static/img/shop/goods/activity-btn-disabled.png',
  );
  const seckillBg = sheep.$url.css('/static/img/shop/goods/seckill-tip-bg.png');
  const grouponBg = sheep.$url.css('/static/img/shop/goods/groupon-tip-bg.png');

  onPageScroll(() => {});
  const state = reactive({
    goodsId: 0,
    skeletonLoading: true,
    goodsInfo: {},
    showSelectSku: false,
    goodsSwiper: [],
    selectedSkuPrice: {},
    showModel: false,
    total: 0,
    percent: 0,
    price: '',
  });

  // 倒计时
  const endTime = computed(() => {
    return useDurationTime(state.goodsInfo.activity.end_time);
  });

  // 规格变更
  function onSkuChange(e) {
    state.selectedSkuPrice = e;
  }

  // 立即购买
  function onBuy(e) {
    sheep.$router.go('/pages/order/confirm', {
      data: JSON.stringify({
        order_type: 'goods',
        buy_type: 'seckill',
        activity_id: state.goodsInfo.activity.id,
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

  const shareInfo = computed(() => {
    if (isEmpty(state.goodsInfo?.activity)) return {};
    return sheep.$platform.share.getShareInfo(
      {
        title: state.goodsInfo.title,
        image: sheep.$url.cdn(state.goodsInfo.image),
        params: {
          page: '4',
          query: state.goodsInfo.id + ',' + state.goodsInfo.activity.id,
        },
      },
      {
        type: 'goods', // 商品海报
        title: state.goodsInfo.title, // 商品标题
        image: sheep.$url.cdn(state.goodsInfo.image), // 商品主图
        price: state.goodsInfo.price[0], // 商品价格
        original_price: state.goodsInfo.original_price, // 商品原价
      },
    );
  });

  onLoad((options) => {
    // 非法参数
    if (!options.id) {
      state.goodsInfo = null;
      return;
    }
    state.goodsId = options.id;
    // 加载商品信息
    sheep.$api.goods
      .detail(options.id, {
        activity_id: options.activity_id,
      })
      .then((res) => {
        state.skeletonLoading = false;
        if (res.error === 0) {
          state.goodsInfo = res.data;
          state.percent =
            state.goodsInfo.stock + state.goodsInfo.sales > 0
              ? (
                  (state.goodsInfo.sales / (state.goodsInfo.sales + state.goodsInfo.stock)) *
                  100
                ).toFixed(2)
              : 0;
          state.percent = Number(state.percent);
          state.goodsSwiper = formatGoodsSwiper(state.goodsInfo.images);
        } else {
          // 未找到商品
          state.goodsInfo = null;
        }
      });
  });
</script>

<style lang="scss" scoped>
  .disabled-btn-box[disabled] {
    background-color: transparent;
  }
  .detail-card {
    background-color: $white;
    margin: 14rpx 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
  }

  // 价格标题卡片
  .title-card {
    width: 710rpx;
    box-sizing: border-box;
    // height: 320rpx;
    background-size: 100% 100%;
    border-radius: 10rpx;
    background-image: v-bind(headerBg);
    background-repeat: no-repeat;

    .price-box {
      .price-text {
        font-size: 30rpx;
        font-weight: 500;
        color: #fff;
        line-height: normal;
        font-family: OPPOSANS;

        &::before {
          content: '￥';
          font-size: 30rpx;
        }
      }
    }

    .origin-price {
      font-size: 24rpx;
      font-weight: 400;
      color: #fff;
      opacity: 0.7;

      .origin-price-text {
        text-decoration: line-through;

        font-family: OPPOSANS;

        &::before {
          content: '￥';
        }
      }
    }

    .tig {
      border: 2rpx solid #ffffff;
      border-radius: 4rpx;
      width: 126rpx;
      height: 38rpx;

      .tig-icon {
        width: 40rpx;
        height: 40rpx;
        margin-left: -2rpx;
        background: #ffffff;
        border-radius: 4rpx 0 0 4rpx;

        .cicon-alarm {
          font-size: 32rpx;
          color: #fc6e6f;
        }
      }

      .tig-title {
        width: 86rpx;
        font-size: 24rpx;
        font-weight: 500;
        line-height: normal;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .countdown-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #ffffff;
    }

    .countdown-time {
      font-size: 26rpx;
      font-weight: 500;
      color: #ffffff;
      .countdown-h {
        font-size: 24rpx;
        font-family: OPPOSANS;
        font-weight: 500;
        color: #ffffff;
        padding: 0 4rpx;
        height: 40rpx;
        background: rgba(#000000, 0.1);
        border-radius: 6rpx;
      }
      .countdown-num {
        font-size: 24rpx;
        font-family: OPPOSANS;
        font-weight: 500;
        color: #ffffff;
        width: 40rpx;
        height: 40rpx;
        background: rgba(#000000, 0.1);
        border-radius: 6rpx;
      }
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
      color: #fff;
    }

    .subtitle-text {
      font-size: 26rpx;
      font-weight: 400;
      color: #ffffff;
      line-height: 42rpx;
      opacity: 0.9;
    }
  }

  // 购买
  .buy-box {
    .check-btn-box {
      width: 248rpx;
      height: 80rpx;
      font-size: 24rpx;
      font-weight: 600;
      margin-left: -36rpx;
      background-image: v-bind(btnBg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
      line-height: normal;
      border-radius: 0px 40rpx 40rpx 0px;
    }

    .disabled-btn-box {
      width: 248rpx;
      height: 80rpx;
      font-size: 24rpx;
      font-weight: 600;
      margin-left: -36rpx;
      background-image: v-bind(disabledBtnBg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #999999;
      line-height: normal;
      border-radius: 0px 40rpx 40rpx 0px;
    }
    .btn-price {
      font-family: OPPOSANS;

      &::before {
        content: '￥';
      }
    }

    .origin-price-btn {
      width: 236rpx;
      height: 80rpx;
      background: rgba(#ff5651, 0.1);
      color: #ff6000;
      border-radius: 40rpx 0px 0px 40rpx;
      line-height: normal;
      font-size: 24rpx;
      font-weight: 500;
      .no-original {
        font-size: 28rpx;
      }

      .btn-title {
        font-size: 28rpx;
      }
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

  image {
    width: 100%;
    height: 100%;
  }
</style>
