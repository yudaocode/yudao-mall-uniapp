<template>
  <s-layout title="确认订单">
    <!-- TODO：这个判断先删除 v-if="state.orderInfo.need_address === 1" -->
    <view class="bg-white address-box ss-m-b-14 ss-r-b-10" @tap="onSelectAddress">
      <s-address-item :item="state.addressInfo" :hasBorderBottom="false">
        <view class="ss-rest-button">
          <text class="_icon-forward" />
        </view>
      </s-address-item>
    </view>

    <!-- 商品信息 -->
    <view class="order-card-box ss-m-b-14">
      <s-goods-item
        v-for="item in state.orderInfo.items"
        :key="item.skuId"
        :img="item.picUrl"
        :title="item.spuName"
        :skuText="item.properties.map((property) => property.valueName).join(' ')"
        :price="item.price"
        :num="item.count"
        marginBottom="10"
      />
      <view class="order-item ss-flex ss-col-center ss-row-between ss-p-x-20 bg-white ss-r-10">
        <view class="item-title">订单备注</view>
        <view class="ss-flex ss-col-center">
          <uni-easyinput
            maxlength="20"
            placeholder="建议留言前先与商家沟通"
            v-model="state.orderPayload.remark"
            :inputBorder="false"
            :clearable="false"
          />
        </view>
      </view>
    </view>

    <!-- 价格信息 -->
    <view class="bg-white total-card-box ss-p-20 ss-m-b-14 ss-r-10">
      <view class="total-box-content border-bottom">
        <view class="order-item ss-flex ss-col-center ss-row-between">
          <view class="item-title">商品金额</view>
          <view class="ss-flex ss-col-center">
            <text class="item-value ss-m-r-24">
              ￥{{ fen2yuan(state.orderInfo.price.totalPrice) }}
            </text>
          </view>
        </view>
        <!-- TODO 芋艿：接入积分 -->
        <view
          class="order-item ss-flex ss-col-center ss-row-between"
          v-if="state.orderPayload.order_type === 'score'"
        >
          <view class="item-title">扣除积分</view>
          <view class="ss-flex ss-col-center">
            <image
              :src="sheep.$url.static('/static/img/shop/goods/score1.svg')"
              class="score-img"
            />
            <text class="item-value ss-m-r-24">{{ state.orderInfo.score_amount }}</text>
          </view>
        </view>
        <view class="order-item ss-flex ss-col-center ss-row-between">
          <view class="item-title">运费</view>
          <view class="ss-flex ss-col-center">
            <text class="item-value ss-m-r-24">
              +￥{{ fen2yuan(state.orderInfo.price.deliveryPrice) }}
            </text>
          </view>
        </view>
        <!-- 优惠劵：只有 type = 0 普通订单（非拼团、秒杀、砍价），才可以使用优惠劵 -->
        <view
          class="order-item ss-flex ss-col-center ss-row-between"
          v-if="state.orderInfo.type === 0"
        >
          <view class="item-title">优惠券</view>
          <view class="ss-flex ss-col-center" @tap="state.showCoupon = true">
            <text class="item-value text-red" v-if="state.orderPayload.couponId > 0">
              -￥{{ fen2yuan(state.orderInfo.price.couponPrice) }}
            </text>
            <text
              class="item-value"
              :class="state.couponInfo.length > 0 ? 'text-red' : 'text-disabled'"
              v-else
            >
              {{
                state.couponInfo.length > 0 ? state.couponInfo.length + ' 张可用' : '暂无可用优惠券'
              }}
            </text>
            <text class="_icon-forward item-icon" />
          </view>
        </view>
        <view
          class="order-item ss-flex ss-col-center ss-row-between"
          v-if="state.orderInfo.price.discountPrice > 0"
        >
          <view class="item-title">活动优惠</view>
          <view class="ss-flex ss-col-center">
            <!--                @tap="state.showDiscount = true" TODO 芋艿：后续要把优惠信息打进去 -->
            <text class="item-value text-red">
              -￥{{ fen2yuan(state.orderInfo.price.discountPrice) }}
            </text>
            <text class="_icon-forward item-icon" />
          </view>
        </view>
        <view
          class="order-item ss-flex ss-col-center ss-row-between"
          v-if="state.orderInfo.price.vipPrice > 0"
        >
          <view class="item-title">会员优惠</view>
          <view class="ss-flex ss-col-center">
            <text class="item-value text-red">
              -￥{{ fen2yuan(state.orderInfo.price.vipPrice) }}
            </text>
          </view>
        </view>
      </view>
      <view class="total-box-footer ss-font-28 ss-flex ss-row-right ss-col-center ss-m-r-28">
        <view class="total-num ss-m-r-20">
          共{{ state.orderInfo.items.reduce((acc, item) => acc + item.count, 0) }}件
        </view>
        <view>合计：</view>
        <view class="total-num text-red"> ￥{{ fen2yuan(state.orderInfo.price.payPrice) }} </view>
      </view>
    </view>

    <!-- 选择优惠券弹框 -->
    <s-coupon-select
      v-model="state.couponInfo"
      :show="state.showCoupon"
      @confirm="onSelectCoupon"
      @close="state.showCoupon = false"
    />

    <!-- 满额折扣弹框 TODO 芋艿：后续要把优惠信息打进去 -->
    <s-discount-list
      v-model="state.orderInfo"
      :show="state.showDiscount"
      @close="state.showDiscount = false"
    />

    <!-- 底部 -->
    <su-fixed bottom :opacity="false" bg="bg-white" placeholder :noFixed="false" :index="200">
      <view class="footer-box border-top ss-flex ss-row-between ss-p-x-20 ss-col-center">
        <view class="total-box-footer ss-flex ss-col-center">
          <view class="total-num ss-font-30 text-red">
            ￥{{ fen2yuan(state.orderInfo.price.payPrice) }}
          </view>
        </view>
        <button
          class="ss-reset-button ui-BG-Main-Gradient ss-r-40 submit-btn ui-Shadow-Main"
          @tap="onConfirm"
        >
          提交订单
        </button>
      </view>
    </su-fixed>
  </s-layout>
