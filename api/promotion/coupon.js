import request from "@/utils/request.js";

export function takeCoupon(templateId) {
  return request.post("app-api/promotion/coupon/take", {
    templateId
  });
}

// 获得匹配指定商品的优惠劵列表
export function getMatchCouponList(data) {
  return request.get("app-api/promotion/coupon/match-list", data);
}

export function getCouponPage(data) {
  return request.get("app-api/promotion/coupon/page", data);
}

export function getCouponTemplateList(spuId, useType) {
  return request.get("app-api/promotion/coupon-template/list", {
    spuId,
    useType
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

export function getCouponTemplatePage(data) {
  return request.get("app-api/promotion/coupon-template/page", data);
}

// 获得未使用的优惠劵数量
export function getUnusedCouponCount() {
  return request.get("app-api/promotion/coupon/get-unused-count");
}
