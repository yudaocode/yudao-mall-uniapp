<template>
  <view class="chat-box" :style="{ height: pageHeight + 'px' }">
    <!--  竖向滚动区域需要设置固定 height  -->
    <scroll-view
      :style="{ height: pageHeight + 'px' }"
      scroll-y="true"
      :scroll-with-animation="false"
      :enable-back-to-top="true"
      :scroll-into-view="state.scrollInto"
    >
      <!--  消息渲染  -->
      <view class="message-item ss-flex-col" v-for="(item, index) in chatList" :key="index">
        <view class="ss-flex ss-row-center ss-col-center">
          <!-- 日期 -->
          <view v-if="item.contentType !== KeFuMessageContentTypeEnum.SYSTEM && showTime(item, index)"
                class="date-message">
            {{ formatDate(item.date) }}
          </view>
          <!-- 系统消息 -->
          <view v-if="item.contentType === KeFuMessageContentTypeEnum.SYSTEM" class="system-message">
            {{ item.content }}
          </view>
        </view>
        <!-- 消息体渲染管理员消息和用户消息并左右展示  -->
        <view
          v-if="item.contentType !== KeFuMessageContentTypeEnum.SYSTEM"
          class="ss-flex ss-col-top"
          :class="[
              item.senderType === UserTypeEnum.ADMIN
                ? `ss-row-left`
                : item.senderType === UserTypeEnum.MEMBER
                ? `ss-row-right`
                : '',
            ]"
        >
          <!-- 客服头像 -->
          <image
            v-show="item.senderType === UserTypeEnum.ADMIN"
            class="chat-avatar ss-m-r-24"
            :src="
                sheep.$url.cdn(item?.senderAvatar) ||
                sheep.$url.static('/static/img/shop/chat/default.png')
              "
            mode="aspectFill"
          ></image>

          <!-- 发送状态 -->
          <span
            v-if="
                item.senderType === UserTypeEnum.MEMBER &&
                index == chatList.length - 1 &&
                isSendSuccess !== 0
              "
            class="send-status"
          >
              <image
                v-if="isSendSuccess == -1"
                class="loading"
                :src="sheep.$url.static('/static/img/shop/chat/loading.png')"
                mode="aspectFill"
              ></image>
            <!-- <image
              v-if="chatData.isSendSuccess == 1"
              class="warning"
              :src="sheep.$url.static('/static/img/shop/chat/warning.png')"
              mode="aspectFill"
              @click="onAgainSendMessage(item)"
            ></image> -->
            </span>

          <!-- 内容 -->
          <template v-if="item.contentType === KeFuMessageContentTypeEnum.TEXT">
            <view class="message-box" :class="{'admin': item.senderType === UserTypeEnum.ADMIN}">
              <mp-html :content="replaceEmoji(item.content)" />
            </view>
          </template>
          <template v-if="item.contentType === KeFuMessageContentTypeEnum.IMAGE">
            <view class="message-box" :class="{'admin': item.senderType === UserTypeEnum.ADMIN}" :style="{ width: '200rpx' }">
              <su-image
                class="message-img"
                isPreview
                :previewList="[sheep.$url.cdn(item.content)]"
                :current="0"
                :src="sheep.$url.cdn(item.content)"
                :height="200"
                :width="200"
                mode="aspectFill"
              ></su-image>
            </view>
          </template>
          <template v-if="item.contentType === KeFuMessageContentTypeEnum.PRODUCT">
            <GoodsItem
              :goodsData="item.content.item"
              @tap="
                  sheep.$router.go('/pages/goods/index', {
                    id: item.content.item.id,
                  })
                "
            />
          </template>
          <template v-if="item.contentType === KeFuMessageContentTypeEnum.ORDER">
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
            v-if="item.senderType === UserTypeEnum.MEMBER"
            class="chat-avatar ss-m-l-24"
            :src="sheep.$url.cdn(item?.senderAvatar) ||
                sheep.$url.static('/static/img/shop/chat/default.png')"
            mode="aspectFill"
          >
          </image>
        </view>
      </view>
      <!-- 视图滚动锚点  -->
      <view id="scrollBottom"></view>
    </scroll-view>
  </view>
</template>

