import request from "@/utils/request.js";

// 获得指定应用的开启的支付渠道编码列表
export function getEnableChannelCodeList(appId) {
  return request.get("app-api/pay/channel/get-enable-code-list", {
    appId
  });
}
