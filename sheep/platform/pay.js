import sheep from '@/sheep';
// #ifdef H5
import $wxsdk from '@/sheep/libs/sdk-h5-weixin';
// #endif
import { getRootUrl } from '@/sheep/helper';
import PayOrderApi from '@/sheep/api/pay/order';

/**
 * 支付
 *
 * @param {String} payment = ['wechat','alipay','wallet','offline']  	- 支付方式
 * @param {String} orderType = ['goods','recharge','groupon']  	- 订单类型
 * @param {String} id					- 订单号
 */

export default class SheepPay {
  constructor(payment, orderType, id) {
    this.payment = payment;
    this.id = id;
    this.orderType = orderType;
    this.payAction();
  }

  payAction() {
    const payAction = {
      WechatOfficialAccount: {
        wechat: () => {
          this.wechatOfficialAccountPay();
        },
        alipay: () => {
          this.redirectPay(); // 现在公众号可以直接跳转支付宝页面
        },
        wallet: () => {
          this.walletPay();
        },
        offline: () => {
          this.offlinePay();
        }
      },
      WechatMiniProgram: {
        wechat: () => {
          this.wechatMiniProgramPay();
        },
        alipay: () => {
          this.copyPayLink();
        },
        wallet: () => {
          this.walletPay();
        },
        offline: () => {
          this.offlinePay();
        }
      },
      App: {
        wechat: () => {
          this.wechatAppPay();
        },
        alipay: () => {
          this.alipay();
        },
        wallet: () => {
          this.walletPay();
        },
        offline: () => {
          this.offlinePay();
        }
      },
      H5: {
        wechat: () => {
          this.wechatWapPay();
        },
        alipay: () => {
          this.redirectPay();
        },
        wallet: () => {
          this.walletPay();
        },
        offline: () => {
          this.offlinePay();
        }
      },
    };
    return payAction[sheep.$platform.name][this.payment]();
  }

  // 预支付
  prepay(channel) {
    return new Promise((resolve, reject) => {
      let data = {
        id: this.id,
        channelCode: channel,
        channelExtras: {}
      };
      if (uni.getStorageSync('openid')) {
        data.openid = uni.getStorageSync('openid');
      }
      PayOrderApi.submitOrder(data).then((res) => {
        // 成功时
        res.code === 0 && resolve(res);
        // 失败时
        if (res.code !== 0 && res.msg === 'miss_openid') {
          uni.showModal({
            title: '微信支付',
            content: '请先绑定微信再使用微信支付',
            success: function (res) {
              if (res.confirm) {
                sheep.$platform.useProvider('wechat').bind();
              }
            },
          });
        }
      });
    });
  }
  // #ifdef H5
  // 微信公众号JSSDK支付 TODO 芋艿：待接入
  async wechatOfficialAccountPay() {
    let that = this;
    let { error, data, msg } = await this.prepay();
    if (error !== 0) {
      console.log('支付错误', msg);
      return;
    }
    $wxsdk.wxpay(data.pay_data, {
      success: () => {
        that.payResult('success');
      },
      cancel: () => {
        sheep.$helper.toast('支付已手动取消');
      },
      fail: () => {
        that.payResult('fail');
      },
    });
  }

  //浏览器微信H5支付 TODO 芋艿：待接入
  async wechatWapPay() {
    const { error, data } = await this.prepay();
    if (error === 0) {
      const redirect_url = `${getRootUrl()}pages/pay/result?id=${this.id}&payment=${this.payment
        }&orderType=${this.orderType}`;
      location.href = `${data.pay_data.h5_url}&redirect_url=${encodeURIComponent(redirect_url)}`;
    }
  }

  // 支付链接  TODO 芋艿：待接入
  async redirectPay() {
    let { error, data } = await this.prepay();
    if (error === 0) {
      const redirect_url = `${getRootUrl()}pages/pay/result?id=${this.id}&payment=${this.payment
        }&orderType=${this.orderType}`;
      location.href = data.pay_data + encodeURIComponent(redirect_url);
    }
  }

  // #endif

  // 微信小程序支付  TODO 芋艿：待接入
  async wechatMiniProgramPay() {
    let that = this;
    let result = await this.prepay();
    uni.requestPayment({
      provider: 'wxpay',
      ...result.data.pay_data,
      success: (res) => {
        that.payResult('success');
      },
      fail: (err) => {
        if (err.errMsg === 'requestPayment:fail cancel') {
          sheep.$helper.toast('支付已手动取消');
        } else {
          that.payResult('fail');
        }
      },
    });
  }

