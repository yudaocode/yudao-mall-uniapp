import request from '@/sheep/request';

const SocialApi = {
  // 获得社交用户
  getSocialUser: (type) => {
    return request({
      url: '/member/social-user/get',
      method: 'GET',
      params: {
        type
      },
      custom: {
        showLoading: false,
      },
    });
  },
  // 社交绑定
  socialBind: (type, code, state) => {
    return request({
      url: '/member/social-user/bind',
      method: 'POST',
      data: {
        type,
        code,
        state
      },
      custom: {
        custom: {
          showSuccess: true,
          loadingMsg: '绑定中',
          successMsg: '绑定成功',
        },
      },
    });
  },
  // 社交绑定
  socialUnbind: (type, openid) => {
    return request({
      url: '/member/social-user/unbind',
      method: 'DELETE',
      data: {
        type,
        openid
      },
      custom: {
        showLoading: false,
        loadingMsg: '解除绑定',
        successMsg: '解绑成功',
      },
    });
  },
};

export default SocialApi;