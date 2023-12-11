<template>
  <s-layout title="申请提现" class="withdraw-wrap" navbar="inner">
    <!-- <view class="page-bg"></view> -->
    <view
      class="wallet-num-box ss-flex ss-col-center ss-row-between"
      :style="[
        {
          marginTop: '-' + Number(statusBarHeight + 88) + 'rpx',
          paddingTop: Number(statusBarHeight + 108) + 'rpx',
        },
      ]"
    >
      <view class="">
        <view class="num-title">可提现金额（元）</view>
        <view class="wallet-num">{{ userInfo.commission }}</view>
      </view>
      <button class="ss-reset-button log-btn" @tap="sheep.$router.go('/pages/pay/withdraw-log')"
        >提现记录</button
      >
    </view>
    <!-- 提现输入卡片-->
    <view class="draw-card">
      <view class="card-title">提现金额</view>
      <view class="input-box ss-flex ss-col-center border-bottom">
        <view class="unit">￥</view>
        <uni-easyinput
          :inputBorder="false"
          class="ss-flex-1 ss-p-l-10"
          v-model="state.amount"
          type="number"
          placeholder="请输入提现金额"
        />
      </view>
      <view class="bank-box ss-flex ss-col-center ss-row-between ss-m-b-30">
        <view class="name">提现至</view>
        <view class="bank-list ss-flex ss-col-center" @tap="onAccountSelect(true)">
          <view v-if="!state.accountInfo.type" class="empty-text">请选择提现方式</view>
          <view v-if="state.accountInfo.type === 'wechat'" class="empty-text">微信零钱</view>
          <view v-if="state.accountInfo.type === 'alipay'" class="empty-text">支付宝账户</view>
          <view v-if="state.accountInfo.type === 'bank'" class="empty-text">银行卡转账</view>
          <text class="cicon-forward"></text>
        </view>
      </view>
      <view class="bind-box ss-flex ss-col-center ss-row-between" v-if="state.accountInfo.type">
        <view class="placeholder-text" v-if="state.accountInfo.account_name">
          {{ state.accountInfo.account_header }}|{{ state.accountInfo.account_name }}
        </view>
        <view class="placeholder-text" v-else>暂无提现账户</view>
        <button class="add-btn ss-reset-button" @tap="onAccountEdit(true)">
          {{ state.accountInfo.account_name ? '修改' : '添加' }}
        </button>
      </view>
      <button class="ss-reset-button save-btn ui-BG-Main-Gradient ui-Shadow-Main" @tap="onConfirm">
        确认提现
      </button>
    </view>

    <!-- 提现说明 -->
    <view class="draw-notice">
      <view class="title ss-m-b-30">提现说明</view>
      <view class="draw-list" v-for="(rule, index) in state.rulesList" :key="index">
        {{ index + 1 }}.{{ rule }}
      </view>
    </view>

    <!-- 选择提现账户 -->
    <account-type-select
      :show="state.accountSelect"
      @close="onAccountSelect(false)"
      round="10"
      v-model="state.accountInfo"
      :methods="state.rules.methods"
    />
    <!-- 编辑账户信息 -->
    <account-info-modal
      v-if="state.accountInfo.type"
      v-model="state.accountInfo"
      :show="state.accountEdit"
      @close="onAccountEdit(false)"
      round="10"
    />
  </s-layout>
</template>

<script setup>
  import { computed, reactive, onBeforeMount } from 'vue';
  import sheep from '@/sheep';
  import accountTypeSelect from './components/account-type-select.vue';
  import accountInfoModal from './components/account-info-modal.vue';
  import { onPageScroll } from '@dcloudio/uni-app';
  const headerBg = sheep.$url.css('/static/img/shop/user/withdraw_bg.png');
  onPageScroll(() => {});
  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  function filterRules(rules) {
    let list = [];
    let str1 = '';
    if (rules.min_amount > 0) {
      str1 += `最少 ${rules.min_amount}元; `;
    }
    if (rules.max_amount > 0) {
      str1 += `最多 ${rules.max_amount}元;`;
    }
    if (str1 !== '') {
      list.push('单次提现金额 ' + str1);
    }

    if (rules.max_num > 0) {
      list.push(`每${rules.num_unit === 'day' ? '天' : '月'}最多可提现 ${rules.max_num} 次;`);
    }

    if (rules.charge_rate_format > 0) {
      list.push(`每次收取提现手续费 ${rules.charge_rate_format}%;`);
    }
    list.push(
      `提现申请后将${rules.auto_arrival ? '自动' : '审核后'}到账, 到账结果请查收对应渠道服务通知;`,
    );
    list.push('如有疑问请及时联系客服.');

    return list;
  }

  const userStore = sheep.$store('user');
  const userInfo = computed(() => userStore.userInfo);
  const state = reactive({
    amount: '',
    type: '',
    accountInfo: {},
    accountSelect: false,
    accountEdit: false,
    rules: {
      min_amount: 0,
      max_amount: 0,
      max_num: 0,
      num_unit: 0,
      charge_rate_format: 0,
      charge_rate: 0,
      methods: [],
    },
    rulesList: [],
  });

  const onAccountEdit = (e) => {
    state.accountEdit = e;
  };

  const onAccountSelect = (e) => {
    state.accountSelect = e;
  };

  const onConfirm = async () => {
    let payload = {
      money: state.amount,
      ...state.accountInfo,
    };

    if (payload.money > userInfo.commission || payload.money <= 0) {
      sheep.$helper.toast('请输入正确的提现金额');
      return;
    }

    if (!payload.type) {
      sheep.$helper.toast('请选择提现方式');
      return;
    }

    if (!payload.account_name || !payload.account_header || !payload.account_no) {
      sheep.$helper.toast('请完善您的账户信息');
      return;
    }

    if (sheep.$platform.name === 'H5' && payload.type === 'wechat') {
      sheep.$helper.toast('请使用微信浏览器操作');
      return;
    }

    let { error, msg, data } = await sheep.$api.pay.withdraw.apply(payload);
    if (error === -1) {
      sheep.$platform.useProvider('wechat').bind();
    }
    if (error === 0) {
      userStore.getInfo();
      uni.showModal({
        title: '操作成功',
        content: '您的提现申请已成功提交',
        cancelText: '继续提现',
        confirmText: '查看记录',
        success: function (res) {
          res.confirm && sheep.$router.go('/pages/pay/withdraw-log');
        },
      });
    }
  };

  async function getWithdrawRules() {
    let { error, data } = await sheep.$api.pay.withdraw.rules();
    if (error === 0) {
      state.rules = data;
      state.rulesList = filterRules(state.rules);
    }
  }

  onBeforeMount(() => {
    getWithdrawRules();
  });
