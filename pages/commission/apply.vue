<!-- 申请分销商  -->
<template>
  <s-layout title="申请分销商" class="apply-wrap" navbar="inner">
    <s-empty
      v-if="state.error === 1"
      paddingTop="0"
      icon="/static/comment-empty.png"
      text="未开启分销商申请"
    ></s-empty>

    <view v-if="state.error === 0" class="distribution-apply-wrap">
      <view class="apply-header">
        <view class="header-box ss-flex">
          <image
            class="bg-img"
            :src="sheep.$url.cdn(state.background)"
            mode="widthFix"
            @load="onImgLoad"
          ></image>
          <view class="heaer-title">申请分销商</view>
        </view>
      </view>
      <view class="apply-box bg-white" :style="{ marginTop: state.imgHeight + 'rpx' }">
        <uni-forms
          label-width="200"
          :model="state.model"
          :rules="state.rules"
          border
          class="form-box"
        >
          <view class="item-box">
            <uni-forms-item
              v-for="(item, index) in state.formList"
              :key="index"
              :label="item.name"
              :required="true"
              :label-position="item.type == 'image' ? 'top' : 'left'"
            >
              <uni-easyinput
                v-if="item.type !== 'image'"
                :inputBorder="false"
                :type="item.type"
                :styles="{ disableColor: '#fff' }"
                placeholderStyle="color:#BBBBBB;font-size:28rpx;line-height:normal"
                v-model="item.value"
                :placeholder="`请填写${item.name}`"
              />
              <s-uploader
                v-if="item.type === 'image'"
                v-model:url="item.value"
                fileMediatype="image"
                limit="1"
                mode="grid"
                :imageStyles="{ width: '168rpx', height: '168rpx' }"
                class="file-picker"
              />
            </uni-forms-item>
          </view>
        </uni-forms>
        <label class="ss-flex ss-m-t-20" v-if="state.protocol?.status == 1" @tap="onChange">
          <radio
            :checked="state.isAgree"
            color="var(--ui-BG-Main)"
            style="transform: scale(0.6)"
            @tap.stop="onChange"
          />
          <view class="agreement-text ss-flex">
            <view class="ss-m-r-4">勾选代表同意</view>
            <view
              class="tcp-text"
              @tap.stop="
                sheep.$router.go('/pages/public/richtext', {
                  id: state.protocol.id,
                  title: state.protocol.title,
                })
              "
            >
              《{{ state.protocol.title }}》
            </view>
          </view>
        </label>
        <su-fixed bottom placeholder>
          <view class="submit-box ss-flex ss-row-center ss-p-30">
            <button class="submit-btn ss-reset-button ui-BG-Main ui-Shadow-Main" @tap="submit">
              {{ submitText }}
            </button>
          </view>
        </su-fixed>
      </view>
    </view>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import { isEmpty } from 'lodash';

  const state = reactive({
    error: -1,
    status: '-',
    config: {},
    isAgree: false,
    formList: [],
    protocol: {},
    applyInfo: [],
    background: '',
    imgHeight: 400,
  });
  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;

  //勾选协议
  function onChange() {
    state.isAgree = !state.isAgree;
  }

  const submitText = computed(() => {
    if (state.status === 'normal') return '修改信息';
    if (state.status === 'needinfo') return '提交审核';
    if (state.status === 'reject') return '重新提交';
    return '';
  });

  async function getAgentForm() {
    const { error, data } = await sheep.$api.commission.form();
    state.error = error;
    if (error === 0) {
      state.status = data.status;
      state.background = data.background;
      state.formList = data.form;
      state.applyInfo = data.applyInfo;
      state.protocol = data.protocol;

      if (data.protocol.status != 1) {
        state.isAgree = true;
      }
      mergeFormList();
    }
  }
  function onImgLoad(e) {
    state.imgHeight = (e.detail.height / e.detail.width) * 750 - 88 - statusBarHeight;
  }

  async function submit() {
    if (!state.isAgree) {
      sheep.$helper.toast('请同意申请协议');
      return;
    }

    const validate = state.formList.every((item) => {
      if (isEmpty(item.value)) {
        if (item.type !== 'image') {
          sheep.$helper.toast(`请填写${item.name}`);
        } else {
          sheep.$helper.toast(`请上传${item.name}`);
        }
        return false;
      }
      return true;
    });

    if (!validate) {
      return;
    }

    const { error } = await sheep.$api.commission.apply({
      data: state.formList,
    });
    if (error === 0) {
      sheep.$router.back();
    }
  }

  onLoad(() => {
    getAgentForm();
  });

  // 初始化formData
  function mergeFormList() {
    state.formList.forEach((form) => {
      const apply = state.applyInfo.find(
        (info) => info.type === form.type && info.name === form.name,
      );
      if (typeof apply !== 'undefined') form.value = apply.value;
    });
  }
</script>

<style lang="scss" scoped>
  :deep() {
    .uni-forms-item__label .label-text {
      font-size: 28rpx !important;
      color: #333333 !important;
      line-height: normal !important;
    }

    .file-picker__progress {
      height: 0 !important;
    }

    .uni-list-item__content-title {
      font-size: 28rpx !important;
      color: #333333 !important;
      line-height: normal !important;
    }

    .uni-icons {
      font-size: 40rpx !important;
    }

    .is-disabled {
      color: #333333;
    }
  }

  .distribution-apply-wrap {
    // height: 100vh;
    // width: 100vw;
    // position: absolute;
    // left: 0;
    // top: 0;
    // background-color: #fff;
    // overflow-y: auto;

    .submit-btn {
      width: 690px;
      height: 86rpx;
      border-radius: 43rpx;
    }
    .apply-header {
      position: absolute;
      left: 0;
      top: 0;
    }
    .header-box {
      width: 100%;
      position: relative;
      .bg-img {
        width: 750rpx;
      }

      .heaer-title {
        position: absolute;
        left: 30rpx;
        top: 50%;
        transform: translateY(-50%);
        font-size: 50rpx;
        font-weight: bold;
        color: #ffffff;
        z-index: 11;

        &::before {
          content: '';
          width: 51rpx;
          height: 8rpx;
          background: #ffffff;
          border-radius: 4rpx;
          position: absolute;
          z-index: 12;
          bottom: -20rpx;
        }
      }
    }

    .apply-box {
      padding: 0 40rpx;

      .item-box {
        border-bottom: 2rpx solid #eee;
      }
    }
  }

  .agreement-text {
    font-size: 24rpx;
    color: #c4c4c4;
    line-height: normal;

    .tcp-text {
      color: var(--ui-BG-Main);
    }
  }

  .card-image {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
  }
</style>
