<template>
  <su-popup
    :show="show"
    type="bottom"
    round="20"
    @close="emits('close')"
    showClose
    backgroundColor="#f2f2f2"
  >
    <view class="model-box">
      <view class="title ss-m-t-38 ss-m-l-20 ss-m-b-40">活动优惠</view>
      <scroll-view
        class="model-content ss-m-l-20"
        scroll-y
        :scroll-with-animation="false"
        :enable-back-to-top="true"
      >
        <view v-for="(item, index) in state.orderInfo.promo_infos" :key="index">
          <view class="ss-flex ss-m-b-40 subtitle">
            <view>共{{ item.goods_ids.length }}件，</view>
            <view v-if="item.activity_type === 'full_discount'">
              满{{ item.discount_rule.full }}打{{ item.discount_rule.discount }}折,已减
            </view>
            <view v-if="item.activity_type === 'full_gift'">满赠</view>
            <view v-if="item.activity_type === 'full_reduce'">
              满{{ item.discount_rule.full }}减{{ item.discount_rule.discount }},已减
            </view>
            <view class="price-text">￥{{ item.promo_discount_money || '0.00' }}</view>
          </view>
          <scroll-view class="scroll-box" scroll-x scroll-anchoring>
            <view class="ss-flex">
              <view v-for="i in item.goods_ids" :key="i">
                <image class="content-img" :src="sheep.$url.cdn(getGoodsImg(i))" />
              </view>
            </view>
          </scroll-view>
        </view>
      </scroll-view>
    </view>
    <view class="modal-footer ss-flex">
      <button class="confirm-btn ss-reset-button" @tap="emits('close')">确认</button>
    </view>
  </su-popup>
</template>
<script setup>
  import { computed, reactive } from 'vue';
  import sheep from '@/sheep';
  const props = defineProps({
    promoInfo: {
      type: Array,
      default: () => [],
    },
    goodsList: {
      type: Array,
      default: () => [],
    },
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
    orderInfo: computed(() => props.modelValue),
  });
  const getGoodsImg = (e) => {
    let goodsImg = '';
    state.orderInfo.goods_list.forEach((i) => {
      if (e == i.goods_id) {
        goodsImg = i.goods.image;
      }
    });
    return goodsImg;
  };
</script>
<style lang="scss" scoped>
  .model-box {
    height: 60vh;
  }
  .model-content {
    height: 54vh;
  }
  .modal-footer {
    width: 100%;
    height: 120rpx;
    background: #fff;
  }
  .confirm-btn {
    width: 710rpx;
    margin-left: 20rpx;
    height: 80rpx;
    background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    border-radius: 40rpx;
    color: #fff;
  }
  .content-img {
    width: 140rpx;
    height: 140rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
  }
  .subtitle {
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
  }
  .price-text {
    color: #ff3000;
  }
</style>
