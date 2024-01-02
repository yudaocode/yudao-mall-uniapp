import request from '@/sheep/request';

export default {
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
