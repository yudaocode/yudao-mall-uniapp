<template>
  <view>
    <detail-cell
      v-if="modelValue.length > 0"
      label="保障"
      :value="state.paramsTitle"
      @click="state.show = true"
    >
    </detail-cell>
    <su-popup :show="state.show" round="10" :showClose="true" @close="state.show = false">
      <view class="ss-modal-box">
        <view class="modal-header">服务保障</view>
        <scroll-view
          class="modal-content"
          scroll-y="true"
          :scroll-with-animation="true"
          :show-scrollbar="false"
          @touchmove.stop
        >
          <view class="sale-item ss-flex ss-col-top" v-for="item in modelValue" :key="item.id">
            <image
              class="title-icon ss-m-r-14"
              :src="sheep.$url.cdn(item.image)"
              mode="aspectFill"
            ></image>
            <view class="title-box">
              <view class="item-title ss-m-b-20">{{ item.name }}</view>
              <view class="item-value">{{ item.description }}</view>
            </view>
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
  import sheep from '@/sheep';
  import detailCell from './detail-cell.vue';
  const props = defineProps({
    modelValue: {
      type: Object,
      default() {},
    },
  });

  const state = reactive({
    show: false,
    paramsTitle: computed(() => {
      let nameArray = [];
      props.modelValue.map((item) => {
        nameArray.push(item.name);
      });
      return nameArray.join(' · ');
    }),
  });
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
        margin-bottom: 44rpx;

        .title-icon {
          width: 36rpx;
          height: 36rpx;
        }
		.title-box{
			flex: 1;
		}

        .item-title {
          font-size: 28rpx;
          font-weight: 500;
          line-height: normal;
        }

        .item-value {
          font-size: 26rpx;
          font-weight: 400;
          color: $dark-9;
          line-height: 42rpx;
        }
      }
    }

    .modal-footer {
      height: 120rpx;
      background-color: #fff;

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
