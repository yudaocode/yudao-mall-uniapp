<template>
  <su-popup
    :show="state.show"
    type="bottom"
    round="10"
    :isMaskClick="false"
    :backgroundImage="sheep.$url.css('/static/img/shop/commission/become-agent.png')"
    @close="show = false"
    backgroundColor="var(--ui-BG-Main)"
  >
    <view class="model-box ss-flex ss-row-center">
      <view class="content">
        <scroll-view
          class="scroll-box"
          scroll-y="true"
          :scroll-with-animation="true"
          :show-scrollbar="false"
        >
          <view v-if="errorData.type === 'goods'">
            <view class="item-box ss-m-b-20" v-for="item in errorData.value" :key="item.id">
              <s-goods-item :title="item.title" :img="item.image" :price="item.price[0]" priceColor="#E1212B" @tap="sheep.$router.go('/pages/goods/index', { id: item.id })">
                <template #groupon>
                  <view class="item-box-subtitle">{{ item.subtitle }}</view>
                </template>
              </s-goods-item>
            </view>
          </view>

          <s-goods-item
            title="累计消费满"
            price=""
            :img="sheep.$url.static('/static/img/shop/commission/consume.png')"
            v-else-if="errorData.type === 'consume'"
          >
            <template #groupon>
              <view class="ss-flex">
                <view class="progress-box ss-flex">
                  <view
                    class="progerss-active"
                    :style="{
                      width: state.percent < 10 ? '10%' : state.percent + '%',
                    }"
                  ></view>
                </view>
                <view class="progress-title ss-m-l-10">{{ errorData.value }}元</view>
              </view>
              <view class="progress-title ss-m-t-20">{{ userInfo.total_consume }}元</view>
            </template>
          </s-goods-item>
        </scroll-view>
        <view class="content-des" v-if="errorData.type === 'goods'"
          >* 购买指定商品即可成为分销商</view
        >
        <view class="content-des" v-else-if="errorData.type === 'consume'"
          >* 满足累计消费即可成为分销商</view
        >
      </view>
      <button class="ss-reset-button go-btn ui-BG-Main-Gradient" @tap="sheep.$router.back()">
        返回
      </button>
    </view>
  </su-popup>
</template>
<script setup>
  import sheep from '@/sheep';
  import { computed, reactive, watch } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';

  const props = defineProps({
    error: {
      type: Number,
      default: 0,
    },
    errorData: {
      type: Object,
      default() {},
    },
  });

  const userInfo = computed(() => sheep.$store('user').userInfo);

  const state = reactive({
    percent: computed(() => {
      if (props.errorData.type !== 'consume') {
        return 0;
      }
      let percent = (userInfo.value.total_consume / props.errorData.value) * 100;
      return parseInt(percent);
    }),
    show: false,
    money: '',
  });

  watch(
    () => props.error,
    (error) => {
      if (error == 100) {
        state.show = true;
      }
    },
  );
</script>
<style lang="scss" scoped>
  :deep() {
    .ss-goods-item-warp {
      background-color: #f8f8f8 !important;
    }
  }

  .progress-title {
    font-size: 20rpx;
    font-weight: 500;
    color: #666666;
  }

  .progress-box {
    flex: 1;
    height: 18rpx;
    background: #e7e7e7;
    border-radius: 9rpx;
  }

  .progerss-active {
    height: 24rpx;
    background: linear-gradient(90deg, #ff6000 0%, #fe832a 100%);
    border-radius: 12rpx;
  }

  .model-box {
    padding: 140rpx 40rpx 60rpx 40rpx;
    height: 916rpx;
    box-sizing: border-box;
    position: relative;

    .content {
      height: 720rpx;
      width: 612rpx;
      padding-top: 30rpx;
      // background-color: #fff;
      box-sizing: border-box;

      .content-des {
        margin-top: 20rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: #999999;
        text-align: center;
      }
    }

    .scroll-box {
      height: 620rpx;
    }
    .item-box-subtitle {
      font-size: 24rpx;
      font-weight: 500;
      color: #999999;
      line-height: normal;
    }

    .go-btn {
      width: 600rpx;
      height: 70rpx;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 120rpx;
      border-radius: 35rpx;
      font-size: 28rpx;
      font-weight: 500;
    }
  }
</style>
