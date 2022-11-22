<template>
  <su-popup :show="show" class="add-bank-wrap" @close="hideModal">
    <view class="ss-modal-box bg-white ss-flex-col">
      <view class="modal-header ss-flex-col ss-col-left">
        <text v-if="props.modelValue.type === 'bank'" class="modal-title ss-m-b-20">
          绑定银行卡
        </text>
        <text v-if="props.modelValue.type === 'wechat'" class="modal-title ss-m-b-20">
          绑定微信
        </text>
        <text v-if="props.modelValue.type === 'alipay'" class="modal-title ss-m-b-20">
          绑定支付宝
        </text>
      </view>
      <view class="modal-content ss-flex-1 ss-p-b-100">
        <block v-if="props.modelValue.type === 'bank'">
          <uni-forms
            ref="form"
            :model="state.bank.model"
            :rules="state.bank.rules"
            validateTrigger="bind"
            labelWidth="160"
            labelAlign="center"
            border
            :labelStyle="{ fontWeight: 'bold' }"
          >
            <uni-forms-item name="account_name" label="持卡人">
              <uni-easyinput
                :inputBorder="false"
                placeholder="请输入持卡人"
                v-model="state.bank.model.account_name"
              />
            </uni-forms-item>
            <uni-forms-item name="account_header" label="开户行">
              <uni-easyinput
                :inputBorder="false"
                placeholder="请输入开户行"
                v-model="state.bank.model.account_header"
              />
            </uni-forms-item>
            <uni-forms-item name="account_no" label="银行卡号">
              <uni-easyinput
                type="number"
                :inputBorder="false"
                placeholder="请输入银行卡号"
                v-model="state.bank.model.account_no"
              />
            </uni-forms-item>
          </uni-forms>
        </block>

        <block v-if="props.modelValue.type === 'wechat'">
          <uni-forms
            ref="form"
            :model="state.wechat.model"
            :rules="state.wechat.rules"
            validateTrigger="bind"
            labelWidth="160"
            labelAlign="center"
            border
            :labelStyle="{ fontWeight: 'bold' }"
          >
            <uni-forms-item name="account_name" label="真实姓名">
              <uni-easyinput
                :inputBorder="false"
                placeholder="请输入您的真实姓名"
                v-model="state.wechat.model.account_name"
              />
            </uni-forms-item>
          </uni-forms>
        </block>

        <block v-if="props.modelValue.type === 'alipay'">
          <uni-forms
            ref="form"
            :model="state.alipay.model"
            :rules="state.alipay.rules"
            validateTrigger="bind"
            labelWidth="160"
            labelAlign="center"
            border
            :labelStyle="{ fontWeight: 'bold' }"
          >
            <uni-forms-item name="account_name" label="真实姓名">
              <uni-easyinput
                :inputBorder="false"
                placeholder="请输入您的真实姓名"
                v-model="state.alipay.model.account_name"
              />
            </uni-forms-item>
            <uni-forms-item name="account_no" label="支付宝">
              <uni-easyinput
                :inputBorder="false"
                placeholder="请输入支付宝 邮箱/手机号"
                v-model="state.alipay.model.account_no"
              />
            </uni-forms-item>
          </uni-forms>
        </block>
      </view>
      <view class="modal-footer ss-flex ss-row-center ss-col-center">
        <button class="ss-reset-button save-btn" @tap="onSave">保存</button>
      </view>
    </view>
  </su-popup>
</template>

<script setup>
  import { ref, reactive, unref, watchPostEffect, watch } from 'vue';
  import sheep from '@/sheep';
  import { realName, bankName, bankCode, alipayAccount } from '@/sheep/validate/form';

  const form = ref(null);
  const props = defineProps({
    modelValue: {
      type: Object,
      default() {},
    },
    show: {
      type: Boolean,
      default: false,
    },
  });
  watch(
    () => props.modelValue,
    (newValue, oldValue) => {
      setModelValue(newValue);
    },
  );

  function setModelValue(modelValue) {
    Object.keys(state[modelValue.type].model).forEach((key) => {
      state[modelValue.type].model[key] = modelValue[key];
    });
  }

  const emits = defineEmits(['update:modelValue', 'close']);
  // 数据
  const state = reactive({
    bank: {
      model: {
        account_name: '',
        account_header: '',
        account_no: '',
      },
      rules: {
        account_name: realName,
        account_header: bankName,
        account_no: bankCode,
      },
    },
    alipay: {
      model: {
        account_name: '',
        account_no: '',
      },
      rules: {
        account_name: realName,
        account_no: alipayAccount,
      },
    },
    wechat: {
      model: {
        account_name: '',
      },
      rules: {
        account_name: realName,
      },
    },
  });

  setModelValue(props.modelValue);

  const hideModal = () => {
    emits('close');
  };
  const onSave = async () => {
    const validate = await unref(form)
      .validate()
      .catch((error) => {
        'error: ', error;
      });
    if (!validate) return;
    let data = {
      type: props.modelValue.type,
      account_header: state[props.modelValue.type].model.account_header,
      account_name: state[props.modelValue.type].model.account_name,
      account_no: state[props.modelValue.type].model.account_no,
    };
    let res = await sheep.$api.user.account.save(data);
    if (res.error === 0) {
      emits('update:modelValue', res.data);
      hideModal();
    }
  };
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
</style>
