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
  import mobileLogin from '@/components/login_mobile/index.vue'
	import routinePhone from '@/components/login_mobile/routine_phone.vue'
	import {
		getLogo,
		getUserPhone
	} from '@/api/public';
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
				logoUrl: '',
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
			getLogo().then(res => {
				this.logoUrl = res.data.logoUrl
			})

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
			// #ifdef MP
			// 小程序获取手机号码
			getphonenumber(e) {
				uni.showLoading({
					title: '正在登录中'
				});
				Routine.getCode()
					.then(code => {
						this.getUserPhoneNumber(e.detail.encryptedData, e.detail.iv, code);
					})
					.catch(error => {
						uni.$emit('closePage', false)
						uni.hideLoading();
					});
			},
			// 小程序获取手机号码回调
			getUserPhoneNumber(encryptedData, iv, code) {
				getUserPhone({
						encryptedData: encryptedData,
						iv: iv,
						code: code,
						type: 'routine',
						key: this.authKey
					})
					.then(res => {
						this.$store.commit('LOGIN', {
							token: res.data.token
						});
						this.$store.commit("SETUID", res.data.uid);
						this.getUserInfo();
						this.$util.Tips({
							title: '登录成功',
							icon: 'success'
						}, {
							tab: 3
						})

					})
					.catch(res => {
						uni.hideLoading();
						that.$util.Tips({
							title: res
						});
					});
			},
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

			getWxUser(code, res) {
				let self = this
				let userInfo = res.userInfo;
				userInfo.code = code;
				userInfo.spread_spid = app.globalData.spid; //获取推广人ID
				userInfo.spread_code = app.globalData.code; //获取推广人分享二维码ID
				userInfo.avatar = userInfo.userInfo.avatarUrl;
				userInfo.city = userInfo.userInfo.city;
				userInfo.country = userInfo.userInfo.country;
				userInfo.nickName = userInfo.userInfo.nickName;
				userInfo.province = userInfo.userInfo.province;
				userInfo.sex = userInfo.userInfo.gender;
				userInfo.type = 'routine'
				Routine.authUserInfo(userInfo.code, userInfo)
					.then(res => {
						self.authKey = res.data.key;
						if (res.data.type === 'register') {
							uni.hideLoading();
							self.isPhoneBox = true
						}
						if (res.data.type === 'login') {
							uni.hideLoading();
							self.$store.commit('LOGIN', {
								token: res.data.token
							});
							self.$store.commit("SETUID", res.data.uid);
							self.getUserInfo();
							self.$util.Tips({
								title: res,
								icon: 'success'
							}, {
								tab: 3
							})
						}
					})
					.catch(res => {
						uni.hideLoading();
						uni.showToast({
							title: res,
							icon: 'none',
							duration: 2000
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
