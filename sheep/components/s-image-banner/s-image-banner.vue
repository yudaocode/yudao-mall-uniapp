<template>
  <su-swiper
    :list="imgList"
    :dotStyle="dotMap[data.indicator]"
    imageMode="widthFix"
    dotCur="bg-mask-40"
    :seizeHeight="300"
  />
</template>

<script setup>
  import { computed } from 'vue';
  import sheep from '@/sheep';

  const dotMap = {
    1: 'long',
    2: 'tag',
  };
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  });

  const imgList = computed(() =>
    props.data.list.map((item) => ({
      ...item,
      src: sheep.$url.cdn(item.src),
      poster: sheep.$url.cdn(item.poster),
    })),
  );
</script>

<style></style>
