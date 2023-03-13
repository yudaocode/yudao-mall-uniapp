<template>
  <s-layout title="商品收藏">
    <view class="cart-box ss-flex ss-flex-col ss-row-between">
      <!-- 头部 -->
      <view class="cart-header ss-flex ss-col-center ss-row-between ss-p-x-30">
        <view class="header-left ss-flex ss-col-center ss-font-26">
          共
          <text class="goods-number ui-TC-Main ss-flex">{{ state.pagination.total }}</text>
          件商品
        </view>
        <view class="header-right">
          <button
            v-if="state.editMode && state.pagination.total"
            class="ss-reset-button"
            @tap="state.editMode = false"
          >
            取消
          </button>
          <button
            v-if="!state.editMode && state.pagination.total"
            class="ss-reset-button ui-TC-Main"
            @tap="state.editMode = true"
            >编辑</button
          >
        </view>
      </view>
      <!-- 内容 -->
      <view class="cart-content">
        <view
          class="goods-box ss-r-10 ss-m-b-14"
          v-for="item in state.pagination.data"
          :key="item.id"
        >
          <view class="ss-flex ss-col-center">
            <radio-group
              class="check-box ss-flex ss-col-center ss-p-l-10"
              @change="onSelect(item.goods_id)"
              v-show="state.editMode"
            >
              <label class="radio">
                <radio
                  :checked="state.selectedCollectList.includes(item.goods_id)"
                  color="var(--ui-BG-Main)"
                  style="transform: scale(0.8)"
                />
              </label>
            </radio-group>
            <s-goods-item
              :title="item.goods.title"
              :img="item.goods.image"
              price="666"
              skuText="123"
              priceColor="#FF3000"
              :titleWidth="400"
              @tap="
                sheep.$router.go('/pages/goods/index', {
                  id: item.goods_id,
                })
              "
            >
            </s-goods-item>
          </view>
        </view>
      </view>
      <!-- 底部 -->
      <su-fixed bottom :val="0" placeholder v-show="state.editMode">
        <view class="cart-footer ss-flex ss-col-center ss-row-between ss-p-x-30 border-bottom">
          <view class="footer-left ss-flex ss-col-center">
            <radio-group @change="onSelectAll">
              <label class="check-box ss-flex ss-col-center ss-p-r-30">
                <radio
                  :checked="state.selectAll"
                  color="var(--ui-BG-Main)"
                  style="transform: scale(0.7)"
                />
                <view> 全选 </view>
              </label>
            </radio-group>
          </view>
          <view class="footer-right">
            <button
              class="ss-reset-button ui-BG-Main-Gradient pay-btn ss-font-28 ui-Shadow-Main"
              @tap="onCancel"
              >取消收藏</button
            >
          </view>
        </view>
      </su-fixed>
    </view>
    <uni-load-more
      v-if="state.pagination.total > 0"
      :status="state.loadStatus"
      :content-text="{
        contentdown: '上拉加载更多',
      }"
      @tap="loadmore"
    />
    <s-empty v-if="state.pagination.total === 0" text="暂无收藏" icon="/static/collect-empty.png" />
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { reactive } from 'vue';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import _ from 'lodash';

  const sys_navBar = sheep.$platform.navbar;
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
    loadStatus: '',
    editMode: false,
    selectedCollectList: [],
    selectAll: false,
  });

  async function getData(page = 1, list_rows = 6) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.user.favorite.list({
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
  // 格式化价格
  function formatPrice(e) {
    return e.length === 1 ? e[0] : e.join('~');
  }

  // 单选选中
  const onSelect = (id) => {
    if (!state.selectedCollectList.includes(id)) {
      state.selectedCollectList.push(id);
    } else {
      state.selectedCollectList.splice(state.selectedCollectList.indexOf(id), 1);
    }
    state.selectAll = state.selectedCollectList.length === state.pagination.data.length;
  };
  // 全选
  const onSelectAll = () => {
    state.selectAll = !state.selectAll;
    if (!state.selectAll) {
      state.selectedCollectList = [];
    } else {
      state.pagination.data.forEach((item) => {
        if (state.selectedCollectList.includes(item.goods_id)) {
          state.selectedCollectList.splice(state.selectedCollectList.indexOf(item.goods_id), 1);
        }
        state.selectedCollectList.push(item.goods_id);
      });
    }
  };
  async function onCancel() {
    if (state.selectedCollectList) {
      state.selectedCollectList = state.selectedCollectList.toString();
      const { error } = await sheep.$api.user.favorite.cancel(state.selectedCollectList);
      if (error === 0) {
        state.editMode = false;
        state.selectedCollectList = [];
        state.selectAll = false;
        state.pagination = pagination;
        getData();
      }
    }
  }
  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getData(state.pagination.current_page + 1);
    }
  }
  onReachBottom(() => {
    loadmore();
  });
  onLoad(() => {
    getData();
  });
</script>

<style lang="scss" scoped>
  .cart-box {
    .cart-header {
      height: 70rpx;
      background-color: #f6f6f6;
      width: 100%;
      position: fixed;
      left: 0;
      top: v-bind('sys_navBar') rpx;
      z-index: 1000;
      box-sizing: border-box;
    }

    .cart-footer {
      height: 100rpx;
      background-color: #fff;

      .pay-btn {
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 40rpx;
        padding: 0 40rpx;
        min-width: 200rpx;
      }
    }

    .cart-content {
      width: 100%;
      margin-top: 70rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      .goods-box {
        background-color: #fff;
        &:last-child {
          margin-bottom: 40rpx;
        }
      }
    }
  }
</style>
