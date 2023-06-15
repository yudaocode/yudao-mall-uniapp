<!-- 优惠券详情  -->
<template>
  <s-layout title="优惠券详情">
    <view class="bg-white">
      <!-- 详情卡片 -->
      <view class="detail-wrap ss-p-20">
        <view class="detail-box">
          <view class="tag-box ss-flex ss-col-center ss-row-center">
            <image
              class="tag-image"
              :src="sheep.$url.static('/static/img/shop/app/coupon_icon.png')"
              mode="aspectFit"
            ></image>
          </view>
          <view class="top ss-flex-col ss-col-center">
            <view class="title ss-m-t-50 ss-m-b-20 ss-m-x-20">{{ state.list.name }}</view>
            <view class="subtitle ss-m-b-50">{{ state.list.amount_text }}</view>
            <button
              class="ss-reset-button ss-m-b-30"
              :class="
                state.list.get_status == 'can_get' || state.list.get_status == 'can_use'
                  ? 'use-btn'
                  : 'disable-btn'
              "
              :disabled="
                (state.list.get_status != 'can_get' && state.list.get_status != 'can_use') ||
                state.userCouponId
              "
              @click="getCoupon"
            >
              {{ state.list.get_status_text }}
            </button>
            <view
              class="time ss-m-y-30"
              v-if="
                state.list.get_status == 'can_get' ||
                state.list.get_status == 'cannot_get' ||
                state.list.get_status == 'get_over'
              "
            >
              领取时间：{{ state.list.get_start_time }}至{{ state.list.get_end_time }}
            </view>
            <view class="time ss-m-y-30" v-else>
              有效期：{{ state.list.use_start_time }}至{{ state.list.use_end_time }}
            </view>
            <view class="coupon-line ss-m-t-14"></view>
          </view>
          <view class="bottom">
            <view class="type ss-flex ss-col-center ss-row-between ss-p-x-30">
              <view>优惠券类型</view>
              <view>{{ state.list.type_text }}</view>
            </view>
            <uni-collapse>
              <uni-collapse-item title="优惠券说明" v-if="state.list.description">
                <view class="content ss-p-b-20">
                  <text class="des ss-p-l-30">{{ state.list.description }}</text>
                </view>
              </uni-collapse-item>
            </uni-collapse>
          </view>
        </view>
      </view>
      <!-- 适用商品 -->
      <view
        class="all-user ss-flex ss-row-center ss-col-center"
        v-if="state.list.use_scope == 'all_use'"
      >
        {{ state.list.use_scope_text }}
      </view>

      <su-sticky v-else bgColor="#fff">
        <view class="goods-title ss-p-20">{{ state.list.use_scope_text }}</view>
        <su-tabs
          :scrollable="true"
          :list="state.tabMaps"
          @change="onTabsChange"
          :current="state.currentTab"
          v-if="state.list.use_scope == 'category'"
        ></su-tabs>
      </su-sticky>
      <view v-if="state.list.use_scope == 'goods' || state.list.use_scope == 'disabled_goods'">
        <view v-for="(item, index) in state.list.items_value" :key="index">
          <s-goods-column
            class="ss-m-20"
            size="lg"
            :data="item"
            :titleColor="props.goodsFieldsStyle?.title?.color"
            :subTitleColor="props.goodsFieldsStyle?.subtitle?.color"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            :goodsFields="{
              title: { show: true },
              subtitle: { show: true },
              price: { show: true },
              original_price: { show: true },
              sales: { show: true },
              stock: { show: false },
            }"
            :buttonShow="state.list.use_scope != 'disabled_goods'"
          ></s-goods-column>
        </view>
      </view>
      <view v-if="state.list.use_scope == 'category'">
        <view v-for="(item, index) in state.pagination.data" :key="index">
          <s-goods-column
            class="ss-m-20"
            size="lg"
            :data="item"
            :titleColor="props.goodsFieldsStyle?.title?.color"
            :subTitleColor="props.goodsFieldsStyle?.subtitle?.color"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            :goodsFields="{
              title: { show: true },
              subtitle: { show: true },
              price: { show: true },
              original_price: { show: true },
              sales: { show: true },
              stock: { show: false },
            }"
            :buttonShow="state.list.use_scope != 'disabled_goods'"
          ></s-goods-column>
        </view>
      </view>
      <uni-load-more
        v-if="state.pagination.total > 0 && state.list.use_scope == 'category'"
        :status="state.loadStatus"
        :content-text="{
          contentdown: '上拉加载更多',
        }"
        @tap="loadmore"
      />
      <s-empty
        v-if="state.list.use_scope == 'category' && state.pagination.total === 0"
        paddingTop="0"
        icon="/static/soldout-empty.png"
        text="暂无商品"
      >
      </s-empty>
    </view>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import _ from 'lodash';

  const pagination = {
    data: [],
    current_page: 1,
    total: 1,
    last_page: 1,
  };
  const state = reactive({
    list: {},
    couponId: 0,
    userCouponId: 0,
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    tabMaps: [],
    loadStatus: '',
    categoryId: 0,
  });

  // 接收参数
  const props = defineProps({
    includes: {
      type: Array,
      default() {
        return [];
      },
    },
    list: {
      type: Array,
      default: () => [],
    },
    goodsFieldsStyle: {
      type: Object,
      default() {},
    },
    buyData: {
      type: Object,
      default() {},
    },
  });

  function onTabsChange(e) {
    state.pagination = pagination;
    state.currentTab = e.index;
    state.categoryId = e.value;
    getGoodsList(state.categoryId);
  }
  async function getGoodsList(categoryId, page = 1, list_rows = 5) {
    state.loadStatus = 'loading';
    const res = await sheep.$api.goods.list({
      category_id: categoryId,
      list_rows,
      page,
      is_category_deep: false,
    });
    if (res.error === 0) {
      let couponlist = _.concat(state.pagination.data, res.data.data);
      state.pagination = {
        ...res.data,
        data: couponlist,
      };
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  async function getCoupon() {
    const { error, msg } = await sheep.$api.coupon.get(state.couponId);
    if (error === 0) {
      uni.showToast({
        title: msg,
      });
      setTimeout(() => {
        getCouponContent(state.couponId, state.userCouponId);
      }, 1000);
    }
  }
  async function getCouponContent(id, c) {
    const { data } = await sheep.$api.coupon.detail(id, c);
    state.list = data;
    data.items_value.forEach((i) => {
      state.tabMaps.push({ name: i.name, value: i.id });
    });
    state.pagination = pagination;
    if (state.list.use_scope == 'category') {
      getGoodsList(state.tabMaps[0].value);
    }
  }
  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getGoodsList(state.categoryId, state.pagination.current_page + 1);
    }
  }
  onLoad((options) => {
    state.couponId = options.id;
    state.userCouponId = options.user_coupon_id;
    getCouponContent(state.couponId, state.userCouponId);
  });
  // 上拉加载更多
  onReachBottom(() => {
    loadmore();
  });
