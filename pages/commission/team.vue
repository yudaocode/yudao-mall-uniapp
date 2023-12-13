<!-- 页面  -->
<template>
  <s-layout title="我的团队" :class="state.scrollTop ? 'team-wrap' : ''" navbar="inner">
    <view
      class="header-box"
      :style="[
        {
          marginTop: '-' + Number(statusBarHeight + 88) + 'rpx',
          paddingTop: Number(statusBarHeight + 108) + 'rpx',
        },
      ]"
    >
      <!-- 推荐人 -->
      <view v-if="userInfo.parent_user" class="referrer-box ss-flex ss-col-center">
        推荐人：
        <image
          class="referrer-avatar ss-m-r-10"
          :src="sheep.$url.cdn(userInfo.parent_user.avatar)"
          mode="aspectFill"
        >
        </image>
        {{ userInfo.parent_user.nickname }}
      </view>
      <!-- 团队数据总览 -->
      <view class="team-data-box ss-flex ss-col-center ss-row-between">
        <view class="data-card">
          <view class="total-item">
            <view class="item-title">团队总人数（人）</view>
            <view class="total-num">{{ agentInfo.child_user_count_all || 0 }}</view>
          </view>
          <view class="category-item ss-flex">
            <view class="ss-flex-1">
              <view class="item-title">一级成员</view>
              <view class="category-num">{{ agentInfo.child_user_count_1 || 0 }}</view>
            </view>
            <view class="ss-flex-1">
              <view class="item-title">二级成员</view>
              <view class="category-num">{{ agentInfo.child_user_count_2 || 0 }}</view>
            </view>
          </view>
        </view>
        <view class="data-card">
          <view class="total-item">
            <view class="item-title">团队分销商人数（人）</view>
            <view class="total-num">{{ agentInfo.child_agent_count_all || 0 }}</view>
          </view>
          <view class="category-item ss-flex">
            <view class="ss-flex-1">
              <view class="item-title">一级分销商</view>
              <view class="category-num">{{ agentInfo.child_agent_count_1 || 0 }}</view>
            </view>
            <view class="ss-flex-1">
              <view class="item-title">二级分销商</view>
              <view class="category-num">{{ agentInfo.child_agent_count_2 || 0 }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="list-box">
      <uni-list :border="false">
        <uni-list-chat
          v-for="item in state.pagination.data"
          :key="item.id"
          :avatar-circle="true"
          :title="item.nickname"
          :avatar="sheep.$url.cdn(item.avatar)"
          :note="filterUserNum(item.agent?.child_user_count_1)"
        >
          <view class="chat-custom-right">
            <view v-if="item.agent?.level_info" class="tag-box ss-flex ss-col-center">
              <image
                class="tag-img"
                :src="sheep.$url.cdn(item.agent.level_info.image)"
                mode="aspectFill"
              >
              </image>
              <text class="tag-title">{{ item.agent.level_info.name }}</text>
            </view>

            <text class="time-text">{{ item.create_time }}</text>
          </view>
        </uni-list-chat>
      </uni-list>
    </view>
    <s-empty v-if="state.pagination.total === 0" icon="/static/data-empty.png" text="暂无团队信息">
    </s-empty>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import _ from 'lodash';
  import { onPageScroll } from '@dcloudio/uni-app';

  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  const agentInfo = computed(() => sheep.$store('user').agentInfo);
  const userInfo = computed(() => sheep.$store('user').userInfo);
  const headerBg = sheep.$url.css('/static/img/shop/user/withdraw_bg.png');

  onPageScroll((e) => {
    if (e.scrollTop > 100) {
      state.scrollTop = false;
    } else {
      state.scrollTop = true;
    }
  });
  const state = reactive({
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
  });

  function filterUserNum(num) {
    if (_.isNil(num)) {
      return '';
    }
    return `下级团队${num}人`;
  }

  async function getTeamList(page = 1, list_rows = 8) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.commission.team({
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

  onLoad(async () => {
    getTeamList();
  });

  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getTeamList(state.pagination.current_page + 1);
    }
  }

  // 上拉加载更多
  onReachBottom(() => {
    loadmore();
  });
</script>

<style lang="scss" scoped>
  .header-box {
    box-sizing: border-box;
    padding: 0 20rpx 20rpx 20rpx;
    width: 750rpx;
    z-index: 3;
    position: relative;
    background: v-bind(headerBg) no-repeat,
      linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    background-size: 750rpx 100%;
    // 团队信息总览
    .team-data-box {
      .data-card {
        width: 305rpx;
        background: #ffffff;
        border-radius: 20rpx;
        padding: 20rpx;

        .item-title {
          font-size: 22rpx;
          font-weight: 500;
          color: #999999;
          line-height: 30rpx;
          margin-bottom: 10rpx;
        }

        .total-item {
          margin-bottom: 30rpx;
        }

        .total-num {
          font-size: 38rpx;
          font-weight: 500;
          color: #333333;
          font-family: OPPOSANS;
        }

        .category-num {
          font-size: 26rpx;
          font-weight: 500;
          color: #333333;
          font-family: OPPOSANS;
        }
      }
    }
  }
  .list-box {
    z-index: 3;
    position: relative;
  }
  .chat-custom-right {
    .time-text {
      font-size: 22rpx;
      font-weight: 400;
      color: #999999;
    }

    .tag-box {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 21rpx;
      line-height: 30rpx;
      padding: 5rpx 10rpx;
      width: 140rpx;

      .tag-img {
        width: 34rpx;
        height: 34rpx;
        margin-right: 6rpx;
        border-radius: 50%;
      }

      .tag-title {
        font-size: 18rpx;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 20rpx;
      }
    }
  }

  // 推荐人
  .referrer-box {
    font-size: 28rpx;
    font-weight: 500;
    color: #ffffff;
    padding: 20rpx;

    .referrer-avatar {
      width: 34rpx;
      height: 34rpx;
      border-radius: 50%;
    }
  }
</style>
