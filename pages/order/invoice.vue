<!-- 订单详情 -->
<template>
  <s-layout title="发票详情" class="invoice-wrap" navbar="inner">
    <view
      class="invoice-heard ss-flex-col ss-row-right ss-col-center"
      :style="[
        {
          marginTop: '-' + Number(statusBarHeight + 88) + 'rpx',
          paddingTop: Number(statusBarHeight + 88) + 'rpx',
        },
      ]"
    >
      <view class="ss-flex ss-m-t-32 ss-m-b-32">
        <text
          class="sicon-warning-line"
          v-if="state.data.status === 'waiting' || state.data.status === 'unpaid'"
        ></text>
        <text class="sicon-check-line" v-if="state.data.status === 'finish'"></text>
        <view class="invoice-heard-title">{{ state.data.status_text }}</view>
      </view>
      <view class="ss-flex ss-m-b-52">
        <view class="ss-m-r-20 invoice-heard-desc">预计可开发票金额：</view>
        <view class="invoice-heard-price">￥{{ state.data.amount }}</view>
      </view>
    </view>
    <view class="invoice-content ss-flex-col ss-col-center">
      <view class="ss-m-t-50 ss-m-b-42 invoice-content-title">增值税电子普通发票</view>
      <view class="ss-flex ss-m-b-64">
        <view v-for="(item, index) in state.info" :key="item.title">
          <view class="log-icon ss-flex">
            <text class="sicon-circlecheck" v-if="statusNum >= index"></text>
            <text class="sicon-unchecked" v-else></text>
            <view
              v-if="state.info.length - 1 != index"
              class="line"
              :class="statusNum >= index ? 'activity-color' : ''"
            ></view>
          </view>
          <view class="log-title">{{ item.title }}</view>
        </view>
      </view>
      <view class="invoice-content-list ss-flex ss-row-between ss-col-top">
        <view class="">
          <view class="ss-flex">
            <view class="list-title">发票类型</view>
            <view class="list-desc">{{ state.data.type_text }}</view>
          </view>
          <view class="ss-flex">
            <view class="list-title">发票抬头</view>
            <view class="list-desc">{{ state.data.name }}</view>
          </view>
          <view class="ss-flex" v-if="state.data.type === 'company'">
            <view class="list-title">发票税号</view>
            <view class="list-desc">{{ state.data.tax_no }}</view>
          </view>
          <view class="ss-flex" v-if="state.data.status === 'finish'">
            <view class="list-title">实开金额</view>
            <view class="list-desc">￥{{ state.data.invoice_amount }}</view>
          </view>
          <view class="ss-flex" v-if="state.data.status === 'finish'">
            <view class="list-title">开票时间</view>
            <view class="list-desc">{{ state.data.finish_time }}</view>
          </view>
          <view class="ss-flex">
            <view class="list-title">申请时间</view>
            <view class="list-desc">{{ state.data.create_time }}</view>
          </view>
        </view>
        <view
          class="invoice-content-img ss-flex-col ss-col-center"
          v-if="state.data.status === 'finish'"
        >
          <su-image
            class="invoice-img"
            isPreview
            :previewList="state.jointImage"
            :current="0"
            :src="sheep.$url.static('/static/img/shop/order/invoice_thumb.png')"
            :height="110"
            mode="scaleToFill"
            v-if="state.jointImage[0].substr(-4) != '.pdf'"
          ></su-image>
          <!-- TODO: 发票为多个pdf时 -->
          <view v-if="state.jointImage[0].substr(-4) == '.pdf'" @tap="onInvoice">
            <image
              :src="sheep.$url.static('/static/img/shop/order/invoice_thumb.png')"
              class="invoice-img"
            ></image>
          </view>
          <view class="invoice-img-num">共{{ state.numImage }}张</view>
          <view class="invoice-img-title">点击预览发票</view>
        </view>
      </view>
    </view>
    <view class="invoice-order ss-m-t-20">
      <view class="goods-box" v-for="item in state.data.order_items" :key="item.id">
        <s-goods-item
          :img="item.goods_image"
          :title="item.goods_title"
          :skuText="item.goods_sku_text"
          :price="item.goods_price"
          :num="item.goods_num"
        />
      </view>
      <view class="invoice-order-list">
        <view class="ss-flex">
          <view class="list-title">订单状态</view>
          <view class="list-desc">{{ state.data.order?.status_text }}</view>
        </view>
        <view class="ss-flex">
          <view class="list-title">订单编号</view>
          <view class="list-desc">{{ state.data.order?.order_sn }}</view>
        </view>
        <view class="ss-flex">
          <view class="list-title">下单时间</view>
          <view class="list-desc">{{ state.data.order?.create_time }}</view>
        </view>
      </view>
    </view>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';

  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  const headerBg = sheep.$url.css('/static/img/shop/order/invoice_bg.png');
  const state = reactive({
    info: [
      {
        title: '订单提交',
      },
      {
        title: '等待开票',
      },
      {
        title: '开票完成',
      },
    ],
    data: {},
    jointImage: [],
    numImage: 0,
  });
  const statusNum = computed(() => {
    if (state.data.status === 'finish') {
      return 2;
    } else if (state.data.status === 'waiting') {
      return 1;
    } else {
      return 0;
    }
  });
  function onInvoice() {
    // #ifdef H5
    window.open(state.jointImage);
    // #endif
    // #ifdef MP || APP-PLUS
    uni.downloadFile({
      url: state.jointImage[0],
      success: function (res) {
        var filePath = res.tempFilePath;
        uni.openDocument({
          filePath: filePath,
          showMenu: true,
          success: function (res) {
            console.log('打开文档成功');
          },
        });
      },
    });
    // #endif
  }
  async function getInvoiceDetail(id) {
    const { data } = await sheep.$api.order.invoice(id);
    state.data = data;
    state.data.download_urls?.forEach((i, index) => {
      state.numImage = index + 1;
      if (i.substr(-4) != '.pdf') {
        state.jointImage.push(sheep.$url.static(i));
      } else {
        state.jointImage.push(sheep.$url.static(i));
      }
    });
  }
  onLoad((options) => {
    getInvoiceDetail(options.invoiceId);
  });
