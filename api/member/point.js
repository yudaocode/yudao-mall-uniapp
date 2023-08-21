import request from "@/utils/request.js";

// 获得用户积分记录分页
export function getPointRecordPage() {
  return request.get('app-api/member/point/record/page');
}
