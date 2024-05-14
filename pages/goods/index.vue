<template>
	<view>
		<s-layout :onShareAppMessage="shareInfo" navbar="goods">
			<!-- 标题栏 -->
			<detailNavbar />

			<!-- 骨架屏 -->
			<detailSkeleton v-if="state.skeletonLoading" />
			<!-- 下架/售罄提醒 -->
			<s-empty v-else-if="state.goodsInfo === null" text="商品不存在或已下架" icon="/static/soldout-empty.png" showAction
               actionText="再逛逛" actionUrl="/pages/goods/list" />
			<block v-else>
				<view class="detail-swiper-selector">
					<!-- 商品轮播图  -->
					<su-swiper class="ss-m-b-14" isPreview :list="formatGoodsSwiper(state.goodsInfo.sliderPicUrls)"
                     otStyle="tag" imageMode="widthFix" dotCur="bg-mask-40" :seizeHeight="750" />

					<!-- 价格+标题 -->
					<view class="title-card detail-card ss-p-y-40 ss-p-x-20">
						<view class="ss-flex ss-row-between ss-col-center ss-m-b-26">
							<view class="price-box ss-flex ss-col-bottom">
								<view class="price-text ss-m-r-16">
									{{ fen2yuan(state.selectedSku.price || state.goodsInfo.price) }}
								</view>
								<view class="origin-price-text" v-if="state.goodsInfo.marketPrice > 0">
									{{ fen2yuan(state.selectedSku.marketPrice || state.goodsInfo.marketPrice) }}
								</view>
							</view>
							<view class="sales-text">
								{{ formatSales('exact', state.goodsInfo.salesCount) }}
							</view>
						</view>
						<view class="discounts-box ss-flex ss-row-between ss-m-b-28">
							<!-- 满减送/限时折扣活动的提示 -->
							<div class="tag-content">
								<view class="tag-box ss-flex">
									<view class="tag ss-m-r-10" v-for="promos in state.activityInfo"
                        :key="promos.id" @tap="onActivity">
										{{ promos.name }}
									</view>
								</view>
							</div>

							<!-- 优惠劵 -->
							<view class="get-coupon-box ss-flex ss-col-center ss-m-l-20" @tap="state.showModel = true"
								v-if="state.couponInfo.length">
								<view class="discounts-title ss-m-r-8">领券</view>
								<text class="cicon-forward"></text>
							</view>
						</view>
						<view class="title-text ss-line-2 ss-m-b-6">{{ state.goodsInfo.name }}</view>
						<view class="subtitle-text ss-line-1">{{ state.goodsInfo.introduction }}</view>
					</view>

					<!-- 功能卡片 -->
					<view class="detail-cell-card detail-card ss-flex-col">
						<detail-cell-sku v-model="state.selectedSku.goods_sku_text" :sku="state.selectedSku"
                             @tap="state.showSelectSku = true" />
					</view>

					<!-- 规格与数量弹框 -->
					<s-select-sku :goodsInfo="state.goodsInfo" :show="state.showSelectSku" @addCart="onAddCart"
                        @buy="onBuy" @change="onSkuChange" @close="state.showSelectSku = false" />
				</view>

				<!-- 评价 -->
				<detail-comment-card class="detail-comment-selector" :goodsId="state.goodsId" />
				<!-- 详情 -->
				<detail-content-card class="detail-content-selector" :content="state.goodsInfo.description" />

				<!-- 活动跳转：拼团/秒杀/砍价活动 -->
				<detail-activity-tip v-if="state.activityList.length > 0" :activity-list="state.activityList" />

				<!-- 详情 tabbar -->
				<detail-tabbar v-model="state.goodsInfo">
					<view class="buy-box ss-flex ss-col-center ss-p-r-20" v-if="state.goodsInfo.stock > 0">
						<button class="ss-reset-button add-btn ui-Shadow-Main" @tap="state.showSelectSku = true">
							加入购物车
						</button>
						<button class="ss-reset-button buy-btn ui-Shadow-Main" @tap="state.showSelectSku = true">
							立即购买
						</button>
					</view>
					<view class="buy-box ss-flex ss-col-center ss-p-r-20" v-else>
						<button class="ss-reset-button disabled-btn" disabled> 已售罄 </button>
					</view>
				</detail-tabbar>

				<!-- 优惠劵弹窗 -->
				<s-coupon-get v-model="state.couponInfo" :show="state.showModel" @close="state.showModel = false"
                      @get="onGet" />

				<!-- 满减送/限时折扣活动弹窗 -->
				<s-activity-pop v-model="state.activityInfo" :show="state.showActivityModel"
                        @close="state.showActivityModel = false" />
			</block>
		</s-layout>
	</view>
