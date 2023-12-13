<!-- 订单列表 -->
<template>
	<s-layout title="我的订单">
		<su-sticky bgColor="#fff">
			<su-tabs :list="tabMaps" :scrollable="false" @change="onTabsChange" :current="state.currentTab" />
		</su-sticky>
		<s-empty v-if="state.pagination.total === 0" icon="/static/order-empty.png" text="暂无订单" />
		<view v-if="state.pagination.total > 0">
			<view class="bg-white order-list-card-box ss-r-10 ss-m-t-14 ss-m-20" v-for="order in state.pagination.data"
            :key="order.id" @tap="onOrderDetail(order.id)">
				<view class="order-card-header ss-flex ss-col-center ss-row-between ss-p-x-20">
					<view class="order-no">订单号：{{ order.no }}</view>
					<view class="order-state ss-font-26" :class="formatOrderColor(order)">
            {{ formatOrderStatus(order) }}
          </view>
				</view>
				<view class="border-bottom" v-for="item in order.items" :key="item.id">
					<s-goods-item
            :img="item.picUrl"
            :title="item.spuName"
						:skuText="item.properties.map((property) => property.valueName).join(' ')"
						:price="item.price"
            :num="item.count"
          />
				</view>
				<view class="pay-box ss-m-t-30 ss-flex ss-row-right ss-p-r-20">
					<view class="ss-flex ss-col-center">
						<view class="discounts-title pay-color">共 {{ order.productCount }} 件商品,总金额:</view>
						<view class="discounts-money pay-color">
							￥{{ fen2yuan(order.payPrice) }}
            </view>
					</view>
				</view>
				<view class="order-card-footer ss-flex ss-col-center ss-p-x-20"
              :class="order.buttons.length > 3 ? 'ss-row-between' : 'ss-row-right'">
					<view class="ss-flex ss-col-center">
            <!-- TODO 芋艿：再次购买 -->
						<button v-if="order.buttons.includes('combination')" class="tool-btn ss-reset-button"
							@tap.stop="onOrderGroupon(order)">
              拼团详情
						</button>
						<button v-if="order.buttons.length === 0" class="tool-btn ss-reset-button"
                    @tap.stop="onOrderDetail(order.id)">
              查看详情
						</button>
						<button v-if="order.buttons.includes('confirm')" class="tool-btn ss-reset-button"
                    @tap.stop="onConfirm(order)">
              确认收货
						</button>
						<button v-if="order.buttons.includes('express')" class="tool-btn ss-reset-button"
                    @tap.stop="onExpress(order.id)">
							查看物流
						</button>
						<button v-if="order.buttons.includes('cancel')" class="tool-btn ss-reset-button"
                    @tap.stop="onCancel(order.id)">
							取消订单
						</button>
						<button v-if="order.buttons.includes('comment')" class="tool-btn ss-reset-button"
                    @tap.stop="onComment(order.order_sn)">
							评价
						</button>
						<button v-if="order.buttons.includes('delete')" class="delete-btn ss-reset-button"
                    @tap.stop="onDelete(order.id)">
							删除订单
						</button>
						<button v-if="order.buttons.includes('pay')" class="tool-btn ss-reset-button ui-BG-Main-Gradient"
                    @tap.stop="onPay(order.order_sn)">
							继续支付
						</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 加载更多 -->
		<uni-load-more v-if="state.pagination.total > 0" :status="state.loadStatus" :content-text="{
        contentdown: '上拉加载更多',
      }" @tap="loadmore" />
	</s-layout>
</template>

