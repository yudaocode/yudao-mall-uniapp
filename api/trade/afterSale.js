import request from "@/utils/request.js";

export function getAfterSale(id) {
  return request.get("app-api/trade/after-sale/get", {
    id
  });
}

export function getApplyingAfterSaleCount() {
  return request.get("app-api/trade/after-sale/get-applying-count");
}

export function getAfterSalePage(data) {
  return request.get("app-api/trade/after-sale/page", data);
}

export function getAfterSaleReasonList(way) {
  return request.get("app-api/trade/after-sale/get-reason-list", {
    way
  });
}

export function createAfterSale(data) {
  return request.post("app-api/trade/after-sale/create", data);
}

export function cancelAfterSale(id) {
  return request.delete("app-api/trade/after-sale/cancel?id=" + id);
}

export function deliveryAfterSale(data) {
  return request.put("app-api/trade/after-sale/delivery", data);
}
