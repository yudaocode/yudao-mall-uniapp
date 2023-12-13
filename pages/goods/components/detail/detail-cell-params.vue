<template>
  <view>
    <detail-cell
      v-if="modelValue.length > 0"
      label="参数"
      :value="state.paramsTitle"
      @click="state.show = true"
    ></detail-cell>
    <su-popup :show="state.show" round="10" :showClose="true" @close="close">
      <view class="ss-modal-box bg-white">
        <view class="modal-header">产品参数</view>
        <scroll-view
          class="modal-content ss-p-t-50"
          scroll-y="true"
          :scroll-with-animation="true"
          :show-scrollbar="false"
          @touchmove.stop
        >
          <view class="sale-item ss-flex ss-col-top" v-for="item in modelValue" :key="item.title">
            <view class="item-title">{{ item.title }}</view>
            <view class="item-value">{{ item.content }}</view>
          </view>
        </scroll-view>
        <view class="modal-footer ss-flex ss-row-center ss-m-b-20">
          <button class="ss-reset-button save-btn ui-Shadow-Main" @tap="state.show = false"
            >确定</button
          >
        </view>
      </view>
    </su-popup>
  </view>
</template>

<script setup>
  import { reactive, computed } from 'vue';

  import detailCell from './detail-cell.vue';
  const props = defineProps({
    modelValue: {
      type: Object,
      default() {
        return [];
      },
    },
  });
  const state = reactive({
    show: false,
    paramsTitle: computed(() => {
      let titleArray = [];
      props.modelValue.map((item) => {
        titleArray.push(item.title);
      });
      return titleArray.join(' · ');
    }),
  });

  function close() {
    state.show = false;
  }
</script>

<style lang="scss" scoped>
  .ss-modal-box {
    border-radius: 30rpx 30rpx 0 0;
    max-height: 730rpx;

    .modal-header {
      position: relative;
      padding: 30rpx 20rpx 40rpx;
      font-size: 36rpx;
      font-weight: bold;
    }

    .modal-content {
      padding: 0 30rpx;
      max-height: 500rpx;
      box-sizing: border-box;

      .sale-item {
        margin-bottom: 24rpx;
        padding-bottom: 24rpx;
        border-bottom: 2rpx solid rgba(#dfdfdf, 0.4);

        .item-title {
          font-size: 28rpx;
          font-weight: 500;
          line-height: 42rpx;
          width: 120rpx;
          white-space: normal;
        }

        .item-value {
          font-size: 26rpx;
          font-weight: 400;
          color: $dark-9;
          line-height: 42rpx;
          flex: 1;
          margin-left: 20rpx;
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
</style>
