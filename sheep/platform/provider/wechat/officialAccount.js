import third from '@/sheep/api/third';
import $wxsdk from '@/sheep/libs/sdk-h5-weixin';
import { getRootUrl } from '@/sheep/helper';
import AuthUtil from '@/sheep/api/member/auth';

const socialType = 31; // 社交类型 - 微信公众号

// 加载微信公众号JSSDK
async function load() {
  $wxsdk.init();
}

// 微信公众号登陆
async function login(code = '', state = '') {
  // 情况一：没有 code 时，去获取 code
  if (!code) {
    const loginUrl = await getLoginUrl();
    if (loginUrl) {
      uni.setStorageSync('returnUrl', location.href);
      window.location = loginUrl;
    }
  // 情况二：有 code 时，使用 code 去自动登录
  } else {
    // 解密 code 发起登陆
    const loginResult = await loginByCode(code, state);
    if (loginResult.code === 0) {
      setOpenid(loginResult.data.openid);
      return loginResult;
    }
  }
  return false;
}

// 微信公众号绑定
async function bind(code = '') {
  // 获取绑定地址
  if (code === '') {
    const loginUrl = await getLoginUrl('bind');
    if (loginUrl) {
      uni.setStorageSync('returnUrl', location.href);
      window.location = loginUrl;
    }
  } else {
    // 解密code发起登陆
    const loginResult = await bindByCode(code);
    if (loginResult.error === 0) {
      return loginResult;
    }
  }
  return false;
}

// 微信公众号解除绑定
async function unbind() {
  debugger
  const { error } = await third.wechat.unbind({
    platform: 'officialAccount',
  });
  return Promise.resolve(!error);
}

// 获取公众号登陆地址
async function getLoginUrl(event = 'login') {
  const page = getRootUrl() + 'pages/index/login';
  const { code, data } = await AuthUtil.socialAuthRedirect(socialType, page);
  if (code !== 0) {
    return undefined;
  }
  return data;
}

// 此处使用前端发送code在后端解密，防止用户在后端过长时间停留
function loginByCode(code, state) {
  if (true) {
    return AuthUtil.socialLogin(socialType, code, state);
  }
  // TODO 芋艿：shareLog
  return third.wechat.login({
    platform: 'officialAccount',
    shareInfo: uni.getStorageSync('shareLog') || {},
    payload: encodeURIComponent(
      JSON.stringify({
        code,
      }),
    ),
  });
}

// 此处使用前端发送code在后端解密，防止用户在后端过长时间停留
function bindByCode(code) {
  debugger
  return third.wechat.bind({
    platform: 'officialAccount',
    payload: encodeURIComponent(
      JSON.stringify({
        code,
      }),
    ),
  });
}

// 设置 openid 到本地存储，目前只有 pay 支付时会使用
function setOpenid(openid) {
  uni.setStorageSync('openid', openid);
}

export default {
  load,
  login,
  bind,
  unbind,
  jssdk: $wxsdk,
};
