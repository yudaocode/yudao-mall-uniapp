import request from '@/sheep/request';

const FavoriteApi = {
  // 获得商品收藏分页
  getFavoritePage: (data) => {
    return request({
      url: '/product/favorite/page',
      method: 'GET',
      params: data
    });
  },
  // 检查是否收藏过商品
  isFavoriteExists: (spuId) => {
    return request({
      url: '/product/favorite/exits',
      method: 'GET',
      params: {
        spuId
      }
    });
  },
  // 添加商品收藏
  createFavorite: (spuId) => {
    return request({
      url: '/product/favorite/create',
      method: 'POST',
      data: {
        spuId
      }
    });
  },
  // 取消商品收藏
  deleteFavorite: (spuId) => {
    return request({
      url: '/product/favorite/delete',
      method: 'DELETE',
      data: {
        spuId
      }
    });
  }
};

export default FavoriteApi;