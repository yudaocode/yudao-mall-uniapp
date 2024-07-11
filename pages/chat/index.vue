<template>
  <s-layout class="chat-wrap" title="客服" navbar="inner">
    <!-- 头部连接状态展示  -->
    <div class="status">
<!--      {{ socketState.isConnect ? "连接客服成功" : '网络已断开，请检查网络后刷新重试' }}-->
    </div>
    <!--  覆盖头部导航栏背景颜色  -->
    <div class="page-bg" :style="{ height: sys_navBar + 'px' }"></div>
    <!--  聊天区域  -->
    <ChatBox ref="chatBoxRef"></ChatBox>
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
  import ChatBox from './components/chatBox.vue';
  import { nextTick, reactive, ref } from 'vue';
  import sheep from '@/sheep';
  import ToolsPopup from '@/pages/chat/components/toolsPopup.vue';
  import MessageInput from '@/pages/chat/components/messageInput.vue';
  import { onLoad } from '@dcloudio/uni-app';
  import SelectPopup from '@/pages/chat/components/select-popup.vue';
  import { KeFuMessageContentTypeEnum } from '@/pages/chat/components/constants';
  import FileApi from '@/sheep/api/infra/file';
  import KeFuApi from '@/sheep/api/promotion/kefu';
  import { useWebSocket } from '@/sheep/hooks/useWebSocket';

  const sys_navBar = sheep.$platform.navbar;

  const chat = reactive({
    msg: '',
    scrollInto: '',
    showTools: false,
    toolsMode: '',
    showSelect: false,
    selectMode: '',
  });

  // 发送消息
  async function onSendMessage() {
    if (!chat.msg) return;
    try {
      const data = {
        contentType: KeFuMessageContentTypeEnum.TEXT,
        content: chat.msg,
      };
      await KeFuApi.sendKefuMessage(data);
      await getMessageList()
      chat.msg = '';
    } finally {
      chat.showTools = false;
    }
  }

  const chatBoxRef = ref()
  const getMessageList = async () => {
    await chatBoxRef.value.getMessageList(1)
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
    // TODO puhui999: socket 连接不稳定先注释掉
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
    let msg;
    switch (type) {
      case 'image':
        const res = await FileApi.uploadFile(data.tempFiles[0].path);
        msg = {
          contentType: KeFuMessageContentTypeEnum.IMAGE,
          content: res.data,
        };
        break;
      case 'goods':
        msg = {
          contentType: KeFuMessageContentTypeEnum.PRODUCT,
          content: JSON.stringify(data)
        };
        break;
      case 'order':
        msg = {
          contentType: KeFuMessageContentTypeEnum.ORDER,
          content: JSON.stringify(data),
        };
        break;
    }
    if (msg) {
      // 发送消息
      // scrollBottom();
      await KeFuApi.sendKefuMessage(msg);
      await getMessageList()
      chat.showTools = false;
      chat.showSelect = false;
      chat.selectMode = '';
    }
  }

  //======================= 聊天工具相关 end =======================
  useWebSocket({
    // 连接成功
    onConnected:()=>{

    },
    // 连接关闭
    onClosed:()=>{

    },
    // 收到消息
    onMessage:(data)=>{
      console.log(data);
    }
  });
  onLoad(async () => {
    await nextTick()
    // 加载历史消息
    await getMessageList()
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