<script setup>
	import {
		computed,
		reactive
	} from 'vue';
	import {
		onLoad,
		onReachBottom,
		onPullDownRefresh
	} from '@dcloudio/uni-app';
  import {
    fen2yuan,
    formatOrderColor, formatOrderStatus, handleOrderButtons,
  } from '@/sheep/hooks/useGoods';
	import sheep from '@/sheep';
	import _ from 'lodash';
	import {
		isEmpty
	} from 'lodash';

	const pagination = {
		data: [],
		current_page: 1,
		total: 1
	};

	// 数据
	const state = reactive({
		currentTab: 0, // 选中的 tabMaps 下标
		pagination: {
			data: [],
			current_page: 1,
			total: 1
		},
		loadStatus: '',
		deleteOrderId: 0,
		error: 0,
	});

	const tabMaps = [{
			name: '全部'
		},
		{
			name: '待付款',
			value: 0,
		},
		{
			name: '待发货',
			value: 10,
		},
		{
			name: '待收货',
			value: 20,
		},
		{
			name: '待评价',
			value: 30,
		},
	];

	// 切换选项卡
	function onTabsChange(e) {
		if (state.currentTab === e.index) return;

		state.pagination = pagination;
		state.currentTab = e.index;

		getOrderList();
	}

	// 订单详情
	function onOrderDetail(id) {
		sheep.$router.go('/pages/order/detail', {
			id,
		});
	}

	// 分享拼团 TODO 芋艿：待测试
	function onOrderGroupon(order) {
		sheep.$router.go('/pages/activity/groupon/detail', {
			id: order.ext.groupon_id,
		});
	}

	// 继续支付 TODO 芋艿：待测试
	function onPay(orderSN) {
		sheep.$router.go('/pages/pay/index', {
			orderSN,
		});
	}

	// 评价 TODO 芋艿：待测试
	function onComment(orderSN) {
		sheep.$router.go('/pages/goods/comment/add', {
			orderSN,
		});
	}

	// 确认收货 TODO 芋艿：待测试
	async function onConfirm(order, ignore = false) {
		// 需开启确认收货组件
		// todo: 芋艿：需要后续接入微信收货组件
		// 1.怎么检测是否开启了发货组件功能？如果没有开启的话就不能在这里return出去
		// 2.如果开启了走mpConfirm方法,需要在App.vue的show方法中拿到确认收货结果
		let isOpenBusinessView = true;
		if (
			sheep.$platform.name === 'WechatMiniProgram' &&
			!isEmpty(order.wechat_extra_data) &&
			isOpenBusinessView &&
			!ignore
		) {
			mpConfirm(order);
			return;
		}

		// 正常的确认收货流程
		const {
			error
		} = await sheep.$api.order.confirm(order.id);
		if (error === 0) {
			state.pagination = pagination;
			await getOrderList();
		}
	}

	// #ifdef MP-WEIXIN
	// 小程序确认收货组件
	function mpConfirm(order) {
		if (!wx.openBusinessView) {
			sheep.$helper.toast(`请升级微信版本`);
			return;
		}
		wx.openBusinessView({
			businessType: 'weappOrderConfirm',
			extraData: {
				merchant_id: '1481069012',
				merchant_trade_no: order.wechat_extra_data.merchant_trade_no,
				transaction_id: order.wechat_extra_data.transaction_id,
			},
			success(response) {
				console.log('success:', response);
				if (response.errMsg === 'openBusinessView:ok') {
					if (response.extraData.status === 'success') {
						onConfirm(order, true);
					}
				}
			},
			fail(error) {
				console.log('error:', error);
			},
			complete(result) {
				console.log('result:', result);
			},
		});
	}
	// #endif

	// 查看物流 TODO 芋艿：待测试
	async function onExpress(orderId) {
		sheep.$router.go('/pages/order/express/list', {
			orderId,
		});
	}

	// 取消订单 TODO 芋艿：待测试
	async function onCancel(orderId) {
		uni.showModal({
			title: '提示',
			content: '确定要取消订单吗?',
			success: async function(res) {
				if (res.confirm) {
					const {
						error,
						data
					} = await sheep.$api.order.cancel(orderId);
					if (error === 0) {
						let index = state.pagination.data.findIndex((order) => order.id === orderId);
						state.pagination.data[index] = data;
					}
				}
			},
		});
	}

	// 删除订单 TODO 芋艿：待测试
	function onDelete(orderId) {
		uni.showModal({
			title: '提示',
			content: '确定要删除订单吗?',
			success: async function(res) {
				if (res.confirm) {
					const {
						error,
						data
					} = await sheep.$api.order.delete(orderId);
					if (error === 0) {
						let index = state.pagination.data.findIndex((order) => order.id === orderId);
						state.pagination.data.splice(index, 1);
					}
				}
			},
		});
	}

	// 获取订单列表 TODO 芋艿：待测试
	async function getOrderList(page = 1, list_rows = 5) {
		state.loadStatus = 'loading';
		let res = await sheep.$api.order.list({
			status: tabMaps[state.currentTab].value,
			pageSize: list_rows,
			pageNo: page,
			commentStatus: tabMaps[state.currentTab].value == 30 ? false : null
		});
		state.error = res.code;
		if (res.code === 0) {
      res.data.list.forEach(order => handleOrderButtons(order));
			let orderList = _.concat(state.pagination.data, res.data.list);
			state.pagination = {
				...res.data,
				data: orderList,
			};
			console.log(state.pagination)
			if (state.pagination.data.length < state.pagination.total) {
				state.loadStatus = 'more';
			} else {
				state.loadStatus = 'noMore';
			}
		}
	}

	onLoad(async (options) => {
		if (options.type) {
			state.currentTab = options.type;
		}
		getOrderList();
	});

	// 加载更多
	function loadmore() {
		if (state.loadStatus !== 'noMore') {
			getOrderList(parseInt((state.pagination.data.length / 5) + 1));
		}
	}

	// 上拉加载更多
	onReachBottom(() => {
		loadmore();
	});

	// 下拉刷新
	onPullDownRefresh(() => {
		state.pagination = pagination;
		getOrderList();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 800);
	});
