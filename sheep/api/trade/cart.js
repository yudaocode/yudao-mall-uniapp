import request2 from '@/sheep/request2';

const CartApi = {
  addCart: (data) => {
    return request2({
      url: '/app-api/trade/cart/add',
      method: 'POST',
      data: data,
      // TODO 芋艿：这里没提示
      custom: {
        showSuccess: true,
        successMsg: '已添加到购物车~',
      }
    });
  },
  updateCartCount: (data) => {
    return request2({
      url: '/app-api/trade/cart/update-count',
      method: 'PUT',
      data: data
    });
  },
  updateCartSelected: (data) => {
    return request2({
      url: '/app-api/trade/cart/update-selected',
      method: 'PUT',
      data: data
    });
  },
  deleteCart: (ids) => {
    return request2({
      url: '/app-api/trade/cart/delete',
      method: 'DELETE',
      params: {
        ids
      }
    });
  },
  getCartList: () => {
    return request2({
      url: '/app-api/trade/cart/list',
      method: 'GET',
    });
  },
};

export default CartApi;