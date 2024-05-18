import request from '@/sheep/request';

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
    getWxacode: async (path, query) => {
      return await request({
        url: '/member/social-user/wxa-qrcode',
        method: 'POST',
        data: {
          scene: query,
          path,
          checkPath: false, // TODO 开发环境暂不检查 path 是否存在
        },
      });
    },
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
