import request from '@/sheep/request';

export default {
  list: (params) =>
    request({
      url: 'category',
      method: 'GET',
      params,
    }),
};
