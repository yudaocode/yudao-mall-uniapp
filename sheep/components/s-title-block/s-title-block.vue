<!-- 装修商品组件：标题栏 -->
<template>
  <view
    class="ss-title-wrap ss-flex ss-col-center"
    :class="[state.typeMap[data.textAlign]]"
    :style="[bgStyle, { marginLeft: `${data.space}px` }]"
  >
    <view class="title-content">
      <!-- 主标题 -->
      <view
        v-if="data.title"
        :style="{
          fontSize: `${data.titleSize}px`,
          fontWeight: data.titleWeight,
          color: data.titleColor,
          textAlign: data.textAlign
      }"
        class="title-text"
      >
        {{ data.title }}
      </view>
      <!-- 副标题 -->
      <view
        v-if="data.description"
        :style="{
          fontSize: `${data.descriptionSize}px`,
          fontWeight: data.descriptionWeight,
          color: data.descriptionColor,
          textAlign: data.textAlign
        }"
        class="sub-title-text"
      >
        {{ data.description }}
      </view>
    </view>
    <!-- 查看更多 -->
    <view
      v-if="data.more?.show"
      class="more-box ss-flex ss-col-center"
      @tap="sheep.$router.go(data.more.url)"
      :style="{ color: data.descriptionColor }"
    >
      <view v-if="data.more.type !== 'icon'" class="more-text">{{ data.more.text }}</view>
      <text class="_icon-forward" v-if="data.more.type !== 'text'"></text>
    </view>
  </view>
</template>

<script setup>
  /**
   * 标题栏
   */
  import { computed, reactive } from 'vue';
  import sheep from '@/sheep';

  // 数据
  const state = reactive({
    typeMap: {
      left: 'ss-row-left',
      center: 'ss-row-center',
    },
  });

  // 接收参数
  const props = defineProps({
    // 装修数据
    data: {
      type: Object,
      default: () => ({}),
    },
    // 装修样式
    styles: {
      type: Object,
      default: () => ({}),
    },
  });
  // 设置背景样式
  const bgStyle = computed(() => {
    // 直接从 props.styles 解构
    const { bgType, bgImg, bgColor } = props.styles;

    // 根据 bgType 返回相应的样式
    return {
      background: bgType === 'img' ? `url(${bgImg}) no-repeat top center / 100% 100%` : bgColor,
    };
  });
</script>

<style lang="scss" scoped>
  .ss-title-wrap {
    min-height: 80rpx;
    position: relative;

    .more-box {
      white-space: nowrap;
      font-size: 22rpx;
      color: #999;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20rpx;
    }
  }
</style>
