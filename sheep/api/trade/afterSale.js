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
};

export default AfterSaleApi;
