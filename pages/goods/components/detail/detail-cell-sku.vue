<template>
  <detail-cell v-if="skus.length > 0" label="选择" :value="value"></detail-cell>
</template>

<script setup>
  import { computed } from 'vue';

  import detailCell from './detail-cell.vue';

  const props = defineProps({
    modelValue: {
      type: Array,
      default() {
        return [];
      },
    },
    skus: {
      type: Array,
      default() {
        return [];
      },
    },
  });
  const value = computed(() => {
    let str = '';
    if (props.modelValue.length > 0) {
      props.modelValue.forEach((item, index) => {
        str += props.skus[index].name + ':' + item + ' ';
      });
    } else {
      str = '请选择商品规格';
    }
    return str;
  });
</script>
