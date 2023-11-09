<template>
  <view
    class="search-content ss-flex ss-col-center ss-row-between"
    @tap="click"
    :style="[
      {
        borderRadius: radius + 'px',
        background: elBackground,
        height: height + 'px',
        width: width,
      },
    ]"
    :class="[{ 'border-content': navbar }]"
  >
    <view class="ss-flex ss-col-center" v-if="navbar">
      <view class="search-icon _icon-search ss-m-l-10" :style="[{ color: props.iconColor }]"></view>
      <view class="search-input ss-flex-1 ss-line-1" :style="[{ color: fontColor, width: width }]">
        {{ placeholder }}
      </view>
    </view>
    <uni-search-bar
      v-if="!navbar"
      class="ss-flex-1"
      :radius="data.borderRadius"
      :placeholder="data.placeholder"
      cancelButton="none"
      clearButton="none"
      @confirm="onSearch"
      v-model="state.searchVal"
    />
    <view class="keyword-link ss-flex">
      <view v-for="(item, index) in data.hotKeywords" :key="index">
        <view
          class="ss-m-r-16"
          :style="[{ color: data.textColor }]"
          @tap.stop="sheep.$router.go('/pages/goods/list', { keyword: item })"
          >{{ item }}</view
        >
      </view>
    </view>
    <view v-if="data.hotKeywords && data.hotKeywords.length && navbar" class="ss-flex">
      <button
        class="ss-reset-button keyword-btn"
        v-for="(item, index) in data.hotKeywords"
        :key="index"
        :style="[{ color: data.textColor, marginRight: '10rpx' }]"
      >
        {{ item }}
      </button>
    </view>
  </view>
</template>

<script setup>
  /**
   * 基础组件 - 搜索栏
   *
   * @property {String} elBackground 			- 输入框背景色
   * @property {String} iconColor 			- 图标颜色
   * @property {String} fontColor 		  	- 字体颜色
   * @property {Number} placeholder 			- 默认placeholder
   * @property {Number} topRadius 			- 组件上圆角
   * @property {Number} bottomRadius 			- 组件下圆角
   *
   * @slot keywords							- 关键字
   * @event {Function} click 					- 点击组件时触发
   */

  import { computed, reactive } from 'vue';
  import sheep from '@/sheep';

  // 组件数据
  const state = reactive({
    searchVal: '',
  });

  // 事件页面
  const emits = defineEmits(['click']);

  // 接收参数
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
    // 输入框背景色
    elBackground: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 36,
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: '#b0b3bf',
    },
    // 字体颜色
    fontColor: {
      type: String,
      default: '#b0b3bf',
    },
    // placeholder
    placeholder: {
      type: String,
      default: '这是一个搜索框',
    },
    radius: {
      type: Number,
      default: 10,
    },
    width: {
      type: String,
      default: '100%',
    },
    navbar: {
      type: Boolean,
      default: true,
    },
  });

  // 点击
  const click = () => {
    emits('click');
  };

  function onSearch(e) {
    if (e.value) {
      sheep.$router.go('/pages/goods/list', { keyword: e.value });
      setTimeout(() => {
        state.searchVal = '';
      }, 100);
    }
  }
</script>

<style lang="scss" scoped>
  .border-content {
    border: 2rpx solid #eee;
  }

  .search-content {
    flex: 1;
    // height: 80rpx;
    position: relative;

    .search-icon {
      font-size: 38rpx;
      margin-right: 20rpx;
    }

    .keyword-link {
      position: absolute;
      right: 16rpx;
      top: 18rpx;
    }

    .search-input {
      font-size: 28rpx;
    }
  }
</style>
