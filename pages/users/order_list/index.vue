<template>
	<view>
		<view class='my-order'>
      <!-- 顶部统计 -->
      <view class='header bg-color'>
				<view class='picTxt acea-row row-between-wrapper'>
					<view class='text'>
						<view class='name'>订单信息</view>
					</view>
					<view class='pictrue'>
						<image src='../../../static/images/orderTime.png'></image>
					</view>
				</view>
			</view>
			<view class='nav acea-row row-around'>
        <view class='item' :class='orderStatus === undefined ? "on": ""' @click="statusClick()">
          <view>全部</view>
          <view class='num'>{{ orderData.allCount || 0}}</view>
        </view>
				<view class='item' :class='orderStatus === 0 ? "on": ""' @click="statusClick(0)">
					<view>待付款</view>
					<view class='num'>{{orderData.unpaidCount || 0}}</view>
				</view>
				<view class='item' :class='orderStatus === 10 ? "on": ""' @click="statusClick(10)">
					<view>待发货</view>
					<view class='num'>{{orderData.undeliveredCount || 0}}</view>
				</view>
				<view class='item' :class='orderStatus === 20 ? "on": ""' @click="statusClick(20)">
					<view>待收货</view>
					<view class='num '>{{orderData.deliveredCount || 0}}</view>
				</view>
				<view class='item' :class='orderStatus === 30 ? "on": ""' @click="statusClick(30, false)">
					<view>待评价</view>
					<view class='num'>{{orderData.uncommentedCount || 0}}</view>
				</view>
			</view>
			<view class='list'>
				<view class='item' v-for="(order, index) in orderList" :key="index">
					<view @click='goOrderDetails(order.id)'>
						<view class='title acea-row row-between-wrapper'>
							<view class="acea-row row-middle">
								<text class="sign cart-color acea-row row-center-wrapper" v-if="order.typeName">{{ order.typeName }}</text>
								<view>{{ formatDate(order.createTime) }}</view>
							</view>
              <!-- 订单状态 -->
              <view class='font-color'>{{order.orderStatus}}</view>
              <view v-if="order.status === 0" class="font-color">待付款</view>
              <view v-else-if="order.status === 10 && order.deliveryType === 1" class="font-color">待发货</view>
              <view v-else-if="order._status === 10 && order.deliveryType === 2" class="font-color">待核销</view>
              <view v-else-if="order.status === 20" class="font-color">待收货</view>
              <view v-else-if="order.status === 30 && !order.commentStatus" class="font-color">待评价</view>
              <view v-else-if="order.status === 30 && order.commentStatus" class="font-color">已完成</view>
              <view v-else-if="order.status === 40" class="font-color">已关闭</view>
						</view>
            <!-- 订单项信息 -->
            <view class='item-info acea-row row-between row-top' v-for="(item, index) in order.items" :key="index">
							<view class='pictrue'>
								<image :src='item.picUrl'></image>
							</view>
							<view class='text acea-row row-between'>
								<view class='name line2'>{{ item.spuName }}</view>
								<view class='money'>
									<view>￥{{ fen2yuan(item.price) }}</view>
									<view>x{{ item.count }}</view>
								</view>
							</view>
						</view>
            <!-- 订单金额 -->
            <view class='totalPrice'>共{{ order.productCount }}件商品，总金额
							<text class='money font-color'>￥{{ fen2yuan(order.payPrice) }}</text>
						</view>
					</view>
          <!-- 订单操作区 -->
          <view class='bottom acea-row row-right row-middle'>
						<view class='bnt cancelBnt' v-if="order.status === 0" @click='cancelOrder(index, order.id)'>
              取消订单
            </view>
						<view class='bnt bg-color' v-if="order.status === 0" @click='goPay(order.id, order.payOrderId)'>
              立即付款
            </view>
            <view class='bnt bg-color' v-if="order.status === 30 && !order.commentStatus" @click='goOrderDetails(order.id)'>
              去评价
            </view>
            <view class='bnt cancelBnt' v-if="order.status === 40" @click='delOrder(order.id, index)'>
              删除订单
            </view>
            <view class='bnt bg-color' @click='goOrderDetails(order.id)'>
              查看详情
            </view>
					</view>
				</view>
			</view>
			<view class='loadingicon acea-row row-center-wrapper' v-if="orderList.length>0">
				<text class='loading iconfont icon-jiazai' :hidden='!loading' /> {{loadTitle}}
			</view>
			<view v-if="orderList.length === 0">
				<emptyPage title="暂无订单~"></emptyPage>
			</view>
		</view>
		<view class='noCart' v-if="orderList.length === 0 && page > 1">
			<view class='pictrue'>
				<image src='/images/noOrder.png'></image>
			</view>
		</view>
		<home></home>
	</view>
