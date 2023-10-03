import request from "@/utils/request.js";

// 领取优惠券
export function takeCoupon(templateId) {
  return request.post("app-api/promotion/coupon/take", {
    templateId
  });
}

// 获得匹配指定商品的优惠劵列表
export function getMatchCouponList(data) {
  return request.get("app-api/promotion/coupon/match-list", data);
}

// 获得用户优惠劵列表
export function getCouponPage(data) {
  return request.get("app-api/promotion/coupon/page", data);
}

// 获得优惠劵模板分页
export function getCouponTemplatePage(data) {
  return request.get("app-api/promotion/coupon-template/page", data);
}

// 获得优惠劵模板列表
export function getCouponTemplateList(data) {
  return request.get("app-api/promotion/coupon-template/list", data);
}

// 获得未使用的优惠劵数量
export function getUnusedCouponCount() {
  return request.get("app-api/promotion/coupon/get-unused-count");
}
