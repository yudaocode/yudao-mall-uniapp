<template>
  <view class="chat-box" :style="{ height: pageHeight + 'px' }">
    <scroll-view
      :style="{ height: pageHeight + 'px' }"
      class="scroll"
      :scroll-y="true"
      :scroll-top="currentTop"
      @scroll="handleScroll"
      @scrolltolower="handleScrolltolower"
    >
      <view ref="messageViewRef" class="messageView" v-if="refreshContent" style="width: 100%; padding-bottom: 10rpx">
        <!--  消息渲染  -->
        <view class="message-item ss-flex-col scroll-item" v-for="(item, index) in getMessageList0" :key="item.id">
          <view class="ss-flex ss-row-center ss-col-center">
            <!-- 日期 -->
            <view v-if="item.contentType !== KeFuMessageContentTypeEnum.SYSTEM && showTime(item, index)"
                  class="date-message">
              {{ formatDate(item.createTime) }}
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
                sheep.$url.cdn(item.senderAvatar) ||
                sheep.$url.static('/static/img/shop/chat/default.png')
              "
              mode="aspectFill"
            ></image>
            <!-- 内容 -->
            <template v-if="item.contentType === KeFuMessageContentTypeEnum.TEXT">
              <view class="message-box" :class="{'admin': item.senderType === UserTypeEnum.ADMIN}">
                <mp-html :content="replaceEmoji(item.content)" />
              </view>
            </template>
            <template v-if="item.contentType === KeFuMessageContentTypeEnum.IMAGE">
              <view class="message-box" :class="{'admin': item.senderType === UserTypeEnum.ADMIN}"
                    :style="{ width: '200rpx' }">
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
                :goodsData="getMessageContent(item)"
                @tap="
                    sheep.$router.go('/pages/goods/index', {
                      id: getMessageContent(item).id,
                    })
                  "
              />
            </template>
            <template v-if="item.contentType === KeFuMessageContentTypeEnum.ORDER">
              <OrderItem
                :orderData="getMessageContent(item)"
                @tap="
                  sheep.$router.go('/pages/order/detail', {
                    id: getMessageContent(item).id,
                  })
                "
              />
            </template>
            <!-- user头像 -->
            <image
              v-if="item.senderType === UserTypeEnum.MEMBER"
              class="chat-avatar ss-m-l-24"
              :src="sheep.$url.cdn(item.senderAvatar) ||
                sheep.$url.static('/static/img/shop/chat/default.png')"
              mode="aspectFill"
            >
            </image>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 查看最新消息 -->
    <view
      v-if="showNewMessageTip"
      class="newMessageTip"
      @click="handleToNewMessage"
    >
      <text>有新消息</text>
    </view>
  </view>
</template>

