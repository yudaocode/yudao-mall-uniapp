<!-- 订单详情 -->
<template>
	<s-layout title="订单详情" class="index-wrap" navbar="inner">
		<!-- 订单状态 -->
		<view class="state-box ss-flex-col ss-col-center ss-row-right" :style="[
        {
          marginTop: '-' + Number(statusBarHeight + 88) + 'rpx',
          paddingTop: Number(statusBarHeight + 88) + 'rpx',
        },
      ]">
			<view class="ss-flex ss-m-t-32 ss-m-b-20">
				<image v-if="
            state.orderInfo.status_code == 'unpaid' ||
            state.orderInfo.status_code == 'nosend' ||
            state.orderInfo.status_code == 'nocomment'
          " class="state-img" :src="sheep.$url.static('/static/img/shop/order/order_loading.png')">
				</image>
				<image v-if="
            state.orderInfo.status_code == 'completed' ||
            state.orderInfo.status_code == 'refund_agree'
          " class="state-img" :src="sheep.$url.static('/static/img/shop/order/order_success.png')">
				</image>
				<image v-if="state.orderInfo.status_code == 'cancel' || state.orderInfo.status_code == 'closed'"
					class="state-img" :src="sheep.$url.static('/static/img/shop/order/order_close.png')">
				</image>
				<image v-if="state.orderInfo.status_code == 'noget'" class="state-img"
					:src="sheep.$url.static('/static/img/shop/order/order_express.png')">
				</image>
				<view class="ss-font-30">{{ state.orderInfo.status_text }}</view>
			</view>
			<view class="ss-font-26 ss-m-x-20 ss-m-b-70">{{ state.orderInfo.status_desc }}</view>
		</view>

		<!-- 收货地址 -->
		<view class="order-address-box" v-if="state.orderInfo.address">
			<view class="ss-flex ss-col-center">
				<text class="address-username">
					{{ state.orderInfo.address.consignee }}
				</text>
				<text class="address-phone">{{ state.orderInfo.address.mobile }}</text>
			</view>
			<view class="address-detail">{{ addressText }}</view>
		</view>

		<view class="detail-goods" :style="[{ marginTop: state.orderInfo.address ? '0' : '-40rpx' }]">
			<!-- 订单信息 -->
			<view class="order-list" v-for="item in state.orderInfo.items" :key="item.goods_id">
				<view class="order-card">
					<s-goods-item @tap="onGoodsDetail(item.goods_id)" :img="item.goods_image" :title="item.goods_title"
						:skuText="item.goods_sku_text" :price="item.goods_price" :score="state.orderInfo.score_amount"
						:num="item.goods_num">
						<!-- 						<template #top>
							<view class="order-item ss-flex ss-col-center ss-row-between ss-p-x-20 bg-white">
								<view class="item-title">配送方式</view>
								<view class="ss-flex ss-col-center">
									<text class="item-value ss-m-r-20">{{ item.dispatch_type_text }}</text>
									<button class="ss-reset-button copy-btn" @tap="onDetail(item)" v-if="
                      (item.dispatch_type === 'autosend' || item.dispatch_type === 'custom') &&
                      item.dispatch_status !== 0
                    ">详情</button>
								</view>
							</view>
						</template>
						<template #tool>
							<view class="ss-flex">
								<button class="ss-reset-button apply-btn" v-if="item.btns.includes('aftersale')"
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
								</button>
							</view>
						</template>
						<template #priceSuffix>
							<button class="ss-reset-button tag-btn" v-if="item.status_text">
								{{ item.status_text }}
							</button>
						</template> -->
					</s-goods-item>
				</view>
			</view>
		</view>
		<!-- 订单信息  -->
		<view class="notice-box">
			<view class="notice-box__content">
				<view class="notice-item--center">
					<view class="ss-flex ss-flex-1">
						<text class="title">订单编号：</text>
						<text class="detail">{{ state.orderInfo.order_sn }}</text>
					</view>
					<button class="ss-reset-button copy-btn" @tap="onCopy">复制</button>
				</view>
				<view class="notice-item">
					<text class="title">下单时间：</text>
					<text class="detail">{{ state.orderInfo.create_time }}</text>
				</view>
				<view class="notice-item" v-if="state.orderInfo.paid_time">
					<text class="title">支付时间：</text>
					<text class="detail">{{ state.orderInfo.paid_time || '-' }}</text>
				</view>
				<view class="notice-item">
					<text class="title">支付方式：</text>
					<text class="detail">{{ state.orderInfo.pay_types_text?.join(',') || '-' }}</text>
				</view>
			</view>
		</view>
		<!--  价格信息  -->
		<view class="order-price-box">
			<view class="notice-item ss-flex ss-row-between">
				<text class="title">商品总额</text>
				<view class="ss-flex">
					<text class="detail"
						v-if="Number(state.orderInfo.goods_amount) > 0">￥{{ state.orderInfo.goods_amount }}</text>
					<view v-if="state.orderInfo.score_amount && Number(state.orderInfo.goods_amount) > 0"
						class="detail">+</view>
					<view class="price-text ss-flex ss-col-center" v-if="state.orderInfo.score_amount">
						<image :src="sheep.$url.static('/static/img/shop/goods/score1.svg')" class="score-img"></image>
						<view class="detail">{{ state.orderInfo.score_amount }}</view>
					</view>
				</view>
			</view>
			<view class="notice-item ss-flex ss-row-between">
				<text class="title">运费</text>
				<text class="detail">￥{{ state.orderInfo.dispatch_amount }}</text>
			</view>
			<view class="notice-item ss-flex ss-row-between" v-if="state.orderInfo.total_discount_fee > 0">
				<text class="title">优惠金额</text>
				<text class="detail">¥{{ state.orderInfo.total_discount_fee }}</text>
			</view>
			<view class="notice-item all-rpice-item ss-flex ss-m-t-20">
				<text class="title">{{
          ['paid', 'completed'].includes(state.orderInfo.status) ? '已付款' : '需付款'
        }}</text>
				<text class="detail all-price"
					v-if="Number(state.orderInfo.pay_fee) > 0">￥{{ state.orderInfo.pay_fee }}</text>
				<view v-if="
            state.orderInfo.score_amount &&
            Number(state.orderInfo.pay_fee) > 0 &&
            ['paid', 'completed'].includes(state.orderInfo.status)
          " class="detail all-price">+</view>
				<view class="price-text ss-flex ss-col-center" v-if="
            state.orderInfo.score_amount && ['paid', 'completed'].includes(state.orderInfo.status)
          ">
					<image :src="sheep.$url.static('/static/img/shop/goods/score1.svg')" class="score-img"></image>
					<view class="detail all-price">{{ state.orderInfo.score_amount }}</view>
				</view>
			</view>
			<view class="notice-item all-rpice-item ss-flex ss-m-t-20" v-if="refundFee > 0">
				<text class="title">已退款</text>
				<text class="detail all-price">￥{{ refundFee.toFixed(2) }}</text>
			</view>
		</view>

		<!-- 底部按钮 -->
		<!-- TODO: 查看物流、等待成团、评价完后返回页面没刷新页面 -->
		<su-fixed bottom placeholder bg="bg-white" v-if="state.orderInfo.btns?.length">
			<view class="footer-box ss-flex ss-col-center ss-row-right">
				<button class="ss-reset-button cancel-btn" v-if="state.orderInfo.btns?.includes('cancel')"
					@tap="onCancel(state.orderInfo.id)">取消订单</button>
				<button class="ss-reset-button pay-btn ui-BG-Main-Gradient" v-if="state.orderInfo.btns?.includes('pay')"
					@tap="onPay(state.orderInfo.order_sn)">继续支付</button>
				<button class="ss-reset-button cancel-btn" v-if="state.orderInfo.btns?.includes('apply_refund')"
					@tap="onRefund(state.orderInfo.id)">申请退款</button>
				<button class="ss-reset-button cancel-btn" v-if="state.orderInfo.btns?.includes('groupon')" @tap="
            sheep.$router.go('/pages/activity/groupon/detail', {
              id: state.orderInfo.ext.groupon_id,
            })
          ">
					{{ state.orderInfo.status_code === 'groupon_ing' ? '邀请拼团' : '拼团详情' }}
				</button>
				<button class="ss-reset-button cancel-btn" v-if="state.orderInfo.btns?.includes('express')"
					@tap="onExpress(state.orderInfo.id)">查看物流</button>
				<button class="ss-reset-button cancel-btn" v-if="state.orderInfo.btns?.includes('confirm')"
					@tap="onConfirm(state.orderInfo.id)">确认收货</button>
				<button class="ss-reset-button cancel-btn" v-if="state.orderInfo.btns?.includes('comment')"
					@tap="onComment(state.orderInfo.id,state.orderInfo)">评价晒单</button>
				<button v-if="state.orderInfo.btns?.includes('invoice')" class="ss-reset-button cancel-btn"
					@tap.stop="onOrderInvoice(state.orderInfo.invoice?.id)">
					查看发票
				</button>
				<button v-if="state.orderInfo.btns?.includes('re_apply_refund')" class="ss-reset-button cancel-btn"
					@tap.stop="onRefund(state.orderInfo.id)">
					重新退款
				</button>
			</view>
		</su-fixed>
	</s-layout>