</template>

<script setup>
	import {
		reactive,
		computed
	} from 'vue';
	import {
		onLoad,
		onPageScroll
	} from '@dcloudio/uni-app';
	import sheep from '@/sheep';
	import CouponApi from '@/sheep/api/promotion/coupon';
	import ActivityApi from '@/sheep/api/promotion/activity';
  import FavoriteApi from '@/sheep/api/product/favorite';
  import { formatSales, formatGoodsSwiper, fen2yuan } from '@/sheep/hooks/useGoods';
	import detailNavbar from './components/detail/detail-navbar.vue';
	import detailCellSku from './components/detail/detail-cell-sku.vue';
	import detailTabbar from './components/detail/detail-tabbar.vue';
	import detailSkeleton from './components/detail/detail-skeleton.vue';
	import detailCommentCard from './components/detail/detail-comment-card.vue';
	import detailContentCard from './components/detail/detail-content-card.vue';
	import detailActivityTip from './components/detail/detail-activity-tip.vue';
	import { isEmpty } from 'lodash';
  import SpuApi from '@/sheep/api/product/spu';

	onPageScroll(() => {});

	const state = reactive({
		goodsId: 0,
		skeletonLoading: true, // SPU 加载中
		goodsInfo: {}, // SPU 信息
		showSelectSku: false, // 是否展示 SKU 选择弹窗
		selectedSku: {}, // 选中的 SKU
		showModel: false, // 是否展示 Coupon 优惠劵的弹窗
		couponInfo: [], // 可领取的 Coupon 优惠劵的列表
		showActivityModel: false, // 【满减送/限时折扣】是否展示 Activity 营销活动的弹窗
		activityInfo: [], // 【满减送/限时折扣】可参与的 Activity 营销活动的列表
		activityList: [], // 【秒杀/拼团/砍价】可参与的 Activity 营销活动的列表
	});

	// 规格变更
	function onSkuChange(e) {
		state.selectedSku = e;
	}

	// 添加购物车
	function onAddCart(e) {
    if (!e.id) {
      sheep.$helper.toast('请选择商品规格');
      return;
    }
		sheep.$store('cart').add(e);
	}

	// 立即购买
	function onBuy(e) {
    if (!state.selectedSku.id) {
      sheep.$helper.toast('请选择商品规格');
      return;
    }
    sheep.$router.go('/pages/order/confirm', {
      data: JSON.stringify({
        items: [{
          skuId: e.id,
          count: e.goods_num
        }],
        // TODO 芋艿：后续清理掉这 2 参数
        deliveryType: 1,
        pointStatus: false,
      }),
    });
	}

	// 营销活动
	function onActivity() {
		state.showActivityModel = true;
	}

	// 立即领取
	async function onGet(id) {
    const { code } = await CouponApi.takeCoupon(id);
    if (code !== 0) {
      return;
    }
    uni.showToast({
      title: '领取成功',
    });
    setTimeout(() => {
      getCoupon();
    }, 1000);
	}

	//  TODO 芋艿：待测试
	const shareInfo = computed(() => {
		if (isEmpty(state.goodsInfo)) return {};
		return sheep.$platform.share.getShareInfo({
			title: state.goodsInfo.name,
			image: sheep.$url.cdn(state.goodsInfo.picUrl),
			desc: state.goodsInfo.introduction,
			params: {
				page: '2',
				query: state.goodsInfo.id,
			},
		}, {
			type: 'goods', // 商品海报
			title: state.goodsInfo.name, // 商品名称
			image: sheep.$url.cdn(state.goodsInfo.picUrl), // 商品主图
			price: fen2yuan(state.goodsInfo.price), // 商品价格
			original_price: fen2yuan(state.goodsInfo.marketPrice), // 商品原价
		});
	});

  async function getCoupon() {
    const { code, data } = await CouponApi.getCouponTemplateList(state.goodsId, 2, 10);
    if (code === 0) {
      state.couponInfo = data;
    }
  }

	onLoad((options) => {
		// 非法参数
		if (!options.id) {
			state.goodsInfo = null;
			return;
		}
		state.goodsId = options.id;
		// 1. 加载商品信息
		SpuApi.getSpuDetail(state.goodsId).then((res) => {
			// 未找到商品
			if (res.code !== 0 || !res.data) {
				state.goodsInfo = null;
				return;
			}
			// 加载到商品
			state.skeletonLoading = false;
			state.goodsInfo = res.data;

      // 加载是否收藏
      FavoriteApi.isFavoriteExists(state.goodsId, 'goods').then((res) => {
        if (res.code !== 0) {
          return;
        }
        state.goodsInfo.favorite = res.data;
      });
		});

		// 2. 加载优惠劵信息
    getCoupon();

		// 3. 加载营销活动信息
		ActivityApi.getActivityListBySpuId(state.goodsId).then((res) => {
			if (res.code !== 0) {
				return;
			}
      res.data.forEach(activity => {
        if ([1, 2, 3].includes(activity.type)) { // 情况一：拼团/秒杀/砍价
          state.activityList.push(activity);
        } else if (activity.type === 5) { // 情况二：满减送
          state.activityInfo.push(activity);
        } else { // 情况三：限时折扣 TODO 芋艿
          console.log('待实现！优先级不高');
        }
      })
		});
	});
