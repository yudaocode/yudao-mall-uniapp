<template>
  <!--  聊天列表使用scroll-view原生组件，整体倒置  -->
  <scroll-view ref="scrollRef" class="chat-scroll-view" scroll-y :refresher-enabled="false"
               @scroll="onScroll" style="transform: scaleY(-1);">
    <!-- 消息列表容器 -->
    <view class="message-container">
      <!-- 消息列表 -->
      <view class="message-list">
        <view v-for="(item, index) in messageList" :key="item.id" class="message-item"
              style="transform: scaleY(-1);">
          <!--  消息渲染  -->
          <MessageListItem :message="item" :message-index="index"
                           :message-list="messageList"></MessageListItem>
        </view>
      </view>
    </view>
  </scroll-view>

  <!-- 底部聊天输入框 -->
  <su-fixed bottom>
    <view v-if="showNewMessageTip" :style="backToTopStyle">
      <text>有新消息</text>
    </view>
    <slot name="bottom"></slot>
  </su-fixed>
</template>

<script setup>
  import MessageListItem from '@/pages/chat/components/messageListItem.vue';
  import { onMounted, reactive, ref } from 'vue';
  import KeFuApi from '@/sheep/api/promotion/kefu';
  import { isEmpty } from '@/sheep/helper/utils';
  import { formatDate } from '@/sheep/util';

  const messageList = ref([]); // 消息列表
  const showNewMessageTip = ref(false); // 显示有新消息提示
  const refreshMessage = ref(false); // 更新消息列表
  const queryParams = reactive({
    no: 1, // 查询次数，只用于触底计算
    limit: 20,
    createTime: undefined,
  });
  const backToTopStyle = reactive({
    height: '30px',
    width: '100px',
    'background-color': '#fff',
    'border-radius': '30px',
    'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }); // 返回顶部样式
  // const pagingRef = ref(null); // 虚拟列表
  const queryList = async (no, limit) => {
    // 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
    queryParams.no = no;
    queryParams.limit = limit;
    await getMessageList();
  };

  // 获得消息分页列表
  const getMessageList = async () => {
    const { data } = await KeFuApi.getKefuMessageList(queryParams);
    if (isEmpty(data)) {
      // pagingRef.value.completeByNoMore([], true);
      return;
    }
    if (queryParams.no > 1 && refreshMessage.value) {
      const newMessageList = [];
      for (const message of data) {
        if (messageList.value.some((val) => val.id === message.id)) {
          continue;
        }
        newMessageList.push(message);
      }
      // 新消息追加到开头
      messageList.value = [...newMessageList, ...messageList.value];
      // pagingRef.value.updateCache(); // 更新缓存
      refreshMessage.value = false; // 更新好后重置状态
      return;
    }
    if (data.slice(-1).length > 0) {
      // 设置最后一次历史查询的最后一条消息的 createTime
      queryParams.createTime = formatDate(data.slice(-1)[0].createTime);
    }
    messageList.value = data;
    // pagingRef.value.completeByNoMore(data, false);
  };

  /** 刷新消息列表 */
  const refreshMessageList = async (message = undefined) => {
    if (typeof message !== 'undefined') {
      // 追加数据
      messageList.value.map(message);
      // pagingRef.value.addChatRecordData([message], false);
    } else {
      queryParams.createTime = undefined;
      refreshMessage.value = true;
      await getMessageList();
    }

    // 若已是第一页则不做处理
    if (queryParams.no > 1) {
      showNewMessageTip.value = true;
    } else {
      onScrollToUpper();
    }
  };

  /** 滚动到最新消息 */
  const onBackToTopClick = (event) => {
    event(false); // 禁用默认操作
    // pagingRef.value.scrollToBottom();
  };

  /** 监听滚动到底部事件（因为 scroll 翻转了顶就是底） */
  const onScrollToUpper = () => {
    // 若已是第一页则不做处理
    if (queryParams.no === 1) {
      return;
    }
    showNewMessageTip.value = false;
  };
  defineExpose({ getMessageList, refreshMessageList });

  /** 监听消息列表滚动 */
  const onScroll = (e) => {
    const { scrollTop } = e.detail;
    console.log('scrollTop', scrollTop);
  };

  onMounted(() => {
    getMessageList();
  });
</script>

<style>
  .chat-scroll-view {
    height: calc(100vh - 100px);
    /* 减去底部输入框的高度 */
    width: 100%;
    position: relative;
    background-color: #f8f8f8;
    z-index: 1;
    /* 确保层级正确 */
  }

  .message-container {
    width: 100%;
    min-height: 100vh;
    /* 确保容器至少有一屏高度 */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* 默认内容放到底部 */
  }

  .message-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    /* 底部留出一些空间 */
  }

  .message-item {
    margin-bottom: 10px;
  }
</style>
