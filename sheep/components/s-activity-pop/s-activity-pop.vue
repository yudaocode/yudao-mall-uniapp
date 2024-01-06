<!-- 商品信息：满减送等营销活动的弹窗 -->
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
          <view class="ss-flex ss-col-top ss-m-b-40" @tap="onGoodsList(item)">
            <view class="model-content-tag ss-flex ss-row-center">满减</view>
            <view class="ss-m-l-20 model-content-title ss-flex-1">
              <view class="ss-m-b-24" v-for="rule in state.activityMap[item.id]?.rules" :key="rule">
                {{ formatRewardActivityRule(state.activityMap[item.id], rule) }}
              </view>
            </view>
            <text class="cicon-forward" />
          </view>
        </view>
      </scroll-view>
    </view>
  </su-popup>
</template>
<script setup>
  import sheep from '@/sheep';
  import { computed, reactive, watch } from 'vue';
  import RewardActivityApi from '@/sheep/api/promotion/rewardActivity';
  import { formatRewardActivityRule } from '@/sheep/hooks/useGoods';

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
    activityMap: {}
  });

  watch(
    () => props.show,
    () => {
      // 展示的情况下，加载每个活动的详细信息
      if (props.show) {
        state.activityInfo?.forEach(activity => {
          RewardActivityApi.getRewardActivity(activity.id).then(res => {
            if (res.code !== 0) {
              return;
            }
            state.activityMap[activity.id] = res.data;
          })
        });
      }
    },
  );

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
