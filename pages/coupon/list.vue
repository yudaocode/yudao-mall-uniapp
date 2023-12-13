<!-- 优惠券中心  -->
<template>
	<s-layout title="优惠券" :bgStyle="{ color: '#f2f2f2' }">
		<su-sticky bgColor="#fff">
			<su-tabs :list="tabMaps" :scrollable="false" @change="onTabsChange" :current="state.currentTab"></su-tabs>
		</su-sticky>
		<s-empty v-if="state.pagination.total === 0" icon="/static/coupon-empty.png" text="暂无优惠券"></s-empty>
		<template v-if="state.currentTab == '0'">
			<view v-for="item in state.pagination.list" :key="item.id">
				<s-coupon-list :data="item">
					<!-- 	@tap="
					  sheep.$router.go('/pages/coupon/detail', {
					    id: item.id,
					  })
					" -->
					<template #default>
						<button class="ss-reset-button card-btn ss-flex ss-row-center ss-col-center"
							:class="item.get_status != 'can_get' ? 'border-btn' : ''" @click.stop="getBuy(item.id)"
							:disabled="item.get_status != 'can_get'">
							<!-- {{ item.status_text }} -->
							{{item.status_text|| '立即使用' }}
						</button>
					</template>
				</s-coupon-list>
			</view>
		</template>
		<template v-else>
			<view v-for="item in state.pagination.list" :key="item.id">
				<s-coupon-list :data="item" type="user">
					<!-- 	@tap="
					            sheep.$router.go('/pages/coupon/detail', {
					              id: item.id,
					            })
					          " -->
					<template #default>
						<button class="ss-reset-button card-btn ss-flex ss-row-center ss-col-center" :class="
                item.status == 'can_get' || item.status == 'can_use'
                  ? ''
                  : item.status == 'used' || item.status == 'expired'
                  ? 'disabled-btn'
                  : 'border-btn'
              " :disabled="item.status != 'can_get' && item.status != 'can_use'" @click.stop="
                sheep.$router.go('/pages/coupon/detail', {
                  id: item.coupon_id,
                  user_coupon_id: item.id,
                })
              ">
							<!-- {{ item.status_text }} -->
							{{item.status_text|| '立即使用' }}
						</button>
					</template>
				</s-coupon-list>
			</view>
		</template>

		<!-- <uni-load-more v-if="state.pagination.total > 0" :status="state.loadStatus" :content-text="{
        contentdown: '上拉加载更多',
      }" @tap="loadmore" /> -->
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
		type: '1',
	});

	const tabMaps = [
		// {
		//   name: '领券中心',
		//   value: 'all',
		// },
		{
			name: '已领取',
			value: '1',
		},
		{
			name: '已使用',
			value: '2',
		},
		{
			name: '已失效',
			value: '3',
		},
	];

	function onTabsChange(e) {
		state.pagination = pagination
		state.currentTab = e.index;
		state.type = e.value;
		// if (state.currentTab == 0) {
		// 	getData();
		// } else {
		getCoupon();
		// }
	}
	async function getData(page = 1, list_rows = 5) {
		state.loadStatus = 'loading';
		const res = await sheep.$api.coupon.list({
			list_rows,
			page
		});
		if (res.error === 0) {
			let couponlist = _.concat(state.pagination.data, res.data.data);
			state.pagination = {
				...res.data,
				data: couponlist,
			};
			if (state.pagination.current_page < state.pagination.last_page) {
				state.loadStatus = 'more';
			} else {
				state.loadStatus = 'noMore';
			}
		}
	}

	async function getCoupon(page = 1, list_rows = 5) {
		state.loadStatus = 'loading';
		let res = await sheep.$api.coupon.userCoupon({
			status: state.type,
			pageSize: list_rows,
			pageNo: page
		});
		if (res.code === 0) {
			// 拦截修改数据
			let obj = {
				1: '可用',
				2: '已用',
				3: '过期'
			}
			res.data.list = res.data.list.map(item => {
				return {
					...item,
					enough: (item.usePrice / 100).toFixed(2),
					amount: (item.discountPrice / 100).toFixed(2),
					use_start_time: sheep.$helper.timeFormat(item.validStartTime, 'yyyy-mm-dd hh:MM:ss'),
					use_end_time: sheep.$helper.timeFormat(item.validEndTime, 'yyyy-mm-dd hh:MM:ss'),
					status_text: obj[item.status]
				}
			});
			if (page >= 2) {
				let couponlist = _.concat(state.pagination.data, res.data.list);

				state.pagination = {
					...res.data,
					data: couponlist,
				};
				console.log(state.pagination, '拿到的优惠券数据');
			} else {
				state.pagination = res.data;
				console.log(state.pagination, '拿到的优惠券数据');
			}
			// if (state.pagination.current_page < state.pagination.last_page) {
			// 	state.loadStatus = 'more';
			// } else {
			// 	state.loadStatus = 'noMore';
			// }
		}
	}
	async function getBuy(id) {
		const {
			error,
			msg
		} = await sheep.$api.coupon.get(id);
		if (error === 0) {
			uni.showToast({
				title: msg,
			});
			setTimeout(() => {
				state.pagination = pagination
				getData();
			}, 1000);
		}
	}

	// 加载更多
	function loadmore() {
		if (state.loadStatus !== 'noMore') {
			if (state.currentTab == 0) {
				getData(state.pagination.current_page + 1);
			} else {
				getCoupon(state.pagination.current_page + 1);
			}
		}
	}
	onLoad((Option) => {
		// if (Option.type === 'all' || !Option.type) {
		// 	getData();
		// } else {
		// state.type = Option.type;
		// Option.type === 'geted' ?
		// 	() :
		// 	Option.type === 'used' ?
		// 	(state.currentTab = 1 && state.type = 2) :
		// 	(state.currentTab = 2 && state.type = 3);

		if (Option.type == 'geted') {
			state.currentTab = 0
			state.type = 1
		} else if (Option.type == 'used') {
			state.currentTab = 1
			state.type = 2
		} else {
			state.currentTab = 2
			state.type = 3
		}
		getCoupon();
		// }
	});
	onReachBottom(() => {
		loadmore();
	});
</script>
<style lang="scss" scoped>
	.card-btn {
		// width: 144rpx;
		padding: 0 16rpx;
		height: 50rpx;
		border-radius: 40rpx;
		background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
		color: #ffffff;
		font-size: 24rpx;
		font-weight: 400;
	}

	.border-btn {
		background: linear-gradient(90deg, var(--ui-BG-Main-opacity-4), var(--ui-BG-Main-light));
		color: #fff !important;
	}

	.disabled-btn {
		background: #cccccc;
		background-color: #cccccc !important;
		color: #fff !important;
	}
</style>