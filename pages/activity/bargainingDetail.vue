<template>
	<s-layout title='砍价详情'>
		<view class='bargain'>
			<!-- :class="startBargainUid !== userInfo.uid ? 'on' : ''" -->
			<view class="header">
				<navigator url="/pages/activity/bargainingList" hover-class="none">
					<view class="back" style='width: 234rpx;
		height: 54rpx;
		background: linear-gradient(233deg,#ffd169,#fe960f);
		opacity: 1;
		border-radius: 0 26rpx 26rpx 0;
		line-height: 54rpx;
		text-align: center;
		color: #6e3f00;
		font-size: 25rpx;'>
						<text class="iconfont icon-xiangzuo"></text> 返回砍价列表
					</view>
				</navigator>
			</view>
			<view class="pad30" style="padding-bottom: 30rpx;">
				<view class='wrapper'>
					<view class='pictxt acea-row row-between' @tap="goProduct"
						style='display:flex;box-sizing: border-box;'>
						<view class='pictrue'>
							<image :src='state.bargainInfo.picUrl' />
						</view>
						<view class='text acea-row row-column-around' style='margin-left: 10rpx;'>
							<view class='line1'>{{ state.bargainInfo.name }}</view>
							<view class="surplus">最低价：￥{{ fen2yuan(state.bargainInfo.bargainMinPrice) }}</view>
							<view class="surplus">剩余：{{ state.bargainInfo.stock }} {{state.bargainInfo.unitName}}</view>
							<view class='money font-color-red' style='color:red'>
								当前: ￥ <text class='num'>{{ fen2yuan(state.buyPrice) }}</text>
							</view>
							<view class="acea-row" style='display:flex'
								v-if="state.bargainInfo.endTime > new Date().getTime() && state.bargainInfo.stock > 0">
								<s-count-down :tipText="' '" :bgColor="state.bgColor" :dayText="':'" :hourText="':'"
									:minuteText="':'" :secondText="' '" :datatime="state.bargainInfo.endTime / 1000"
									:isDay="true" />
								<text style="font-size: 22rpx;margin-left: 4rpx;line-height: 36rpx;">后结束</text>
							</view>
							<view v-else-if="state.bargainInfo.endTime <= new Date().getTime()">
								<view style="font-size: 22rpx;" @tap='currentBargainUser'>已结束</view>
							</view>
							<view v-else-if="state.bargainInfo.stock <= 0">
								<view style="font-size: 22rpx;" @tap='currentBargainUser'>已售罄</view>
							</view>
						</view>
						<text class="iconfont icon-jiantou iconfonts"></text>
					</view>
				</view>
				<!-- 砍价记录 -->
				<view class='title font-color acea-row row-center-wrapper'>
					<view class='pictrue'>
						<image src='../static/zuo2.png'></image>
					</view>
					<view class="tits">
						<view class='titleCon'>砍价记录</view>
						<view class="line"></view>
					</view>
					<view class='pictrue on'>
						<image src='../static/you2.png'></image>
					</view>
				</view>
				<view class='bargainGang borRadius14'>
					<view class='list' v-if="state.bargainUserHelpList.length > 0">
						<block v-for="(item, index) in state.bargainUserHelpList" :key='index'
							v-if="index < 3 || !state.couponsHidden">
							<view class='item acea-row row-between-wrapper'>
								<view class='pictxt acea-row row-between-wrapper'>
									<view class='pictrue'>
										<image :src='item.avatar' />
									</view>
									<view class='text'>
										<view class='name line1'>{{item.nickname}}</view>
										<view class='line1'>{{ formatDate(item.createTime) }}</view>
									</view>
								</view>
								<view class='money'>
									已砍 <text class="font-color-red">{{ fen2yuan(item.reducePrice) }}</text>元
								</view>
							</view>

						</block>
						<view class="open acea-row row-center-wrapper" @click="openTap"
							v-if="state.bargainUserHelpList.length > 3">
							{{state.couponsHidden?'展开更多':'关闭展开'}}
							<text class="iconfont" :class='state.couponsHidden ? "icon-xiangxia":"icon-xiangshang"' />
						</view>
					</view>
					<view v-if="state.bargainUserHelpList.length === 0" class="contentNo">
						<text class="iconfont icon-xiaolian mr8"></text>
						暂无助力记录
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
		id: '',
		buyPrice: '',
		bargainInfo: {},
		bgColor: {
			'bgColor': '#333333',
			'Color': '#fff',
			'width': '44rpx',
			'timeTxtwidth': '16rpx',
			'isDay': true
		},
		bargainUserHelpList: [],
		couponsHidden: true,
	});


	function getBargainDetails() {
		sheep.$api.activity.getBargainActivityDetail({
			id: state.id
		}).then(res => {
			state.bargainInfo = res.data;
			state.buyPrice = state.bargainInfo.bargainFirstPrice;
			// state.pages = '/pages/activity/goods_bargain_details/index?id=' + state.id +
			// 	'&startBargainUid=' + state.uid + '&scene=' + state.uid + '&storeBargainId=' + state
			// 	.storeBargainId;
			// uni.setNavigationBarTitle({
			// 	title: bargainInfo.name.substring(0, 13) + '...'
			// })

			// 获得拼团记录
			// this.gobargainUserInfo();

			//#ifdef H5
			// this.getImageBase64(bargainInfo.picUrl);
			//#endif
		}).catch(function(err) {
			// 错误了可以跳转回上个页面
		})
	}
	onLoad(function(options) {
		if (options.hasOwnProperty('id')) {
			options.id ? state.id = options.id : state.id = ''
		}
		getBargainDetails()
	})
	// 工具函数
	function fen2yuan(price) {
		return (price / 100.0).toFixed(2)
	}
