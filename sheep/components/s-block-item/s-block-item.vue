<template>
  <view>
    <s-image-block v-if="type === 'imageBlock'" :data="data" :styles="styles" />
    <s-image-banner v-if="type === 'imageBanner'" :data="data" :styles="styles" />
    <s-video-block v-if="type === 'videoPlayer'" :data="data" :styles="styles" />
    <s-image-cube v-if="type === 'imageCube'" :data="data" :styles="styles" />

    <s-notice-block v-if="type === 'noticeBlock'" :data="data" />
    <s-search-block v-if="type === 'searchBlock'" :data="data" :navbar="false" />
    <s-title-block v-if="type === 'titleBlock'" :data="data" :styles="styles" />
    <s-line-block v-if="type === 'lineBlock'" :data="data" />

    <s-menu-button v-if="type === 'menuButton'" :data="data" :styles="styles" />
    <s-menu-list v-if="type === 'menuList'" :data="data" />
    <s-menu-grid v-if="type === 'menuGrid'" :data="data" />

    <s-user-card v-if="type === 'userCard'" />
    <s-wallet-card v-if="type === 'walletCard'" />
    <s-order-card v-if="type === 'orderCard'" :data="data" />

    <s-coupon-card v-if="type === 'couponCard'" />
    <s-goods-card v-if="type === 'goodsCard'" :data="data" :styles="styles" />
    <s-score-block v-if="type === 'scoreGoods'" :data="data" :styles="styles" />
    <s-goods-shelves v-if="type === 'goodsShelves'" :data="data" :styles="styles" />
    <s-coupon-block v-if="type === 'coupon'" :data="data" :styles="styles"></s-coupon-block>
    <s-live-block v-if="type === 'mplive'" :data="data" :styles="styles"></s-live-block>
    <s-seckill-block v-if="type === 'seckill'" :data="data" :styles="styles"></s-seckill-block>
    <s-groupon-block v-if="type === 'groupon'" :data="data" :styles="styles"></s-groupon-block>
    <s-richtext-block v-if="type === 'richtext'" :data="data" :styles="styles"></s-richtext-block>
    <s-hotzone-block v-if="type === 'hotzone'" :data="data" :styles="styles"></s-hotzone-block>

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
