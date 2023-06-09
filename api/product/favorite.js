import request from "@/utils/request.js";

// 检查是否收藏过商品
export function isFavoriteExists(spuId) {
  return request.get('app-api/product/favorite/exits', {
    spuId
  });
}

// 添加商品收藏
export function createFavorite(spuId) {
  return request.post('app-api/product/favorite/create', {
    spuId
  });
}

// 取消商品收藏
export function deleteFavorite(spuId) {
  return request.delete('app-api/product/favorite/delete', {
    spuId
  });
}
