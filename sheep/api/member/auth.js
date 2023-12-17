import request from '@/sheep/request';

const AuthUtil = {
  // 发送手机验证码
  sendSmsCode: (mobile, scene) => {
    return request({
      url: '/app-api/member/auth/send-sms-code',
      method: 'POST',
      data: {
        mobile,
        scene
      },
      custom: {
        loadingMsg: '发送中',
        showSuccess: true,
        successMsg: '发送成功'
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
