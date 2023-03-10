<!-- 售后详情 -->
<template>
  <s-layout title="售后详情" :navbar="!isEmpty(state.info) && state.loading ? 'inner' : 'normal'">
    <view class="content_box" v-if="!isEmpty(state.info) && state.loading">
      <!-- 步骤条 -->
      <view
        class="steps-box ss-flex"
        :style="[
          {
            marginTop: '-' + Number(statusBarHeight + 88) + 'rpx',
            paddingTop: Number(statusBarHeight + 88) + 'rpx',
          },
        ]"
      >
        <!-- <uni-steps :options="state.list" :active="state.active" active-color="#fff" /> -->
        <view class="ss-flex">
          <view class="steps-item" v-for="(item, index) in state.list" :key="index">
            <view class="ss-flex">
              <text
                class="sicon-circleclose"
                v-if="
                  (state.list.length - 1 == index && state.info.aftersale_status === -2) ||
                  (state.list.length - 1 == index && state.info.aftersale_status === -1)
                "
              ></text>
              <text
                class="sicon-circlecheck"
                v-else
                :class="state.active >= index ? 'activity-color' : 'info-color'"
              ></text>

              <view
                v-if="state.list.length - 1 != index"
                class="line"
                :class="state.active >= index ? 'activity-bg' : 'info-bg'"
              ></view>
            </view>
            <view
              class="steps-item-title"
              :class="state.active >= index ? 'activity-color' : 'info-color'"
              >{{ item.title }}</view
            >
          </view>
        </view>
      </view>

      <!-- 服务状态 -->
      <view
        class="status-box ss-flex ss-col-center ss-row-between ss-m-x-20"
        @tap="sheep.$router.go('/pages/order/aftersale/log', { id: state.aftersaleId })"
      >
        <view class="">
          <view class="status-text">{{ state.info.aftersale_status_desc }}</view>
          <view class="status-time">{{ state.info.update_time }}</view>
        </view>
        <text class="ss-iconfont _icon-forward" style="color: #666"></text>
      </view>

      <!-- 退款金额 -->
      <view class="aftersale-money ss-flex ss-col-center ss-row-between">
        <view class="aftersale-money--title">退款总额</view>
        <view class="aftersale-money--num">￥{{ state.info.refund_fee }}</view>
      </view>
      <!-- 服务商品 -->
      <view class="order-shop">
        <s-goods-item
          :title="state.info.goods_title"
          :price="state.info.goods_price"
          :img="state.info.goods_image"
          priceColor="#333333"
          :titleWidth="480"
          :skuText="state.info.goods_sku_text"
          :num="state.info.goods_num"
        ></s-goods-item>
      </view>

      <!-- 服务内容 -->
      <view class="aftersale-content">
        <view class="aftersale-item ss-flex ss-col-center">
          <view class="item-title">服务单号：</view>
          <view class="item-content ss-m-r-16">{{ state.info.aftersale_sn }}</view>
          <button class="ss-reset-button copy-btn" @tap="onCopy">复制</button>
        </view>
        <view class="aftersale-item ss-flex ss-col-center">
          <view class="item-title">申请时间：</view>
          <view class="item-content">{{ state.info.create_time }}</view>
        </view>
        <view class="aftersale-item ss-flex ss-col-center">
          <view class="item-title">售后类型：</view>
          <view class="item-content">{{ state.info.type_text }}</view>
        </view>
        <view class="aftersale-item ss-flex ss-col-center">
          <view class="item-title">申请原因：</view>
          <view class="item-content">{{ state.info.reason }}</view>
        </view>
        <view class="aftersale-item ss-flex ss-col-center">
          <view class="item-title">相关描述：</view>
          <view class="item-content">{{ state.info.content }}</view>
        </view>
      </view>
    </view>
    <s-empty
      v-if="isEmpty(state.info) && state.loading"
      icon="/static/order-empty.png"
      text="暂无该订单售后详情"
    />
    <su-fixed bottom placeholder bg="bg-white" v-if="!isEmpty(state.info)">
      <view class="foot_box">
        <button
          class="ss-reset-button btn"
          v-if="state.info.btns?.includes('cancel')"
          @tap="onApply(state.info.id)"
          >取消申请</button
        >
        <!-- <button
          class="ss-reset-button btn"
          v-if="state.info.btns?.includes('delete')"
          @tap="onDelete(state.info.id)"
          >删除</button
        > -->
        <button class="ss-reset-button contcat-btn btn" @tap="sheep.$router.go('/pages/chat/index')"
          >联系客服</button
        >
      </view>
    </su-fixed>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import { isEmpty } from 'lodash';

  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  const headerBg = sheep.$url.css('/static/img/shop/order/order_bg.png');
  const state = reactive({
    active: 0,
    aftersaleId: 0,
    info: {},
    list: [
      {
        title: '提交申请',
      },
      {
        title: '处理中',
      },
    ],
    loading: false,
  });

  function onApply(orderId) {
    uni.showModal({
      title: '提示',
      content: '确定要取消此申请吗？',
      success: async function (res) {
        if (res.confirm) {
          const { error } = await sheep.$api.order.aftersale.cancel(orderId);
          if (error === 0) {
            getDetail(state.aftersaleId);
          }
        }
      },
    });
  }

  function onDelete(orderId) {
    uni.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: async function (res) {
        if (res.confirm) {
          const { error } = await sheep.$api.order.aftersale.delete(orderId);
          if (error === 0) {
            sheep.$router.back();
          }
        }
      },
    });
  }
  const onCopy = () => {
    sheep.$helper.copyText(state.info.aftersale_sn);
  };
  async function getDetail(id) {
    const { error, data } = await sheep.$api.order.aftersale.detail(id);
    state.loading = true;
    if (error === 0) {
      state.info = data;
      if (state.info.aftersale_status === -2 || state.info.aftersale_status === -1) {
        state.list.push({ title: state.info.aftersale_status_text });
        state.active = 2;
      } else {
        state.list.push({ title: '完成' });
        state.active = state.info.aftersale_status;
      }
    } else {
      state.info = null;
    }
  }
  onLoad((options) => {
    state.aftersaleId = options.id;
    getDetail(options.id);
  });
