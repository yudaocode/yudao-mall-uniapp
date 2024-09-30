<template>
  <view>
    <!-- md卡片：竖向，一行放两个，图上内容下 -->
    <view v-if="size === 'md'" class="md-goods-card ss-flex-col" :style="[elStyles]" @tap="onClick">
      <image
        class="md-img-box"
        :src="sheep.$url.cdn(data.image)"
        mode="widthFix"
        @load="calculatePanelHeight"
      ></image>
      <view
        class="md-goods-content ss-flex-col ss-row-around ss-p-b-20 ss-p-t-20 ss-p-x-16"
        :id="elId"
      >
        <view
          v-if="goodsFields.title?.show"
          class="md-goods-title ss-line-1"
          :style="[{ color: titleColor, width: titleWidth ? titleWidth + 'rpx' : '' }]"
        >
          {{ data.title }}
        </view>
        <view
          v-if="goodsFields.subtitle?.show"
          class="md-goods-subtitle ss-m-t-16 ss-line-1"
          :style="[{ color: subTitleColor }]"
        >
          {{ data.subtitle }}
        </view>
        <view class="ss-col-bottom">
          <view
            v-if="goodsFields.score_price?.show"
            class="md-goods-price ss-m-t-16 font-OPPOSANS ss-m-r-10 ss-flex"
            :style="[{ color: goodsFields.score_price.color }]"
          >
            <view>{{ Number(data.price[0]) > 0 ? '￥' + data.price[0] + '+' : '' }}</view>
            <image
              :src="sheep.$url.static('/static/img/shop/goods/score1.svg')"
              class="score-img"
            ></image>
            {{ data.score }}
          </view>

          <view
            v-if="goodsFields.price?.show && data.original_price > 0"
            class="goods-origin-price ss-m-t-16 font-OPPOSANS ss-flex"
            :style="[{ color: goodsFields.price.color }]"
          >
            <text class="price-unit ss-font-20">{{ priceUnit }}</text>
            <view class="ss-m-l-8">{{ data.original_price }}</view>
          </view>
        </view>

        <view class="ss-m-t-16 ss-flex ss-col-center ss-flex-wrap">
          <view class="sales-text">{{ salesAndStock }}</view>
        </view>
      </view>

      <slot name="cart">
        <view class="cart-box ss-flex ss-col-center ss-row-center">
          <image class="cart-icon" src="/static/img/shop/tabbar/category2.png" mode=""></image>
        </view>
      </slot>
    </view>
    <!-- lg卡片：横向型，一行放一个，图片左内容右边  -->
    <view
      v-if="size === 'lg'"
      class="lg-goods-card ss-flex ss-col-stretch"
      :style="[elStyles]"
      @tap="onClick"
    >
      <image class="lg-img-box" :src="sheep.$url.cdn(data.image)" mode="aspectFill"></image>
      <view class="lg-goods-content ss-flex-1 ss-flex-col ss-row-between ss-p-b-10 ss-p-t-20">
        <view class="ss-m-r-20">
          <view
            v-if="goodsFields.title?.show"
            class="lg-goods-title ss-line-2"
            :style="[{ color: titleColor }]"
          >
            {{ data.title }}
          </view>
          <view
            v-if="goodsFields.subtitle?.show"
            class="lg-goods-subtitle ss-m-t-10 ss-line-1"
            :style="[{ color: subTitleColor }]"
          >
            {{ data.subtitle }}
          </view>
        </view>
        <view>
          <view class="ss-m-t-10">
            <view
              v-if="goodsFields.score_price?.show"
              class="lg-goods-price ss-m-r-12 ss-flex ss-col-bottom font-OPPOSANS"
              :style="[{ color: goodsFields.score_price.color }]"
            >
              <view>{{ Number(data.price[0]) > 0 ? '￥' + data.price[0] + '+' : '' }}</view>
              <image
                :src="sheep.$url.static('/static/img/shop/goods/score1.svg')"
                class="score-img"
              ></image>
              {{ data.score }}
            </view>
            <view
              v-if="goodsFields.price?.show && data.original_price > 0"
              class="goods-origin-price ss-flex ss-col-bottom font-OPPOSANS"
              :style="[{ color: goodsFields.price.color }]"
            >
              <text class="price-unit ss-font-20">{{ priceUnit }}</text>
              <view class="ss-m-l-8">{{ data.original_price }}</view>
            </view>
          </view>
          <view class="ss-m-t-16 ss-flex ss-col-center ss-flex-wrap">
            <view class="sales-text">{{ salesAndStock }}</view>
          </view>
        </view>
      </view>

      <slot name="cart"
      ><view class="buy-box ss-flex ss-col-center ss-row-center">去兑换</view></slot
      >
    </view>
    <!-- sl卡片：竖向型，一行放一个，图片上内容下边 -->
    <view v-if="size === 'sl'" class="sl-goods-card ss-flex-col" @tap="onClick">
      <image class="sl-img-box" :src="sheep.$url.cdn(data.image)" mode="aspectFill"></image>

      <view class="sl-goods-content ss-flex-col ss-row-between ss-p-b-20 ss-p-t-20">
        <view class="ss-m-b-20">
          <view class="sl-goods-title ss-line-1 ss-p-l-16 ss-p-r-16">
            {{ data.title }}
          </view>
          <view v-if="data.subtitle" class="sl-goods-subtitle ss-p-l-16 ss-p-r-16 ss-m-t-16">
            {{ data.subtitle }}
          </view>
        </view>
        <view>
          <slot name="activity">
            <view
              v-if="data.promos?.length"
              class="tag-box ss-flex ss-col-center ss-flex-wrap ss-p-l-16 ss-p-r-16"
            >
              <view
                class="activity-tag ss-m-r-10 ss-m-t-16"
                v-for="item in data.promos"
                :key="item.id"
              >
                {{ item.title }}
              </view>
            </view>
          </slot>
          <view class="ss-flex ss-col-bottom ss-p-l-16 ss-p-r-16 font-OPPOSANS">
            <view class="sl-goods-price ss-m-r-12 ss-flex">
              <view>{{ Number(data.price[0]) > 0 ? '￥' + data.price[0] + '+' : '' }}</view>
              <image
                :src="sheep.$url.static('/static/img/shop/goods/score1.svg')"
                class="score-img"
              ></image>
              <view>{{ data.score ? data.score : '' }}</view>
            </view>
            <view
              v-if="data.original_price > 0"
              class="goods-origin-price ss-m-t-16 font-OPPOSANS ss-flex"
            >
              <text class="price-unit ss-font-20">￥</text>
              <view class="ss-m-l-8">{{ data.original_price }}</view>
            </view>
          </view>
          <view class="ss-p-l-16 ss-p-r-16 ss-m-t-16 ss-flex ss-flex-wrap">
            <view class="sales-text">{{ salesAndStock }}</view>
          </view>
        </view>
      </view>

      <slot name="cart"
      ><view class="buy-box ss-flex ss-col-center ss-row-center">去兑换</view></slot
      >
    </view>
  </view>
