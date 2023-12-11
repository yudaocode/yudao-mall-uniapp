<template>
  <su-popup :show="show" type="bottom" round="20" @close="emits('close')" showClose>
    <view class="model-box">
      <view class="title ss-m-t-16 ss-m-l-20 ss-flex">营销活动</view>
      <scroll-view
        class="model-content ss-m-t-50"
        scroll-y
        :scroll-with-animation="false"
        :enable-back-to-top="true"
      >
        <view v-for="item in state.activityInfo" :key="item.id">
          <!-- <uni-list :border="false">
            <uni-list-item showArrow clickable @tap="sheep.$router.go('/pages/goods/list')">
              <template v-slot:header>
                <view class="model-content-tag ss-flex ss-row-center">{{ item.type_text }}</view>
              </template>
              <template v-slot:body>
                <view class="ss-m-l-20 model-content-title">
                  <view class="ss-m-b-24" v-for="text in item.texts" :key="text">
                    {{ text }}
                  </view>
                </view>
              </template>
            </uni-list-item>
          </uni-list> -->
          <view class="ss-flex ss-col-top ss-m-b-40" @tap="onGoodsList(item)">
            <view class="model-content-tag ss-flex ss-row-center">{{ item.type_text }}</view>
            <view class="ss-m-l-20 model-content-title ss-flex-1">
              <view class="ss-m-b-24" v-for="text in item.texts" :key="text">
                {{ text }}
              </view>
            </view>
            <text class="cicon-forward"></text>
          </view>
        </view>
      </scroll-view>
    </view>
  </su-popup>
</template>
<script setup>
  import sheep from '@/sheep';
  import { computed, reactive } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Object,
      default() {},
    },
    show: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['close']);
  const state = reactive({
    activityInfo: computed(() => props.modelValue),
  });
  function onGoodsList(e) {
    sheep.$router.go('/pages/activity/index', {
      activityId: e.id,
    });
  }
</script>
<style lang="scss" scoped>
  .model-box {
    height: 60vh;
    .title {
      font-size: 36rpx;
      height: 80rpx;
      font-weight: bold;
      color: #333333;
    }
  }
  .model-content {
    padding: 0 20rpx;
    box-sizing: border-box;
    .model-content-tag {
      background: rgba(#ff6911, 0.1);
      font-size: 24rpx;
      font-weight: 500;
      color: #ff6911;
      line-height: 42rpx;
      width: 68rpx;
      height: 32rpx;
      border-radius: 5rpx;
    }
    .model-content-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
    }
    .cicon-forward {
      font-size: 28rpx;
      color: #999999;
    }
  }
</style>
