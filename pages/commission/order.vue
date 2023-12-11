<!-- 分销订单  -->
<template>
  <s-layout title="分销订单" :class="state.scrollTop ? 'order-warp' : ''" navbar="inner">
    <view
      class="header-box"
      :style="[
        {
          marginTop: '-' + Number(statusBarHeight + 88) + 'rpx',
          paddingTop: Number(statusBarHeight + 108) + 'rpx',
        },
      ]"
    >
      <!-- 团队数据总览 -->
      <view class="team-data-box ss-flex ss-col-center ss-row-between">
        <view class="data-card">
          <view class="total-item">
            <view class="item-title">团队订单数量（单）</view>
            <view class="total-num">
              {{ state.agentInfo.child_order_count_all || 0 }}
            </view>
          </view>
          <view class="category-item ss-flex">
            <view class="ss-flex-1">
              <view class="item-title">一级订单</view>
              <view class="category-num">
                {{ state.agentInfo.child_order_count_1 || 0 }}
              </view>
            </view>
            <view class="ss-flex-1">
              <view class="item-title">二级订单</view>
              <view class="category-num">
                {{ state.agentInfo.child_order_count_2 || 0 }}
              </view>
            </view>
          </view>
        </view>
        <view class="data-card">
          <view class="total-item">
            <view class="item-title">团队订单金额（元）</view>
            <view class="total-num">
              {{ state.agentInfo.child_order_money_all || '0.00' }}
            </view>
          </view>
          <view class="category-item ss-flex">
            <view class="ss-flex-1">
              <view class="item-title">一级订单</view>
              <view class="category-num">
                {{ state.agentInfo.child_order_money_1 || '0.00' }}
              </view>
            </view>
            <view class="ss-flex-1">
              <view class="item-title">二级订单</view>
              <view class="category-num">
                {{ state.agentInfo.child_order_money_2 || '0.00' }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 自购 -->
      <view class="direct-box ss-flex ss-row-between">
        <view class="direct-item">
          <view class="item-title">自购分销订单数量（单）</view>
          <view class="item-value">
            {{ state.agentInfo.child_order_count_0 || 0 }}
          </view>
        </view>
        <view class="direct-item">
          <view class="item-title">自购分销订单金额（元）</view>
          <view class="item-value">
            {{ state.agentInfo.child_order_money_0 || '0.00' }}
          </view>
        </view>
      </view>
    </view>

    <!-- tab -->
    <su-sticky bgColor="#fff">
      <su-tabs
        :list="tabMaps"
        :scrollable="false"
        :current="state.currentTab"
        @change="onTabsChange"
      >
      </su-tabs>
    </su-sticky>

    <!-- 订单 -->
    <view class="order-box">
      <view class="order-item" v-for="item in state.pagination.data" :key="item">
        <view class="order-header">
          <view class="no-box ss-flex ss-col-center ss-row-between">
            <text class="order-code">订单编号：{{ item.order.order_sn }}</text>
            <text class="order-state">{{ item.order_item.status_text }}</text>
          </view>
          <view class="order-from ss-flex ss-col-center ss-row-between">
            <view class="from-user ss-flex ss-col-center">
              <text>下单人：</text>
              <image class="user-avatar" :src="sheep.$url.cdn(item.buyer.avatar)" mode="aspectFill">
              </image>
              <text class="user-name">{{ item.buyer.nickname }}</text>
            </view>
            <view class="order-time">{{ item.create_time }}</view>
          </view>
        </view>
        <s-goods-item
          class="border-bottom"
          :img="item.order_item.goods_image"
          :title="item.order_item.goods_title"
          :skuText="item.order_item.goods_sku_text"
          :price="item.order_item.goods_price"
          :num="item.order_item.goods_num"
        >
          <template #rightBottom>
            <view class="ss-flex commission-box ss-row-between ss-m-t-10">
              <view class="ss-flex">
                <text class="name">佣金：</text>
                <text class="commission-num">{{ item.rewards[0]?.commission }}</text>
              </view>
              <view class="order-status">
                {{ item.commission_order_status_text }}
              </view>
            </view>
          </template>
        </s-goods-item>
      </view>
      <!-- 数据为空 -->
      <s-empty v-if="state.pagination.total === 0" icon="/static/order-empty.png" text="暂无订单">
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
    <!-- </view> -->
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import _ from 'lodash';
  import { onPageScroll } from '@dcloudio/uni-app';

  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
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
    currentTab: 0,
    agentInfo: {},
    scrollTop: false,
  });

  const tabMaps = [
    {
      name: '全部',
      value: 'all',
    },
    // {
    // 	name: '不计入',
    // 	value: 'no'
    // },
    {
      name: '已计入',
      value: 'yes',
    },
    {
      name: '已扣除',
      value: 'back',
    },
    {
      name: '已取消',
      value: 'cancel',
    },
  ];
  // 切换选项卡
  function onTabsChange(e) {
    state.pagination = {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    };
    state.currentTab = e.index;
    getOrderList();
  }

  // 获取订单列表
  async function getOrderList(page = 1, list_rows = 5) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.commission.order({
      type: tabMaps[state.currentTab].value,
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

  async function getAgentInfo() {
    const { error, data, msg } = await sheep.$api.commission.agent();
    if (error === 0) {
      state.agentInfo = data;
    }
  }

  onLoad(() => {
    getAgentInfo();
    getOrderList();
  });

  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getOrderList(state.pagination.current_page + 1);
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

        .total-item {
          margin-bottom: 30rpx;

          .item-title {
            font-size: 24rpx;
            font-weight: 500;
            color: #999999;
            line-height: normal;
            margin-bottom: 20rpx;
          }

          .total-num {
            font-size: 38rpx;
            font-weight: 500;
            color: #333333;
            font-family: OPPOSANS;
          }
        }

        .category-num {
          font-size: 26rpx;
          font-weight: 500;
          color: #333333;
          font-family: OPPOSANS;
        }
      }
    }

    // 直推
    .direct-box {
      margin-top: 20rpx;

      .direct-item {
        width: 340rpx;
        background: #ffffff;
        border-radius: 20rpx;
        padding: 20rpx;
        box-sizing: border-box;

        .item-title {
          font-size: 22rpx;
          font-weight: 500;
          color: #999999;
          margin-bottom: 6rpx;
        }

        .item-value {
          font-size: 38rpx;
          font-weight: 500;
          color: #333333;
          font-family: OPPOSANS;
        }
      }
    }
  }

  // 订单
  .order-box {
    .order-item {
      background: #ffffff;
      border-radius: 10rpx;
      margin: 20rpx;

      .order-footer {
        padding: 20rpx;
        font-size: 24rpx;
        color: #999;
      }

      .order-header {
        .no-box {
          padding: 20rpx;

          .order-code {
            font-size: 26rpx;
            font-weight: 500;
            color: #333333;
          }

          .order-state {
            font-size: 26rpx;
            font-weight: 500;
            color: var(--ui-BG-Main);
          }
        }

        .order-from {
          padding: 20rpx;

          .from-user {
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;

            .user-avatar {
              width: 26rpx;
              height: 26rpx;
              border-radius: 50%;
              margin-right: 8rpx;
            }

            .user-name {
              font-size: 24rpx;
              font-weight: 400;
              color: #999999;
            }
          }

          .order-time {
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
          }
        }
      }

      .commission-box {
        .name {
          font-size: 24rpx;
          font-weight: 400;
          color: #999999;
        }
      }

      .commission-num {
        font-size: 30rpx;
        font-weight: 500;
        color: $red;
        font-family: OPPOSANS;

        &::before {
          content: '￥';
          font-size: 22rpx;
        }
      }

      .order-status {
        line-height: 30rpx;
        padding: 0 10rpx;
        border-radius: 30rpx;
        margin-left: 20rpx;
        font-size: 24rpx;
        color: var(--ui-BG-Main);
      }
    }
  }
</style>
