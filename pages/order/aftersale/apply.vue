<!-- 订单详情 -->
<template>
  <s-layout title="申请售后">
    <!-- 售后商品 -->
    <view class="goods-box">
      <s-goods-item :img="state.goodsItem.goods_image" :title="state.goodsItem.goods_title"
        :skuText="state.goodsItem.goods_sku_text" :price="state.goodsItem.goods_price"
        :num="state.goodsItem.goods_num"></s-goods-item>
    </view>

    <uni-forms ref="form" v-model="formData" :rules="rules" label-position="top">
      <!-- 售后类型 -->
      <view class="refund-item">
        <view class="item-title ss-m-b-20">售后类型</view>
        <view class="ss-flex-col">
          <radio-group @change="onRefundChange">
            <label class="ss-flex ss-col-center ss-p-y-10" v-for="(item, index) in state.refundTypeList" :key="index">
              <radio :checked="formData.type === item.value" color="var(--ui-BG-Main)" style="transform: scale(0.8)"
                :value="item.value" />
              <view class="item-value ss-m-l-8">{{ item.text }}</view>
            </label>
          </radio-group>
        </view>
      </view>
      <!-- 申请原因 -->
      <view class="refund-item ss-flex ss-col-center ss-row-between" @tap="state.showModal = true">
        <text class="item-title">申请原因</text>
        <view class="ss-flex refund-cause ss-col-center">
          <text class="ss-m-r-20" v-if="formData.reason">{{ formData.reason }}</text>
          <text class="ss-m-r-20" v-else>请选择申请原因~</text>
          <!-- <text class="ss-iconfont _icon-forward" style="color: #666"></text> -->
          <text class="cicon-forward" style="height: 28rpx"></text>
        </view>
      </view>
      <view class="refund-item u-m-b-20">
        <view class="item-title ss-m-b-20">联系方式</view>
        <view class="input-box u-flex">
          <uni-easyinput :inputBorder="false" type="number" v-model="formData.mobile" placeholder="请输入您的联系电话"
            paddingLeft="10" />
        </view>
      </view>

      <!-- 留言 -->
      <view class="refund-item">
        <view class="item-title ss-m-b-20">相关描述</view>
        <view class="describe-box">
          <uni-easyinput :inputBorder="false" class="describe-content" type="textarea" maxlength="120" autoHeight
            v-model="formData.content" placeholder="客官~请描述您遇到的问题，建议上传照片"></uni-easyinput>
          <view class="upload-img">
            <s-uploader v-model:url="formData.images" fileMediatype="image" limit="9" mode="grid"
              :imageStyles="{ width: '168rpx', height: '168rpx' }" />
          </view>
        </view>
      </view>
    </uni-forms>
    <!-- 底部按钮 -->
    <su-fixed bottom placeholder>
      <view class="foot-wrap">
        <view class="foot_box ss-flex ss-col-center ss-row-between ss-p-x-30">
          <button class="ss-reset-button contcat-btn" @tap="sheep.$router.go('/pages/chat/index')">联系客服</button>
          <button class="ss-reset-button ui-BG-Main-Gradient sub-btn" @tap="submit">提交</button>
        </view>
      </view>
    </su-fixed>
    <!-- 申请原因弹窗 -->

    <su-popup :show="state.showModal" round="10" :showClose="true" @close="state.showModal = false">
      <view class="modal-box page_box">
        <view class="modal-head item-title head_box ss-flex ss-row-center ss-col-center">申请原因</view>
        <view class="modal-content content_box">
          <radio-group @change="onChange">
            <label class="radio ss-flex ss-col-center" v-for="item in state.refundReasonList" :key="item.value">
              <view class="ss-flex-1 ss-p-20">{{ item.title }}</view>
              <radio :value="item.value" color="var(--ui-BG-Main)" :checked="item.value === state.currentValue" />
            </label>
          </radio-group>
        </view>
        <view class="modal-foot foot_box ss-flex ss-row-center ss-col-center">
          <button class="ss-reset-button close-btn ui-BG-Main-Gradient" @tap="onReason">确定</button>
        </view>
      </view>
    </su-popup>
  </s-layout>
</template>

