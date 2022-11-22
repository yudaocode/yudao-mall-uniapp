<template>
  <ui-modal
    class="add-bank-wrap"
    name="walletAddAlipay"
    mask="40"
    align="bottom"
    ui="ss-r-t-30"
    :showCancel="false"
    :option="false"
  >
    <view class="ss-modal-box bg-white ss-flex-col">
      <view class="modal-header ss-flex-col ss-col-left">
        <text class="cicon-close-round close-icon" @tap="hideModal"></text>
        <text class="modal-title ss-m-b-20">添加支付宝</text>
      </view>
      <view class="modal-content ss-flex-1 ss-p-b-100">
        <ui-form
          ref="addAlipayFormRef"
          :model="state.model"
          :rules="state.rules"
          hasClear
          labelPosition="left"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          <ui-form-item prop="real_name" title="真实姓名">
            <ui-input placeholder="请输入真实姓名" v-model="state.model.real_name"></ui-input>
          </ui-form-item>

          <ui-form-item prop="card_no" title="支付宝账号">
            <ui-input placeholder="请输入支付宝账号" v-model="state.model.card_no"></ui-input>
          </ui-form-item>
        </ui-form>
      </view>
      <view class="modal-footer ss-flex ss-row-center ss-col-center">
        <button class="ss-reset-button save-btn" @tap="onSave">确定</button>
      </view>
    </view>
  </ui-modal>
</template>

<script setup>
  import { ref, reactive, unref } from 'vue';
  import { realName, bankCode } from '@/sheep/common/validate/form';

  // 数据
  const addAlipayFormRef = ref(null);
  const state = reactive({
    model: {
      real_name: '',
      card_no: '',
    },
    rules: {
      real_name: realName,
      card_no: bankCode,
    },
  });

  const showModal = () => {
    hooksModal.showModal('walletAddAlipay');
  };
  const hideModal = () => {
    hooksModal.hideModal();
  };
  const onSave = async () => {
    const res = await unref(addAlipayFormRef).validate();
  };

  defineExpose({
    showModal,
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
