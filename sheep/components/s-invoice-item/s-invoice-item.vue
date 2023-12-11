<template>
  <view
    class="address-item ss-flex ss-row-between ss-col-center"
    :class="[{ 'border-bottom': props.hasBorderBottom }]"
  >
    <view class="item-left" v-if="!_.isEmpty(props.item)">
      <view class="address-text">{{ props.item.name }}</view>
      <view class="person-text">{{ props.item.mobile }}</view>
    </view>
    <view v-else>
      <view class="address-text">请选择收货地址</view>
    </view>
    <slot>
      <button class="ss-reset-button edit-btn" @tap.stop="onEdit">
        <view class="edit-icon ss-flex ss-row-center ss-col-center">
          <image :src="sheep.$url.static('/static/img/shop/user/address/edit.png')"></image>
        </view>
      </button>
    </slot>
  </view>
</template>

<script setup>
  /**
   * 基础组件 - 地址卡片
   *
   * @param {String}  icon = _icon-edit    - icon
   *
   * @event {Function()} click			 - 点击
   * @event {Function()} actionClick		 - 点击工具栏
   *
   * @slot 								 - 默认插槽
   */
  import sheep from '@/sheep';
  import _ from 'lodash';
  const props = defineProps({
    item: {
      type: Object,
      default() {},
    },
    hasBorderBottom: {
      type: Boolean,
      defult: true,
    },
  });

  const onEdit = () => {
    sheep.$router.go('/pages/user/invoice/edit', {
      id: props.item.id,
    });
  };
</script>

<style lang="scss" scoped>
  .address-item {
    padding: 30rpx;

    .item-left {
      width: 600rpx;
    }

    .area-text {
      font-size: 26rpx;
      font-weight: 400;
      color: $dark-9;
    }

    .address-text {
      font-size: 32rpx;
      font-weight: 600;
      color: #333333;
      line-height: 48rpx;
    }

    .person-text {
      font-size: 28rpx;
      font-weight: 400;
      color: $dark-9;
    }
  }

  .edit-btn {
    width: 44rpx;
    height: 44rpx;
    background: $gray-f;
    border-radius: 50%;
    .edit-icon {
      width: 24rpx;
      height: 24rpx;
    }
  }
  image {
    width: 100%;
    height: 100%;
  }
</style>
