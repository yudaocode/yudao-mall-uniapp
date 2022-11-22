<template>
  <view :style="[elStyles, elBackground]"><slot /></view>
</template>

<script setup>
  /**
   * 容器组件 - 装修组件的样式容器
   */
  import { computed, provide, unref } from 'vue';
  import sheep from '@/sheep';

  const props = defineProps({
    styles: {
      type: Object,
      default() {},
    },
  });

  // 组件样式

  const elBackground = computed(() => {
    if (props.styles) {
      if (props.styles.background.type == 'color')
        return { background: props.styles.background.bgColor };
      if (props.styles.background.type == 'image')
        return {
          background: `url(${sheep.$url.cdn(
            props.styles.background.bgImage,
          )}) no-repeat top center / 100% auto`,
        };
    }
  });

  const elStyles = computed(() => {
    if (props.styles) {
      return {
        marginTop: `${props.styles.marginTop}px`,
        marginBottom: props.styles.marginBottom + 'px',
        marginLeft: `${props.styles.marginLeft}px`,
        marginRight: props.styles.marginRight + 'px',
        'border-top-left-radius': props.styles.borderRadiusTop + 'px',
        'border-top-right-radius': props.styles.borderRadiusTop + 'px',
        'border-bottom-left-radius': props.styles.borderRadiusBottom + 'px',
        'border-bottom-right-radius': props.styles.borderRadiusBottom + 'px',
        padding: props.styles.padding + 'px',
        overflow: 'hidden',
      };
    }
  });
</script>
