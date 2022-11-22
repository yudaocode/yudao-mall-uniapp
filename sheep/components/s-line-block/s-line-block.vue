<template>
  <su-subline :color="data.lineColor" :lineStyle="data.style"></su-subline>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Object,
      default() {},
    },
  });
</script>

<style></style>
