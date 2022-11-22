<template>
  <view class="ui-subline-wrap" :style="[elStyle]"></view>
</template>

<script setup>
  /**
   * 辅助线
   *
   * @property {String} width = ['thin', 'medium', 'thick', '10px']				- 线条宽度
   * @property {String} color = #000 												- 线条颜色
   * @property {String} style = ['dotted', 'solid', 'double', 'dashed']			- 线条样式,圆点，实线，双线，虚线
   *
   */

  import { computed } from 'vue';

  // 接收参数
  const props = defineProps({
    color: {
      type: String,
      default: '#000',
    },
    lineStyle: {
      type: String,
      default: 'dashed',
    },
    width: {
      type: String,
      default: 'thin',
    },
  });

  const elStyle = computed(() => {
    return {
      'border-top-width': props.width,
      'border-top-color': props.color,
      'border-top-style': props.lineStyle,
    };
  });
</script>

<style lang="scss" scoped></style>
