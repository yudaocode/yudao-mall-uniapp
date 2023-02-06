<template>
  <!-- 拼团商品规格弹窗 -->
  <su-popup :show="show" round="10" @close="emits('close')">
    <view class="ss-modal-box bg-white ss-flex-col">
      <view class="modal-header ss-flex ss-col-center">
        <view class="header-left ss-m-r-30">
          <image
            class="sku-image"
            :src="sheep.$url.cdn(state.selectedSkuPrice.image || goodsInfo.image)"
            mode="aspectFill"
          >
          </image>
        </view>
        <view class="header-right ss-flex-col ss-row-between ss-flex-1">
          <view class="goods-title ss-line-2">
            <view class="tig ss-flex ss-col-center">
              <view class="tig-icon ss-flex ss-col-center ss-row-center">
                <view class="groupon-tag">
                  <image :src="sheep.$url.static('/static/img/shop/goods/groupon-tag-white.png')">
                  </image>
                </view>
              </view>
              <view class="tig-title">拼团价</view>
            </view>
            <view class="info-title">
              {{ goodsInfo.title }}
            </view>
          </view>
          <view class="header-right-bottom ss-flex ss-col-center ss-row-between">
            <view class="price-text"> {{ goodsPrice }}</view>

            <view class="stock-text ss-m-l-20">
              库存{{ state.selectedSkuPrice.stock || goodsInfo.stock }}件
            </view>
          </view>
        </view>
      </view>
      <view class="modal-content ss-flex-1">
        <scroll-view scroll-y="true" class="modal-content-scroll">
          <view
            v-if="grouponAction === 'create' && activityType === 'groupon_ladder'"
            class="sku-item ss-m-b-20"
          >
            <view class="label-text ss-m-b-20">拼团人数</view>
            <view class="ss-flex ss-col-center ss-flex-wrap">
              <button
                v-for="(ladder, key) in goodsInfo.activity.rules.ladders"
                :key="key"
                class="ss-reset-button spec-btn"
                :class="[
                  {
                    'checked-btn': grouponNum == ladder,
                  },
                ]"
                @tap="onSelectLadder(ladder)"
              >
                {{ ladder }}人团
              </button>
            </view>
          </view>
          <view class="sku-item ss-m-b-20" v-for="sku1 in goodsInfo.skus" :key="sku1.id">
            <view class="label-text ss-m-b-20">{{ sku1.name }}</view>
            <view class="ss-flex ss-col-center ss-flex-wrap">
              <button
                class="ss-reset-button spec-btn"
                v-for="sku2 in sku1.children"
                :class="[
                  {
                    'checked-btn': state.currentSkuArray[sku2.parent_id] == sku2.id,
                  },
                  {
                    'disabled-btn': sku2.disabled == true,
                  },
                ]"
                :key="sku2.id"
                :disabled="sku2.disabled == true"
                @tap="onSelectSku(sku2.parent_id, sku2.id)"
              >
                {{ sku2.name }}
              </button>
            </view>
          </view>
          <view class="buy-num-box ss-flex ss-col-center ss-row-between">
            <view class="label-text">购买数量</view>
            <su-number-box
              :min="1"
              :max="state.selectedSkuPrice.stock"
              :step="1"
              v-model="state.selectedSkuPrice.goods_num"
              activity="groupon"
            ></su-number-box>
          </view>
        </scroll-view>
      </view>
      <view class="modal-footer ss-p-y-20">
        <view class="buy-box ss-flex ss-col-center ss-flex ss-col-center ss-row-center">
          <view class="ss-flex">
            <button class="ss-reset-button origin-price-btn ss-flex-col">
              <view class="btn-title">{{
                grouponNum === 0 ? '阶梯团' : grouponNum + '人团'
              }}</view>
            </button>
            <button class="ss-reset-button btn-tox ss-flex-col" @tap="onBuy">
              <view class="btn-price">
                {{
                  grouponAction === 'create' && goodsInfo.activity.rules.is_leader_discount == 1
                    ? leaderPrice
                    : goodsPrice
                }}
              </view>
              <view
                v-if="
                  grouponAction === 'create' && goodsInfo.activity.rules.is_leader_discount == 0
                "
                >立即开团</view
              >
              <view
                v-else-if="
                  grouponAction === 'create' && goodsInfo.activity.rules.is_leader_discount == 1
                "
                >团长立减价</view
              >
              <view v-else-if="grouponAction === 'join'">参与拼团</view>
            </button>
          </view>
        </view>
      </view>
    </view>
  </su-popup>