<script setup>
  import { computed, getCurrentInstance, nextTick, reactive, ref, unref } from 'vue';
  import dayjs from 'dayjs';
  import _ from 'lodash'
  import { KeFuMessageContentTypeEnum, UserTypeEnum } from '@/pages/chat/util/constants';
  import { emojiList } from '@/pages/chat/util/emoji';
  import { isEmpty } from '@/sheep/helper/utils';
  import sheep from '@/sheep';
  import KeFuApi from '@/sheep/api/promotion/kefu';
  import { formatDate } from '@/sheep/util';
  import GoodsItem from '@/pages/chat/components/goods.vue';
  import OrderItem from '@/pages/chat/components/order.vue';

  const { safeArea } = sheep.$platform.device;
  const pageHeight = safeArea.height - 44 - 35 - 50;
  const vm = getCurrentInstance();
  const getMessageContent = computed(() => (item) => JSON.parse(item.content)); // 解析消息内容
  const messageList = ref([]); // 消息列表
  const currentTop = ref(0); // 当前距顶位置
  const showNewMessageTip = ref(false); // 显示有新消息提示
  const queryParams = reactive({
    pageNo: 1,
    pageSize: 10,
  });
  const total = ref(0); // 消息总条数
  const refreshContent = ref(false); // 内容刷新,主要解决会话消息页面高度不一致导致的滚动功能精度失效
  const skipGetMessageList = computed(() => {
    // 已加载到最后一页的话则不触发新的消息获取
    return total.value > 0 && Math.ceil(total.value / queryParams.pageSize) === queryParams.pageNo;
  }); // 跳过消息获取
  /** 按照时间倒序，获取消息列表 */
  const getMessageList0 = computed(() => {
    messageList.value.sort((a, b) => a.createTime - b.createTime);
    return messageList.value;
  });
  // 获得消息分页列表
  const getMessageList = async () => {
    const { data } = await KeFuApi.getKefuMessagePage({
      pageNo: queryParams.pageNo,
    });
    if (isEmpty(data.list)) {
      return;
    }
    total.value = data.total;
    // 情况一：加载最新消息
    if (queryParams.pageNo === 1 && !loadHistory.value) {
      messageList.value = data.list;
    } else {
      // 情况二：加载历史消息
      for (const item of data.list) {
        if (messageList.value.some((val) => val.id === item.id)) {
          continue;
        }
        messageList.value.push(item);
      }
    }
    refreshContent.value = true;
    await scrollToBottom();
  };
  /** 刷新消息列表 */
  const refreshMessageList = async () => {
    queryParams.pageNo = 1;
    await getMessageList();
    if (loadHistory.value) {
      // 右下角显示有新消息提示
      showNewMessageTip.value = true;
    }
  };
  defineExpose({ getMessageList, refreshMessageList });

  /** 滚动到底部 */
  const messageViewRef = ref();
  const scrollToBottom = async () => {
    // 1. 首次加载时滚动到最新消息，如果加载的是历史消息则不滚动
    if (loadHistory.value) {
      return;
    }
    // 2. 滚动到最新消息，关闭新消息提示
    await nextTick();
    // #ifdef MP
    currentTop.value = await getMessageViewHeight();
    // #endif
    // #ifdef H5
    currentTop.value = messageViewRef.value.$el.clientHeight;
    // #endif
    showNewMessageTip.value = false;
  };

  /** 查看新消息 */
  const handleToNewMessage = async () => {
    loadHistory.value = false;
    await scrollToBottom();
  };

  /** 加载历史消息 */
  const loadHistory = ref(false); // 加载历史消息
  const handleScroll = async (event) => {
    if (skipGetMessageList.value) {
      return;
    }
    // 触顶自动加载下一页数据
    console.log(event.detail.scrollTop);
    if (event.detail.scrollTop === 0) {
      await handleOldMessage();
      // 防抖
      // _.debounce(handleOldMessage, 200)
    }
  };
  const handleOldMessage = async () => {
    // 记录已有页面高度
    let oldPageHeight = 0;
    // #ifdef MP
    oldPageHeight = await getMessageViewHeight();
    // #endif
    // #ifdef H5
    oldPageHeight = messageViewRef.value.$el.clientHeight;
    // #endif
    if (!oldPageHeight) {
      return;
    }
    loadHistory.value = true;
    // 加载消息列表
    queryParams.pageNo += 1;
    await getMessageList();
    // 等页面加载完后，获得上一页最后一条消息的位置，控制滚动到它所在位置
    // #ifdef MP
    // TODO puhui999: 微信滚动条定位还是有点问题，页面会闪烁
    currentTop.value = (await getMessageViewHeight()) - oldPageHeight - 127;
    // #endif
    // #ifdef H5
    currentTop.value = messageViewRef.value.$el.clientHeight - oldPageHeight;
    // #endif
  };
  // 触底事件
  const handleScrolltolower = () => {
    // refreshContent.value = false;
    // loadHistory.value = false;
    // // messageList.value = messageList.value.slice(0, 10)
  };

  /**
   * 获得消息列表高度
   */
  const getMessageViewHeight = () => {
    return new Promise((resolve, reject) => {
      uni.createSelectorQuery().in(vm).select('.messageView').boundingClientRect((rect) => {
        console.log(rect);
        resolve(rect.height);
      }).exec();
    });
  };

  //======================= 工具 =======================

  const showTime = computed(() => (item, index) => {
    if (unref(messageList.value)[index + 1]) {
      let dateString = dayjs(unref(messageList.value)[index + 1].createTime).fromNow();
      return dateString !== dayjs(unref(item).createTime).fromNow();
    }
    return false;
  });

  // 处理表情
  function replaceEmoji(data) {
    let newData = data;
    if (typeof newData !== 'object') {
      let reg = /\[(.+?)]/g; // [] 中括号
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
  .newMessageTip {
    position: absolute;
    bottom: 35rpx;
    right: 35rpx;
    background-color: #fff;
    padding: 10rpx;
    border-radius: 30rpx;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  }

  .chat-box {
    padding: 0 20rpx 0;
    position: relative;

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
