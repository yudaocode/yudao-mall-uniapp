<template>
  <s-layout
    :title="page.name"
    navbar="custom"
    :bgStyle="page.style?.background"
    :navbarStyle="page.style?.navbar"
    onShareAppMessage
    showLeftButton
  >
    <s-block v-for="(item, index) in page.list" :key="index" :styles="item.style">
      <s-block-item :type="item.type" :data="item.data" :styles="item.style" />
    </s-block>
  </s-layout>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import sheep from '@/sheep';
  import { onLoad, onPageScroll } from '@dcloudio/uni-app';

  const page = reactive({
    name: '',
    list: [],
    style: {},
  });
  onLoad(async (options) => {
    let id;

    if (options.id) {
      id = options.id;
    }

    // #ifdef MP
    // 小程序预览自定义页面
    if (options.scene) {
      const sceneParams = decodeURIComponent(options.scene).split('=');
      id = sceneParams[1];
    }
    // #endif

    const { error, data } = await sheep.$api.app.page(id);
    if (error === 0) {
      page.name = data.name;
      page.list = data.diypage?.page?.data;
      page.style = data.diypage?.page?.style;
    }
  });

  onPageScroll(() => {});
</script>

<style></style>