</template>
<script setup>
  import { computed, getCurrentInstance } from 'vue';
  import sheep from '@/sheep';
  import { formatSales } from '@/sheep/hooks/useGoods';
  import { formatStock } from '@/sheep/hooks/useGoods';
  /**
   * 订单卡片
   *
   * @property {String} img 											- 图片
   * @property {String} title 										- 标题
   * @property {Number} titleWidth = 0								- 标题宽度，默认0，单位rpx
   * @property {String} skuText 										- 规格
   * @property {String | Number} score 								- 积分
   * @property {String | Number} price 								- 价格
   * @property {String | Number} originalPrice 						- 单购价
   * @property {String} priceColor 									- 价格颜色
   * @property {Number | String} num									- 数量
   *
   */
  const props = defineProps({
    goodsFields: {
      type: [Array, Object],
      default() {
        return {
          title: { show: true },
          subtitle: { show: true },
          price: { show: true },
          original_price: { show: true },
          sales: { show: true },
          stock: { show: true },
        };
      },
    },
    tagStyle: {
      type: Object,
      default: {},
    },
    data: {
      type: Object,
      default: {},
    },
    size: {
      type: String,
      default: 'sl',
    },
    background: {
      type: String,
      default: '',
    },
    topRadius: {
      type: Number,
      default: 0,
    },
    bottomRadius: {
      type: Number,
      default: 0,
    },
    titleWidth: {
      type: Number,
      default: 0,
    },
    titleColor: {
      type: String,
      default: '#333',
    },
    priceUnit: {
      type: String,
      default: '￥',
    },
    subTitleColor: {
      type: String,
      default: '#999999',
    },
  });
  // 组件样式
  const elStyles = computed(() => {
    return {
      background: props.background,
      'border-top-left-radius': props.topRadius + 'px',
      'border-top-right-radius': props.topRadius + 'px',
      'border-bottom-left-radius': props.bottomRadius + 'px',
      'border-bottom-right-radius': props.bottomRadius + 'px',
    };
  });
  const emits = defineEmits(['click', 'getHeight']);
  const onClick = () => {
    emits('click');
  };
  // 格式化销量、库存信息
  const salesAndStock = computed(() => {
    let text = [];
    text.push(formatSales(props.data.sales_show_type, props.data.sales));
    text.push(formatStock(props.data.stock_show_type, props.data.stock));
    return text.join(' | ');
  });
  // 获取实时卡片高度
  const { proxy } = getCurrentInstance();
  const elId = `sheep_${Math.ceil(Math.random() * 10e5).toString(36)}`;
  function calculatePanelHeight(e) {
    if (props.size === 'md') {
      const view = uni.createSelectorQuery().in(proxy);
      view.select(`#${elId}`).fields({ size: true, scrollOffset: true });
      view.exec((data) => {
        const goodsPriceCard = data[0];
        const card = {
          width: goodsPriceCard.width,
          height: (goodsPriceCard.width / e.detail.width) * e.detail.height + goodsPriceCard.height,
        };
        emits('getHeight', card.height);
      });
    }
  }
