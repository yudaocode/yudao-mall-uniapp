import request from '@/sheep/request';

const DeliveryApi = {
  // 获得快递公司列表
  getDeliveryExpressList: () => {
    return request({
      url: `/trade/delivery/express/list`,
      method: 'get',
    });
  }
};

export default DeliveryApi;
