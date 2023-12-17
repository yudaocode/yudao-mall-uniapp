import request from '@/sheep/request2';

const UserApi = {
  // 重置密码
  resetUserPassword: (data) => {
    return request({
      url: '/app-api/member/user/reset-password',
      method: 'PUT',
      data
    });
  },
};

export default UserApi;
