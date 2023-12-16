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
};

export default CouponApi;