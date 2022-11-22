import request from '@/sheep/request';

export default {
  list: (data) =>
    request({
      url: 'cart',
      method: 'GET',
      custom: {
        showLoading: false,
        auth: true,
      },
    }),
  append: (data) =>
    request({
      url: 'cart',
      method: 'POST',
      custom: {
        showSuccess: true,
        successMsg: '已添加到购物车~',
      },
      data: {
        ...data,
        type: 'inc',
      },
    }),
  // 删除购物车
  delete: (ids) =>
    request({
      url: 'cart/' + ids,
      method: 'DELETE',
    }),
  update: (data) =>
    request({
      url: 'cart',
      method: 'POST',
      data: {
        ...data,
        type: 'cover',
      },
    }),
};
