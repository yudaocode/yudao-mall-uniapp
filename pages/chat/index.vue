<template>
  <s-layout class="chat-wrap" title="客服" navbar="inner">
    <!-- 头部连接状态展示  -->
    <div class="status">
      {{ socketState.isConnect ? customerServiceInfo.title : '网络已断开，请检查网络后刷新重试' }}
    </div>
    <!--  覆盖头部导航栏背景颜色  -->
    <div class="page-bg" :style="{ height: sys_navBar + 'px' }"></div>
    <!--  聊天区域  -->
    <ChatBox></ChatBox>
    <!--  消息发送区域  -->
    <su-fixed bottom>
      <message-input v-model="chat.msg" @on-tools="onTools" @send-message="onSendMessage"></message-input>
    </su-fixed>
    <!--  聊天工具  -->
    <tools-popup :show-tools="chat.showTools" :tools-mode="chat.toolsMode" @close="handleToolsClose"
                 @on-emoji="onEmoji" @image-select="onSelect" @on-show-select="onShowSelect">
      <message-input v-model="chat.msg" @on-tools="onTools" @send-message="onSendMessage"></message-input>
    </tools-popup>
    <!--  商品订单选择  -->
    <SelectPopup
      :mode="chat.selectMode"
      :show="chat.showSelect"
      @select="onSelect"
      @close="chat.showSelect = false"
    />
  </s-layout>
</template>

<script setup>
  import { useChatWebSocket } from '@/pages/chat/socket';
  import ChatBox from './components/chatBox.vue';
  import { reactive, toRefs } from 'vue';
  import sheep from '@/sheep';
  import ToolsPopup from '@/pages/chat/components/toolsPopup.vue';
  import MessageInput from '@/pages/chat/components/messageInput.vue';
  import { onLoad } from '@dcloudio/uni-app';
  import SelectPopup from '@/pages/chat/components/select-popup.vue';

  const sys_navBar = sheep.$platform.navbar;
  const {
    socketInit,
    state: chatData,
    socketSendMsg,
    formatChatInput,
    socketHistoryList,
    onDrop,
    onPaste,
    getFocus,
    // upload,
    getUserToken,
    // socketTest,
    showTime,
    formatTime,
  } = useChatWebSocket();
  const chatList = toRefs(chatData).chatList;
  const customerServiceInfo = toRefs(chatData).customerServerInfo;
  const chatHistoryPagination = toRefs(chatData).chatHistoryPagination;
  const customerUserInfo = toRefs(chatData).customerUserInfo;
  const socketState = toRefs(chatData).socketState;

  const chat = reactive({
    msg: '',
    scrollInto: '',

    showTools: false,
    toolsMode: '',

    showSelect: false,
    selectMode: '',
    chatStyle: {
      mode: 'inner',
      color: '#F8270F',
      type: 'color',
      alwaysShow: 1,
      src: '',
      list: {},
    },
  });

  function scrollBottom() {
    let timeout = null;
    chat.scrollInto = '';
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      chat.scrollInto = 'scrollBottom';
    }, 100);
  }

  // 发送消息
  function onSendMessage() {
    if (!socketState.value.isConnect) {
      sheep.$helper.toast(socketState.value.tip || '您已掉线！请返回重试');
      return;
    }
    if (!chat.msg) return;
    const data = {
      from: 'customer',
      mode: 'text',
      date: new Date().getTime(),
      content: {
        text: chat.msg,
      },
    };
    socketSendMsg(data, () => {
      scrollBottom();
    });
    chat.showTools = false;
    // scrollBottom();
    setTimeout(() => {
      chat.msg = '';
    }, 100);
  }

  //======================= 聊天工具相关 start =======================

  function handleToolsClose() {
    chat.showTools = false;
    chat.toolsMode = '';
  }

  function onEmoji(item) {
    chat.msg += item.name;
  }

  // 点击工具栏开关
  function onTools(mode) {
    // if (!socketState.value.isConnect) {
    //   sheep.$helper.toast(socketState.value.tip || '您已掉线！请返回重试');
    //   return;
    // }

    if (!chat.toolsMode || chat.toolsMode === mode) {
      chat.showTools = !chat.showTools;
    }
    chat.toolsMode = mode;
    if (!chat.showTools) {
      chat.toolsMode = '';
    }
  }

  function onShowSelect(mode) {
    chat.showTools = false;
    chat.showSelect = true;
    chat.selectMode = mode;
  }

  async function onSelect({ type, data }) {
    let msg = '';
    switch (type) {
      case 'image':
        const { path, fullurl } = await sheep.$api.app.upload(data.tempFiles[0].path, 'default');
        msg = {
          from: 'customer',
          mode: 'image',
          date: new Date().getTime(),
          content: {
            url: fullurl,
            path: path,
          },
        };
        break;
      case 'goods':
        msg = {
          from: 'customer',
          mode: 'goods',
          date: new Date().getTime(),
          content: {
            item: {
              id: data.goods.id,
              title: data.goods.title,
              image: data.goods.image,
              price: data.goods.price,
              stock: data.goods.stock,
            },
          },
        };
        break;
      case 'order':
        msg = {
          from: 'customer',
          mode: 'order',
          date: new Date().getTime(),
          content: {
            item: {
              id: data.id,
              order_sn: data.order_sn,
              create_time: data.create_time,
              pay_fee: data.pay_fee,
              items: data.items.filter((item) => ({
                goods_id: item.goods_id,
                goods_title: item.goods_title,
                goods_image: item.goods_image,
                goods_price: item.goods_price,
              })),
              status_text: data.status_text,
            },
          },
        };
        break;
    }
    if (msg) {
      socketSendMsg(msg, () => {
        scrollBottom();
      });
      // scrollBottom();
      chat.showTools = false;
      chat.showSelect = false;
      chat.selectMode = '';
    }
  }

  //======================= 聊天工具相关 end =======================

  onLoad(async () => {
    socketInit({}, () => {
      scrollBottom();
    });
  });
</script>

<style scoped lang="scss">
  .chat-wrap {

    .page-bg {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
      background-size: 750rpx 100%;
      z-index: 1;
    }

    .status {
      position: relative;
      box-sizing: border-box;
      z-index: 3;
      height: 70rpx;
      padding: 0 30rpx;
      background: var(--ui-BG-Main-opacity-1);
      display: flex;
      align-items: center;
      font-size: 30rpx;
      font-weight: 400;
      color: var(--ui-BG-Main);
    }
  }
</style>
