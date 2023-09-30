import request from "@/utils/request.js";

// 获取钱包
export function getPayWallet() {
  return request.get("app-api/pay/wallet/get");
}

// 获得钱包流水分页
export function getWalletTransactionPage(data) {
  return request.get("app-api/pay/wallet-transaction/page", data);
}

// 获得钱包充值套餐列表
export function getWalletRechargePackageList() {
  return request.get("app-api/pay/wallet-recharge-package/list");
}

// 创建钱包充值记录（发起充值）
export function createWalletRecharge(data) {
  return request.post("app-api/pay/wallet-recharge/create", data);
}
