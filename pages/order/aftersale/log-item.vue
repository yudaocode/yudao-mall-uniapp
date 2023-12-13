<template>
  <view class="log-item ss-flex">
    <view class="log-icon ss-flex-col ss-col-center ss-m-r-20">
      <text class="cicon-title" :class="index === 0 ? 'activity-color' : ''"></text>
      <view v-if="data.length - 1 != index" class="line"></view>
    </view>
    <view>
      <view class="text">{{ item.log_type_text }}</view>
      <mp-html class="richtext" :content="item.content"></mp-html>
      <view class="" v-if="item.images?.length">
        <scroll-view class="scroll-box" scroll-x scroll-anchoring>
          <view class="ss-flex">
            <view v-for="i in item.images" :key="i" class="ss-m-r-20">
              <su-image
                class="content-img"
                isPreview
                :previewList="state.commentImages"
                :current="index"
                :src="i"
                :height="120"
                :width="120"
                mode="aspectFit"
              ></su-image>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="date">{{ item.create_time }}</view>
    </view>
  </view>
</template>
<script setup>
  import sheep from '@/sheep';
  import { reactive } from 'vue';
  const props = defineProps({
    item: {
      type: Object,
      default() {},
    },
    index: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
      default() {},
    },
  });
  const state = reactive({
    commentImages: [],
  });
  props.item.images?.forEach((i) => {
    state.commentImages.push(sheep.$url.cdn(i));
  });
</script>
<style lang="scss" scoped>
  .log-item {
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
</style>
