import request from "@/utils/request.js";

// 登出系统
export function logout() {
  return request.post('app-api/member/auth/logout');
}
