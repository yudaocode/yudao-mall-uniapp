<!-- 装修商品组件：标题栏 -->
<template>
	<view class="ss-title-wrap ss-flex ss-col-center" :class="[state.typeMap[data.textAlign]]" :style="[bgStyle, { marginLeft: `${data.space}px` }]">
		<view class="title-content">
			<!-- 主标题 -->
			<view v-if="data.title" class="title-text" :style="[titleStyles]">{{ data.title }}</view>
			<!-- 副标题 -->
			<view v-if="data.description" :style="[descStyles]" class="sub-title-text">{{ data.description }}</view>
		</view>
		<!-- 查看更多 -->
		<view v-if="data.more?.show" class="more-box ss-flex ss-col-center" @tap="sheep.$router.go(data.more.url)"
			:style="{color: data.descriptionColor}">
			<view class="more-text" v-if="data.more.type !== 'icon'">{{ data.more.text }} </view>
			<text class="_icon-forward" v-if="data.more.type !== 'text'"></text>
		</view>
	</view>
</template>

<script setup>
	/**
	 * 标题栏
	 */
	import {
		reactive,
		computed
	} from 'vue';
	import sheep from '@/sheep';

	// 数据
	const state = reactive({
		typeMap: {
			left: 'ss-row-left',
			center: 'ss-row-center',
		},
	});

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
	// 设置背景样式
	const bgStyle = computed(() => {
		// 直接从 props.styles 解构
		const {
			bgType,
			bgImg,
			bgColor
		} = props.styles;

		// 根据 bgType 返回相应的样式
		return {
			background: bgType === 'img' ? `url(${bgImg}) no-repeat top center / 100% 100%` : bgColor
		};
	});

	// 标题样式
	const titleStyles = {
		color: props.data.titleColor,
		fontSize: `${props.data.titleSize}px`,
		textAlign: props.data.textAlign
	};

	// 副标题
	const descStyles = {
		color: props.data.descriptionColor,
		textAlign: props.data.textAlign,
		fontSize: `${props.data.descriptionSize}px`,
		fontWeight: `${props.data.descriptionWeight}px`,
	};
</script>

<style lang="scss" scoped>
	.ss-title-wrap {
		height: 80rpx;
		position: relative;

		.title-content {
			.title-text {
				font-size: 30rpx;
				color: #333;
			}

			.sub-title-text {
				font-size: 22rpx;
				color: #999;
			}
		}

		.more-box {
			white-space: nowrap;
			font-size: 22rpx;
			color: #999;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 20rpx;
		}
	}
</style>