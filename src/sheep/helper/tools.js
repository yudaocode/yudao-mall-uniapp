import router from '@/sheep/router';
export default {
  /**
   * 打电话
   * @param {String<Number>} phoneNumber - 数字字符串
   */
  callPhone(phoneNumber = '') {
    let num = phoneNumber.toString();
    uni.makePhoneCall({
      phoneNumber: num,
      fail(err) {
        console.log('makePhoneCall出错', err);
      },
    });
  },

  /**
   * 微信头像
   * @param {String} url -图片地址
   */
  checkMPUrl(url) {
    if (!url || typeof url !== 'string') {
      return url;
    }

    // #ifdef MP
    if (
      url.startsWith('http://') &&
      !url.startsWith('https://') &&
      !url.startsWith('http://store') &&
      !url.startsWith('http://tmp') &&
      !url.startsWith('http://usr')
    ) {
      url = url.replace('http://', 'https://');
    }
    // #endif
    return url;
  },

  /**
   * getUuid 生成唯一id
   */
  getUuid(len = 32, firstU = true, radix = null) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    radix = radix || chars.length;

    if (len) {
      // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      let r;
      // rfc4122标准要求返回的uuid中,某些位为固定的字符
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
    if (firstU) {
      uuid.shift();
      return `u${uuid.join('')}`;
    }
    return uuid.join('');
  },
};