</script>

<style lang="scss">
	page {
		background-color: red !important;
	}
</style>
<style lang="scss" scoped>
	.userEvaluation {
		i {
			display: inline-block;
		}
	}

	.go {
		color: #E93323;
		text-align: center;
		font-size: 28rpx;
		margin-top: 26rpx;

		.iconfont {
			font-size: 11px
		}
	}

	.poster-pop {
		width: 594rpx;
		height: 850rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		top: 50%;
		margin-top: -466rpx;

		image {
			width: 100%;
			height: 100%;
			display: block;
			border-radius: 10rpx;
		}

		.close {
			text-align: center;
			margin-top: 55rpx;
			color: #fff;
			font-size: 52rpx;
		}

		.save-poster {
			background-color: #df2d0a;
			font-size: ：22rpx;
			color: #fff;
			text-align: center;
			height: 76rpx;
			line-height: 76rpx;
			width: 100%;
		}

		.keep {
			color: #fff;
			text-align: center;
			font-size: 25rpx;
			margin-top: 25rpx;
		}
	}

	.canvas {
		position: fixed;
		opacity: 0;
	}

	.font_hui {
		color: #CCCCCC !important;
	}

	.bg_qian {
		background-color: #F5F5F5 !important;
	}

	.font-color-red {
		font-weight: 800;
	}

	.huiBtn {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		width: 630rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 0 auto;
		background-color: #CCCCCC;
		box-shadow: 0 7rpx 0 #AAAAAA;
		border-radius: 40rpx;
	}

	.huifont {
		color: #CCCCCC;
	}

	.buyBox {
		margin-top: 40rpx;

		.on {
			width: 300rpx;
			height: 80rpx;
			border-radius: 40rpx;
			font-size: 32rpx;
			color: #fff;
			text-align: center;
			line-height: 80rpx;
		}

		.buyNow {
			background: linear-gradient(180deg, #FF8831 0%, #F11B09 100%);
			box-shadow: 0 7rpx 0 #C11100;
		}

		.buyMore {
			background: linear-gradient(180deg, #FFCA52 0%, #FE960F 100%);
			box-shadow: 0 7rpx 0 #D87A00;
		}
	}


	.mr8 {
		margin-right: 8rpx;
	}

	.contentNo {
		width: 100%;
		padding: 50rpx 15rpx;
		text-align: center;
		font-size: 26rpx;
		color: #AAAAAA;
	}

	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 388;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top: 1rpx solid #eee;
	}

	.generate-posters.on {
		transform: translate3d(0, 0, 0);
	}

	.generate-posters .item {
		flex: 1;
		text-align: center;
		font-size: 30rpx;
	}

	.generate-posters .item .iconfont {
		font-size: 80rpx;
		color: #5eae72;
	}

	.generate-posters .item .iconfont.icon-haibao {
		color: #5391f1;
	}

	.bargain .bargainGang {
		background-color: #fff;

		.list {
			padding: 50rpx 30rpx 0 30rpx;
		}

		.open {
			font-size: 24rpx;
			color: #999;
			margin-top: 30rpx;
		}

		.helpNo {
			text-align: center;
			font-size: 26rpx;
			color: #AAAAAA;
		}
	}

	.bargain .bargainGang .open .iconfont {
		font-size: 25rpx;
		margin: 5rpx 0 0 10rpx;
	}

	.bargain .icon-xiangzuo {
		font-size: 24rpx;
		margin-right: 6px;
	}

	.bargain .header {
		/* TODO 芋艿：此处原来采用base64 但是过长编辑到小程序卡死 目前采用网络地址 需解决 */
		background-image: url('https://huizhizao-1314830814.cos.ap-shanghai.myqcloud.com/huizhizao-1314830814/7e9bea1e8bbcd8a7a865a7703d65a1d0b25ec33a4b8d443698ff2e6eccf1300f.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 340rpx;
		margin: 0 auto;
		padding-top: 20rpx;

		.back {
			width: 235rpx;
			height: 54rpx;
			background: linear-gradient(233deg, #FFD169 0%, #FE960F 100%);
			opacity: 1;
			border-radius: 0px 27rpx 27rpx 0px;
			line-height: 54rpx;
			text-align: center;
			color: #6E3F00;
			font-size: 28rpx;
		}

	}

	.bargain .header .pictxt {
		margin: 330rpx auto 0 auto;
		font-size: 26rpx;
		color: #fff;
	}

	.bargain .header .pictxt .pictrue {
		width: 56rpx;
		height: 56rpx;
		margin-right: 30rpx;
	}

	.bargain .header .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2rpx solid #fff;
	}

	.bargain .header .pictxt .text {
		margin-left: 20rpx;
	}

	.bargain .header .pictxt .text text {
		margin-left: 20rpx;
	}

	.bargain .header .time {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAACmCAMAAACfv2reAAAAk1BMVEUAAAD/nSL/oCj/oCj/nSH/nSH/oCj/mhr/mhr/oCj/oCj/oCj/nSH/niT/mhr/mhr/oCj/mhr/oCj/oCj/mhr/niP/oCj/oCj/mhr/////oCj/mhr/nyT/w3f/rkf/rEL/pjT/tlr/xXv/uF3//vz/vmv/wXP/vWr/79r/1aD/05r/wXL/nB//5MH/+/X/t1r/5MP28hXaAAAAGXRSTlMABvndiVtUVPjkOC8Dk+DarKyQC+QH86amYv5b+wAAA6JJREFUeNrs3Nlu4kAQheEyGOywBkImcR8Sh7Avycz7P920G8l3MYtccko63wXc969GXuiS20XJ6ygF1SQdvyaRiL5kDKrZOBFtgxjID7tVRjVZ7Q45EA9EV4z5ntVqttqfEIuqBKevjGr3dUIiiqIZ9hkp2GMWiZ4Ocv5Oqljl6IieCQ4ZqThgInpG2GWkYoeR6EnBX0olK6SiB8hICSAlhjOE4YxiOKMYziiGM4rhjGI4o5TCIWA4PQhqzzcPGE4PMA9q3m0fAcPpKdfYk3o47z1gOD3Ae+A8qUfuLby/C4bTA5zXOPekHktvu11v12uG0wOc13jpybWi7ku75X6yOR43bwHD6QHegmK13U/+tF+6kZS6bVfls8RweoDPkqvS7pZ/lXTVNpvNkTtOW7nj/Gq7avFACrG7YOlt196W4fQA5zVeeu6CWLyu81rT3lP1VWWBV5WKgEVQeVX51Bu2nNcViR7890Of93EKVO7j+iFYJJ1iv/XlEj450QZ8BHJJv9hzHXn0n1M+q2ze9c8qpz7Zo7T9Z4+vdZoHyJV6Pllbin0XMVzzrg/37JO1xHl8kfoLAHIt5zHcb8FwRjGcUQxnFMMZdU84HrNq3jdSxXBjHmzUssPo9nA8Sty8Aya3h+Ph/caFw/s3h+O4jMbtMXtWDCcJTv8yqqQ/oKYMx5FQDSpHQumGGww5hK1e32EI23BwTziOPWzYOBFRDydRZ8JBo/VJR5NOJHeGI1MYziiGM4rhjGI4oxjOKIYziuGMYjijGM4ohjOK4YxiOKMYziiGM4rhjGI4oxjOKIYziuH+s0cHJAAAAACC/r9uR6AXnBI3JW5K3JS4KXFT4qbETYmbEjclbkrclLgpcVPipsRNiZsSNyVuStyUuClxU+KmxE2JmxI3JW5K3JS4KXFT4qbETYmbEjclbkrclLgpcVPipsRNiZsSNyVuStyUuClxU+KmxE2JmxI3JW5K3JS4KXFT4qbETYmbEjclbkrclLgpcVPipsRNiZsSNyVuStyUuClxtUdHJwzDUAxFZTs2xInBxLQf2n/QvrTQGSLQ+ZAGuKIcTpTDiXI4UQ4nyuFEOZwohxPlcKIcTpTDiXI4UQ4nyuFEOZwohxPlcKIcThQD3jEJJmSRzCixHSakkyyYsRdMyCA5UWPzAZNxZJIVaY/bXU7G8Q32AhpDvvqCPd7qIzM0hI0mZsPtHDQp48RPKzQZpeEv1Vky7fFymTXh9gGY1gZJcqJI8QAAAABJRU5ErkJggg==');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 440rpx;
		height: 166rpx;
		margin: 0 auto;

		font-size: 22rpx;
		text-align: center;
		padding-top: 11rpx;
		box-sizing: border-box;
	}

	.bargain .header .time .red {
		color: #fc4141;
	}

	.bargain .header .people {
		text-align: center;
		color: #fff;
		font-size: 20rpx;
		position: absolute;
		width: 85%;
		/* #ifdef MP */
		height: 44px;
		line-height: 44px;
		top: 40rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 58rpx;
		/* #endif */
	}

	.bargain .header .time text {
		color: #333;
	}

	.bargain {
		.wrapper {
			margin-top: -100rpx;

			.pictxt {
				width: 100%;
				height: 260rpx;
				background-color: #FFF5E6;
				padding: 20rpx;
				border-radius: 14rpx;
			}

			.surplus {
				color: #999999;
				font-size: 22rpx;
			}
		}

		.content {
			width: 100%;
			height: auto;
			background-image: url('../static/zhuangshi.png');
			background-size: 100% 100%;
			background-color: #fff;
			border-bottom-left-radius: 14rpx;
			border-bottom-right-radius: 14rpx;
			padding: 40rpx 0 70rpx 0;

			.money {
				color: #333333;
				font-size: 36rpx;

				.price {}
			}
		}
	}


	.bargain .wrapper,
	{
	// background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAAF8CAYAAAAzc1jZAAAco0lEQVR4Xu3dW4zc513H4feddWynQU1FY69zKvZuysENPqx7SFFRU4JEi+ACCVUUiQsuqYQ4VIWCchEuoAIFqRdI5QrlgkNLqQpSJA5VSWkKqKK7DkKuqIQ3RnUTe40CJRSSNDt/ZEeF1LGTmdnffuP1PLntzPf3n2fm4tMoTnrzFwECBAgQIECAAIEdKNB34DN7ZAIECBAgQIAAAQJNyPoRECBAgAABAgQI7EgBIbsjvzYPTYAAAQIECBAgIGT9BggQIECAAAECBHakgJDdkV+bhyZAgAABAgQIEBCyfgMECBAgQIAAAQI7TuD8iaX3C9kd97V5YAIECBAgQIDA/AoMrfWNlUO/2frog0J2fn8HPjkBAgQIECBAYEcJDHfdtWfj5vHvt9Z//OKDC9kd9fV5WAIECBAgQIDAfApsHN73bW3vax8eenvnNwWE7Hz+FnxqAgQIECBAgMCOETj73be/ftdr9vx57/0tL35oIbtjvkIPSoAAAQIECBCYP4GzR26/Y/euvX819PY9l396ITt/vwefmAABAgQIECCwIwS+evdtd+7ac+MjrbXlKz2wkN0RX6OHJECAAAECBAjMl8CTxw4eHC0sfKa1tnS1Ty5k5+s34dMSIECAAAECBK55gSdOLL1h1Prne2t3vtzDCtlr/qv0gAQIECBAgACB+RG4+Ae7dr9m76NX+mdiL1cQsvPzu/BJCRAgQIAAAQLXtMC5I4s39Rtu+uvW+lsneVAhO4mS1xAgQIAAAQIECGyrwNDaro2V5Ydbbz806SEhO6mU1xEgQIAAAQIECGybwMbK0u8Nvf/0NAeE7DRaXkuAAAECBAgQIFAusHFi6UND6x+edljITivm9QQIECBAgAABAmUCF1aWfmTc2p+13kfTjgrZacW8ngABAgQIECBAoERg49jSG4eF/sXW2mtnGRSys6h5DwECBAgQIECAwJYETh1uu/fduPz3Q2srsw4J2VnlvI8AAQIECBAgQGBmgfPHlx9so/aBmQdaa0J2K3reS4AAAQIECBAgMLXAuZWD9/Q++nxrfWHqN7/oDUJ2K3reS4AAAQIECBAgMJXA0FrfWFn+Yuuz/yMF3zwoZKei92ICBAgQIECAAIGtCFw4tvST44X+B1vZELIVejYIECBAgAABAgSmEji/svx3rbe3T/Wmq7zY35GtULRBgAABAgQIECAwscCFo0vfubkwvre30duH3t7cW7974je/6IVCdhY17yFAgAABAgQIECgTePL4gX297b2v99G9rbd7W+vfNcm4kJ1EyWsIECBAgAABAgRiAufvPrTYb2jfP4zakdZGR/owvHPo/XWXP4CQjX0lDhEgQIAAAQIECMwiMLQ2unD0O44Ou0b39WF039CHt7bWv13IzqLpPQQIECBAgAABAq+qwLkTB98mZF/Vr8BxAgQIECBAgACBWQX6V+6448Y7z579n1kHvI8AAQIECBAgQIDAqyHQz60sf3bh61/70X1f/renX40HcJMAAQIECBAgQIDALAL9/InloQ3DF/ozT//g/i9d+K9ZRryHAAECBAgQIECAQFrghZC9+NcwPNqfefqHxWz6K3CPAAECBAgQIEBgFoH/D9kXavbT+1fX39Nb25xlzHsIECBAgAABAgQIpAQuC9mLf2N2+MiBtfVfSD2AOwQIECBAgAABAgRmEXhJyF4cGY0337fv5JmPzTLoPQQIECBAgAABAgQSAlcM2TYMX1/4xvjNt/zTmX9OPIQbBAgQIECAAAECBKYVuHLIttb6MPzDqbX173tXa89PO+r1BAgQIECAAAECBLZb4Kohe/HwMLRfP7B2+v7tfgj7BAgQIECAAAECBKYVeNmQbW3Y3BwPP3Dbycc/N+2w1xMgQIAAAQIECBDYToFXCNlLf1/2y//5tfWjb/yX9ux2PohtAgQIECBAgAABAtMITBCyl/4ZgwcW19Z/bZphryVAgAABAgQIECCwnQKThWxr3xi15+/Zt/qva9v5MLYJECBAgAABAgQITCowache/INfq59bO/229/qvfk1q63UECBAgQIAAAQLbKDBxyF56hvHw/sWT6x/dxucxTYAAAQIECBAgQGAigelCdhj+/blnn7vrzlNnn5po3YsIECBAgAABAgQIbJPAdCH7wr9b9ncOrJ3+2W16HrMECBAgQIAAAQIEJhKYOmR7a8+P2ub33rLqP187kbAXESBAgAABAgQIbIvADCE7fGW82T504LH1P9yWJzJKgAABAgQIECBAYAKBiUK2D+2r42H8yfG4f+LWf1z/297aMMG2lxAgQIAAAQIECBDYNoGXCdnhfBvaJ/swfHzfyccfFa/b9h0YJkCAAAEC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');
	// babackground-repeat: no-repeat;
	// background-size: 100% 100%;
	width: 100%;
	background-color: #fff;
	padding: 0 24rpx 10rpx 24rpx;
	box-sizing: border-box;
	}

	.bargain .pictxt .pictrue {
		width: 220rpx;
		height: 220rpx;
		position: relative;
	}

	.bargain .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.bargain .pictxt .text {
		font-size: 30rpx;
		color: #333333;

		.line1 {
			width: 324rpx;
		}
	}

	.bargain .pictxt .text .money {
		font-weight: bold;
		font-size: 24rpx;
	}

	.bargain .pictxt .text .money .num {
		font-size: 36rpx;
	}

	.bargain .pictxt .text .successNum {
		font-size: 22rpx;
		color: #999;
	}

	.bargain .cu-progress {
		overflow: hidden;
		height: 12rpx;
		background-color: #FDEAE8;
		width: 560rpx;
		height: 20rpx;
		border-radius: 20rpx;
		margin: 20rpx auto;
	}

	.bargain .cu-progress .bg-red {
		width: 0;
		height: 100%;
		transition: width 0.6s ease;
		border-radius: 20rpx;
		background-image: linear-gradient(to right, #ffa363 0%, #e93323 100%);
	}

	.bargain .money {
		// font-size: 22rpx;
		// color: #999;
		// margin-top: 40rpx;

	}

	.bargain .bargainSuccess {
		font-size: 26rpx;
		color: #333333;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 40rpx;

		image {
			width: 48rpx;
			height: 62rpx;
			margin-right: 18rpx;
		}
	}

	.bargain .bargainSuccess .iconfont {
		font-size: 45rpx;
		color: #54c762;
		padding-right: 18rpx;
		vertical-align: -5rpx;
	}

	.bargain .bargainBnt {

		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		width: 630rpx;
		height: 80rpx;
		background-image: url('../static/btn.png');
		background-size: 100% 100%;
		// border-radius: 40rpx;
		// background: linear-gradient(180deg, #FF8831 0%, #F11B09 100%);
		text-align: center;
		line-height: 80rpx;
		margin: 0 auto;
	}

	.bargain .bargainBnt.on {
		border: 2rpx solid red;
		color: red;
		background-image: linear-gradient(to right, #fff 0%, #fff 100%);
		width: 596rpx;
		height: 76rpx;
	}

	.bargain .bargainBnt.grey {
		color: #fff;
		background-image: linear-gradient(to right, #bbbbbb 0%, #bbbbbb 100%);
	}

	.bargain .tip {
		font-size: 22rpx;
		color: #999;
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 50rpx;
	}

	.bargain .lock,
	.bargain .bargainGang .lock,
	.bargain .goodsDetails .lock {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiQAAABCCAYAAABnwc0eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4YmQzMTQ1Ny01MGY2LWFmNDMtYmY4Yi1kNWRjZTMxZDg5MTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0RCMkU3QUEzQzBCMTFFOUI2N0VEOEJBMDUwMTU2ODMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0RCMkU3QTkzQzBCMTFFOUI2N0VEOEJBMDUwMTU2ODMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDRmMWQxNmItZTIxMC1lYzQwLWJmODYtYzE4OWRiYzNmOGYyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhiZDMxNDU3LTUwZjYtYWY0My1iZjhiLWQ1ZGNlMzFkODkxNSIv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');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 548rpx;
		height: 66rpx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -43rpx;
		z-index: 5;
	}

	.bargain .title {
		font-size: 40rpx;
		font-weight: 600;
		// height: 80rpx;
		// margin-top: 30rpx;
	}

	.bargain .title .pictrue {
		width: 60rpx;
		height: 60rpx;
	}

	.bargain .title .pictrue.on,
	.bargain .title .pictrue.on {
		transform: rotate(180deg);
	}

	.bargain .title .pictrue image,
	.bargain .title .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.bargain .title .tits {
		margin: 50rpx 15rpx 40rpx 15rpx;
	}

	.bargain .title .titleCon {
		margin: 0 10rpx -14rpx 10rpx;
		color: #fff;
		border: 16rpx solid linear-gradient(0deg, #FFD136 0%, rgba(255, 213, 72, 0.12) 100%);
		;
	}

	.bargain .title .line {
		// width: 216rpx;
		height: 16rpx;
		background: linear-gradient(0deg, #FFD136 0%, rgba(255, 213, 72, 0.12) 100%);
		opacity: 0.6;
	}

	.bargain .bargainGang .list .item {
		padding-bottom: 50rpx;
	}

	.bargain .bargainGang .list .item .pictxt {

		// width: 310rpx;
		.num {
			width: 28rpx;
			height: 36rpx;

			// image{
			// 	width: 100%;
			// 	height: 100%;
			// }
		}

		.num1 {
			background-image: url(../static/n1.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.num2 {
			background-image: url(../static/n2.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.num3 {
			background-image: url(../static/n3.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
	}

	.bargain .bargainGang .list .item .pictxt .pictrue {
		width: 70rpx;
		height: 70rpx;
		margin-right: 14rpx;
	}

	.bargain .bargainGang .list .item .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.bargain .bargainGang .list .item .pictxt .text {
		width: 225rpx;
		font-size: 20rpx;
		color: #999;
	}

	.bargain .bargainGang .list .item .pictxt .text .name {
		font-size: 25rpx;
		color: #333333;
		margin-bottom: 7rpx;
	}

	.bargain .bargainGang .list .item .money {
		font-size: 25rpx;
		color: #999999;
	}

	.bargain .bargainGang .list .item .money .iconfont {
		font-size: 35rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.bargain .bargainGang .load {
		font-size: 24rpx;
		text-align: center;
		line-height: 80rpx;
		height: 80rpx;
	}

	.bargain .goodsDetails {
		width: 100%;
		background-color: #fff;
		//margin: 13rpx auto 0 auto;
	}

	.bargain .goodsDetails~.goodsDetails {
		margin-bottom: 50rpx;
	}

	.bargain .goodsDetails .conter {
		// margin-top: 20rpx;
		overflow: hidden;
	}

	.bargain .goodsDetails .conter image {
		width: 100% !important;
		display: block !important;
	}

	.bargain .bargainTip {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 500rpx;
		height: 469rpx;
		margin-left: -246rpx;
		z-index: 111;
		border-radius: 14rpx;
		background-color: #fff;
		transition: all 0.3s ease-in-out 0s;
		opacity: 0;
		transform: scale(0);
		padding-bottom: 60rpx;
		margin-top: -330rpx;
		background: linear-gradient(180deg, #FFFFFF 0%, #FFEEEB 100%);

		.cu-progress {
			width: 410rpx;
			margin: 0 auto;
		}

		.t1 {
			text-align: center;
			color: #666666;
			font-size: 24rpx;
			margin: 20rpx 0 54rpx 0;
		}

		.bubbleBox {
			width: 410rpx;
			margin: 16rpx auto;

			.bubble {
				position: relative;
				display: inline-block;

				text {
					display: inline-block;
					font-size: 22rpx;
					padding: 2rpx 8rpx;
					border-radius: 30rpx;
					background-color: #E93323;
					color: #fff;
				}

				text::before {
					content: '';
					width: 0;
					height: 32rpx;
					border: 14rpx solid;
					position: absolute;
					bottom: -54rpx;
					left: 14rpx;
					border-color: #E93323 transparent transparent;
				}
			}

		}

	}

	.bargain .bargainTip.on {
		opacity: 1;
		transform: scale(1);
	}

	.bargain .bargainTip .pictrue {
		width: 500rpx;
		height: 200rpx;
		margin-top: -118rpx;
	}

	.bargain .bargainTip .pictrue image {
		width: 100%;
		height: 100%;
	}

	.bargain .bargainTip .cutOff {
		font-size: 32rpx;
		color: #333;
		text-align: center;
		margin: 12rpx 0 0rpx 0;
		font-weight: 600;

		text {
			font-weight: 600;
			font-size: 44rpx;
		}
	}

	.bargain .bargainTip .cutOff.on {
		margin-top: 26rpx;
	}

	.bargain .bargainTip .help {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 40rpx;
	}

	.bargain .bargainTip .tipBnt {
		font-size: 32rpx;
		color: #fff;
		width: 360rpx;
		height: 82rpx;
		border-radius: 41rpx;
		background-image: linear-gradient(to right, #f67a38 0%, #f11b09 100%);
		text-align: center;
		line-height: 82rpx;
		margin: 0 auto;
	}

	.bargain_view {
		width: 180rpx;
		height: 48rpx;
		background: rgba(0, 0, 0, 0.5);
		opacity: 1;
		border-radius: 0 0 6rpx 6rpx;
		position: absolute;
		bottom: 0;
		font-size: 22rpx;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
	}

	.iconfonts {
		font-size: 22rpx !important;
		line-height: 220rpx;
	}

	.wxParse-div {
		width: auto !important;
		height: auto !important;
	}

	.bargain .mask {
		z-index: 100;
	}

	.share-box {
		z-index: 1000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>