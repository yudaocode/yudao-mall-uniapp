<template>
	<view style="height: 100%;">
		<view class='evaluate-list'>
			<view class='generalComment acea-row row-between-wrapper'>
				<view class='acea-row row-middle font-color'>
					<view class='evaluate'>评分</view>
					<view class='start' :class="'star'+ Math.round(replyData.scores)" />
				</view>
				<view><text class='font-color'>{{ 100.0 * replyData.goodCount / replyData.count }}%</text>好评率</view>
			</view>
			<view class='nav acea-row row-middle'>
				<view class='item' :class='type === 0 ? "bg-color":""' @click='changeType(0)'>全部({{replyData.count}})
				</view>
				<view class='item' :class='type === 1 ? "bg-color":""' @click='changeType(1)'>好评({{replyData.goodCount}})
				</view>
				<view class='item' :class='type === 2 ? "bg-color":""' @click='changeType(2)'>中评({{replyData.mediocreCount}})
				</view>
				<view class='item' :class='type === 3 ? "bg-color":""' @click='changeType(3)'>差评({{replyData.negativeCount}})
				</view>
			</view>
			<userEvaluation :reply="reply"></userEvaluation>
		</view>
		<view class='loadingicon acea-row row-center-wrapper'>
			<text class='loading iconfont icon-jiazai' :hidden='!loading'></text>{{loadTitle}}
		</view>
		<view class='noCommodity' v-if="replyData.count === 0 && page > 1">
			<view class='pictrue'>
				<image src='../static/noEvaluate.png' />
			</view>
		</view>
	</view>
</template>
<script>
	import userEvaluation from '@/components/userEvaluation';
  import * as ProductCommentApi from '@/api/product/comment.js';
  export default {
		components: {
			userEvaluation
		},
		data() {
			return {
				replyData: {}, // 评论统计
				product_id: 0, // 商品编号
				reply: [], // 评论列表
				type: 0,
				loading: false,
				loadend: false,
				loadTitle: '加载更多',
				page: 1,
				limit: 20
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			if (!options.productId) {
        return this.$util.Tips({
          title: '缺少参数'
        }, {
          tab: 3,
          url: 1
        });
      }
      this.productId = options.productId;
		},
		onShow: function() {
			this.getProductReplyCount();
			this.getProductReplyList();
		},
		methods: {
			/**
			 * 获取评论统计数据
			 */
			getProductReplyCount: function() {
        ProductCommentApi.getCommentStatistics(this.productId).then(res => {
          res.data.count = res.data.goodCount + res.data.mediocreCount + res.data.negativeCount;
          this.$set(this, 'replyData', res.data);
				});
			},
			/**
			 * 分页获取评论
			 */
			getProductReplyList: function() {
				if (this.loadend || this.loading) {
          return;
        }
				this.loading = true;
				this.loadTitle = '';
        ProductCommentApi.getCommentPage({
          spuId: this.productId,
          type: this.type,
          pageNo: this.page,
          pageSize: this.limit,
				}).then(res => {
					const list = res.data.list;
          const loadend = list.length < this.limit;
					this.reply = this.$util.SplitArray(list, this.reply);
					this.$set(this, 'reply', this.reply);
					this.loading = false;
					this.loadend = loadend;
          this.loadTitle = loadend ? "😕人家是有底线的~~" : "加载更多";
          this.page = this.page + 1;
				}).catch(err => {
					this.loading = false;
          this.loadTitle = '加载更多'
				});
			},
			/**
			 * 点击事件切换
			 */
			changeType: function(e) {
				let type = parseInt(e);
				if (type === this.type) {
          return;
        }
				this.type = type;
				this.page = 1;
				this.loadend = false;
				this.$set(this, 'reply', []);
				this.getProductReplyList();
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getProductReplyList();
		},
	}
</script>
<style lang="scss">
	page {
		background-color: #fff;
		height: 100%;
	}
    .evaluate-list{
		padding: 30rpx 0 0 0;
		background-color: #fff;
	}
	.evaluate-list .generalComment {
		padding: 0 30rpx;
		margin-top: 1rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #808080;
	}

	.evaluate-list .generalComment .evaluate {
		margin-right: 7rpx;
		color: #333333;
		font-size: 28rpx;
	}

	.evaluate-list .nav {
		font-size: 24rpx;
		color: #282828;
		padding: 30rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.evaluate-list .nav .item {
		font-size: 24rpx;
		color: #282828;
		border-radius: 27rpx;
		height: 54rpx;
		padding: 0 20rpx;
		background-color: #f4f4f4;
		line-height: 54rpx;
		margin-right: 17rpx;
	}

	.evaluate-list .nav .item.bg-color {
		color: #fff;
	}
</style>
