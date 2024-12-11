<template>
  <s-layout :bgStyle="{ backgroundColor: '#fff' }" tabbar="/pages/index/cart" title="购物车">
    <s-empty
      v-if="state.list.length === 0"
      icon="/static/cart-empty.png"
      text="购物车空空如也,快去逛逛吧~"
    />

    <!-- 头部 -->
    <view v-if="state.list.length" class="cart-box ss-flex ss-flex-col ss-row-between">
      <view class="cart-header ss-flex ss-col-center ss-row-between ss-p-x-30">
        <view class="header-left ss-flex ss-col-center ss-font-26">
          共
          <text class="goods-number ui-TC-Main ss-flex">{{ state.list.length }}</text>
          件商品
        </view>
        <view class="header-right">
          <button v-if="state.editMode" class="ss-reset-button" @tap="state.editMode = false">
            取消
          </button>
          <button v-else class="ss-reset-button ui-TC-Main" @tap="state.editMode = true">
            编辑
          </button>
        </view>
      </view>
      <!-- 内容 -->
      <view class="cart-content ss-flex-1 ss-p-x-30 ss-m-b-40">
        <view v-for="item in state.list" :key="item.id" class="goods-box ss-r-10 ss-m-b-14">
          <view class="ss-flex ss-col-center">
            <label class="check-box ss-flex ss-col-center ss-p-l-10" @tap="onSelectSingle(item.id)">
              <radio
                :checked="state.selectedIds.includes(item.id)"
                color="var(--ui-BG-Main)"
                style="transform: scale(0.8)"
                @tap.stop="onSelectSingle(item.id)"
              />
            </label>
            <s-goods-item
              :img="item.spu.picUrl || item.goods.image"
              :price="item.sku.price"
              :skuText="
                item.sku.properties.length > 1
                  ? item.sku.properties.reduce(
                      (items2, items) => items2.valueName + ' ' + items.valueName,
                    )
                  : item.sku.properties[0].valueName
              "
              :title="item.spu.name"
              :titleWidth="400"
              priceColor="#FF3000"
            >
              <template v-if="!state.editMode" v-slot:tool>
                <su-number-box
                  v-model="item.count"
                  :max="item.sku.stock"
                  :min="0"
                  :step="1"
                  @change="onNumberChange($event, item)"
                />
              </template>
            </s-goods-item>
          </view>
        </view>
      </view>
      <!-- 底部 -->
      <su-fixed v-if="state.list.length > 0" :isInset="false" :val="48" bottom placeholder>
        <view class="cart-footer ss-flex ss-col-center ss-row-between ss-p-x-30 border-bottom">
          <view class="footer-left ss-flex ss-col-center">
            <label class="check-box ss-flex ss-col-center ss-p-r-30" @tap="onSelectAll">
              <radio
                :checked="state.isAllSelected"
                color="var(--ui-BG-Main)"
                style="transform: scale(0.8)"
                @tap.stop="onSelectAll"
              />
              <view class="ss-m-l-8"> 全选</view>
            </label>
            <text>合计：</text>
            <view class="text-price price-text">
              {{ fen2yuan(state.totalPriceSelected) }}
            </view>
          </view>
          <view class="footer-right">
            <button
              v-if="state.editMode"
              class="ss-reset-button ui-BG-Main-Gradient pay-btn ui-Shadow-Main"
              @tap="onDelete"
            >
              删除
            </button>
            <button
              v-else
              class="ss-reset-button ui-BG-Main-Gradient pay-btn ui-Shadow-Main"
              @tap="onConfirm"
            >
              去结算
              {{ state.selectedIds?.length ? `(${state.selectedIds.length})` : '' }}
            </button>
          </view>
        </view>
      </su-fixed>
    </view>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import SpuApi from '@/sheep/api/product/spu';
  import { computed, reactive } from 'vue';
  import { fen2yuan } from '@/sheep/hooks/useGoods';
  import { isEmpty } from '@/sheep/helper/utils';
  import { DeliveryTypeEnum } from '@/sheep/util/const';

  const sys_navBar = sheep.$platform.navbar;
  const cart = sheep.$store('cart');

  const state = reactive({
    editMode: false,
    list: computed(() => cart.list),
    selectedList: [],
    selectedIds: computed(() => cart.selectedIds),
    isAllSelected: computed(() => cart.isAllSelected),
    totalPriceSelected: computed(() => cart.totalPriceSelected),
  });

  // 单选选中
  function onSelectSingle(id) {
    cart.selectSingle(id);
  }

  // 全选
  function onSelectAll() {
    cart.selectAll(!state.isAllSelected);
  }

  // 结算
  async function onConfirm() {
    const items = [];
    state.selectedList = state.list.filter((item) => state.selectedIds.includes(item.id));
    state.selectedList.map((item) => {
      // 此处前端做出修改
      items.push({
        skuId: item.sku.id,
        count: item.count,
        cartId: item.id,
        categoryId: item.spu.categoryId,
      });
    });
    if (isEmpty(items)) {
      sheep.$helper.toast('请先选择商品');
      return;
    }
    await validateDeliveryType(state.selectedList.map((item) => item.spu).map((spu) => spu.id));
    sheep.$router.go('/pages/order/confirm', {
      data: JSON.stringify({
        items,
      }),
    });
  }

  /** 校验配送方式 */
  function validateDeliveryType(spuIds) {
    return new Promise(async (resolve, reject) => {
      const { data } = await SpuApi.getSpuListByIds(spuIds.join(','));
      if (isEmpty(data)) {
        reject('获取商品信息失败！！！');
        return;
      }
      let onlyExpress = false; // 只快递
      let onlyPickup = false; // 只自提
      // TODO @puhui999：这里需要比对，A 商品支持自提、B 商品支持快递，这样导致 A 和 B 无法一起下单。
      const deliveryTypes = data.map((item) => item.deliveryTypes);
      for (const deliveryType of deliveryTypes) {
        // 情况一：两种配送方式都支持
        if (deliveryType.length > 1) {
          continue;
        }
        // 情况二：只支持一种
        if (deliveryType[0] === DeliveryTypeEnum.EXPRESS.type) {
          onlyExpress = true;
        } else if (deliveryType[0] === DeliveryTypeEnum.PICK_UP.type) {
          onlyPickup = true;
        }
      }
      if (onlyExpress || onlyPickup) {
        reject('选中商品存在只支持特定配送方式的情况不允许提交！！！');
        sheep.$helper.toast('选中商品存在只支持特定配送方式的情况不允许提交！！！');
        return;
      }
      resolve();
    });
  }

  function onNumberChange(e, cartItem) {
    if (e === 0) {
      cart.delete(cartItem.id);
      return;
    }
    if (cartItem.goods_num === e) return;
    cartItem.goods_num = e;
    cart.update({
      goods_id: cartItem.id,
      goods_num: e,
      goods_sku_price_id: cartItem.goods_sku_price_id,
    });
  }

  async function onDelete() {
    cart.delete(state.selectedIds);
  }
</script>

<style lang="scss" scoped>
  :deep(.ui-fixed) {
    height: 72rpx;
  }

  .cart-box {
    width: 100%;

    .cart-header {
      height: 70rpx;
      background-color: #f6f6f6;
      width: 100%;
      position: fixed;
      left: 0;
      top: v-bind('sys_navBar') rpx;
      z-index: 1000;
      box-sizing: border-box;
    }

    .cart-footer {
      height: 100rpx;
      background-color: #fff;

      .pay-btn {
        width: 180rpx;
        height: 70rpx;
        font-size: 28rpx;
        line-height: 28rpx;
        font-weight: 500;
        border-radius: 40rpx;
      }
    }

    .cart-content {
      margin-top: 70rpx;

      .goods-box {
        background-color: #fff;
      }
    }
  }
</style>