<script setup>
import sheep from '@/sheep';
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref, unref } from 'vue';
const form = ref(null);
const state = reactive({
  showModal: false,
  currentValue: 0,
  goodsItem: {},
  reasonText: '',
  //售后类型
  refundTypeList: [
    {
      text: '仅退款',
      value: 'refund',
    },
    {
      text: '退/换货',
      value: 'return',
    },
    {
      text: '其他',
      value: 'other',
    },
  ],
  refundReasonList: [
    {
      value: '1',
      title: '卖家发错货了',
    },
    {
      value: '2',
      title: '退运费',
    },
    {
      value: '3',
      title: '大小/重量与商品描述不符',
    },
    {
      value: '4',
      title: '生产日期/保质期与商品描述不符',
    },
    {
      value: '5',
      title: '质量问题',
    },
    {
      value: '6',
      title: '我不想要了',
    },
  ],
});
const formData = reactive({
  type: '',
  reason: '',
  mobile: '',
  content: '',
  images: [],
});
const rules = reactive({});

// 提交表单
async function submit() {
  // #ifdef MP
  sheep.$platform.useProvider('wechat').subscribeMessage('order_aftersale_change');
  // #endif
  let data = {
    ...formData,
    order_id: state.goodsItem.order_id,
    order_item_id: state.goodsItem.id,
  };
  const res = await sheep.$api.order.aftersale.apply(data);
  if (res.error === 0) {
    uni.showToast({
      title: res.msg,
    });
    sheep.$router.go('/pages/order/aftersale/list');
  }
}

//选择售后类型
function onRefundChange(e) {
  formData.type = e.detail.value;
}

//选择申请原因
function onChange(e) {
  state.currentValue = e.detail.value;
  state.refundReasonList.forEach((item) => {
    if (item.value === e.detail.value) {
      state.reasonText = item.title;
    }
  });
}
//确定
function onReason() {
  formData.reason = state.reasonText;
  state.showModal = false;
}

function onTitle(e, title) {
  state.currentValue = e;
  state.reasonText = title;
}
onLoad((options) => {
  state.goodsItem = JSON.parse(options.item);
});
</script>

<style lang="scss" scoped>
.item-title {
  font-size: 30rpx;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  // margin-bottom: 20rpx;
}

// 售后项目
.refund-item {
  background-color: #fff;
  border-bottom: 1rpx solid #f5f5f5;
  padding: 30rpx;

  &:last-child {
    border: none;
  }

  // 留言
  .describe-box {
    width: 690rpx;
    background: rgba(249, 250, 251, 1);
    padding: 30rpx;
    box-sizing: border-box;
    border-radius: 20rpx;

    .describe-content {
      height: 200rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #333;
    }
  }

  // 联系方式
  .input-box {
    height: 84rpx;
    background: rgba(249, 250, 251, 1);
    border-radius: 20rpx;
  }
}

.goods-box {
  background: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.foot-wrap {
  height: 100rpx;
  width: 100%;
}

.foot_box {
  height: 100rpx;
  background-color: #fff;

  .sub-btn {
    width: 336rpx;
    line-height: 74rpx;
    border-radius: 38rpx;
    color: rgba(#fff, 0.9);
    font-size: 28rpx;
  }

  .contcat-btn {
    width: 336rpx;
    line-height: 74rpx;
    background: rgba(238, 238, 238, 1);
    border-radius: 38rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}

.modal-box {
  width: 750rpx;
  // height: 680rpx;
  border-radius: 30rpx 30rpx 0 0;
  background: #fff;

  .modal-head {
    height: 100rpx;
    font-size: 30rpx;
  }

  .modal-content {
    font-size: 28rpx;
  }

  .modal-foot {
    .close-btn {
      width: 710rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      color: rgba(#fff, 0.9);
    }
  }
}

.success-box {
  width: 600rpx;
  padding: 90rpx 0 64rpx 0;

  .cicon-check-round {
    font-size: 96rpx;
    color: #04b750;
  }

  .success-title {
    font-weight: 500;
    color: #333333;
    font-size: 32rpx;
  }

  .success-btn {
    width: 492rpx;
    height: 70rpx;
    background: linear-gradient(90deg, var(--ui-BG-Main-gradient), var(--ui-BG-Main));
    border-radius: 35rpx;
  }
}
</style>
