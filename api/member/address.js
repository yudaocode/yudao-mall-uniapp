import request from "@/utils/request.js";

// 获得用户收件地址列表
export function getAddressList() {
  return request.get('app-api/member/address/list', {});
}

// 更新用户收件地址
export function updateAddress(data) {
  return request.put('app-api/member/address/update', data);
}

// 删除用户收件地址
export function deleteAddress(id) {
  return request.delete('app-api/member/address/delete?id=' + id, {});
}
