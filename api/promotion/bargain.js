import request from "@/utils/request.js";

// 获得砍价活动列表
export function getBargainActivityList(count) {
  return request.get("app-api/promotion/bargain-activity/list", {
    count
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
