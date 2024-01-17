import request from '@/sheep/request';
import { baseUrl, apiPath } from '@/sheep/config';

export default {
  // 微信相关
  wechat: {
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
