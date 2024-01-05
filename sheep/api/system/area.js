import request from '@/sheep/request';

const AreaApi = {
  // 获得地区树
  getAreaTree: () => {
    return request({
      url: '/app-api/system/area/tree',
      method: 'GET'
    });
  },
};

export default AreaApi;
