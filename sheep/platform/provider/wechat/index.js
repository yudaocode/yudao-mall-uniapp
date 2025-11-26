// #ifdef H5
import service from './officialAccount';
// #endif

// #ifdef MP-WEIXIN
import service from './miniProgram';
// #endif

// #ifdef APP-PLUS
import service from './openPlatform';
// #endif

let wechat = {};
if (typeof service !== 'undefined') {
  wechat = service;
}
export default wechat;
