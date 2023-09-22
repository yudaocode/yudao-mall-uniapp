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