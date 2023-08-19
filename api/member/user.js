import request from "@/utils/request.js";

// 获得基本信息
export function getUserInfo() {
  return request.get('app-api/member/user/get');
}

// 修改基本信息
export function updateUser(data) {
  return request.put('app-api/member/user/update', data);
}

// 修改用户手机
export function updateUserMobile(data) {
  return request.put('app-api/member/user/update-mobile', data);
}

// 修改用户密码
export function updateUserPassword(data) {
  return request.put('app-api/member/user/update-password', data);
}

// 重置密码
export function resetUserPassword(data) {
  return request.put('app-api/member/user/reset-password', data, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
