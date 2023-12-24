import request from '@/sheep/request';

const UserApi = {
  // 修改基本信息
  updateUser: (data) => {
    return request({
      url: '/app-api/member/user/update',
      method: 'PUT',
      data,
      custom: {
        showSuccess: true,
        auth: true,
      },
    });
  },
  // 修改用户手机
  updateUserMobile: (data) => {
    return request({
      url: '/app-api/member/user/update-mobile',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中',
        showSuccess: true,
        successMsg: '修改成功'
      },
    });
  },
  // 基于微信小程序的授权码，修改用户手机
  updateUserMobileByWeixin: (code) => {
    return request({
      url: '/app-api/member/user/update-mobile-by-weixin',
      method: 'PUT',
      data: {
        code
      },
      custom: {
        showSuccess: true,
        loadingMsg: '获取中',
        successMsg: '修改成功'
      },
    });
  },
  // 修改密码
  updateUserPassword: (data) => {
    return request({
      url: '/app-api/member/user/update-password',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中',
        showSuccess: true,
        successMsg: '修改成功'
      },
    });
  },
  // 重置密码
  resetUserPassword: (data) => {
    return request({
      url: '/app-api/member/user/reset-password',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中',
        showSuccess: true,
        successMsg: '修改成功'
      }
    });
  },

};

export default UserApi;
