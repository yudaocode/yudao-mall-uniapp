<template>
  <view class="ss-m-20" :style="{ opacity: disabled ? '0.5' : '1' }">
    <view class="content">
      <view
        class="tag ss-flex ss-row-center"
        :class="
          data.status == 'expired' || data.status == 'used' ? 'disabled-bg-color' : 'info-bg-color'
        "
        >{{ data.type_text }}</view
      >
      <view class="title ss-m-x-30 ss-p-t-18">
        <view class="ss-flex ss-row-between">
          <view
            class="value-text ss-flex-1 ss-m-r-10"
            :class="
              data.status == 'expired' || data.status == 'used' ? 'disabled-color' : 'info-color'
            "
            >{{ data.name }}</view
          >
          <view>
            <view
              class="ss-flex ss-col-bottom"
              :class="
                data.status != 'expired' && data.status != 'used' ? 'price-text' : 'disabled-color'
              "
            >
              <view class="value-reduce ss-m-b-10" v-if="data.type === 'reduce'">￥</view>
              <view class="value-price">{{ data.amount }}</view>
              <view class="value-discount ss-m-b-10 ss-m-l-4" v-if="data.type === 'discount'"
                >折</view
              >
            </view>
          </view>
        </view>
        <view class="ss-flex ss-row-between ss-m-t-16">
          <view
            class="sellby-text"
            :class="
              data.status == 'expired' || data.status == 'used'
                ? 'disabled-color'
                : 'subtitle-color'
            "
          >
            {{
              type === 'user'
                ? '有效期：' + data.use_start_time.substring(0, 11)
                : '领取时间：' + data.get_start_time.substring(0, 11)
            }}至
            {{
              type === 'user'
                ? data.use_end_time.substring(0, 11)
                : data.get_end_time.substring(0, 11)
            }}
          </view>
          <view
            class="value-enough"
            :class="
              data.status == 'expired' || data.status == 'used'
                ? 'disabled-color'
                : 'subtitle-color'
            "
            >满{{ data.enough }}可用</view
          >
        </view>
      </view>
    </view>

    <view class="desc ss-flex ss-row-between">
      <view>
        <view class="desc-title">
          {{ data.description }}
        </view>
        <view>
          <slot name="reason">
          </slot>
        </view>
      </view>
      <view>
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { reactive } from 'vue';
  import sheep from '@/sheep';
  const state = reactive({
    stateMap: {
      0: '立即领取',
      1: '去使用',
    },
  });
  // 接受参数
  const props = defineProps({
    data: {
      type: Object,
      default: {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'coupon',
    },
  });
</script>

<style lang="scss" scoped>
  .info-bg-color {
    background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
  }
  .disabled-bg-color {
    background: #999;
  }
  .info-color {
    color: #333;
  }
  .subtitle-color {
    color: #666;
  }
  .disabled-color {
    color: #999;
  }
  .content {
    width: 100%;
    background: #fff;
    border-radius: 20rpx 20rpx 0 0;
    -webkit-mask: radial-gradient(circle at 12rpx 100%, #0000 12rpx, red 0) -12rpx;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.04);

    .tag {
      width: 100rpx;

      color: #fff;
      height: 40rpx;
      font-size: 24rpx;
      border-radius: 20rpx 0 20rpx 0;
    }
    .title {
      padding-bottom: 22rpx;
      border-bottom: 2rpx dashed #d3d3d3;
      .value-text {
        font-size: 32rpx;
        font-weight: 600;
      }
      .sellby-text {
        font-size: 24rpx;
        font-weight: 400;
      }
      .value-price {
        font-size: 64rpx;
        font-weight: 500;
        line-height: normal;
        font-family: OPPOSANS;
      }
      .value-reduce {
        line-height: normal;
        font-size: 32rpx;
      }
      .value-discount {
        line-height: normal;
        font-size: 28rpx;
      }
      .value-enough {
        font-size: 24rpx;
        font-weight: 400;
        font-family: OPPOSANS;
      }
    }
  }
  .desc {
    width: 100%;
    background: #fff;
    -webkit-mask: radial-gradient(circle at 12rpx 0%, #0000 12rpx, red 0) -12rpx;
    box-shadow: rgba(#000, 0.1);
    box-sizing: border-box;
    padding: 24rpx 30rpx;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.04);
    border-radius: 0 0 20rpx 20rpx;
    .desc-title {
      font-size: 24rpx;
      color: #999;
      font-weight: 400;
    }
  }
  .price-text {
    color: #ff0000;
  }
</style>