</template>
<script>
	import { openOrderSubscribe } from '@/utils/SubscribeMessage.js';
	import home from '@/components/home';
	import payment from '@/components/payment';
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import emptyPage from '@/components/emptyPage.vue'
  import * as OrderApi from '@/api/trade/order.js';
  import dayjs from '@/plugin/dayjs/dayjs.min.js';
  import * as Util from '@/utils/util.js';
  export default {
		components: {
			payment,
			home,
			emptyPage
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
        orderList: [], // 订单数组
        orderData: {}, // 订单详细统计
        orderStatus: undefined, // Tab 的订单状态
        commentStatus: undefined, // Tab 的评论状态
				page: 1,
				limit: 20,
			};
		},
		computed: mapGetters(['isLogin', 'userInfo']),
		onShow() {
			if (!this.isLogin) {
        toLogin();
        return;
			}

      this.loadend = false;
      this.page = 1;
      this.$set(this, 'orderList', []);
      this.getOrderData();
      this.getOrderList();
		},
		methods: {
			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoad: function(options) {
				if (options.status) {
          this.orderStatus = options.status;
        }
			},
			/**
			 * 获取订单统计数据
			 */
			getOrderData: function() {
        OrderApi.getOrderCount().then(res => {
					this.$set(this, 'orderData', res.data);
				})
			},
      /**
       * 切换类型
       */
      statusClick: function(status, commentStatus) {
        if (status === this.orderStatus) {
          return;
        }
        this.orderStatus = status;
        this.commentStatus = commentStatus;
        this.loadend = false;
        this.page = 1;
        this.$set(this, 'orderList', []);
        this.getOrderList();
      },
      /**
       * 获取订单列表
       */
      getOrderList: function() {
        if (this.loadend || this.loading) {
          return;
        }
        this.loading = true;
        this.loadTitle = "加载更多";
        OrderApi.getOrderPage({
          status: this.orderStatus,
          commentStatus: this.commentStatus,
          pageNo: this.page,
          pageSize: this.limit
        }).then(res => {
          const list = res.data.list || [];
          list.forEach(item => {
            item.typeName = item.type === 1 ? '秒杀'
              : item.type === 2 ? '砍价'
                : item.type === 3 ? '拼团' : undefined;
          });

          // 设置结束
          const loadend = list.length < this.limit;
          this.orderList = this.$util.SplitArray(list, this.orderList);
          this.$set(this, 'orderList', this.orderList);
          this.loadend = loadend;
          this.loading = false;
          this.loadTitle = loadend ? "我也是有底线的" : '加载更多';
          this.page = this.page + 1;
        }).catch(err => {
          this.loading = false;
          this.loadTitle = "加载更多";
        })
      },
			/**
			 * 打开支付组件
			 */
			goPay(id, payOrderId) {
        const returnUrl = '/pages/order_pay_status/index?order_id=' + id;
        uni.navigateTo({
          url: `/pages/goods/cashier/index?order_id=${payOrderId}&returnUrl=${returnUrl}`
        })
			},
			/**
			 * 去订单详情
			 */
			goOrderDetails: function(order_id) {
				if (!order_id) {
          return this.$util.Tips({
            title: '缺少订单号无法查看订单详情'
          });
        }
				// #ifdef MP
				uni.showLoading({
					title: '正在加载',
				})
				openOrderSubscribe().then(() => {
					uni.hideLoading();
					uni.navigateTo({
						url: '/pages/order_details/index?order_id=' + order_id
					})
				}).catch(() => {
					uni.hideLoading();
				})
				// #endif
				// #ifndef MP
				uni.navigateTo({
					url: '/pages/order_details/index?order_id=' + order_id
				})
				// #endif
			},
      /**
       * 取消订单
       */
      cancelOrder: function(index, order_id) {
        uni.showModal({
          title: '提示',
          content: '确认取消该订单?',
          success: res => {
            if (res.confirm) {
              OrderApi.cancelOrder(order_id).then(() => {
                this.$util.Tips({
                  title: '取消成功'
                }, () => {
                  this.orderList.splice(index, 1);
                  this.$set(this, 'orderList', this.orderList);
                  this.getOrderData();
                })
              }).catch((err) => {
                this.$util.Tips({
                  title: err
                })
              });
            }
          }
        });
      },
			/**
			 * 删除订单
			 */
			delOrder: function(order_id, index) {
        uni.showModal({
          title: '提示',
          content: '确认删除该订单?',
          success: res => {
            if (res.confirm) {
              OrderApi.deleteOrder(order_id).then(() => {
                this.$util.Tips({
                  title: '删除成功'
                }, () => {
                  this.orderList.splice(index, 1);
                  this.$set(this, 'orderList', this.orderList);
                  this.getOrderData();
                })
              }).catch((err) => {
                this.$util.Tips({
                  title: err
                })
              });
            }
          }
        });
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      }
		},
		onReachBottom: function() {
			this.getOrderList();
		}
	}
