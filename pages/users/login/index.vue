<template>
	<div class="login-wrapper">
		<div class="shading">
			 <image src="/static/images/logo2.png" />
		</div>
		<div class="whiteBg">
			<div class="list" v-if="current !== 1">
				<form @submit.prevent="submit">
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/phone_1.png"  style="width: 24rpx; height: 34rpx;" />
							<input type="text" class="texts" placeholder="输入手机号码" v-model="account" required/>
						</div>
					</div>
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/code_2.png" style="width: 28rpx; height: 32rpx;"></image>
							<input type="password" class="texts" placeholder="填写登录密码" v-model="password" required />
						</div>
					</div>
				</form>
			</div>
			<div class="list" v-if="current !== 0 || appLoginStatus || appleLoginStatus">
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/phone_1.png" style="width: 24rpx; height: 34rpx;"></image>
						<input type="text" class="texts" placeholder="输入手机号码" v-model="account" />
					</div>
				</div>
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png" style="width: 28rpx; height: 32rpx;"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="captcha" />
						<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
							{{ text }}
						</button>
					</div>
				</div>
				<div class="item" v-if="isShowCode">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png" style="width: 28rpx; height: 32rpx;"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="codeVal" />
					</div>
				</div>
			</div>
      <!-- 登录方式一：验证码登录 -->
			<div class="logon" @click="loginMobile" v-if="current !== 0">登录</div>
      <!-- 登录方式二：密码登录 -->
      <div class="logon" @click="submit" v-if="current === 0">登录</div>
			<div class="tips">
				<div v-if="current === 0" @click="current = 1">快速登录</div>
				<div v-if="current === 1" @click="current = 0">账号登录</div>
      </div>
		</div>
		<div class="bottom"></div>
	</div>
</template>
<script>
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import * as AuthApi from "@/api/member/auth";
	import * as UserApi from "@/api/member/user";
	import { appAuth, appleLogin } from "@/api/public";
	const BACK_URL = "login_back_url";
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
  import Routine from '@/libs/routine.js';
  export default {
		name: "Login",
		mixins: [sendVerifyCode],
		data: function() {
			return {
				current: 1, // 1：快速登录；2：账号登录
				account: "",
				password: "",
				captcha: "",
				type: "login",
				codeVal: "",
				isShowCode: false,
				platform: '',
				appLoginStatus: false, // 微信登录强制绑定手机号码状态
				appUserInfo: null, // 微信登录保存的用户信息
				appleLoginStatus: false, // 苹果登录强制绑定手机号码状态
				appleUserInfo: null,
				appleShow: false // 苹果登录版本必须要求ios13以上的
			};
		},
		onLoad() {
			let self = this
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform.toLowerCase() === 'ios' && res.system.split(' ')[1] >= 13) {
						self.appleShow = true
					}
				}
			});
		},
		methods: {
			// 苹果登录
			appleLogin() {
				let self = this
				this.account = ''
				this.captcha = ''
				uni.showLoading({
					title: '登录中'
				})
				uni.login({
					provider: 'apple',
					timeout: 10000,
					success(loginRes) {
						uni.getUserInfo({
							provider: 'apple',
							success: function(infoRes) {
								self.appleUserInfo = infoRes.userInfo
								self.appleLoginApi()
							},
							fail() {
								uni.hideLoading()
								uni.showToast({
									title: '获取用户信息失败',
									icon: 'none',
									duration: 2000
								})
							},
							complete() {
								uni.hideLoading()
							}
						});
					},
					fail(error) {
						uni.hideLoading()
						console.log(error)
					}
				})
			},
			// 苹果登录Api
			appleLoginApi() {
				let self = this
				appleLogin({
					openId: self.appleUserInfo.openId,
					email: self.appleUserInfo.email == undefined ? '' :self.appleUserInfo.email,
					identityToken: self.appleUserInfo.identityToken || ''
				}).then((res) => {
					this.$store.commit("LOGIN", {
						'token': res.data.token
					});
					this.getUserInfo(res.data);
				}).catch(error => {
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: `错误信息${error}`,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				})
			},
			// App微信登录
			wxLogin() {
				let self = this
				this.account = ''
				this.captcha = ''
				uni.showLoading({
					title: '登录中'
				})
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								uni.hideLoading();
								self.appUserInfo = infoRes.userInfo
								self.appUserInfo.type = self.platform === 'ios' ? 'iosWx' : 'androidWx'
								self.wxLoginGo(self.appUserInfo)
							},
							fail() {
								uni.hideLoading();
								uni.showToast({
									title: '获取用户信息失败',
									icon: 'none',
									duration: 2000
								})
							},
							complete() {
								uni.hideLoading()
							}
						});
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							title: '登录失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			wxLoginGo(userInfo) {
				appAuth(userInfo).then(res => {
					if (res.data.type === 'register') {
						uni.navigateTo({
							url: '/pages/users/app_login/index?authKey='+res.data.key
						})
					}
					if (res.data.type === 'login') {
						this.$store.commit("LOGIN", {
							'token': res.data.token
						});
						this.getUserInfo(res.data);
					}
				}).catch(res => {
						that.$util.Tips({
							title: res
						});
				});
			},
      /**
       * 手机 + 验证码登录
       */
      async loginMobile() {
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
				if (!this.captcha) {
          return this.$util.Tips({
            title: '请填写验证码'
          });
        }
				if (!/^[\w\d]+$/i.test(this.captcha)) {
          return this.$util.Tips({
            title: '请输入正确的验证码'
          });
        }

        // 1. 三方登录的特殊逻辑
        let socialType = undefined;
        let socialCode = undefined;
        let socialState = undefined;
        // 1.1 微信小程序的情况
        // #ifdef MP
        socialType = 34;
        socialCode = await Routine.getCode();
        socialState = 'default'
        // #endif

        // 2. 短信登录
				AuthApi.smsLogin({
          mobile: this.account,
          code: this.captcha,
          socialType: socialType,
          socialCode: socialCode,
          socialState: socialState
        }).then(res => {
          // TODO 芋艿：refreshToken 机制
          let data = res.data;
          this.$store.commit("LOGIN", {
            'token': res.data.accessToken
          });
          this.getUserInfo(data);
          this.bindBrokerUser();
        }).catch(res => {
          this.$util.Tips({
            title: res
          });
        });
			},
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
      /**
       * 手机 + 密码登录
       */
			async submit() {
				if (!this.account) {
          return this.$util.Tips({
            title: '请填写账号'
          });
        }
				if (!/^[\w\d]{5,16}$/i.test(this.account)) {
          return this.$util.Tips({
            title: '请输入正确的账号'
          });
        }
				if (!this.password) {
          return this.$util.Tips({
            title: '请填写密码'
          });
        }

        // 1. 三方登录的特殊逻辑
        let socialType = undefined;
        let socialCode = undefined;
        let socialState = undefined;
        // 1.1 微信小程序的情况
        // #ifdef MP
        socialType = 34;
        socialCode = await Routine.getCode();
        socialState = 'default'
        // #endif

        // 2. 执行登录
        AuthApi.login({
          mobile: this.account,
          password: this.password,
          socialType: socialType,
          socialCode: socialCode,
          socialState: socialState
        }).then(({ data }) => {
          // TODO 芋艿：refreshToken 机制
          this.$store.commit("LOGIN", {
            'token': data.accessToken
          });
          this.getUserInfo(data);
          this.bindBrokerUser();
        }).catch(e => {
          this.$util.Tips({
            title: e
          });
        });
			},
      getUserInfo(data) {
        this.$store.commit("SETUID", data.userId);
        this.$store.commit("OPENID", data.openid);
        UserApi.getUserInfo().then(res => {
          this.$store.commit("UPDATE_USERINFO", res.data);
          // 调回登录前页面
          let backUrl = this.$Cache.get(BACK_URL) || "/pages/index/index";
          if (backUrl.indexOf('/') !== 0) {
            backUrl = '/' + backUrl;
          }
          if (backUrl.indexOf('/pages/users/login/index') === 0) {
            backUrl = '/pages/index/index';
          }
          uni.reLaunch({
            url: backUrl
          });
        })
			},
      bindBrokerUser() {
        const spread = this.$Cache.get("spread");
        if (spread > 0) {
          BrokerageAPI.bindBrokerageUser(spread)
        }
      }
		}
	};
