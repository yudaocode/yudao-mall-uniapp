import request from '@/sheep/request';

export default {
  // 系统初始化
  init: (templateId) =>
    request({
      url: 'init',
      params: {
        templateId,
      },
      custom: {
        showError: false,
        showLoading: false,
      },
    }),
  // 同步客户端页面到后端
  pageSync: (pages) =>
    request({
      url: 'pageSync',
      method: 'POST',
      data: {
        pages,
      },
      custom: {
        showError: false,
        showLoading: false,
      },
    }),
  // 发送短信
  // TODO 芋艿：直接在 useModal 引入 AuthUtil 会报错，所以继续用这个 API
  sendSms: (mobile, scene) =>
    request({
      url: '/app-api/member/auth/send-sms-code',
      method: 'POST',
      data: {
        mobile,
        scene
      },
      custom: {
        showSuccess: true,
        loadingMsg: '发送中',
      },
    }),
  // 自定义页面
  page: (id) =>
    request({
      url: 'page/' + id,
      method: 'GET',
    }),
  //小程序直播
  mplive: {
    getRoomList: (ids) =>
      request({
        url: 'app/mplive/getRoomList',
        method: 'GET',
        params: {
          ids: ids.join(','),
        }
      }),
    getMpLink: () =>
      request({
        url: 'app/mplive/getMpLink',
        method: 'GET'
      }),
  },
};
