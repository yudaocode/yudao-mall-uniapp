import request from "@/utils/request.js";

export function addCart(data) {
  return request.post("app-api/trade/cart/add", data);
}

export function updateCart(data) {
  return request.put("app-api/trade/cart/update", data);
}

export function resetCart(data) {
  return request.put("app-api/trade/cart/reset", data);
}

export function getCartCount() {
  return request.get("app-api/trade/cart/get-count");
}

export function getCartCountMap() {
  return request.get("app-api/trade/cart/get-count-map");
}

export function getCartList() {
  return request.get("app-api/trade/cart/list");
}

export function deleteCart(ids) {
  return request.delete("app-api/trade/cart/delete?ids=" + ids.join(','));
}
