import request from '@/sheep/request';

const PayOrderApi = {
  // 获得支付订单
  getOrder: (id, sync, no) => {
    const params = {};
    if (id) params.id = id;
    if (no) params.no = no;
    if (sync !== undefined) params.sync = sync;
    return request({
      url: '/pay/order/get',
      method: 'GET',
      params,
    });
  },
  // 提交支付订单
  submitOrder: (data) => {
    return request({
      url: '/pay/order/submit',
      method: 'POST',
      data,
    });
  },
};

export default PayOrderApi;
