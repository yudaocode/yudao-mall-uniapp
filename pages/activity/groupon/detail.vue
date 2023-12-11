<template>
  <s-layout title="拼团详情" class="detail-wrap" :navbar="state.data && !state.loading ? 'inner': 'normal'" :onShareAppMessage="shareInfo">
    <view v-if="state.loading"></view>
    <view v-if="state.data && !state.loading">
      <view
        class="recharge-box"
        v-if="state.data.goods"
        :style="[
          {
            marginTop: '-' + Number(statusBarHeight + 88) + 'rpx',
            paddingTop: Number(statusBarHeight + 108) + 'rpx',
          },
        ]"
      >
        <s-goods-item
          class="goods-box"
          :img="state.data.goods.image"
          :title="state.data.goods.title"
          :price="state.data.goods.price[0]"
          priceColor="#E1212B"
          @tap="
            sheep.$router.go('/pages/goods/groupon', {
              id: state.data.goods.id,
              activity_id: state.data.goods.activity.id,
            })
          "
          :style="[{ top: Number(statusBarHeight + 108) + 'rpx' }]"
        >
          <template #groupon>
            <view class="ss-flex">
              <view class="sales-title">{{ state.data.num }}人团</view>
              <view class="num-title ss-m-l-20">已拼{{ state.data.goods.sales }}件</view>
            </view>
          </template>
        </s-goods-item>
      </view>
      <view class="countdown-box detail-card ss-p-t-44 ss-flex-col ss-col-center">
        <view v-if="state.data.status === 'finish' || state.data.status === 'finish_fictitious'">
          <view v-if="state.data.my">
            <view class="countdown-title ss-flex">
              <text class="cicon-check-round"></text>
              恭喜您~拼团成功
            </view>
          </view>
          <view v-else>
            <view class="countdown-title ss-flex">
              <text class="cicon-info"></text>
              抱歉~该团已满员
            </view>
          </view>
        </view>
        <view v-if="state.data.status === 'invalid'">
          <view class="countdown-title ss-flex">
            <text class="cicon-info"></text>
            {{ state.data.my ? '拼团超时,已自动退款' : '该团已解散' }}
          </view>
        </view>
        <view v-if="state.data.status === 'ing'">
          <!-- TODO: 拼团进行中+活动结束-->
          <view v-if="state.data.activity_status === 'ended'">
            <view class="countdown-title ss-flex">
              <text class="cicon-info"></text>
              拼团已结束,请关注下次活动
            </view>
          </view>

          <view class="countdown-title ss-flex" v-if="state.data.activity_status === 'ing'">
            还差
            <view class="num">{{ state.data.num - state.data.current_num }}人</view>
            拼团成功
            <view class="ss-flex countdown-time">
              <view class="countdown-h ss-flex ss-row-center">{{ endTime.h }}</view>
              <view class="ss-m-x-4">:</view>
              <view class="countdown-num ss-flex ss-row-center">
                {{ endTime.m }}
              </view>
              <view class="ss-m-x-4">:</view>
              <view class="countdown-num ss-flex ss-row-center">
                {{ endTime.s }}
              </view>
            </view>
          </view>
        </view>

        <view class="ss-m-t-60 ss-flex ss-flex-wrap ss-row-center">
          <view
            class="header-avatar ss-m-r-24 ss-m-b-20"
            v-for="item in state.data.groupon_logs"
            :key="item.id"
          >
            <image :src="sheep.$url.cdn(item.avatar)" class="avatar-img"></image>
            <view
              class="header-tag ss-flex ss-col-center ss-row-center"
              v-if="item.is_leader == '1'"
            >
              团长
            </view>
          </view>
          <view class="default-avatar ss-m-r-24 ss-m-b-20" v-for="item in state.number" :key="item">
            <image
              :src="sheep.$url.static('/static/img/shop/avatar/unknown.png')"
              class="avatar-img"
            ></image>
          </view>
        </view>
        <view
          class="detail-cell-wrap ss-flex ss-col-center ss-row-between"
          v-if="state.data.activity?.richtext_id > 0"
          @tap="
            sheep.$router.go('/pages/public/richtext', {
              id: state.data.activity.richtext_id,
              title: state.data.activity.richtext_title,
            })
          "
        >
          <view class="label-text">玩法</view>
          <view class="ss-flex">
            <view class="cell-content ss-line-1 ss-flex-1">
              {{ state.data.activity?.richtext_title }}
            </view>
            <button class="ss-reset-button">
              <text class="_icon-forward right-forwrad-icon"></text>
            </button>
          </view>
        </view>
      </view>
      <view
        v-if="
          state.data.status == 'finish' ||
          state.data.status == 'finish_fictitious' ||
          state.data.status == 'invalid'
        "
        class="ss-m-t-40 ss-flex ss-row-center"
      >
        <button
          class="ss-reset-button order-btn"
          v-if="state.data.my"
          @tap="onDetail(state.data.my.order_id)"
        >
          查看订单
        </button>
        <button class="ss-reset-button join-btn" v-else @tap="onCreateGroupon"> 我要开团 </button>
      </view>
      <view v-if="state.data.status === 'ing'" class="ss-m-t-40 ss-flex ss-row-center">
        <view v-if="state.data.activity_status === 'ended'">
          <button
            class="ss-reset-button join-btn"
            v-if="state.data.my"
            @tap="onDetail(state.data.my.order_id)"
          >
            查看订单
          </button>
          <button
            class="ss-reset-button disabled-btn"
            v-else
            disabled
            @tap="onDetail(state.data.my.order_id)"
          >
            去参团
          </button>
        </view>
        <view v-else class="ss-flex ss-row-center">
          <view v-if="state.data.my">
            <button
              class="ss-reset-button join-btn"
              :disabled="state.data.activity_status === 'ing' && endTime.ms <= 0"
              @tap="onShare"
            >
              邀请好友来拼团
            </button>
          </view>
          <view v-else>
            <button
              class="ss-reset-button join-btn"
              :disabled="state.data.activity_status === 'ing' && endTime.ms <= 0"
              @tap="onJoinGroupon()"
            >
              立即参团
            </button>
          </view>
        </view>
      </view>

      <view v-if="state.data.goods">
        <s-select-groupon-sku
          :show="state.showSelectSku"
          :goodsInfo="state.data.goods"
          :grouponAction="state.grouponAction"
          :grouponNum="state.grouponNum"
          @buy="onBuy"
          @change="onSkuChange"
          @close="state.showSelectSku = false"
        />
      </view>
    </view>
    <s-empty v-if="!state.data && !state.loading" icon="/static/goods-empty.png"> </s-empty>
  </s-layout>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { useDurationTime } from '@/sheep/hooks/useGoods';
  import { showShareModal } from '@/sheep/hooks/useModal';
  import { isEmpty } from 'lodash';

  const headerBg = sheep.$url.css('/static/img/shop/user/withdraw_bg.png');
  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  const state = reactive({
    data: {},
    loading: true,
    grouponAction: 'create',
    showSelectSku: false,
    grouponNum: 0,
    number: 0,
  });

  const shareInfo = computed(() => {
    if (isEmpty(state.data)) return {};
    return sheep.$platform.share.getShareInfo(
      {
        title: state.data.goods.title,
        image: sheep.$url.cdn(state.data.goods.image),
        desc: state.data.goods.subtitle,
        params: {
          page: '5',
          query: state.data.id,
        },
      },
      {
        type: 'groupon', // 邀请拼团海报
        title: state.data.goods.title, // 商品标题
        image: sheep.$url.cdn(state.data.goods.image), // 商品主图
        price: state.data.goods.price[0], // 商品价格
        original_price: state.data.goods.original_price, // 商品原价
      },
    );
  });

  // 订单详情
  function onDetail(orderId) {
    sheep.$router.go('/pages/order/detail', {
      id: orderId,
    });
  }

  //去开团
  function onCreateGroupon() {
    state.grouponAction = 'create';
    state.grouponId = 0;
    state.showSelectSku = true;
  }

  // 规格变更
  function onSkuChange(e) {
    state.selectedSkuPrice = e;
  }

  // 立即参团
  function onJoinGroupon() {
    state.grouponAction = 'join';
    state.grouponId = state.data.id;
    state.grouponNum = state.data.num;
    state.showSelectSku = true;
  }

  // 立即购买
  function onBuy(e) {
    sheep.$router.go('/pages/order/confirm', {
      data: JSON.stringify({
        order_type: 'goods',
        buy_type: 'groupon',
        activity_id: state.data.activity.id,
        groupon_id: state.grouponId,
        groupon_num: state.grouponNum,
        goods_list: [
          {
            goods_id: e.goods_id,
            goods_num: e.goods_num,
            goods_sku_price_id: e.id,
          },
        ],
      }),
    });
  }

  const endTime = computed(() => {
    return useDurationTime(state.data.expire_time);
  });

  // 获取拼团团队详情
  async function getGrouponDetail(id) {
    const { error, data } = await sheep.$api.activity.grouponDetail(id);
    if (error === 0) {
      state.data = data;
      let number = Number(state.data.num - state.data.current_num);
      state.number = number > 0 ? number : 0;
    } else {
      state.data = null;
    }
    state.loading = false;
  }

  function onShare() {
    showShareModal();
  }

  onLoad((options) => {
    getGrouponDetail(options.id);
  });
