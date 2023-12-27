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
  // 获得分销记录分页
  getBrokerageRecordPage: (params) => {
    if (params.status === undefined) {
      delete params.status
    }
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + params[key])
      .join('&');
    return request({
      url: `/app-api/trade/brokerage-record/page?${queryString}`,
      method: 'GET',
    });
  },
  // 创建分销提现
  createBrokerageWithdraw: (data) => {
    return request({
      url: '/app-api/trade/brokerage-withdraw/create',
      method: 'POST',
      data,
    });
  },
  // 获得商品的分销金额
  getProductBrokeragePrice: (spuId) => {
    return request({
      url: '/app-api/trade/brokerage-record/get-product-brokerage-price',
      method: 'GET',
      params: {
        spuId
      }
    });
  },
  // 获得分销用户排行（基于佣金）
  getRankByPrice: (params) => {
    const queryString = `times=${params.times[0]}&times=${params.times[1]}`;
    return request({
      url: `/app-api/trade/brokerage-user/get-rank-by-price?${queryString}`,
      method: 'GET',
    });
  },
  // 获得分销用户排行分页（基于佣金）
  getBrokerageUserChildSummaryPageByPrice: (params) => {
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + params[key])
      .join('&');
    return request({
      url: `/app-api/trade/brokerage-user/rank-page-by-price?${queryString}`,
      method: 'GET',
    });
  },
  // 获得分销用户排行分页（基于用户量）
  getBrokerageUserRankPageByUserCount: (params) => {
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + params[key])
      .join('&');
    return request({
      url: `/app-api/trade/brokerage-user/rank-page-by-user-count?${queryString}`,
      method: 'GET',
    });
  },
}

export default BrokerageApi
