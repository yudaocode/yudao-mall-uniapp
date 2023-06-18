<template>
	<div>
		<view class='flash-sale'>
			<!-- #ifdef H5 -->
			<view class='iconfont icon-xiangzuo' @tap='goBack' :style="'top:'+ (navH/2) +'rpx'" v-if="returnShow"></view>
			<!-- #endif -->
			<view class="saleBox"></view>

      <!-- 当前秒杀时间段的轮播图 -->
			<view class="header" v-if="dataList.length">
				<swiper indicator-dots="true" autoplay="true" :circular="circular" interval="3000" duration="1500"
					indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
					<block v-for="(items, index) in dataList[active].sliderPicUrls" :key="index">
						<swiper-item class="borRadius14">
							<image :src="items" class="slide-image borRadius14" lazy-load />
						</swiper-item>
					</block>
				</swiper>
			</view>

      <!-- 秒杀时间段 -->
      <view class="seckillList acea-row row-between-wrapper">
				<view class="priceTag">
					<image src="/static/images/priceTag.png"></image>
				</view>
				<view class='timeLsit'>
					<scroll-view class="scroll-view_x" scroll-x scroll-with-animation :scroll-left="scrollLeft"
						style="width:auto;overflow:hidden;">
						<block v-for="(item,index) in dataList" :key='index'>
							<view @tap='settimeList(item,index)' class='item' :class="active === index?'on':''">
								<view class='time'>{{ item.startTime }}</view>
								<view class="state" v-if="item.status === 1">即将开始</view>
								<view class="state" v-if="item.status === 2">进行中</view>
								<view class="state" v-if="item.status === 3">已结束</view>
							</view>
						</block>
					</scroll-view>
				</view>
			</view>

      <!-- 秒杀活动 -->
			<view class='list pad30' v-if='seckillList.length>0'>
				<block v-for="(item,index) in seckillList" :key='index'>
					<view class='item acea-row row-between-wrapper' @tap='goDetails(item)'>
						<view class='pictrue'>
							<image :src='item.picUrl' />
						</view>
						<view class='text acea-row row-column-around'>
							<view class='name line1'>{{item.name}}</view>
							<view class='money'><text class="font-color">￥</text>
								<text class='num font-color'>{{ fen2yuan(item.seckillPrice ) }}</text>
								<text class="y_money">￥{{ fen2yuan(item.marketPrice) }}</text>
							</view>
							<view class="limit">限量 <text class="limitPrice">{{ item.stock}} {{item.unitName}}</text>
							</view>
							<view class="progress">
								<view class='bg-reds' :style="'width:' + item.percent +'%;'"></view>
								<view class='piece'>已抢{{ item.percent }}%</view>
							</view>
						</view>
						<view class='grab bg-color' v-if="dataList[active].status === 2">马上抢</view>
						<view class='grab bg-color' v-else-if="dataList[active].status === 1">未开始</view>
						<view class='grab bg-color-hui' v-else>已结束</view>
					</view>
				</block>
			</view>
		</view>
		<view class='noCommodity' v-if="seckillList.length === 0 && (page !== 1 || active === 0)">
			<view class='pictrue'>
				<image src='../../../static/images/noShopper.png'></image>
			</view>
		</view>
		<home></home>
	</div>
</template>
<script>
	import home from '@/components/home/index.vue';
  import * as SeckillApi from '@/api/promotion/seckill.js';
  import * as Util from '@/utils/util.js';
  let app = getApp();
	export default {
		components: {
			home
		},
		data() {
			return {
        // ========== 秒杀时间段相关变量 ==========
        dataList: [], // 时间段数组
        active: 0, // 选中的 dataList 下标
        circular: true,
        autoplay: true,
        interval: 500,
        scrollLeft: 0,
        status: 1,

        // ========== 秒杀活动相关变量 ==========
        seckillList: [],
        loading: false,
        loadend: false,
        page: 1,
        limit: 4,
        pageloading: false,

        // ========== 导航相关变量 ==========
        returnShow: true,
        navH: ''
      }
		},
		onLoad() {
			const pages = getCurrentPages();
			this.returnShow = pages.length !== 1;
			// #ifdef H5
			this.navH = app.globalData.navHeight-18;
			// #endif
			this.getSeckillConfig();
		},
		methods: {
      /**
       * 获得时间段
       */
			getSeckillConfig: function() {
        SeckillApi.getSeckillConfigList().then(res => {
          this.dataList = res.data;
          this.dataList.forEach(config => {
            const startTimeInt = parseInt(config.startTime.split(':')[0]) * 60 + parseInt(config.startTime.split(':')[1]);
            const endTimeInt = parseInt(config.endTime.split(':')[0]) * 60 + parseInt(config.endTime.split(':')[1]);
            const nowInt = new Date().getHours() * 60 + new Date().getMinutes();
            if (nowInt < startTimeInt) {
              config.status = 1;
            } else if (nowInt > endTimeInt) {
              config.status = 3;
            } else {
              config.status = 2;
            }
          })
          // 加载秒杀活动
          this.getSeckillList();
        });
			},
      /**
       * 选择一个拼团时间段
       *
       * @param item 时间段
       * @param index 下标
       */
      settimeList: function(item, index) {
        this.active = index
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null
        }
        this.interval = 0;

        // 加载活动列表
        this.loadend = false;
        this.page = 1;
        this.seckillList = [];
        this.getSeckillList();
      },
      /**
       * 获得拼团活动列表
       */
			getSeckillList: function() {
				if (this.loadend || this.pageloading) {
          return;
        }
        SeckillApi.getSeckillActivityPage({
          id: this.dataList[this.active].id,
          pageNo: this.page,
          pageSize: this.limit
        }).then(res => {
					const seckillList = res.data.list;
          seckillList.forEach(item => {
            item.percent = parseInt(100 * (item.totalStock - item.stock) / item.totalStock);
          })
					this.page++;
          this.seckillList = this.seckillList.concat(seckillList);
					this.loadend = seckillList.length < this.limit;
				}).finally(() => {
          this.pageloading = false;
        })
			},
			goDetails(item) {
				uni.navigateTo({
					url: '/pages/activity/goods_seckill_details/index?id=' + item.id
				})
			},
      goBack: function() {
        uni.navigateBack();
      },

      fen2yuan(price) {
        return Util.fen2yuan(price)
      }
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getSeckillList();
		}
	}
