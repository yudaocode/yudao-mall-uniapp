import request from "@/utils/request.js";

// 获得个人分销统计
export function getBrokerageUserSummary() {
  return request.get('app-api/member/brokerage-user/get-summary');
}
