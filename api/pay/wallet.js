import request from "@/utils/request.js";

// 获取钱包
export function getPayWallet() {
  return request.get("app-api/pay/wallet/get");
}

// 获得钱包流水分页
export function getWalletTransactionPage(data) {
  return request.get("app-api/pay/wallet-transaction/page", data);
}
