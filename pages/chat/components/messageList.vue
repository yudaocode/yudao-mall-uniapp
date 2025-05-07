<template>
  <!--  聊天列表使用scroll-view原生组件  -->
  <scroll-view
    ref="scrollRef"
    class="chat-scroll-view"
    scroll-y
    :scroll-top="scrollTop"
    :refresher-enabled="true"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrollToLower"
    @refresherrefresh="onRefresh"
    @scroll="onScroll"
  >
    <!-- 撑一下顶部导航 -->
    <view :style="{ height: sys_navBar + 'px' }"></view>

    <!-- 消息列表 -->
    <view class="message-list" :style="{ transform: 'scaleY(-1)' }">
      <view v-for="(item, index) in messageList" :key="item.id" style="transform: scaleY(-1)">
        <!--  消息渲染  -->
        <MessageListItem
          :message="item"
          :message-index="index"
          :message-list="messageList"
        ></MessageListItem>
      </view>

      <!-- 加载更多提示 -->
      <view v-if="loadingMore" class="loading-more">加载更多...</view>
    </view>

    <!-- 底部聊天输入框 -->
    <su-fixed bottom>
      <slot name="bottom"></slot>
    </su-fixed>
    <!-- 查看最新消息提示 -->
    <view v-if="showNewMessageTip" class="new-message-tip" @click="scrollToBottom">
      <text>有新消息</text>
    </view>
  </scroll-view>
</template>

<script setup>
  import MessageListItem from '@/pages/chat/components/messageListItem.vue';
  import { reactive, ref, nextTick, watch } from 'vue';
  import KeFuApi from '@/sheep/api/promotion/kefu';
  import { isEmpty } from '@/sheep/helper/utils';
  import sheep from '@/sheep';
  import { formatDate } from '@/sheep/util';

  const sys_navBar = sheep.$platform.navbar;
  const scrollRef = ref(null); // 添加对scroll-view的引用
  const messageList = ref([]); // 消息列表
  const showNewMessageTip = ref(false); // 显示有新消息提示
  const isRefreshing = ref(false); // 是否正在刷新
  const isTriggered = ref(false); // 下拉刷新状态
  const loadingMore = ref(false); // 是否正在加载更多
  const scrollTop = ref(0); // 滚动位置
  const lastScrollTop = ref(0); // 上次滚动位置
  const hasReachedBottom = ref(true); // 是否滚动到底部
  const forceUpdate = ref(0); // 强制更新计数器

  const queryParams = reactive({
    no: 1, // 查询次数，只用于触底计算
    limit: 20,
    createTime: undefined,
  });

  // 监听消息列表变化，自动滚动到底部
  watch(messageList, (newVal, oldVal) => {
    // 如果是添加了新消息 且 (在底部 或 列表初始加载)
    if (newVal.length > oldVal.length && (hasReachedBottom.value || oldVal.length === 0)) {
      nextTick(() => {
        scrollToBottom(true);
      });
    }
  });

  // 获取消息分页列表
  const getMessageList = async (isRefresh = false) => {
    if (isRefresh) {
      queryParams.createTime = undefined;
      queryParams.no = 1;
    }

    loadingMore.value = true;
    try {
      const { data } = await KeFuApi.getKefuMessageList(queryParams);
      if (isEmpty(data)) {
        loadingMore.value = false;
        return;
      }

      if (isRefresh) {
        messageList.value = data;
      } else {
        messageList.value = [...messageList.value, ...data];
      }

      if (data.slice(-1).length > 0) {
        // 设置最后一次历史查询的最后一条消息的 createTime
        queryParams.createTime = formatDate(data.slice(-1)[0].createTime);
      }

      // 刷新完成后滚动到底部
      if (isRefresh) {
        setTimeout(() => {
          scrollToBottom(true);
        }, 300);
      }
    } catch (error) {
      console.error('获取消息列表失败:', error);
    } finally {
      loadingMore.value = false;
      isTriggered.value = false;
    }
  };

  // 下拉刷新
  const onRefresh = async () => {
    isTriggered.value = true;
    isRefreshing.value = true;
    await getMessageList(true);
    isRefreshing.value = false;
    setTimeout(() => {
      isTriggered.value = false;
    }, 500);
  };

  // 上拉加载更多
  const onScrollToLower = async () => {
    if (loadingMore.value) return;
    queryParams.no++;
    await getMessageList();
  };

  // 监听滚动事件
  const onScroll = (e) => {
    lastScrollTop.value = e.detail.scrollTop;

    // 判断是否滚动到底部 - 修正计算方法
    const scrollHeight = e.detail.scrollHeight;
    const scrollTop = e.detail.scrollTop;
    const clientHeight = e.detail.scrollHeight - scrollHeight; // 近似计算可见区域高度

    // 如果滚动位置到顶部（反转后是底部）的距离很小，则认为已到底部
    hasReachedBottom.value = scrollTop <= 10;

    // 如果不在底部且有未读消息，显示新消息提示
    if (!hasReachedBottom.value) {
      showNewMessageTip.value = true;
    } else {
      showNewMessageTip.value = false;
    }
  };

  // 滚动到底部
  const scrollToBottom = (force = false) => {
    // 因为列表是倒置的，所以滚动到顶部就是滚动到最新消息
    if (force) {
      // 在某些情况下，直接设置scrollTop可能不会触发更新
      // 使用一个计数器强制视图更新
      forceUpdate.value++;
      setTimeout(() => {
        scrollTop.value = 0;
      }, 50);
    } else {
      scrollTop.value = 0;
    }

    showNewMessageTip.value = false;
    hasReachedBottom.value = true;
  };

  // 刷新消息列表 - 优化处理新消息
  const refreshMessageList = async (message = undefined) => {
    if (typeof message !== 'undefined') {
      // 追加新消息
      messageList.value = [message, ...messageList.value];

      // 如果当前在底部，滚动到新消息
      if (hasReachedBottom.value) {
        // 等待DOM更新后滚动
        nextTick(() => {
          scrollToBottom(true);
        });
      } else {
        showNewMessageTip.value = true;
      }
    } else {
      // 全量刷新
      await getMessageList(true);
    }
  };

  // 初始化加载数据
  getMessageList(true);

  // 暴露方法给父组件
  defineExpose({
    getMessageList,
    refreshMessageList
  });
</script>

<style>
  .chat-scroll-view {
    height: calc(100vh - 100px); /* 减去底部输入框的高度 */
    width: 100%;
    position: relative;
    background-color: #f8f8f8;
  }

  .message-list {
    transform: scaleY(-1); /* 聊天列表倒置，让最新消息在底部 */
    width: 100%;
    padding-bottom: 20rpx;
  }

  .loading-more {
    text-align: center;
    color: #999;
    font-size: 24rpx;
    padding: 20rpx 0;
  }

  .new-message-tip {
    position: fixed;
    bottom: 140rpx;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 10rpx 30rpx;
    border-radius: 30rpx;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 100;
    font-size: 24rpx;
    color: #333;
  }
</style>
