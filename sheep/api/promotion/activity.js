import request2 from '@/sheep/request2';

const ActivityApi = {
  // 获得单个商品，近期参与的每个活动
  getActivityListBySpuId: (spuId) => {
    return request2({
      url: '/app-api/promotion/activity/list-by-spu-id',
      method: 'GET',
      params: {
        spuId,
      },
    });
  },
};

export default ActivityApi;
