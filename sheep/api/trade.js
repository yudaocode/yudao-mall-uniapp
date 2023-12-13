import request from '@/sheep/request';

export default {
  order: (id) =>
    request({
      url: 'trade/order/' + id,
      method: 'GET',
      custom: {
        showLoading: false,
      },
    }),
  orderLog: (params) =>
    request({
      url: 'trade/order',
      method: 'GET',
      params,
      custom: {
        showLoading: false,
      },
    }),

  rechargeRules: () =>
    request({
      url: 'trade/order/rechargeRules',
      method: 'GET',
      custom: {
        showError: false,
        showLoading: false,
      },
    }),
  recharge: (data) =>
    request({
      url: 'trade/order/recharge',
      method: 'POST',
      data,
    }),
};
