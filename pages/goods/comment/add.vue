<!-- 评价  -->
<template>
	<s-layout title="评价">
		<view>
			<view v-for="(item, index) in state.orderInfo.items" :key="item.id">
				<view v-if="item.btns.includes('comment')">
					<view class="commont-from-wrap">
						<!-- 评价商品 -->
						<s-goods-item :img="item.goods_image" :title="item.goods_title" :skuText="item.goods_sku_text"
							:price="item.goods_price" :num="item.goods_num"></s-goods-item>
					</view>

					<view class="form-item">
						<!-- 评分 -->
						<view class="star-box ss-flex ss-col-center">
							<view class="star-title ss-m-r-40">
								<!-- {{ rateMap[state.commentList[index].level] }} -->
								商品质量
							</view>
							<uni-rate v-model="state.commentList[index].level" />
						</view>
						<view class="star-box ss-flex ss-col-center">
							<view class="star-title ss-m-r-40">
								<!-- {{ rateMap[state.commentList[index].level] }} -->
								服务态度
							</view>
							<uni-rate v-model="state.commentList[index].level2" />
						</view>
						<!-- 评价 -->
						<view class="area-box">
							<uni-easyinput :inputBorder="false" type="textarea" maxlength="120" autoHeight
								v-model="state.commentList[index].content"
								placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧~"></uni-easyinput>

							<view class="img-box">
								<s-uploader v-model:url="state.commentList[index].images" fileMediatype="image"
									limit="9" mode="grid" :imageStyles="{ width: '168rpx', height: '168rpx' }" />
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
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		computed,
		reactive
	} from 'vue';

	const state = reactive({
		orderInfo: {},
		commentList: [],
		orderId: null
	});

	const rateMap = {
		1: '糟糕',
		2: '差评',
		3: '一般',
		4: '良好',
		5: '好评',
	};

	async function onSubmit() {
		// 对接商品评价
		// console.log(state.orderInfo);
		// return;
		let obj = {
			anonymous: false,
			benefitScores: state.commentList[0].level2,
			content: state.commentList[0].content,
			descriptionScores: state.commentList[0].level,
			orderItemId: state.commentList[0].item_id,
			picUrls: 'https://t7.baidu.com/it/u=2531125946,3055766435&fm=193&f=GIF'
		}
		const {
			code
		} = await sheep.$api.order.comment(obj);
		if (code === 0) {
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
		if (options.orderId) {
			state.orderId = options.orderId
		}

		const res = await sheep.$api.order.detail(id);
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
			res.data.id = res.data.id
			res.data.goods_amount = res.data.totalPrice / 100
			res.data.dispatch_amount = res.data.deliveryPrice / 100
			res.data.pay_types_text = res.data.payChannelName.split(',')
			res.data.items = res.data.items.map(ite => {
				return {
					...ite,
					btns: obj[res.data.status][2],
					goods_title: ite.spuName,
					goods_num: ite.count,
					goods_price: ite.price / 100,
					goods_image: ite.picUrl,
					goods_sku_text: ite.properties.reduce((it0, it1) => it0 + it1.valueName + ' ', '')
				}
			})
			if (res.data.btns.includes('comment')) {
				state.orderInfo = res.data;
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
				console.log(state.orderInfo.items, '循环')
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