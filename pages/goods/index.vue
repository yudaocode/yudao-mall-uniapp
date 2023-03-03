<template>
  <view>
    <s-layout :onShareAppMessage="shareInfo" navbar="goods">
      <!-- 标题栏 -->
      <detailNavbar />

      <!-- 骨架屏 -->
      <detailSkeleton v-if="state.skeletonLoading" />
      <!-- 下架/售罄提醒 -->
      <s-empty
        v-else-if="state.goodsInfo === null"
        text="商品不存在或已下架"
        icon="/static/soldout-empty.png"
        showAction
        actionText="再逛逛"
        actionUrl="/pages/goods/list"
      />
      <block v-else>
        <view class="detail-swiper-selector">
          <!-- 商品轮播图  -->
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
          <view class="title-card detail-card ss-p-y-40 ss-p-x-20">
            <view class="ss-flex ss-row-between ss-col-center ss-m-b-26">
              <view class="price-box ss-flex ss-col-bottom">
                <view class="price-text ss-m-r-16">
                  {{ state.selectedSkuPrice.price || formatPrice(state.goodsInfo.price) }}
                </view>
                <view class="origin-price-text" v-if="state.goodsInfo.original_price > 0">
                  {{ state.selectedSkuPrice.original_price || state.goodsInfo.original_price }}
                </view>
              </view>
              <view class="sales-text">
                {{ formatSales(state.goodsInfo.sales_show_type, state.goodsInfo.sales) }}
              </view>
            </view>
            <view class="discounts-box ss-flex ss-row-between ss-m-b-28">
              <div class="tag-content">
                <view class="tag-box ss-flex">
                  <view
                    class="tag ss-m-r-10"
                    v-for="promos in state.goodsInfo.promos"
                    :key="promos.id"
                    @tap="onActivity"
                  >
                    {{ promos.title }}
                  </view>
                </view>
              </div>

              <view
                class="get-coupon-box ss-flex ss-col-center ss-m-l-20"
                @tap="state.showModel = true"
                v-if="state.couponInfo.length"
              >
                <view class="discounts-title ss-m-r-8">领券</view>
                <text class="cicon-forward"></text>
              </view>
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
            <detail-cell-service v-if="state.goodsInfo.service" v-model="state.goodsInfo.service" />
            <detail-cell-params v-if="state.goodsInfo.params" v-model="state.goodsInfo.params" />
          </view>

          <!-- 规格与数量弹框 -->
          <s-select-sku
            :goodsInfo="state.goodsInfo"
            :show="state.showSelectSku"
            @addCart="onAddCart"
            @buy="onBuy"
            @change="onSkuChange"
            @close="state.showSelectSku = false"
          />
        </view>

        <!-- 评价 -->
        <detail-comment-card class="detail-comment-selector" :goodsId="state.goodsId" />
        <!-- 详情 -->
        <detail-content-card class="detail-content-selector" :content="state.goodsInfo.content" />

        <!-- 活动跳转 -->
        <detail-activity-tip
          v-if="state.goodsInfo.activities"
          :data="state.goodsInfo"
        ></detail-activity-tip>

        <!-- 详情tabbar -->
        <detail-tabbar v-model="state.goodsInfo">
          <!-- TODO: 缺货中 已售罄 判断 设计-->
          <view class="buy-box ss-flex ss-col-center ss-p-r-20" v-if="state.goodsInfo.stock > 0">
            <button
              class="ss-reset-button add-btn ui-Shadow-Main"
              @tap="state.showSelectSku = true"
            >
              加入购物车
            </button>
            <button
              class="ss-reset-button buy-btn ui-Shadow-Main"
              @tap="state.showSelectSku = true"
            >
              立即购买
            </button>
          </view>
          <view class="buy-box ss-flex ss-col-center ss-p-r-20" v-else>
            <button class="ss-reset-button disabled-btn" disabled> 已售罄 </button>
          </view>
        </detail-tabbar>
        <s-coupon-get
          v-model="state.couponInfo"
          :show="state.showModel"
          @close="state.showModel = false"
          @get="onGet"
        />
        <s-activity-pop
          v-model="state.activityInfo"
          :show="state.showActivityModel"
          @close="state.showActivityModel = false"
        />
      </block>
    </s-layout>
  </view>
</template>

