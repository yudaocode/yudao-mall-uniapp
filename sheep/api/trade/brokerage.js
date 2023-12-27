import request from '@/sheep/request';

const BrokerageApi = {
  // 获得个人分销信息
  getBrokerageUser: () => {
    return request({
      url: '/app-api/trade/brokerage-user/get',
      method: 'GET'
    });
  },
  // 获得个人分销统计
  getBrokerageUserSummary: () => {
    return request({
      url: '/app-api/trade/brokerage-user/get-summary',
      method: 'GET',
    });
  },
  // 分销订单
  getBrokerageRecordPage: (params) => {
    return request({
      url: '/app-api/trade/brokerage-record/page',
      method: 'GET',
      params,
    });
  }
}

export default BrokerageApi
