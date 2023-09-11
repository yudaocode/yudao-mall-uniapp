<template>
	<view v-if="isUp">
		<view class="mobile-bg" v-if="isShow" @click="close"></view>
		<view class="mobile-mask animated" :class="{slideInUp:isUp}" :style="{position:isPos?'fixed':'static'}">
			<view class="input-item">
				<input type="text" v-model="account" placeholder="输入手机号" />
			</view>
			<view class="input-item">
				<input type="text" v-model="codeNum" placeholder="输入验证码" />
				<button class="code" :disabled="disabled" @click="code">{{text}}</button>
			</view>
			<view class="sub_btn" @click="loginBtn">{{(!userInfo.phone && isLogin) || (userInfo.phone && isLogin)?'立即绑定':'立即登录'}}</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {mapGetters} from "vuex";
  import * as AuthApi from "@/api/member/auth";
  import * as UserApi from "@/api/member/user";
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
	import { iosBinding } from '@/api/public';
	const BACK_URL = "login_back_url";
	export default {
		name: 'login_mobile',
		computed: mapGetters(['userInfo','isLogin']),
		props: {
			isUp: {
				type: Boolean,
				default: false,
			},
			authKey: {
				type: String,
				default: '',
			},
      socialCode: {
        type: String,
        default: '',
      },
      socialState: {
        type: String,
        default: '',
      },
			isShow: {
				type: Boolean,
				default: true
			},
			isPos: {
				type: Boolean,
				default: true
			},
			appleShow: {
				type: String,
				default: ''
			},
			platform: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				account: '',
				codeNum: '',
				isApp: 0
			}
		},
		mixins: [sendVerifyCode],
		methods: {
			// 获取验证码
			async code() {
				if (!this.account) {
          return this.$util.Tips({
            title: '请填写手机号码'
          });
        }
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.account)) {
          return this.$util.Tips({
            title: '请输入正确的手机号码'
          });
        }
        await AuthApi.sendSmsCode(this.account, 1)
          .then(res => {
            this.$util.Tips({title:res.message});
            this.sendCode();
          })
          .catch(err => {
            return this.$util.Tips({
              title: err
            });
          });
			},
			close() {
				this.$emit('close', false)
			},
			// 登录
			loginBtn() {
				if (!this.account) {
          return this.$util.Tips({
            title: '请填写手机号码'
          });
        }
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.account)) {
          return this.$util.Tips({
            title: '请输入正确的手机号码'
          });
        }
				if (!this.codeNum) return this.$util.Tips({
					title: '请填写验证码'
				});
				if (!/^[\w\d]+$/i.test(this.codeNum)) {
          return this.$util.Tips({
            title: '请输入正确的验证码'
          });
        }
				uni.showLoading({
					title: !this.userInfo.phone && this.isLogin?'正在绑定中':'正在登录中'
				});
				if (!this.userInfo.phone && this.isLogin) {
          // TODO 芋艿：不晓得它要搞啥哈？？？
					iosBinding({
						captcha: this.codeNum,
						phone: this.account
					}).then(res => {
						this.$util.Tips({
							title: '绑定手机号成功',
							icon: 'success'
						}, {
							tab: 3
						})
            this.isApp = 1;
            this.getUserInfo();
					}).catch(error => {
						uni.hideLoading()
            this.$util.Tips({
							title: error
						})
					})
				} else {
          AuthApi.smsLogin({
            mobile: this.account,
            code: this.codeNum,
            socialType: 31,
            socialCode: this.socialCode,
            socialState: this.socialState
					}).then(res => {
            // TODO 芋艿：refreshToken 机制
            let data = res.data;
            this.$store.commit("LOGIN", {
              'token': res.data.accessToken
            });
            this.getUserInfo(data);
            this.bindBrokerUser();
					}).catch(error => {
						uni.hideLoading()
						this.$util.Tips({
							title: error
						})
					})
				}
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function(data) {
        this.$store.commit("SETUID", data.userId);
        this.$store.commit("OPENID", data.openid);
        UserApi.getUserInfo().then(res => {
					uni.hideLoading();
          this.$store.commit("UPDATE_USERINFO", res.data);
          // 调回登录前页面
          // #ifdef MP
					this.$util.Tips({
						title: '登录成功',
						icon: 'success'
					}, {
						tab: 3
					})
					this.close()
					// #endif
					// #ifdef H5
					this.$emit('wechatPhone', true)
					// #endif
				});
			},
      bindBrokerUser() {
        const spread = this.$Cache.get("spread");
        if (spread > 0) {
          BrokerageAPI.bindBrokerageUser(spread)
        }
      }
		}
	}
</script>

<style lang="stylus" scoped>
	.mobile-bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}

	.isPos {
		position: static;
	}

	.mobile-mask {
		z-index: 20;
		// position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 67rpx 30rpx;
		background: #fff;

		.input-item {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 86rpx;
			margin-bottom: 38rpx;

			input {
				flex: 1;
				display: block;
				height: 100%;
				padding-left: 40rpx;
				border-radius: 43rpx;
				border: 1px solid #DCDCDC;
			}

			.code {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 220rpx;
				height: 86rpx;
				margin-left: 30rpx;
				background: rgba(233, 51, 35, 0.05);
				font-size: 28rpx;
				color: $theme-color;
				border-radius: 43rpx;

				&[disabled] {
					background: rgba(0, 0, 0, 0.05);
					color: #999;
				}
			}
		}

		.sub_btn {
			width: 690rpx;
			height: 86rpx;
			line-height: 86rpx;
			margin-top: 60rpx;
			background: #E93323;
			border-radius: 43rpx;
			color: #fff;
			font-size: 28rpx;
			text-align: center;
		}
	}

	.animated {
		animation-duration: .4s
	}
</style>
