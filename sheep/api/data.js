import request from '@/sheep/request';
import request2 from '@/sheep/request2';

export default {
  area: () =>
    request2({
      url: 'system/area/tree',
      method: 'GET',
    }),
  // area: () =>
  //   request({
  //     url: 'data/area',
  //     method: 'GET',
  //   }),
  faq: () =>
    request({
      url: 'data/faq',
      method: 'GET',
    }),
  richtext: (id) =>
    request({
      url: 'data/richtext/' + id,
      method: 'GET',
    }),
};
