<template>
	<view>
		<view class="ChangePassword">
			<view class="list">
				<view class="item" v-if="isNew">
					<input type='number' disabled='true' placeholder-class='placeholder' v-model="userInfo.mobile" />
				</view>
				<view class="item" v-if="!isNew">
					<input type='number' placeholder='填写新的手机号码' placeholder-class='placeholder' v-model="phone" />
				</view>
				<view class="item acea-row row-between-wrapper">
					<input type='number' placeholder='填写验证码' placeholder-class='placeholder' class="codeIput" v-model="captcha" />
					<button class="code font-color" :class="disabled === true ? 'on' : ''" :disabled='disabled' @click="code">
						{{ text }}
					</button>
				</view>
			</view>
			<button form-type="submit" v-if="isNew" class="confirmBnt bg-color" @click="next">下一步</button>
			<button form-type="submit" v-if="!isNew" class="confirmBnt bg-color"  @click="editPwd">保存</button>
		</view>
	</view>
</template>
<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
  import * as AuthUtil from '@/api/member/auth.js';
  import * as UserApi from '@/api/member/user.js';
  export default {
		data() {
			return {
				phone: '', // 需要更换的手机号
				captcha: '',
				isNew: true, // true 是第一步，校验老的手机号验证码；false 是第二步，校验新手机号的验证码；
        oldCaptcha: '', // 进入第二步时，需要使用它保存老的手机验证码

        timer: '',
				text: '获取验证码',
				nums: 60,
        disabled: false
			};
		},
		computed: mapGetters(['isLogin','userInfo']),
		onLoad() {
			if (!this.isLogin) {
        toLogin();
      }
		},
		methods: {
			getTimes() {
				this.nums = this.nums - 1;
				this.text = "剩余 " + this.nums + "s";
				if (this.nums < 0) {
				  clearInterval(this.timer);
				}
				this.text = "剩余 " + this.nums + "s";
				if (this.text < "剩余 " + 0 + "s") {
				  this.disabled = false;
				  this.text = "重新获取";
				}
			},
			next() {
				if (!this.captcha) {
          return this.$util.Tips({
            title: '请填写验证码'
          });
        }
        // 校验验证码是否正确
        uni.showLoading({
          title: '加载中',
          mask: true
        });
				AuthUtil.validateSmsCode(
          this.userInfo.mobile,
          2,
          this.captcha
				).then(res => {
					uni.hideLoading();
					this.isNew = false;
          this.oldCaptcha = this.captcha;
					this.captcha = '';
					clearInterval(this.timer);
					this.disabled = false;
					this.text = "获取验证码";
				}).catch(err => {
          uni.hideLoading();
          return this.$util.Tips({
						title: err
					});
				})
			},
			editPwd: function() {
				if (!this.phone) {
          return this.$util.Tips({
            title: '请填写手机号码！'
          });
        }
				if (!(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.phone))) {
          return this.$util.Tips({
            title: '请输入正确的手机号码！'
          });
        }
				if (!this.captcha) {
          return this.$util.Tips({
            title: '请填写验证码'
          });
        }
				uni.showModal({
					title: '是否更换绑定账号',
					confirmText: '绑定',
					success: (res) => {
						if (!res.confirm) {
              return this.$util.Tips({
                title: '您已取消更换绑定！'
              }, {
                tab: 5,
                url: '/pages/users/user_info/index'
              });
            }
            UserApi.updateUserMobile({
              mobile: this.phone,
              code: this.captcha,
              oldCode: this.captcha
            }).then(res => {
              return this.$util.Tips({
                title: '手机修改成功',
                icon: 'success'
              }, {
                tab: 5,
                url: '/pages/users/user_info/index'
              });
            }).catch(err => {
              return this.$util.Tips({
                title: err
              });
            })
					}
				});
			},
			/**
			 * 发送验证码
			 */
			async code() {
				if (!this.isNew) {
					if (!this.phone) {
            return this.$util.Tips({
              title: '请填写手机号码！'
            });
          }
					if (!(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.phone))) {
            return this.$util.Tips({
              title: '请输入正确的手机号码！'
            });
          }
				}
        // 执行验证码的发送
        this.nums = 60;
        uni.showLoading({
          title: '加载中',
          mask: true
        });
				await AuthUtil.sendSmsCode(this.isNew ? this.userInfo.mobile : this.phone, 2).then(res => {
					this.$util.Tips({
						title: '验证码已发送'
					});
					this.timer = setInterval(this.getTimes, 1000);
          this.disabled = true;
          uni.hideLoading();
				}).catch(err => {
					return this.$util.Tips({
						title: err
					});
					uni.hideLoading();
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	page {
		background-color: #fff !important;
	}

	.ChangePassword .phone {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 55rpx;
	}

	.ChangePassword .list {
		width: 580rpx;
		margin: 53rpx auto 0 auto;
	}

	.ChangePassword .list .item {
		width: 100%;
		height: 110rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.ChangePassword .list .item input {
		width: 100%;
		height: 100%;
		font-size: 32rpx;
	}

	.ChangePassword .list .item .placeholder {
		color: #b9b9bc;
	}

	.ChangePassword .list .item input.codeIput {
		width: 340rpx;
	}

	.ChangePassword .list .item .code {
		font-size: 32rpx;
		// background-color: #fff;
	}

	.ChangePassword .list .item .code.on {
		color: #b9b9bc !important;
	}

	.ChangePassword .confirmBnt {
		font-size: 32rpx;
		width: 580rpx;
		height: 90rpx;
		border-radius: 45rpx;
		color: #fff;
		margin: 92rpx auto 0 auto;
		text-align: center;
		line-height: 90rpx;
	}
</style>