<script setup>
  import sheep from '@/sheep';
  import OrderItem from '@/pages/chat/components/order.vue';
  import GoodsItem from '@/pages/chat/components/goods.vue';
  import { reactive, ref, unref } from 'vue';
  import { formatDate } from '@/sheep/util';
  import dayjs from 'dayjs';
  import { KeFuMessageContentTypeEnum,UserTypeEnum } from './constants';
  import { emojiList } from '@/pages/chat/emoji';

  const KEFU_MESSAGE_TYPE = 'kefu_message_type'; // 客服消息类型
  const { screenHeight, safeAreaInsets, safeArea, screenWidth } = sheep.$platform.device;
  const pageHeight = safeArea.height - 44 - 35 - 50;
  const state = reactive({
    scrollInto: '',
  });

  const chatList = [
    {
      id: 1,
      conversationId: 1001,
      senderId: 1,
      senderType: 1, // UserTypeEnum.MEMBER
      receiverId: 2,
      receiverType: 1, // UserTypeEnum.MEMBER
      contentType: 1, // KeFuMessageContentTypeEnum.TEXT
      content: "Hello, how are you?",
      readStatus: false
    },
    {
      id: 2,
      conversationId: 1001,
      senderId: 2,
      senderType: 1, // UserTypeEnum.MEMBER
      receiverId: 1,
      receiverType: 1, // UserTypeEnum.MEMBER
      contentType: 1, // KeFuMessageContentTypeEnum.TEXT
      content: "I'm good, thanks! [流泪][流泪][流泪][流泪]",
      readStatus: false
    },
    {
      id: 3,
      conversationId: 1002,
      senderId: 3,
      senderType: 2, // UserTypeEnum.ADMIN
      receiverId: 4,
      receiverType: 1, // UserTypeEnum.MEMBER
      contentType: 2, // KeFuMessageContentTypeEnum.IMAGE
      content: "https://static.iocoder.cn/mall/a79f5d2ea6bf0c3c11b2127332dfe2df.jpg",
      readStatus: true
    },
    {
      id: 4,
      conversationId: 1002,
      senderId: 4,
      senderType: 1, // UserTypeEnum.MEMBER
      receiverId: 3,
      receiverType: 2, // UserTypeEnum.ADMIN
      contentType: 1, // KeFuMessageContentTypeEnum.TEXT
      content: "This is a text message.",
      readStatus: false
    },
    {
      id: 5,
      conversationId: 1003,
      senderId: 5,
      senderType: 1, // UserTypeEnum.MEMBER
      receiverId: 6,
      receiverType: 1, // UserTypeEnum.MEMBER
      contentType: 3, // KeFuMessageContentTypeEnum.VOICE
      content: "Voice content here",
      readStatus: true
    },
    {
      id: 6,
      conversationId: 1003,
      senderId: 6,
      senderType: 1, // UserTypeEnum.MEMBER
      receiverId: 5,
      receiverType: 1, // UserTypeEnum.MEMBER
      contentType: 1, // KeFuMessageContentTypeEnum.TEXT
      content: "Another text message.",
      readStatus: false
    },
    {
      id: 7,
      conversationId: 1004,
      senderId: 7,
      senderType: 2, // UserTypeEnum.ADMIN
      receiverId: 8,
      receiverType: 1, // UserTypeEnum.MEMBER
      contentType: 1, // KeFuMessageContentTypeEnum.VIDEO
      content: "Video content here",
      readStatus: true
    },
    {
      id: 8,
      conversationId: 1004,
      senderId: 8,
      senderType: 1, // UserTypeEnum.MEMBER
      receiverId: 7,
      receiverType: 2, // UserTypeEnum.ADMIN
      contentType: 5, // KeFuMessageContentTypeEnum.SYSTEM
      content: "System message content",
      readStatus: false
    },
    {
      id: 9,
      conversationId: 1005,
      senderId: 9,
      senderType: 1, // UserTypeEnum.MEMBER
      receiverId: 10,
      receiverType: 1, // UserTypeEnum.MEMBER
      contentType: 10, // KeFuMessageContentTypeEnum.PRODUCT
      content: "Product message content",
      readStatus: true
    },
    {
      id: 10,
      conversationId: 1005,
      senderId: 10,
      senderType: 1, // UserTypeEnum.MEMBER
      receiverId: 9,
      receiverType: 1, // UserTypeEnum.MEMBER
      contentType: 11, // KeFuMessageContentTypeEnum.ORDER
      content: "Order message content",
      readStatus: false
    }
  ];

  const isSendSuccess = ref(-1)
  //======================= 工具函数 =======================
  /**
   * 是否显示时间
   * @param {*} item - 数据
   * @param {*} index - 索引
   */
  const showTime = (item, index) => {
    if (unref(chatList)[index + 1]) {
      let dateString = dayjs(unref(chatList)[index + 1].date).fromNow();
      return dateString !== dayjs(unref(item).date).fromNow();
    }
    return false;
  };
  // 处理表情
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
  function selEmojiFile(name) {
    for (let index in emojiList) {
      if (emojiList[index].name === name) {
        return emojiList[index].file;
      }
    }
    return false;
  }
</script>

<style scoped lang="scss">
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

      &.admin {
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
</style>
