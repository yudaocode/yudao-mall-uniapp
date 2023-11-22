<template>
  <view>
    <!-- 基础组件：搜索框 -->
    <s-search-block v-if="type === 'SearchBar'" :data="data" :styles="styles" :navbar="false" />
    <!-- 基础组件：公告栏 -->
    <s-notice-block v-if="type === 'NoticeBar'" :data="data" />
    <!-- 基础组件：菜单导航 -->
    <s-menu-button v-if="type === 'MenuSwiper'" :data="data" :styles="styles" />
    <!-- 基础组件：列表导航 -->
    <s-menu-list v-if="type === 'MenuList'" :data="data" />
    <!-- 基础组件：宫格导航 -->
    <s-menu-grid v-if="type === 'MenuGrid'" :data="data" />

    <!-- 图文组件：图片展示 -->
    <s-image-block v-if="type === 'ImageBar'" :data="data" :styles="styles" />
    <!-- 图文组件：图片轮播 -->
    <s-image-banner v-if="type === 'Carousel'" :data="data" :styles="styles" />
    <!-- 基础组件：标题栏 -->
    <s-title-block v-if="type === 'titleBlock'" :data="data" :styles="styles" />
    <!-- 图文组件：广告魔方 -->
    <s-image-cube v-if="type === 'MagicCube'" :data="data" :styles="styles" />
    <!-- 图文组件：视频播放 -->
    <s-video-block v-if="type === 'VideoPlayer'" :data="data" :styles="styles" />
    <!-- 基础组件：辅助线 -->
    <s-line-block v-if="type === 'lineBlock'" :data="data" />
    <!-- 图文组件：富文字 -->
    <s-richtext-block v-if="type === 'richtext'" :data="data" :styles="styles" />
    <!-- 图文组件：热区 -->
    <s-hotzone-block v-if="type === 'hotzone'" :data="data" :styles="styles" />

    <!-- 商品组件：商品卡片 -->
    <s-goods-card v-if="type === 'ProductCard'" :data="data" :styles="styles" />
    <!-- 商品组件：商品栏 -->
    <s-goods-shelves v-if="type === 'ProductList'" :data="data" :styles="styles" />

    <!-- 营销组件：拼团 -->
    <s-groupon-block v-if="type === 'groupon'" :data="data" :styles="styles" />
    <!-- 营销组件：秒杀 -->
    <s-seckill-block v-if="type === 'seckill'" :data="data" :styles="styles" />
    <!-- 营销组件：积分商城 -->
    <s-score-block v-if="type === 'scoreGoods'" :data="data" :styles="styles" />
    <!-- 营销组件：小程序直播 -->
    <s-live-block v-if="type === 'mplive'" :data="data" :styles="styles" />
    <!-- 营销组件：优惠券 -->
    <s-coupon-block v-if="type === 'CouponCard'" :data="data" :styles="styles" />

    <!-- 会员组件：会员卡片 -->
    <s-user-card v-if="type === 'userCard'" />
    <!-- 会员组件：订单卡片 -->
    <s-order-card v-if="type === 'orderCard'" :data="data" />
    <!-- 会员组件：资产卡片 -->
    <s-wallet-card v-if="type === 'walletCard'" />
    <!-- 会员组件：卡券卡片 -->
    <s-coupon-card v-if="type === 'couponCard'" />
  </view>
</template>

<script setup>
  /**
   * 装修组件 - 组件集
   */
  const props = defineProps({
    type: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default() {},
    },
    styles: {
      type: Object,
      default() {},
    },
  });
  function onSearch() {}
</script>

<style></style>
