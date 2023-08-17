import request from "@/utils/request.js";

export function getAfterSalePage(data) {
  return request.get("app-api/trade/after-sale/page", data);
}

export function getAfterSaleReasonList(way) {
  return request.get("app-api/trade/after-sale/get-reason-list", {
    way
  });
}
