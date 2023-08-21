import request from "@/utils/request.js";

// 获得签到规则列表
export function getSignInConfigList() {
  return request.get('app-api/member/sign-in/config/list');
}

// 获得个人签到统计
export function getSignInRecordSummary() {
  return request.get('app-api/member/sign-in/record/get-summary')
}

// 签到
export function createSignInRecord() {
  return request.post('app-api/member/sign-in/record/create')
}

// 获得签到记录分页
export function getSignRecordPage() {
  return request.get('app-api/member/sign-in/record/page');
}
