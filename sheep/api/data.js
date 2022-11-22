import request from '@/sheep/request';

export default {
  area: () =>
    request({
      url: 'data/area',
      method: 'GET',
    }),
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
