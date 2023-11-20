import request from "@/utils/request.js";

// 获得单个商品，近期参与的每个活动
export function getActivityListBySpuId(spuId) {
  return request.get("app-api/promotion/activity/list-by-spu-id", {
    spuId
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得多个商品，近期参与的每个活动
export function getActivityListBySpuIds(spuIds) {
  return request.get("app-api/promotion/activity/list-by-spu-ids", {
    spuIds: spuIds && spuIds.length > 0 ? spuIds.join(',') : undefined
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
