import request from '@/sheep/request';

const CartApi = {
  addCart: (data) => {
    return request({
      url: '/app-api/trade/cart/add',
      method: 'POST',
      data: data,
      custom: {
        showSuccess: true,
        successMsg: '已添加到购物车~',
      }
    });
  },
  updateCartCount: (data) => {
    return request({
      url: '/app-api/trade/cart/update-count',
      method: 'PUT',
      data: data
    });
  },
  updateCartSelected: (data) => {
    return request({
      url: '/app-api/trade/cart/update-selected',
      method: 'PUT',
      data: data
    });
  },
  deleteCart: (ids) => {
    return request({
      url: '/app-api/trade/cart/delete',
      method: 'DELETE',
      params: {
        ids
      }
    });
  },
  getCartList: () => {
    return request({
      url: '/app-api/trade/cart/list',
      method: 'GET',
    });
  },
};

export default CartApi;