</script>
<style scoped lang="scss">
	.my-order .header {
		height: 250rpx;
		padding: 0 30rpx;
	}

	.my-order .header .picTxt {
		height: 190rpx;
	}

	.my-order .header .picTxt .text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
		font-family: 'Guildford Pro';
	}

	.my-order .header .picTxt .text .name {
		font-size: 34rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.my-order .header .picTxt .pictrue {
		width: 122rpx;
		height: 109rpx;
	}

	.my-order .header .picTxt .pictrue image {
		width: 100%;
		height: 100%;
	}

	.my-order .nav {
		background-color: #fff;
		width: 690rpx;
		height: 140rpx;
		border-radius: 14rpx;
		margin: -60rpx auto 0 auto;
	}

	.my-order .nav .item {
		text-align: center;
		font-size: 26rpx;
		color: #282828;
		padding: 26rpx 0;
	}

	.my-order .nav .item.on {
		// font-weight: bold;
		// border-bottom: 5rpx solid #e93323;
		/* #ifdef H5 || MP */
		font-weight: bold;
		/* #endif */
		border-bottom: 5rpx solid $theme-color;
	}

	.my-order .nav .item .num {
		margin-top: 18rpx;
	}

	.my-order .list {
		width: 690rpx;
		margin: 14rpx auto 0 auto;
	}

	.my-order .list .item {
		background-color: #fff;
		border-radius: 14rpx;
		margin-bottom: 14rpx;
	}

	.my-order .list .item .title {
		height: 84rpx;
		padding: 0 24rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;
	}

	.my-order .list .item .title .sign {
		font-size: 24rpx;
		padding: 0 13rpx;
		height: 36rpx;
		margin-right: 15rpx;
		border-radius: 18rpx;
	}

	.my-order .list .item .item-info {
		padding: 0 24rpx;
		margin-top: 22rpx;
	}

	.my-order .list .item .item-info .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.my-order .list .item .item-info .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 14rpx;
	}

	.my-order .list .item .item-info .text {
		width: 500rpx;
		font-size: 28rpx;
		color: #999;
	}

	.my-order .list .item .item-info .text .name {
		width: 350rpx;
		color: #282828;
	}

	.my-order .list .item .item-info .text .money {
		text-align: right;
	}

	.my-order .list .item .totalPrice {
		font-size: 26rpx;
		color: #282828;
		text-align: right;
		margin: 27rpx 0 0 30rpx;
		padding: 0 30rpx 30rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.my-order .list .item .totalPrice .money {
		font-size: 28rpx;
		font-weight: bold;
	}

	.my-order .list .item .bottom {
		height: 107rpx;
		padding: 0 30rpx;
	}

	.my-order .list .item .bottom .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		border-radius: 50rpx;
		font-size: 27rpx;
	}

	.my-order .list .item .bottom .bnt.cancelBnt {
		border: 1rpx solid #ddd;
		color: #aaa;
	}

	.my-order .list .item .bottom .bnt~.bnt {
		margin-left: 17rpx;
	}

	.noCart {
		margin-top: 171rpx;
		padding-top: 0.1rpx;
	}

	.noCart .pictrue {
		width: 414rpx;
		height: 336rpx;
		margin: 78rpx auto 56rpx auto;
	}

	.noCart .pictrue image {
		width: 100%;
		height: 100%;
	}
</style>
