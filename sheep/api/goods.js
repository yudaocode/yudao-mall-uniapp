import request from '@/sheep/request';
import request2 from '@/sheep/request2';

export default {
  // 商品详情
  detail: (id, params = {}) =>
    request2({
      url: 'product/spu/get-detail?id=' + id,
      method: 'GET',
      params,
      custom: {
        showLoading: false,
        showError: false,
      },
    }),

  // 商品列表
  list: (params) =>
    request2({
      url: 'product/spu/page',
      method: 'GET',
      params,
      custom: {
        showLoading: false,
        showError: false,
      },
    }),

  // 商品查询
  ids: (params = {}) =>
    request({
      url: 'goods/goods/ids',
      method: 'GET',
      params,
      custom: {
        showLoading: false,
        showError: false,
      },
    }),

  // 商品评价列表
  comment: (id, params = {}) =>
    request2({
      url: 'product/comment/list?spuId=' + id,
      method: 'GET',
      params,
      custom: {
        showLoading: false,
        showError: false,
      },
    }),
  comment2: (id, params = {pageNo:1,pageSize:10,type:0}) =>
    request2({
      url: 'product/comment/page?spuId='+id,
      method: 'GET',
      params,
      custom: {
        showLoading: false,
        showError: false,
      },
    }),
  // 商品评价类型
  getType: (id) =>
    request({
      url: 'goods/comment/getType/' + id,
      method: 'GET',
      custom: {
        showLoading: false,
        showError: false,
      },
    }),
  // 活动商品查询
  // 商品查询
  activity: (params = {}) =>
    request({
      url: 'goods/goods/activity',
      method: 'GET',
      params,
      custom: {
        showLoading: false,
        showError: false,
      },
    }),
  activityList: (params = {}) =>
    request({
      url: 'goods/goods/activityList',
      method: 'GET',
      params,
    }),
};
