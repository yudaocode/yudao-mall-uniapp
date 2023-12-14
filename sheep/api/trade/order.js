import request2 from '@/sheep/request2';
import request from '@/sheep/request';

const OrderApi = {
  // 计算订单信息
  settlementOrder: (data) => {
    const data2 = {
      ...data,
    };
    // 移除多余字段
    if (!(data.couponId > 0)) {
      delete data2.couponId;
    }
    if (!(data.addressId > 0)) {
      delete data2.addressId;
    }
    // 解决 SpringMVC 接受 List<Item> 参数的问题
    delete data2.items;
    for (let i = 0; i < data.items.length; i++) {
      data2[encodeURIComponent('items[' + i + '' + '].skuId')] = data.items[i].skuId + '';
      data2[encodeURIComponent('items[' + i + '' + '].count')] = data.items[i].count + '';
      if (data.items[i].cartId) {
        data2[encodeURIComponent('items[' + i + '' + '].cartId')] = data.items[i].cartId + '';
      }
    }
    const queryString = Object.keys(data2)
      .map((key) => key + '=' + data2[key])
      .join('&');
    return request2({
      url: `trade/order/settlement?${queryString}`,
      method: 'GET',
    });
  },
  // 创建订单
  createOrder: (data) => {
    return request2({
      url: `trade/order/create`,
      method: 'POST',
      data,
    });
  },
  // 获得订单
  getOrder: (id) => {
    return request2({
      url: `trade/order/get-detail`,
      method: 'GET',
      params: {
        id,
      },
    });
  },
  // 订单列表
  getOrderPage: (params) => {
    return request({
      url: '/app-api/trade/order/page',
      method: 'GET',
      params,
      custom: {
        showLoading: false,
      },
    });
  },
  // 确认收货
  receiveOrder: (id) => {
    return request2({
      url: `/app-api/trade/order/receive`,
      method: 'PUT',
      params: {
        id,
      },
    });
  },
  // 获得交易订单的物流轨迹
  getOrderExpressTrackList: (id) => {
    return request2({
      url: `/app-api/trade/order/get-express-track-list`,
      method: 'GET',
      params: {
        id,
      },
    });
  }
};

export default OrderApi;
