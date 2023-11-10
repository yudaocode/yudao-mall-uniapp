<!-- 页面 -->
<template>
	<s-layout title="我的订单">
		<su-sticky bgColor="#fff">
			<su-tabs :list="tabMaps" :scrollable="false" @change="onTabsChange" :current="state.currentTab"></su-tabs>
		</su-sticky>
		<s-empty v-if="state.pagination.total === 0" icon="/static/order-empty.png" text="暂无订单"></s-empty>
		<view v-if="state.pagination.total > 0">
			<view class="bg-white order-list-card-box ss-r-10 ss-m-t-14 ss-m-20" v-for="order in state.pagination.data"
				:key="order.id" @tap="onOrderDetail(order.no)">
				<view class="order-card-header ss-flex ss-col-center ss-row-between ss-p-x-20">
					<view class="order-no">订单号：{{ order.no }}</view>
					<view class="order-state ss-font-26" :class="formatOrderColor(order.status_code)">{{
            order.status
          }}</view>
				</view>
				<view class="border-bottom" v-for="item in order.items" :key="item.id">
					<s-goods-item :img="item.picUrl" :title="item.spuName" :skuText="item.properties.length>1? item.properties.reduce((items2,items)=>items2.valueName+' '+items.valueName):item.properties[0].valueName"
						:price="item.price/100" :score="order.score_amount" :num="item.count">
						<template #tool>
							<view class="ss-flex">
								<!-- <button class="ss-reset-button apply-btn" v-if="item.btns.includes('aftersale')"
									@tap.stop="
                    sheep.$router.go('/pages/order/aftersale/apply', {
                      item: JSON.stringify(item),
                    })
                  ">
									申请售后
								</button>
								<button class="ss-reset-button apply-btn" v-if="item.btns.includes('re_aftersale')"
									@tap.stop="
                    sheep.$router.go('/pages/order/aftersale/apply', {
                      item: JSON.stringify(item),
                    })
                  ">
									重新售后
								</button>

								<button class="ss-reset-button apply-btn" v-if="item.btns.includes('aftersale_info')"
									@tap.stop="
                    sheep.$router.go('/pages/order/aftersale/detail', {
                      id: item.ext.aftersale_id,
                    })
                  ">
									售后详情
								</button>
								<button class="ss-reset-button apply-btn" v-if="item.btns.includes('buy_again')"
									@tap.stop="
                    sheep.$router.go('/pages/goods/index', {
                      id: item.goods_id,
                    })
                  ">
									再次购买
								</button> -->
							</view>
						</template>
					</s-goods-item>
				</view>
				<view class="pay-box ss-m-t-30 ss-flex ss-row-right ss-p-r-20">
					<!-- <view v-if="order.total_discount_fee > 0" class="ss-flex ss-col-center ss-m-r-8">
						<view class="discounts-title">优惠:￥</view>
						<view class="discounts-money">{{ order.total_discount_fee }}</view>
					</view> -->
				<!-- 	<view class="ss-flex ss-col-center ss-m-r-8">
						<view class="discounts-title">运费:￥</view>
						<view class="discounts-money">{{ order.dispatch_amount }}</view>
					</view> -->
					<view class="ss-flex ss-col-center">
						<view class="discounts-title pay-color">共{{count}}件商品,总金额:</view>
						<view class="discounts-money pay-color" v-if="Number(order.payPrice) > 0">
							￥{{ order.payPrice/100 }}</view>
						<view v-if="order.score_amount && Number(order.payPrice) > 0">+</view>
						<view class="discounts-money pay-color ss-flex ss-col-center" v-if="order.score_amount">
							<image :src="sheep.$url.static('/static/img/shop/goods/score1.svg')" class="score-img">
							</image>
							<view>{{ order.score_amount }}</view>
						</view>
					</view>
				</view>
				<!-- :class="order.btns.length > 3 ? 'ss-row-between' : 'ss-row-right'" -->
				<view class="order-card-footer ss-flex ss-col-center ss-p-x-20">
					<!-- <su-popover>
            <button class="more-btn ss-reset-button" @click.stop>更多</button>
            <template #content>
              <view class="more-item-box">
                <view class="more-item ss-flex ss-col-center ss-reset-button">
                  <view class="item-title">删除订单</view>
                </view>
                <view class="more-item ss-flex ss-col-center ss-reset-button">
                  <view class="item-title">查看发票</view>
                </view>
                <view class="more-item ss-flex ss-col-center ss-reset-button">
                  <view class="item-title">评价晒单</view>
                </view>
              </view>
            </template>
          </su-popover> -->
					<view class="ss-flex ss-col-center">
		<!-- 				<button v-if="order.btns.includes('groupon')" class="tool-btn ss-reset-button"
							@tap.stop="onOrderGroupon(order)">
							{{ order.status_code === 'groupon_ing' ? '邀请拼团' : '拼团详情' }}
						</button>
						<button v-if="order.btns.includes('invoice')" class="tool-btn ss-reset-button"
							@tap.stop="onOrderInvoice(order.invoice?.id)">
							查看发票
						</button>
						<button v-if="order.btns.length === 0" class="tool-btn ss-reset-button"
							@tap.stop="onOrderDetail(order.order_sn)">
							查看详情
						</button>

						<button v-if="order.btns.includes('confirm')" class="tool-btn ss-reset-button"
							@tap.stop="onConfirm(order)">
							确认收货
						</button>

						<button v-if="order.btns.includes('express')" class="tool-btn ss-reset-button"
							@tap.stop="onExpress(order.id)">
							查看物流
						</button>

						<button v-if="order.btns.includes('apply_refund')" class="tool-btn ss-reset-button"
							@tap.stop="onRefund(order.id)">
							申请退款
						</button>
						<button v-if="order.btns.includes('re_apply_refund')" class="tool-btn ss-reset-button"
							@tap.stop="onRefund(order.id)">
							重新退款
						</button>

						<button v-if="order.btns.includes('cancel')" class="tool-btn ss-reset-button"
							@tap.stop="onCancel(order.id)">
							取消订单
						</button>

						<button v-if="order.btns.includes('comment')" class="tool-btn ss-reset-button"
							@tap.stop="onComment(order.order_sn)">
							评价晒单
						</button>

						<button v-if="order.btns.includes('delete')" class="delete-btn ss-reset-button"
							@tap.stop="onDelete(order.id)">
							删除订单
						</button>

						<button v-if="order.btns.includes('pay')" class="tool-btn ss-reset-button ui-BG-Main-Gradient"
							@tap.stop="onPay(order.order_sn)">
							继续支付
						</button> -->
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
		formatOrderColor
	} from '@/sheep/hooks/useGoods';
	import sheep from '@/sheep';
	import _ from 'lodash';
	import {
		isEmpty
	} from 'lodash';

	const pagination = {
		data: [],
		current_page: 1,
		total: 1,
		last_page: 1,
	};
	// 数据
	const state = reactive({
		currentTab: 0,
		pagination: {
			data: [],
			current_page: 1,
			total: 1,
			last_page: 1,
		},
		loadStatus: '',
		deleteOrderId: 0,
		error: 0,
	});

	const tabMaps = [{
			name: '全部',
			// value: 'all',
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
	function onOrderDetail(orderSN) {
		sheep.$router.go('/pages/order/detail', {
			orderSN,
		});
	}

	// 分享拼团
	function onOrderGroupon(order) {
		sheep.$router.go('/pages/activity/groupon/detail', {
			id: order.ext.groupon_id,
		});
	}

	// 查看发票
	function onOrderInvoice(invoiceId) {
		sheep.$router.go('/pages/order/invoice', {
			invoiceId,
		});
	}

	// 继续支付
	function onPay(orderSN) {
		sheep.$router.go('/pages/pay/index', {
			orderSN,
		});
	}

	// 评价
	function onComment(orderSN) {
		sheep.$router.go('/pages/goods/comment/add', {
			orderSN,
		});
	}

	// 确认收货
	async function onConfirm(order, ignore = false) {
		// 需开启确认收货组件
		// todo:
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
			getOrderList();
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

	// 查看物流
	async function onExpress(orderId) {
		sheep.$router.go('/pages/order/express/list', {
			orderId,
		});
	}

	// 取消订单
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

	// 删除订单
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

	// 申请退款
	async function onRefund(orderId) {
		uni.showModal({
			title: '提示',
			content: '确定要申请退款吗?',
			success: async function(res) {
				if (res.confirm) {
					// #ifdef MP
					sheep.$platform.useProvider('wechat').subscribeMessage('order_refund');
					// #endif
					const {
						error,
						data
					} = await sheep.$api.order.applyRefund(orderId);
					if (error === 0) {
						let index = state.pagination.data.findIndex((order) => order.id === orderId);
						state.pagination.data[index] = data;
					}
				}
			},
		});
	}

	// 获取订单列表
	async function getOrderList(page = 1, list_rows = 5) {
		state.loadStatus = 'loading';
		let res = await sheep.$api.order.list({
			status: tabMaps[state.currentTab].value,
			pageSize: list_rows,
			pageNo: page,
			commentStatus: tabMaps[state.currentTab].value==30?false:null
		});
		state.error = res.code;
		if (res.code === 0) {
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
			getOrderList(parseInt((state.pagination.data.length/5)+1));
		}
	}

	// 上拉加载更多
	onReachBottom(() => {
		loadmore();
	});

	//下拉刷新
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