import request2 from '@/sheep/request2';

const AreaApi = {
  // 获得地区树
  getAreaTree: () => {
    return request2({
      url: '/app-api/system/area/tree',
      method: 'GET'
    });
  },
};

export default AreaApi;
