<!-- 售后进度  -->
<template>
  <s-layout title="售后进度">
    <view class="log-box">
      <view class="log-content-box ss-flex" v-for="(item, index) in state.info" :key="item.title">
        <view class="log-icon ss-flex-col ss-col-center ss-m-r-20">
          <text class="cicon-title" :class="index === 0 ? 'activity-color' : ''"></text>
          <view v-if="state.info.length - 1 != index" class="line"></view>
        </view>
        <view>
          <view class="text">{{ item.log_type_text }}</view>
          <su-parse class="richtext" :content="item.content"></su-parse>
          <view class="" v-if="item.images?.length">
            <scroll-view class="scroll-box" scroll-x scroll-anchoring>
              <view class="ss-flex">
                <view v-for="i in item.images" :key="i" class="ss-m-r-20"
                  ><image class="content-img" :src="sheep.$url.static(i)" />
                </view>
              </view>
            </scroll-view>
          </view>
          <view class="date">{{ item.create_time }}</view>
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
    active: 1,
    list: [
      {
        title: '买家下单',
        desc: '2018-11-11',
      },
      {
        title: '卖家发货',
        desc: '2018-11-12',
      },
      {
        title: '买家签收',
        desc: '2018-11-13',
      },
      {
        title: '交易完成',
        desc: '2018-11-14',
      },
    ],
  });
  async function getDetail(id) {
    const { data } = await sheep.$api.order.aftersale.detail(id);
    state.info = data.logs;
  }
  onLoad((options) => {
    state.aftersaleId = options.id;
    getDetail(options.id);
  });
</script>

<style lang="scss" scoped>
  .log-box {
    padding: 24rpx 24rpx 24rpx 40rpx;
    background-color: #fff;
    .log-content-box {
      align-items: stretch;
    }
    .log-icon {
      height: inherit;
      .cicon-title {
        font-size: 30rpx;
        color: #dfdfdf;
      }
      .activity-color {
        color: #60bd45;
      }
      .line {
        width: 1px;
        height: 100%;
        background: #dfdfdf;
      }
    }
    .text {
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
    }
    .richtext {
      font-size: 24rpx;
      font-weight: 500;
      color: #999999;
      margin: 20rpx 0 0 0;
    }
    .content-img {
      margin-top: 20rpx;
      width: 200rpx;
      height: 200rpx;
    }
    .date {
      margin-top: 20rpx;
      font-size: 24rpx;
      font-family: OPPOSANS;
      font-weight: 400;
      color: #999999;
      margin-bottom: 40rpx;
    }
  }
</style>
