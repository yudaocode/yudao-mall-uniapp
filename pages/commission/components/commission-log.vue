<!-- 分销明细  -->
<template>
  <view class="distribution-log-wrap">
    <view class="header-box">
      <image class="header-bg" :src="sheep.$url.static('/static/img/shop/commission/title2.png')" />
      <view class="ss-flex header-title">
        <view class="title">实时动态</view>
        <text class="cicon-forward"></text>
      </view>
    </view>
    <scroll-view
      scroll-y="true"
      @scrolltolower="loadmore"
      class="scroll-box log-scroll"
      scroll-with-animation="true"
    >
      <view v-if="state.pagination.data">
        <view
          class="log-item-box ss-flex ss-row-between"
          v-for="item in state.pagination.data"
          :key="item.id"
        >
          <view class="log-item-wrap">
            <view class="log-item ss-flex ss-ellipsis-1 ss-col-center">
              <view class="ss-flex ss-col-center">
                <image
                  v-if="item.oper_type === 'user'"
                  class="log-img"
                  :src="sheep.$url.cdn(item.oper?.avatar)"
                  mode="aspectFill"
                ></image>
                <image
                  v-else-if="item.oper_type === 'admin'"
                  class="log-img"
                  :src="sheep.$url.static('/static/img/shop/avatar/default_user.png')"
                  mode="aspectFill"
                ></image>
                <image
                  v-else
                  class="log-img"
                  :src="sheep.$url.static('/static/img/shop/avatar/notice.png')"
                  mode="aspectFill"
                ></image>
              </view>
              <view class="log-text ss-ellipsis-1">{{ item.remark }}</view>
            </view>
          </view>
          <text class="log-time">{{ dayjs(item.create_time).fromNow() }}</text>
        </view>
      </view>

      <!-- 加载更多 -->
      <uni-load-more
        v-if="state.pagination.total > 0"
        :status="state.loadStatus"
        color="#333333"
        @tap="loadmore"
      />
    </scroll-view>
  </view>
</template>

<script setup>
  import sheep from '@/sheep';
  import { computed, reactive } from 'vue';
  import _ from 'lodash';
  import dayjs from 'dayjs';

  const state = reactive({
    loadStatus: '',
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
  });

  async function getLog(page = 1) {
    const res = await sheep.$api.commission.log({
      page,
    });
    if (res.error === 0) {
      let list = _.concat(state.pagination.data, res.data.data);
      state.pagination = {
        ...res.data,
        data: list,
      };
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  getLog();

  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getLog(state.pagination.current_page + 1);
    }
  }
</script>

<style lang="scss" scoped>
  .distribution-log-wrap {
    width: 690rpx;
    margin: 0 auto;
    margin-bottom: 20rpx;
    border-radius: 12rpx;
    z-index: 3;
    position: relative;
    .header-box {
      width: 690rpx;
      height: 76rpx;
      position: relative;
      .header-bg {
        width: 690rpx;
        height: 76rpx;
      }
      .header-title {
        position: absolute;
        left: 20rpx;
        top: 24rpx;
      }
      .title {
        font-size: 28rpx;
        font-weight: 500;
        color: #ffffff;
        line-height: 30rpx;
      }
      .cicon-forward {
        font-size: 30rpx;
        font-weight: 400;
        color: #ffffff;
        line-height: 30rpx;
      }
    }
    .log-scroll {
      height: 600rpx;
      background: #fdfae9;
      padding: 10rpx 20rpx 0;
      box-sizing: border-box;
      border-radius: 0 0 12rpx 12rpx;

      .log-item-box {
        margin-bottom: 20rpx;
        .log-time {
          // margin-left: 30rpx;
          text-align: right;
          font-size: 24rpx;
          font-family: OPPOSANS;
          font-weight: 400;
          color: #c4c4c4;
        }
      }

      .loadmore-wrap {
        // line-height: 80rpx;
      }

      .log-item {
        // background: rgba(#ffffff, 0.2);
        border-radius: 24rpx;
        padding: 6rpx 20rpx 6rpx 12rpx;

        .log-img {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          margin-right: 10rpx;
        }

        .log-text {
          max-width: 480rpx;
          font-size: 24rpx;
          font-weight: 500;
          color: #333333;
        }
      }
    }
  }
</style>
