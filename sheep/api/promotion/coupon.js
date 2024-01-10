import request from '@/sheep/request';

const CouponApi = {
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
  // 获得优惠劵模版分页
  getCouponTemplatePage: (params) => {
    return request({
      url: '/app-api/promotion/coupon-template/page',
      method: 'GET',
      params,
    });
  },
  // 获得优惠劵模版
  getCouponTemplate: (id) => {
    return request({
      url: '/app-api/promotion/coupon-template/get',
      method: 'GET',
      params: { id },
    });
  },
  // 我的优惠劵列表
  getCouponPage: (params) => {
    return request({
      url: '/app-api/promotion/coupon/page',
      method: 'GET',
      params,
    });
  },
  // 领取优惠券
  takeCoupon: (templateId) => {
    return request({
      url: '/app-api/promotion/coupon/take',
      method: 'POST',
      data: { templateId },
    });
  },
  // 获得优惠劵
  getCoupon: (id) => {
    return request({
      url: '/app-api/promotion/coupon/get',
      method: 'GET',
      params: { id },
    });
  },
  // 获得未使用的优惠劵数量
  getUnusedCouponCount: () => {
    return request({
      url: '/app-api/promotion/coupon/get-unused-count',
      method: 'GET',
      custom: {
        showLoading: false,
        auth: true,
      },
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

export default CouponApi;
