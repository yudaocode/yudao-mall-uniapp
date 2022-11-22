<template>
  <s-layout :title="state.model.id ? '编辑地址' : '新增地址'">
    <uni-forms
      ref="addressFormRef"
      v-model="state.model"
      :rules="state.rules"
      validateTrigger="bind"
      labelWidth="160"
      labelAlign="left"
      border
      :labelStyle="{ fontWeight: 'bold' }"
    >
      <view class="bg-white form-box ss-p-x-30">
        <uni-forms-item name="consignee" label="收货人" class="form-item">
          <uni-easyinput
            v-model="state.model.consignee"
            placeholder="请填写收货人姓名"
            :inputBorder="false"
            placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
          />
        </uni-forms-item>

        <uni-forms-item name="mobile" label="手机号" class="form-item">
          <uni-easyinput
            v-model="state.model.mobile"
            type="number"
            placeholder="请输入手机号"
            :inputBorder="false"
            placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
          >
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item
          name="region"
          label="省市区"
          @tap="state.showRegion = true"
          class="form-item"
        >
          <uni-easyinput
            v-model="state.model.region"
            disabled
            :inputBorder="false"
            :styles="{ disableColor: '#fff', color: '#333' }"
            placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
            placeholder="请选择省市区"
          >
            <template v-slot:right>
              <uni-icons type="right"></uni-icons>
            </template>
          </uni-easyinput>
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

      <view class="ss-m-y-20 bg-white ss-p-x-30 ss-flex ss-row-between ss-col-center default-box">
        <view class="default-box-title"> 设为默认地址 </view>
        <su-switch style="transform: scale(0.8)" v-model="state.model.is_default"></su-switch>
      </view>
    </uni-forms>
    <su-fixed bottom :opacity="false" bg="" placeholder :noFixed="false" :index="10">
      <view class="footer-box ss-flex-col ss-row-between ss-p-20">
        <view class="ss-m-b-20"
          ><button class="ss-reset-button save-btn ui-Shadow-Main" @tap="onSave">保存</button></view
        >
        <button v-if="state.model.id" class="ss-reset-button cancel-btn" @tap="onDelete">
          删除
        </button>
      </view>
    </su-fixed>
    <!-- 省市区弹窗 -->
    <su-region-picker
      :show="state.showRegion"
      @cancel="state.showRegion = false"
      @confirm="onRegionConfirm"
    >
    </su-region-picker>
  </s-layout>
</template>

<script setup>
  import { computed, watch, ref, reactive, unref } from 'vue';
  import sheep from '@/sheep';
  import { onLoad, onPageScroll } from '@dcloudio/uni-app';
  import _ from 'lodash';
  import { consignee, mobile, address, region } from '@/sheep/validate/form';

  const addressFormRef = ref(null);
  const state = reactive({
    showRegion: false,
    model: {
      consignee: '',
      mobile: '',
      address: '',
      is_default: false,
      region: '',
    },
    rules: {
      consignee,
      mobile,
      address,
      region,
    },
  });
  watch(
    () => state.model.province_name,
    (newValue) => {
      if (newValue) {
        state.model.region = `${state.model.province_name}-${state.model.city_name}-${state.model.district_name}`;
      }
    },
    {
      deep: true,
    },
  );
  const onRegionConfirm = (e) => {
    state.model = {
      ...state.model,
      ...e,
    };
    state.showRegion = false;
  };
  const getAreaData = () => {
    if (_.isEmpty(uni.getStorageSync('areaData'))) {
      sheep.$api.data.area().then((res) => {
        if (res.error === 0) {
          uni.setStorageSync('areaData', res.data);
        }
      });
    }
  };
  const onSave = async () => {
    const validate = await unref(addressFormRef)
      .validate()
      .catch((error) => {
        console.log('error: ', error);
      });
    if (!validate) return;

    let res = null;
    if (state.model.id) {
      res = await sheep.$api.user.address.update(state.model.id, state.model);
    } else {
      res = await sheep.$api.user.address.create(state.model);
    }
    if (res.error === 0) {
      sheep.$router.back();
    }
  };

  const onDelete = () => {
    uni.showModal({
      title: '提示',
      content: '确认删除此收货地址吗？',
      success: async function (res) {
        if (res.confirm) {
          const { error } = await sheep.$api.user.address.delete(state.model.id);
          if (res.error === 0) {
            sheep.$router.back();
          }
        }
      },
    });
  };
  onLoad(async (options) => {
    getAreaData();
    if (options.id) {
      let res = await sheep.$api.user.address.detail(options.id);
      if (res.error === 0) {
        state.model = {
          ...state.model,
          ...res.data,
        };
      }
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
      margin-top: 8rpx !important;
    }

    .uni-icons {
      font-size: 40rpx !important;
    }

    .is-textarea-icon {
      margin-top: 22rpx;
    }

    .is-disabled {
      color: #333333;
    }
  }

  .default-box {
    width: 100%;
    box-sizing: border-box;
    height: 100rpx;

    .default-box-title {
      font-size: 28rpx;
      color: #333333;
      line-height: normal;
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
