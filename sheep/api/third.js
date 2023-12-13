import request from '@/sheep/request';
import { baseUrl, apiPath } from '@/sheep/config';

export default {
  // 微信相关
  wechat: {
    // 第三方登录
    login: (data) =>
      request({
        url: 'third/wechat/login',
        method: 'POST',
        data,
        custom: {
          showSuccess: true,
          loadingMsg: '登陆中',
        },
      }),

    // 绑定微信
    bind: (data) =>
      request({
        url: 'third/wechat/bind',
        method: 'POST',
        data,
        custom: {
          showSuccess: true,
          loadingMsg: '绑定中',
        },
      }),

    // 解除绑定微信
    unbind: (data) =>
      request({
        url: 'third/wechat/unbind',
        method: 'POST',
        data,
        custom: {
          showSuccess: true,
          loadingMsg: '解除绑定',
        },
      }),

    // 公众号授权
    oauthLogin: (data) =>
      request({
        url: 'third/wechat/oauthLogin',
        method: 'GET',
        data,
        custom: {
          showSuccess: true,
          loadingMsg: '登陆中',
        },
      }),

    // 获取小程序sessionKey（后端不会给前端返回真实的sessionKey）
    getSessionId: (data) =>
      request({
        url: 'third/wechat/getSessionId',
        method: 'POST',
        data,
        custom: {
          showLoading: false,
        },
      }),

    // 微信小程序 绑定一键获取的手机号
    bindUserPhoneNumber: (data) =>
      request({
        url: 'third/wechat/bindUserPhoneNumber',
        method: 'POST',
        data,
        custom: {
          showSuccess: true,
          loadingMsg: '获取中',
        },
      }),

    // 网页jssdk
    jssdk: (data) =>
      request({
        url: 'third/wechat/jssdk',
        method: 'GET',
        data,
        custom: {
          showError: false,
          showLoading: false,
        },
      }),

    // 小程序订阅消息
    subscribeTemplate: (params) =>
      request({
        url: 'third/wechat/subscribeTemplate',
        method: 'GET',
        params: {
          platform: 'miniProgram',
        },
        custom: {
          showError: false,
          showLoading: false,
        },
      }),

    // 获取微信小程序码
    getWxacode: (path) =>
      `${baseUrl}${apiPath}third/wechat/wxacode?platform=miniProgram&payload=${encodeURIComponent(
        JSON.stringify({
          path,
        }),
      )}`,
  },

  // 苹果相关
  apple: {
    // 第三方登录
    login: (data) =>
      request({
        url: 'third/apple/login',
        method: 'POST',
        data,
        custom: {
          showSuccess: true,
          loadingMsg: '登陆中',
        },
      }),
  },
};
