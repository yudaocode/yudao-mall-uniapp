<template>
	<view class="orderGoods borRadius14">
		<view class='total'>共{{ totalNmu }}件商品</view>
		<view class='goodWrapper pad30'>
			<view class='item acea-row row-between-wrapper' v-for="(item,index) in cartInfo" :key="index"
				@click="jumpCon(item.spuId)">
				<view class='pictrue'>
					<image :src='item.picUrl' />
				</view>
				<view class='text'>
					<view class='acea-row row-between-wrapper'>
						<view class='name line1'>{{ item.spuName }}</view>
						<view class='num'>x {{ item.count }}</view>
					</view>
					<view class='attr line1'>
            <text v-for="(property, propertyIndex) in item.properties" :key="propertyIndex" style="padding-right: 10rpx;">
              {{ property.valueName }}　
            </text>
          </view>
					<view class='money font-color'>￥{{ fen2yuan(item.price) }}</view>
          <!-- 评价状态 -->
					<view class='evaluate' v-if='item.replyStatus === false && evaluate === 2' @click.stop="evaluateTap(item)">
            评价
					</view>
					<view class='evaluate' v-else-if="item.replyStatus === true">已评价</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
  import * as Util from '@/utils/util.js';
	export default {
		props: {
			evaluate: {
				type: Number,
				default: 0, // 是否开启评价功能 0 - 不开启；2 - 开启
			},
			cartInfo: {
				type: Array,
				default: function() {
					return [];
				}
			},
			orderId: {
				type: String,
				default: '',
			},
			jump: {
				type: Boolean,
				default: false,
			},
			productType: {
				type: Number,
				default: function() {
					return 0;
				}
			}
		},
		data() {
			return {
				totalNmu: 0 // 商品数量
			};
		},
		watch: {
			cartInfo: function(nVal, oVal) {
				let num = 0
				nVal.forEach((item, index) => {
					num += item.count
				})
				this.totalNmu = num
			}
		},
		methods: {
      // TODO 芋艿：评价
			evaluateTap(item) {
				uni.navigateTo({
					url: "/pages/users/goods_comment_con/index?unique=" + item.attrId + "&orderId=" + this.orderId + '&id=' + item.id
				})
			},
			jumpCon: function(id) {
				let type = this.productType === 0 ?'normal':'video'
				if (this.jump) {
					uni.navigateTo({
						url: `/pages/goods_details/index?id=${id}&type=${type}`
					})
				}
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
		}
	}
</script>
<style scoped lang="scss">
	.orderGoods {
		background-color: #fff;
		margin-top: 15rpx;
	}

	.orderGoods .total {
		width: 100%;
		height: 86rpx;
		padding: 0 24rpx;
		border-bottom: 2rpx solid #f0f0f0;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		box-sizing: border-box;
	}

	.pictrue image {
		background: #f4f4f4;
	}
</style>