<script setup>
  import { reactive, computed } from 'vue';
  import { onLoad, onPageScroll } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import { formatSales, formatGoodsSwiper, formatPrice } from '@/sheep/hooks/useGoods';
  import detailNavbar from './components/detail/detail-navbar.vue';
  import detailCellSku from './components/detail/detail-cell-sku.vue';
  import detailCellService from './components/detail/detail-cell-service.vue';
  import detailCellParams from './components/detail/detail-cell-params.vue';
  import detailTabbar from './components/detail/detail-tabbar.vue';
  import detailSkeleton from './components/detail/detail-skeleton.vue';
  import detailCommentCard from './components/detail/detail-comment-card.vue';
  import detailContentCard from './components/detail/detail-content-card.vue';
  import detailActivityTip from './components/detail/detail-activity-tip.vue';
  import { isEmpty } from 'lodash';

  // import detailActivityTip from './components/detail/detail-activity-tip.vue';
  // import detailTab from './components/detail/detail-tab.vue';
  // import detailCoupon from './components/detail/detail-coupon.vue';
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
    couponInfo: [],
    showActivityModel: false,
    activityInfo: [],
  });

  // 规格变更
  function onSkuChange(e) {
    state.selectedSkuPrice = e;
  }

  // 添加购物车
  function onAddCart(e) {
    sheep.$store('cart').add(e);
  }

  // 立即购买
  function onBuy(e) {
    sheep.$router.go('/pages/order/confirm', {
      data: JSON.stringify({
        order_type: 'goods',
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
  //营销活动
  function onActivity() {
    state.activityInfo = state.goodsInfo.promos;
    state.showActivityModel = true;
  }

  //立即领取
  async function onGet(id) {
    const { error, msg } = await sheep.$api.coupon.get(id);
    if (error === 0) {
      uni.showToast({
        title: msg,
      });
      setTimeout(() => {
        getCoupon();
      }, 1000);
    }
  }

  const shareInfo = computed(() => {
    if (isEmpty(state.goodsInfo)) return {};
    return sheep.$platform.share.getShareInfo(
      {
        title: state.goodsInfo.title,
        image: sheep.$url.cdn(state.goodsInfo.image),
        desc: state.goodsInfo.subtitle,
        params: {
          page: '2',
          query: state.goodsInfo.id,
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

  onLoad(async (options) => {
    // 非法参数
    if (!options.id) {
      state.goodsInfo = null;
      return;
    }
    state.goodsId = options.id;
    // 加载商品信息
    sheep.$api.goods.detail(state.goodsId).then((res) => {
      state.skeletonLoading = false;
      if (res.error === 0) {
        state.goodsInfo = res.data;
        state.goodsSwiper = formatGoodsSwiper(state.goodsInfo.images);
      } else {
        // 未找到商品
        state.goodsInfo = null;
      }
    });
    const { error, data } = await sheep.$api.coupon.listByGoods(state.goodsId);
    if (error === 0) {
      state.couponInfo = data;
    }
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
    .price-box {
      .price-text {
        font-size: 42rpx;
        font-weight: 500;
        color: #ff3000;
        line-height: 30rpx;
        font-family: OPPOSANS;

        &::before {
          content: '￥';
          font-size: 30rpx;
        }
      }

      .origin-price-text {
        font-size: 26rpx;
        font-weight: 400;
        text-decoration: line-through;
        color: $gray-c;
        font-family: OPPOSANS;

        &::before {
          content: '￥';
        }
      }
    }

    .sales-text {
      font-size: 26rpx;
      font-weight: 500;
      color: $gray-c;
    }

    .discounts-box {
      .tag-content {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
      }
      .tag-box {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tag {
        flex-shrink: 0;
        padding: 4rpx 10rpx;
        font-size: 24rpx;
        font-weight: 500;
        border-radius: 4rpx;
        color: var(--ui-BG-Main);
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
    .add-btn {
      width: 214rpx;
      height: 72rpx;
      font-weight: 500;
      font-size: 28rpx;
      border-radius: 40rpx 0 0 40rpx;
      background-color: var(--ui-BG-Main-light);
      color: var(--ui-BG-Main);
    }

    .buy-btn {
      width: 214rpx;
      height: 72rpx;
      font-weight: 500;
      font-size: 28rpx;

      border-radius: 0 40rpx 40rpx 0;
      background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
      color: $white;
    }
    .disabled-btn {
      width: 428rpx;
      height: 72rpx;
      border-radius: 40rpx;
      background: #999999;
      color: $white;
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