</script>

<style lang="scss" scoped>
  :deep() {
    .uni-input-input {
      font-family: OPPOSANS !important;
    }
  }

  .wallet-num-box {
    padding: 0 40rpx 80rpx;
    background: var(--ui-BG-Main) v-bind(headerBg) center/750rpx 100% no-repeat;
    border-radius: 0 0 5% 5%;

    .num-title {
      font-size: 26rpx;
      font-weight: 500;
      color: $white;
      margin-bottom: 20rpx;
    }

    .wallet-num {
      font-size: 60rpx;
      font-weight: 500;
      color: $white;
      font-family: OPPOSANS;
    }

    .log-btn {
      width: 170rpx;
      height: 60rpx;
      line-height: 60rpx;
      border: 1rpx solid $white;
      border-radius: 30rpx;
      padding: 0;
      font-size: 26rpx;
      font-weight: 500;
      color: $white;
    }
  }

  // 提现输入卡片
  .draw-card {
    background-color: $white;
    border-radius: 20rpx;
    width: 690rpx;
    min-height: 560rpx;
    margin: -60rpx 30rpx 30rpx 30rpx;
    padding: 30rpx;
    position: relative;
    z-index: 3;
    box-sizing: border-box;

    .card-title {
      font-size: 30rpx;
      font-weight: 500;
      margin-bottom: 30rpx;
    }

    .bank-box {
      .name {
        font-size: 28rpx;
        font-weight: 500;
      }

      .bank-list {
        .empty-text {
          font-size: 28rpx;
          font-weight: 400;
          color: $dark-9;
        }

        .cicon-forward {
          color: $dark-9;
        }
      }

      .input-box {
        width: 624rpx;
        height: 100rpx;
        margin-bottom: 40rpx;

        .unit {
          font-size: 48rpx;
          color: #333;
          font-weight: 500;
        }

        .uni-easyinput__placeholder-class {
          font-size: 30rpx;
          height: 36rpx;
        }

        :deep(.uni-easyinput__content-input) {
          font-size: 48rpx;
        }
      }

      .save-btn {
        width: 616rpx;
        height: 86rpx;
        line-height: 86rpx;
        border-radius: 40rpx;
        margin-top: 80rpx;
      }
    }

    .bind-box {
      .placeholder-text {
        font-size: 26rpx;
        color: $dark-9;
      }

      .add-btn {
        width: 100rpx;
        height: 50rpx;
        border-radius: 25rpx;
        line-height: 50rpx;
        font-size: 22rpx;
        color: var(--ui-BG-Main);
        background-color: var(--ui-BG-Main-light);
      }
    }

    .input-box {
      width: 624rpx;
      height: 100rpx;
      margin-bottom: 40rpx;

      .unit {
        font-size: 48rpx;
        color: #333;
        font-weight: 500;
      }

      .uni-easyinput__placeholder-class {
        font-size: 30rpx;
      }

      :deep(.uni-easyinput__content-input) {
        font-size: 48rpx;
      }
    }

    .save-btn {
      width: 616rpx;
      height: 86rpx;
      line-height: 86rpx;
      border-radius: 40rpx;
      margin-top: 80rpx;
    }
  }

  // 提现说明
  .draw-notice {
    width: 684rpx;
    background: #ffffff;
    border: 2rpx solid #fffaee;
    border-radius: 20rpx;
    margin: 20rpx 32rpx 0 32rpx;
    padding: 30rpx;
    box-sizing: border-box;

    .title {
      font-weight: 500;
      color: #333333;
      font-size: 30rpx;
    }

    .draw-list {
      font-size: 24rpx;
      color: #999999;
      line-height: 46rpx;
    }
  }
</style>
