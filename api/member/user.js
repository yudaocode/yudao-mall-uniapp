import request from "@/utils/request.js";

// 获得基本信息
export function getUserInfo() {
  return request.get('app-api/member/user/get');
}

// 修改基本信息
export function updateUser(data) {
  return request.put('app-api/member/user/update', data);
}
