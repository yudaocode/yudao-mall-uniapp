import request from "@/utils/request.js";

// 获得拼团活动明细
export function getCombinationActivity(id) {
  return request.get("app-api/promotion/combination-activity/get-detail", {
    id
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得最近 n 条拼团记录（团长发起的）
export function getHeadCombinationRecordList(status) {
  return request.get("app-api/promotion/combination-record/get-head-list", {
    status
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得拼团记录明细
export function getCombinationRecordDetail(id) {
  return request.get("app-api/promotion/combination-record/get-detail", {
    id
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
