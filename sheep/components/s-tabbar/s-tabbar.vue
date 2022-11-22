<template>
  <view class="u-page__item" v-if="tabbar?.list.length > 0">
    <su-tabbar
      :value="path"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
      :inactiveColor="tabbar.inactiveColor"
      :activeColor="tabbar.activeColor"
      :midTabBar="tabbar.mode === 2"
      :customStyle="tabbarStyle"
    >
      <su-tabbar-item
        v-for="(item, index) in tabbar.list"
        :key="item.text"
        :text="item.text"
        :name="item.url"
        :isCenter="getTabbarCenter(index)"
        :centerImage="sheep.$url.cdn(item.inactiveIcon)"
        @tap="sheep.$router.go(item.url)"
      >
        <template v-slot:active-icon>
          <image class="u-page__item__slot-icon" :src="sheep.$url.cdn(item.activeIcon)"></image>
        </template>
        <template v-slot:inactive-icon>
          <image class="u-page__item__slot-icon" :src="sheep.$url.cdn(item.inactiveIcon)"></image>
        </template>
      </su-tabbar-item>
    </su-tabbar>
  </view>
</template>

<script setup>
  import { computed, unref } from 'vue';
  import sheep from '@/sheep';

  const tabbar = computed(() => {
    return sheep.$store('app').template.basic?.tabbar;
  });

  const tabbarStyle = computed(() => {
    const backgroundStyle = tabbar.value.background;
    if (backgroundStyle.type == 'color') return { background: backgroundStyle.bgColor };
    if (backgroundStyle.type == 'image')
      return {
        background: `url(${sheep.$url.cdn(
          backgroundStyle.bgImage,
        )}) no-repeat top center / 100% auto`,
      };
  });

  const getTabbarCenter = (index) => {
    if (unref(tabbar).mode !== 2) return false;
    return unref(tabbar).list % 2 > 0
      ? Math.ceil(unref(tabbar).list.length / 2) === index + 1
      : false;
  };

  const props = defineProps({
    path: String,
    default: '',
  });
</script>

<style lang="scss">
  .u-page {
    padding: 0;

    &__item {
      &__title {
        color: var(--textSize);
        background-color: #fff;
        padding: 15px;
        font-size: 15px;

        &__slot-title {
          color: var(--textSize);
          font-size: 14px;
        }
      }

      &__slot-icon {
        width: 25px;
        height: 25px;
      }
    }
  }
</style>