</script>

<style lang="scss" scoped>
  .recharge-box {
    position: relative;
    margin-bottom: 120rpx;
    background: v-bind(headerBg) center/750rpx 100%
        no-repeat,
      linear-gradient(115deg, #f44739 0%, #ff6600 100%);
    border-radius: 0 0 5% 5%;
    height: 100rpx;

    .goods-box {
      width: 710rpx;
      border-radius: 20rpx;
      position: absolute;
      left: 20rpx;
      box-sizing: border-box;
    }

    .sales-title {
      height: 32rpx;
      background: rgba(#ffe0e2, 0.29);
      border-radius: 16rpx;
      font-size: 24rpx;
      font-weight: 400;
      padding: 6rpx 20rpx;
      color: #f7979c;
    }

    .num-title {
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
    }
  }

  .countdown-time {
    font-size: 26rpx;
    font-weight: 500;
    color: #383a46;
    .countdown-h {
      font-size: 24rpx;
      font-family: OPPOSANS;
      font-weight: 500;
      color: #ffffff;
      padding: 0 4rpx;
      margin-left: 16rpx;
      height: 40rpx;
      background: linear-gradient(90deg, #ff6000 0%, #fe832a 100%);
      border-radius: 6rpx;
    }
    .countdown-num {
      font-size: 24rpx;
      font-family: OPPOSANS;
      font-weight: 500;
      color: #ffffff;
      width: 40rpx;
      height: 40rpx;
      background: linear-gradient(90deg, #ff6000 0%, #fe832a 100%);
      border-radius: 6rpx;
    }
  }

  .countdown-box {
    // height: 364rpx;
    background: #ffffff;
    border-radius: 10rpx;
    box-sizing: border-box;

    .countdown-title {
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;

      .cicon-check-round {
        color: #42b111;
        margin-right: 24rpx;
      }

      .cicon-info {
        color: #d71e08;
        margin-right: 24rpx;
      }

      .num {
        color: #ff6000;
      }
    }

    .header-avatar {
      width: 86rpx;
      height: 86rpx;
      background: #ececec;
      border-radius: 50%;
      border: 4rpx solid #edc36c;
      position: relative;
      box-sizing: border-box;

      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      .header-tag {
        width: 72rpx;
        height: 36rpx;
        font-size: 24rpx;
        line-height: nor;
        background: linear-gradient(132deg, #f3dfb1, #f3dfb1, #ecbe60);
        border-radius: 16rpx;
        position: absolute;
        left: 4rpx;
        top: -36rpx;
      }
    }
    .default-avatar {
      width: 86rpx;
      height: 86rpx;
      background: #ececec;
      border-radius: 50%;
      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .user-avatar {
      width: 86rpx;
      height: 86rpx;
      background: #ececec;
      border-radius: 50%;
    }
  }
  .order-btn {
    width: 668rpx;
    height: 70rpx;
    border: 2rpx solid #dfdfdf;
    border-radius: 35rpx;
    color: #999999;
    font-weight: 500;
    font-size: 26rpx;
    line-height: normal;
  }

  .disabled-btn {
    width: 668rpx;
    height: 70rpx;
    background: #dddddd;
    border-radius: 35rpx;
    color: #999999;
    font-weight: 500;
    font-size: 28rpx;
    line-height: normal;
  }

  .join-btn {
    width: 668rpx;
    height: 70rpx;
    background: linear-gradient(90deg, #ff6000 0%, #fe832a 100%);
    box-shadow: 0px 8rpx 6rpx 0px rgba(255, 104, 4, 0.22);
    border-radius: 35rpx;
    color: #fff;
    font-weight: 500;
    font-size: 28rpx;
    line-height: normal;
  }

  .detail-cell-wrap {
    width: 100%;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    border-top: 2rpx solid #dfdfdf;
    background-color: #fff;
    // min-height: 60rpx;

    .label-text {
      font-size: 28rpx;
      font-weight: 400;
    }

    .cell-content {
      font-size: 28rpx;
      font-weight: 500;
      color: $dark-6;
    }

    .right-forwrad-icon {
      font-size: 28rpx;
      font-weight: 500;
      color: $dark-9;
    }
  }
</style>
