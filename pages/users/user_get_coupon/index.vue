<template>
	<view>
		<view class="acea-row row-around nav">
			<template v-for="item in navList">
				<view :key="item.type" :class="['acea-row', 'row-middle', type === item.type ? 'on' : '']"
					@click="setType(item.type)">{{ item.name }}</view>
			</template>
		</view>
		<view style="height: 106rpx;"></view>
		<view class='coupon-list' v-if="couponsList.length">
			<view class='item acea-row row-center-wrapper' v-for="(item,index) in couponsList" :key="index">
				<view class='money' :class='item.canTake ? "" : "moneyGray"'>
          <view>￥
            <text v-if="item.discountType === 1" class='num'>{{ fen2yuan(item.discountPrice) }}</text>
            <text v-else class='num'>{{ (item.discountPercent / 10.0).toFixed(1) }} 折</text>
          </view>
          <view class="pic-num">满 {{ fen2yuan(item.usePrice) }} 元可用</view>
				</view>
				<view class='text'>
					<view class='condition line2'>
						<span class='line-title' :class='item.canTake ? "" : "gray"'
							v-if='type === 1'>通用</span>
						<span class='line-title' :class='item.canTake ? "" : "gray"'
							v-else-if='type === 3'>品类</span>
						<span class='line-title' :class='item.canTake ? "" : "gray"' v-else>商品</span>
						<span>{{item.name}}</span>
					</view>
					<view class='data acea-row row-between-wrapper'>
            <view v-if="item.validityType > 1">领取后 {{ item.fixedEndTerm }} 天内可用</view>
            <view v-else>
              {{ formatDate(item.validStartTime) + " - " + formatDate(item.validEndTime) }}
            </view>
						<view class='bnt bg-color' v-if="item.canTake" @click='getCoupon(item.id, index)'>立即领取</view>
            <view class='bnt gray' v-else>已领取</view>
					</view>
				</view>
			</view>
		</view>
		<view class='loadingicon acea-row row-center-wrapper'>
			<text class='loading iconfont icon-jiazai' :hidden='!loading' />{{couponsList.length?loadTitle:''}}
		</view>
		<view class='noCommodity' v-if="!couponsList.length && isShow && !loading">
			<view class='pictrue'>
				<image src='../../../static/images/noCoupon.png' />
			</view>
		</view>
	</view>
</template>
<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
  import * as CouponApi from '@/api/promotion/coupon.js';
  import * as Util from '@/utils/util.js';
  import dayjs from "@/plugin/dayjs/dayjs.min.js";
  export default {
		data() {
			return {
				couponsList: [],
				loading: false,
				loadend: false,
				loadTitle: '加载更多', //提示语
				page: 1,
				limit: 20,
				type: 1,
				isShow: false,
				navList: [{
          type: 1,
          name: '通用券',
          count: 0
        }, {
          type: 2,
          name: '商品券',
          count: 0
        }, {
          type: 3,
          name: '品类券',
          count: 0
					},
				],
				count: 0
			};
		},
		computed: mapGetters(['isLogin']),
		watch: {
			isLogin: {
				handler: function(newV, oldV) {
					if (newV) {
						this.getUseCoupons();
					}
				},
				deep: true
			}
		},
		onLoad() {
			if (!this.isLogin) {
        toLogin();
        return
      }
      this.getUseCoupons();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getUseCoupons();
		},
		methods: {
      /**
       * 领取优惠劵
       */
			getCoupon: function(id, index) {
				// 领取优惠券
        CouponApi.takeCoupon(id).then(res => {
          // 设置已领取，即不能再领取
          this.couponsList[index].canTake = res.data;
					this.$set(this, 'couponsList', this.couponsList);
          this.$util.Tips({
						title: '领取成功'
					});
				}).catch(err => {
          return this.$util.Tips({
						title: err
					});
				})
			},
			/**
			 * 获取领取优惠券列表
			 */
			getUseCoupons: function() {
				if (this.loadend || this.loading) {
          return false;
        }
				this.loading = true;
        CouponApi.getCouponTemplatePage({
					pageNo: this.page,
          pageSize: this.limit,
          productScope: this.type
				}).then(res => {
					const list = res.data.list;
          const loadend = list.length < this.limit;
					const couponsList = this.$util.SplitArray(list, this.couponsList);
					this.$set(this, 'couponsList', couponsList);
					this.loadend = loadend;
					this.loadTitle = loadend ? '我也是有底线的' : '加载更多';
					this.page = this.page + 1;
					this.loading = false;
					this.isShow = true;
				}).catch(err => {
					this.loading = false;
					this.loadTitle = '加载更多';
				});
			},
			setType: function(type) {
				if (this.type !== type) {
					this.type = type;
					this.couponsList = [];
					this.page = 1;
					this.loadend = false;
					this.getUseCoupons();
				}
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD");
      }
		}
	}
</script>
<style scoped>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 106rpx;
		background-color: #FFFFFF;
		font-size: 30rpx;
		color: #999999;
		z-index: 9;
	}

	.nav .acea-row {
		border-top: 5rpx solid transparent;
		border-bottom: 5rpx solid transparent;
		cursor: pointer;
	}

	.nav .acea-row.on {
		border-bottom-color: #E93323;
		color: #E93323;
	}

	.condition .line-title {
		width: 90rpx;
		padding: 0 10rpx;
		box-sizing: border-box;
		background: rgba(255, 247, 247, 1);
		border: 1px solid rgba(232, 51, 35, 1);
		opacity: 1;
		border-radius: 20rpx;
		font-size: 20rpx;
		color: #E83323;
		margin-right: 12rpx;
	}

	.condition .line-title.gray {
		border-color: #BBB;
		color: #bbb;
		background-color: #F5F5F5;
	}

	.coupon-list .pic-num {
		color: #FFFFFF;
		font-size: 24rpx;
	}
</style>