</template>

<script setup>
	import sheep from '@/sheep';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		computed,
		reactive
	} from 'vue';
	import {
		isEmpty
	} from 'lodash';

	const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
	const headerBg = sheep.$url.css('/static/img/shop/order/order_bg.png');
	const tradeManaged = computed(() => sheep.$store('app').has_wechat_trade_managed);

	const state = reactive({
		orderInfo: {},
		merchantTradeNo: '', // 商户订单号
		comeinType: '', // 进入订单详情的来源类型
	});

	const addressText = computed(() => {
		let data = state.orderInfo.address;
		if (data) {
			return `${data.province_name} ${data.city_name} ${data.district_name} ${data.address}`;
		}
		return '';
	});

	// 复制
	const onCopy = () => {
		sheep.$helper.copyText(state.orderInfo.order_sn);
	};
	//退款总额
	const refundFee = computed(() => {
		let refundFee = 0;
		state.orderInfo.items?.forEach((i) => {
			refundFee += Number(i.refund_fee);
		});
		return refundFee;
	});
	// 去支付
	function onPay(orderSN) {
		sheep.$router.go('/pages/pay/index', {
			orderSN,
		});
	}

	function onGoodsDetail(id) {
		sheep.$router.go('/pages/goods/index', {
			id
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
						getOrderDetail(data.order_sn);
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
					const {
						error,
						data
					} = await sheep.$api.order.applyRefund(orderId);
					if (error === 0) {
						getOrderDetail(data.order_sn);
					}
				}
			},
		});
	}

	// 查看物流
	async function onExpress(orderId) {
		sheep.$router.go('/pages/order/express/list', {
			orderId,
		});
	}

	//确认收货
	async function onConfirm(orderId, ignore = false) {
		// 需开启确认收货组件
		// todo:
		// 1.怎么检测是否开启了发货组件功能？如果没有开启的话就不能在这里return出去
		// 2.如果开启了走mpConfirm方法,需要在App.vue的show方法中拿到确认收货结果
		let isOpenBusinessView = true;
		if (
			sheep.$platform.name === 'WechatMiniProgram' &&
			!isEmpty(state.orderInfo.wechat_extra_data) &&
			isOpenBusinessView &&
			!ignore
		) {
			mpConfirm(orderId);
			return;
		}

		// 正常的确认收货流程
		const {
			error,
			data
		} = await sheep.$api.order.confirm(orderId);
		if (error === 0) {
			getOrderDetail(data.order_sn);
		}
	}

	// #ifdef MP-WEIXIN
	// 小程序确认收货组件
	function mpConfirm(orderId) {
		if (!wx.openBusinessView) {
			sheep.$helper.toast(`请升级微信版本`);
			return;
		}
		wx.openBusinessView({
			businessType: 'weappOrderConfirm',
			extraData: {
				merchant_trade_no: state.orderInfo.wechat_extra_data.merchant_trade_no,
				transaction_id: state.orderInfo.wechat_extra_data.transaction_id,
			},
			success(response) {
				console.log('success:', response);
				if (response.errMsg === 'openBusinessView:ok') {
					if (response.extraData.status === 'success') {
						onConfirm(orderId, true);
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

	// 查看发票
	function onOrderInvoice(invoiceId) {
		sheep.$router.go('/pages/order/invoice', {
			invoiceId,
		});
	}

	// 配送方式详情
	function onDetail(item) {
		sheep.$router.go('/pages/order/dispatch/content', {
			id: item.order_id,
			item_id: item.id,
		});
	}

	// 评价
	function onComment(orderSN, orderId) {
		console.log(orderId);
		// return;
		uni.$once('SELECT_INVOICE', (e) => {
			state.invoiceInfo = e.invoiceInfo;
		});
		sheep.$router.go('/pages/goods/comment/add', {
			orderSN,
			orderId
		});
	}
	async function getOrderDetail(id) {
		// 对详情数据进行适配
		let res = {};
		if (state.comeinType === 'wechat') {
			res = await sheep.$api.order.detail(id, {
				merchant_trade_no: state.merchantTradeNo,
			});
		} else {
			res = await sheep.$api.order.detail(id);
		}
		console.log(res, '我的订单详情数据');
		if (res.code === 0) {
			let obj = {
				10: ['待发货', '等待买家付款', ["apply_refund"]],
				30: ['待评价', '等待买家评价', ["express", "comment"]]
			}
			res.data.status_text = obj[res.data.status][0];
			res.data.status_desc = obj[res.data.status][1];
			res.data.btns = obj[res.data.status][2];
			res.data.address = {
				province_name: res.data.receiverAreaName.split(' ')[0],
				district_name: res.data.receiverAreaName.split(' ')[2],
				city_name: res.data.receiverAreaName.split(' ')[1],
				address: res.data.receiverDetailAddress,
				consignee: res.data.receiverName,
				mobile: res.data.receiverMobile,
			}
			res.data.pay_fee = res.data.payPrice / 100
			res.data.create_time = sheep.$helper.timeFormat(res.data.createTime, 'yyyy-mm-dd hh:MM:ss')
			res.data.order_sn = res.data.no
			res.data.goods_amount = res.data.totalPrice / 100
			res.data.dispatch_amount = res.data.deliveryPrice / 100
			res.data.pay_types_text = res.data.payChannelName.split(',')
			res.data.items = res.data.items.map(ite => {

				return {
					...ite,
					goods_title: ite.spuName,
					goods_num: ite.count,
					goods_price: ite.price / 100,
					goods_image: ite.picUrl,
					goods_sku_text: ite.properties.reduce((it0, it1) => it0 + it1.valueName + ' ', '')
				}
			})
			state.orderInfo = res.data;
			console.log(state.orderInfo, '修改后数据')
		} else {
			sheep.$router.back();
		}
	}

	onLoad(async (options) => {
		let id = 0;
		if (options.orderSN) {
			id = options.orderSN;
		}
		if (options.id) {
			id = options.id;
		}
		state.comeinType = options.comein_type;
		if (state.comeinType === 'wechat') {
			state.merchantTradeNo = options.merchant_trade_no;
		}
		getOrderDetail(id);
	});
</script>

<style lang="scss" scoped>
	.score-img {
		width: 36rpx;
		height: 36rpx;
		margin: 0 4rpx;
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

	.state-box {
		color: rgba(#fff, 0.9);
		width: 100%;
		background: v-bind(headerBg) no-repeat,
			linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
		background-size: 750rpx 100%;
		box-sizing: border-box;

		.state-img {
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
		}
	}

	.order-address-box {
		background-color: #fff;
		border-radius: 10rpx;
		margin: -50rpx 20rpx 16rpx 20rpx;
		padding: 44rpx 34rpx 42rpx 20rpx;
		font-size: 30rpx;
		box-sizing: border-box;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);

		.address-username {
			margin-right: 20rpx;
		}

		.address-detail {
			font-size: 26rpx;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);
			margin-top: 20rpx;
		}
	}

	.detail-goods {
		border-radius: 10rpx;
		margin: 0 20rpx 20rpx 20rpx;

		.order-list {
			margin-bottom: 20rpx;
			background-color: #fff;

			.order-card {
				padding: 20rpx 0;

				.order-sku {
					font-size: 24rpx;

					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					width: 450rpx;
					margin-bottom: 20rpx;

					.order-num {
						margin-right: 10rpx;
					}
				}

				.tag-btn {
					margin-left: 16rpx;
					font-size: 24rpx;
					height: 36rpx;
					color: var(--ui-BG-Main);
					border: 2rpx solid var(--ui-BG-Main);
					border-radius: 14rpx;
					padding: 0 4rpx;
				}
			}
		}
	}

	// 订单信息。
	.notice-box {
		background: #fff;
		border-radius: 10rpx;
		margin: 0 20rpx 20rpx 20rpx;

		.notice-box__head {
			font-size: 30rpx;

			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 80rpx;
			border-bottom: 1rpx solid #dfdfdf;
			padding: 0 25rpx;
		}

		.notice-box__content {
			padding: 20rpx;

			.self-pickup-box {
				width: 100%;

				.self-pickup--img {
					width: 200rpx;
					height: 200rpx;
					margin: 40rpx 0;
				}
			}
		}

		.notice-item,
		.notice-item--center {
			display: flex;
			align-items: center;
			line-height: normal;
			margin-bottom: 24rpx;

			.title {
				font-size: 28rpx;
				color: #999;
			}

			.detail {
				font-size: 28rpx;
				color: #333;
				flex: 1;
			}
		}
	}

	.copy-btn {
		width: 100rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		padding: 0;
		background: rgba(238, 238, 238, 1);
		font-size: 22rpx;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	// 订单价格信息
	.order-price-box {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx;
		margin: 0 20rpx 20rpx 20rpx;

		.notice-item {
			line-height: 70rpx;

			.title {
				font-size: 28rpx;
				color: #999;
			}

			.detail {
				font-size: 28rpx;
				color: #333;
				font-family: OPPOSANS;
			}
		}

		.all-rpice-item {
			justify-content: flex-end;
			align-items: center;

			.title {
				font-size: 26rpx;
				font-weight: 500;
				color: #333333;
				line-height: normal;
			}

			.all-price {
				font-size: 26rpx;
				font-family: OPPOSANS;
				line-height: normal;
				color: $red;
			}
		}
	}

	// 底部
	.footer-box {
		height: 100rpx;
		width: 100%;
		box-sizing: border-box;
		border-radius: 10rpx;
		padding-right: 20rpx;

		.cancel-btn {
			width: 160rpx;
			height: 60rpx;
			background: #eeeeee;
			border-radius: 30rpx;
			margin-right: 20rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
		}

		.pay-btn {
			width: 160rpx;
			height: 60rpx;
			font-size: 26rpx;
			border-radius: 30rpx;
			font-weight: 500;
			color: #fff;
		}
	}
</style>