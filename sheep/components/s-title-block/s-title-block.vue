<!-- 页面 -->
<template>
  <view
    class="ss-title-wrap ss-flex ss-col-center"
    :class="[state.typeMap[data.location]]"
    :style="[elStyles]"
  >
    <view class="title-content">
      <view v-if="data.title.text" class="title-text" :style="[titleStyles]">{{
        data.title.text
      }}</view>
      <view v-if="data.subtitle.text" :style="[subtitleStyles]" class="sub-title-text">
        {{ data.subtitle.text }}
      </view>
    </view>
    <view v-if="data.more.show" class="more-box ss-flex ss-col-center">
      <view class="more-text">查看更多</view>
      <text class="_icon-forward"></text>
    </view>
  </view>
</template>

<script setup>
  /**
   *
   * 标题栏
   *
   * @property {String} title 				- 标题
   * @property {String} subTitle 				- 副标题
   * @property {Number} height 				- 高度
   * @property {String} Type = [left | right | center | between]					- 样式
   *
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
    data: {
      type: Object,
      default() {},
    },
    styles: {
      type: Object,
      default() {},
    },
    height: {
      type: Number,
      default: 100,
    },
  });

  // 组件样式
  const elStyles = {
    background: `url(${sheep.$url.cdn(props.data.src)}) no-repeat top center / 100% auto`,
    height: props.styles.height + 'px',
    fontStyle: props.data.title.other.includes('italic') ? 'italic' : 'normal',
    fontWeight: props.data.title.other.includes('bold') ? 'bold' : '',
  };

  // 标题样式
  const titleStyles = {
    color: props.data.title.color,
    fontSize: props.data.title.textFontSize + 'px',
    textAlign: props.data.location,
    marginLeft: props.data.skew + 'px',
  };

  // 副标题
  const subtitleStyles = {
    color: props.data.subtitle.color,
    fontSize: props.data.subtitle.textFontSize + 'px',
    textAlign: props.data.location,
    fontStyle: props.data.subtitle.other.includes('italic') ? 'italic' : 'normal',
    fontWeight: props.data.subtitle.other.includes('bold') ? 'bold' : '',
  };
</script>

<style lang="scss" scoped>
  .ss-title-wrap {
    height: 80rpx;
    position: relative;

    .title-content {
      .title-text {
        font-size: 30rpx;
        color: #333;
      }

      .sub-title-text {
        font-size: 22rpx;
        color: #999;
      }
    }

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
