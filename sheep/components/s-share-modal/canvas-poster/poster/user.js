import sheep from '@/sheep';
import { formatImageUrlProtocol, getQrcodeCss, getWxaQrcode } from './index';
import { measureTextWidth } from '@/utils/textUtils'; // 引入新封装的方法
const user = async (poster) => {
  const width = poster.width;
  const userInfo = sheep.$store('user').userInfo;
  const wxa_qrcode = await getWxaQrcode(poster.shareInfo.path, poster.shareInfo.query);
  const widthNickName = measureTextWidth(userInfo.nickname, 14); // 使用新方法
  return [
    {
      type: 'image',
      src: formatImageUrlProtocol(sheep.$url.cdn(sheep.$store('app').platform.share.posterInfo.user_bg)),
      css: {
        width,
        position: 'fixed',
        'object-fit': 'contain',
        top: '0',
        left: '0',
        // 背景图需要绘制在根节点白底之后：painter 会在根节点背景之前绘制 zIndex < 0 的 fixed 节点，导致被白底覆盖
        zIndex: 0,
      },
    },
    {
      type: 'text',
      text: userInfo.nickname,
      css: {
        color: '#333',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'sans-serif',
        position: 'fixed',
        top: width * 0.4,
        left: (width-widthNickName) / 2,
      },
    },
    {
      type: 'image',
      src: formatImageUrlProtocol(sheep.$url.cdn(userInfo.avatar)),
      css: {
        position: 'fixed',
        left: width * 0.4,
        top: width * 0.16,
        width: width * 0.2,
        height: width * 0.2,
      },
    },
    // #ifndef MP-WEIXIN
    {
      type: 'qrcode',
      text: poster.shareInfo.link,
      css: getQrcodeCss(width * 0.35, width * 0.84, width * 0.3),
    },
    // #endif
    // #ifdef MP-WEIXIN
    {
      type: 'image',
      src: wxa_qrcode,
      css: {
        position: 'fixed',
        left: width * 0.35,
        top: width * 0.84,
        width: width * 0.3,
        height: width * 0.3,
      },
    },
    // #endif
  ];
};

export default user;
