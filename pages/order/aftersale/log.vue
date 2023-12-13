<!-- 售后进度  -->
<template>
  <s-layout title="售后进度">
    <view class="log-box">
      <view  v-for="(item, index) in state.info" :key="item.title">
        <log-item :item="item" :index="index" :data="state.info"></log-item>
      </view>
    </view>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import logItem from './log-item.vue';

  const state = reactive({
    active: 1,
    list: [
      {
        title: '买家下单',
        desc: '2018-11-11',
      },
      {
        title: '卖家发货',
        desc: '2018-11-12',
      },
      {
        title: '买家签收',
        desc: '2018-11-13',
      },
      {
        title: '交易完成',
        desc: '2018-11-14',
      },
    ],
  });
  async function getDetail(id) {
    const { data } = await sheep.$api.order.aftersale.detail(id);
    state.info = data.logs;
  }
  onLoad((options) => {
    state.aftersaleId = options.id;
    getDetail(options.id);
  });
</script>

<style lang="scss" scoped>
  .log-box {
    padding: 24rpx 24rpx 24rpx 40rpx;
    background-color: #fff;
  }
</style>
