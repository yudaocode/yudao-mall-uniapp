<template>
  <s-layout
    navbar="normal"
    :leftWidth="0"
    :rightWidth="0"
    tools="search"
    :defaultSearch="state.keyword"
    @search="onSearch"
  >
    <!-- 筛选 -->
    <su-sticky bgColor="#fff">
      <view class="ss-flex">
        <view class="ss-flex-1">
          <su-tabs
            :list="state.tabList"
            :scrollable="false"
            @change="onTabsChange"
            :current="state.currentTab"
          ></su-tabs>
        </view>
        <view class="list-icon" @tap="state.iconStatus = !state.iconStatus">
          <text v-if="state.iconStatus" class="sicon-goods-list"></text>
          <text v-else class="sicon-goods-card"></text>
        </view>
      </view>
    </su-sticky>

    <!-- 弹窗 -->
    <su-popup
      :show="state.showFilter"
      type="top"
      round="10"
      :space="sys_navBar + 38"
      backgroundColor="#F6F6F6"
      :zIndex="10"
      @close="state.showFilter = false"
    >
      <view class="filter-list-box">
        <view
          class="filter-item"
          v-for="(item, index) in state.tabList[state.currentTab].list"
          :key="item.value"
          :class="[{ 'filter-item-active': index == state.curFilter }]"
          @tap="onFilterItem(index)"
        >
          {{ item.label }}
        </view>
      </view>
    </su-popup>
    <view v-if="state.iconStatus && state.pagination.total > 0" class="goods-list ss-m-t-20">
      <view
        class="ss-p-l-20 ss-p-r-20 ss-m-b-20"
        v-for="item in state.pagination.data"
        :key="item.id"
      >
        <s-goods-column
          class=""
          size="lg"
          :data="item"
          :topRadius="10"
          :bottomRadius="10"
          @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
        ></s-goods-column>
      </view>
    </view>
    <view
      v-if="!state.iconStatus && state.pagination.total > 0"
      class="ss-flex ss-flex-wrap ss-p-x-20 ss-m-t-20 ss-col-top"
    >
      <view class="goods-list-box">
        <view class="left-list" v-for="item in state.leftGoodsList" :key="item.id">
          <s-goods-column
            class="goods-md-box"
            size="md"
            :data="item"
            :topRadius="10"
            :bottomRadius="10"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            @getHeight="mountMasonry($event, 'left')"
          >
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn"> </button>
            </template>
          </s-goods-column>
        </view>
      </view>
      <view class="goods-list-box">
        <view class="right-list" v-for="item in state.rightGoodsList" :key="item.id">
          <s-goods-column
            class="goods-md-box"
            size="md"
            :topRadius="10"
            :bottomRadius="10"
            :data="item"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            @getHeight="mountMasonry($event, 'right')"
          >
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn"> </button>
            </template>
          </s-goods-column>
        </view>
      </view>
    </view>
    <uni-load-more
      v-if="state.pagination.total > 0"
      :status="state.loadStatus"
      :content-text="{
        contentdown: '上拉加载更多',
      }"
      @tap="loadmore"
    />
    <s-empty v-if="state.pagination.total === 0" icon="/static/soldout-empty.png" text="暂无商品">
    </s-empty>
  </s-layout>
</template>

