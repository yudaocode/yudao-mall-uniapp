<!-- 物流包裹-->
<template>
  <s-layout title="物流包裹">
    <view class="express-wrap">
      <su-sticky bgColor="#FFE2B6">
        <view class="header ss-flex ss-p-l-24">{{ state.list.length }}个包裹已派送</view>
      </su-sticky>
      <view
        class="express-box"
        v-for="item in state.list"
        :key="item.type"
        @tap="sheep.$router.go('/pages/order/express/log', { id: item.id, orderId: state.orderId })"
      >
        <view class="express-box-header ss-flex ss-row-between">
          <view class="express-box-header-type">{{ item.status_text }}</view>
          <view class="express-box-header-num">{{
            item.express_name + ' : ' + item.express_no
          }}</view>
        </view>
        <view class="express-box-content">
          <view class="content-address">{{ item.logs[0]?.content }}</view>
          <view class="" v-if="item.items?.length">
            <scroll-view class="scroll-box" scroll-x scroll-anchoring>
              <view class="ss-flex">
                <view v-for="i in item.items" :key="i" class="ss-m-r-20"
                  ><image class="content-img" :src="sheep.$url.static(i.goods_image)" />
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
        <view class="express-box-foot">共{{ item.items.length }}件商品</view>
      </view>
    </view>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  const state = reactive({
    list: [],
    orderId: '',
  });
  async function getExpressList(id) {
    const { data } = await sheep.$api.order.express(id, '');
    state.list = data;
  }
  onLoad((Option) => {
    state.orderId = Option.orderId;
    getExpressList(state.orderId);
  });
</script>

<style lang="scss" scoped>
  .header {
    height: 84rpx;
    font-size: 30rpx;
    font-weight: 500;
    color: #a8700d;
  }
  .express-box {
    background: #fff;
    padding-bottom: 30rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    .express-box-header {
      height: 76rpx;
      padding: 0 24rpx;
      border-bottom: 2rpx solid rgba(#dfdfdf, 0.5);
      .express-box-header-type {
        font-size: 26rpx;
        font-weight: 500;
        color: #999;
      }
      .express-box-header-num {
        font-size: 26rpx;
        font-weight: 400;
        color: #999999;
      }
    }
    .express-box-content {
      padding: 20rpx 24rpx;
      .content-address {
        font-size: 28rpx;
        font-weight: 400;
        color: #333333;
        line-height: normal;
        margin-bottom: 20rpx;
      }
      .content-img {
        width: 180rpx;
        height: 180rpx;
      }
    }
    .express-box-foot {
      padding: 0 24rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
    }
  }
</style>