</script>
<style>
	page {
		background-color: #F5F5F5 !important;
	}
</style>
<style scoped lang="scss">

   .icon-xiangzuo {
		font-size: 40rpx;
		color: #fff;
		position: fixed;
		left: 30rpx;
		z-index: 99;
		transform: translateY(-20%);
	}
	.flash-sale .header {
		width: 710rpx;
		height: 330rpx;
		margin: -276rpx auto 0 auto;
		border-radius: 14rpx;
		overflow: hidden;
		swiper{
			height: 330rpx !important;
			border-radius: 14rpx;
			overflow: hidden;
		}
	}

	.flash-sale .header image {
		width: 100%;
		height: 100%;
		border-radius: 14rpx;
		overflow: hidden;
		img{
			border-radius: 14rpx;
		}
	}

	.flash-sale .seckillList {
		padding: 25rpx;
	}

	.flash-sale .seckillList .priceTag {
		width: 75rpx;
		height: 70rpx;
	}

	.flash-sale .seckillList .priceTag image {
		width: 100%;
		height: 100%;
	}

	.flash-sale .timeLsit {
		width: 596rpx;
		white-space: nowrap;
	}

	.flash-sale .timeLsit .item {
		display: inline-block;
		font-size: 20rpx;
		color: #666;
		text-align: center;
		box-sizing: border-box;
		margin-right: 30rpx;
		width: 130rpx;
	}

	.flash-sale .timeLsit .item .time {
		font-size: 36rpx;
		font-weight: 600;
		color: #333;
	}

	.flash-sale .timeLsit .item.on .time {
		color: $theme-color;
	}

	.flash-sale .timeLsit .item.on .state {
		height: 30rpx;
		line-height: 30rpx;
		border-radius: 15rpx;
		width: 128rpx;
		/* padding: 0 12rpx; */
		background: linear-gradient(90deg, rgba(252, 25, 75, 1) 0%, rgba(252, 60, 32, 1) 100%);
		color: #fff;
	}

	.flash-sale .countDown {
		height: 92rpx;
		border-bottom: 1rpx solid #f0f0f0;
		margin-top: -14rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.flash-sale .countDown .num {
		font-size: 28rpx;
		font-weight: bold;
		background-color: #ffcfcb;
		padding: 4rpx 7rpx;
		border-radius: 3rpx;
	}

	.flash-sale .countDown .text {
		font-size: 28rpx;
		color: #282828;
		margin-right: 13rpx;
	}

	.flash-sale .list .item {
		height: 230rpx;
		position: relative;
		/* width: 710rpx; */
		margin: 0 auto 20rpx auto;
		background-color: #fff;
		border-radius: 14rpx;
		padding: 25rpx 24rpx;
	}

	.flash-sale .list .item .pictrue {
		width: 180rpx;
		height: 180rpx;
		border-radius: 10rpx;
		background-color: #F5F5F5;
	}

	.flash-sale .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.flash-sale .list .item .text {
		width: 440rpx;
		font-size: 30rpx;
		color: #333;
		height: 166rpx;
	}

	.flash-sale .list .item .text .name {
		width: 100%;
	}

	.flash-sale .list .item .text .money {
		font-size: 30rpx;
		color: $theme-color;
	}

	.flash-sale .list .item .text .money .num {
		font-size: 40rpx;
		font-weight: 500;
		font-family: 'Guildford Pro';
	}

	.flash-sale .list .item .text .money .y_money {
		font-size: 24rpx;
		color: #999;
		text-decoration-line: line-through;
		margin-left: 15rpx;
	}

	.flash-sale .list .item .text .limit {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 5rpx;
	}

	.flash-sale .list .item .text .limit .limitPrice {
		margin-left: 10rpx;
	}

	.flash-sale .list .item .text .progress {
		overflow: hidden;
		background-color: #EEEEEE;
		width: 260rpx;
		border-radius: 18rpx;
		height: 18rpx;
		position: relative;
	}

	.flash-sale .list .item .text .progress .bg-reds {
		width: 0;
		height: 100%;
		transition: width 0.6s ease;
		background: linear-gradient(90deg, rgba(233, 51, 35, 1) 0%, rgba(255, 137, 51, 1) 100%);
	}

	.flash-sale .list .item .text .progress .piece {
		position: absolute;
		left: 8%;
		transform: translate(0%, -50%);
		top: 49%;
		font-size: 16rpx;
		color: #FFB9B9;
	}

	.flash-sale .list .item .grab {
		font-size: 28rpx;
		color: #fff;
		width: 150rpx;
		height: 54rpx;
		border-radius: 27rpx;
		text-align: center;
		line-height: 54rpx;
		position: absolute;
		right: 30rpx;
		bottom: 30rpx;
		background: #bbbbbb;
	}

	.flash-sale .saleBox {
		width: 100%;
		height: 298rpx;
		/* #ifdef MP */
		height: 300rpx;
		/* #endif */
		background: rgba(233, 51, 35, 1);
		border-radius: 0 0 50rpx 50rpx;
	}
</style>
