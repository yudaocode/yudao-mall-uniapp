import request from "@/utils/request.js";

// 获得拼团活动列表
export function getCombinationActivityList(count) {
  return request.get("app-api/promotion/combination-activity/list", {
    count
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得拼团活动分页
export function getCombinationActivityPage(data) {
  return request.get("app-api/promotion/combination-activity/page", data, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得拼团活动明细
export function getCombinationActivity(id) {
  return request.get("app-api/promotion/combination-activity/get-detail", {
    id
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得最近 n 条拼团记录（团长发起的）
export function getHeadCombinationRecordList(activityId, status, count) {
  return request.get("app-api/promotion/combination-record/get-head-list", {
    activityId,
    status,
    count
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

// 获得拼团记录的概要信息
export function getCombinationRecordSummary() {
  return request.get("app-api/promotion/combination-record/get-summary", {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
