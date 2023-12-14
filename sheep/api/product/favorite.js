import request from '@/sheep/request';

const FavoriteApi = {
  // 获得商品收藏分页
  getFavoritePage: (data) => {
    return request({
      url: '/app-api/product/favorite/page',
      method: 'GET',
      params: data
    });
  },
  // 取消商品收藏
  deleteFavorite: (spuId) => {
    return request({
      url: '/app-api/product/favorite/delete',
      method: 'DELETE',
      data: {
        spuId
      }
    });
  }
};

export default FavoriteApi;