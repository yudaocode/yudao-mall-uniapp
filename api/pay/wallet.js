import request from "@/utils/request.js";

// 获取钱包
export function getPayWallet() {
  return request.get("app-api/pay/wallet/get");
}
