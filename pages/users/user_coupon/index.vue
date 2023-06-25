<template>
	<view>
		<view class="navbar acea-row row-around">
			<view class="item acea-row row-center-wrapper" :class="{ on: navOn === 1 }" @click="onNav(1)">未使用</view>
			<view class="item acea-row row-center-wrapper" :class="{ on: navOn === 2 }" @click="onNav(2)">已使用</view>
			<view class="item acea-row row-center-wrapper" :class="{ on: navOn === 3 }" @click="onNav(3)">已过期</view>
		</view>
		<view class='coupon-list' v-if="couponsList.length">
			<view class='item acea-row row-center-wrapper' v-for='(item,index) in couponsList' :key="index">
				<view class='money' :class="item.status !== 1 ? 'moneyGray' : ''">
          <view>￥
            <text v-if="item.discountType === 1" class='num'>{{ fen2yuan(item.discountPrice) }}</text>
            <text v-else class='num'>{{ (item.discountPercent / 10.0).toFixed(1) }} 折</text>
          </view>
          <view class="pic-num">满 {{ fen2yuan(item.usePrice) }} 元可用</view>
				</view>
				<view class='text'>
					<view class='condition line2'>
						<span class="line-title" :class="item.status !== 1 ? 'bg-color-huic' : 'bg-color-check'"
                  v-if="item.useType === 1">通用</span>
						<span class="line-title" :class="item.status !== 1 ? 'bg-color-huic' : 'bg-color-check'"
                  v-else-if="item.useType === 2">商品</span>
						<span class="line-title" :class="item.status !== 1 ? 'bg-color-huic' : 'bg-color-check'"
                  v-else-if="item.useType === 3">品类</span>
						<span>{{item.name}}</span>
					</view>
					<view class='data acea-row row-between-wrapper'>
						<view>
              {{ formatDate(item.validStartTime) + " - " + formatDate(item.validEndTime) }}
            </view>
						<view class='bnt' :class="item.status !== 1 ?'gray':'bg-color'">{{ item.status | validStrFilter }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class='loadingicon acea-row row-center-wrapper' v-if="couponsList.length">
       <text class='loading iconfont icon-jiazai' :hidden='!loading' />{{loadTitle}}
    </view>
		<view class='noCommodity' v-if="!couponsList.length">
			<view class='pictrue'>
				<image src='../../../static/images/noCoupon.png' />
			</view>
		</view>
		<home></home>
	</view>
</template>
<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import home from '@/components/home';
  import * as CouponApi from '@/api/promotion/coupon.js';
  import * as Util from '@/utils/util.js';
  import dayjs from "@/plugin/dayjs/dayjs.min.js";
  export default {
		components: {
			home
		},
		filters: {
      validStrFilter(status) {
        const statusMap = {
          '1': '可用',
          '2': '已用',
          '3': '过期',
          '0': '未开始'
        }
        return statusMap[status + '']
      }
		},
		data() {
			return {
        navOn: 1,
        couponsList: [],
				loading: false,
				loadend: false,
				loadTitle: '加载更多', // 提示语
				page: 1,
				limit: 20,
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
        return;
			}
      this.getUseCoupons();
		},
		methods: {
			onNav: function(type) {
				this.navOn = type;
				this.couponsList = [];
				this.page = 1;
				this.loadend = false;
				this.getUseCoupons();
			},
			/**
			 * 获取领取优惠券列表
			 */
			getUseCoupons: function() {
				if(this.loadend || this.loading) {
          return false;
        }
        CouponApi.getCouponPage({
          pageNo: this.page,
          pageSize: this.limit,
          status: this.navOn
        }).then(res => {
					const list= res.data ? res.data.list : [];
          // 处理状态
          list.forEach(item => {
            if (item.status === 1 && item.validStartTime > new Date().getTime()) {
              item.status = 0;
            }
          })

          const loadend = list.length < this.limit;
					let couponsList = this.$util.SplitArray(list, this.couponsList);
					this.$set(this, 'couponsList', couponsList);
					this.loadend = loadend;
					this.loadTitle = loadend ? '我也是有底线的' : '加载更多';
					this.page = this.page + 1;
					this.loading = false;
				}).catch(err => {
          this.loading = false;
          this.loadTitle = '加载更多';
        });
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD");
      }
		},
		/**
		  * 页面上拉触底事件的处理函数
		  */
   onReachBottom: function () {
     this.getUseCoupons();
   }
	}
</script>
<style lang="scss" scoped>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 106rpx;
		background-color: #FFFFFF;
		z-index: 9;

		.item {
			border-top: 5rpx solid transparent;
			border-bottom: 5rpx solid transparent;
			font-size: 30rpx;
			color: #999999;

			&.on {
				border-bottom-color: #E93323;
				color: #282828;
			}
		}
	}
	.money {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.pic-num {
		color: #ffffff;
		font-size: 24rpx;
	}
	.coupon-list {
		margin-top: 122rpx;
	}
	.coupon-list .item .text{
		height: 100%;
	}
	.coupon-list .item .text .condition{
		/* display: flex;
		align-items: center; */
	}
	.condition .line-title {
		width: 90rpx;
		height: 40rpx !important;
		line-height: 40rpx !important;
		padding: 2rpx 10rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		background: rgba(255, 247, 247, 1);
		border: 1px solid rgba(232, 51, 35, 1);
		opacity: 1;
		border-radius: 20rpx;
		font-size: 18rpx !important;
		color: #e83323;
		margin-right: 12rpx;
	}
	.noCommodity {
		margin-top: 300rpx;
	}
</style>
