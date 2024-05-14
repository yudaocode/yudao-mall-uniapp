<!-- 海报弹窗 -->
<template>
  <su-popup :show="show" round="10" @close="onClosePoster" type="center" class="popup-box">
    <view class="ss-flex-col ss-col-center ss-row-center">
      <view
        v-if="poster.views.length === 0"
        class="poster-title ss-flex ss-row-center"
        :style="{
          height: poster.height + 'px',
          width: poster.width + 'px',
        }"
      >
        海报加载中...
      </view>
      <!-- v-if 保障等待所有的海报信息都加载完后才开始渲染 -->
          <template v-if="poster.views.length > 0">
            <l-painter :board="poster" ref="painterRef"/>
          </template>
    </view>
    <view
      class="poster-btn-box ss-m-t-20 ss-flex ss-row-between ss-col-center"
      v-if="poster.views.length > 0"
    >
      <button class="cancel-btn ss-reset-button" @tap="onClosePoster">取消</button>
      <button class="save-btn ss-reset-button ui-BG-Main" @tap="onSavePoster">
        {{
          ['wechatOfficialAccount', 'H5'].includes(sheep.$platform.name)
            ? '长按图片保存'
            : '保存图片'
        }}
      </button>
    </view>
  </su-popup>
</template>

<script setup>
  import { reactive, ref } from 'vue';
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
      height: 600
    },
    views: [],
  });

  const emits = defineEmits(['success', 'close']);

  const onClosePoster = () => {
    emits('close');
  };

  const painterRef = ref()
  // 保存海报图片
  const onSavePoster = () => {
    if (['WechatOfficialAccount', 'H5'].includes(sheep.$platform.name)) {
      sheep.$helper.toast('请长按图片保存');
      return;
    }

    painterRef.value.canvasToTempFilePathSync({
      fileType: "jpg",
      // 如果返回的是base64是无法使用 saveImageToPhotosAlbum，需要设置 pathType为url
      pathType: 'url',
      quality: 1,
      success: (res) => {
        console.log(res.tempFilePath);
        // 非H5 保存到相册
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            onClosePoster();
            sheep.$helper.toast('保存成功');
          },
          fail: (err) => {
            sheep.$helper.toast('保存失败');
            console.log('图片保存失败:', err);
          },
        });
      },
    });
  };

  // 获得海报数据
  async function getPoster() {
    poster.views = await getPosterData({
      width: poster.css.width,
      shareInfo: props.shareInfo,
    });
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

</style>