</script>
<style lang="scss" scoped>
	page {
		background: #fff;
	}
	.appLogin {
		margin-top: 60rpx;

		.hds {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			color: #B4B4B4;

			.line {
				width: 68rpx;
				height: 1rpx;
				background: #CCCCCC;
			}

			p {
				margin: 0 20rpx;
			}
		}

		.btn-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
			}

			.apple-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 30rpx;
				background: #000;
				border-radius: 34rpx;
				font-size: 40rpx;

				.icon-s-pingguo {
					color: #fff;
					font-size: 40rpx;
				}
			}

			.iconfont {
				font-size: 40rpx;
				color: #fff;
			}

			.wx {
				margin-right: 30rpx;
				background-color: #61C64F;
			}

			.mima {
				background-color: #28B3E9;
			}

			.yanzheng {
				background-color: #F89C23;
			}

		}
	}

	.code img {
		width: 100%;
		height: 100%;
	}

	.acea-row.row-middle {
		input {
			margin-left: 20rpx;
			display: block;
		}
	}

	.login-wrapper {
		padding: 30rpx;

		.shading {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;

			/* #ifdef APP-VUE */
			margin-top: 50rpx;
			/* #endif */
			/* #ifndef APP-VUE */

			margin-top: 200rpx;
			/* #endif */


			image {
				width: 180rpx;
				height: 180rpx;
			}
		}

		.whiteBg {
			margin-top: 100rpx;

			.list {
				border-radius: 16rpx;
				overflow: hidden;

				.item {
					border-bottom: 1px solid #F0F0F0;
					background: #fff;

					.row-middle {
						position: relative;
						padding: 16rpx 45rpx;

						.texts{
							flex: 1;
							font-size: 28rpx;
							height: 80rpx;
							line-height: 80rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						input {
							flex: 1;
							font-size: 28rpx;
							height: 80rpx;
							line-height: 80rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						.code {
							position: absolute;
							right: 30rpx;
							top: 50%;
							color: $theme-color;
							font-size: 26rpx;
							transform: translateY(-50%);
						}
					}
				}
			}

			.logon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 86rpx;
				margin-top: 80rpx;
				background-color: $theme-color;
				border-radius: 120rpx;
				color: #FFFFFF;
				font-size: 30rpx;
			}

			.tips {
				margin: 30rpx;
				text-align: center;
				color: #999;
			}
		}
	}
</style>
