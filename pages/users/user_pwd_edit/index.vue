<template>
	<view>
		<view class="ChangePassword">
			<form @submit="editPwd" report-submit='true'>
				<view class="phone">当前手机号：{{ userInfo.mobile }}</view>
				<view class="list">
					<view class="item">
						<input type='password' placeholder='以字母开头，长度在6~18之间，只能包含字符、数字和下划线'
                   placeholder-class='placeholder' name="password" :value="password" />
					</view>
					<view class="item">
						<input type='password' placeholder='确认新密码' placeholder-class='placeholder'
                   name="qr_password" :value="qr_password" />
					</view>
					<view class="item acea-row row-between-wrapper">
						<input type='number' placeholder='填写验证码' placeholder-class='placeholder' class="codeIput" name="captcha" :value="captcha" />
						<button class="code font-color" :class="disabled === true ? 'on' : ''" :disabled='disabled' @click="code">
							{{ text }}
						</button>
					</view>
				</view>
				<button form-type="submit" class="confirmBnt bg-color">确认修改</button>
			</form>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
  import sendVerifyCode from "@/mixins/SendVerifyCode";
  import * as AuthUtil from '@/api/member/auth.js';
  import * as UserApi from '@/api/member/user.js';
  export default {
		data() {
			return {
				password: '',
        qr_password: '',
        captcha: '',
			};
		},
    mixins: [sendVerifyCode],
    computed: mapGetters(['isLogin', 'userInfo']),
		methods: {
			/**
			 * 发送验证码
			 */
			async code() {
				if (!this.userInfo.mobile) {
          return this.$util.Tips({
            title: '手机号码不存在，无法发送验证码！'
          });
        }
				await AuthUtil.sendSmsCode(this.userInfo.mobile, 3).then(res => {
					this.$util.Tips({
            title: '验证码已发送'
					});
					this.sendCode();
				}).catch(err => {
					return this.$util.Tips({
						title: err
					});
				});
			},

			/**
			 * H5登录 修改密码
			 */
			editPwd: function(e) {
				const password = e.detail.value.password;
        const qr_password = e.detail.value.qr_password;
				const	captcha = e.detail.value.captcha;
				if (!password) {
          return this.$util.Tips({
            title: '请输入新密码'
          });
        }
				if (!/^[a-zA-Z]\w{5,17}$/i.test(password)) {
          return this.$util.Tips({
            title: '以字母开头，长度在6~18之间，只能包含字符、数字和下划线'
          });
        }
				if (qr_password !== password) {
          return this.$util.Tips({
            title: '两次输入的密码不一致！'
          });
        }
				if (!captcha) {
          return this.$util.Tips({
            title: '请输入验证码'
          });
        }
        UserApi.updateUserPassword({
					code: captcha,
					password: password
				}).then(res => {
					return this.$util.Tips({
						title: '修改成功'
					}, {
						tab: 3,
						url: 1
					});
				}).catch(err => {
					return this.$util.Tips({
						title: err
					});
				});
			}
		}
	}
</script>
<style lang="scss">
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
		background-color: #fff;
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