</template>

<script setup>
  import { reactive } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import { isEmpty } from 'lodash';
  import OrderApi from '@/sheep/api/trade/order';
  import CouponApi from '@/sheep/api/promotion/coupon';
  import { fen2yuan } from '@/sheep/hooks/useGoods';

  const state = reactive({
    orderPayload: {},
    orderInfo: {
      items: [], // 商品项列表
      price: {}, // 价格信息
    },
    addressInfo: {}, // 选择的收货地址
    showCoupon: false, // 是否展示优惠劵
    couponInfo: [], // 优惠劵列表
    showDiscount: false, // 是否展示营销活动
  });

  // 选择地址
  function onSelectAddress() {
    uni.$once('SELECT_ADDRESS', (e) => {
      changeConsignee(e.addressInfo);
    });
    sheep.$router.go('/pages/user/address/list');
  }

  // 更改收货人地址&计算订单信息
  async function changeConsignee(addressInfo = {}) {
    if (!isEmpty(addressInfo)) {
      state.addressInfo = addressInfo;
    }
    await getOrderInfo();
  }

  // 选择优惠券
  async function onSelectCoupon(couponId) {
    state.orderPayload.couponId = couponId || 0;
    await getOrderInfo();
    state.showCoupon = false;
  }

  // 提交订单
  function onConfirm() {
    if (!state.addressInfo.id) {
      sheep.$helper.toast('请选择收货地址');
      return;
    }
    submitOrder();
  }

  // 创建订单&跳转
  async function submitOrder() {
    const { code, data } = await OrderApi.createOrder({
      items: state.orderPayload.items,
      couponId: state.orderPayload.couponId,
      addressId: state.addressInfo.id,
      deliveryType: 1, // TODO 芋艿：需要支持【门店自提】
      pointStatus: false, // TODO 芋艿：需要支持【积分选择】
      combinationActivityId: state.orderPayload.combinationActivityId,
      combinationHeadId: state.orderPayload.combinationHeadId,
      seckillActivityId: state.orderPayload.seckillActivityId
    });
    if (code !== 0) {
      return;
    }
    // 更新购物车列表，如果来自购物车
    if (state.orderPayload.items[0].cartId > 0) {
      sheep.$store('cart').getList();
    }
    // 跳转到支付页面
    sheep.$router.redirect('/pages/pay/index', {
      id: data.payOrderId,
    });
  }

  // 检查库存 & 计算订单价格
  async function getOrderInfo() {
    // 计算价格
    const { data, code } = await OrderApi.settlementOrder({
      items: state.orderPayload.items,
      couponId: state.orderPayload.couponId,
      addressId: state.addressInfo.id,
      deliveryType: 1, // TODO 芋艿：需要支持【门店自提】
      pointStatus: false, // TODO 芋艿：需要支持【积分选择】
      combinationActivityId: state.orderPayload.combinationActivityId,
      combinationHeadId: state.orderPayload.combinationHeadId,
      seckillActivityId: state.orderPayload.seckillActivityId
    });
    if (code !== 0) {
      return;
    }
    state.orderInfo = data;
    // 设置收货地址
    if (state.orderInfo.address) {
      state.addressInfo = state.orderInfo.address;
    }
  }

  // 获取可用优惠券
  async function getCoupons() {
    const { code, data } = await CouponApi.getMatchCouponList(
      state.orderInfo.price.payPrice,
      state.orderInfo.items.map((item) => item.spuId),
      state.orderPayload.items.map((item) => item.skuId),
      state.orderPayload.items.map((item) => item.categoryId),
    );
    if (code === 0) {
      state.couponInfo = data;
    }
  }

  onLoad(async (options) => {
    if (!options.data) {
      sheep.$helper.toast('参数不正确，请检查！');
      return;
    }
    state.orderPayload = JSON.parse(options.data);
    await getOrderInfo();
    await getCoupons();
  });