</script>

<style lang="scss" scoped>
	.score-img {
		width: 36rpx;
		height: 36rpx;
		margin: 0 4rpx;
	}

	.tool-btn {
		width: 160rpx;
		height: 60rpx;
		background: #f6f6f6;
		font-size: 26rpx;
		border-radius: 30rpx;
		margin-right: 10rpx;

		&:last-of-type {
			margin-right: 0;
		}
	}

	.delete-btn {
		width: 160rpx;
		height: 56rpx;
		color: #ff3000;
		background: #fee;
		border-radius: 28rpx;
		font-size: 26rpx;
		margin-right: 10rpx;
		line-height: normal;

		&:last-of-type {
			margin-right: 0;
		}
	}

	.apply-btn {
		width: 140rpx;
		height: 50rpx;
		border-radius: 25rpx;
		font-size: 24rpx;
		border: 2rpx solid #dcdcdc;
		line-height: normal;
		margin-left: 16rpx;
	}

	.swiper-box {
		flex: 1;

		.swiper-item {
			height: 100%;
			width: 100%;
		}
	}

	.order-list-card-box {
		.order-card-header {
			height: 80rpx;

			.order-no {
				font-size: 26rpx;
				font-weight: 500;
			}

			.order-state {}
		}

		.pay-box {
			.discounts-title {
				font-size: 24rpx;
				line-height: normal;
				color: #999999;
			}

			.discounts-money {
				font-size: 24rpx;
				line-height: normal;
				color: #999;
				font-family: OPPOSANS;
			}

			.pay-color {
				color: #333;
			}
		}

		.order-card-footer {
			height: 100rpx;

			.more-item-box {
				padding: 20rpx;

				.more-item {
					height: 60rpx;

					.title {
						font-size: 26rpx;
					}
				}
			}

			.more-btn {
				color: $dark-9;
				font-size: 24rpx;
			}

			.content {
				width: 154rpx;
				color: #333333;
				font-size: 26rpx;
				font-weight: 500;
			}
		}
	}

	:deep(.uni-tooltip-popup) {
		background: var(--ui-BG);
	}

	.warning-color {
		color: #faad14;
	}

	.danger-color {
		color: #ff3000;
	}

	.success-color {
		color: #52c41a;
	}

	.info-color {
		color: #999999;
	}
</style>