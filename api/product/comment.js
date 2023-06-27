import request from "@/utils/request.js";

// 获得商品的评价统计
export function getCommentStatistics(spuId) {
  return request.get('app-api/product/comment/statistics', {
    spuId
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得最近的 n 条商品评价
export function getCommentList(spuId, count) {
  return request.get('app-api/product/comment/list', {
    spuId,
    count
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得商品评价分页
export function getCommentPage(data) {
  return request.get('app-api/product/comment/page', data, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
