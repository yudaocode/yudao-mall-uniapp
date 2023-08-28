import request from "@/utils/request.js";

// 获得会员等级列表
export function getLevelList() {
  return request.get('app-api/member/level/list');
}

// 获得会员经验记录分页
export function getExperienceRecordPage() {
  return request.get('app-api/member/experience-record/page');
}
