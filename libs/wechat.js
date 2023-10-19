// #ifdef H5
import WechatJSSDK from "@/plugin/jweixin-module/index.js";
import * as AuthApi from "@/api/member/auth";
import * as BrokerageAPI from '@/api/trade/brokerage.js'

import {
	WX_AUTH,
	STATE_KEY,
	BACK_URL
} from '@/config/cache';
import {
	parseQuery
} from '@/utils';
import store from '@/store';
import Cache from '@/utils/cache';

class AuthWechat {

	constructor() {
		this.instance = WechatJSSDK; // 微信实例化对象
		this.status = false; // 是否实例化
		this.initConfig = {};
	}

	/**
	 * 初始化 wechat(分享配置)
	 */
	wechat() {
		return new Promise((resolve, reject) => {
			// if (this.status) return resolve(this.instance);
      AuthApi.createWeixinMpJsapiSignature(location.href).then(res => {
        // debugger
        const jsapiTicket = res.data;
        jsapiTicket.jsApiList = ['chooseWXPay']; // TODO  芋艿:这里要设置下
        jsapiTicket.debug = false;
        this.instance.config(jsapiTicket);
        this.initConfig = jsapiTicket;
        this.status = true;
        this.instance.ready(() => {
          resolve(this.instance);
        })
      }).catch(err => {
        console.log('WechatJSSDK 初始化失败 ',err);
        this.status = false;
        reject(err);
      });
		});
	}

	/**
	 * 验证是否初始化
	 */
	verifyInstance() {
		let that = this;
		return new Promise((resolve, reject) => {
			if (that.instance === null && !that.status) {
				that.wechat().then(res => {
					resolve(that.instance);
				}).catch(() => {
					return reject();
				})
			} else {
				return resolve(that.instance);
			}
		})
	}
	// 微信公众号的共享地址
	openAddress() {
		return new Promise((resolve, reject) => {
			this.wechat().then(wx => {
				this.toPromise(wx.openAddress).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			})
		});
	}

    // 获取经纬度；
	location(){
		return new Promise((resolve, reject) => {
			this.wechat().then(wx => {
				this.toPromise(wx.getLocation,{type: 'wgs84'}).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			})
		});
	}

	// 使用微信内置地图查看位置接口；
	seeLocation(config){
		return new Promise((resolve, reject) => {
			this.wechat().then(wx => {
				this.toPromise(wx.openLocation, config).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			})
		});
	}

	/**
	 * 微信支付
	 * @param {Object} config
	 */
	pay(config) {
		return new Promise((resolve, reject) => {
			this.wechat().then((wx) => {
				this.toPromise(wx.chooseWXPay, config).then(res => {
					resolve(res);
				}).catch(res => {
					resolve(res);
				});
			}).catch(res => {
				reject(res);
			});
		});
	}

	toPromise(fn, config = {}) {
		return new Promise((resolve, reject) => {
			fn({
				...config,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
				complete(err) {
					reject(err);
				},
				cancel(err) {
					reject(err);
				}
			});
		});
	}

	/**
	 * 自动去授权
	 */
	oAuth(snsapiBase,url) {
		if (uni.getStorageSync(WX_AUTH) && store.state.app.token && snsapiBase === 'snsapi_base') {
      return;
    }
		const { code } = parseQuery();
		if (!code || code === uni.getStorageSync('snsapiCode')){
			return this.toAuth(snsapiBase,url);
		} else{
			if(Cache.has('snsapiKey'))
				return this.auth(code).catch(error=>{
					uni.showToast({
						title:error,
						icon:'none'
					})
				})
		}
	}

	/**
	 * 微信公众号的授权登录获取 token
   *
   * 实现逻辑是：发起社交登录
	 */
	auth(code, state, spread) {
		return new Promise((resolve, reject) => {
      // 31 的原因，它是公众号登录的社交类型
      AuthApi.socialLogin(31, code, state)
        .then(res => {
          // 设置访问令牌
          store.commit('LOGIN', {
            token: res.data.accessToken
          });
          store.commit("SETUID", res.data.userId);
          store.commit("OPENID", res.data.openid);
          // 绑定推广员
          if (spread > 0) {
            BrokerageAPI.bindBrokerageUser(spread)
          }
          // 回调
          resolve(res);
          Cache.set(WX_AUTH, code);
          Cache.clear(STATE_KEY);
        }).catch(reject);
		});
	}

	/**
	 * 获取跳转授权后的地址
	 * @param {Object} appId
	 */
	getAuthUrl(appId,snsapiBase,backUrl) {
		let url = `${location.origin}${backUrl}`
    if(url.indexOf('?') === -1){
      url = url+'?'
    }else{
      url = url+'&'
    }
    const redirect_uri = encodeURIComponent(`${url}scope=${snsapiBase}&back_url=` +
      encodeURIComponent(
        encodeURIComponent(
          uni.getStorageSync(BACK_URL) ? uni.getStorageSync(BACK_URL) : location.pathname + location.search
        )
      )
    );
    uni.removeStorageSync(BACK_URL);
    const state = encodeURIComponent(
      ("" + Math.random()).split(".")[1] + "authorizestate"
    );
    uni.setStorageSync(STATE_KEY, state);
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${snsapiBase}&state=${state}#wechat_redirect`;
  }

	/**
	 * 跳转自动登录
	 */
	toAuth(snsapiBase,backUrl) {
		let that = this;
		this.wechat().then(wx => {
			location.href = this.getAuthUrl(that.initConfig.appId,snsapiBase,backUrl);
		})
	}

	/**
	 * 绑定事件
	 * @param {Object} name 事件名
	 * @param {Object} config 参数
	 */
	wechatEvevt(name, config) {
		let that = this;
		return new Promise((resolve, reject) => {
			let configDefault = {
				fail(res) {
					if (that.instance) return reject({
						is_ready: true,
						wx: that.instance
					});
					that.verifyInstance().then(wx => {
						return reject({
							is_ready: true,
							wx: wx
						});
					})
				},
				success(res) {
					return resolve(res,2222);
				}
			};
			Object.assign(configDefault, config);
			that.wechat().then(wx => {
				if (typeof name === 'object') {
					name.forEach(item => {
						wx[item] && wx[item](configDefault)
					})
				} else {
					wx[name] && wx[name](configDefault)
				}
			})
		});
	}

  /**
   * 判断是否在微信公众号的浏览器中
   */
	isWeixin() {
		return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
	}

}

export default new AuthWechat();
// #endif
