import request from '@/sheep/request';

const PayOrderApi = {
  // 获得支付订单
  getOrder: (id) => {
    return request({
      url: '/app-api/pay/order/get',
      method: 'GET',
      params: { id }
    });
  },
};

export default PayOrderApi;
