import request from '@/sheep/request';

const PayOrderApi = {
  // 获得支付订单
  getOrder: (id) => {
    return request({
      url: '/pay/order/get',
      method: 'GET',
      params: { id }
    });
  },
  // 提交支付订单
  submitOrder: (data) => {
    return request({
      url: '/pay/order/submit',
      method: 'POST',
      data
    });
  }
};

export default PayOrderApi;
