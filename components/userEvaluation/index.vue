<template>
	<view class="evaluateWtapper" v-if="reply.length > 0">
		<view class="evaluateItem" v-for="(item, index) in reply" :key="index">
			<view class="pic-text acea-row">
				<view class="pictrue">
					<image :src="item.userAvatar"></image>
				</view>
				<view class="content">
					<view>
						<view class="acea-row row-between">
							<view class="acea-row">
								<view class="name line1">{{ item.userNickname }}</view>
								<view class="start" :class="'star' + item.scores"></view>
							</view>
							<view class="time">{{ formatDate(item.createTime) }}</view>
						</view>
						<view class="sku">规格：
              <text v-for="(property, propertyIndex) in item.skuProperties" :key="propertyIndex" style="padding-right: 2px">
                {{ property.valueName }}
              </text>
            </view>
					</view>
					<view class="evaluate-infor">{{ item.content }}</view>
					<view class="imgList acea-row" v-if="item.picUrls && item.picUrls.length > 0">
						<view class="pictrue" v-for="(picUrl, indexn) in item.picUrls" :key="indexn">
							<image :src="picUrl" class="image" @click='getpreviewImage(index, indexn)'></image>
						</view>
					</view>
					<view class="reply" v-if="item.replyContent">
						<text class="font-color">店小二</text>：{{ item.replyContent }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
  import dayjs from "@/plugin/dayjs/dayjs.min.js";
	export default {
		props: {
			reply: {
				type: Array,
				default: []
			}
		},
		data: function() {
			return {};
		},
		methods: {
			getpreviewImage: function(indexw, indexn) {
				uni.previewImage({
					urls: this.reply[indexw].picUrls,
					current: this.reply[indexw].picUrls[indexn]
				});
			},
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      }
		}
	}
</script>
<style scoped lang='scss'>
	.evaluateWtapper .evaluateItem {
		background-color: #fff;
		padding: 24rpx;
		border-bottom-left-radius: 14rpx;
		border-bottom-right-radius: 14rpx;
	}

	.evaluateWtapper .evaluateItem~.evaluateItem {
		border-top: 1rpx solid #f5f5f5;
	}

	.evaluateWtapper .evaluateItem .pic-text {
		font-size: 26rpx;
		color: #282828;
		.content{
			width: 84%;
			margin-left: 20rpx;
		}
	}

	.evaluateWtapper .evaluateItem .pic-text .pictrue {
		width: 62rpx;
		height: 62rpx;
	}

	.evaluateWtapper .evaluateItem .pic-text .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.evaluateWtapper .evaluateItem .pic-text .name {
		max-width: 450rpx;
	}

	.evaluateWtapper .evaluateItem .time {
		font-size: 24rpx;
		color: #999999;

	}
	.sku{
		font-size: 24rpx;
		color: #999999;
		margin: 10rpx 0;
	}
	.evaluateWtapper .evaluateItem .evaluate-infor {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 14rpx;
	}

	.evaluateWtapper .evaluateItem .imgList {/*
		padding: 0 24rpx;
		margin-top: 16rpx; */
	}

	.evaluateWtapper .evaluateItem .imgList .pictrue {
		width: 102rpx;
		height: 102rpx;
		margin-right: 14rpx;
		border-radius: 14rpx;
		margin-bottom: 16rpx;
		/* margin: 0 0 15rpx 15rpx; */
	}

	.evaluateWtapper .evaluateItem .imgList .pictrue image {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		border-radius: 14rpx;
	}

	.evaluateWtapper .evaluateItem .reply {
		font-size: 26rpx;
		color: #454545;
		background-color: #f7f7f7;
		border-radius: 14rpx;
		margin: 20rpx 30rpx 0 0rpx;
		padding: 20rpx;
		position: relative;
	}

	.evaluateWtapper .evaluateItem .reply::before {
		content: "";
		width: 0;
		height: 0;
		border-left: 20rpx solid transparent;
		border-right: 20rpx solid transparent;
		border-bottom: 30rpx solid #f7f7f7;
		position: absolute;
		top: -14rpx;
		left: 40rpx;
	}
</style>
