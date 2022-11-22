<template>
  <s-layout :title="state.model.id ? '编辑发票' : '添加发票'">
    <uni-forms
      ref="invoiceFormRef"
      v-model="state.model"
      :rules="state.rules"
      validateTrigger="bind"
      labelWidth="160"
      labelAlign="left"
      border
      :labelStyle="{ fontWeight: 'bold' }"
    >
      <view class="bg-white form-box ss-p-x-30">
        <uni-forms-item name="type" label="发票类型">
          <view class="ss-flex ss-col-center ss-h-100">
            <radio-group @change="onChange" class="ss-flex ss-col-center">
              <label class="radio" v-for="item in invoiceTypeList" :key="item.value">
                <view class="ss-flex ss-col-center ss-m-r-32">
                  <radio
                    :value="item.value"
                    color="var(--ui-BG-Main)"
                    style="transform: scale(0.8)"
                    :checked="item.value === state.model.type"
                  />
                  <view class="radio-name">
                    {{ item.name }}
                  </view>
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <view v-if="state.model.type === 'person'">
          <uni-forms-item name="name" label="姓名">
            <uni-easyinput
              v-model="state.model.name"
              type="text"
              placeholder="请输入您的姓名(必填)"
              placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
              :inputBorder="false"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item name="mobile" label="手机号">
            <uni-easyinput
              v-model="state.model.mobile"
              type="number"
              placeholder="请输入手机号(必填)"
              placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
              :inputBorder="false"
            ></uni-easyinput>
          </uni-forms-item>
        </view>
        <view v-if="state.model.type === 'company'">
          <uni-forms-item name="name" label="单位名称">
            <uni-easyinput
              v-model="state.model.name"
              type="text"
              placeholder="请输入单位名称(必填)"
              placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
              :inputBorder="false"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item name="mobile" label="手机号">
            <uni-easyinput
              v-model="state.model.mobile"
              type="number"
              placeholder="请输入手机号(必填)"
              placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
              :inputBorder="false"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item name="tax_no" label="税号">
            <uni-easyinput
              v-model="state.model.tax_no"
              type="text"
              placeholder="请输入单位税号(必填)"
              placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
              :inputBorder="false"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item name="bank_name" label="开户银行">
            <uni-easyinput
              v-model="state.model.bank_name"
              type="text"
              placeholder="请输入对公账户开户银行"
              placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
              :inputBorder="false"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item name="bank_no" label="银行账号">
            <uni-easyinput
              v-model="state.model.bank_no"
              type="text"
              placeholder="请输入对公账户银行账号"
              placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
              :inputBorder="false"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item
            name="address"
            label="详细地址"
            :formItemStyle="{ alignItems: 'flex-start' }"
            :labelStyle="{ lineHeight: '5em' }"
            class="textarea-item"
          >
            <uni-easyinput
              :inputBorder="false"
              type="textarea"
              v-model="state.model.address"
              placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
              placeholder="请输入详细地址"
              clearable
            ></uni-easyinput>
          </uni-forms-item>
        </view>
      </view>
    </uni-forms>
    <su-fixed bottom :opacity="false" bg="" placeholder :noFixed="false" :index="10">
      <view class="footer-box ss-flex-col ss-row-between ss-p-20">
        <view class="ss-m-b-20">
          <button class="ss-reset-button save-btn ui-Shadow-Main" @tap="onSave">保存</button>
        </view>
        <button v-if="state.model.id" class="ss-reset-button cancel-btn" @tap="onDelete">
          删除
        </button>
      </view>
    </su-fixed>
  </s-layout>
</template>

<script setup>
  import { computed, watch, ref, reactive, unref } from 'vue';
  import sheep from '@/sheep';
  import { onLoad, onPageScroll } from '@dcloudio/uni-app';
  import _ from 'lodash';
  import { realName, mobile, taxNo, taxName } from '@/sheep/validate/form';

  const invoiceFormRef = ref(null);
  const invoiceTypeList = [
    {
      name: '个人',
      value: 'person',
    },
    {
      name: '企/事业单位',
      value: 'company',
    },
  ];
  const state = reactive({
    model: {
      type: '',
      name: '',
      mobile: '',
      tax_no: '',
      bank_name: '',
      bank_no: '',
      address: '',
    },
    rules: {
      name: taxName,
      mobile,
      tax_no: taxNo,
    },
  });

  //发票
  function onChange(e) {
    state.model.type = e.detail.value;
  }

  const onSave = async () => {
    const validate = await unref(invoiceFormRef)
      .validate()
      .catch((error) => {
        console.log('error: ', error);
      });
    if (!validate) return;

    let res = null;
    if (state.model.id) {
      res = await sheep.$api.user.invoice.update(state.model.id, state.model);
    } else {
      res = await sheep.$api.user.invoice.create(state.model);
    }
    if (res.error === 0) {
      sheep.$router.back();
    }
  };
  const onDelete = () => {
    uni.showModal({
      title: '提示',
      content: '确认删除此发票信息吗？',
      success: async function (res) {
        if (res.confirm) {
          const { error } = await sheep.$api.user.invoice.delete(state.model.id);
          if (res.error === 0) {
            sheep.$router.back();
          }
        }
      },
    });
  };
  onLoad(async (options) => {
    if (options.id) {
      let res = await sheep.$api.user.invoice.detail(options.id);
      if (res.error === 0) {
        state.model = {
          ...state.model,
          ...res.data,
        };
      }
    } else {
      state.model.type = 'person';
    }

    if (options.data) {
      let data = JSON.parse(options.data);
      state.model = {
        ...state.model,
        ...data,
      };
    }
  });
</script>

<style lang="scss" scoped>
  :deep() {
    .uni-forms-item__label .label-text {
      font-size: 28rpx !important;
      color: #333333 !important;
      line-height: normal !important;
    }

    .uni-easyinput__content-input {
      font-size: 28rpx !important;
      color: #333333 !important;
      line-height: normal !important;
      padding-left: 0 !important;
    }

    .uni-easyinput__content-textarea {
      font-size: 28rpx !important;
      color: #333333 !important;
      line-height: normal !important;
      margin-top: 4rpx;
    }

    .uni-icons {
      font-size: 40rpx !important;
    }

    .is-textarea-icon {
      margin-top: 14rpx;
    }

    .is-disabled {
      color: #333333;
    }
  }

  .footer-box {
    .save-btn {
      width: 710rpx;
      height: 80rpx;
      border-radius: 40rpx;
      background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
      color: $white;
    }

    .cancel-btn {
      width: 710rpx;
      height: 80rpx;
      border-radius: 40rpx;
      background: var(--ui-BG);
    }
  }
</style>
