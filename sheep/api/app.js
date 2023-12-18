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
