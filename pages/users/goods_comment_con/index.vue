<template>
	<view>
		<form @submit="formSubmit" report-submit='true'>
			<view class='evaluate-con pad30'>
				<view class='goodsStyle acea-row row-between borRadius14'>
					<view class='pictrue'>
						<image :src='orderItem.picUrl'></image>
					</view>
					<view class='text acea-row row-between'>
						<view>
							<view class='name line2'>{{ orderItem.spuName }}</view>
							<view class='attr line1'>
                <text v-for="(property, propertyIndex) in orderItem.properties" :key="propertyIndex" style="padding-right: 10rpx;">
                  {{ property.valueName }}　
                </text>
              </view>
						</view>
						<view class='money'>
							<view>￥{{ fen2yuan(orderItem.price) }}</view>
							<view class='num'>x{{ orderItem.count }}</view>
						</view>
					</view>
				</view>
				<view class='score borRadius14'>
					<view class='item acea-row row-middle' v-for="(item,indexw) in scoreList" :key="indexw">
						<view>{{item.name}}</view>
						<view class='starsList'>
							<text @click="stars(indexn, indexw)" v-for="(itemn, indexn) in item.stars" :key="indexn"
                    class='iconfont' :class="item.index >= indexn? 'icon-shitixing':'icon-kongxinxing'" />
						</view>
						<text class='evaluate'>{{item.index === -1 ? "" : item.index + 1 + "分"}}</text>
					</view>
					<view class='textarea'>
						<textarea placeholder='商品满足你的期待么？说说你的想法，分享给想买的他们吧~' name="comment" placeholder-class='placeholder'></textarea>
						<view class='list acea-row row-middle'>
							<view class='pictrue' v-for="(item,index) in picsPath" :key="index">
								<image :src='item'></image>
								<text class='iconfont icon-guanbi1' @click='DelPic(index)'></text>
							</view>
							<view class='pictrue acea-row row-center-wrapper row-column' @click='uploadpic' v-if="picsPath.length <= 8">
								<text class='iconfont icon-icon25201'></text>
								<view>上传图片</view>
							</view>
						</view>
					</view>
					<button class='evaluateBnt bg-color' formType="submit">立即评价</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
  import * as OrderApi from '@/api/trade/order.js';
  import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
  import * as Util from '@/utils/util.js';
  export default {
		data() {
			return {
				pics: [],
				picsPath: [],
				scoreList: [{
          name: "商品质量",
          stars: ["", "", "", "", ""],
          index: -1
        }, {
          name: "服务态度",
          stars: ["", "", "", "", ""],
          index: -1
        }],

        orderItemId: 0, // 订单项编号
				orderItem: {},
			};
		},
		computed: mapGetters(['isLogin']),
		watch: {
			isLogin: {
				handler: function(newV, oldV) {
					if (newV) {
						this.getOrderItem();
					}
				},
				deep: true
			}
		},
		onLoad(options) {
      if (!this.isLogin) {
        toLogin();
        return
      }

      // 解析参数
			if (!options.orderItemId) {
        return this.$util.Tips({
          title: '缺少参数'
        }, {
          tab: 3,
          url: 1
        });
      }
			this.orderItemId = Number(options.orderItemId || 0);
      this.getOrderItem()
		},
		methods: {
			/**
			 * 获得订单项
			 */
			getOrderItem: function() {
        OrderApi.getOrderItem(this.orderItemId).then(res => {
          this.orderItem = res.data;
        })
			},
			stars: function(indexn, indexw) {
				this.scoreList[indexw].index = indexn;
			},
			/**
			 * 删除图片
			 */
			DelPic: function(index) {
				this.picsPath.splice(index, 1);
				this.pics.splice(index, 1);
			},
			/**
			 * 上传文件
			 */
			uploadpic: function() {
				let that = this;
				that.$util.uploadImageOne({
					url: 'user/upload/image',
					name: 'multipart',
					model: "product",
					pid: 1
				}, function(res) {
					that.pics.push(res.data.url);
					that.picsPath.push(res.data.localPath);
					that.$set(that, 'pics', that.pics);
					that.$set(that, 'picsPath', that.picsPath);
				});
			},

			/**
			 * 立即评价
			 */
			formSubmit: function(e) {
				const value = e.detail.value;
        const descriptionScores = this.scoreList[0].index + 1 === 0 ? "" : this.scoreList[0].index + 1;
        const benefitScores = this.scoreList[1].index + 1 === 0 ? "" : this.scoreList[1].index + 1;
				if (!value.comment) {
          return this.$util.Tips({
            title: '请填写你对宝贝的心得！'
          });
        }

        // 提交请求
				uni.showLoading({
					title: "正在发布评论……"
				});
				OrderApi.createOrderItemComment({
          anonymous: false, // TODO 芋艿：后面加个匿名框框
          orderItemId: this.orderItemId,
          descriptionScores: descriptionScores,
          benefitScores: benefitScores,
          content: value.comment,
          picUrls: this.pics
        }).then(res => {
					uni.hideLoading();
					return this.$util.Tips({
						title: '感谢您的评价!',
						icon: 'success'
					}, '/pages/order_details/index?order_id=' + this.orderItem.orderId);
				}).catch(err => {
					uni.hideLoading();
					return this.$util.Tips({
						title: err
					});
				});
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
		}
	}
</script>
<style lang="scss" scoped>
	.goodsStyle .text .name, .attr{
		//width: 496rpx;
	}
	.icon-shitixing{
		color: #FFBB00 !important;
	}
	.evaluate-con .score {
		background-color: #fff;
		// border-top: 1rpx solid #f5f5f5;
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #282828;
		padding: 46rpx 24rpx;
	}

	.evaluate-con .score .item~.item {
		margin-top: 36rpx;
	}

	.evaluate-con .score .item .starsList {
		padding: 0 35rpx 0 40rpx;
	}

	.evaluate-con .score .item .starsList .iconfont {
		font-size: 40rpx;
		color: #aaa;
	}

	.evaluate-con .score .item .starsList .iconfont~.iconfont {
		margin-left: 20rpx;
	}

	.evaluate-con .score .item .evaluate {
		color: #aaa;
		font-size: 24rpx;
	}

	.evaluate-con .score .textarea {
		width: 100%;
		background-color: #F5F5F5;
		border-radius: 14rpx;
		margin-top: 55rpx;
	}

	.evaluate-con .score .textarea textarea {
		font-size: 28rpx;
		padding: 38rpx 30rpx 0 30rpx;
		width: 100%;
		box-sizing: border-box;
		height: 160rpx;
		width: auto !important;
	}

	.evaluate-con .score .textarea .placeholder {
		color: #bbb;
	}

	.evaluate-con .score .textarea .list {
		margin-top: 25rpx;
		padding-left: 5rpx;
	}

	.evaluate-con .score .textarea .list .pictrue {
		width: 140rpx;
		height: 140rpx;
		margin: 0 0 35rpx 25rpx;
		position: relative;
		font-size: 22rpx;
		color: #bbb;
		border-radius: 14rpx;
	}

	.evaluate-con .score .textarea .list .pictrue:nth-last-child(1) {
		border: 1rpx solid #ddd;
		box-sizing: border-box;
	}

	.evaluate-con .score .textarea .list .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 14rpx;
	}

	.evaluate-con .score .textarea .list .pictrue .icon-guanbi1 {
		font-size: 45rpx;
		position: absolute;
		top: -20rpx;
		right: -20rpx;
	}

	.evaluate-con .score .textarea .list .pictrue .icon-icon25201 {
		color: #bfbfbf;
		font-size: 50rpx;
	}

	.evaluate-con .score .evaluateBnt {
		font-size: 30rpx;
		color: #fff;
		width: 100%;
		height: 86rpx;
		border-radius: 43rpx;
		text-align: center;
		line-height: 86rpx;
		margin-top: 45rpx;
	}
</style>
