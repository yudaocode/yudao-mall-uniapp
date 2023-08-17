<template>
	<view>
		<view class='return-list pad30' v-if="orderList.length">
			<view class='goodWrapper borRadius14' v-for="(item,index) in orderList" :key="index" @click='goOrderDetails(item.orderId)'>
        <!-- 根据状态，展示 icon -->
        <!-- TODO 芋艿：需要优化下 icon，目前没展示出来 -->
        <view class='iconfont icon-shenqingzhong powder' v-if="[10].includes(item.status)" />
        <view class='iconfont icon-daituihuo1 powder' v-if="[20, 30].includes(item.status)"></view>
        <view class='iconfont icon-tuikuanzhong powder' v-if="[40].includes(item.status)"></view>
        <view class='iconfont icon-yituikuan'  v-if="[50].includes(item.status)"></view>
        <view class='iconfont icon-yijujue' v-if="[61, 62, 63].includes(item.status)"></view>
        <!-- 展示信息 -->
        <view class='orderNum'>订单号：{{ item.no }}</view>
				<view class='item acea-row row-between-wrapper'>
					<view class='pictrue'>
						<image :src='item.picUrl'></image>
					</view>
					<view class='text'>
						<view class='acea-row row-between-wrapper'>
							<view class='name line1'>{{ item.spuName }}</view>
							<view class='num'>x {{ item.count }}</view>
						</view>
            <view class='attr line1' v-if="item.properties">
              <text v-for="property in item.properties" style="padding-left: 2px">{{property.valueName}}</text>
            </view>
						<view class='money'>
              ￥ {{ (item.refundPrice / 100.0).toFixed(2) }}
            </view>
					</view>
				</view>
			</view>
		</view>
    <!--  底部，加载中 -->
		<view class='loadingicon acea-row row-center-wrapper' v-if="orderList.length">
			<text class='loading iconfont icon-jiazai' :hidden='!loading' /> {{loadTitle}}
		</view>
		<view v-if="orderList.length === 0">
			<emptyPage title="暂无订单~"></emptyPage>
		</view>
		<home></home>
	</view>
</template>

<script>
	import home from '@/components/home';
	import emptyPage from '@/components/emptyPage.vue'
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
  import * as AfterSaleApi from '@/api/trade/afterSale.js';
	export default {
		components: {
			emptyPage,
			home
		},
		data() {
			return {
				loading: false,
				loadend: false,
				loadTitle: '加载更多', //提示语
				orderList: [], //订单数组
				page: 1,
				limit: 20,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false //是否隐藏授权
			};
		},
		computed: mapGetters(['isLogin']),
		watch:{
			isLogin: {
				handler: function(newV, oldV) {
					if ( newV) {
						this.getOrderList();
					}
				},
				deep:true
			}
		},
		onLoad() {
			if (!this.isLogin) {
        toLogin();
        return;
			}
      this.getOrderList();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getOrderList();
		},
		methods: {
			onLoadFun() {
				this.getOrderList();
			},
			/**
			 * 去订单详情
			 */
			goOrderDetails: function(order_id) {
				if (!order_id) {
          return that.$util.Tips({
            title: '缺少订单号无法查看订单详情'
          });
        }
        // TODO 芋艿：跳转到详情
				uni.navigateTo({
					url: '/pages/order_details/index?order_id=' + order_id + '&isReturen=1'
				})
			},

			/**
			 * 获取订单列表
			 */
			getOrderList: function() {
				if (this.loadend || this.loading) {
          return;
        }
				this.loading = true;
				this.loadTitle = "";
        AfterSaleApi.getAfterSalePage({
					pageNo: this.page,
          pageSize: this.limit,
				}).then(res => {
					let list = res.data.list || [];
					let loadend = list.length < this.limit;
          this.orderList = this.$util.SplitArray(list, this.orderList);
          this.$set(this,'orderList', this.orderList);
          this.loadend = loadend;
          this.loading = false;
          this.loadTitle = loadend ? "我也是有底线的" : '加载更多';
          this.page = this.page + 1;
				}).catch(err => {
          this.loading = false;
          this.loadTitle = "加载更多";
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.return-list .goodWrapper {
		background-color: #fff;
		margin-top: 20rpx;
		position: relative;
		padding: 0rpx 24rpx;
	}

	.return-list .goodWrapper .orderNum {
		border-bottom: 1px solid #eee;
		height: 87rpx;
		line-height: 87rpx;
		font-size: 30rpx;
		color: #333333;
	}

	.return-list .goodWrapper .item {
		border-bottom: 0;
	}

	.return-list .goodWrapper .totalSum {
		padding: 0 30rpx 32rpx 30rpx;
		text-align: right;
		font-size: 26rpx;
		color: #282828;
	}

	.return-list .goodWrapper .totalSum .price {
		font-size: 28rpx;
		font-weight: bold;
	}

	.return-list .goodWrapper .iconfont {
		position: absolute;
		font-size: 109rpx;
		top: 7rpx;
		right: 22rpx;
		color: #ccc;
	}

	.return-list .goodWrapper .iconfont.powder {
		color: #f8c1bd;
	}
</style>
