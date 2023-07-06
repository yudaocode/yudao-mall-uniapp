import request from "@/utils/request.js";

// 创建微信 JS SDK 初始化所需的签名
export function createJsapiSignature(url) {
  return request.post("app-api/system/wx-mp/create-jsapi-signature?url=" + url, {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
