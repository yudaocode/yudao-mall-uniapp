import request from "@/utils/request.js";

// 获得拼团活动明细
export function getCombinationActivity(id) {
  return request.get("app-api/promotion/combination-activity/get-detail", {
    id
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
