<template>
	<view class="register absolute">
	    <view class="shading">
        <view class="pictrue acea-row row-center-wrapper">
          <image src="../../static/images/logo2.png" />
	      </view>
	    </view>
	    <view class="whiteBg">
	      <view class="title">找回密码</view>
	      <view class="list">
	        <view class="item">
	          <view class="acea-row row-middle">
              <image src="/static/images/phone_1.png" />
	            <input type="text" placeholder="输入手机号码" placeholder-class="placeholder" v-model="mobile" class="input"/>
	          </view>
	        </view>
	        <view class="item">
            <view class="align-left acea-row row-middle">
              <image src="/static/images/code_2.png" />
	            <input type="text" placeholder="填写验证码" class="codeIput" v-model="captcha" placeholder-class="placeholder"/>
	            <button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
	              {{ text }}
	            </button>
	          </view>
	        </view>
	        <view class="item">
	          <view class="acea-row row-middle">
	            <image src="/static/images/code_1.png" />
	            <input type="password" placeholder="填写您的登录密码" v-model="password" placeholder-class="placeholder" class="input"/>
	          </view>
	        </view>
	      </view>
	      <view class="logon" @click="registerReset">确认</view>
        <navigator url="/pages/users/login/index" class="tip">
          <text class="font-color">立即登录</text>
	      </navigator>
	    </view>
	    <view class="bottom" />
	  </view>
</template>

<script>
	import sendVerifyCode from "@/mixins/SendVerifyCode";
  import * as AuthUtil from '@/api/member/auth.js';
  import * as UserApi from '@/api/member/user.js';
  export default {
	  data() {
	    return {
	      mobile: "",
	      password: "",
	      captcha: ""
	    };
	  },
	  mixins: [sendVerifyCode],
	  methods: {
	    registerReset() {
        if (!this.mobile) {
          return this.$util.Tips({
            title: '请填写手机号码'
          });
        }
        if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.mobile)) {
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
        if (!this.password) {
          return this.$util.Tips({
            title: '请填写密码'
          });
        }
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/i.test(this.password)) {
          return this.$util.Tips({
            title: '您输入的密码过于简单'
          });
        }
        UserApi.resetUserPassword({
          mobile: this.mobile,
          code: this.captcha,
          password: this.password
        }).then(res => {
          return this.$util.Tips({
            title: '密码找回成功',
            icon: 'success'
          }, {
            tab: 5,
            url: '/pages/users/login/index'
          });
        }).catch(res => {
          this.$util.Tips({
            title: res
          });
        });
	    },

      async code() {
        if (!this.mobile) {
          return this.$util.Tips({
            title: '请填写手机号码'
          });
        }
        if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.mobile)) {
          return this.$util.Tips({
            title: '请输入正确的手机号码'
          });
        }
        AuthUtil.sendSmsCode(this.mobile, 4).then(res => {
         this.$util.Tips({
           title: res
         });
         this.sendCode();
       }).catch(res => {
         this.$util.Tips({
           title: res
         });
       });
      }
	  }
	};
</script>

<style>
</style>
