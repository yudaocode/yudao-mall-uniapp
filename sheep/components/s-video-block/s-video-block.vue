<!--  -->
<template>
  <su-video
    class="sss"
    :uid="guid()"
    :src="sheep.$url.cdn(data.videoUrl)"
    :poster="sheep.$url.cdn(data.src)"
    :height="styles.height * 2"
  ></su-video>
</template>

<script setup>
  import sheep from '@/sheep';
  import { guid } from '@/sheep/helper';
  const props = defineProps({
    data: {
      type: Object,
      default() {},
    },
    styles: {
      type: Object,
      default() {},
    },
  });
</script>

<style lang="scss" scoped>
  .sss {
    z-index: -100;
  }
</style>
