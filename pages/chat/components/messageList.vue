<template>
  <!--  聊天虚拟列表  -->
  <z-paging
    ref="pagingRef"
    v-model="messageList"
    use-chat-record-mode
    use-virtual-list
    cell-height-mode="dynamic"
    default-page-size="20"
    :auto-clean-list-when-reload="false"
    safe-area-inset-bottom
    bottom-bg-color="#f8f8f8"
    :back-to-top-style="backToTopStyle"
    :auto-show-back-to-top="showNewMessageTip"
    @backToTopClick="onBackToTopClick"
    @scrolltoupper="onScrollToUpper"
    @query="queryList"
  >
    <template #top>
      <!-- 撑一下顶部导航 -->
      <view :style="{ height: sys_navBar + 'px' }"></view>
    </template>
    <!-- style="transform: scaleY(-1)"必须写，否则会导致列表倒置！！！ -->
    <!-- 注意不要直接在chat-item组件标签上设置style，因为在微信小程序中是无效的，请包一层view -->
    <template #cell="{ item, index }">
      <view style="transform: scaleY(-1)">
        <!--  消息渲染  -->
        <MessageListItem
          :message="item"
          :message-index="index"
          :message-list="messageList"
        ></MessageListItem>
      </view>
    </template>
    <!-- 底部聊天输入框 -->
    <template #bottom>
      <slot name="bottom"></slot>
    </template>
    <!-- 查看最新消息 -->
    <template #backToTop>
      <text>有新消息</text>
    </template>
  </z-paging>
</template>

<script setup>
  import MessageListItem from '@/pages/chat/components/messageListItem.vue';
  import { reactive, ref } from 'vue';
  import KeFuApi from '@/sheep/api/promotion/kefu';
  import { isEmpty } from '@/sheep/helper/utils';
  import sheep from '@/sheep';
  import { formatDate } from '@/sheep/util';

  const sys_navBar = sheep.$platform.navbar;
  const messageList = ref([]); // 消息列表
  const showNewMessageTip = ref(false); // 显示有新消息提示
  const refreshMessage = ref(false); // 更新消息列表
  const backToTopStyle = reactive({
    width: '100px',
    'background-color': '#fff',
    'border-radius': '30px',
    'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }); // 返回顶部样式
  const queryParams = reactive({
    no: 1, // 查询次数，只用于触底计算
    limit: 20,
    createTime: undefined,
  });
  const pagingRef = ref(null); // 虚拟列表
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
      pagingRef.value.completeByNoMore([], true);
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
      pagingRef.value.updateCache(); // 更新缓存
      refreshMessage.value = false; // 更新好后重置状态
      return;
    }
    if (data.slice(-1).length > 0) {
      // 设置最后一次历史查询的最后一条消息的 createTime
      queryParams.createTime = formatDate(data.slice(-1)[0].createTime);
    }
    pagingRef.value.completeByNoMore(data, false);
  };
  /** 刷新消息列表 */
  const refreshMessageList = async (message = undefined) => {
    if (typeof message !== 'undefined') {
      // 追加数据
      pagingRef.value.addChatRecordData([message], false);
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
    pagingRef.value.scrollToBottom();
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
</script>
