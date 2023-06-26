import request from "@/utils/request.js";

// 获得用户收件地址
export function getAddress(id) {
  return request.get('app-api/member/address/get', {
    id
  });
}

// 获得用户收件地址列表
export function getAddressList() {
  return request.get('app-api/member/address/list', {});
}

// 创建用户收件地址
export function createAddress(data) {
  return request.post('app-api/member/address/create', data);
}

// 更新用户收件地址
export function updateAddress(data) {
  return request.put('app-api/member/address/update', data);
}

// 删除用户收件地址
export function deleteAddress(id) {
  return request.delete('app-api/member/address/delete?id=' + id, {});
}
