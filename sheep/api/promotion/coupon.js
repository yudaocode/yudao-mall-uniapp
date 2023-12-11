import request from '@/sheep/request';

export default {
  // 获得优惠劵模板列表
  getCouponTemplateListByIds: (ids) => {
    return request({
      url: '/app-api/promotion/coupon-template/list-by-ids',
      method: 'GET',
      params: { ids },
    });
  },
  // 获得优惠劵模版列表
  getCouponTemplateList: (spuId, productScope, count) => {
    return request({
      url: '/app-api/promotion/coupon-template/list',
      method: 'GET',
      params: { spuId, productScope, count },
    });
  },
  // 获得匹配指定商品的优惠劵列表
  getMatchCouponList: (price, spuIds, skuIds, categoryIds) => {
    return request({
      url: '/app-api/promotion/coupon/match-list',
      method: 'GET',
      params: {
        price,
        spuIds: spuIds.join(','),
        skuIds: skuIds.join(','),
        categoryIds: categoryIds.join(','),
      },
    });
  }
};
