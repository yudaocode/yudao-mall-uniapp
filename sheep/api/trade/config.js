import request from '@/sheep/request';

const TradeConfigApi = {
  // 获得交易配置
  getTradeConfig: () => {
    return request({
      url: `/app-api/trade/config/get`,
      method: 'GET',
    });
  },
};

export default TradeConfigApi;
