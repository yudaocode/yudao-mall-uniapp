/**
 * Created by 芋道源码
 *
 * 数据字典工具类
 */

export const DICT_TYPE = {

  // ========== MALL - 交易模块 ==========
  BROKERAGE_BANK_NAME: 'brokerage_bank_name', // 佣金提现银行
  BROKERAGE_WITHDRAW_TYPE: 'brokerage_withdraw_type', // 佣金提现类型

}

/**
 * 佣金提现类型枚举
 */
export const BrokerageWithdrawTypeEnum = {
  WALLET: {
    type: 1,
    name: '钱包',
    icon: 'icon-qiandai'
  },
  BANK: {
    type: 2,
    name: '银行卡',
    icon: 'icon-yinhangqia'
  },
  WECHAT: {
    type: 3,
    name: '微信',
    icon: 'icon-weixin2'
  },
  ALIPAY: {
    type: 4,
    name: '支付宝',
    icon: 'icon-icon34'
  }
}

/** 终端的枚举 */
export const TerminalEnum = {
  WECHAT_MINI_PROGRAM: {
    terminal: 10,
        name: '微信小程序'
  },
  WECHAT_WAP: {
    terminal: 11,
        name: '微信公众号'
  },
  H5: {
    terminal: 20,
        name: 'H5 网页'
  },
  APP: {
    terminal: 31,
        name: '手机 App'
  }
}
