<!-- 指定满减送的活动列表 -->
<template>
  <s-layout class="activity-wrap" :title="state.activityInfo.title">
    <!-- 活动信息 -->
    <su-sticky bgColor="#fff">
      <view class="ss-flex ss-col-top tip-box">
        <view class="type-text ss-flex ss-row-center">满减：</view>
        <view class="ss-flex-1">
          <view class="tip-content" v-for="item in state.activityInfo.rules" :key="item">
            {{ formatRewardActivityRule(state.activityInfo, item) }}
          </view>
        </view>
        <image class="activity-left-image" src="/static/activity-left.png" />
        <image class="activity-right-image" src="/static/activity-right.png" />
      </view>
    </su-sticky>

    <!-- 商品信息 -->
    <view class="ss-flex ss-flex-wrap ss-p-x-20 ss-m-t-20 ss-col-top">
      <view class="goods-list-box">
        <view class="left-list" v-for="item in state.leftGoodsList" :key="item.id">
          <s-goods-column class="goods-md-box" size="md" :data="item"
                          @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
                          @getHeight="mountMasonry($event, 'left')">
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn"> </button>
            </template>
          </s-goods-column>
        </view>
      </view>
      <view class="goods-list-box">
        <view class="right-list" v-for="item in state.rightGoodsList" :key="item.id">
          <s-goods-column class="goods-md-box" size="md" :data="item"
                          @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
                          @getHeight="mountMasonry($event, 'right')">
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn" />
            </template>
          </s-goods-column>
        </view>
      </view>
    </view>

    <uni-load-more v-if="state.pagination.total > 0" :status="state.loadStatus" :content-text="{
        contentdown: '上拉加载更多',
      }" @tap="loadMore" />
  </s-layout>
