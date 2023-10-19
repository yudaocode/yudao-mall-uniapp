import request from "@/utils/request.js";

// 发送手机验证码
export function sendSmsCode(mobile, scene) {
  return request.post('app-api/member/auth/send-sms-code', {
    mobile,
    scene
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 校验手机验证码
export function validateSmsCode(mobile, scene, code) {
  return request.post('app-api/member/auth/validate-sms-code', {
    mobile,
    scene,
    code
  });
}

// 登出系统
export function logout() {
  return request.post('app-api/member/auth/logout');
}

// 使用手机 + 密码登录
export function login(data) {
  return request.post('app-api/member/auth/login', data, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 使用手机 + 验证码登录
export function smsLogin(data) {
  return request.post('app-api/member/auth/sms-login', data, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 社交快捷登录
export function socialLogin(type, code, state) {
  return request.post('app-api/member/auth/social-login', {
    type,
    code,
    state
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 微信小程序的一键登录登录
export function weixinMiniAppLogin(phoneCode, loginCode) {
  return request.post('app-api/member/auth/weixin-mini-app-login', {
    phoneCode,
    loginCode
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 创建微信 JS SDK 初始化所需的签名
export function createWeixinMpJsapiSignature(url) {
  return request.post("app-api/member/auth/create-weixin-jsapi-signature?url=" + url, {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}