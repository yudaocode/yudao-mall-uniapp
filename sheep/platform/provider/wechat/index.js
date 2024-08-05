// #ifdef H5
import service from './officialAccount';
// #endif

// #ifdef MP-WEIXIN
import service from './miniProgram';
// #endif

// #ifdef APP-PLUS
import service from './openPlatform';
// #endif

// 给定一个默认值，因为还存在硬编码useProvider('wechat')的情况
// 如果这里没有默认值，那么在其他平台编译的时候，就会报错，导致全部页面起不来
// #ifdef MP-ALIPAY
import service from './miniProgram';
// #endif

const wechat = service;

export default wechat;
