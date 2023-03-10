<template>
  <view>
    <view
      v-if="mode === 2 && state.liveList.length"
      class="goods-md-wrap ss-flex ss-flex-wrap ss-col-top"
      :style="[{ margin: '-' + data.space + 'rpx' }]"
    >
      <view
        :style="[
          {
            padding: data.space + 'rpx',
          },
        ]"
        class="goods-list-box"
        v-for="item in state.liveList"
        :key="item.id"
      >
        <s-live-card
          class="goods-md-box"
          size="md"
          :goodsFields="goodsFields"
          :data="item"
          :titleColor="goodsFields.name?.color"
          :subTitleColor="goodsFields.anchor_name?.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @click="goRoom(item.roomid)"
        >
        </s-live-card>
      </view>
    </view>
    <view v-if="mode === 1 && state.liveList.length" class="goods-lg-box">
      <view
        class="goods-box"
        :style="[{ marginBottom: data.space + 'px' }]"
        v-for="item in state.liveList"
        :key="item.id"
      >
        <s-live-card
          class="goods-card"
          size="sl"
          :goodsFields="goodsFields"
          :data="item"
          :titleColor="goodsFields.name?.color"
          :subTitleColor="goodsFields.anchor_name.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @tap="goRoom(item.roomid)"
        >
        </s-live-card>
      </view>
    </view>
  </view>
</template>
<script setup>
  import { reactive, onMounted } from 'vue';
  import sheep from '@/sheep';

  const state = reactive({
    liveList: [],
    mpLink: '',
  });
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
  const { mode, goodsFields, mpliveIds } = props.data ?? {};
  const { marginLeft, marginRight } = props.styles ?? {};

  async function getLiveListByIds(ids) {
    const { data } = await sheep.$api.app.mplive.getRoomList(ids);
    return data;
  }
  function goRoom(id) {
    // wx.navigateTo({
    //   url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${id}&custom_params=${customParams}`,
    // });
    // #ifdef H5
    window.location = state.mpLink;
    // #endif
    // #ifdef APP-PLUS
    plus.runtime.openURL(state.mpLink);
    // #endif
    // #ifdef MP-WEIXIN
    wx.navigateTo({
      url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${id}`,
    });
    // #endif
  }

  async function getMpLink() {
    const { error, data } = await sheep.$api.app.mplive.getMpLink();
    if (error === 0) {
      state.mpLink = data;
    }
  }

  onMounted(async () => {
    state.liveList = await getLiveListByIds(mpliveIds);
    getMpLink();
  });
</script>
<style lang="scss" scoped>
  .goods-list-box {
    width: 50%;
    flex-shrink: 0;
    box-sizing: border-box;
    overflow: hidden;
  }

  .goods-box {
    &:nth-last-of-type(1) {
      margin-bottom: 0 !important;
    }
  }

  .goods-md-box,
  .goods-sl-box {
    position: relative;
  }
</style>
