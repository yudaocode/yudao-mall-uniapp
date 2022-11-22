<!-- 分销记录  -->
<template>
  <s-layout title="分享记录">
    <view class="distraction-share-wrap">
      <view class="share-log-box">
        <!-- 分享记录列表 -->
        <view class="log-list ss-flex" v-for="item in state.pagination.data" :key="item.id">
          <view class="log-avatar-wrap">
            <image
              class="log-avatar"
              :src="sheep.$url.cdn(item.user?.avatar)"
              mode="aspectFill"
            ></image>
          </view>

          <view class="item-right">
            <view class="name">{{ item.user?.nickname }}</view>
            <view class="content ss-flex">
              <view v-if="item.ext?.image" class="content-img-wrap">
                <image class="content-img" :src="sheep.$url.cdn(item.ext?.image)" mode="aspectFill">
                </image>
              </view>

              <view v-if="item.ext?.memo" class="content-text">
                {{ item.ext?.memo }}
              </view>
            </view>
            <view class="item-bottom ss-flex ss-row-between">
              <view class="from-text"></view>
              <view class="time">{{ dayjs(item.create_time).fromNow() }}</view>
            </view>
          </view>
        </view>
        <s-empty
          v-if="state.pagination.total === 0"
          icon="/static/data-empty.png"
          text="暂无分享记录"
        >
        </s-empty>
        <!-- 加载更多 -->
        <uni-load-more
          v-if="state.pagination.total > 0"
          :status="state.loadStatus"
          :content-text="{
            contentdown: '上拉加载更多',
          }"
          @tap="loadmore"
        />
      </view>
    </view>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import _ from 'lodash';
  import dayjs from 'dayjs';

  const state = reactive({
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
  });

  async function getShareLog(page = 1, list_rows = 8) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.user.share.list({
      list_rows,
      page,
    });
    if (res.error === 0) {
      let orderList = _.concat(state.pagination.data, res.data.data);
      state.pagination = {
        ...res.data,
        data: orderList,
      };
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getShareLog(state.pagination.current_page + 1);
    }
  }
  onLoad(async () => {
    getShareLog();
  });
</script>

<style lang="scss" scoped>
  .share-log-box {
    // 分享记录列表
    .log-list {
      background-color: #fff;
      padding: 30rpx;
      margin: 10rpx 0;
      align-items: flex-start;

      .log-avatar-wrap {
        margin-right: 14rpx;

        .log-avatar {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
        }
      }

      .item-right {
        flex: 1;

        .name {
          font-size: 26rpx;
          font-weight: 500;
          color: #7f7aa5;
          margin-bottom: 30rpx;
        }

        .content {
          background: rgba(241, 241, 241, 0.46);
          border-radius: 2rpx;
          padding: 10rpx;
          margin-bottom: 20rpx;

          .content-img-wrap {
            margin-right: 16rpx;
            width: 80rpx;
            height: 80rpx;

            .content-img {
              width: 80rpx;
              height: 80rpx;
              border-radius: 6rpx;
            }
          }

          .content-text {
            font-size: 24rpx;
            font-weight: 500;
            color: #333333;
          }
        }

        .item-bottom {
          width: 100%;

          .time {
            font-size: 22rpx;
            font-weight: 500;
            color: #c8c8c8;
          }

          .from-text {
            font-size: 22rpx;
            font-weight: 500;
            color: #c8c8c8;
          }
        }
      }
    }
  }
</style>
