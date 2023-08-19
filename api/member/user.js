import request from "@/utils/request.js";

// 获得用户收件地址
export function getUserInfo() {
  return request.get('app-api/member/user/get');
}
