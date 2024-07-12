<template>
  <view class="chat-box" :style="{ height: pageHeight + 'px' }">
    <scroll-view
      :style="{ height: pageHeight + 'px' }"
      class="scroll"
      :scroll-y="true"
      :scroll-top="currentTop"
      @scroll="handle_scroll"
      @scrolltolower="upper"
    >
      <view v-for="(data, index) in scrollData" :key="index" :id="'item-' + index">
        <template v-if="includePage(index)">
          <!--  消息渲染  -->
          <view class="message-item ss-flex-col scroll-item" v-for="(item, index2) in data" :key="index">
            <view class="ss-flex ss-row-center ss-col-center">
              <!-- 日期 -->
              <view v-if="item.contentType !== KeFuMessageContentTypeEnum.SYSTEM && showTime(item,data, index2)"
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
                sheep.$url.cdn(item?.senderAvatar) ||
                sheep.$url.static('/static/img/shop/chat/default.png')
              "
                mode="aspectFill"
              ></image>

              <!-- 发送状态 -->
              <span
                v-if="
                item.senderType === UserTypeEnum.MEMBER &&
                index == data.length - 1 &&
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
                  :goodsData="JSON.parse(item.content)"
                  @tap="
                    sheep.$router.go('/pages/goods/index', {
                      id: JSON.parse(item.content).id,
                    })
                  "
                />
              </template>
              <template v-if="item.contentType === KeFuMessageContentTypeEnum.ORDER">
                <OrderItem
                  :orderData="JSON.parse(item.content)"
                  @tap="
                  sheep.$router.go('/pages/order/detail', {
                    id: JSON.parse(item.content).id,
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
        </template>
        <view v-if="!includePage(index)" :style="{ height: pagesHeight[index] }"></view>
      </view>
    </scroll-view>
    <!-- TODO puhui999: 这里还有一点问题 -->
    <view v-show="showGoBottom" class="go-back-btn" @click="handle_goBottom">查看最新消息</view>
  </view>
</template>

<script setup>
  import { nextTick, reactive, ref, unref } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  import GoodsItem from './goods.vue';
  import OrderItem from './order.vue';
  import sheep from '@/sheep';
  import KeFuApi from '@/sheep/api/promotion/kefu';
  import { isEmpty } from '@/sheep/helper/utils';
  import { KeFuMessageContentTypeEnum, UserTypeEnum } from '@/pages/chat/components/constants';
  import { formatDate } from '@/sheep/util';
  import dayjs from 'dayjs';
  import { emojiList } from '@/pages/chat/emoji';

  const { safeArea } = sheep.$platform.device;
  const pageHeight = safeArea.height - 44 - 35 - 50;

  const currentShowPage = ref(0); // 当前展示的页码
  const pagesHeight = reactive([]); // 记录每个页面的高度
  const visiblePagesList = ref([-1, 0, 1]);
  const scrollData = ref([]);

  // 向上滚动
  const upper = async () => {
    // 页数据满十条后加载下一页
    if (currentShowPage.value === 0 || scrollData.value[currentShowPage.value - 1].length === 10) {
      currentShowPage.value += 1;
    }
    await getMessageList();
    await nextTick();
    setPageHeight();
    observer(currentShowPage.value);
  };

  // 获得消息分页列表
  const getMessageList = async (pageNo = undefined) => {
    const { data } = await KeFuApi.getKefuMessagePage({
      pageNo: pageNo || currentShowPage.value,
    });
    if (isEmpty(data.list)) {
      return;
    }
    scrollData.value[pageNo ? pageNo - 1 : currentShowPage.value - 1] = data.list;
  };
  defineExpose({ getMessageList });

  const scrollTop = ref(0); // 当前滚动区域距离顶部的距离
  const currentTop = ref(0);
  const showGoBottom = ref(false);
  // 滚动条滚动时触发
  const handle_scroll = throttle(event => {
    scrollTop.value = event[0].detail.scrollTop;
    if (scrollTop > 300) {
      showGoBottom.value = true;
    }
  }, 100);
  const handle_goBottom = () => {
    currentTop.value = scrollTop.value;
    nextTick(() => {
      currentTop.value = 0;
    });
    showGoBottom.value = false;
  };

  // 获取每页数据的页面高度
  const setPageHeight = () => {
    let query = uni.createSelectorQuery();
    query
      .select(`#item-${currentShowPage.value}`)
      .boundingClientRect(res => {
        console.log(res);
        pagesHeight[currentShowPage.value] = res && res.height;
      })
      .exec();
  };

  const observer = pageNum => {
    const observeView = wx
      .createIntersectionObserver()
      .relativeTo('#scroll', { top: 0, bottom: 0 });
    observeView.observe(`#item-${pageNum}`, res => {
      if (res.intersectionRatio > 0) visiblePagesList.value = [pageNum - 1, pageNum, pageNum + 1];
    });
  };

  // 虚拟列表展示可视区域的数据
  const includePage = index => {
    return visiblePagesList.value.indexOf(index) > -1;
  };

  // 防抖
  function throttle(fnc, delay) {
    let timer;
    return function() {
      let _this = this;
      let args = arguments;
      if (!timer) {
        timer = setTimeout(() => {
          fnc.call(_this, args);
          timer = null;
        }, delay);
      }
    };
  }

  const isSendSuccess = ref(0); // 是否发送成功 -1=发送中|0=发送成功|1发送失败
  onLoad(() => {
    setPageHeight();
    observer(currentShowPage.value);
  });
  //======================= 工具函数 =======================
  /**
   * 是否显示时间
   * @param {*} item - 数据
   * @param {*} index - 索引
   */
  const showTime = (item, data, index) => {
    if (unref(data)[index + 1]) {
      let dateString = dayjs(unref(data)[index + 1].createTime).fromNow();
      return dateString !== dayjs(unref(item).createTime).fromNow();
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

<style lang="scss" scoped>
  // scroll-view 倒置，也就是说顶部是底，底部才是顶，下拉加载旧数据，回到底部就是新数据
  .scroll {
    transform: rotate(180deg);

    & ::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
      color: transparent;
    }
  }

  // 内容区域也翻转一下
  .scroll-item {
    transform: rotate(180deg);
  }

  .go-back-btn {
    width: 100rpx;
    height: 60rpx;
    line-height: 60rpx;
    position: fixed;
    bottom: 100rpx;
    left: 80%;
    transform: translateX(-50%);
    text-align: center;
    background-color: lightblue;
    border-radius: 10rpx;
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