</template>

<script setup>
  import { computed, reactive, watch } from 'vue';
  import sheep from '@/sheep';
  import { formatPrice } from '@/sheep/hooks/useGoods';
  import { isEmpty } from 'lodash';

  const headerBg = sheep.$url.css('/static/img/shop/goods/groupon-btn-long.png');
  const emits = defineEmits(['change', 'addCart', 'buy', 'close', 'ladder']);
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    goodsInfo: {
      type: Object,
      default() {},
    },
    grouponAction: {
      type: String,
      default: 'create',
    },
    grouponNum: {
      type: [Number, String],
      default: 0,
    },
  });
  const state = reactive({
    selectedSkuPrice: {},
    currentSkuArray: [],
    grouponNum: props.grouponNum,
  });
  // 默认单规格
  if (!props.goodsInfo.is_sku) {
    state.selectedSkuPrice = props.goodsInfo.sku_prices[0];
  }

  // 活动类型
  const activityType = props.goodsInfo.activity_type;

  // 可选规格
  const skuPrices = computed(() => {
    let skuPrices = props.goodsInfo.sku_prices;
    if (props.goodsInfo.is_sku) {
      skuPrices.forEach((item) => {
        item.goods_sku_id_arr = item.goods_sku_ids.split(',');
      });
    }
    return skuPrices;
  });

  const skuList = props.goodsInfo.skus;

  // 规格价格
  const goodsPrice = computed(() => {
    if (isEmpty(state.selectedSkuPrice)) {
      return formatPrice(props.goodsInfo.price);
    }
    if (props.grouponNum === 0 && activityType === 'groupon_ladder') {
      return formatPrice(props.goodsInfo.price);
    }

    if (activityType === 'groupon') {
      return state.selectedSkuPrice.groupon_price;
    }
    if (activityType === 'groupon_ladder') {
      const ladder = getSkuPriceByLadder();
      state.selectedSkuPrice.ladder_price = ladder.ladder_price;
      return ladder.ladder_price;
    }
  });

  // 团长优惠
  const leaderPrice = computed(() => {
    if (isEmpty(state.selectedSkuPrice)) {
      return formatPrice(props.goodsInfo.price);
    }

    if (props.grouponNum === 0 && activityType === 'groupon_ladder') {
      return formatPrice(props.goodsInfo.price);
    }

    if (activityType === 'groupon') {
      return state.selectedSkuPrice.leader_price;
    }
    if (activityType === 'groupon_ladder') {
      const ladder = getSkuPriceByLadder();
      return ladder.leader_ladder_price;
    }
  });

  // 获取阶梯价
  function getSkuPriceByLadder() {
    return state.selectedSkuPrice.ladders.find((item) => item.ladder == props.grouponNum);
  }

  watch(
    () => state.selectedSkuPrice,
    (newVal) => {
      emits('change', newVal);
    },
    {
      immediate: true, // 立即执行
      deep: true, // 深度监听
    },
  );

  // 点击购买
  function onBuy() {
    if (!state.selectedSkuPrice.goods_id) {
      sheep.$helper.toast('请选择规格');
      return;
    }
    if (state.selectedSkuPrice.stock <= 0) {
      sheep.$helper.toast('库存不足');
      return;
    }
    emits('buy', state.selectedSkuPrice);
  }

  // 改变禁用状态
  function changeDisabled(isChecked = false, pid = 0, skuId = 0) {
    let newPrice = []; // 所有可以选择的 skuPrice

    if (isChecked) {
      // 选中规格
      // 当前点击选中规格下的 所有可用 skuPrice
      for (let price of skuPrices.value) {
        if (price.stock <= 0) {
          // this.goodsNum 不判断是否大于当前选择数量，在 uni-number-box 判断，并且 取 stock 和 goods_num 的小值
          continue;
        }
        if (price.goods_sku_id_arr.indexOf(skuId.toString()) >= 0) {
          newPrice.push(price);
        }
      }
    } else {
      // 取消选中
      // 当前所选规格下，所有可以选择的 skuPrice
      newPrice = getCanUseSkuPrice();
    }

    // 所有存在并且有库存未选择的规格项 的 子项 id
    let noChooseSkuIds = [];
    for (let price of newPrice) {
      noChooseSkuIds = noChooseSkuIds.concat(price.goods_sku_id_arr);
    }

    // 去重
    noChooseSkuIds = Array.from(new Set(noChooseSkuIds));

    if (isChecked) {
      // 去除当前选中的规格项
      let index = noChooseSkuIds.indexOf(skuId.toString());
      noChooseSkuIds.splice(index, 1);
    } else {
      // 循环去除当前已选择的规格项
      state.currentSkuArray.forEach((sku) => {
        if (sku.toString() != '') {
          // sku 为空是反选 填充的
          let index = noChooseSkuIds.indexOf(sku.toString());
          if (index >= 0) {
            // sku 存在于 noChooseSkuIds
            noChooseSkuIds.splice(index, 1);
          }
        }
      });
    }

    // 当前已选择的规格大类
    let chooseSkuKey = [];
    if (!isChecked) {
      // 当前已选择的规格大类
      state.currentSkuArray.forEach((sku, key) => {
        if (sku != '') {
          // sku 为空是反选 填充的
          chooseSkuKey.push(key);
        }
      });
    } else {
      // 当前点击选择的规格大类
      chooseSkuKey = [pid];
    }

    for (let i in skuList) {
      // 当前点击的规格，或者取消选择时候 已选中的规格 不进行处理
      if (chooseSkuKey.indexOf(skuList[i]['id']) >= 0) {
        continue;
      }

      for (let j in skuList[i]['children']) {
        // 如果当前规格项 id 不存在于有库存的规格项中，则禁用
        if (noChooseSkuIds.indexOf(skuList[i]['children'][j]['id'].toString()) >= 0) {
          skuList[i]['children'][j]['disabled'] = false;
        } else {
          skuList[i]['children'][j]['disabled'] = true;
        }
      }
    }
  }

  // 当前所选规格下，获取所有有库存的 skuPrice
  function getCanUseSkuPrice() {
    let newPrice = [];

    for (let price of skuPrices.value) {
      if (price.stock <= 0) {
        // || price.stock < this.goodsNum		不判断是否大于当前选择数量，在 uni-number-box 判断，并且 取 stock 和 goods_num 的小值
        continue;
      }
      var isOk = true;

      state.currentSkuArray.forEach((sku) => {
        // sku 不为空，并且，这个 条 skuPrice 没有被选中,则排除
        if (sku.toString() != '' && price.goods_sku_id_arr.indexOf(sku.toString()) < 0) {
          isOk = false;
        }
      });

      if (isOk) {
        newPrice.push(price);
      }
    }

    return newPrice;
  }

  // 选择阶梯拼团人数
  function onSelectLadder(ladder) {
    emits('ladder', ladder);
  }

  // 选择规格
  function onSelectSku(pid, skuId) {
    // 清空已选择
    if (activityType === 'groupon_ladder' && props.grouponNum == 0) {
      sheep.$helper.toast('请选择拼团人数');
      return;
    }
    let isChecked = true; // 选中 or 取消选中
    if (state.currentSkuArray[pid] != undefined && state.currentSkuArray[pid] == skuId) {
      // 点击已被选中的，删除并填充 ''
      isChecked = false;
      state.currentSkuArray.splice(pid, 1, '');
    } else {
      // 选中
      state.currentSkuArray[pid] = skuId;
    }

    let chooseSkuId = []; // 选中的规格大类
    state.currentSkuArray.forEach((sku) => {
      if (sku != '') {
        // sku 为空是反选 填充的
        chooseSkuId.push(sku);
      }
    });

    // 当前所选规格下，所有可以选择的 skuPric
    let newPrice = getCanUseSkuPrice();
    // 判断所有规格大类是否选择完成
    if (chooseSkuId.length == skuList.length && newPrice.length) {
      newPrice[0].goods_num = state.selectedSkuPrice.goods_num || 1;
      state.selectedSkuPrice = newPrice[0];
    } else {
      state.selectedSkuPrice = {};
    }

    // 改变规格项禁用状态
    changeDisabled(isChecked, pid, skuId);
  }

  changeDisabled(false);
