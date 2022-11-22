import request from '@/sheep/request';

export default {
  // 预支付
  prepay: (data) =>
    request({
      url: 'pay/prepay',
      method: 'POST',
      data,
      custom: {
        loadingMsg: '支付中',
      },
    }),
  // 发起提现
  withdraw: {
    list: (params) =>
      request({
        url: 'withdraw',
        method: 'GET',
        params,
        custom: {
          auth: true,
        },
      }),
    rules: () =>
      request({
        url: 'withdraw/rules',
        method: 'GET',
        custom: {
          auth: true,
        },
      }),
    apply: (data) =>
      request({
        url: 'withdraw/apply',
        method: 'POST',
        data,
        custom: {
          loadingMsg: '申请中',
          auth: true,
        },
      }),
  },
};
