<!-- 文章展示 -->
<template>
  <s-layout class="set-wrap" :title="state.title" :bgStyle="{ color: '#FFF' }">
    <view class="ss-p-30">
      <mp-html class="richtext" :content="state.content" />
    </view>
  </s-layout>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import ArticleApi from '@/sheep/api/promotion/article';

  const state = reactive({
    title: '',
    content: '',
  });

  async function getRichTextContent(id, title) {
    const { code, data } = await ArticleApi.getArticle(id, title);
    if (code !== 0) {
      return;
    }
    state.content = data.content;
    // 标题不一致时，修改标题
    if (state.title !== data.title) {
      state.title = data.title;
      uni.setNavigationBarTitle({
        title: state.title,
      });
    }
  }

  onLoad((options) => {
    if (options.title) {
      state.title = options.title;
      uni.setNavigationBarTitle({
        title: state.title,
      });
    }
    getRichTextContent(options.id, options.title);
  });

</script>

<style lang="scss" scoped>
  .set-title {
    margin: 0 30rpx;
  }

  .richtext {
  }
</style>
