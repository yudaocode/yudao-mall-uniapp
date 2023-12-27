import request from '@/sheep/request';
import request2 from '@/sheep/request2';

export default {
  faq: () =>
    request({
      url: 'data/faq',
      method: 'GET',
    }),
};
