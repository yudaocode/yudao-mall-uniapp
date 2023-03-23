<template>
  <s-layout title="确认订单">
    <view
      class="bg-white address-box ss-m-b-14 ss-r-b-10"
      @tap="onSelectAddress"
      v-if="state.orderInfo.need_address === 1"
    >
      <s-address-item :item="state.addressInfo" :hasBorderBottom="false">
        <view class="ss-rest-button"><text class="_icon-forward"></text></view>
      </s-address-item>
    </view>
    <view class="order-card-box ss-m-b-14">
      <s-goods-item
        v-for="item in state.orderInfo.goods_list"
        :key="item.goods_id"
        :img="item.current_sku_price.image || item.goods.image"
        :title="item.goods.title"
        :skuText="item.current_sku_price?.goods_sku_text"
        :price="item.current_sku_price.price"
        :num="item.goods_num"
        marginBottom="10"
      >
        <template #top>
          <view class="order-item ss-flex ss-col-center ss-row-between ss-p-x-20 bg-white">
            <view class="item-title">配送方式</view>
            <view class="ss-flex ss-col-center">
              <text class="item-value">{{ item.dispatch_type_text }}</text>
            </view>
          </view>
        </template>
      </s-goods-item>

      <view class="order-item ss-flex ss-col-center ss-row-between ss-p-x-20 bg-white ss-r-10">
        <view class="item-title">订单备注</view>
        <view class="ss-flex ss-col-center">
          <uni-easyinput
            maxlength="20"
            placeholder="建议留言前先与商家沟通"
            v-model="state.orderPayload.remark"
            :inputBorder="false"
            :clearable="false"
          ></uni-easyinput>
        </view>
      </view>
    </view>
    <!-- 合计 -->
    <view class="bg-white total-card-box ss-p-20 ss-m-b-14 ss-r-10">
      <view class="total-box-content border-bottom">
        <view class="order-item ss-flex ss-col-center ss-row-between">
          <view class="item-title">商品金额</view>
          <view class="ss-flex ss-col-center">
            <text class="item-value ss-m-r-24">￥{{ state.orderInfo.goods_amount }}</text>
          </view>
        </view>
        <view
          class="order-item ss-flex ss-col-center ss-row-between"
          v-if="state.orderPayload.order_type === 'score'"
        >
          <view class="item-title">扣除积分</view>
          <view class="ss-flex ss-col-center">
            <image
              :src="sheep.$url.static('/static/img/shop/goods/score1.svg')"
              class="score-img"
            ></image>
            <text class="item-value ss-m-r-24">{{ state.orderInfo.score_amount }}</text>
          </view>
        </view>
        <view class="order-item ss-flex ss-col-center ss-row-between">
          <view class="item-title">运费</view>
          <view class="ss-flex ss-col-center">
            <text class="item-value ss-m-r-24">+￥{{ state.orderInfo.dispatch_amount }}</text>
          </view>
        </view>
        <view
          class="order-item ss-flex ss-col-center ss-row-between"
          v-if="state.orderPayload.order_type != 'score'"
        >
          <!-- <view v-if="state.orderInfo.coupon_discount_fee > 0" class="order-item ss-flex ss-col-center ss-row-between"> -->
          <view class="item-title">优惠券</view>
          <view class="ss-flex ss-col-center" @tap="state.showCoupon = true">
            <text class="item-value text-red" v-if="state.orderPayload.coupon_id"
              >-￥{{ state.orderInfo.coupon_discount_fee }}</text
            >
            <text
              class="item-value"
              :class="state.couponInfo.can_use?.length > 0 ? 'text-red' : 'text-disabled'"
              v-else
              >{{
                state.couponInfo.can_use?.length > 0
                  ? state.couponInfo.can_use?.length + '张可用'
                  : '暂无可用优惠券'
              }}</text
            >

            <text class="_icon-forward item-icon"></text>
          </view>
        </view>
        <view
          class="order-item ss-flex ss-col-center ss-row-between"
          v-if="state.orderInfo.promo_infos?.length"
        >
          <!-- <view v-if="state.orderInfo.promo_discount_fee > 0" class="order-item ss-flex ss-col-center ss-row-between"> -->
          <view class="item-title">活动优惠</view>
          <view class="ss-flex ss-col-center" @tap="state.showDiscount = true">
            <text class="item-value text-red"> -￥{{ state.orderInfo.promo_discount_fee }} </text>
            <text class="_icon-forward item-icon"></text>
          </view>
        </view>
      </view>
      <view class="total-box-footer ss-font-28 ss-flex ss-row-right ss-col-center ss-m-r-28">
        <view class="total-num ss-m-r-20">共{{ state.totalNumber }}件</view>
        <view>合计：</view>
        <view class="total-num text-red"> ￥{{ state.orderInfo.pay_fee }} </view>
        <view class="ss-flex" v-if="state.orderPayload.order_type === 'score'">
          <view class="total-num ss-font-30 text-red ss-m-l-4"> + </view>
          <image
            :src="sheep.$url.static('/static/img/shop/goods/score1.svg')"
            class="score-img"
          ></image>
          <view class="total-num ss-font-30 text-red">{{ state.orderInfo.score_amount }}</view>
        </view>
      </view>
    </view>
    <!-- 发票 -->
    <view class="bg-white ss-p-20 ss-r-20">
      <view class="order-item ss-flex ss-col-center ss-row-between">
        <view class="item-title">发票申请</view>
        <view class="ss-flex ss-col-center" @tap="onSelectInvoice">
          <text class="item-value">{{ state.invoiceInfo.name || '无需开具发票' }}</text>
          <text class="_icon-forward item-icon"></text>
        </view>
      </view>
    </view>
    <!-- 选择优惠券弹框 -->
    <s-coupon-select
      v-model="state.couponInfo"
      :show="state.showCoupon"
      @confirm="onSelectCoupon"
      @close="state.showCoupon = false"
    />
    <!-- 满额折扣弹框  -->
    <s-discount-list
      v-model="state.orderInfo"
      :show="state.showDiscount"
      @close="state.showDiscount = false"
    />
    <!-- 底部 -->
    <su-fixed bottom :opacity="false" bg="bg-white" placeholder :noFixed="false" :index="200">
      <view class="footer-box border-top ss-flex ss-row-between ss-p-x-20 ss-col-center">
        <view class="total-box-footer ss-flex ss-col-center">
          <view class="total-num ss-font-30 text-red"> ￥{{ state.orderInfo.pay_fee }} </view>
          <view v-if="state.orderPayload.order_type === 'score'" class="ss-flex">
            <view class="total-num ss-font-30 text-red ss-m-l-4">+</view>
            <image
              :src="sheep.$url.static('/static/img/shop/goods/score1.svg')"
              class="score-img"
            ></image>
            <view class="total-num ss-font-30 text-red">{{ state.orderInfo.score_amount }}</view>
          </view>
        </view>

        <button
          class="ss-reset-button ui-BG-Main-Gradient ss-r-40 submit-btn ui-Shadow-Main"
          @tap="onConfirm"
        >
          {{ exchangeNow ? '立即兑换' : '提交订单' }}
        </button>
      </view>
    </su-fixed>
  </s-layout>
