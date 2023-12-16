import request2 from '@/sheep/request2';

const AuthUtil = {
  // 登出系统
  logout: () => {
    return request2({
      url: '/app-api/member/auth/logout',
      method: 'POST'
    });
  },

};

export default AuthUtil;
