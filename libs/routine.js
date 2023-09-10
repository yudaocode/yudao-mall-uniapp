import store from '../store';
import { checkLogin } from './login';
import Cache from '../utils/cache';
import { STATE_R_KEY, USER_INFO, OPENID} from './../config/cache';
import * as AuthApi from "@/api/member/auth";
import * as BrokerageAPI from '@/api/trade/brokerage.js'

class Routine
{

	constructor()
	{
	    this.scopeUserInfo = 'scope.userInfo';
	}

	async getUserCode(){
		let isAuth = await this.isAuth(), code = '' ;
		if(isAuth)
			code = await this.getCode();
		return code;
	}

	/**
	 * 获取用户信息
	 */
	getUserProfile(){
		let  that = this , code = this.getUserCode();
		return new Promise( (resolve,reject) => {
			uni.getUserProfile({
				lang: 'zh_CN',
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success(user) {
					if(code) user.code = code;
					resolve({userInfo:user,islogin:false});
				},
				fail(res){
					reject(res);
				}
			})
		})
	}

	/**
	 * 获取用户信息
	 */
	authorize()
	{
		let that = this;
		return new Promise((resolve,reject)=>{
			if(checkLogin())
				return resolve({
					userInfo:Cache.get(USER_INFO,true),
					islogin:true,
				});
			uni.authorize({
			    scope: that.scopeUserInfo,
			    success() {
					resolve({islogin:false});
			    },
				fail(res){
					reject(res);
				}
			})
		})
	}

	async getCode(){
		let provider = await this.getProvider();
		return new Promise((resolve,reject)=>{
			uni.login({
				provider:provider,
				success(res) {
					if (res.code) {
            Cache.set(STATE_R_KEY, res.code ,10800);
          }
					return resolve(res.code);
				},
				fail(){
					return reject(null);
				}
			})
		})
	}

	/**
	 * 获取服务供应商
	 */
	getProvider()
	{
		return new Promise((resolve,reject)=>{
			uni.getProvider({
				service:'oauth',
				success(res) {
					resolve(res.provider);
				},
				fail() {
					resolve(false);
				}
			});
		});
	}

	/**
	 * 是否授权
	 */
	isAuth(){
		let that = this;
		return new Promise((resolve,reject)=>{
			uni.getSetting({
				success(res) {
					if (!res.authSetting[that.scopeUserInfo]) {
						resolve(true)
					} else {
						resolve(true);
					}
				},
				fail(){
					 resolve(false);
				}
			});
		});
	}
	/**
	 * 微信小程序静默登录
   *
   * @param code 授权码
   * @param spread 推广员编号
	 */
	authUserInfo(code, spread) {
		return new Promise((resolve, reject)=>{
      // 34 的原因，它是小程序登录的社交类型
			AuthApi.socialLogin(34, code, 'default').then(res => {
        if (res.code !== 0) {
          return;
        }
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
				return resolve(res);
			}).catch(res=>{
				return reject(res);
			})
		})
	}
}

export default new Routine();
