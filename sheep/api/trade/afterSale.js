import request2 from '@/sheep/request2';
import request from '@/sheep/request';

const AfterSaleApi = {
  // 创建售后
  createAfterSale: (data) => {
    return request2({
      url: `/app-api/trade/after-sale/create`,
      method: 'POST',
      data,
    });
  },
  // 获得售后
  getAfterSale: (id) => {
    return request2({
      url: `/app-api/trade/after-sale/get`,
      method: 'GET',
      params: {
        id,
      },
    });
  },
  // 取消售后
  cancelAfterSale: (id) => {
    return request2({
      url: `/app-api/trade/after-sale/cancel`,
      method: 'DELETE',
      params: {
        id,
      },
    });
  },
  // 获得售后日志列表
  getAfterSaleLogList: (afterSaleId) => {
    return request2({
      url: `/app-api/trade/after-sale-log/list`,
      method: 'GET',
      params: {
        afterSaleId,
      },
    });
  }
};

export default AfterSaleApi;
