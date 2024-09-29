<!-- 积分商城：商品列表  -->
<template>
  <s-layout title="积分商城">
    <view class="ss-p-20">
      <view v-for="item in state.pagination.data" :key="item.id" class="ss-m-b-20">
        <s-point-card
          size="sl"
          :data="item"
          priceColor="#FF3000"
          @tap="sheep.$router.go('/pages/goods/point', { id: item.id })"
        />
      </view>
    </view>
    <s-empty
      v-if="state.pagination.total === 0"
      icon="/static/goods-empty.png"
      text="暂无积分商品"
    />
    <uni-load-more
      v-if="state.pagination.total > 0"
      :status="state.loadStatus"
      :content-text="{
        contentdown: '上拉加载更多',
      }"
      @tap="loadmore"
    />
  </s-layout>
</template>
<script setup>
  import sheep from '@/sheep';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import _ from 'lodash';

  const state = reactive({
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
  });
  async function getData(page = 1, list_rows = 5) {
    // TODO @puhui999：分页重写成，我们的代码风格。原先的有点复杂
    state.loadStatus = 'loading';
    let res = await sheep.$api.app.scoreShop.list({
      list_rows,
      page,
    });
    if (res.error === 0) {
      let couponlist = _.concat(state.pagination.data, res.data.data);
      state.pagination = {
        ...res.data,
        data: couponlist,
      };
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getData(state.pagination.current_page + 1);
    }
  }

  // 上拉加载更多
  onReachBottom(() => {
    loadmore();
  });
  onLoad(() => {
    getData();
  });
</script>
