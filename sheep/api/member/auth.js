import request from '@/sheep/request2';

const AuthUtil = {
  // 发送手机验证码
  sendSmsCode: (mobile, scene) => {
    return request({
      url: '/app-api/member/auth/send-sms-code',
      method: 'POST',
      data: {
        mobile,
        scene
      }
    });
  },

  // 登出系统
  logout: () => {
    return request({
      url: '/app-api/member/auth/logout',
      method: 'POST'
    });
  },
};

export default AuthUtil;