</script>

<style lang="scss" scoped>
  // 购买
  .buy-btn {
    margin: 0 20rpx;
    width: 100%;
    height: 80rpx;
    border-radius: 40rpx;
    background: linear-gradient(90deg, #ff6000, #fe832a);
    color: #fff;
  }
  .btn-tox {
    width: 382rpx;
    height: 80rpx;
    font-size: 24rpx;
    font-weight: 600;
    margin-left: -50rpx;
    background-image: v-bind(headerBg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
    line-height: normal;
    border-radius: 0px 40rpx 40rpx 0px;

    .btn-price {
      font-family: OPPOSANS;

      &::before {
        content: '￥';
      }
    }
  }
  .origin-price-btn {
    width: 370rpx;
    height: 80rpx;
    background: rgba(#ff5651, 0.1);
    color: #ff6000;
    border-radius: 40rpx 0px 0px 40rpx;
    line-height: normal;
    font-size: 24rpx;
    font-weight: 500;

    .btn-price {
      font-family: OPPOSANS;

      &::before {
        content: '￥';
      }
    }

    .btn-title {
      font-size: 28rpx;
    }
  }

  .ss-modal-box {
    border-radius: 30rpx 30rpx 0 0;
    max-height: 1000rpx;

    .modal-header {
      position: relative;
      padding: 80rpx 20rpx 40rpx;

      .sku-image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 10rpx;
      }

      .header-right {
        height: 160rpx;
      }

      .close-icon {
        position: absolute;
        top: 10rpx;
        right: 20rpx;
        font-size: 46rpx;
        opacity: 0.2;
      }

      .goods-title {
        font-size: 28rpx;
        font-weight: 500;
        line-height: 42rpx;
        position: relative;
        .tig {
          border: 2rpx solid #ff6000;
          border-radius: 4rpx;
          width: 126rpx;
          height: 38rpx;
          position: absolute;
          left: 0;
          top: 0;

          .tig-icon {
            width: 40rpx;
            height: 40rpx;
            background: #ff6000;
            margin-left: -2rpx;
            border-radius: 4rpx 0 0 4rpx;

            .groupon-tag {
              width: 32rpx;
              height: 32rpx;
            }
          }

          .tig-title {
            font-size: 24rpx;
            font-weight: 500;
            line-height: normal;
            color: #ff6000;
            width: 86rpx;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .info-title {
          text-indent: 132rpx;
        }
      }

      .price-text {
        font-size: 30rpx;
        font-weight: 500;
        color: $red;
        font-family: OPPOSANS;

        &::before {
          content: '￥';
          font-size: 24rpx;
        }
      }

      .stock-text {
        font-size: 26rpx;
        color: #999999;
      }
    }

    .modal-content {
      padding: 0 20rpx;

      .modal-content-scroll {
        max-height: 600rpx;

        .label-text {
          font-size: 26rpx;
          font-weight: 500;
        }

        .buy-num-box {
          height: 100rpx;
        }

        .spec-btn {
          height: 60rpx;
          min-width: 100rpx;
          padding: 0 30rpx;
          background: #f4f4f4;
          border-radius: 30rpx;
          color: #434343;
          font-size: 26rpx;
          margin-right: 10rpx;
          margin-bottom: 10rpx;
        }

        .checked-btn {
          background: linear-gradient(90deg, #ff6000, #fe832a);
          font-weight: 500;
          color: #ffffff;
        }

        .disabled-btn {
          font-weight: 400;
          color: #c6c6c6;
          background: #f8f8f8;
        }
      }
    }
  }

  image {
    width: 100%;
    height: 100%;
  }
</style>
