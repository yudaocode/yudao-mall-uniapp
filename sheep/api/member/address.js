import request2 from '@/sheep/request2';

const AddressApi = {
  // 获得用户收件地址列表
  getAddressList: () => {
    return request2({
      url: '/app-api/member/address/list',
      method: 'GET'
    });
  },
};

export default AddressApi;
