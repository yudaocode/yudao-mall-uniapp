import request2 from '@/sheep/request2';
import request from '@/sheep/request';

const TradeConfigApi = {
  // 获得交易配置
  getTradeConfig: () => {
    return request2({
      url: `/app-api/trade/config/get`,
      method: 'GET',
    });
  },
};

export default TradeConfigApi;
