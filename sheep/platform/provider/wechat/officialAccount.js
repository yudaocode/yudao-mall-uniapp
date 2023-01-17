import third from '@/sheep/api/third';
import $wxsdk from '@/sheep/libs/sdk-h5-weixin';
import $store from '@/sheep/store';
import $platform from '@/sheep/platform';
import { getRootUrl } from '@/sheep/helper';

// 加载微信公众号JSSDK
async function load() {
  if (
    $store('app').platform.auto_login &&
    !$store('user').isLogin &&
    location.href.search('pages/index/login') === -1
  ) {
    // 发起自动登陆
    login();
  }
  $wxsdk.init();
}

// 微信公众号登陆
async function login(code = '') {
  // 获取登陆地址
  if (!code) {
    const loginResult = await getLoginUrl();
    if (loginResult.error === 0 && loginResult.data.login_url) {
      uni.setStorageSync('returnUrl', location.href);
      window.location = loginResult.data.login_url;
    }
  } else {
    // 解密code发起登陆
    const loginResult = await loginByCode(code);
    if (loginResult.error === 0) {
      return loginResult;
    }
  }
  return false;
}

// 微信公众号绑定
async function bind(code = '') {
  // 获取绑定地址
  if (code === '') {
    const loginResult = await getLoginUrl('bind');
    if (loginResult.error === 0 && loginResult.data.login_url) {
      uni.setStorageSync('returnUrl', location.href);
      window.location = loginResult.data.login_url;
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
  const { error } = await third.wechat.unbind({
    platform: 'officialAccount',
  });
  return Promise.resolve(!error);
}

// 获取公众号登陆地址
function getLoginUrl(event = 'login') {
  let page = getRootUrl() + 'pages/index/login';

  return third.wechat.oauthLogin({
    platform: 'officialAccount',
    payload: encodeURIComponent(
      JSON.stringify({
        page,
        event,
      }),
    ),
  });
}

// 此处使用前端发送code在后端解密，防止用户在后端过长时间停留
function loginByCode(code) {
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
  return third.wechat.bind({
    platform: 'officialAccount',
    payload: encodeURIComponent(
      JSON.stringify({
        code,
      }),
    ),
  });
}

export default {
  load,
  login,
  bind,
  unbind,
  jssdk: $wxsdk,
};
