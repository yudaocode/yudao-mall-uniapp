import request from "@/utils/request.js";

// 获得配送配置
export function getDeliveryConfig() {
  return request.get("app-api/trade/delivery/config/get", {});
}

// 获得自提门店列表
export function getDeliveryPickUpStoreList(data) {
  return request.get("app-api/trade/delivery/pick-up-store/list", data);
}

// 获得自提门店
export function getDeliveryPickUpStore(id) {
  return request.get("app-api/trade/delivery/pick-up-store/get", {
    id
  });
}

// 获得快递公司列表
export function getDeliveryExpressList() {
  return request.get("app-api/trade/delivery/express/list");
}
