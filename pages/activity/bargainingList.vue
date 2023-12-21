<template>
	<s-layout title='砍价列表'>
		<view style='background-color: red;height:100vh;'>
			<view class='bargain-list'>
				<!-- #ifdef H5 -->
				<view class='iconfont icon-xiangzuo' @tap='goBack' :style="'top:'+ (state.navH/2) +'rpx'"
					v-if="state.returnShow">
				</view>
				<!-- #endif -->

				<!-- 砍价记录的概要 -->
				<view class='header'>
					<view class="pic">
						<view class='swipers'>
							<swiper :indicator-dots="state.indicatorDots" :autoplay="state.autoplay" interval="2500"
								duration="500" vertical="true" circular="true">
								<block v-for="(item,index) in state.bargainSuccessList" :key='index'>
									<swiper-item>
										<view class="acea-row row-middle" style='display:flex'>
											<image :src="item.avatar" class="mr9"></image>
											<view class='mr9 nickName'>{{ item.nickname }}</view>
											<text class='mr9'>拿了</text>
											<view class='line1'>{{ item.activityName }}</view>
										</view>
									</swiper-item>
								</block>
							</swiper>
						</view>
					</view>
					<view class="tit">已有{{ state.bargainTotal }}人砍成功</view>
				</view>

				<!-- 砍价活动列表 -->
				<view class='list'>
					<block v-for="(item,index) in state.bargainList" :key="index">
						<view style='display:flex' class='item acea-row row-between-wrapper'
							@tap="openSubscribe('/pages/activity/bargainingDetail?id='+ item.id)">
							<view class='pictrue'>
								<image :src='item.picUrl'></image>
							</view>
							<view class='text acea-row row-column-around'>
								<view class='name line2'>{{ item.name }}</view>
								<view class="acea-row" style="margin-bottom: 14rpx;display:flex">
									<s-count-down :tipText="' '" :bgColor="state.bgColor" :dayText="':'" :hourText="':'"
										:minuteText="':'" :secondText="' '" :datatime="item.endTime / 1000"
										:isDay="true" />
									<text class="txt">后结束</text>
								</view>
								<view v-if="item.stock === 0">
									<view style="font-size: 22rpx;"
										@tap="openSubscribe('/pages/activity/goods_bargain_details/index?id='+ item.id +'&startBargainUid='+ uid)">
										已售罄</view>
								</view>
								<view class='money font-color'>最低: ￥<text
										class='price'>{{ fen2yuan(item.bargainMinPrice) }}</text></view>
							</view>
							<view v-if="item.stock > 0" class='cutBnt bg-color'>参与砍价</view>
							<view v-if="item.stock === 0" class='cutBnt bg-color-hui'>已售罄</view>
						</view>
					</block>
					<view class='loadingicon acea-row row-center-wrapper' v-if='state.bargainList.length > 0'
						style='text-align: center;'>
						<text class='loading iconfont icon-jiazai' :hidden='!loading'></text>{{state.loadTitle}}
					</view>
				</view>
			</view>
		</view>
	</s-layout>
</template>

<script setup>
	import {
		computed,
		reactive
	} from 'vue';
	import sheep from '@/sheep';
	import _ from 'lodash';
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app';
	import {
		useDurationTime
	} from '@/sheep/hooks/useGoods';
	import {
		showShareModal
	} from '@/sheep/hooks/useModal';
	import {
		isEmpty
	} from 'lodash';

	const state = reactive({
		navH: '',
		returnShow: true,

		// ========== 砍价记录概要的相关变量 ==========
		bargainTotal: 0,
		bargainSuccessList: [],
		autoplay: true,
		indicatorDots: false,

		// ========== 砍价活动的相关变量 ==========
		bargainList: [],
		page: 1,
		limit: 10,
		loading: false,
		loadend: false,
		bgColor: {
			'bgColor': '#E93323',
			'Color': '#fff',
			'width': '44rpx',
			'timeTxtwidth': '16rpx',
			'isDay': true
		},
		loadTitle: '加载更多',
	});

	function getBargainHeader() {
		sheep.$api.activity.getBargainRecordSummary().then(res => {
			state.bargainTotal = res.data.successUserCount;
			state.bargainSuccessList = res.data.successList;
		}).catch(err => {
			return state.$util.Tips({
				title: err
			});
		})
	}

	function getBargainList() {
		if (state.loadend || state.loading) {
			return;
		}
		state.loading = true;
		state.loadTitle = '';
		sheep.$api.activity.getBargainActivityPage({
			pageNo: state.page,
			pageSize: state.limit
		}).then(res => {
			const list = res.data.list;
			const bargainList = _.concat(state.bargainList, list);
			const loadend = list.length < state.limit;
			state.loadend = loadend;
			state.loading = false;
			state.loadTitle = loadend ? '已全部加载' : '加载更多';
			// this.$set(this, 'bargainList', bargainList);
			state.bargainList = res.data.list
			// this.$set(this, 'page', this.page + 1);
			state.page = state.page + 1;
		}).catch(res => {
			state.loading = false;
			state.loadTitle = '加载更多';
		});
	}

	function openSubscribe(e) {
		console.log(e)
		uni.navigateTo({
			url: page,
		});
		return;
		let page = e;
		// #ifndef MP
		uni.navigateTo({
			url: page
		});
		// #endif
		// #ifdef MP
		uni.showLoading({
			title: '正在加载',
		})
		openBargainSubscribe().then(res => {
			uni.hideLoading();

		}).catch((err) => {
			uni.hideLoading();
		});
		// #endif
	}
	onLoad(function() {
		getBargainHeader();
		getBargainList();
	})

	onReachBottom(() => {
		getBargainList();
	});

	// 工具函数
	function fen2yuan(price) {
		return (price / 100.0).toFixed(2)
	}
