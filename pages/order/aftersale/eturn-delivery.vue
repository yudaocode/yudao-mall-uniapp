<template>
	<s-layout>
		<!-- title='退货物流' -->
		<!-- 不知为何加上页面就错误 -->
		<view>
			<form @submit="subRefund" report-submit='true'>
				<view class='apply-return'>
					<view class='list borRadius14'>
						<view class='item acea-row row-between-wrapper' style="display: flex;align-items: center;">
							<view>物流公司</view>
							<picker mode='selector' class='num' @change="bindPickerChange" :value="state.expressIndex"
								:range="state.expresses" range-key="name">
								<view class="picker acea-row row-between-wrapper">
									<view class='reason'>{{ state.expresses[state.expressIndex].name }}</view>
									<text class='iconfont icon-jiantou'></text>
								</view>
							</picker>
						</view>
						<view class='item textarea acea-row row-between' style="display: flex;align-items: center;">
							<view>物流单号</view>
							<input placeholder='请填写物流单号' class='num' name="logisticsNo"
								placeholder-class='placeholder' />
						</view>
						<button class='returnBnt bg-color ss-reset-button ui-BG-Main-Gradient sub-btn'
							form-type="submit"
							style="background: linear-gradient(90deg,var(--ui-BG-Main),var(--ui-BG-Main-gradient))!important">提交</button>
					</view>
				</view>
			</form>
		</view>
	</s-layout>
</template>

<script setup>
	import sheep from '@/sheep';
	import {
		onLoad,
		onReachBottom,
		onPullDownRefresh
	} from '@dcloudio/uni-app';
	import {
		computed,
		watch,
		ref,
		reactive,
		unref
	} from 'vue';
	const state = reactive({
		expressIndex: 0,
		expresses: [{
				"id": 1,
				"name": "申通快递"
			},
			{
				"id": 2,
				"name": "顺丰速运"
			},
			{
				"id": 3,
				"name": "中通快递"
			},
			{
				"id": 4,
				"name": "韵达快递"
			}
		], //模拟物流公司数组
	})

	function bindPickerChange(e) {
		state.expressIndex = e.detail.value;
	}

	function subRefund(e) {
		const formData = e.detail.value;
		console.log(formData, '表单数据');
		console.log(state.expresses[state.expressIndex].id, '物流公司id');
		return;
		// 下面是参考逻辑
		AfterSaleApi.deliveryAfterSale({
			id: this.id,
			logisticsId: this.expresses[this.expressIndex].id,
			logisticsNo: formData.logisticsNo,
		}).then(res => {
			this.$util.Tips({
				title: '填写退货成功',
				icon: 'success'
			}, {
				tab: 5,
				url: '/pages/users/user_return_detail/index?id=' + this.id
			});
		}).catch(err => {
			return this.$util.Tips({
				title: err
			});
		})
	}

	function getList() {

	}
	onLoad(() => {
		// 拿退货编号
	})
</script>

<style lang="scss" scoped>
	.apply-return {
		padding: 20rpx 30rpx 70rpx 30rpx;
	}

	.apply-return .list {
		background-color: #fff;
		margin-top: 18rpx;
		padding: 0 24rpx 70rpx 24rpx;
	}

	.apply-return .list .item {
		min-height: 90rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 30rpx;
		color: #333;
	}

	.apply-return .list .item .num {
		color: #282828;
		margin-left: 27rpx;
		// width: 227rpx;
		// text-align: right;
	}

	.apply-return .list .item .num .picker .reason {
		width: 385rpx;
	}

	.apply-return .list .item .num .picker .iconfont {
		color: #666;
		font-size: 30rpx;
		margin-top: 2rpx;
	}

	.apply-return .list .item.textarea {
		padding: 24rpx 0;
	}

	.apply-return .list .item textarea {
		height: 100rpx;
		font-size: 30rpx;
	}

	.apply-return .list .item .placeholder {
		color: #bbb;
	}

	.apply-return .list .item .title {
		height: 95rpx;
		width: 100%;
	}

	.apply-return .list .item .title .tip {
		font-size: 30rpx;
		color: #bbb;
	}

	.apply-return .list .item .upload {
		padding-bottom: 36rpx;
	}

	.apply-return .list .item .upload .pictrue {
		border-radius: 14rpx;
		margin: 22rpx 23rpx 0 0;
		width: 156rpx;
		height: 156rpx;
		position: relative;
		font-size: 24rpx;
		color: #bbb;
	}

	.apply-return .list .item .upload .pictrue:nth-of-type(4n) {
		margin-right: 0;
	}

	.apply-return .list .item .upload .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 14rpx;
	}

	.apply-return .list .item .upload .pictrue .icon-guanbi1 {
		position: absolute;
		font-size: 45rpx;
		top: -10rpx;
		right: -10rpx;
	}

	.apply-return .list .item .upload .pictrue .icon-icon25201 {
		color: #bfbfbf;
		font-size: 50rpx;
	}

	.apply-return .list .item .upload .pictrue:nth-last-child(1) {
		border: 1rpx solid #ddd;
		box-sizing: border-box;
	}

	.apply-return .returnBnt {
		font-size: 32rpx;
		color: #fff;
		width: 100%;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		margin: 43rpx auto;
	}
</style>