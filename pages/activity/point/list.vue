<!-- 积分商城：商品列表  -->
<template>
  <s-layout title="积分商城" navbar="normal" :leftWidth="0" :rightWidth="0">
    <scroll-view
      class="scroll-box"
      :style="{ height: pageHeight + 'rpx' }"
      scroll-y="true"
      :scroll-with-animation="false"
      :enable-back-to-top="true"
    >
      <s-point-card ref="sPointCardRef" class="ss-p-x-20 ss-m-t-20" />
      <s-empty
        v-if="spuCount === 0 && loadStatus === 'noMore'"
        icon="/static/goods-empty.png"
        text="暂无积分商品"
      ></s-empty>
      <uni-load-more
        v-else
        :status="loadStatus"
        :content-text="{
          contentdown: '上拉加载更多',
        }"
        @tap="loadMore"
      />
    </scroll-view>
  </s-layout>
</template>
<script setup>
  import sheep from '@/sheep';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import PointApi from '@/sheep/api/promotion/point';
  import SLayout from '@/sheep/components/s-layout/s-layout.vue';

  // 计算页面高度
  const { safeAreaInsets, safeArea } = sheep.$platform.device;
  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  const pageHeight =
    (safeArea.height + safeAreaInsets.bottom) * 2 + statusBarHeight - sheep.$platform.navbar - 350;

  const sPointCardRef = ref();
  // 查询活动列表
  const activityPageParams = reactive({
    pageNo: 1, // 下一次要查询的页码，查询成功后才递增，失败重试不跳页
    pageSize: 5, // 每页数量
  });

  const activityTotal = ref(0); // 活动总数
  const activityCount = ref(0); // 已处理活动数量（含被跳过的无效商品），用于判断分页终止
  const spuCount = ref(0); // 已展示商品数量，用于判断空态
  const loadStatus = ref(''); // 页面加载状态
  async function getActivityList() {
    // 加载中不重复请求
    if (loadStatus.value === 'loading') {
      return;
    }
    loadStatus.value = 'loading';
    try {
      const { code, data } = (await PointApi.getPointActivityPage(activityPageParams)) || {};
      if (code !== 0 || !data) {
        loadStatus.value = 'more';
        return;
      }
      const list = data.list || [];
      await sPointCardRef.value.concatActivity(list);
      activityPageParams.pageNo += 1;
      activityCount.value += list.length;
      activityTotal.value = data.total;
      const lastSpuCount = spuCount.value;
      spuCount.value = sPointCardRef.value.getActivityCount();
      // 空页也视为结束，避免 total 与实际数据不一致时无限翻页
      loadStatus.value =
        list.length > 0 && activityCount.value < activityTotal.value ? 'more' : 'noMore';
      // 本页商品全部无效时，自动加载下一页，避免无商品却停在“上拉加载更多”
      if (loadStatus.value === 'more' && spuCount.value === lastSpuCount) {
        await getActivityList();
      }
    } catch (e) {
      console.error('[积分商城] 加载活动列表失败', e);
      loadStatus.value = 'more';
    }
  }

  // 加载更多
  function loadMore() {
    if (loadStatus.value !== 'noMore') {
      getActivityList();
    }
  }

  // 上拉加载更多
  onReachBottom(() => {
    loadMore();
  });
  onLoad(() => {
    getActivityList();
  });
</script>