</script>

<style lang="scss" scoped>
  .goods-title {
    font-size: 34rpx;
    font-weight: bold;
    color: #333333;
  }

  .detail-wrap {
    background: linear-gradient(
      180deg,
      var(--ui-BG-Main),
      var(--ui-BG-Main-gradient),
      var(--ui-BG-Main),
      #fff
    );
  }

  .detail-box {
    // background-color: var(--ui-BG);
    border-radius: 6rpx;
    position: relative;
    margin-top: 100rpx;
    .tag-box {
      width: 140rpx;
      height: 140rpx;
      background: var(--ui-BG);
      border-radius: 50%;
      position: absolute;
      top: -70rpx;
      left: 50%;
      z-index: 6;
      transform: translateX(-50%);

      .tag-image {
        width: 104rpx;
        height: 104rpx;
        border-radius: 50%;
      }
    }

    .top {
      background-color: #fff;
      border-radius: 20rpx 20rpx 0 0;
      -webkit-mask: radial-gradient(circle at 16rpx 100%, #0000 16rpx, red 0) -16rpx;
      padding: 110rpx 0 0 0;
      position: relative;
      z-index: 5;

      .title {
        font-size: 40rpx;
        color: #333;
        font-weight: bold;
      }

      .subtitle {
        font-size: 28rpx;
        color: #333333;
      }

      .use-btn {
        width: 386rpx;
        height: 80rpx;
        line-height: 80rpx;
        background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
        border-radius: 40rpx;
        color: $white;
      }

      .disable-btn {
        width: 386rpx;
        height: 80rpx;
        line-height: 80rpx;
        background: #e5e5e5;
        border-radius: 40rpx;
        color: $white;
      }

      .time {
        font-size: 26rpx;
        font-weight: 400;
        color: #999999;
      }

      .coupon-line {
        width: 95%;
        border-bottom: 2rpx solid #eeeeee;
      }
    }

    .bottom {
      background-color: #fff;
      border-radius: 0 0 20rpx 20rpx;
      -webkit-mask: radial-gradient(circle at 16rpx 0%, #0000 16rpx, red 0) -16rpx;
      padding: 40rpx 30rpx;

      .type {
        height: 96rpx;
        border-bottom: 2rpx solid #eeeeee;
      }
    }

    .des {
      font-size: 24rpx;
      font-weight: 400;
      color: #666666;
    }
  }

  .all-user {
    width: 100%;
    height: 300rpx;
    font-size: 34rpx;
    font-weight: bold;
    color: #333333;
  }
</style>
