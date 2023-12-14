import request2 from '@/sheep/request2';

export default {
  list: (params) =>
    request2({
      url: 'product/category/list',
      method: 'GET',
      params,
    }),
};
