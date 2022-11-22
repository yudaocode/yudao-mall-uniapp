<template>
  <navbar
    :alway="isAlway"
    :back="false"
    bg=""
    :placeholder="isPlaceholder"
    :bgStyles="bgStyles"
    :opacity="isOpacity"
    :sticky="sticky"
  >
    <template #item>
      <view class="nav-box">
        <view
          class="nav-item"
          v-for="(item, index) in navList"
          :key="index"
          :style="[parseImgStyle(item)]"
          :class="[{ 'ss-flex ss-col-center ss-row-center': item.type !== 'search' }]"
        >
          <navbar-item :data="item" :width="parseImgStyle(item).width" />
        </view>
      </view>
    </template>
  </navbar>
</template>

<script setup>
  /**
   *  装修组件 - 自定义标题栏
   *
   *
   * @property {Number | String}  alwaysShow = [0,1]			    - 是否常驻
   * @property {Number | String}  mode = [inner]			    	- 是否沉浸式
   * @property {String | Number} type 		 					- 标题背景模式
   * @property {String} color 		 							- 页面背景色
   * @property {String} src 		 								- 页面背景图片
   */
  import { computed, unref } from 'vue';
  import sheep from '@/sheep';
  import Navbar from './components/navbar.vue';
  import NavbarItem from './components/navbar-item.vue';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });
  const sticky = computed(() => {
    if (props.data.mode == 'inner') {
      if (props.data.alway) {
        return false;
      }
    }
    if (props.data.mode == 'normal') {
      return false;
    }
  });
  const navList = computed(() => {
    if (!props.data.list) return [];
    // #ifdef MP
    return props.data.list.mp;
    // #endif
    return props.data.list.app;
  });
  // 单元格大小
  const windowWidth = sheep.$platform.device.windowWidth;
  const cell = computed(() => {
    if (unref(navList).length) {
      let cell = (windowWidth - 90) / 8;
      // #ifdef MP
      cell = (windowWidth - 80 - unref(sheep.$platform.capsule).width) / 6;
      // #endif
      return cell;
    }
  });
  // 解析位置
  const parseImgStyle = (item) => {
    let obj = {
      width: item.width * cell.value + (item.width - 1) * 10 + 'px',
      left: item.left * cell.value + (item.left + 1) * 10 + 'px',
      'border-radius': item.borderRadius + 'px',
    };
    return obj;
  };
  const isAlway = computed(() =>
    props.data.mode === 'inner' ? Boolean(props.data.alwaysShow) : true,
  );
  const isOpacity = computed(() =>
    props.data.mode === 'normal' ? false : props.data.mode === 'inner',
  );
  const isPlaceholder = computed(() => props.data.mode === 'normal');
  const bgStyles = computed(() => {
    if (props.data.type) {
      return {
        background:
          props.data.type == 'color'
            ? props.data.color
            : `url(${sheep.$url.cdn(props.data.src)}) no-repeat top center / 100% 100%`,
      };
    }
  });
</script>

<style lang="scss" scoped>
  .nav-box {
    width: 750rpx;
    position: relative;
    height: 100%;

    .nav-item {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
