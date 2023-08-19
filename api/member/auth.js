import request from "@/utils/request.js";

// 发送手机验证码
export function sendSmsCode(mobile, scene) {
  return request.post('app-api/member/auth/send-sms-code', {
    mobile,
    scene
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 校验手机验证码
export function validateSmsCode(mobile, scene, code) {
  return request.post('app-api/member/auth/validate-sms-code', {
    mobile,
    scene,
    code
  });
}

// 登出系统
export function logout() {
  return request.post('app-api/member/auth/logout');
}
