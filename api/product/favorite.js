import request from "@/utils/request.js";

// 检查是否收藏过商品
export function isFavoriteExists(spuId) {
  return request.get('app-api/product/favorite/exits', {
    spuId
  });
}

// 获得商品收藏数量
export function getFavoriteCount() {
  return request.get('app-api/product/favorite/get-count');
}

// 添加商品收藏
export function createFavorite(spuId) {
  return request.post('app-api/product/favorite/create', {
    spuId
  });
}

// 添加多个商品收藏
export function createFavoriteList(spuIds) {
  return request.post('app-api/product/favorite/create-list', {
    spuIds
  });
}

// 取消商品收藏
export function deleteFavorite(spuId) {
  return request.delete('app-api/product/favorite/delete', {
    spuId
  });
}

// 获得商品收藏分页
export function getFavoritePage(data) {
  return request.get('app-api/product/favorite/page', data);
}

// 取消多个商品收藏
export function deleteFavoriteList(spuIds) {
  return request.delete('app-api/product/favorite/delete-list', {
    spuIds
  });
}
