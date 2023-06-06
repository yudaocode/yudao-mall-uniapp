import request from "@/utils/request.js";

export function getOrder(id) {
  return request.get("app-api/pay/order/get", {
    id
  });
}

export function submitOrder(data) {
  return request.post("app-api/pay/order/submit", data);
}
