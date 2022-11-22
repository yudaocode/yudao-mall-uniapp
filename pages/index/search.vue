<template>
  <s-layout class="set-wrap" title="搜索" :bgStyle="{ color: '#FFF' }">
    <view class="ss-p-x-24">
      <view class="ss-flex ss-col-center">
        <uni-search-bar
          class="ss-flex-1"
          radius="33"
          placeholder="请输入关键字"
          cancelButton="none"
          :focus="true"
          @confirm="onSearch"
        />
      </view>
      <view class="ss-flex ss-row-between ss-col-center">
        <view class="serach-history">搜索历史</view>
        <button class="clean-history ss-reset-button" @tap="onDelete"> 清除搜索历史 </button>
      </view>
      <view class="ss-flex ss-col-center ss-row-left ss-flex-wrap">
        <button
          class="history-btn ss-reset-button"
          @tap="onSearch(item)"
          v-for="(item, index) in state.historyTag"
          :key="index"
        >
          {{ item }}
        </button>
      </view>
    </view>
  </s-layout>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  const state = reactive({
    historyTag: [],
  });

  function onSearch(res) {
    if (res.value) {
      if (!state.historyTag.includes(res.value)) {
        let search = getArr(state.historyTag, res.value);
        uni.setStorageSync('searchHistory', search);
        sheep.$router.go('/pages/goods/list', { keyword: res.value });
      } else {
        sheep.$router.go('/pages/goods/list', { keyword: res.value });
      }
    } else {
      sheep.$router.go('/pages/goods/list', { keyword: res });
    }
  }

  function getArr(list, item) {
    let arr = list;
    let length = 10; //队列长度
    arr.length < length ? arr.unshift(item) : arr.pop();
    return arr;
  }

  function onDelete() {
    uni.showModal({
      title: '提示',
      content: '确认清除搜索历史吗？',
      success: function (res) {
        if (res.confirm) {
          state.historyTag = [];
          uni.removeStorageSync('search');
        }
      },
    });
  }
  onLoad(() => {
    uni.getStorage({
      key: 'searchHistory',
      success: function (res) {
        state.historyTag = res.data;
      },
    });
  });
</script>

<style lang="scss" scoped>
  .serach-title {
    font-size: 30rpx;
    font-weight: 500;
    color: #333333;
  }

  .uni-searchbar {
    padding-left: 0;
  }

  .serach-history {
    font-weight: bold;
    color: #333333;
    font-size: 30rpx;
  }

  .clean-history {
    font-weight: 500;
    color: #999999;
    font-size: 28rpx;
  }

  .history-btn {
    padding: 0 38rpx;
    height: 60rpx;
    background: #f5f6f8;
    border-radius: 30rpx;
    font-size: 28rpx;
    color: #333333;
    max-width: 690rpx;
    margin: 0 20rpx 20rpx 0;
  }
</style>