  // 余额支付
  async walletPay() {
    const { code } = await this.prepay('wallet');
    code === 0 && this.payResult('success');
  }

  // 货到付款  TODO 芋艿：待接入
  async offlinePay() {
    const { error } = await this.prepay();
    error === 0 && this.payResult('success');
  }

  // 支付宝复制链接支付  TODO 芋艿：待接入
  async copyPayLink() {
    let that = this;
    let { error, data } = await this.prepay();
    if (error === 0) {
      // 引入showModal 点击确认 复制链接；
      uni.showModal({
        title: '支付宝支付',
        content: '复制链接到外部浏览器',
        confirmText: '复制链接',
        success: (res) => {
          if (res.confirm) {
            sheep.$helper.copyText(data.pay_data);
          }
        },
      });
    }
  }

  // 支付宝支付  TODO 芋艿：待接入
  async alipay() {
    let that = this;
    const { error, data } = await this.prepay();
    if (error === 0) {
      uni.requestPayment({
        provider: 'alipay',
        orderInfo: data.pay_data, //支付宝订单数据
        success: (res) => {
          that.payResult('success');
        },
        fail: (err) => {
          if (err.errMsg === 'requestPayment:fail [paymentAlipay:62001]user cancel') {
            sheep.$helper.toast('支付已手动取消');
          } else {
            that.payResult('fail');
          }
        },
      });
    }
  }

  // 微信支付  TODO 芋艿：待接入
  async wechatAppPay() {
    let that = this;
    let { error, data } = await this.prepay();
    if (error === 0) {
      uni.requestPayment({
        provider: 'wxpay',
        orderInfo: data.pay_data, //微信订单数据(官方说是string。实测为object)
        success: (res) => {
          that.payResult('success');
        },
        fail: (err) => {
          err.errMsg !== 'requestPayment:fail cancel' && that.payResult('fail');
        },
      });
    }
  }

  // 支付结果跳转,success:成功，fail:失败
  payResult(resultType) {
    sheep.$router.redirect('/pages/pay/result', {
      id: this.id,
      orderType: this.orderType,
      payState: resultType
    });
  }
}

export function getPayMethods(channels) {
  const payMethods = [
    {
      icon: '/static/img/shop/pay/wechat.png',
      title: '微信支付',
      value: 'wechat',
      disabled: true,
    },
    {
      icon: '/static/img/shop/pay/alipay.png',
      title: '支付宝支付',
      value: 'alipay',
      disabled: true,
    },
    {
      icon: '/static/img/shop/pay/wallet.png',
      title: '余额支付',
      value: 'wallet',
      disabled: true,
    },
    {
      icon: '/static/img/shop/pay/apple.png',
      title: 'Apple Pay',
      value: 'apple',
      disabled: true,
    },
    {
      icon: '/static/img/shop/pay/wallet.png',
      title: '模拟支付',
      value: 'mock',
      disabled: true,
    }
  ];
  const platform = sheep.$platform.name

  // 1. 处理【微信支付】
  const wechatMethod = payMethods[0];
  if ((platform === 'WechatOfficialAccount' && channels.includes('wx_pub'))
    || platform === 'WechatMiniProgram' && channels.includes('wx_lite')
    || platform === 'App' && channels.includes('wx_app')) {
    wechatMethod.disabled = false;
  }
  // 2. 处理【支付宝支付】
  const alipayMethod = payMethods[1];
  if ((platform === 'WechatOfficialAccount' && channels.includes('alipay_wap'))
    || platform === 'WechatMiniProgram' && channels.includes('alipay_wap')
    || platform === 'App' && channels.includes('alipay_app')) {
    alipayMethod.disabled = false;
  }
  // 3. 处理【余额支付】
  const walletMethod = payMethods[2];
  if (channels.includes('wallet')) {
    walletMethod.disabled = false;
  }
  // 4. 处理【苹果支付】TODO 芋艿：未来接入
  // 5. 处理【模拟支付】
  const mockMethod = payMethods[4];
  if (channels.includes('mock')) {
    mockMethod.disabled = false;
  }
  return payMethods;
}