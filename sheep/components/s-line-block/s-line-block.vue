<template>
  <su-subline v-bind="data"></su-subline>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Object,
      default: {},
    },
  });
</script>

<style></style>