</script>

<style lang="scss" scoped>
  .invoice-heard {
    width: 100%;
    box-sizing: border-box;
    background: v-bind(headerBg) no-repeat,
      linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    background-size: 750rpx 100%;
    .sicon-warning-line {
      color: #fff;
      font-size: 34rpx;
    }
    .sicon-check-line {
      color: #fff;
      font-size: 34rpx;
    }
    .invoice-heard-title {
      font-size: 34rpx;
      font-weight: 500;
      color: #ffffff;
      margin-left: 8rpx;
      line-height: normal;
    }
    .invoice-heard-desc {
      font-size: 24rpx;
      font-weight: 500;
      color: #ffffff;
    }
    .invoice-heard-price {
      font-size: 28rpx;
      font-family: OPPOSANS;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .invoice-content {
    width: 100%;
    position: relative;
    z-index: 3;
    background: #ffffff;
    border-radius: 20rpx;
    margin-top: -16rpx;
    .invoice-content-title {
      font-size: 30rpx;
      font-weight: 500;
      color: #333333;
    }
    .log-icon {
      .sicon-unchecked {
        color: #c2bec2;
        font-size: 44rpx;
      }
      .sicon-circlecheck {
        color: #e60a00;
        font-size: 44rpx;
      }
      .line {
        width: 158rpx;
        height: 6rpx;
        background: #f2f2f2;
        border: 2rpx solid #ffffff;
      }
      .activity-color {
        background: #e60a00;
      }
    }
    .log-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
      margin-left: -26rpx;
      margin-top: 30rpx;
    }
    .invoice-content-list {
      width: 100%;
      padding: 0 46rpx 0 30rpx;
      box-sizing: border-box;
    }
    .list-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #999999;
      margin-right: 44rpx;
      margin-bottom: 36rpx;
    }
    .list-desc {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
      margin-bottom: 36rpx;
    }
    .invoice-img {
      width: 200rpx;
      height: 110rpx;
    }
    .invoice-img-num {
      width: 216rpx;
      height: 40rpx;
      background: rgba(#000000, 0.45);
      font-size: 24rpx;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      margin-top: -30rpx;
      z-index: 1;
    }
    .invoice-img-title {
      font-size: 24rpx;
      font-weight: 500;
      color: #999999;
    }
  }
  .invoice-order {
    width: 100%;
    padding-top: 30rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 20rpx;
  }
  .goods-box {
    border-bottom: 2rpx solid #dfdfdf;
  }
  .invoice-order-list {
    padding: 40rpx 24rpx 0 24rpx;
    .list-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #999999;
      margin-right: 44rpx;
      margin-bottom: 36rpx;
    }
    .list-desc {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
      margin-bottom: 36rpx;
    }
  }
</style>
