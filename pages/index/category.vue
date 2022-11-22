<template>
  <s-layout title="分类" tabbar="/pages/index/category" :bgStyle="{ color: '#fff' }">
    <view class="s-category">
      <view class="three-level-wrap ss-flex ss-col-top" :style="[{ height: pageHeight + 'px' }]">
        <scroll-view class="side-menu-wrap" scroll-y :style="[{ height: pageHeight + 'px' }]">
          <view
            class="menu-item ss-flex"
            v-for="(item, index) in state.categoryList?.children"
            :key="item.id"
            :class="[{ 'menu-item-active': index == state.activeMenu }]"
            @tap="onMenu(index)"
          >
            <view class="menu-title ss-line-1">
              {{ item.name }}
            </view>
          </view>
        </scroll-view>
        <scroll-view
          class="goods-list-box"
          scroll-y
          :style="[{ height: pageHeight + 'px' }]"
          v-if="state.categoryList?.children?.length"
        >
          <image
            v-if="state.categoryList.children[state.activeMenu].image"
            class="banner-img"
            :src="sheep.$url.cdn(state.categoryList.children[state.activeMenu].image)"
            mode="widthFix"
          >
          </image>
          <first-one
            v-if="state.categoryList.style === 'first_one'"
            :data="state.categoryList"
            :activeMenu="state.activeMenu"
            :pagination="state.pagination"
          />
          <first-two
            v-if="state.categoryList.style === 'first_two'"
            :data="state.categoryList"
            :activeMenu="state.activeMenu"
            :pagination="state.pagination"
          />
          <second-one
            v-if="state.categoryList.style === 'second_one'"
            :data="state.categoryList"
            :activeMenu="state.activeMenu"
            :pagination="state.pagination"
          />
          <third-one
            v-if="state.categoryList.style === 'third_one'"
            :data="state.categoryList"
            :activeMenu="state.activeMenu"
            :pagination="state.pagination"
          />
          <uni-load-more
            v-if="
              (state.categoryList.style === 'first_one' ||
                state.categoryList.style === 'first_two') &&
              state.pagination.total > 0
            "
            :status="state.loadStatus"
            :content-text="{
              contentdown: '点击查看更多',
            }"
            @tap="loadmore"
          />
        </scroll-view>
      </view>
    </view>
  </s-layout>
</template>

<script setup>
  import secondOne from './components/second-one.vue';
  import thirdOne from './components/third-one.vue';
  import firstOne from './components/first-one.vue';
  import firstTwo from './components/first-two.vue';
  import sheep from '@/sheep';

  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import _ from 'lodash';
  const state = reactive({
    categoryList: [],
    activeMenu: '0',

    pagination: {
      data: [],
      current_page: 1,
      total: 1,
      last_page: 1,
    },
    loadStatus: '',
  });

  const { screenHeight, safeAreaInsets, screenWidth, safeArea } = sheep.$platform.device;
  const pageHeight = computed(() => safeArea.height - 44 - 50);

  async function getList(options) {
    const { error, data } = await sheep.$api.category.list({
      id: options.id,
    });
    if (error === 0) {
      state.categoryList = data;
    }
  }

  const onMenu = (val) => {
    state.activeMenu = val;
    if (state.categoryList.style === 'first_one' || state.categoryList.style === 'first_two') {
      state.pagination = {
        data: [],
        current_page: 1,
        total: 1,
        last_page: 1,
      };
      getGoodsList(state.categoryList.children[val].id);
    }
  };

  async function getGoodsList(id, page = 1, list_rows = 6) {
    state.loadStatus = 'loading';
    const res = await sheep.$api.goods.list({
      category_id: id,
      list_rows,
      page,
    });
    if (res.error === 0) {
      let couponList = _.concat(state.pagination.data, res.data.data);
      state.pagination = {
        ...res.data,
        data: couponList,
      };
      if (state.pagination.current_page < state.pagination.last_page) {
        state.loadStatus = 'more';
      } else {
        state.loadStatus = 'noMore';
      }
    }
  }
  // 加载更多
  function loadmore() {
    if (state.loadStatus !== 'noMore') {
      getGoodsList(
        state.categoryList.children[state.activeMenu].id,
        state.pagination.current_page + 1,
      );
    }
  }
  onLoad(async (options) => {
    await getList(options);
    if (state.categoryList.style === 'first_one' || state.categoryList.style === 'first_two') {
      getGoodsList(state.categoryList.children[0].id);
    }
  });
  onReachBottom(() => {
    loadmore();
  });
</script>

<style lang="scss" scoped>
  .s-category {
    :deep() {
      .side-menu-wrap {
        width: 200rpx;
        height: 100%;
        padding-left: 12rpx;
        background-color: #f6f6f6;

        .menu-item {
          width: 100%;
          height: 88rpx;
          position: relative;
          transition: all linear 0.2s;

          .menu-title {
            line-height: 32rpx;
            font-size: 30rpx;
            font-weight: 400;
            color: #333;
            margin-left: 28rpx;
            position: relative;
            z-index: 0;

            &::before {
              content: '';
              width: 64rpx;
              height: 12rpx;
              background: linear-gradient(
                90deg,
                var(--ui-BG-Main-gradient),
                var(--ui-BG-Main-light)
              ) !important;
              position: absolute;
              left: -64rpx;
              bottom: 0;
              z-index: -1;
              transition: all linear 0.2s;
            }
          }

          &.menu-item-active {
            background-color: #fff;
            border-radius: 20rpx 0 0 20rpx;

            &::before {
              content: '';
              position: absolute;
              right: 0;
              bottom: -20rpx;
              width: 20rpx;
              height: 20rpx;
              background: radial-gradient(circle at 0 100%, transparent 20rpx, #fff 0);
            }

            &::after {
              content: '';
              position: absolute;
              top: -20rpx;
              right: 0;
              width: 20rpx;
              height: 20rpx;
              background: radial-gradient(circle at 0% 0%, transparent 20rpx, #fff 0);
            }

            .menu-title {
              font-weight: 600;

              &::before {
                left: 0;
              }
            }
          }
        }
      }

      .goods-list-box {
        background-color: #fff;
        width: calc(100vw - 100px);
        padding: 10px;
      }

      .banner-img {
        width: calc(100vw - 130px);
        border-radius: 5px;
        margin-bottom: 20rpx;
      }
    }
  }
</style>
