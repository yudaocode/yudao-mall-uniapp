<!-- 优惠券组  -->
<template>
  <view>
    <!-- 样式1 -->
    <view class="lg-coupon-wrap" v-if="mode == 1">
      <scroll-view class="scroll-box" scroll-x scroll-anchoring>
        <view class="coupon-box ss-flex">
          <view
            class="coupon-item"
            :style="[couponBg, { marginLeft: data.space + 'px' }]"
            v-for="(item, index) in couponList"
            :key="index"
          >
            <su-coupon
              size="lg"
              :textColor="data.fill.color"
              background=""
              :couponId="item.id"
              :title="item.amount_text"
              :value="item.amount"
              :surplus="item.stock"
              :type="item.type"
              :sellBy="`${item.get_start_time.substring(0, 10)} 至 ${item.get_end_time.substring(
                0,
                10,
              )}`"
            >
              <template v-slot:btn>
                <button
                  class="ss-reset-button card-btn"
                  :style="[btnStyles]"
                  @click.stop="onGetCoupon(item.id)"
                >
                  {{ item.get_status_text }}
                </button>
              </template>
            </su-coupon>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 样式2 -->
    <view class="md-coupon-wrap" v-if="mode == 2">
      <scroll-view class="scroll-box" scroll-x scroll-anchoring>
        <view class="coupon-box ss-flex">
          <view
            class="coupon-item"
            :style="[couponBg, { marginLeft: data.space + 'px' }]"
            v-for="(item, index) in couponList"
            :key="index"
          >
            <su-coupon
              size="md"
              :textColor="data.fill.color"
              background=""
              :title="item.amount_text"
              :value="item.amount"
              :surplus="item.stock"
              :couponId="item.id"
              :type="item.type"
              :sellBy="`${item.get_start_time.substring(0, 10)} 至 ${item.get_end_time.substring(
                0,
                10,
              )}`"
            >
              <template v-slot:btn>
                <button
                  @click.stop="onGetCoupon(item.id)"
                  class="ss-reset-button card-btn ss-flex ss-row-center ss-col-center"
                  :style="[btnStyles]"
                >
                  <view class="btn-text">{{ item.get_status_text }}</view>
                </button>
              </template>
            </su-coupon>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 样式3 -->
    <view class="xs-coupon-wrap" v-if="mode == 3">
      <scroll-view class="scroll-box" scroll-x scroll-anchoring>
        <view class="coupon-box ss-flex">
          <view
            class="coupon-item"
            :style="[couponBg, { marginLeft: data.space + 'px' }]"
            v-for="(item, index) in couponList"
            :key="index"
          >
            <su-coupon
              size="xs"
              :textColor="data.fill.color"
              background=""
              :title="item.amount_text"
              :value="item.amount"
              :surplus="item.stock"
              :couponId="item.id"
              :type="item.type"
              :sellBy="`${item.get_start_time.substring(0, 10)} 至 ${item.get_end_time.substring(
                0,
                10,
              )}`"
            >
              <template v-slot:btn>
                <button
                  class="ss-reset-button card-btn"
                  :style="[btnStyles]"
                  @click.stop="onGetCoupon(item.id)"
                >
                  {{ item.get_status_text }}
                </button>
              </template>
            </su-coupon>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
  import sheep from '@/sheep';
  import { ref, onMounted } from 'vue';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  });
  const { mode, button } = props.data;
  const couponBg = {
    background: `url(${sheep.$url.cdn(props.data.fill.bgImage)}) no-repeat top center / 100% 100%`,
  };
  const btnStyles = {
    background: button.bgColor,
    color: button.color,
  };
  const couponList = ref([]);
  //立即领取优惠券
  async function onGetCoupon(id) {
    const { error, msg } = await sheep.$api.coupon.get(id);
    if (error === 0) {
      uni.showToast({
        title: msg,
        icon: 'none',
      });
    } else {
      let { data } = await sheep.$api.coupon.list({ ids: props.data.couponIds.join(',') });
      couponList.value = [...data.data];
    }
  }
  onMounted(async () => {
    let { data } = await sheep.$api.coupon.list({ ids: props.data.couponIds.join(',') });
    // couponList.value = [...data.data, ...data.data, ...data.data, ...data.data];
    couponList.value = [...data.data];
  });
</script>

<style lang="scss" scoped>
  .card-btn {
    width: 140rpx;
    height: 50rpx;
    border-radius: 25rpx;
    font-size: 24rpx;
    line-height: 50rpx;
  }
  .coupon-item {
    &:nth-of-type(1) {
      margin-left: 0 !important;
    }
  }
  .md-coupon-wrap {
    .card-btn {
      width: 50rpx;
      height: 140rpx;
      margin: auto 0;
      margin-right: 20rpx;

      .btn-text {
        font-size: 24rpx;
        text-align: center;
        writing-mode: vertical-lr;
        writing-mode: tb-lr;
      }
    }
  }
</style>
