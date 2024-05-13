import user from './user';
import goods from './goods';
import groupon from './groupon';

export function getPosterData(options) {
  switch (options.shareInfo.poster.type) {
    case 'user':
      return user(options);
    case 'goods':
      return goods(options);
    case 'groupon':
      return groupon(options);
  }
}

export function formatImageUrlProtocol(url) {
  // #ifdef H5
  // H5平台 https协议下需要转换
  if (window.location.protocol === 'https:' && url.indexOf('http:') === 0) {
    url = url.replace('http:', 'https:');
  }
  // #endif

  // #ifdef MP-WEIXIN
  // 小程序平台 需要强制转换为https协议
  if (url.indexOf('http:') === 0) {
    url = url.replace('http:', 'https:');
  }
  // #endif

  return url;
}


export function getBase64Src(base64data, appType) {
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
  switch (appType) {
    case 'wechat':
      const filePath = `${wx.env.USER_DATA_PATH}/tmp_base64src.${format}`;
      return new Promise((resolve, reject) => {
        const fileManager = uni.getFileSystemManager();
        fileManager.writeFile({
          filePath: filePath,
          data: bodyData, // base64 数据
          encoding: 'base64', // 字符编码
          success: () => {
            resolve(filePath);
          },
          file: (err) => {
            console.log('base64 保存失败', err);
          },
        });
      });
    default:
      console.warn('获得 base64 图片地址只做了微信小程序端的转换，其它端请自行实现！！！');
      break;
  }
}

