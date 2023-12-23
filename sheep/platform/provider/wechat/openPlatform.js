// 登录
import third from '@/sheep/api/third';

// TODO 芋艿：等后面搞 App 再弄

const load = async () => {};

// 微信开放平台移动应用授权登陆
const login = () => {
  return new Promise(async (resolve, reject) => {
    const loginRes = await uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
    });
    debugger
    if (loginRes.errMsg == 'login:ok') {
      const res = await third.wechat.login({
        platform: 'openPlatform',
        shareInfo: uni.getStorageSync('shareLog') || {},
        payload: encodeURIComponent(
          JSON.stringify({
            code: loginRes.code,
          }),
        ),
      });

      if (res.error === 0) {
        resolve(true);
      }
    } else {
      uni.showToast({
        icon: 'none',
        title: loginRes.errMsg,
      });
    }
    resolve(false);
  });
};

export default {
  load,
  login,
};