</script>

<style lang="scss" scoped>
	.detail-card {
		background-color: #ffff;
		margin: 14rpx 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	// 价格标题卡片
	.title-card {
		.price-box {
			.price-text {
				font-size: 42rpx;
				font-weight: 500;
				color: #ff3000;
				line-height: 30rpx;
				font-family: OPPOSANS;

				&::before {
					content: '￥';
					font-size: 30rpx;
				}
			}

			.origin-price-text {
				font-size: 26rpx;
				font-weight: 400;
				text-decoration: line-through;
				color: $gray-c;
				font-family: OPPOSANS;

				&::before {
					content: '￥';
				}
			}
		}

		.sales-text {
			font-size: 26rpx;
			font-weight: 500;
			color: $gray-c;
		}

		.discounts-box {
			.tag-content {
				flex: 1;
				min-width: 0;
				white-space: nowrap;
			}

			.tag-box {
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.tag {
				flex-shrink: 0;
				padding: 4rpx 10rpx;
				font-size: 24rpx;
				font-weight: 500;
				border-radius: 4rpx;
				color: var(--ui-BG-Main);
				background: var(--ui-BG-Main-tag);
			}

			.discounts-title {
				font-size: 24rpx;
				font-weight: 500;
				color: var(--ui-BG-Main);
				line-height: normal;
			}

			.cicon-forward {
				color: var(--ui-BG-Main);
				font-size: 24rpx;
				line-height: normal;
				margin-top: 4rpx;
			}
		}

		.title-text {
			font-size: 30rpx;
			font-weight: bold;
			line-height: 42rpx;
		}

		.subtitle-text {
			font-size: 26rpx;
			font-weight: 400;
			color: $dark-9;
			line-height: 42rpx;
		}
	}

	// 购买
	.buy-box {
		.add-btn {
			width: 214rpx;
			height: 72rpx;
			font-weight: 500;
			font-size: 28rpx;
			border-radius: 40rpx 0 0 40rpx;
			background-color: var(--ui-BG-Main-light);
			color: var(--ui-BG-Main);
		}

		.buy-btn {
			width: 214rpx;
			height: 72rpx;
			font-weight: 500;
			font-size: 28rpx;

			border-radius: 0 40rpx 40rpx 0;
			background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
			color: $white;
		}

		.disabled-btn {
			width: 428rpx;
			height: 72rpx;
			border-radius: 40rpx;
			background: #999999;
			color: $white;
		}
	}

	.model-box {
		height: 60vh;

		.model-content {
			height: 56vh;
		}

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
		}

		.subtitle {
			font-size: 26rpx;
			font-weight: 500;
			color: #333333;
		}
	}
</style>
