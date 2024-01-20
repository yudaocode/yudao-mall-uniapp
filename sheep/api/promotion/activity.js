import request from '@/sheep/request';

const ActivityApi = {
  // 获得单个商品，近期参与的每个活动
  getActivityListBySpuId: (spuId) => {
    return request({
      url: '/promotion/activity/list-by-spu-id',
      method: 'GET',
      params: {
        spuId,
      },
    });
  },
};

export default ActivityApi;
