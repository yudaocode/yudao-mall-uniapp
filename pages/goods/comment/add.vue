<!-- 评价  -->
<template>
  <s-layout title="评价">
    <view>
      <view v-for="(item, index) in state.orderInfo.items" :key="item.id">
        <view v-if="item.btns.includes('comment')">
          <view class="commont-from-wrap">
            <!-- 评价商品 -->
            <s-goods-item
              :img="item.goods_image"
              :title="item.goods_title"
              :skuText="item.goods_sku_text"
              :price="item.goods_price"
              :num="item.goods_num"
            ></s-goods-item>
          </view>

          <view class="form-item">
            <!-- 评分 -->
            <view class="star-box ss-flex ss-col-center">
              <view class="star-title ss-m-r-40">
                {{ rateMap[state.commentList[index].level] }}
              </view>
              <uni-rate v-model="state.commentList[index].level" />
            </view>
            <!-- 评价 -->
            <view class="area-box">
              <uni-easyinput
                :inputBorder="false"
                type="textarea"
                maxlength="120"
                autoHeight
                v-model="state.commentList[index].content"
                placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧~"
              ></uni-easyinput>

              <view class="img-box">
                <s-uploader
                  v-model:url="state.commentList[index].images"
                  fileMediatype="image"
                  limit="9"
                  mode="grid"
                  :imageStyles="{ width: '168rpx', height: '168rpx' }"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <su-fixed bottom placeholder>
      <view class="foot_box ss-flex ss-row-center ss-col-center">
        <button class="ss-reset-button post-btn ui-BG-Main-Gradient ui-Shadow-Main" @tap="onSubmit">
          发布
        </button>
      </view>
    </su-fixed>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';

  const state = reactive({
    orderInfo: {},
    commentList: [],
  });

  const rateMap = {
    1: '糟糕',
    2: '差评',
    3: '一般',
    4: '良好',
    5: '好评',
  };

  async function onSubmit() {
    const { error } = await sheep.$api.order.comment(state.orderInfo.id, {
      comments: state.commentList,
    });
    if (error === 0) {
      sheep.$router.back();
    }
  }

  onLoad(async (options) => {
    let id = '';
    if (options.orderSN) {
      id = options.orderSN;
    }
    if (options.id) {
      id = options.id;
    }

    const { data, error } = await sheep.$api.order.detail(id);
    if (error === 0) {
      if (data.btns.includes('comment')) {
        state.orderInfo = data;
        state.orderInfo.items.forEach((item) => {
          if (item.btns.includes('comment')) {
            state.commentList.push({
              item_id: item.id,
              level: 5,
              content: '',
              images: [],
            });
          }
        });
        return;
      }
    }
    sheep.$helper.toast('无待评价订单');
  });
</script>

<style lang="scss" scoped>
  // 评价商品
  .goods-card {
    margin: 10rpx 0;
    padding: 20rpx;
    background: #fff;
  }

  // 评论，选择图片
  .form-item {
    background: #fff;
    .star-box {
      height: 100rpx;
      padding: 0 25rpx;
    }
    .star-title {
      font-weight: 600;
    }
  }
  .area-box {
    width: 690rpx;
    min-height: 306rpx;
    background: rgba(249, 250, 251, 1);
    border-radius: 20rpx;
    padding: 28rpx;
    margin: auto;

    .img-box {
      margin-top: 20rpx;
    }
  }
  .post-btn {
    width: 690rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
    color: rgba(#fff, 0.9);
    margin-bottom: 20rpx;
  }
</style>
