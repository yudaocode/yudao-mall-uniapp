import request from '@/sheep/request';

const BargainApi = {
  // 获得砍价记录的概要信息
  getBargainRecordSummary: () => {
    return request({
      url: '/promotion/bargain-record/get-summary',
      method: 'GET',
    });
  },
  // 获得砍价活动分页
  getBargainActivityPage: () => {
    return request({
      url: '/promotion/bargain-activity/page',
      method: 'GET',
    });
  },
  // 获得砍价活动详情
  getBargainActivityDetail(params) {
    return request({
      url: '/promotion/bargain-activity/get-detail',
      method: 'GET',
      params,
    });
  },
};

export default BargainApi;
