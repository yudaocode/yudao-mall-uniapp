import request from '@/sheep/request';

export default {
  // TODO 芋艿：测试
  getUsedDiyTemplate: () =>
    request({
      url: '/app-api/promotion/diy-template/used',
      method: 'GET',
    }),
};
