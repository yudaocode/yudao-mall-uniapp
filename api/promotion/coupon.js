import request from "@/utils/request.js";

export function takeCoupon(templateId) {
  return request.post("app-api/promotion/coupon/take", {
    templateId
  });
}
