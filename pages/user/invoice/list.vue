<template>
  <s-layout title="发票管理" :bgStyle="{ color: '#FFF' }">
    <view v-if="state.list.length">
      <s-invoice-item
        v-for="item in state.list"
        hasBorderBottom
        :key="item.id"
        :item="item"
        :isDefault="item.is_default"
        @tap="onSelect(item)"
      ></s-invoice-item>
    </view>

    <su-fixed bottom placeholder>
      <view class="footer-box ss-flex ss-row-between ss-p-20">
        <button
          class="add-btn ss-reset-button ui-Shadow-Main"
          @tap="sheep.$router.go('/pages/user/invoice/edit')"
        >
          新增发票抬头
        </button>
      </view>
    </su-fixed>
    <s-empty
      v-if="state.list.length === 0 && !state.loading"
      text="暂无发票"
      icon="/static/data-empty.png"
    />
  </s-layout>
</template>

<script setup>
  import { reactive } from 'vue';
  import { onShow } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import _ from 'lodash';
  const state = reactive({
    list: [],
    loading: true,
  });
  const onSelect = (invoiceInfo) => {
    uni.$emit('SELECT_INVOICE', {
      invoiceInfo,
    });
    sheep.$router.back();
  };

  onShow(async () => {
    state.list = (await sheep.$api.user.invoice.list()).data;
    state.loading = false;
  });
</script>

<style lang="scss" scoped>
  // page{
  //   background-color: red;
  // }
  .footer-box {
    .add-btn {
      flex: 1;
      background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
      border-radius: 80rpx;
      font-size: 30rpx;
      font-weight: 500;
      line-height: 80rpx;
      color: $white;
      position: relative;
      z-index: 1;
    }

    .sync-wxaddress {
      flex: 1;
      line-height: 80rpx;
      background: $white;
      border-radius: 80rpx;
      font-size: 30rpx;
      font-weight: 500;
      color: $dark-6;
      margin-right: 16rpx;
    }
  }
</style>
