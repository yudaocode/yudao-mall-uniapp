<template>
  <!-- TODO-jj: 点击遮罩关闭 -->
  <view>
    <view v-if="data?.show === 1">
      <uni-fab
        ref="fabRef"
        :pattern="state.pattern"
        :content="state.content"
        horizontal="right"
        vertical="bottom"
        :direction="state.direction"
        @trigger="trigger"
        @fabClick="fabClick"
        :popMenu="true"
      ></uni-fab>
    </view>
    <view :class="state.show ? 'float-bg' : ''" @click="onTap"></view>
  </view>
</template>
<script setup>
  import sheep from '@/sheep';
  import { computed, reactive, ref, unref, getCurrentInstance } from 'vue';
  import { onBackPress } from '@dcloudio/uni-app';
  const data = computed(() => sheep.$store('app').template.basic?.floatMenu);
  const state = reactive({
    pattern: [],
    content: [],
    direction: '',
    show: false,
  });

  const fabRef = ref(null);
  const vm = getCurrentInstance();
  if (data.value?.mode === 1) {
    state.direction = 'vertical';
  } else {
    state.direction = 'horizontal';
  }
  data.value?.list.forEach((i) => {
    if (data.value?.isText === 0) {
      state.content.push({ iconPath: sheep.$url.cdn(i.src), url: i.url });
    } else {
      state.content.push({ iconPath: sheep.$url.cdn(i.src), text: i.title.text + '', url: i.url });
    }
    state.pattern.push({ color: i.title.color });
  });
  function trigger(e) {
    sheep.$router.go(e.item.url);
  }
  function onTap() {
    if (state.show) {
      state.show = false;
      vm.refs.fabRef.close();
    } else {
      state.show = true;
      vm.refs.fabRef.open();
    }
  }
  function fabClick() {
    state.show = !state.show;
  }
  onBackPress(() => {
    if (unref(fabRef).isShow) {
      unref(fabRef).close();
      return true;
    } else {
      return false;
    }
  });
</script>
<style lang="scss" scoped>
  .float-bg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11;
    width: 100%;
    height: 100%;
    background-color: rgba(#000000, 0.4);
  }
</style>
