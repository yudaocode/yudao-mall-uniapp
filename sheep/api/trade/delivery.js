import request from '@/sheep/request';

const DeliveryApi = {
  // 获得快递公司列表
  getDeliveryExpressList: () => {
    return request({
      url: `/trade/delivery/express/list`,
      method: 'get',
    });
  },
  // 获得自提门店列表
  getDeliveryPickUpStoreList: (params) => {
    return request({
      url: `/trade/delivery/pick-up-store/list`,
      method: 'GET',
      params
    });
  }
};

export default DeliveryApi;
