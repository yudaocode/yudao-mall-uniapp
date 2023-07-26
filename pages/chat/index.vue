<template>
  <s-layout class="chat-wrap" title="客服" navbar="inner">
    <div class="status">
      {{ socketState.isConnect ? customerServiceInfo.title : '网络已断开，请检查网络后刷新重试' }}
    </div>
    <div class="page-bg" :style="{ height: sys_navBar + 'px' }"></div>
    <view class="chat-box" :style="{ height: pageHeight + 'px' }">
      <scroll-view
        :style="{ height: pageHeight + 'px' }"
        scroll-y="true"
        :scroll-with-animation="false"
        :enable-back-to-top="true"
        :scroll-into-view="chat.scrollInto"
      >
        <button
          class="loadmore-btn ss-reset-button"
          v-if="
            chatList.length &&
            chatHistoryPagination.lastPage > 1 &&
            loadingMap[chatHistoryPagination.loadStatus].title
          "
          @click="onLoadMore"
        >
          {{ loadingMap[chatHistoryPagination.loadStatus].title }}
          <i
            class="loadmore-icon sa-m-l-6"
            :class="loadingMap[chatHistoryPagination.loadStatus].icon"
          ></i>
        </button>
        <view class="message-item ss-flex-col" v-for="(item, index) in chatList" :key="index">
          <view class="ss-flex ss-row-center ss-col-center">
            <!-- 日期 -->
            <view v-if="item.from !== 'system' && showTime(item, index)" class="date-message">
              {{ formatTime(item.date) }}
            </view>
            <!-- 系统消息 -->
            <view v-if="item.from === 'system'" class="system-message">
              {{ item.content.text }}
            </view>
          </view>
          <!-- 常见问题 -->
          <view v-if="item.mode === 'template' && item.content.list.length" class="template-wrap">
            <view class="title">猜你想问</view>
            <view
              class="item"
              v-for="(item, index) in item.content.list"
              :key="index"
              @click="onTemplateList(item)"
            >
              * {{ item.title }}
            </view>
          </view>

          <view
            v-if="
              (item.from === 'customer_service' && item.mode !== 'template') ||
              item.from === 'customer'
            "
            class="ss-flex ss-col-top"
            :class="[
              item.from === 'customer_service'
                ? `ss-row-left`
                : item.from === 'customer'
                ? `ss-row-right`
                : '',
            ]"
          >
            <!-- 客服头像 -->
            <image
              v-show="item.from === 'customer_service'"
              class="chat-avatar ss-m-r-24"
              :src="
                sheep.$url.cdn(item?.sender?.avatar) ||
                sheep.$url.static('/static/img/shop/chat/default.png')
              "
              mode="aspectFill"
            ></image>

            <!-- 发送状态 -->
            <span
              v-if="
                item.from === 'customer' &&
                index == chatData.chatList.length - 1 &&
                chatData.isSendSucces !== 0
              "
              class="send-status"
            >
              <image
                v-if="chatData.isSendSucces == -1"
                class="loading"
                :src="sheep.$url.static('/static/img/shop/chat/loading.png')"
                mode="aspectFill"
              ></image>
              <!-- <image
                v-if="chatData.isSendSucces == 1"
                class="warning"
                :src="sheep.$url.static('/static/img/shop/chat/warning.png')"
                mode="aspectFill"
                @click="onAgainSendMessage(item)"
              ></image> -->
            </span>

            <!-- 内容 -->
            <template v-if="item.mode === 'text'">
              <view class="message-box" :class="[item.from]">
                <div
                  class="message-text ss-flex ss-flex-wrap"
                  @click="onRichtext"
                  v-html="replaceEmoji(item.content.text)"
                ></div>
              </view>
            </template>
            <template v-if="item.mode === 'image'">
              <view class="message-box" :class="[item.from]" :style="{ width: '200rpx' }">
                <su-image
                  class="message-img"
                  isPreview
                  :previewList="[sheep.$url.cdn(item.content.url)]"
                  :current="0"
                  :src="sheep.$url.cdn(item.content.url)"
                  :height="200"
                  :width="200"
                  mode="aspectFill"
                ></su-image>
              </view>
            </template>
            <template v-if="item.mode === 'goods'">
              <GoodsItem
                :goodsData="item.content.item"
                @tap="
                  sheep.$router.go('/pages/goods/index', {
                    id: item.content.item.id,
                  })
                "
              />
            </template>
            <template v-if="item.mode === 'order'">
              <OrderItem
                from="msg"
                :orderData="item.content.item"
                @tap="
                  sheep.$router.go('/pages/order/detail', {
                    id: item.content.item.id,
                  })
                "
              />
            </template>
            <!-- user头像 -->
            <image
              v-show="item.from === 'customer'"
              class="chat-avatar ss-m-l-24"
              :src="sheep.$url.cdn(customerUserInfo.avatar)"
              mode="aspectFill"
            >
            </image>
          </view>
        </view>
        <view id="scrollBottom"></view>
      </scroll-view>
    </view>
    <su-fixed bottom>
      <view class="send-wrap ss-flex">
        <view class="left ss-flex ss-flex-1">
          <uni-easyinput
            class="ss-flex-1 ss-p-l-22"
            :inputBorder="false"
            :clearable="false"
            v-model="chat.msg"
            placeholder="请输入你要咨询的问题"
          ></uni-easyinput>
        </view>
        <text class="sicon-basic bq" @tap.stop="onTools('emoji')"></text>
        <text
          v-if="!chat.msg"
          class="sicon-edit"
          :class="{ 'is-active': chat.toolsMode == 'tools' }"
          @tap.stop="onTools('tools')"
        ></text>
        <button v-if="chat.msg" class="ss-reset-button send-btn" @tap="onSendMessage">
          发送
        </button>
      </view>
    </su-fixed>
    <su-popup
      :show="chat.showTools"
      @close="
        chat.showTools = false;
        chat.toolsMode = '';
      "
    >
      <view class="ss-modal-box ss-flex-col">
        <view class="send-wrap ss-flex">
          <view class="left ss-flex ss-flex-1">
            <uni-easyinput
              class="ss-flex-1 ss-p-l-22"
              :inputBorder="false"
              :clearable="false"
              v-model="chat.msg"
              placeholder="请输入你要咨询的问题"
            ></uni-easyinput>
          </view>
          <text class="sicon-basic bq" @tap.stop="onTools('emoji')"></text>
          <text></text>
          <text
            v-if="!chat.msg"
            class="sicon-edit"
            :class="{ 'is-active': chat.toolsMode == 'tools' }"
            @tap.stop="onTools('tools')"
          ></text>
          <button v-if="chat.msg" class="ss-reset-button send-btn" @tap="onSendMessage">
            发送
          </button>
        </view>
        <view class="content ss-flex ss-flex-1">
          <template v-if="chat.toolsMode == 'emoji'">
            <swiper
              class="emoji-swiper"
              :indicator-dots="true"
              circular
              indicator-active-color="#7063D2"
              indicator-color="rgba(235, 231, 255, 1)"
              :autoplay="false"
              :interval="3000"
              :duration="1000"
            >
              <swiper-item v-for="emoji in emojiPage" :key="emoji">
                <view class="ss-flex ss-flex-wrap">
                  <template v-for="item in emoji" :key="item">
                    <image
                      class="emoji-img"
                      :src="sheep.$url.cdn(`/static/img/chat/emoji/${item.file}`)"
                      @tap="onEmoji(item)"
                    >
                    </image>
                  </template>
                </view>
              </swiper-item>
            </swiper>
          </template>
          <template v-else>
            <view class="image">
              <s-uploader
                file-mediatype="image"
                :imageStyles="{ width: 50, height: 50, border: false }"
                @select="onSelect({ type: 'image', data: $event })"
              >
                <image
                  class="icon"
                  :src="sheep.$url.static('/static/img/shop/chat/image.png')"
                  mode="aspectFill"
                ></image>
              </s-uploader>
              <view>图片</view>
            </view>
            <view class="goods" @tap="onShowSelect('goods')">
              <image
                class="icon"
                :src="sheep.$url.static('/static/img/shop/chat/goods.png')"
                mode="aspectFill"
              ></image>
              <view>商品</view>
            </view>
            <view class="order" @tap="onShowSelect('order')">
              <image
                class="icon"
                :src="sheep.$url.static('/static/img/shop/chat/order.png')"
                mode="aspectFill"
              ></image>
              <view>订单</view>
            </view>
          </template>
        </view>
      </view>
    </su-popup>

    <SelectPopup
      :mode="chat.selectMode"
      :show="chat.showSelect"
      @select="onSelect"
      @close="chat.showSelect = false"
    />
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { computed, reactive, toRefs } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  import { emojiList, emojiPage } from './emoji.js';
  import SelectPopup from './components/select-popup.vue';
  import GoodsItem from './components/goods.vue';
  import OrderItem from './components/order.vue';
  import { useChatWebSocket } from './socket';

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

  const sys_navBar = sheep.$platform.navbar;
  const chatConfig = computed(() => sheep.$store('app').chat);

  const { screenHeight, safeAreaInsets, safeArea, screenWidth } = sheep.$platform.device;
  const pageHeight = safeArea.height - 44 - 35 - 50;

  const chatStatus = {
    online: {
      text: '在线',
      colorVariate: '#46c55f',
    },
    offline: {
      text: '离线',
      colorVariate: '#b5b5b5',
    },
    busy: {
      text: '忙碌',
      colorVariate: '#ff0e1b',
    },
  };

  // 加载更多
  const loadingMap = {
    loadmore: {
      title: '查看更多',
      icon: 'el-icon-d-arrow-left',
    },
    nomore: {
      title: '没有更多了',
      icon: '',
    },
    loading: {
      title: '加载中... ',
      icon: 'el-icon-loading',
    },
  };
  const onLoadMore = () => {
    chatHistoryPagination.value.page < chatHistoryPagination.value.lastPage && socketHistoryList();
  };

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

  // 点击工具栏开关
  function onTools(mode) {
    if (!socketState.value.isConnect) {
      sheep.$helper.toast(socketState.value.tip || '您已掉线！请返回重试');
      return;
    }

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

  function onAgainSendMessage(item) {
    if (!socketState.value.isConnect) {
      sheep.$helper.toast(socketState.value.tip || '您已掉线！请返回重试');
      return;
    }
    if (!item) return;
    const data = {
      from: 'customer',
      mode: 'text',
      date: new Date().getTime(),
      content: item.content,
    };
    socketSendMsg(data, () => {
      scrollBottom();
    });
  }

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

  // 点击猜你想问
  function onTemplateList(e) {
    if (!socketState.value.isConnect) {
      sheep.$helper.toast(socketState.value.tip || '您已掉线！请返回重试');
      return;
    }
    const data = {
      from: 'customer',
      mode: 'text',
      date: new Date().getTime(),
      content: {
        text: e.title,
      },
      customData: {
        question_id: e.id,
      },
    };
    socketSendMsg(data, () => {
      scrollBottom();
    });
    // scrollBottom();
  }

  function onEmoji(item) {
    chat.msg += item.name;
  }

  function selEmojiFile(name) {
    for (let index in emojiList) {
      if (emojiList[index].name === name) {
        return emojiList[index].file;
      }
    }
    return false;
  }

  function replaceEmoji(data) {
    let newData = data;
    if (typeof newData !== 'object') {
      let reg = /\[(.+?)\]/g; // [] 中括号
      let zhEmojiName = newData.match(reg);
      if (zhEmojiName) {
        zhEmojiName.forEach((item) => {
          let emojiFile = selEmojiFile(item);
          newData = newData.replace(
            item,
            `<img class="chat-img" style="width: 24px;height: 24px;margin: 0 3px;" src="${sheep.$url.cdn(
              '/static/img/chat/emoji/' + emojiFile,
            )}"/>`,
          );
        });
      }
    }
    return newData;
  }

  function scrollBottom() {
    let timeout = null;
    chat.scrollInto = '';
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      chat.scrollInto = 'scrollBottom';
    }, 100);
  }

  onLoad(async () => {
    const { error } = await getUserToken();
    if (error === 0) {
      socketInit(chatConfig.value, () => {
        scrollBottom();
      });
    } else {
      socketState.value.isConnect = false;
    }
  });
