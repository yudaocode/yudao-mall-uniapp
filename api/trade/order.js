import request from "@/utils/request.js";

export function settlementOrder(data) {
  return request.get("app-api/trade/order/settlement", data);
}

export function createOrder(data) {
  return request.post("app-api/trade/order/create", data);
}

export function getOrderDetail(id) {
  return request.get("app-api/trade/order/get-detail", {
    id
  });
}

export function getOrderCount() {
  return request.get("app-api/trade/order/get-count");
}

export function getOrderPage(data) {
  return request.get("app-api/trade/order/page", data);
}

export function getOrderItem(id) {
  return request.get("app-api/trade/order/item/get", {
    id
  });
}
