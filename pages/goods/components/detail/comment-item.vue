<template>
  <view>
    <view class="user ss-flex ss-m-b-14">
      <view class="ss-m-r-20 ss-flex">
        <image class="avatar" :src="sheep.$url.cdn(item.user_avatar)"></image>
      </view>
      <view class="nickname ss-m-r-20">
        {{ item.user_nickname }}
      </view>
      <view class="">
        <uni-rate :readonly="true" v-model="item.level" size="18" />
      </view>
    </view>
    <view class="content">
      {{ item.content }}
    </view>
    <view class="ss-m-t-24" v-if="item.images?.length">
      <scroll-view class="scroll-box" scroll-x scroll-anchoring>
        <view class="ss-flex">
          <view v-for="(item, index) in item.images" :key="item" class="ss-m-r-10">
            <su-image class="content-img" isPreview :previewList="state.commentImages" :current="index" :src="item"
              :height="120" :width="120" mode="aspectFill"></su-image>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="ss-m-t-20 reply-box" v-if="item.reply_time">
      <view class="reply-title">商家回复：</view>
      <view class="reply-content">{{ item.reply_content }}</view>
    </view>
  </view>
</template>

<script setup>
import sheep from '@/sheep';
import { reactive } from 'vue';
const props = defineProps({
  item: {
    type: Object,
    default() { },
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
.avatar {
  width: 52rpx;
  height: 52rpx;
  border-radius: 50%;
}

.nickname {
  font-size: 26rpx;
  font-weight: 500;
  color: #999999;
}

.content {
  width: 636rpx;
  font-size: 26rpx;
  font-weight: 400;
  color: #333333;
}

.reply-box {
  position: relative;
  background: #f8f8f8;
  border-radius: 8rpx;
  padding: 16rpx;
}

.reply-title {
  position: absolute;
  left: 16rpx;
  top: 16rpx;
  font-weight: 400;
  font-size: 26rpx;
  line-height: 40rpx;
  color: #333333;
}

.reply-content {
  text-indent: 128rpx;
  font-weight: 400;
  font-size: 26rpx;
  line-height: 40rpx;
  color: #333333;
}
</style>