</script>

<style lang="scss" scoped>
  :deep() {
    .uni-input-wrapper {
      width: 320rpx;
    }

    .uni-easyinput__content-input {
      font-size: 28rpx;
      height: 72rpx;
      text-align: right !important;
      padding-right: 0 !important;

      .uni-input-input {
        font-weight: 500;
        color: #333333;
        font-size: 26rpx;
        height: 32rpx;
        margin-top: 4rpx;
      }
    }

    .uni-easyinput__content {
      display: flex !important;
      align-items: center !important;
      justify-content: right !important;
    }
  }

  .score-img {
    width: 36rpx;
    height: 36rpx;
    margin: 0 4rpx;
  }

  .order-item {
    height: 80rpx;

    .item-title {
      font-size: 28rpx;
      font-weight: 400;
    }

    .item-value {
      font-size: 28rpx;
      font-weight: 500;
      font-family: OPPOSANS;
    }

    .text-disabled {
      color: #bbbbbb;
    }

    .item-icon {
      color: $dark-9;
    }

    .remark-input {
      text-align: right;
    }

    .item-placeholder {
      color: $dark-9;
      font-size: 26rpx;
      text-align: right;
    }
  }

  .total-box-footer {
    height: 90rpx;

    .total-num {
      color: #333333;
      font-family: OPPOSANS;
    }
  }

  .footer-box {
    height: 100rpx;

    .submit-btn {
      width: 240rpx;
      height: 70rpx;
      font-size: 28rpx;
      font-weight: 500;

      .goto-pay-text {
        line-height: 28rpx;
      }
    }

    .cancel-btn {
      width: 240rpx;
      height: 80rpx;
      font-size: 26rpx;
      background-color: #e5e5e5;
      color: $dark-9;
    }
  }

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
  }

  .subtitle {
    font-size: 28rpx;
    color: #999999;
  }

  .cicon-checkbox {
    font-size: 36rpx;
    color: var(--ui-BG-Main);
  }

  .cicon-box {
    font-size: 36rpx;
    color: #999999;
  }
</style>
