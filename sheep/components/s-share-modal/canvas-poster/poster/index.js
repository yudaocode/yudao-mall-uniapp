import user from './user';
import goods from './goods';
import groupon from './groupon';
import SocialApi from '@/sheep/api/member/social';

export function getPosterData(options) {
  switch (options.shareInfo.poster.type) {
    case 'user':
      return user(options);
    case 'goods':
      return goods(options);
    case 'groupon':
      return groupon(options);
  }
}

export function formatImageUrlProtocol(url) {
  // #ifdef H5
  // H5平台 https协议下需要转换
  if (window.location.protocol === 'https:' && url.indexOf('http:') === 0) {
    url = url.replace('http:', 'https:');
  }
  // #endif

  // #ifdef MP-WEIXIN
  // 小程序平台 需要强制转换为https协议
  if (url.indexOf('http:') === 0) {
    url = url.replace('http:', 'https:');
  }
  // #endif

  return url;
}

// 二维码静区占二维码边长的比例（约为常见版本 4 个码元）
const QRCODE_QUIET_ZONE_RATIO = 0.12;

// 海报画布的默认高度
const POSTER_HEIGHT = 600;

/**
 * 获得海报画布的高度
 *
 * 海报元素按画布宽度等比布局，屏幕较宽时（例如说 414px 宽度的拼团海报），二维码（含白色静区）会超出默认高度而被裁切，
 * 所以按定宽高元素（top、height 为数值，包括二维码、小程序码）的外框底部增高画布；未超出时，保持默认高度
 *
 * @param views 海报元素
 */
export function getPosterHeight(views) {
  let bottom = 0;
  views.forEach(({ css }) => {
    const { top, height, padding = 0 } = css;
    if (typeof top !== 'number' || typeof height !== 'number') {
      return;
    }
    // padding 向外扩展（非 border-box），所以外框高度需要加上上下两侧的 padding
    bottom = Math.max(bottom, top + height + padding * 2);
  });
  return Math.max(POSTER_HEIGHT, Math.ceil(bottom));
}

/**
 * 获得普通二维码（type: qrcode）的 css：白底 + 静区
 *
 * 1. painter 绘制二维码时只填充深色码块，码块间隙默认透明，导出 PNG 后在深色背景下会整体发黑，所以需要 backgroundColor 白底
 * 2. 子节点默认非 border-box：padding 向外扩展白底，码块仍按 width/height 绘制；因此 left/top 同步减去 padding，保持二维码原有位置与尺寸
 * 3. painter 解析 padding 只识别整数，所以取整
 *
 * @param left 二维码码块左侧位置
 * @param top 二维码码块顶部位置
 * @param size 二维码码块边长
 */
export function getQrcodeCss(left, top, size) {
  const padding = Math.round(size * QRCODE_QUIET_ZONE_RATIO);
  return {
    position: 'fixed',
    left: left - padding,
    top: top - padding,
    width: size,
    height: size,
    padding,
    backgroundColor: '#ffffff',
  };
}

// 获得微信小程序码 （Base64 image）
export async function getWxaQrcode(path, query) {
  const res = await SocialApi.getWxaQrcode(path, query);
  return 'data:image/png;base64,' + res.data;
}