</template>
<script setup>
  import {
    reactive,
    toRaw,
    ref
  } from 'vue';
  import {
    onLoad,
    onReachBottom
  } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import _ from 'lodash-es';
  import RewardActivityApi from '@/sheep/api/promotion/rewardActivity';
  import {
    formatRewardActivityRule
  } from '@/sheep/hooks/useGoods';
  import SpuApi from '@/sheep/api/product/spu';

  const state = reactive({
    activityId: 0, // 获得编号
    activityInfo: {}, // 获得信息

    pagination: {
      list: [],
      total: 1,
      pageNo: 1,
      pageSize: 8,
    },
    loadStatus: '',
    leftGoodsList: [],
    rightGoodsList: [],
  });

  // 加载瀑布流
  let count = 0;
  let leftHeight = 0;
  let rightHeight = 0;

  function mountMasonry(height = 0, where = 'left') {
    if (!state.pagination.list[count]) return;

    if (where === 'left') {
      leftHeight += height;
    } else {
      rightHeight += height;
    }
    if (leftHeight <= rightHeight) {
      state.leftGoodsList.push(state.pagination.list[count]);
    } else {
      state.rightGoodsList.push(state.pagination.list[count]);
    }
    count++;
  }

  // 加载商品信息
  async function getList() {
    // state.loadStatus = 'loading';
    // 处理拓展参数
    const params = {}
    if (state.activityInfo.productScope === 2) {
      // const params = toRaw(state.activityInfo.productScopeValues)
      // 请求数据
      const {
        code,
        data
      } = await SpuApi.getSpuListByIds(state.activityInfo.productScopeValues.join(','));
      if (code !== 0) {
        return;
      }
      // 使用 map 提取每个对象的 id 属性
      const ids = data.map(item => item.id);
      // 使用 join 方法将 id 数组连接成一个用逗号分隔的字符串
      const idsString = ids.join(',');
      // 获取结算信息
      settleData.value = await getSettlementByIds(idsString)
      // 处理获得的数据
      const ms = enrichDataWithSkus(data, settleData.value)
      state.pagination.list = ms;
      // state.pagination.total = data.total;
      // state.loadStatus = state.pagination.list.length < state.pagination.total ? 'more' : 'noMore';
    } else if (state.activityInfo.productScope === 3) {
      params.categoryIds = state.activityInfo.productScopeValues.join(',');
      state.loadStatus = 'loading';
      const {
        code,
        data
      } = await SpuApi.getSpuPage({
        pageNo: state.pagination.pageNo,
        pageSize: state.pagination.pageSize,
        ...params,
      });
      if (code !== 0) {
        return;
      }
      // 使用 map 提取每个对象的 id 属性
      const ids = data.list.map(item => item.id);
      // 使用 join 方法将 id 数组连接成一个用逗号分隔的字符串
      const idsString = ids.join(',');
      // 获取结算信息
      settleData.value = await getSettlementByIds(idsString)
      // 处理获得的数据
      const ms = enrichDataWithSkus(data.list, settleData.value)
      state.pagination.list = _.concat(state.pagination.list, ms);
      state.pagination.total = data.total;
      state.loadStatus = state.pagination.list.length < state.pagination.total ? 'more' : 'noMore';
    } else {
      state.loadStatus = 'loading';
      const {
        code,
        data
      } = await SpuApi.getSpuPage({
        pageNo: state.pagination.pageNo,
        pageSize: state.pagination.pageSize,
      });
      if (code !== 0) {
        return;
      }
      // 使用 map 提取每个对象的 id 属性
      const ids = data.list.map(item => item.id);
      // 使用 join 方法将 id 数组连接成一个用逗号分隔的字符串
      const idsString = ids.join(',');
      // 获取结算信息
      settleData.value = await getSettlementByIds(idsString)
      // 处理获得的数据
      const ms = enrichDataWithSkus(data.list, settleData.value)
      state.pagination.list = _.concat(state.pagination.list, ms);
      state.pagination.total = data.total;
      state.loadStatus = state.pagination.list.length < state.pagination.total ? 'more' : 'noMore';
    }
    mountMasonry();
  }
  //获取结算信息
  const settleData = ref()
  async function getSettlementByIds(ids) {
    const {
      data
    } = await SpuApi.getSettlementProduct(ids);
    return data;
  }
  //计算展示价格的函数
  function enrichDataWithSkus(data, array) {
    // 创建一个映射，以 id 为键，存储 data 数组中的对象
    const dataMap = new Map(data.map(item => [item.id, {
      ...item
    }]));

    // 遍历 array 数组
    array.forEach(item => {
      // 初始化 discountPrice 和 vipPrice 为 null
      let discountPrice = null;
      let vipPrice = null;
      let foundType4 = false;
      let foundType6 = false;

      // 遍历 skus 数组，寻找 type 为 4 和 6 的首个条目
      item.skus.forEach(sku => {
        if (!foundType4 && sku.type === 4) {
          discountPrice = sku.price;
          foundType4 = true;
        }
        if (!foundType6 && sku.type === 6) {
          vipPrice = sku.price;
          foundType6 = true;
        }

        // 如果已经找到 type 为 4 和 6 的条目，则不需要继续遍历
        if (foundType4 && foundType6) {
          return;
        }
      });

      // 更新 dataMap 中对应的对象
      if (dataMap.has(item.id)) {
        dataMap.get(item.id).discountPrice = discountPrice;
        dataMap.get(item.id).vipPrice = vipPrice;
        dataMap.get(item.id).reward = item.reward;
      }
    });

    // 返回更新后的数据数组
    return Array.from(dataMap.values());
  }
  // 加载活动信息
  async function getActivity(id) {
    const {
      code,
      data
    } = await RewardActivityApi.getRewardActivity(id);
    if (code === 0) {
      state.activityInfo = data;
    }
  }

  // 加载更多
  function loadMore() {
    if (state.loadStatus === 'noMore') {
      return;
    }
    state.pagination.pageNo++;
    getList();
  }

  // 上拉加载更多
  onReachBottom(() => {
    loadMore();
  });

  onLoad(async (options) => {
    state.activityId = options.activityId;
    await getActivity(state.activityId);
    await getList();
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

  .tip-box {
    background: #fff0e7;
    padding: 20rpx;
    width: 100%;
    position: relative;
    box-sizing: border-box;

    .activity-left-image {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 58rpx;
      height: 36rpx;
    }

    .activity-right-image {
      position: absolute;
      top: 0;
      right: 0;
      width: 72rpx;
      height: 50rpx;
    }

    .type-text {
      font-size: 26rpx;
      font-weight: 500;
      color: #ff6000;
      line-height: 42rpx;
    }

    .tip-content {
      font-size: 26rpx;
      font-weight: 500;
      color: #ff6000;
      line-height: 42rpx;
    }
  }
</style>