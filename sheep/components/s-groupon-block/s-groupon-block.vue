<!-- 装修组件 - 拼团 -->
<template>
	<view>
		<view v-if="layoutType === 'threeCol'" class="goods-sm-box ss-flex ss-flex-wrap" :style="[{ margin: '-' + data.space + 'rpx' }]">
			<view v-for="product in productList" class="goods-card-box" :key="product.id" :style="[{padding: data.space + 'rpx',},]">
				<s-goods-column
					class="goods-card"
					size="sm"
					:goodsFields="goodsFields"
					:tagStyle="badge"
					:data="product"
					:titleColor="data.fields.name?.color"
					:topRadius="data.borderRadiusTop"
					:bottomRadius="data.borderRadiusBottom"
					@click="sheep.$router.go('/pages/goods/groupon', { id: props.data.activityId, })">
				</s-goods-column>
			</view>
		</view>
		<!-- 样式2 一行一个 图片左 文案右 -->
		<view class="goods-box" v-if="layoutType === 'oneCol'">
			<view class="goods-list" v-for="(product, index) in productList" :key="index" :style="[{ marginBottom: space + 'px' }]">
				<s-goods-column
					class="goods-card" size="lg"
					:grouponTag="true"
					:goodsFields="goodsFields"
					:tagStyle="badge"
					:data="product"
					:titleColor="data.fields.name?.color"
					:subTitleColor="data.fields.introduction?.color"
					:topRadius="data.borderRadiusTop"
					:bottomRadius="data.borderRadiusBottom"
					@click="sheep.$router.go('/pages/goods/groupon', { id: props.data.activityId, })">
					<template v-slot:cart>
						<button class="ss-reset-button cart-btn" :style="[buyStyle]">
							{{ btnBuy?.type === 'text' ? btnBuy.text : '去拼团' }}
						</button>
					</template>
				</s-goods-column>
			</view>
		</view>
	</view>
</template>

<script setup>
	/**
	 * 拼团
	 */
	import {
		computed,
		onMounted,
		reactive,
		ref
	} from 'vue';
	import sheep from '@/sheep';
	import SpuApi from "@/sheep/api/product/spu";
	import CombinationApi from "@/sheep/api/promotion/combination";

	// 接收参数
	const props = defineProps({
		// 装修数据
		data: {
			type: Object,
			default: () => ({}),
		},
		// 装修样式
		styles: {
			type: Object,
			default: () => ({}),
		},
	});
	
	// 设置相关信息是否显示
	const goodsFields = reactive({
	  // 商品价格
	  price: { show: true },
	  // 库存
	  stock: { show: true },
	  // 商品名称
	  name: { show: true },
	  // 商品介绍
	  introduction: { show: true },
	  // 市场价
	  marketPrice: { show: true },
	  // 销量
	  salesCount: { show: true },
	});

	let {
		layoutType,
		badge,
		btnBuy,
		space,
	} = props.data;
	let {
		marginLeft,
		marginRight
	} = props.styles;

	// 购买按钮样式（暂未实现）
	const buyStyle = computed(() => {
		let btnBuy = props.data.btnBuy;
		if (btnBuy?.type === 'text') {
			return {
				background: `linear-gradient(to right, ${btnBuy.bgBeginColor}, ${btnBuy.bgEndColor})`,
			};
		}

		if (btnBuy?.type === 'img') {
			return {
				width: '54rpx',
				height: '54rpx',
				background: `url(${sheep.$url.cdn(btnBuy.imgUrl)}) no-repeat`,
				backgroundSize: '100% 100%',
			};
		}
	});

	const productList = ref([]);
	onMounted(async () => {
		// todo：@owen 与Yudao结构不一致，待重构
		const {
			data: activity
		} = await CombinationApi.getCombinationActivity(props.data.activityId);
		const {
			data: spu
		} = await SpuApi.getSpuDetail(activity.spuId)
		// 循环活动信息，赋值拼团最低价格
		activity.products.forEach((product) => {
			spu.price = Math.min(spu.price, product.combinationPrice); // 设置 SPU 的最低价格
		});
		productList.value = [spu];
	});
</script>

<style lang="scss" scoped>
	.goods-list {
		position: relative;

		.cart-btn {
			position: absolute;
			bottom: 10rpx;
			right: 20rpx;
			z-index: 11;
			height: 50rpx;
			line-height: 50rpx;
			padding: 0 20rpx;
			border-radius: 25rpx;
			font-size: 24rpx;
			color: #fff;
			background: linear-gradient(90deg, #ff6600 0%, #fe832a 100%);
		}
	}

	.goods-list {
		&:nth-last-of-type(1) {
			margin-bottom: 0 !important;
		}
	}

	.goods-sm-box {
		margin: 0 auto;
		box-sizing: border-box;

		.goods-card-box {
			flex-shrink: 0;
			overflow: hidden;
			width: 33.3%;
			box-sizing: border-box;
		}
	}
</style>