</script>

<style lang='scss' scoped>
	page,
	.page-app {
		background-color: #e93323 !important;
	}

	.font-color {
		color: red;
	}

	.mr9 {
		margin-right: 9rpx;
	}

	.swipers {
		height: 100%;
		width: 76%;
		margin: auto;
		overflow: hidden;
		font-size: 22rpx;
		color: #fff;

		image {
			width: 24rpx;
			height: 24rpx;
			border-radius: 50%;
			overflow: hidden;
		}

		swiper {
			height: 100%;
			width: 100%;
			overflow: hidden;
		}

		.line1 {
			width: 195rpx;
		}
	}

	.bargain-list .icon-xiangzuo {
		font-size: 40rpx;
		color: #fff;
		position: fixed;
		left: 30rpx;
		z-index: 99;
		transform: translateY(-20%);
		height: 100%
	}

	.bargain-list .header {
		/* TODO 芋艿：此处原来采用base64 但是过长编辑到小程序卡死 目前采用网络地址 需解决 */
		background-image: url('https://huizhizao-1314830814.cos.ap-shanghai.myqcloud.com/huizhizao-1314830814/bdc8a9210710b83bcd88a14703f440fc7091792706b5cb71b54361488a547298.png');
		babackground-repeat: no-repeat;
		background-size: 100% 100%;
		width: 750rpx;
		height: 420rpx;

		.acea-row {
			height: 50rpx;
			line-height: 50rpx;
			left: 50rpx;

			.nickName {
				width: 65rpx;
				overflow: hidden;
				white-space: nowrap;
			}
		}

		.pic {
			width: 478rpx;
			height: 50rpx;
			margin: 0 auto;
			/* TODO 芋艿：此处原来是本地地址小程序不支持，需改为线上 */
			background-image: url('https://huizhizao-1314830814.cos.ap-shanghai.myqcloud.com/huizhizao-1314830814/d111ac53e1390618f22fcc03e415bcd584b3f409ae52421aef95c2ab9b02aa30.png');
			babackground-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.tit {
			color: #FFFFFF;
			font-size: 24rpx;
			font-weight: 400;
			text-align: center;
			margin-top: 304rpx;
		}
	}

	.bargain-list .list {
		padding: 0 30rpx;
	}

	.bargain-list .list .item {
		position: relative;
		height: 250rpx;
		background-color: #fff;
		border-radius: 14rpx;
		margin-bottom: 20rpx;
		padding: 30rpx 25rpx;
	}

	.bargain-list .list .item .pictrue {
		width: 190rpx;
		height: 190rpx;
	}

	.bargain-list .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 14rpx;
	}

	.bargain-list .list .item .text {
		width: 432rpx;
		font-size: 28rpx;
		color: #333333;

		.txt {
			font-size: 22rpx;
			margin-left: 4rpx;
			color: #666666;
			line-height: 36rpx;
		}
	}

	.bargain-list .list .item .text .name {
		width: 100%;
		height: 68rpx;
		line-height: 36rpx;
		font-size: 28rpx;
		margin-bottom: 26rpx;
	}

	.bargain-list .list .item .text .num {
		font-size: 26rpx;
		color: #999;
	}

	.bargain-list .list .item .text .num .iconfont {
		font-size: 35rpx;
		margin-right: 7rpx;
	}

	.bargain-list .list .item .text .money {
		font-size: 24rpx;
		font-weight: bold;
	}

	.bargain-list .list .item .text .money .price {
		font-size: 38rpx;
	}

	.bargain-list .list .item .cutBnt {
		position: absolute;
		width: 162rpx;
		height: 52rpx;
		border-radius: 50rpx;
		font-size: 24rpx;
		color: #fff;
		text-align: center;
		line-height: 52rpx;
		right: 24rpx;
		bottom: 30rpx;
		background: linear-gradient(90deg, #FF7931 0%, #E93323 100%);
	}

	.bargain-list .list .item .cutBnt .iconfont {
		margin-right: 8rpx;
		font-size: 30rpx;
	}

	.bargain-list .list .load {
		font-size: 24rpx;
		height: 85rpx;
		text-align: center;
		line-height: 85rpx;
	}
</style>