</script>

<style lang="scss" scoped>
  .price-unit {
    margin-right: -4px;
  }
  .sales-text {
    display: table;
    font-size: 24rpx;
    transform: scale(0.8);
    margin-left: -16rpx;
    color: #c4c4c4;
  }

  // md
  .md-goods-card {
    overflow: hidden;
    width: 100%;
    position: relative;
    z-index: 1;
    background-color: $white;
    position: relative;

    .md-img-box {
      width: 100%;
    }

    .md-goods-title {
      font-size: 26rpx;
      color: #333;
      width: 100%;
    }
    .md-goods-subtitle {
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
    }

    .md-goods-price {
      font-size: 30rpx;
      color: $red;
      line-height: 36rpx;
    }

    .cart-box {
      width: 54rpx;
      height: 54rpx;
      background: linear-gradient(90deg, #fe8900, #ff5e00);
      border-radius: 50%;
      position: absolute;
      bottom: 50rpx;
      right: 20rpx;
      z-index: 2;

      .cart-icon {
        width: 30rpx;
        height: 30rpx;
      }
    }
  }

  // lg
  .lg-goods-card {
    overflow: hidden;
    position: relative;
    z-index: 1;
    background-color: $white;
    height: 280rpx;

    .lg-img-box {
      width: 280rpx;
      height: 280rpx;
      margin-right: 20rpx;
    }

    .lg-goods-title {
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      // line-height: 36rpx;
      // width: 410rpx;
    }
    .lg-goods-subtitle {
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
      line-height: 30rpx;
      // width: 410rpx;
    }

    .lg-goods-price {
      font-size: 30rpx;
      color: $red;
      line-height: 36rpx;
    }

    .buy-box {
      position: absolute;
      bottom: 20rpx;
      right: 20rpx;
      z-index: 2;
      width: 120rpx;
      height: 50rpx;
      background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
      border-radius: 25rpx;
      font-size: 24rpx;
      color: #ffffff;
    }
    .tag-box {
      width: 100%;
    }
  }
  .sl-goods-card {
    overflow: hidden;
    position: relative;
    z-index: 1;
    width: 100%;
    background-color: $white;

    .sl-img-box {
      width: 100%;
      height: 360rpx;
    }

    .sl-goods-title {
      font-size: 26rpx;
      color: #333;
      width: 100%;
      box-sizing: border-box;
    }
    .sl-goods-subtitle {
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
      line-height: 30rpx;
      width: 100%;
      box-sizing: border-box;
    }

    .sl-goods-price {
      font-size: 30rpx;
      color: $red;
    }

    .buy-box {
      position: absolute;
      bottom: 20rpx;
      right: 20rpx;
      z-index: 2;
      width: 148rpx;
      height: 50rpx;
      background: linear-gradient(90deg, #fe8900, #ff5e00);
      border-radius: 25rpx;
      font-size: 24rpx;
      color: #ffffff;
    }
  }
  .goods-origin-price {
    font-size: 20rpx;
    color: #c4c4c4;
    text-decoration: line-through;
  }
  .score-img {
    width: 36rpx;
    height: 36rpx;
    margin: 0 4rpx;
  }
</style>
