<template>
	<div>
		<view class="combinationBj"></view>
		<div class="combinationList">
			<view class='group-list'>
				<!-- #ifdef H5 -->
				<view class='iconfont icon-xiangzuo' @tap='goBack' :style="'top:'+ (navH/2) +'rpx'" v-if="returnShow"></view>
				<!-- #endif -->
				<!-- banner -->
				<view class="swiper" v-if="bannerList.length">
					<swiper indicator-dots="true" :autoplay="true" :circular="circular" :interval="interval"
						:duration="duration" indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
						<block v-for="(item,index) in bannerList" :key="index">
							<swiper-item>
								<navigator :url='item.url' class='slide-navigator acea-row row-between-wrapper'
									hover-class='none'>
									<image :src="item.picUrl" class="slide-image" lazy-load />
								</navigator>
							</swiper-item>
						</block>
					</swiper>
				</view>
        <!-- 拼团概要 -->
        <view class="nav acea-row row-between-wrapper">
					<image src="../static/zuo.png"></image>
					<view class="title acea-row row-center">
						<view class="spike-bd">
							<view v-if="summary.avatars.length > 0" class="activity_pic">
								<view v-for="(item,index) in summary.avatars" :key="index" class="picture"
									:style='index === 6?"position: relative":"position: static"'>
									<span class="avatar" :style='"background-image: url("+item+")"'></span>
									<span v-if="index === 6 && summary.avatars.length > 3" class="mengceng">
										<i>···</i>
									</span>
								</view>
							</view>
						</view>
						<text class="pic_count">{{ summary.userCount || 0 }}人参与</text>
					</view>
					<image src="../static/you.png"></image>
				</view>
        <!-- 拼团活动 -->
				<view class='list'>
					<block v-for="(item,index) in combinationList" :key='index'>
						<view class='item acea-row row-between-wrapper' @tap="openSubcribe(item)"
						 data-url=''>
							<view class='pictrue'>
								<image :src='item.picUrl'></image>
							</view>
							<view class='text'>
								<view class='line2'>{{ item.name }}</view>
								<text class='y-money'>￥{{ fen2yuan(item.marketPrice) }}</text>
								<view class='bottom acea-row row-between-wrapper'>
									<view class='money'>￥<text class='num'>{{ fen2yuan(item.combinationPrice) }}</text></view>
									<view class="btn acea-row">
										<view class="num">{{ item.userSize }}人团</view>
										<view class="goBye">去拼团</view>
									</view>
								</view>
							</view>
						</view>
					</block>
					<view class='loadingicon acea-row row-center-wrapper' v-if='combinationList.length > 0'>
						<text class='loading iconfont icon-jiazai' :hidden='!loading' /> {{loadTitle}}
					</view>
				</view>
			</view>
			<home></home>
		</div>
	</div>
