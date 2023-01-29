<template>
  <su-fixed bottom placeholder :val="44">
    <view>
      <view v-for="activity in data.activities" :key="activity.id">
        <view
          class="activity-box ss-p-x-38 ss-flex ss-row-between ss-col-center"
          :class="activity.type == 'seckill' ? 'seckill-box' : 'groupon-box'"
        >
          <view class="activity-title ss-flex">
            <view class="ss-m-r-16">
              <image
                :src="sheep.$url.static('/static/img/shop/goods/seckill-icon.png')"
                v-if="activity.type == 'seckill'"
                class="activity-icon"
              ></image>
              <image
                :src="sheep.$url.static('/static/img/shop/goods/groupon-icon.png')"
                class="activity-icon"
                v-else
              ></image>
            </view>
            <view>该商品正在参与{{ activity.type_text }}活动</view>
          </view>
          <button class="ss-reset-button activity-go" @tap="onActivity(activity)"> GO </button>
        </view>
        <!-- <button @tap="onActivity(activity)">{{ activity.title }} {{ activity.type_text }}</button> -->
      </view>
    </view>
  </su-fixed>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import sheep from '@/sheep';

  const seckillBg = sheep.$url.css('/static/img/shop/goods/seckill-tip-bg.png');
  const grouponBg = sheep.$url.css('/static/img/shop/goods/groupon-tip-bg.png');

  const props = defineProps({
    data: {
      type: Object,
      default() {},
    },
  });
  function onActivity(activity) {
    let type = activity.type;
    if (type === 'groupon_ladder') type = 'groupon';
    sheep.$router.go(`/pages/goods/${type}`, {
      id: props.data.id,
      activity_id: activity.id,
    });
  }
</script>

<style lang="scss" scoped>
  .activity-box {
    width: 100%;
    height: 80rpx;
    box-sizing: border-box;
    margin-bottom: 10rpx;

    .activity-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #ffffff;
      line-height: 42rpx;

      .activity-icon {
        width: 38rpx;
        height: 38rpx;
      }
    }

    .activity-go {
      width: 70rpx;
      height: 32rpx;
      background: #ffffff;
      border-radius: 16rpx;
      font-weight: 500;
      color: #ff6000;
      font-size: 24rpx;
      line-height: normal;
    }
  }

  //秒杀卡片
  .seckill-box {
    background: v-bind(seckillBg) no-repeat;
    background-size: 100% 100%;
  }

  .groupon-box {
    background: v-bind(grouponBg) no-repeat;
    background-size: 100% 100%;
  }
</style>
