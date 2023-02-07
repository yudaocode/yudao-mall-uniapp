<!-- 页面  -->
<template>
  <s-layout title="全部评价">
    <su-tabs
      :list="state.type"
      :scrollable="false"
      @change="onTabsChange"
      :current="state.currentTab"
    ></su-tabs>
    <view class="ss-m-t-20">
      <view class="list-item" v-for="item in state.pagination.data" :key="item">
        <comment-item :item="item"></comment-item>
      </view>
    </view>
    <s-empty v-if="state.pagination.total === 0" text="暂无数据" icon="/static/data-empty.png" />
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
  import { computed, reactive } from 'vue';
  import _ from 'lodash';
  import commentItem from '../components/detail/comment-item.vue';

  const pagination = {
    data: [],
    current_page: 1,
    total: 1,
    last_page: 1,
  };
  const state = reactive({
    list: [],
    type: [],
    currentTab: 0,
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    commentId: 0,
    code: 'all',
  });
  // 切换选项卡
  function onTabsChange(e) {
    state.pagination = pagination
    state.currentTab = e.index;
    state.code = e.code;
    getList(state.commentId, e.code);
  }
  async function getType(id) {
    const { error, data } = await sheep.$api.goods.getType(id);
    if (error === 0) {
      state.type = data;
    }
  }
  async function getList(id, code, page = 1, list_rows = 6) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.goods.comment(id, {
      type: code,
      list_rows,
      page,
    });
    if (res.error === 0) {
        let orderList = _.concat(state.pagination.data, res.data.data);
        state.pagination = {
          ...res.data,
          data: orderList,
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
      getList(state.commentId, state.code, state.pagination.current_page + 1);
    }
  }
  onLoad((options) => {
    state.commentId = options.id;
    getType(state.commentId);
    getList(state.commentId);
  });
  // 上拉加载更多
  onReachBottom(() => {
    loadmore();
  });
</script>

<style lang="scss" scoped>
  .list-item {
    padding: 32rpx 30rpx 20rpx 20rpx;
    background: #fff;
    .avatar {
      width: 52rpx;
      height: 52rpx;
      border-radius: 50%;
    }
    .nickname {
      font-size: 26rpx;
      font-weight: 500;
      color: #999999;
    }
    .create-time {
      font-size: 24rpx;
      font-weight: 500;
      color: #c4c4c4;
    }
    .content-title {
      font-size: 26rpx;
      font-weight: 400;
      color: #666666;
      line-height: 42rpx;
    }
    .content-img {
      width: 174rpx;
      height: 174rpx;
    }
    .cicon-info-o {
      font-size: 26rpx;
      color: #c4c4c4;
    }
    .foot-title {
      font-size: 24rpx;
      font-weight: 500;
      color: #999999;
    }
  }

  .btn-box {
    width: 100%;
    height: 120rpx;
    background: #fff;
    border-top: 2rpx solid #eee;
  }
  .tab-btn {
    width: 130rpx;
    height: 62rpx;
    background: #eeeeee;
    border-radius: 31rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #999999;
    border: 1px solid #e5e5e5;
    margin-right: 10rpx;
  }
</style>