</script>

<style lang="scss" scoped>
  // 步骤条
  .steps-box {
    width: 100%;
    height: 190rpx;
    background: v-bind(headerBg) no-repeat,
      linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    background-size: 750rpx 100%;
    padding-left: 72rpx;

    .steps-item {
      .sicon-circleclose {
        font-size: 24rpx;
        color: #fff;
      }
      .sicon-circlecheck {
        font-size: 24rpx;
      }
      .steps-item-title {
        font-size: 24rpx;
        font-weight: 400;
        margin-top: 16rpx;
        margin-left: -36rpx;
        width: 100rpx;
        text-align: center;
      }
    }
  }
  .activity-color {
    color: #fff;
  }
  .info-color {
    color: rgba(#fff, 0.4);
  }
  .activity-bg {
    background: #fff;
  }
  .info-bg {
    background: rgba(#fff, 0.4);
  }

  .line {
    width: 270rpx;
    height: 4rpx;
  }

  // 服务状态
  .status-box {
    position: relative;
    z-index: 3;
    background-color: #fff;
    border-radius: 20rpx 20rpx 0px 0px;
    padding: 20rpx;
    margin-top: -20rpx;

    .status-text {
      font-size: 28rpx;

      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 20rpx;
    }

    .status-time {
      font-size: 24rpx;

      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }

  // 退款金额
  .aftersale-money {
    background-color: #fff;
    height: 98rpx;
    padding: 0 20rpx;
    margin: 20rpx;

    .aftersale-money--title {
      font-size: 28rpx;

      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }

    .aftersale-money--num {
      font-size: 28rpx;
      font-family: OPPOSANS;
      font-weight: 500;
      color: #ff3000;
    }
  }

  // order-shop
  .order-shop {
    padding: 20rpx;
    background-color: #fff;
    margin: 0 20rpx 20rpx 20rpx;
  }

  // 服务内容
  .aftersale-content {
    background-color: #fff;
    padding: 20rpx;
    margin: 0 20rpx;

    .aftersale-item {
      height: 60rpx;

      .copy-btn {
        background: #eeeeee;
        color: #333;
        border-radius: 20rpx;
        width: 75rpx;
        height: 40rpx;
        font-size: 22rpx;
      }

      .item-title {
        color: #999;
        font-size: 28rpx;
      }

      .item-content {
        color: #333;
        font-size: 28rpx;
      }
    }
  }

  // 底部功能
  .foot_box {
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .btn {
      width: 160rpx;
      line-height: 60rpx;
      background: rgba(238, 238, 238, 1);
      border-radius: 30rpx;
      padding: 0;
      margin-right: 20rpx;
      font-size: 26rpx;

      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
</style>
