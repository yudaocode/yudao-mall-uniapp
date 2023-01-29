<template>
  <s-layout class="set-wrap" :title="state.title" :bgStyle="{ color: '#FFF' }">
    <view class="ss-p-30"><mp-html class="richtext" :content="state.content"></mp-html></view>
  </s-layout>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import sheep from '@/sheep';

  const state = reactive({
    title: '',
    content: '',
  });

  async function getRichTextContent(id) {
    const { error, data } = await sheep.$api.data.richtext(id);
    if (error === 0) {
      state.content = data.content;
      if (state.title === '') {
        state.title = data.title;
        uni.setNavigationBarTitle({
          title: state.title,
        });
      }
    }
  }
  onLoad((options) => {
    if (options.title) {
      state.title = options.title;
      uni.setNavigationBarTitle({
        title: state.title,
      });
    }
    getRichTextContent(options.id);
  });
</script>

<style lang="scss" scoped>
  .set-title {
    margin: 0 30rpx;
  }

  .richtext {
  }
</style>
