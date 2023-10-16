import appApi from '@/sheep/api/app';
import { defineStore } from 'pinia';
import $platform from '@/sheep/platform';
import $router from '@/sheep/router';
import user from './user';
import sys from './sys';

const app = defineStore({
  id: 'app',
  state: () => ({
    info: {
      // 应用信息
      name: '', // 商城名称
      logo: '', // logo
      version: '', // 版本号
      cdnurl: '', // 云存储域名
      filesystem: '', // 云存储平台
      user_protocol: {}, // 用户协议
      privacy_protocol: {}, // 隐私协议
      about_us: {}, // 关于我们
      copyright: '', // 版权信息 I
      copytime: '', // 版权信息 II
    },
    platform: {
      payment: [], // 支持的支付方式
      recharge_payment: [], // 支持的充值支付方式
      share: {
        methods: [], // 支持的分享方式
        forwardInfo: {}, // 默认转发信息
        posterInfo: {}, // 海报信息
        linkAddress: '', // 复制链接地址
      },
      auto_login: 0, // 自动登陆
      bind_mobile: 0, // 登陆后绑定手机号提醒 (弱提醒，可手动关闭)
    },
    chat: {},
    template: {
      // 店铺装修模板
      basic: {}, // 基本信息
      home: {
        // 首页模板
        style: {},
        data: [],
      },
      user: {
        // 个人中心模板
        style: {},
        data: [],
      },
    },
    shareInfo: {}, // 全局分享信息
    has_wechat_trade_managed: 0 // 小程序发货信息管理  0 没有 || 1 有
  }),
  actions: {
    // 获取Shopro应用配置和模板
    async init(templateId = null) {
      //检查网络
      const networkStatus = await $platform.checkNetwork();
      if (!networkStatus) {
        $router.error('NetworkError');
      }

      const res = await appApi.init(templateId);
      if (res.error === 0) {
        this.info = res.data.app;
        this.platform = res.data.platform;
        this.template = res.data.template;
        this.has_wechat_trade_managed = res.data.has_wechat_trade_managed;
        if (!res.data.template) {
          $router.error('TemplateError');
        }
        this.chat = res.data.chat;

        // 加载主题
        const sysStore = sys();
        sysStore.setTheme();

        // 模拟用户登录
        const userStore = user();
        if (userStore.isLogin) {
          userStore.loginAfter();
        }
        return Promise.resolve(true);
      } else {
        $router.error('InitError', res.msg || '加载失败');
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app-store',
      },
    ],
  },
});

export default app;
