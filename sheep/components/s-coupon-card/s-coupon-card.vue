<!-- 装修用户组件：用户卡券 -->
<template>
	<view class="ss-coupon-menu-wrap ss-flex ss-col-center">
		<view class="menu-item ss-flex-col ss-row-center ss-col-center" v-for="item in props.list" :key="item.title"
			@tap="sheep.$router.go(item.path, { type: item.type })"
			:class="item.type === 'all' ? 'menu-wallet' : 'ss-flex-1'">
			<image class="item-icon" :src="sheep.$url.static(item.icon)" mode="aspectFit"></image>
			<view class="menu-title ss-m-t-28">{{ item.title }}</view>
		</view>
	</view>
</template>

<script setup>
	/**
	 * 装修组件 - 优惠券菜单
	 */
	import sheep from '@/sheep';

	// 接收参数
	const props = defineProps({
		list: {
			type: Array,
			default () {
				return [{
						title: '已领取',
						value: '0',
						icon: '/static/img/shop/order/nouse_coupon.png',
						path: '/pages/coupon/list',
						type: 'geted',
					},
					{
						title: '已使用',
						value: '0',
						icon: '/static/img/shop/order/useend_coupon.png',
						path: '/pages/coupon/list',
						type: 'used',
					},
					{
						title: '已失效',
						value: '0',
						icon: '/static/img/shop/order/out_coupon.png',
						path: '/pages/coupon/list',
						type: 'expired',
					},
					{
					  title: '领券中心',
					  value: '0',
					  icon: '/static/img/shop/order/all_coupon.png',
					  path: '/pages/coupon/list',
					  type: 'all',
					},
				];
			},
		},
	});
</script>

<style lang="scss" scoped>
	.ss-coupon-menu-wrap {
		.menu-item {
			height: 160rpx;

			.menu-title {
				font-size: 24rpx;
				line-height: 24rpx;
				color: #333333;
			}

			.item-icon {
				width: 44rpx;
				height: 44rpx;
			}
		}

		.menu-wallet {
			width: 144rpx;
		}
	}
</style>