<template>
	<view v-if="template">
		<s-layout title="首页" navbar="custom" tabbar="/pages/index/index" :bgStyle="template.style?.background"
			:navbarStyle="template.style?.navbar" onShareAppMessage>
			<s-block v-for="(item, index) in template.data" :key="index" :styles="item.style">
				<s-block-item :type="item.type" :data="item.data" :styles="item.style" />
			</s-block>
			<!-- 广告模块 -->
			<s-popup-image />
		</s-layout>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue';
	import {
		onLoad,
		onPageScroll,
		onPullDownRefresh
	} from '@dcloudio/uni-app';
	import sheep from '@/sheep';
	import $share from '@/sheep/platform/share';
	import index2Api from '@/sheep/api/index2';
	// 隐藏原生tabBar
	uni.hideTabBar();

	const template = computed(() => sheep.$store('app').template?.home);
	// 在此处拦截改变一下首页轮播图 此处先写死后期复活
	(async function() {
		let {
			data
		} = await index2Api.decorate();
		template.value.data[0].data.list = JSON.parse(data[0].value).map(item => {
			return {
				src: item.picUrl,
				url: item.url,
				title: item.name,
				type: "image"
			}
		})
	}())

	onLoad((options) => {
		// #ifdef MP
		// 小程序识别二维码
		if (options.scene) {
			const sceneParams = decodeURIComponent(options.scene).split('=');
			options[sceneParams[0]] = sceneParams[1];
		}
		// #endif

		// 预览模板
		if (options.templateId) {
			sheep.$store('app').init(options.templateId);
		}

		// 解析分享信息
		if (options.spm) {
			$share.decryptSpm(options.spm);
		}

		// 进入指定页面(完整页面路径)
		if (options.page) {
			sheep.$router.go(decodeURIComponent(options.page));
		}

		// TODO 芋艿：测试接口的调用
		sheep.$api.app.test();
	});

	// 下拉刷新
	onPullDownRefresh(() => {
		sheep.$store('app').init();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 800);
	});

	onPageScroll(() => {});
</script>

<style></style>