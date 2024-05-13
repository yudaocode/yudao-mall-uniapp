<!-- 海报弹窗 -->
<template>
  <su-popup :show="show" round="10" @close="onClosePoster" type="center" class="popup-box">
    <view class="ss-flex-col ss-col-center ss-row-center">
      <template v-if="poster.views.length > 0">
        <l-painter :board="poster" />
      </template>
    </view>
  </su-popup>
</template>

<script setup>
  import { getCurrentInstance, reactive } from 'vue';
  import sheep from '@/sheep';
  import { getPosterData } from '@/sheep/components/s-share-modal/canvas-poster/poster';

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    shareInfo: {
      type: Object,
      default() {
      },
    },
  });


  const poster = reactive({
    css: {
      // 根节点若无尺寸，自动获取父级节点
      width: sheep.$platform.device.windowWidth * 0.9,
      height: 600,
    },
    views: [],
  });


  const emits = defineEmits(['success', 'close']);
  const vm = getCurrentInstance();

  const onClosePoster = () => {
    emits('close');
  };

  // 保存海报图片
  const onSavePoster = () => {
    if (['WechatOfficialAccount', 'H5'].includes(sheep.$platform.name)) {
      sheep.$helper.toast('请长按图片保存');
      return;
    }

    uni.saveImageToPhotosAlbum({
      filePath: poster.src,
      success: (res) => {
        onClosePoster();
        sheep.$helper.toast('保存成功');
      },
      fail: (err) => {
        sheep.$helper.toast('保存失败');
        console.log('图片保存失败:', err);
      },
    });
  };

  // 使用 canvas 生成海报
  async function getPoster(params) {
    let drawer = await getPosterData({
      width: sheep.$platform.device.windowWidth * 0.9,
      shareInfo: props.shareInfo,
    });
    poster.views = drawer;
  }

  defineExpose({
    getPoster,
  });
</script>

<style lang="scss" scoped>
  .popup-box {
    position: relative;
  }

  .poster-title {
    color: #999;
  }

  // 分享海报
  .poster-btn-box {
    width: 600rpx;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -80rpx;

    .cancel-btn {
      width: 240rpx;
      height: 70rpx;
      line-height: 70rpx;
      background: $white;
      border-radius: 35rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: $dark-9;
    }

    .save-btn {
      width: 240rpx;
      height: 70rpx;
      line-height: 70rpx;
      border-radius: 35rpx;
      font-size: 28rpx;
      font-weight: 500;
    }
  }

  .poster-img {
    border-radius: 20rpx;
  }

  .hideCanvas {
    position: fixed;
    top: -99999rpx;
    left: -99999rpx;
    z-index: -99999;
  }
</style>
