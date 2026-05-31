/**
 * 微信小程序运行环境：develop / trial / release
 * 其它平台默认 release，整个 App 生命周期内不会变，缓存一次
 */
let cachedEnvVersion;

export function getWxEnvVersion() {
  if (cachedEnvVersion) return cachedEnvVersion;
  // #ifdef MP-WEIXIN
  try {
    cachedEnvVersion = wx.getAccountInfoSync().miniProgram.envVersion;
  } catch (e) {
    console.log('获取微信小程序环境失败', e);
    cachedEnvVersion = 'release';
  }
  // #endif
  // #ifndef MP-WEIXIN
  cachedEnvVersion = 'release';
  // #endif
  return cachedEnvVersion;
}
