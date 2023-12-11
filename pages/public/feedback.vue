<template>
  <s-layout class="set-wrap" title="问题反馈">
    <uni-forms ref="form" :modelValue="state.formData" border>
      <view class="bg-white type-box ss-p-x-20 ss-p-y-30">
        <view class="title ss-m-b-44">请选择类型</view>
        <view class="ss-m-l-12">
          <radio-group @change="radioChange">
            <label
              class="ss-flex ss-col-center ss-m-b-40"
              v-for="item in state.radioList"
              :key="item.type"
            >
              <radio :value="item.type" color="var(--ui-BG-Main)" style="transform: scale(0.8)" />
              <view class="radio-subtitle">{{ item.type }}</view>
            </label>
          </radio-group>
        </view>
      </view>
      <view class="bg-white ss-p-x-20 ss-p-y-30 ss-m-t-20">
        <view class="title ss-m-b-30"> 相关描述 </view>
        <view class="textarea">
          <uni-easyinput
            :inputBorder="false"
            type="textarea"
            v-model="state.formData.content"
            placeholderStyle="color:#BBBBBB;font-size:30rpx;font-weight:400;line-height:normal"
            placeholder="客官~请描述您遇到的问题，建议上传照片"
            clearable
          ></uni-easyinput>
          <s-uploader
            v-model:url="state.formData.images"
            fileMediatype="image"
            limit="9"
            mode="grid"
            :imageStyles="{ width: '168rpx', height: '168rpx' }"
          ></s-uploader>
        </view>
      </view>
      <view class="bg-white ss-p-x-20 ss-p-y-30 ss-m-t-20">
        <view class="title ss-m-b-30"> 联系方式 </view>
        <view class="mobile-box">
          <uni-easyinput
            :inputBorder="false"
            type="number"
            v-model="state.formData.phone"
            paddingLeft="10"
            placeholder="请输入您的联系电话"
          />
        </view>
      </view>
    </uni-forms>
    <su-fixed bottom placeholder>
      <view class="ss-flex ss-row-between ss-p-x-30 ss-p-y-10">
        <button class="kefu-btn ss-reset-button" @tap="sheep.$router.go('/pages/chat/index')">
          联系客服
        </button>
        <button class="submit-btn ss-reset-button ui-BG-Main ui-Shadow-Main" @tap="onSubmit">
          提交
        </button>
      </view>
    </su-fixed>
  </s-layout>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app';
  import { computed, reactive, ref, unref } from 'vue';
  import sheep from '@/sheep';

  const filesRef = ref(null);
  const state = reactive({
    radioList: [
      {
        type: '产品功能问题反馈',
      },
      {
        type: '建议及意见反馈',
      },
      {
        type: '投诉客服其他问题',
      },
    ],
    formData: {
      content: '',
      phone: '',
      images: [],
      type: '',
    },
    imageFiles: [],
    current: 0,
  });

  async function onSubmit() {
    if (!state.formData.type) {
      sheep.$helper.toast('请选择类型');
      return;
    }
    if (!state.formData.content) {
      sheep.$helper.toast('请描述您遇到的问题');
      return;
    }
    if (!state.formData.phone) {
      sheep.$helper.toast('请输入您的联系方式');
      return;
    }

    const { error } = await sheep.$api.app.feedback(state.formData);
    if (error === 0) {
      sheep.$router.back();
    }
  }

  function radioChange(e) {
    state.formData.type = e.detail.value;
  }
</script>

<style lang="scss" scoped>
  .type-box {
    border-top: 2rpx solid #f9fafb;
  }

  .uni-forms {
    width: 100%;
  }

  .title {
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;
    line-height: normal;
  }

  :deep() {
    .uni-easyinput__placeholder-class {
      color: #bbbbbb !important;
      font-size: 28rpx !important;
      font-weight: 400 !important;
      line-height: normal !important;
    }

    .uni-forms-item__label .label-text {
      font-size: 28rpx !important;
      color: #333333 !important;
      line-height: normal !important;
    }

    .uni-list-item__content-title {
      font-size: 28rpx !important;
      color: #333333 !important;
      line-height: normal !important;
    }

    .uni-easyinput__content-textarea {
      font-size: 28rpx !important;
      color: #333333 !important;
      line-height: normal !important;
      margin-top: 4rpx !important;
      padding-left: 20rpx !important;
    }

    .uni-icons {
      font-size: 40rpx !important;
    }

    .icon-del-box {
      width: 32rpx;
      height: 32rpx;
      top: 0;
      right: 0;

      .icon-del {
        width: 24rpx;
      }
    }
  }

  .radio-subtitle {
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
    line-height: 42rpx;
  }

  .textarea {
    min-height: 322rpx;
    background: #f9fafb;
    border-radius: 20rpx;
    padding: 20rpx;
    margin: 30rpx 20rpx 46rpx 0;

    .area {
      height: 238rpx;
      font-size: 26rpx;
      font-weight: 500;
      color: #333;
      line-height: 50rpx;
      width: 100%;
    }

    .pl-style {
      font-size: 24rpx;
      color: #b1b3c7;
      font-weight: 500;
    }
  }

  .mobile-box {
    background: #f9fafb;
    border-radius: 20rpx;
  }

  .submit-btn {
    width: 334rpx;
    height: 74rpx;
    border-radius: 37rpx;
  }

  .kefu-btn {
    width: 334rpx;
    height: 74rpx;
    border-radius: 37rpx;
    background: #eeeeee;
    color: #333333;
  }
</style>
