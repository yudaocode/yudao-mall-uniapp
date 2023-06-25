import request from "@/utils/request.js";

export function takeCoupon(templateId) {
  return request.post("app-api/promotion/coupon/take", {
    templateId
  });
}

export function getCouponPage(data) {
  return request.get("app-api/promotion/coupon/page", data);
}

export function getCouponTemplateList(spuId, useType) {
  return request.get("app-api/promotion/coupon-template/list", {
    spuId,
    useType
  });
}

export function getCouponTemplatePage(data) {
  return request.get("app-api/promotion/coupon-template/page", data);
}
