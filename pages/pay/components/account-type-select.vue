<template>
  <su-popup :show="show" class="ss-checkout-counter-wrap" @close="hideModal">
    <view class="ss-modal-box bg-white ss-flex-col">
      <view class="modal-header ss-flex-col ss-col-left">
        <text class="modal-title ss-m-b-20">选择提现方式</text>
      </view>
      <view class="modal-content ss-flex-1 ss-p-b-100">
        <view
          class="container-list ss-p-l-34 ss-p-r-24 ss-flex ss-col-center ss-row-center"
          v-for="(item, index) in typeList"
          :key="index"
        >
          <view class="container-icon ss-flex ss-m-r-20">
            <image :src="sheep.$url.static(item.icon)" />
          </view>
          <view class="ss-flex-1">{{ item.title }}</view>
          <view class="radio">
            <radio-group @change="onChange">
              <label class="radio">
                <radio
                  :value="item.value"
                  color="var(--ui-BG-Main)"
                  :checked="item.value === state.currentValue"
                  :disabled="!methods.includes(item.value)"
                />
              </label>
            </radio-group>
          </view>
        </view>
      </view>
      <view class="modal-footer ss-flex ss-row-center ss-col-center">
        <button class="ss-reset-button save-btn" @tap="onConfirm">确定</button>
      </view>
    </view>
  </su-popup>
</template>

<script setup>
  import { reactive, onBeforeMount, nextTick } from 'vue';
  import sheep from '@/sheep';

  const props = defineProps({
    modelValue: {
      type: Object,
      default() {},
    },
    show: {
      type: Boolean,
      default: false,
    },
    methods: {
      type: Array,
      default: [],
    },
  });
  const emits = defineEmits(['update:modelValue', 'change', 'close']);
  const state = reactive({
    currentValue: '',
  });
  const typeList = [
    {
      icon: '/static/img/shop/pay/wechat.png',
      title: '微信零钱',
      value: 'wechat',
    },
    {
      icon: '/static/img/shop/pay/alipay.png',
      title: '支付宝账户',
      value: 'alipay',
    },
    {
      icon: '/static/img/shop/pay/bank.png',
      title: '银行卡转账',
      value: 'bank',
    },
  ];
  const getWalletAccountInfo = async () => {
    return new Promise(async (resolve, reject) => {
      let res = await sheep.$api.user.account.info({
        type: state.currentValue,
      });
      if (res.error === 0) {
        if (!props.methods.includes(res.data.type)) {
          return;
        }
        state.currentValue = res.data.type;
        emits('update:modelValue', {
          type: res.data.type,
          account_header: res.data.account_header,
          account_name: res.data.account_name,
          account_no: res.data.account_no,
        });
      } else {
        emits('update:modelValue', {
          type: state.currentValue,
        });
      }
      resolve();
    });
  };

  function onChange(e) {
    state.currentValue = e.detail.value;
  }

  const onConfirm = async () => {
    if (state.currentValue === '') {
      sheep.$helper.toast('请选择提现方式');
      return;
    }
    await getWalletAccountInfo();
    emits('close');
  };

  const hideModal = () => {
    emits('close');
  };

  onBeforeMount(async () => {
    await getWalletAccountInfo();
  });
</script>

<style lang="scss" scoped>
  .ss-modal-box {
    border-radius: 30rpx 30rpx 0 0;
    max-height: 1000rpx;

    .modal-header {
      position: relative;
      padding: 60rpx 40rpx 40rpx;

      .modal-title {
        font-size: 32rpx;
        font-weight: bold;
      }

      .close-icon {
        position: absolute;
        top: 10rpx;
        right: 20rpx;
        font-size: 46rpx;
        opacity: 0.2;
      }
    }

    .modal-content {
      overflow-y: auto;

      .container-list {
        height: 96rpx;
        border-bottom: 2rpx solid rgba(#dfdfdf, 0.5);
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;

        .container-icon {
          width: 36rpx;
          height: 36rpx;
        }
      }
    }

    .modal-footer {
      height: 120rpx;

      .save-btn {
        width: 710rpx;
        height: 80rpx;
        border-radius: 40rpx;
        background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
        color: $white;
      }
    }
  }

  image {
    width: 100%;
    height: 100%;
  }
</style>
