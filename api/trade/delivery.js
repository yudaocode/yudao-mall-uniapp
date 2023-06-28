import request from "@/utils/request.js";

// 获得配送配置
export function getDeliveryConfig() {
  return request.get("app-api/trade/delivery/config/get", {});
}

// 获得自提门店列表
export function getDeliveryPickUpStoreList(data) {
  return request.get("app-api/trade/delivery/pick-up-store/list", data);
}