</template>

<script setup>
  import { reactive, computed } from 'vue';
  import { onLoad, onPageScroll, onShow } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import { isEmpty } from 'lodash';

  const state = reactive({
    orderPayload: {},
    orderInfo: {},
    addressInfo: {},
    invoiceInfo: {},
    totalNumber: 0,
    showCoupon: false,
    couponInfo: [],
    showDiscount: false,
  });

  // 立即兑换(立即兑换无需跳转收银台)
  const exchangeNow = computed(
    () => state.orderPayload.order_type === 'score' && state.orderInfo.pay_fee == 0,
  );

  // 选择地址
  function onSelectAddress() {
    uni.$once('SELECT_ADDRESS', (e) => {
      changeConsignee(e.addressInfo);
    });
    sheep.$router.go('/pages/user/address/list');
  }

  // 更改收货人地址&计算订单信息
  async function changeConsignee(addressInfo = {}) {
    if (isEmpty(addressInfo)) {
      const { error, data } = await sheep.$api.user.address.default();
      if (error === 0 && !isEmpty(data)) {
        addressInfo = data;
      }
    }
    if (!isEmpty(addressInfo)) {
      state.addressInfo = addressInfo;
      state.orderPayload.address_id = state.addressInfo.id;
    }
    getOrderInfo();
  }

  // 选择优惠券
  async function onSelectCoupon(e) {
    state.orderPayload.coupon_id = e || 0;
    getOrderInfo();
    state.showCoupon = false;
  }

  // 选择发票信息
  function onSelectInvoice() {
    uni.$once('SELECT_INVOICE', (e) => {
      state.invoiceInfo = e.invoiceInfo;
      state.orderPayload.invoice_id = e.invoiceInfo.id || 0;
    });
    sheep.$router.go('/pages/user/invoice/list');
  }

  // 提交订单/立即兑换
  function onConfirm() {
    if (!state.orderPayload.address_id && state.orderInfo.need_address === 1) {
      sheep.$helper.toast('请选择收货地址');
      return;
    }

    if (exchangeNow.value) {
      uni.showModal({
        title: '提示',
        content: '确定使用积分立即兑换?',
        cancelText: '再想想',
        success: async function (res) {
          if (res.confirm) {
            submitOrder();
          }
        },
      });
    } else {
      submitOrder();
    }
  }

  // 创建订单&跳转
  async function submitOrder() {
    const { error, data } = await sheep.$api.order.create(state.orderPayload);
    if (error === 0) {
      // 更新购物车列表
      if (state.orderPayload.from === 'cart') {
        sheep.$store('cart').getList();
      }
      if (exchangeNow.value) {
        sheep.$router.redirect('/pages/pay/result', {
          orderSN: data.order_sn,
        });
      } else {
        sheep.$router.redirect('/pages/pay/index', {
          orderSN: data.order_sn,
        });
      }
    }
  }

  // 检查库存&计算订单价格
  async function getOrderInfo() {
    let { error, data } = await sheep.$api.order.calc(state.orderPayload);
    if (error === 0) {
      state.totalNumber = 0;
      state.orderInfo = data;
      state.orderInfo.goods_list.forEach((item) => {
        state.totalNumber += item.goods_num;
      });
    }
  }

  // 获取可用优惠券
  async function getCoupons() {
    const { error, data } = await sheep.$api.order.coupons(state.orderPayload);
    if (error === 0) {
      state.couponInfo = data;
    }
  }

  onLoad(async (options) => {
    if (options.data) {
      state.orderPayload = JSON.parse(options.data);
      changeConsignee();
      if (state.orderPayload.order_type !== 'score') {
        getCoupons();
      }
    }
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