</script>

<style lang="scss" scoped>
  .page-bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    background-size: 750rpx 100%;
    z-index: 1;
  }

  .chat-wrap {
    // :deep() {
    //   .ui-navbar-box {
    //     background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    //   }
    // }

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

    .chat-box {
      padding: 0 20rpx 0;

      .loadmore-btn {
        width: 98%;
        height: 40px;
        font-size: 12px;
        color: #8c8c8c;

        .loadmore-icon {
          transform: rotate(90deg);
        }
      }

      .message-item {
        margin-bottom: 33rpx;
      }

      .date-message,
      .system-message {
        width: fit-content;
        border-radius: 12rpx;
        padding: 8rpx 16rpx;
        margin-bottom: 16rpx;
        background-color: var(--ui-BG-3);
        color: #999;
        font-size: 24rpx;
      }

      .chat-avatar {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
      }

      .send-status {
        color: #333;
        height: 80rpx;
        margin-right: 8rpx;
        display: flex;
        align-items: center;

        .loading {
          width: 32rpx;
          height: 32rpx;
          -webkit-animation: rotating 2s linear infinite;
          animation: rotating 2s linear infinite;

          @-webkit-keyframes rotating {
            0% {
              transform: rotateZ(0);
            }

            100% {
              transform: rotateZ(360deg);
            }
          }

          @keyframes rotating {
            0% {
              transform: rotateZ(0);
            }

            100% {
              transform: rotateZ(360deg);
            }
          }
        }

        .warning {
          width: 32rpx;
          height: 32rpx;
          color: #ff3000;
        }
      }

      .message-box {
        max-width: 50%;
        font-size: 16px;
        line-height: 20px;
        // max-width: 500rpx;
        white-space: normal;
        word-break: break-all;
        word-wrap: break-word;
        padding: 20rpx;
        border-radius: 10rpx;
        color: #fff;
        background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));

        &.customer_service {
          background: #fff;
          color: #333;
        }

        :deep() {
          .imgred {
            width: 100%;
          }

          .imgred,
          img {
            width: 100%;
          }
        }
      }

      :deep() {
        .goods,
        .order {
          max-width: 500rpx;
        }
      }

      .message-img {
        width: 100px;
        height: 100px;
        border-radius: 6rpx;
      }

      .template-wrap {
        // width: 100%;
        padding: 20rpx 24rpx;
        background: #fff;
        border-radius: 10rpx;

        .title {
          font-size: 26rpx;
          font-weight: 500;
          color: #333;
          margin-bottom: 29rpx;
        }

        .item {
          font-size: 24rpx;
          color: var(--ui-BG-Main);
          margin-bottom: 16rpx;

          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }

      .error-img {
        width: 400rpx;
        height: 400rpx;
      }

      #scrollBottom {
        height: 120rpx;
      }
    }

    .send-wrap {
      padding: 18rpx 20rpx;
      background: #fff;

      .left {
        height: 64rpx;
        border-radius: 32rpx;
        background: var(--ui-BG-1);
      }

      .bq {
        font-size: 50rpx;
        margin-left: 10rpx;
      }

      .sicon-edit {
        font-size: 50rpx;
        margin-left: 10rpx;
        transform: rotate(0deg);
        transition: all linear 0.2s;

        &.is-active {
          transform: rotate(45deg);
        }
      }

      .send-btn {
        width: 100rpx;
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 30rpx;
        background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
        font-size: 26rpx;
        color: #fff;
        margin-left: 11rpx;
      }
    }
  }

  .content {
    width: 100%;
    align-content: space-around;
    border-top: 1px solid #dfdfdf;
    padding: 20rpx 0 0;

    .emoji-swiper {
      width: 100%;
      height: 280rpx;
      padding: 0 20rpx;

      .emoji-img {
        width: 50rpx;
        height: 50rpx;
        display: inline-block;
        margin: 10rpx;
      }
    }

    .image,
    .goods,
    .order {
      width: 33.3%;
      height: 280rpx;
      text-align: center;
      font-size: 24rpx;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon {
        width: 50rpx;
        height: 50rpx;
        margin-bottom: 21rpx;
      }
    }

    :deep() {
      .uni-file-picker__container {
        justify-content: center;
      }

      .file-picker__box {
        display: none;

        &:last-of-type {
          display: flex;
        }
      }
    }
  }
</style>
<style>
  .chat-img {
    width: 24px;
    height: 24px;
    margin: 0 3px;
  }
  .full-img {
    object-fit: cover;
    width: 100px;
    height: 100px;
    border-radius: 6px;
  }
</style>
