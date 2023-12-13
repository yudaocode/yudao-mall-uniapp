<!-- 售后列表 -->
<template>
	<s-layout title="售后列表">
		<!-- tab -->
		<su-sticky bgColor="#fff">
			<su-tabs :list="tabMaps" :scrollable="false" @change="onTabsChange" :current="state.currentTab"></su-tabs>
		</su-sticky>
		<s-empty v-if="state.pagination.total === 0" icon="/static/data-empty.png" text="暂无数据">
		</s-empty>
		<!-- 列表 -->
		<view v-if="state.pagination.total > 0">
			<view class="list-box ss-m-y-20" v-for="order in state.pagination.data" :key="order.id"
				@tap="sheep.$router.go('/pages/order/aftersale/detail', { id: order.id })">
				<view class="order-head ss-flex ss-col-center ss-row-between">
					<text class="no">服务单号：{{ order.no }}</text>
					<text class="state">{{ status[order.status] }}</text>
				</view>
				<s-goods-item :img="order.picUrl" :title="order.spuName"
					:skuText="order.properties.reduce((a,b)=>a+b.valueName+' ','')" :price="order.refundPrice/100"
					:num="order.count"></s-goods-item>
				<view class="apply-box ss-flex ss-col-center ss-row-between border-bottom ss-p-x-20">
					<view class="ss-flex ss-col-center">
						<!-- 此处需修改 -->
						<view class="title ss-m-r-20">{{ status2[order.way] }}</view>
						<!-- <view class="value">{{ order.aftersale_status_desc }}</view> -->
						<view class="value">{{ order.applyReason }}</view>
					</view>
					<text class="_icon-forward"></text>
				</view>
				<!-- 				<view class="tool-btn-box ss-flex ss-col-center ss-row-right ss-p-r-20">
					<view>
						<button class="ss-reset-button tool-btn" @tap.stop="onApply(order.id)"
							v-if="order.btns.includes('cancel')">取消申请</button>
					</view>
					<view>
						<button class="ss-reset-button tool-btn" @tap.stop="onDelete(order.id)"
							v-if="order.btns.includes('delete')">删除</button>
					</view>
				</view> -->
			</view>
		</view>
		<uni-load-more v-if="state.pagination.total > 0" :status="state.loadStatus" :content-text="{
        contentdown: '上拉加载更多',
      }" @tap="loadmore" />
	</s-layout>
</template>

<script setup>
	import sheep from '@/sheep';
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app';
	import {
		computed,
		reactive
	} from 'vue';
	import _ from 'lodash';

	const pagination = {
		data: [],
		current_page: 1,
		total: 1,
		last_page: 1,
	};
	const state = reactive({
		currentTab: 0,
		showApply: false,
		pagination: {
			data: [],
			current_page: 1,
			total: 1,
			last_page: 1,
		},
		loadStatus: '',
	});
	// 字典需要登录 尚未接入 先用固定值代替
	const status = {
		10: '申请售后',
		20: '商品待退货',
		30: '商家待收货',
		40: '等待退款',
		50: '退款成功',
		61: '买家取消',
		62: '商家拒绝',
		63: '商家拒收货'
	}
	const status2 = {
		10: '仅退款',
		20: '退货退款'
	}
	const tabMaps = [{
			name: '全部',
			value: 'all',
		},
		// {
		//   name: '申请中',
		//   value: 'nooper',
		// },
		// {
		//   name: '处理中',
		//   value: 'ing',
		// },
		// {
		//   name: '已完成',
		//   value: 'completed',
		// },
		// {
		//   name: '已拒绝',
		//   value: 'refuse',
		// },
	];
	// 切换选项卡
	function onTabsChange(e) {
		state.pagination = pagination
		state.currentTab = e.index;
		getOrderList();
	}

	// 获取售后列表
	async function getOrderList(page = 1, list_rows = 5) {
		pagination.current_page = page;
		state.loadStatus = 'loading';
		let res = await sheep.$api.order.aftersale.list({
			// type: tabMaps[state.currentTab].value,
			pageSize: list_rows,
			pageNo: page,
		});
		console.log(res, '未处理前售后列表数据')
		if (res.code === 0) {
			let orderList = _.concat(state.pagination.data, res.data.list);

			state.pagination = {
				total: res.data.total,
				...res.data,
				data: orderList,
			};
			console.log(state.pagination, '售后订单数据')
			// if (state.pagination.current_page < state.pagination.last_page) {
			state.loadStatus = 'more';
			// } else {
			// state.loadStatus = 'noMore';
			// }
		}
	}

	function onApply(orderId) {
		uni.showModal({
			title: '提示',
			content: '确定要取消此申请吗？',
			success: async function(res) {
				if (res.confirm) {
					const {
						error
					} = await sheep.$api.order.aftersale.cancel(orderId);
					if (error === 0) {
						state.pagination = pagination
						getOrderList();
					}
				}
			},
		});
	}

	function onDelete(orderId) {
		uni.showModal({
			title: '提示',
			content: '确定要删除吗？',
			success: async function(res) {
				if (res.confirm) {
					const {
						error
					} = await sheep.$api.order.aftersale.delete(orderId);
					if (error === 0) {
						state.pagination = pagination
						getOrderList();
					}
				}
			},
		});
	}

	onLoad(async (options) => {
		if (options.type) {
			state.currentTab = options.type;
		}
		getOrderList();
	});

	// 加载更多
	function loadmore() {
		// if (state.loadStatus !== 'noMore') {
		getOrderList(pagination.current_page + 1);
		// }
	}

	// 上拉加载更多
	onReachBottom(() => {
		loadmore();
	});
</script>

<style lang="scss" scoped>
	.list-box {
		background-color: #fff;

		.order-head {
			padding: 0 25rpx;
			height: 77rpx;
		}

		.apply-box {
			height: 82rpx;

			.title {
				font-size: 24rpx;
			}

			.value {
				font-size: 22rpx;
				color: $dark-6;
			}
		}

		.tool-btn-box {
			height: 100rpx;

			.tool-btn {
				width: 160rpx;
				height: 60rpx;
				background: #f6f6f6;
				border-radius: 30rpx;
				font-size: 26rpx;
				font-weight: 400;
			}
		}
	}
</style>