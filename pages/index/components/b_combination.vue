<template>
	<view :class="{borderShow: false}">
		<view class="combination" v-if="combinationList.length">
			<view class="title acea-row row-between">
				<view class="spike-bd">
					<view v-if="assistUserList.length > 0" class="activity_pic">
						<view v-for="(item,index) in assistUserList" :key="index" class="picture"
							:style='index===2?"position: relative":"position: static"'>
							<span class="avatar" :style='"background-image: url("+item+")"'></span>
							<span v-if="index===2 && Number(assistUserCount) > 3" class="mengceng">
								<i>···</i>
							</span>
						</view>
						<text class="pic_count">{{ assistUserCount }}人参与</text>
					</view>
				</view>
				<navigator url="/pages/activity/goods_combination/index" hover-class="none"
					class="more acea-row row-center-wrapper">
          GO<text class="iconfont icon-xiangyou"></text>
        </navigator>
			</view>
			<view class="conter acea-row">
				<scroll-view scroll-x="true" style="white-space: nowrap; vertical-align: middle;"
					show-scrollbar="false">
					<view class="itemCon" v-for="(item, index) in combinationList" :key="index" @click="goDetail(item)">
						<view class="item">
							<view class="pictrue">
								<image :src="item.picUrl" />
							</view>
							<view class="text lines1">
								<view class="name line1">{{ item.name }}</view>
								<view class="money">¥<text class="num">{{ fen2yuan(item.combinationPrice) }}</text></view>
								<view class="y_money">¥{{ fen2yuan(item.marketPrice) }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
  let app = getApp();
  import * as CombinationApi from '@/api/promotion/combination.js';
  import * as Util from '@/utils/util.js';
  export default {
		name: 'b_combination',
		data() {
			return {
				combinationList: [], // 拼团列表（由团长发起的）
				assistUserList: [], // 拼团用户头像列表
				assistUserCount: 0 // 拼团用户数量
			};
		},
		created() {
      // 获得拼团列表
      CombinationApi.getCombinationActivityList(6).then((res) => {
        this.combinationList = res.data;
      }).catch((res) => {
        return this.$util.Tips({
          title: res
        });
      })

      // 获得拼团概要
      CombinationApi.getCombinationSummary().then((res) => {
        this.assistUserList = res.data.avatars;
        this.assistUserCount = res.data.userCount;
      }).catch((res) => {
        return this.$util.Tips({
          title: res
        });
      })
		},
		methods: {
			goDetail(item) {
				uni.navigateTo({
					url: `/pages/activity/goods_combination_details/index?id=${item.id}`
				})
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      }
		}
	}
</script>

<style lang="scss" scoped>
	.mengceng {
		width: 38rpx;
		height: 38rpx;
		line-height: 36rpx;
		background: rgba(51, 51, 51, 0.6);
		text-align: center;
		border-radius: 50%;
		opacity: 1;
		position: absolute;
		left: 0px;
		top: 2rpx;
		color: #FFF;
		i{
			font-style: normal;
			font-size: 20rpx;
		}
	}

	.activity_pic {
		margin-left: 28rpx;
		padding-left: 20rpx;

		.picture {
			display: inline-block;
		}

		.avatar {
			width: 38rpx;
			height: 38rpx;
			display: inline-table;
			vertical-align: middle;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			border-radius: 50%;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 0 0;
			margin-right: -10rpx;
			box-shadow: 0 0 0 1px #fff;
		}

		.pic_count {
			margin-left: 30rpx;
			color: $theme-color;
			font-size: 22rpx;
			font-weight: 500;
		}
	}

	.default {
		width: 690rpx;
		height: 300rpx;
		border-radius: 14rpx;
		margin: 26rpx auto 0 auto;
		background-color: #ccc;
		text-align: center;
		line-height: 300rpx;

		.iconfont {
			font-size: 80rpx;
		}
	}

	.combination {
		width: auto;
		background-color: #fff;
		border-radius: 14rpx;
		margin: 0 auto 30rpx auto;
		padding: 16rpx 24rpx 24rpx 24rpx;
		background-image: url(../../../static/images/pth.png);
		background-repeat: no-repeat;
		background-size: 100%;

		.title {
			width: 80%;
			margin-left: 128rpx;

			.sign {
				width: 40rpx;
				height: 40rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				font-size: 32rpx;
				color: #282828;
				margin-left: 12rpx;
				font-weight: bold;

				text {
					color: #797979;
					font-size: 24rpx;
					font-weight: 400;
					margin-left: 14rpx;
				}
			}

			.more {
				width: 86rpx;
				height: 40rpx;
				background: linear-gradient(142deg, #FFE9CE 0%, #FFD6A7 100%);
				opacity: 1;
				border-radius: 18px;
				font-size: 22rpx;
				color: #FE960F;
				padding-left: 8rpx;
                 font-weight: 800;
				.iconfont {
					font-size: 21rpx;
				}
			}
		}

		.conter {
			margin-top: 24rpx;

			.itemCon {
				display: inline-block;
				width: 220rpx;
				margin-right: 24rpx;
			}

			.item {
				width: 100%;

				.pictrue {
					width: 100%;
					height: 220rpx;
					border-radius: 6rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 6rpx;
					}
				}

				.text {
					margin-top: 4rpx;

					.y_money {
						font-size: 24rpx;
						color: #999999;
						text-decoration: line-through;
					}

					.name {
						font-size: 24rpx;
						color: #000;
						margin-top: 14rpx;
					}

					.money {
						color: #FD502F;
						font-size: 28rpx;
						height: 100%;
						font-weight: bold;
						margin: 10rpx 0 0rpx 0;

						.num {
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}
</style>
