import request from "@/utils/request.js";

export function getCouponTemplateList(spuId, useType) {
  return request.get("app-api/promotion/coupon-template/list", {
    spuId,
    useType
  });
}
