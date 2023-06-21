import request from "@/utils/request.js";

// 获得砍价活动列表
export function getBargainActivityList(count) {
  return request.get("app-api/promotion/bargain-activity/list", {
    count
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得砍价活动详情
export function getBargainActivityDetail(id) {
  return request.get("app-api/promotion/bargain-activity/get-detail", {
    id
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得砍价活动分页
export function getBargainActivityPage(count) {
  return request.get("app-api/promotion/bargain-activity/page", {
    count
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得砍价记录的概要信息
export function getBargainRecordSummary() {
  return request.get("app-api/promotion/bargain-record/get-summary", {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得砍价记录的分页
export function getBargainRecordPage(data) {
  return request.get("app-api/promotion/bargain-record/page", data, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得砍价活动详情
export function getBargainRecordDetail(id, activityId) {
  return request.get("app-api/promotion/bargain-record/get-detail", {
    id,
    activityId
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 创建砍价记录（参与拼团活动）
export function createBargainRecord(activityId) {
  return request.post("app-api/promotion/bargain-record/create", {
    activityId
  });
}

// 创建砍价助力（给拼团记录砍一刀）
export function createBargainHelp(recordId) {
  return request.post("app-api/promotion/bargain-help/create", {
    recordId: recordId
  });
}

// 获得砍价助力列表
export function getBargainHelpList(recordId) {
  return request.get("app-api/promotion/bargain-help/list", {
    recordId: recordId
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
