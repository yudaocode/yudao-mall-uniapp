import request from "@/utils/request.js";

export function settlementOrder(data) {
  const data2 = {
    ...data,
  }
  // 解决 SpringMVC 接受 List<Item> 参数的问题
  delete data2.items
  for (let i = 0; i < data.items.length; i++) {
    data2['items[' + i + '].skuId'] = data.items[i].skuId;
    data2['items[' + i + '].count'] = data.items[i].count;
    data2['items[' + i + '].cartId'] = data.items[i].cartId;
  }
  return request.get("app-api/trade/order/settlement", data2);
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

export function receiveOrder(id) {
  return request.put("app-api/trade/order/receive?id=" + id, {});
}

export function cancelOrder(id) {
  return request.delete("app-api/trade/order/cancel?id=" + id, {});
}

export function deleteOrder(id) {
  return request.delete("app-api/trade/order/delete?id=" + id, {});
}

export function getOrderItem(id) {
  return request.get("app-api/trade/order/item/get", {
    id
  });
}

export function createOrderItemComment(data) {
  return request.post("app-api/trade/order/item/create-comment", data);
}

export function getOrderExpressTrackList(id) {
  return request.get("app-api/trade/order/get-express-track-list", {
    id
  });
}
