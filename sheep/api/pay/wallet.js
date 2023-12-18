import request from '@/sheep/request';

const PayWalletApi = {
  // 获得钱包流水分页
  getWalletTransactionPage: (params) => {
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + params[key])
      .join('&');
    return request({
      url: `/app-api/pay/wallet-transaction/page?${queryString}`,
      method: 'GET'
    });
  },
  // 获得钱包流水统计
  getWalletTransactionSummary: (params) => {
    const queryString = `createTime=${params.createTime[0]}&createTime=${params.createTime[1]}`
    return request({
      url: `/app-api/pay/wallet-transaction/get-summary?${queryString}`,
      // url: `/app-api/pay/wallet-transaction/get-summary`,
      method: 'GET',
      // params: params
    });
  },
};

export default PayWalletApi;
