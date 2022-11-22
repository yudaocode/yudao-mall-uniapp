import sheep from '@/sheep';

const user = (poster) => {
  const width = poster.width;
  const userInfo = sheep.$store('user').userInfo;

  return {
    background: sheep.$url.cdn(sheep.$store('app').platform.share.posterInfo.user_bg),
    list: [
      {
        name: 'nickname',
        type: 'text',
        val: userInfo.nickname,
        x: width / 2,
        y: width * 0.4,
        paintbrushProps: {
          textAlign: 'center',
          fillStyle: '#333',
          font: {
            fontSize: 14,
            fontFamily: 'sans-serif',
          },
        },
      },
      {
        name: 'avatar',
        type: 'image',
        val: sheep.$url.cdn(userInfo.avatar),
        x: width * 0.4,
        y: width * 0.16,
        width: width * 0.2,
        height: width * 0.2,
        d: width * 0.2,
      },
      // #ifndef MP-WEIXIN
      {
        name: 'qrcode',
        type: 'qrcode',
        val: poster.shareInfo.link,
        x: width * 0.35,
        y: width * 0.84,
        size: width * 0.3,
      },
      // #endif
      // #ifdef MP-WEIXIN
      {
        name: 'wxacode',
        type: 'image',
        val: sheep.$api.third.wechat.getWxacode(poster.shareInfo.path),
        x: width * 0.35,
        y: width * 0.84,
        width: width * 0.3,
        height: width * 0.3,
      },
      // #endif
    ],
  };
};

export default user;
