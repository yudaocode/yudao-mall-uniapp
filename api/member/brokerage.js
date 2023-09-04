import request from "@/utils/request.js";

// 获得个人分销统计
export function getBrokerageUserSummary() {
  return request.get('app-api/member/brokerage-user/get-summary');
}

// 获得分销提现分页记录
export function getBrokerageWithdrawPage(data) {
  return request.get('app-api/member/brokerage-withdraw/page', data);
}

// 获得分销记录分页
export function getBrokerageRecordPage(data) {
  return request.get('app-api/member/brokerage-record/page', data);
}
