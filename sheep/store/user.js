import { defineStore } from 'pinia';
import userApi from '@/sheep/api/user';
import commissionApi from '@/sheep/api/commission';
import $share from '@/sheep/platform/share';
import { isEmpty, cloneDeep, clone } from 'lodash';
import cart from './cart';
import app from './app';
import { showAuthModal } from '@/sheep/hooks/useModal';

// 默认用户信息
const defaultUserInfo = {
  avatar: '', // 头像
  nickname: '', // 昵称
  gender: 0, // 性别
  mobile: '', // 手机号
  money: '--', // 余额
  commission: '--', // 佣金
  score: '--', // 积分
  verification: {}, // 认证字段
};

// 默认订单、优惠券等其他资产信息
const defaultNumData = {
  coupons_num: '--',
  order_num: {
    aftersale: 0,
    nocomment: 0,
    noget: 0,
    nosend: 0,
    unpaid: 0,
  },
};

const user = defineStore({
  id: 'user',
  state: () => ({
    userInfo: clone(defaultUserInfo), // 用户信息
    isLogin: !!uni.getStorageSync('token'), // 登录状态
    numData: cloneDeep(defaultNumData), // 用户其他数据
    agentInfo: {}, // 分销商信息
    lastUpdateTime: 0, // 上次更新时间
  }),

  actions: {
    // 获取个人信息
    async getInfo() {
      const { code, data } = await userApi.profile();
	  // 为了兼容 获取用户余额 可能还会用到其他参数
      const { code:code2, data:data2 } = await userApi.balance();
      if (code !== 0||code2!=0) return;
	  data.money=data2.balance/100;
      this.userInfo = data;

      return Promise.resolve(data);
    },

    // 获取分销商信息
    async getAgentInfo() {
      const res = await commissionApi.agent();
      if (res.error === 0) {
        this.agentInfo = res.data;
      }
      return Promise.resolve(res);
    },

    // 获取订单、优惠券等其他资产信息
    async getNumData() {
      const { code, data } = await userApi.data();
      const data2 = await userApi.data2();
      if (code === 0&&data2.code===0) {
		  console.log('订单数据',data);
        this.numData = {order_num:{
			noget:data.deliveredCount,
			unpaid:data.unpaidCount,
			nocomment:data.uncommentedCount,
			aftersale:data2.data
		}};
      }
    },

    // 添加分享记录
    async addShareLog(params) {
      const { error } = await userApi.addShareLog(params);
      if (error === 0) uni.removeStorageSync('shareLog');
    },

    // 设置token
    setToken(token = '') {
      if (token === '') {
        this.isLogin = false;
        uni.removeStorageSync('token');
      } else {
        this.isLogin = true;
        uni.setStorageSync('token', token);
        this.loginAfter();
      }
      return this.isLogin;
    },

    // 更新用户相关信息 (手动限流 5秒之内不刷新)
    async updateUserData() {
      if (!this.isLogin) {
        this.resetUserData();
        return;
      }
      const nowTime = new Date().getTime();
      if (this.lastUpdateTime + 5000 > nowTime) return;
      await this.getInfo();
      this.getNumData();
      this.lastUpdateTime = nowTime;
      return this.userInfo;
    },

    // 重置用户默认数据
    resetUserData() {
      this.setToken();
      this.userInfo = clone(defaultUserInfo);
      this.numData = cloneDeep(defaultNumData);
      this.agentInfo = {};
      cart().emptyList();
    },

    // 登录后
    async loginAfter() {
      await this.updateUserData();
      cart().getList();
      // 登录后设置全局分享参数
      $share.getShareInfo();
      // 提醒绑定手机号
      if (app().platform.bind_mobile && !this.userInfo.verification?.mobile) {
        showAuthModal('changeMobile');
      }

      // 添加分享记录
      const shareLog = uni.getStorageSync('shareLog');
      if (!isEmpty(shareLog)) {
        this.addShareLog({
          ...shareLog,
        });
      }
    },

    // 登出
    async logout(force = false) {
      if (!force) {
        const { error } = await userApi.logout();
        if (error === 0) {
          this.resetUserData();
        }
      }
      if (force) {
        this.resetUserData();
      }

      return !this.isLogin;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-store',
      },
    ],
  },
});

export default user;
