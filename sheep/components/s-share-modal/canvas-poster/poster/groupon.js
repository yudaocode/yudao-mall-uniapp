import sheep from '@/sheep';

const groupon = (poster) => {
  const width = poster.width;
  const userInfo = sheep.$store('user').userInfo;

  return {
    background: sheep.$url.cdn(sheep.$store('app').platform.share.posterInfo.groupon_bg),
    list: [
      {
        name: 'nickname',
        type: 'text',
        val: userInfo.nickname,
        x: width * 0.22,
        y: width * 0.06,
        paintbrushProps: {
          fillStyle: '#333',
          font: {
            fontSize: 16,
            fontFamily: 'sans-serif',
          },
        },
      },
      {
        name: 'avatar',
        type: 'image',
        val: sheep.$url.cdn(userInfo.avatar),
        x: width * 0.04,
        y: width * 0.04,
        width: width * 0.14,
        height: width * 0.14,
        d: width * 0.14,
      },
      {
        name: 'goodsImage',
        type: 'image',
        val: poster.shareInfo.poster.image,
        x: width * 0.03,
        y: width * 0.21,
        width: width * 0.94,
        height: width * 0.94,
        r: 10,
      },
      {
        name: 'goodsTitle',
        type: 'text',
        val: poster.shareInfo.poster.title,
        x: width * 0.04,
        y: width * 1.18,
        maxWidth: width * 0.91,
        line: 2,
        lineHeight: 5,
        paintbrushProps: {
          fillStyle: '#333',
          font: {
            fontSize: 14,
          },
        },
      },
      {
        name: 'goodsPrice',
        type: 'text',
        val: '￥' + poster.shareInfo.poster.price,
        x: width * 0.04,
        y: width * 1.3,
        paintbrushProps: {
          fillStyle: '#ff0000',
          font: {
            fontSize: 20,
            fontFamily: 'OPPOSANS',
          },
        },
      },
      {
        name: 'grouponNum',
        type: 'text',
        val: '2人团',
        x: width * 0.3,
        y: width * 1.32,
        paintbrushProps: {
          fillStyle: '#ff0000',
          font: {
            fontSize: 10,
            fontFamily: 'OPPOSANS',
          },
        },
      },
      // #ifndef MP-WEIXIN
      {
        name: 'qrcode',
        type: 'qrcode',
        val: poster.shareInfo.link,
        x: width * 0.75,
        y: width * 1.3,
        size: width * 0.2,
      },
      // #endif
      // #ifdef MP-WEIXIN
      {
        name: 'wxacode',
        type: 'image',
        val: sheep.$api.third.wechat.getWxacode(poster.shareInfo.path),
        x: width * 0.75,
        y: width * 1.3,
        width: width * 0.2,
        height: width * 0.2,
      },
      // #endif
    ],
  };
};

export default groupon;
