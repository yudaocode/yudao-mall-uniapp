<!-- 页面  -->
<template>
  <s-layout title="推广商品" :onShareAppMessage="state.shareInfo">
    <view class="goods-item ss-m-20" v-for="item in state.pagination.data" :key="item.id">
      <s-goods-item
        size="lg"
        :img="item.image"
        :title="item.title"
        :subTitle="item.subtitle"
        :price="item.price[0]"
        :originPrice="item.original_price"
        priceColor="#333"
        @tap="sheep.$router.go('/pages/goods/index', { id: item.id })"
      >
        <template #rightBottom>
          <view class="ss-flex ss-row-between">
            <view class="commission-num">预计佣金：￥{{ item.commission }}</view>
            <button
              class="ss-reset-button share-btn ui-BG-Main-Gradient"
              @tap.stop="onShareGoods(item)"
            >
              分享赚
            </button>
          </view>
        </template>
      </s-goods-item>
    </view>
    <s-empty
      v-if="state.pagination.total === 0"
      icon="/static/goods-empty.png"
      text="暂无推广商品"
    ></s-empty>
    <!-- 加载更多 -->
    <uni-load-more
      v-if="state.pagination.total > 0"
      :status="state.loadStatus"
      :content-text="{
        contentdown: '上拉加载更多',
      }"
      @tap="loadmore"
    />
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import $share from '@/sheep/platform/share';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import _ from 'lodash';
  import { showShareModal } from '@/sheep/hooks/useModal';

  const state = reactive({
    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
    shareInfo: {},
  });

  function onShareGoods(goodsInfo) {
    state.shareInfo = $share.getShareInfo(
      {
        title: goodsInfo.title,
        image: sheep.$url.cdn(goodsInfo.image),
        desc: goodsInfo.subtitle,
        params: {
          page: '2',
          query: goodsInfo.id,
        },
      },
      {
        type: 'goods', // 商品海报
        title: goodsInfo.title, // 商品标题
        image: sheep.$url.cdn(goodsInfo.image), // 商品主图
        price: goodsInfo.price[0], // 商品价格
        original_price: goodsInfo.original_price, // 商品原价
      },
    );
    showShareModal();
  }

  async function getGoodsList(page = 1, list_rows = 8) {
    state.loadStatus = 'loading';
    let res = await sheep.$api.commission.goods({
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
    getGoodsList();
  });

  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getGoodsList(state.pagination.current_page + 1);
    }
  }

  // 上拉加载更多
  onReachBottom(() => {
    loadmore();
  });
</script>

<style lang="scss" scoped>
  .goods-item {
    .commission-num {
      font-size: 24rpx;
      font-weight: 500;
      color: $red;
    }

    .share-btn {
      width: 120rpx;
      height: 50rpx;
      border-radius: 25rpx;
    }
  }
</style>
