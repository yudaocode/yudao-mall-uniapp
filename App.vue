<script setup>
  import { onLaunch, onShow, onError } from '@dcloudio/uni-app';
  import { sheep, ShoproInit } from '@/sheep';
  onLaunch(() => {
    // 隐藏原生导航栏 使用自定义底部导航
    uni.hideTabBar({
      fail: () => {},
    });

    // 加载Shopro底层依赖
    ShoproInit();
  });

  onShow(async () => {
    // #ifdef APP-PLUS
    // 获取urlSchemes参数
    const args = plus.runtime.arguments;
    if (args) {
    }

    // 获取剪贴板
    uni.getClipboardData({
      success: (res) => {},
    });

    // ios 网络授权后重新加载一次应用初始化
    if (sheep.$platform.os === 'ios') {
      if (await sheep.$platform.checkNetwork()) {
        await sheep.$store('app').init();
      }
    }
    // #endif
  });
</script>

<style lang="scss">
  @import '@/sheep/scss/index.scss';
</style>
