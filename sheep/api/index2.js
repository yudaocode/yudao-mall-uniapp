import request2 from '@/sheep/request2';

export default {
  decorate: () =>
    request2({
      url: 'promotion/decorate/list?page=1',
      method: 'GET',
    }),
  spids: () =>
    request2({
      url: 'product/spu/page?recommendType=best&pageNo=1&pageSize=10',
      method: 'GET',
    }),
};