</template>
<script>
	import { openPinkSubscribe } from '../../../utils/SubscribeMessage.js';
  import * as CombinationApi from '@/api/promotion/combination.js';
  import * as BannerApi from '@/api/promotion/banner.js';
  import * as Util from '@/utils/util.js';
  import home from '@/components/home/index.vue'
  import {getCombinationRecordSummary} from "../../../api/promotion/combination";
	let app = getApp();
	export default {
		components: {
			home
		},
		data() {
			return {
        // 拼团活动列表
        combinationList: [],
        loading: false,
        loadend: false,
        limit: 10,
        page: 1,
        loadTitle: '',

        // 拼团记录概要
        summary: {
          userCount: 0,
          avatars: [],
        },

        // banner 相关
        bannerList: [],
        circular: true,
        autoplay: true,
        interval: 3000,
        duration: 500,

        // 导航相关
				navH: '',
				returnShow: true,
			}
		},
		onShow() {
			this.getCombinationList();
		},
		onLoad() {
			var pages = getCurrentPages();
			this.returnShow = pages.length !== 1;
			uni.setNavigationBarTitle({
				title: "拼团列表"
			})
			// #ifdef MP
			this.navH = app.globalData.navH;
			// #endif
			// #ifdef H5
			this.navH = app.globalData.navHeight;
			// #endif

      // 获得拼团活动列表
			this.getCombinationList();
      // 获得拼团概要
			this.getCombinationHeader();
      // 获得 banner 列表
      this.getBannerList();
		},
    onReachBottom: function() {
      this.getCombinationList();
    },
		methods: {
      /**
       * 获得拼团活动列表
       */
      getCombinationList: function() {
        if (this.loadend || this.loadend) {
          return;
        }
        this.loadTitle = '';
        this.loading = true
        CombinationApi.getCombinationActivityPage({
          pageNo: this.page,
          pageSize: this.limit
        }).then(res => {
          let list = res.data.list;
          let combinationList = this.$util.SplitArray(list, this.combinationList);
          let loadend = list.length < this.limit;
          this.loadend = loadend;
          this.loading = false;
          this.loadTitle = loadend ? '已全部加载' : '加载更多';
          this.$set(this, 'combinationList', combinationList);
          this.$set(this, 'page', this.page + 1);
        }).catch(() => {
          this.loading = false;
          this.loadTitle = '加载更多';
        })
      },
      /**
       * 跳转拼团活动详情
       *
       * @param item 拼团活动
       */
      openSubcribe: function(item) {
        // #ifndef MP
        uni.navigateTo({
          url: `/pages/activity/goods_combination_details/index?id=${item.id}`
        });
        // #endif

        // #ifdef MP
        uni.showLoading({
          title: '正在加载',
        })
        openPinkSubscribe().then(res => {
          uni.hideLoading();
          uni.navigateTo({
            url: `/pages/activity/goods_combination_details/index?id=${item.id}`
          });
        }).catch(() => {
          uni.hideLoading();
        });
        // #endif
      },
			goBack: function() {
				uni.navigateBack();
			},
      /**
       * 获得拼团记录概要
       */
			getCombinationHeader: function() {
        CombinationApi.getCombinationRecordSummary().then(res => {
          this.summary = res.data;
        })
			},
      /**
       * 获得 banner 列表
       */
      getBannerList() {
        BannerApi.getBannerList(10).then(res => {
          this.bannerList = res.data;
        })
      },

      fen2yuan(price) {
        return Util.fen2yuan(price)
      }
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #E93323 !important;
	}
</style>
<style lang="scss" scoped>
	.combinationBj{
		position: absolute;
		width: 100%;
		height: 990rpx;
		background: url(../static/pinbei.png) no-repeat;
		background-size: 100% 100%;
	}
	.mengceng {
		width: 40rpx;
		height: 40rpx;
		line-height: 36rpx;
		background: rgba(51, 51, 51, 0.6);
		text-align: center;
		border-radius: 50%;
		opacity: 1;
		position: absolute;
		left: -2rpx;
		color: #FFF;
		top: 2rpx;
		i{
			font-style: normal;
			font-size: 20rpx;
		}
	}
	.activity_pic {

		.picture {
			display: inline-table;
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
	}
    .combinationList{
		width: 100%;
		height: 100%;
		padding: 25rpx 30rpx;
		.swiper{
			width: 100%;
			height: 300rpx;
			border-radius: 14rpx;
			margin-bottom: 34rpx;
			swiper,
			.swiper-item,
			image {
				width: 100%;
				height: 300rpx;
				border-radius: 10rpx;
			}
		}
		.nav{
			width: 100%;
			margin-bottom: 34rpx;
			image{
				width: 102rpx;
				height: 4rpx;
			}
		}
		.title {
			width: 68%;
			.pic_count {
				margin-left: 30rpx;
				color: $theme-color;
				font-size: 22rpx;
				font-weight: 500;
				width: auto;
				height: auto;
				background: #C6483C;
				color: #FFFFFF;
				border-radius: 19rpx;
				padding: 4rpx 14rpx;
			}
		}
	}
	.icon-xiangzuo {
		font-size: 40rpx;
		color: #fff;
		position: fixed;
		left: 30rpx;
		z-index: 99;
		transform: translateY(-20%);
	}

	.group-list .list .item {
		background-color: #fff;
		border-radius: 14rpx;
		padding: 22rpx;
		box-sizing: border-box;
		margin: 0 auto 20rpx auto;
	}

	.group-list .list .item .pictrue {
		width: 186rpx;
		height: 186rpx;
	}

	.group-list .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.group-list .list .item .text {
		width: 440rpx;
		font-size: 30rpx;
		color: #333333;
		margin-left: 20rpx;
		.line2{
			height: 86rpx;
		}
		.btn{
			.num{
				width: auto;
				height: 58rpx;
				line-height: 58rpx;
				background-color:#FFEFDB;
				padding-left: 22rpx;
				padding-right: 36rpx;
				color: $theme-color;
				font-size: 24rpx;
				-webkit-border-top-left-radius: 15px;
				-webkit-border-bottom-left-radius: 15px;
			}
			.goBye{
				width: 130rpx;
				height: 58rpx;
				z-index: 11;
				background: url(../static/shandian.png) no-repeat;
				background-size: 100% 100%;
				line-height: 58rpx;
				font-size: 24rpx;
				padding-left: 36rpx;
				padding-right: 10rpx;
				color: #fff;
				margin-left: -28rpx;
			}
		}
	    .nothing{
			width: 148rpx;
			height: 58rpx;
			text-align: center;
			line-height: 58rpx;
			background: #CCCCCC;
			opacity: 1;
			color: #FFFFFF;
			border-radius: 30rpx;
			font-size: 24rpx;
		}
	}

	.group-list .list .item .text .team {
		height: 38rpx;
		border-radius: 4rpx;
		font-size: 22rpx;
		margin-top: 20rpx;
	}

	.group-list .list .item .text .team .iconfont {
		width: 54rpx;
		background-color: #ffdcd9;
		text-align: center;
		color: #dd3823;
		height: 100%;
	}

	.group-list .list .item .text .team .num {
		text-align: center;
		padding: 0 6rpx;
		height: 100%;
	}

	.group-list .list .item .text .bottom .money {
		font-size: 24rpx;
		font-weight: bold;
		color: $theme-color;
	}

	.group-list .list .item .text .bottom .money .num {
		font-size: 32rpx;
	}

	.group-list .list .item .text .y-money {
		font-size: 24rpx;
		color: #999;
		font-weight: normal;
		text-decoration: line-through;
	}

	.group-list .list .item .text .bottom .groupBnt {
		font-size: 26rpx;
		color: #fff;
		width: 146rpx;
		height: 54rpx;
		text-align: center;
		line-height: 54rpx;
		border-radius: 4rpx;
	}

	.group-list .list .item .text .bottom .groupBnt .iconfont {
		font-size: 25rpx;
		vertical-align: 2rpx;
		margin-left: 10rpx;
	}
</style>
