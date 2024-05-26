import user from './user';
import goods from './goods';
import groupon from './groupon';

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
