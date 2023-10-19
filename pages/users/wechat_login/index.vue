<template>
	<view class="page">
		<view class="system-height" :style="{height:statusBarHeight}"></view>
		<!-- #ifdef MP -->
		<view class="title-bar" style="height: 43px;">
			<view class="icon" @click="back" v-if="!isHome">
				<image src="../static/left.png"></image>
			</view>
			<view class="icon" @click="home" v-else>
				<image src="../static/home.png"></image>
			</view>
			账户登录
		</view>
		<!-- #endif -->
		<view class="wechat_login">
			<view class="img">
				<image src="../static/wechat_login.png" mode="widthFix"></image>
			</view>
			<view class="btn-wrapper">
				<!-- #ifdef H5 -->
				<button hover-class="none" @click="wechatLogin" class="bg-green btn1">微信登录</button>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<button hover-class="none" @tap="getUserProfile" class="bg-green btn1">微信登录</button>
				<!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <button open-type="getPhoneNumber" type="primary" @getphonenumber="getPhoneNumber">一键登录</button>
        <!-- #endif -->
				<!-- <button hover-class="none" @click="isUp = true" class="btn2">手机号登录</button> -->
			</view>
		</view>
		<block v-if="isUp">
			<mobileLogin :isUp="isUp" @close="maskClose" @wechatPhone="wechatPhone"
                   :social-code="socialCode" :social-state="socialState" />
		</block>
		<block v-if="isPhoneBox">
			<routinePhone :logoUrl="logoUrl" :isPhoneBox="isPhoneBox" @close="bindPhoneClose" :authKey="authKey">
			</routinePhone>
		</block>
	</view>
</template>
<script>
	const app = getApp();
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
  import * as UserApi from "@/api/member/user";
  import * as AuthApi from "@/api/member/auth";
  import mobileLogin from '@/components/login_mobile/index.vue'
	import routinePhone from '@/components/login_mobile/routine_phone.vue'
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
  import { getUserPhone } from '@/api/public';
	import Routine from '@/libs/routine';
	import wechat from "@/libs/wechat";
	export default {
		data() {
			return {
				isUp: false,
				phone: '',
				statusBarHeight: statusBarHeight,
				isHome: false,
				isPhoneBox: false,
				// logoUrl: '',
				code: '',
				authKey: '',
				options: '',
				userInfo: {},
				codeNum: 0,

        socialCode: '',
        socialState: '',
			}
		},
		components: {
			mobileLogin,
			routinePhone
		},
		onLoad(options) {
			// getLogo().then(res => {
			// 	this.logoUrl = res.data.logoUrl
			// })

			// #ifdef H5
			document.body.addEventListener("focusout", () => {
				setTimeout(() => {
					const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop ||
						0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
				}, 100);
			});
			const { code, state } = options;
			this.options = options
			// 获取确认授权code
			this.code = code || ''
      if (code && this.options.scope !== 'snsapi_base') {
				let spread = app.globalData.spid ? app.globalData.spid : 0;
				// 公众号授权登录回调
				wechat.auth(code, state, spread).then(res => {
          this.getUserInfo();
          this.wechatPhone();
				}).catch(error => {
          // 异常的情况，说明可能是账号没登录，所以发起手机绑定
          this.socialCode = code;
          this.socialState = state;
          this.isUp = true
        });
			}
			// #endif
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			home() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 弹窗关闭
			maskClose() {
				this.isUp = false
			},
			bindPhoneClose(data) {
				if (data.isStatus) {
					this.isPhoneBox = false
					this.$util.Tips({
						title: '登录成功',
						icon: 'success'
					}, {
						tab: 3
					})
				} else {
					this.isPhoneBox = false
				}
			},
      getUserInfo() {
        UserApi.getUserInfo().then(res => {
          uni.hideLoading();
          this.userInfo = res.data
          this.$store.commit("UPDATE_USERINFO", res.data);
          this.$util.Tips({
            title: '登录成功',
            icon: 'success'
          }, {
            tab: 3
          })
        });
      },
      bindBrokerUser() {
        const spread = this.$Cache.get("spread");
        if (spread > 0) {
          BrokerageAPI.bindBrokerageUser(spread)
        }
      },
			// #ifdef MP
			getUserProfile() {
				let self = this;
				uni.showLoading({
					title: '正在登录中'
				});
				Routine.getUserProfile()
					.then(res => {
						Routine.getCode()
							.then(code => {
								self.getWxUser(code, res);
							})
							.catch(res => {
								uni.hideLoading();
							});
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
      /**
       * 微信一键登录
       */
      async getPhoneNumber(e) {
        // 情况一：拒绝授权手机号码
        const phoneCode = e.detail.code
        if (!e.detail.code) {
          uni.showModal({
            title: '授权失败',
            content: '您已拒绝获取绑定手机号登录授权，可以使用其他手机号验证登录',
            confirmText: '知道了',
            confirmColor: '#3C9CFFFF'
          })
          return;
        }
        // 情况二：允许授权手机号码
        const loginCode = await Routine.getCode()
        AuthApi.weixinMiniAppLogin(phoneCode, loginCode).then(res => {
          const data = res.data;
          // TODO 芋艿：refreshToken 机制
          this.$store.commit("LOGIN", {
            'token': data.accessToken
          });
          this.getUserInfo();
          this.bindBrokerUser();
        }).catch(e => {
          this.$util.Tips({
            title: e
          });
        });
      },
			// #endif

			// #ifdef H5
			// 公众号登录
			wechatLogin() {
        debugger
				if (!this.code && this.options.scope !== 'snsapi_base') {
					this.$wechat.oAuth('snsapi_userinfo', '/pages/users/wechat_login/index');
				} else {
					this.isUp = true;
				}
			},
			// 输入手机号后的回调
			wechatPhone() {
        debugger
				this.$Cache.clear('snsapiKey');
				if (this.options.back_url) {
					let url = uni.getStorageSync('snRouter');
					url = url.indexOf('/pages/index/index') != -1 ? '/' : url;
					if (url.indexOf('/pages/users/wechat_login/index') !== -1) {
						url = '/';
					}
					if (!url) {
						url = '/pages/index/index';
					}
					this.isUp = false
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					setTimeout(res => {
						location.href = url
					}, 800)
				} else {
					uni.navigateBack()
				}
			}
			// #endif
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
		height: 100%;
	}

	.page {
		background: #fff;
		height: 100%;
	}

	.wechat_login {
		padding: 72rpx 34rpx;

		.img image {
			width: 100%;
		}

		.btn-wrapper {
			margin-top: 86rpx;
			padding: 0 66rpx;

			button {
				width: 100%;
				height: 86rpx;
				line-height: 86rpx;
				margin-bottom: 40rpx;
				border-radius: 120rpx;
				font-size: 30rpx;

				&.btn1 {
					color: #fff;
				}

				&.btn2 {
					color: #666666;
					border: 1px solid #666666;
				}
			}
		}
	}

	.title-bar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
	}

	.icon {
		position: absolute;
		left: 30rpx;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 86rpx;
		height: 86rpx;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>