<script setup>
  import { reactive } from 'vue';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import _ from 'lodash';

  const sys_navBar = sheep.$platform.navbar;
  const emits = defineEmits(['close', 'change']);

  const pagination = {
    data: [],
    current_page: 1,
    total: 1,
    last_page: 1,
  };
  const state = reactive({
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    currentSort: 'weigh',
    currentOrder: 'desc',
    currentTab: 0,
    filterParams: {},
    curFilter: 0,
    showFilter: false,
    iconStatus: false,
    categoryId: 0,
    tabList: [
      {
        name: '综合推荐',
        value: 'weigh',
        list: [
          {
            label: '综合推荐',
            sort: 'weigh',
            order: 'desc',
          },
          {
            label: '价格升序',
            sort: 'price',
            order: 'asc',
          },
          {
            label: '价格降序',
            sort: 'price',
            order: 'desc',
          },
        ],
      },
      {
        name: '销量',
        value: 'total_sales',
      },
      {
        name: '新品优先',
        value: 'create_time',
      },
    ],
    loadStatus: '',
    keyword: '',
    leftGoodsList: [],
    rightGoodsList: [],
  });

  // 加载瀑布流
  let count = 0;
  let leftHeight = 0;
  let rightHeight = 0;

  function mountMasonry(height = 0, where = 'left') {
    if (!state.pagination.data[count]) return;

    if (where === 'left') {
      leftHeight += height;
    } else {
      rightHeight += height;
    }
    if (leftHeight <= rightHeight) {
      state.leftGoodsList.push(state.pagination.data[count]);
    } else {
      state.rightGoodsList.push(state.pagination.data[count]);
    }
    count++;
  }

  function emptyList() {
    state.pagination = pagination
    state.leftGoodsList = [];
    state.rightGoodsList = [];
    count = 0;
    leftHeight = 0;
    rightHeight = 0;
  }
  //搜索
  function onSearch(e) {
    state.keyword = e;
    emptyList();
    getList(state.currentSort, state.currentOrder, state.categoryId, e);
  }

  // 点击
  function onTabsChange(e) {
    if (state.tabList[e.index].list) {
      state.currentTab = e.index;
      state.showFilter = !state.showFilter;
      return;
    } else {
      state.showFilter = false;
    }
    if (e.index === state.currentTab) {
      return;
    } else {
      state.currentTab = e.index;
    }
    emptyList();

    getList(e.value, state.currentOrder, state.categoryId, state.keyword);
  }

  // 点击筛选项
  const onFilterItem = (val) => {
    if (
      state.currentSort === state.tabList[0].list[val].sort &&
      state.currentOrder === state.tabList[0].list[val].order
    ) {
      state.showFilter = false;
      return;
    }
    state.curFilter = val;
    state.tabList[0].name = state.tabList[0].list[val].label;
    state.currentSort = state.tabList[0].list[val].sort;
    state.currentOrder = state.tabList[0].list[val].order;
    emptyList();
    getList(state.currentSort, state.currentOrder, state.categoryId, state.keyword);
    state.showFilter = false;
  };

  async function getList(Sort, Order, categoryId, keyword, page = 1, list_rows = 6) {
    state.loadStatus = 'loading';
    const res = await sheep.$api.goods.list({
      sort: Sort,
      order: Order,
      category_id: !keyword ? categoryId : '',
      list_rows,
      keyword: keyword,
      page,
    });
    if (res.error === 0) {
        let couponList = _.concat(state.pagination.data, res.data.data);
        state.pagination = {
          ...res.data,
          data: couponList,
        };
      mountMasonry();
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
      getList(
        state.currentSort,
        state.currentOrder,
        state.categoryId,
        state.keyword,
        state.pagination.current_page + 1,
      );
    }
  }
  onLoad((options) => {
    state.categoryId = options.categoryId;
    state.keyword = options.keyword;
    getList(state.currentSort, state.currentOrder, state.categoryId, state.keyword);
  });
  // 上拉加载更多
  onReachBottom(() => {
    loadmore();
  });
</script>

<style lang="scss" scoped>
  .goods-list-box {
    width: 50%;
    box-sizing: border-box;
    .left-list {
      margin-right: 10rpx;
      margin-bottom: 20rpx;
    }
    .right-list {
      margin-left: 10rpx;
      margin-bottom: 20rpx;
    }
  }
  .goods-box {
    &:nth-last-of-type(1) {
      margin-bottom: 0 !important;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
  .list-icon {
    width: 80rpx;
    .sicon-goods-card {
      font-size: 40rpx;
    }
    .sicon-goods-list {
      font-size: 40rpx;
    }
  }
  .goods-card {
    margin-left: 20rpx;
  }
  .list-filter-tabs {
    background-color: #fff;
  }
  .filter-list-box {
    padding: 28rpx 52rpx;
    .filter-item {
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      line-height: normal;
      margin-bottom: 24rpx;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
    .filter-item-active {
      color: var(--ui-BG-Main);
    }
  }
  .tab-item {
    height: 50px;
    position: relative;
    z-index: 11;

    .tab-title {
      font-size: 30rpx;
    }

    .cur-tab-title {
      font-weight: $font-weight-bold;
    }

    .tab-line {
      width: 60rpx;
      height: 6rpx;
      border-radius: 6rpx;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10rpx;
      background-color: var(--ui-BG-Main);
      z-index: 12;
    }
  }
</style>
