<!-- 物流追踪 -->
<template>
  <s-layout title="物流追踪">
    <view class="log-wrap">
      <view class="log-card ss-flex ss-m-20 ss-r-10" v-if="goodsImages.length > 0">
        <uni-swiper-dot :info="goodsImages" :current="state.current" mode="round">
          <swiper class="swiper-box" @change="change">
            <swiper-item v-for="(item, index) in goodsImages" :key="index">
              <image class="log-card-img" :src="sheep.$url.static(item.image)"></image>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>

        <view class="log-card-msg">
          <view class="ss-flex ss-m-b-8">
            <view>物流状态：</view>
            <view class="warning-color">{{ state.info.status_text }}</view>
          </view>
          <view class="ss-m-b-8">快递单号：{{ state.info.express_no }}</view>
          <view>快递公司：{{ state.info.express_name }}</view>
        </view>
      </view>
      <view class="log-content ss-m-20 ss-r-10">
        <view
          class="log-content-box ss-flex"
          v-for="(item, index) in state.info.logs"
          :key="item.title"
        >
          <view class="log-icon ss-flex-col ss-col-center ss-m-r-20">
            <text
              v-if="state.info.logs[index].status === state.info.logs[index - 1]?.status"
              class="cicon-title"
            ></text>
            <text
              v-if="state.info.logs[index].status != state.info.logs[index - 1]?.status"
              :class="[
                index === 0 ? 'activity-color' : 'info-color',
                item.status === 'transport'
                  ? 'sicon-transport'
                  : item.status === 'delivery'
                  ? 'sicon-delivery'
                  : item.status === 'collect'
                  ? 'sicon-a-collectmaterials'
                  : item.status === 'fail' || item.status === 'back' || item.status === 'refuse'
                  ? 'sicon-circleclose'
                  : item.status === 'signfor'
                  ? 'sicon-circlecheck'
                  : 'sicon-warning-outline',
              ]"
            ></text>
            <view v-if="state.info.logs.length - 1 != index" class="line"></view>
          </view>
          <view class="log-content-msg">
            <view
              v-if="
                item.status_text &&
                state.info.logs[index].status != state.info.logs[index - 1]?.status
              "
              class="log-msg-title ss-m-b-20"
              >{{ item.status_text }}</view
            >
            <view class="log-msg-desc ss-m-b-16">{{ item.content }}</view>
            <view class="log-msg-date ss-m-b-40">{{ item.change_date }}</view>
          </view>
        </view>
      </view>
    </view>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';

  const state = reactive({
    info: [],
    current: 0,
  });
  const goodsImages = computed(() => {
    let array = [];
    if (state.info.items) {
      state.info.items.forEach((item) => {
        array.push({
          image: item.goods_image,
        });
      });
    }
    return array;
  });
  function change(e) {
    state.current = e.detail.current;
  }
  async function getExpressdetail(id, orderId) {
    const { data } = await sheep.$api.order.express(id, orderId);
    state.info = data;
  }
  onLoad((Option) => {
    getExpressdetail(Option.id, Option.orderId);
  });
</script>

<style lang="scss" scoped>
  .swiper-box {
    width: 200rpx;
    height: 200rpx;
  }
  .log-card {
    border-top: 2rpx solid rgba(#dfdfdf, 0.5);
    padding: 20rpx;
    background: #fff;
    margin-bottom: 20rpx;
    .log-card-img {
      width: 200rpx;
      height: 200rpx;
      margin-right: 20rpx;
    }
    .log-card-msg {
      font-size: 28rpx;
      font-weight: 500;
      width: 490rpx;
      color: #333333;
      .warning-color {
        color: #999;
      }
    }
  }
  .log-content {
    padding: 34rpx 20rpx 0rpx 20rpx;
    background: #fff;
    .log-content-box {
      align-items: stretch;
    }
    .log-icon {
      height: inherit;
      .cicon-title {
        color: #ccc;
        font-size: 40rpx;
      }
      .activity-color {
        color: #f0c785;
        font-size: 40rpx;
      }
      .info-color {
        color: #ccc;
        font-size: 40rpx;
      }
      .line {
        width: 1px;
        height: 100%;
        background: #d8d8d8;
      }
    }

    .log-content-msg {
      .log-msg-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
      }
      .log-msg-desc {
        font-size: 24rpx;
        font-weight: 400;
        color: #333333;
        line-height: 36rpx;
      }
      .log-msg-date {
        font-size: 24rpx;
        font-weight: 500;
        color: #999999;
      }
    }
  }
</style>
