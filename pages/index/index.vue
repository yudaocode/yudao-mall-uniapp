<template>
	<view>
		<view class="page-index" :class="{'bgf':navIndex >0}">
			<!-- #ifdef H5 -->
			<view class="header">
				<view class="serch-wrapper flex">
					<view class="logo">
						<image :src="logoUrl" mode="" />
					</view>
					<navigator url="/pages/goods_search/index" class="input" hover-class="none">
            <text class="iconfont icon-xiazai5" /> 搜索商品
          </navigator>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<view class="mp-header">
				<view class="sys-head" :style="{ height: statusBarHeight }"></view>
				<view class="serch-box" style="height: 40px;">
					<view class="serch-wrapper flex">
						<view class="logo">
							<image :src="logoUrl" mode=""></image>
						</view>
						<navigator url="/pages/goods_search/index" class="input" hover-class="none"><text
								class="iconfont icon-xiazai5"></text>
							搜索商品</navigator>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- 首页展示 -->
			<view class="page_content" :style="'margin-top:'+(marTop)+'px;'" v-if="navIndex === 0">
				<view class="mp-bg"></view>
				<!-- banner 轮播图 -->
				<view class="swiper" v-if="slideShows.length">
					<swiper indicator-dots="true" :autoplay="true" :circular="circular" :interval="interval"
						:duration="duration" indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
						<block v-for="(item,index) in slideShows" :key="index">
							<swiper-item>
								<navigator :url='item.url' class='slide-navigator acea-row row-between-wrapper'
									hover-class='none'>
									<image :src="item.picUrl" class="slide-image" lazy-load></image>
								</navigator>
							</swiper-item>
						</block>
					</swiper>
				</view>

				<!-- 新闻简报 -->
				<view class='notice acea-row row-middle row-between' v-if="scrollingNews.length">
					<view class="pic">
						<image src="/static/images/xinjian.png" />
					</view>
					<text class='line'>|</text>
					<view class='swipers'>
						<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" interval="2500" duration="500"
                    vertical="true" circular="true">
							<block v-for="(item,index) in scrollingNews" :key='index'>
								<swiper-item>
									<navigator class='item' :url='item.url' hover-class='none'>
										<view class='line1'>{{ item.name }}</view>
									</navigator>
								</swiper-item>
							</block>
						</swiper>
					</view>
					<view class="iconfont icon-xiangyou" />
				</view>

				<!-- menu 菜单 -->
				<view class='nav acea-row' v-if="menus.length">
					<block v-for="(item,index) in menus" :key="index">
						<navigator class='item' v-if="item.show === '1'" :url='item.url' open-type='switchTab'
                       hover-class='none'>
							<view class='pictrue'>
								<image :src='item.picUrl'></image>
							</view>
							<view class="menu-txt">{{item.name}}</view>
						</navigator>
						<navigator class='item' v-else :url='item.url' hover-class='none'>
							<view class='pictrue'>
								<image :src='item.picUrl'></image>
							</view>
							<view class="menu-txt">{{item.name}}</view>
						</navigator>
					</block>
				</view>

				<!-- 优惠券 -->
				<view class="couponIndex" v-if="couponList.length>0">
					<view class="acea-row" style="height: 100%;">
						<view class="titBox">
							<view class="tit1">领取优惠券</view>
							<view class="tit2">福利大礼包，省了又省</view>
							<navigator class='item' url='/pages/users/user_get_coupon/index' hover-class='none'>
								<view class="tit3">查看全部 <text class="iconfont icon-xiangyou"></text></view>
							</navigator>
						</view>
						<view class="listBox acea-row">
							<view class="list" :class='item.canTake ? "listActive" : "listHui"'
                    v-for="(item, index) in couponList" :key="index">
								<view class="tit line1" :class='item.canTake ? "titActive" : "pricehui"'>{{ item.name }}</view>
								<view class="price" :class='item.canTake ?  "icon-color" : "pricehui"'>
                  <text v-if="item.discountType === 1">{{ fen2yuan(item.discountPrice) }} 元</text>
                  <text v-else>{{ (item.discountPercent / 10.0).toFixed(1) }} 折</text>
                </view>
								<view class="ling icon-color" v-if="item.canTake"
                      @click="getCoupon(item.id,index)">领取</view>
								<view class="ling pricehui fonthui" v-else>已领取</view>
								<view class="priceM">满{{ fen2yuan(item.usePrice) }}元可用</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 营销活动 -->
				<a_seckill />
				<b_combination />
				<c_bargain />

				<!-- 首页推荐 -->
				<view class="sticky-box" :style="'top:'+(marTop)+'px;'">
					<scroll-view class="scroll-view_H" style="width: 100%;" scroll-x="true" scroll-with-animation
						:scroll-left="tabsScrollLeft" @scroll="scroll">
						<view class="tab nav-bd" id="tab_list">
							<view id="tab_item" :class="{ 'active': listActive === index}" class="item"
                    v-for="(item, index) in productRecommends" :key="index" @click="ProductNavTab(item,index)">
								<view class="txt">{{item.name}}</view>
								<view class="label">{{item.tag}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- 首发新品 -->
				<view class="index-product-wrapper" :class="iSshowH?'on':''">
					<view class="list-box animated" :class='tempArr.length > 0?"fadeIn on":""'>
						<view class="item" v-for="(item,index) in tempArr" :key="index" @click="goDetail(item)">
							<view class="pictrue">
								<span class="pictrue_log pictrue_log_class"
									v-if="item.activityList && item.activityList[0] && item.activityList[0].type === 1">秒杀</span>
								<span class="pictrue_log pictrue_log_class"
									v-if="item.activityList && item.activityList[0] && item.activityList[0].type === 2">砍价</span>
								<span class="pictrue_log pictrue_log_class"
									v-if="item.activityList && item.activityList[0] && item.activityList[0].type === 3">拼团</span>
								<image :src="item.picUrl" mode="" />
							</view>
							<view class="text-info">
								<view class="title line1">{{ item.name }}</view>
								<view class="old-price"><text>¥{{ fen2yuan(item.marketPrice) }}</text></view>
								<view class="price">
									<text>￥</text>{{ fen2yuan(item.price) }}
								</view>
							</view>
						</view>
					</view>
					<view class='loadingicon acea-row row-center-wrapper' v-if="goodScroll">
						<text class='loading iconfont icon-jiazai' :hidden='!loading' />
					</view>
					<view class="mores-txt flex" v-if="!goodScroll">
						<text>我是有底线的</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import Cache from '../../utils/cache';
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	let app = getApp();
	import a_seckill from './components/a_seckill';
	import b_combination from './components/b_combination';
	import c_bargain from './components/c_bargain';
	import goodList from '@/components/goodList';
	import { goShopDetail } from '@/libs/order.js'
	import { mapGetters } from "vuex";
	import countDown from '@/components/countDown';
	import recommend from '@/components/recommend';
	import { silenceBindingSpread } from '@/utils';
	import Loading from '@/components/Loading/index.vue';
  import * as ProductSpuApi from '@/api/product/spu.js';
  import * as PromotionActivityApi from '@/api/promotion/activity.js';
  import * as CouponApi from '@/api/promotion/coupon.js';
  import * as DecorateApi from '@/api/promotion/decorate.js';
  import * as ProductUtil from '@/utils/product.js';
  import * as Util from '@/utils/util.js';

	export default {
		computed: mapGetters(['isLogin', 'uid']),
		components: {
			goodList,
			countDown,
			a_seckill,
			b_combination,
			c_bargain,
			recommend,
			Loading
		},
		data() {
			return {
				statusBarHeight: statusBarHeight,
				navIndex: 0,
				navTop: [],
				marTop: 0,
				configApi: {}, // 分享类容配置
				tabsScrollLeft: 0, // tabs 当前偏移量
				scrollLeft: 0,

        slideShows: [], // 轮播图
        circular: true,
        interval: 3000,
        duration: 500,
        menus: [], // 菜单
        scrollingNews: [], // 新闻简报
        indicatorDots: false,
        autoplay: true,
        couponList: [], // 优惠劵列表
        productRecommends: [], // 商品推荐

        site_name: '首页', // 首页 title
        logoUrl: "",

        // ========== 精品推荐 ===========
        goodScroll: true, // 精品推荐开关
        listActive: 0, // 当前选中项
        goodType: 1, //精品推荐 Type
        params: { //精品推荐分页
          page: 1,
          limit: 10,
        },
        loading: false,
        tempArr: [], // 精品推荐临时数组
        iSshowH: false,
      }
		},
		watch: {
			listActive(newVal) { // 监听当前选中项
				this.setTabList()
			}
		},
		mounted() {
			this.setTabList()
		},
		onLoad() {
      // wx.login({
      //   success (res) {
      //     if (res.code) {
      //       console.log(res.code, '======== code 编号 =======')
      //     }
      //   }
      // })

			var that = this;
			// 获取系统信息
			uni.getSystemInfo({
				success(res) {
					that.$store.commit("SYSTEM_PLATFORM", res.platform);
				}
			});
			uni.getLocation({
				type: 'gcj02',
				altitude: true,
				geocode: true,
				success: function(res) {
					try {
						uni.setStorageSync('user_latitude', res.latitude);
						uni.setStorageSync('user_longitude', res.longitude);
					} catch {}
				}
			});
			this.isLogin && silenceBindingSpread();
			this.getIndexConfig();
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.site_name
			})
		},
		methods: {
			// scroll-view滑动事件
			scroll(e) {
				this.scrollLeft = e.detail.scrollLeft;
			},
			setTabList() {
				this.$nextTick(() => {
					this.scrollIntoView()
				})
			},
			// 计算tabs位置
			scrollIntoView() { // item滚动
				let lineLeft = 0;
				this.getElementData('#tab_list', (data) => {
					let list = data[0]
					this.getElementData(`#tab_item`, (data) => {
						let el = data[this.listActive]
            if (el) {
              lineLeft = el.width / 2 + (-list.left) + el.left - list.width / 2 - this.scrollLeft
              this.tabsScrollLeft = this.scrollLeft + lineLeft
            }
					})
				})
			},
			getElementData(el, callback) {
				uni.createSelectorQuery().in(this).selectAll(el).boundingClientRect().exec((data) => {
					callback(data[0]);
				});
			},
			// 首页数据
			getIndexConfig: function() {
				let that = this;
        DecorateApi.getDecorateComponentListByPage(1).then(res => {
          // TODO 芋艿：暂时写死
					uni.setNavigationBarTitle({
						title: '首页'
					})
					this.$set(this, "logoUrl", 'https://static.iocoder.cn/ruoyi-vue-pro-logo.png');
					this.$set(this, "site_name", '首页');
          // #ifdef H5
          this.$store.commit("SET_CHATURL", 'https://cschat.antcloud.com.cn/index.htm?tntInstId=jm7_c46J&scene=SCE01197657');
          Cache.set('chatUrl', 'https://cschat.antcloud.com.cn/index.htm?tntInstId=jm7_c46J&scene=SCE01197657');
          // #endif

          // 轮播图
          const slideShow = res.data.find(item => item.code === 'slide-show');
          if (slideShow) {
            this.$set(this, "slideShows", JSON.parse(slideShow.value));
          }
          // 菜单
          const menu = res.data.find(item => item.code === 'menu');
          if (menu) {
            this.$set(this, "menus", JSON.parse(menu.value));
          }
          // 滚动新闻
          const scrollingNews = res.data.find(item => item.code === 'scrolling-news');
          if (scrollingNews) {
            this.$set(this, "scrollingNews", JSON.parse(scrollingNews.value));
          }
          // 商品推荐
          const productRecommend = res.data.find(item => item.code === 'product-recommend');
          if (productRecommend) {
            this.$set(this, "productRecommends", JSON.parse(productRecommend.value));
            if (this.productRecommends.length > 0) {
              this.goodType = this.productRecommends[0].type
              this.getGroomList();
            }
          }
				})
        // 获得分享配置
        this.shareApi();
        // 获得优惠劵列表
        this.getcouponList();
			},

			shareApi: function() {
        // TODO 芋艿：写死
        const configApi = {
          "title": "芋道商城",
          "synopsis": "芋道商城，好用！",
          "img": "https://static.iocoder.cn/ruoyi-vue-pro-logo.png"
        }
        this.$set(this, 'configApi', configApi);
        // #ifdef H5
        this.setOpenShare(configApi);
        // #endif
			},
			// 微信分享；
			setOpenShare: function(data) {
				let that = this;
				if (that.$wechat.isWeixin()) {
					let configAppMessage = {
						desc: data.synopsis,
						title: data.title,
						link: location.href,
						imgUrl: data.img
					};
					that.$wechat.wechatEvevt(["updateAppMessageShareData", "updateTimelineShareData"], configAppMessage);
				}
			},

      // ========== 优惠劵 ===========
      /**
       * 获得优惠劵列表
       */
      getcouponList() {
        CouponApi.getCouponTemplateList({ count: 2 }).then(res => {
          this.$set(this, 'couponList', res.data);
        }).catch(err => {
          return this.$util.Tips({
            title: err
          });
        });
      },
      /**
       * 领取优惠劵
       */
      getCoupon: function(id, index) {
        CouponApi.takeCoupon(id).then(res => {
          // 设置已领取，即不能再领取
          this.$set(this.couponList[index], 'canTake', res.data !== true);
          this.$util.Tips({
            title: '领取成功'
          });
        }).catch(err => {
          return this.$util.Tips({
            title: err
          });
        })
      },

      // ========== 精品推荐 ===========
      /**
       * 首发新品切换
       */
      ProductNavTab(item, index) {
        this.listActive = index
        this.goodType = item.type
        this.listActive = index
        this.tempArr = []
        this.params.page = 1
        this.goodScroll = true
        this.getGroomList(true)
      },
      /**
       * 商品精品推荐
       */
			getGroomList(onloadH) {
				if (!this.goodScroll) {
          return
        }
				if (onloadH) {
					this.iSshowH = true
				}
        this.loading = true
        ProductSpuApi.getSpuPage({
          recommendType: this.goodType,
          pageNo: this.params.page,
          pageSize: this.params.limit
        }).then(res => {
          const good_list = res.data.list;
          this.iSshowH = false
					this.loading = false
					this.goodScroll = good_list.length >= this.params.limit
					this.params.page++

          // 设置营销活动
          const spuIds = good_list.map(item => item.id);
          if (spuIds.length > 0) {
            PromotionActivityApi.getActivityListBySpuIds(spuIds).then(res => {
              ProductUtil.setActivityList(good_list, res.data);
              this.tempArr = this.tempArr.concat(good_list); // 放在此处，避免 Vue 监控不到数组里的元素变化
            });
          }
				})
			},
      /**
       * 前往商品详情
       */
      goDetail(item) {
        goShopDetail(item, this.uid).then(res => {
          uni.navigateTo({
            url: `/pages/goods_details/index?id=${item.id}`
          })
        })
      },
      fen2yuan(price) {
        return Util.fen2yuan(price)
      }
		},
		/**
		 * 用户点击右上角分享
		 */
		// #ifdef MP
		onShareAppMessage: function() {
			return {
				title: this.configApi.title,
				imageUrl: this.configApi.img,
				desc: this.configApi.synopsis,
				path: '/pages/index/index'
			};
		},
		// #endif
		onReachBottom() {
			if (this.navIndex === 0) {
				// 首页加载更多
				if (this.params.page !== 1) {
					this.getGroomList();
				}
			}
		}
	}
</script>
<style>
	page {
		display: flex;
		flex-direction: column;
		height: 100%;
		/* #ifdef H5 */
		background-color: #fff;
		/* #endif */

	}
</style>
<style lang="scss">
	.notice{
		width: 100%;
		height: 70rpx;
		border-radius: 10rpx;
		background-color: #fff;
		margin-bottom: 25rpx;
		line-height: 70rpx;
		padding: 0 14rpx;
		.line {
			color: #CCCCCC;
		}
		.pic{
			width: 130rpx;
			height: 36rpx;
			image{
				width: 100%;
				height: 100%;
				display: block !important;
			}
		}
		.swipers {
			height: 100%;
			width: 444rpx;
			overflow: hidden;
			swiper {
				height: 100%;
				width: 100%;
				overflow: hidden;
				font-size: 22rpx;
				color: #333333;
			}
		}
		.iconfont {
			color: #999999;
			font-size: 20rpx;
		}
	}
	.couponIndex {
		width: auto;
		height: 238rpx;
		background-image: url('~@/static/images/yhjsy.png');
		background-size: 100% 100%;
		padding-left: 42rpx;
		margin-bottom: 30rpx;

		.titBox {
			padding: 47rpx 0;
			text-align: center;
			height: 100%;

			.tit1 {
				color: #FFEBD2;
				font-size: 34rpx;
				font-weight: 600;
			}

			.tit2 {
				color: #FFEBD2;
				font-size: 22rpx;
				margin:10rpx 0 26rpx 0;
			}

			.tit3 {
				color: #FFDAAF;
				font-size: 24rpx;
				.iconfont {
					font-size: 20rpx;
				}
			}
		}

		.listBox {
			padding: 14rpx 0;

			.listActive {
				background-image: url('~@/static/images/lingyhj.png');
				background-size: 100% 100%;
			}

			.listHui {
				background-image: url('~@/static/images/weiling.png');
				background-size: 100% 100%;
			}

			.list {
				width: 170rpx;
				height: 210rpx;
				padding: 16rpx 0;
				text-align: center;
				margin-left: 24rpx;

				.tit {
					font-size: 18rpx;
					padding: 0 26rpx;
				}

				.titActive {
					color: #C99959;
				}

				.price {
					font-size: 46rpx;
					font-weight: 900;
					margin-top: 4rpx;
				}

				.pricehui {
					color: #B2B2B2;
				}
                .fonthui{
					background-color: #F5F5F5 !important;
				}
				.yuan {
					font-size: 24rpx;
				}

				.ling {
					font-size: 24rpx;
					margin-top: 9.5rpx;
					width: 102rpx;
					height: 36rpx;
					line-height: 36rpx;
					background-color: #FFE5C7;
					border-radius: 28rpx;
					margin: auto;
				}

				.priceM {
					color: #FFDAAF;
					font-size: 22rpx;
					margin-top: 14rpx;
				}
			}
		}
	}

	.sticky-box {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
		/* #ifdef H5*/
		top: var(--window-top);
		/* #endif */

		z-index: 99;
		flex-direction: row;
		margin: 0px;
		background: #f5f5f5;
		padding: 30rpx 0;
	}

	.listAll {
		width: 20%;
		text-indent: 62rpx;
		font-size: 30rpx;
		border-left: 1px #eee solid;
		margin: 1% 0;
		padding: 5rpx;
		position: relative;

		image {
			position: absolute;
			left: 20rpx;
			top: 8rpx;
		}
	}

	.tab {
		position: relative;
		display: flex;
		font-size: 28rpx;
		white-space: nowrap;

		&__item {
			flex: 1;
			padding: 0 20rpx;
			text-align: center;
			height: 60rpx;
			line-height: 60rpx;
			color: #666;

			&.active {
				color: #09C2C9;
			}
		}
	}

	.tab__line {
		display: block;
		height: 6rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;
		border-radius: 3rpx;
		position: relative;
		background: #2FC6CD;
	}

	.scroll-view_H {
		/* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
		white-space: nowrap;
		width: 100%;
	}


	.privacy-wrapper {
		z-index: 999;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #7F7F7F;

		.privacy-box {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 560rpx;
			padding: 50rpx 45rpx 0;
			background: #fff;
			border-radius: 20rpx;

			.title {
				text-align: center;
				font-size: 32rpx;
				text-align: center;
				color: #333;
				font-weight: 700;
			}

			.content {
				margin-top: 20rpx;
				line-height: 1.5;
				font-size: 26rpx;
				color: #666;
				text-indent: 54rpx;

				i {
					font-style: normal;
					color: $theme-color;
				}
			}

			.btn-box {
				margin-top: 40rpx;
				text-align: center;
				font-size: 30rpx;

				.btn-item {
					height: 82rpx;
					line-height: 82rpx;
					background: linear-gradient(90deg, #F67A38 0%, #F11B09 100%);
					color: #fff;
					border-radius: 41rpx;
				}

				.btn {
					padding: 30rpx 0;
				}
			}
		}
	}

	.page-index {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);

		.header {
			width: 100%;
			background-color: $theme-color;
			padding: 28rpx 30rpx;

			.serch-wrapper {
				align-items: center;


				.logo {
					width: 118rpx;
					height: 42rpx;
					margin-right: 24rpx;
				}

				image {
					width: 118rpx;
					height: 42rpx;
				}

				.input {
					display: flex;
					align-items: center;
					width: 546rpx;
					height: 58rpx;
					padding: 0 0 0 30rpx;
					background: rgba(247, 247, 247, 1);
					border: 1px solid rgba(241, 241, 241, 1);
					border-radius: 29rpx;
					color: #BBBBBB;
					font-size: 26rpx;

					.iconfont {
						margin-right: 20rpx;
						font-size: 26rpx;
						color: #666666;
					}
				}
			}

			.tabNav {
				padding-top: 24rpx;
			}
		}

		/* #ifdef MP */
		.mp-header {
			z-index: 999;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			/* #ifdef H5 */
			padding-bottom: 20rpx;
			/* #endif */
			background-color: $theme-color;

			.serch-wrapper {
				height: 100%;
				align-items: center;
				padding: 0 50rpx 0 53rpx;

				image {
					width: 118rpx;
					height: 42rpx;
					margin-right: 30rpx;
				}

				.input {
					display: flex;
					align-items: center;
					/* #ifdef MP */
					width: 305rpx;
					/* #endif */
					height: 50rpx;
					padding: 0 0 0 30rpx;
					background: rgba(247, 247, 247, 1);
					border: 1px solid rgba(241, 241, 241, 1);
					border-radius: 29rpx;
					color: #BBBBBB;
					font-size: 28rpx;

					.iconfont {
						margin-right: 20rpx;
					}
				}
			}
		}

		/* #endif */

		.page_content {
			background-color: #f5f5f5;
			/* #ifdef H5 */
			// margin-top: 20rpx !important;
			/* #endif */
			padding: 0 30rpx;

			.swiper {
				position: relative;
				width: 100%;
				height: 280rpx;
				margin: 0 auto;
				border-radius: 10rpx;
				overflow: hidden;
				margin-bottom: 25rpx;
				/* #ifdef MP */
				z-index: 10;
				margin-top: 20rpx;

				/* #endif */
				swiper,
				.swiper-item,
				image {
					width: 100%;
					height: 280rpx;
					border-radius: 10rpx;
				}
			}

			.nav {
				padding-bottom: 26rpx;
				background: #fff;
				opacity: 1;
				border-radius: 14rpx;
				width: 100%;
				margin-bottom: 30rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 20%;
					margin-top: 30rpx;

					image {
						width: 82rpx;
						height: 82rpx;
					}
				}
			}


			.nav-bd {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.txt {
						font-size: 32rpx;
						color: #282828;
					}

					.label {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 124rpx;
						height: 32rpx;
						margin-top: 5rpx;
						font-size: 24rpx;
						color: #999;
					}

					&.active {
						color: $theme-color;

						.txt {
							color: $theme-color;
						}

						.label {
							background: linear-gradient(90deg, $bg-star 0%, $bg-end 100%);
							border-radius: 16rpx;
							color: #fff;
						}
					}
				}
			}

			.index-product-wrapper {
				margin-bottom: 110rpx;

				&.on {
					min-height: 1500rpx;
				}

				.list-box {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.item {
						width: 335rpx;
						margin-bottom: 20rpx;
						background-color: #fff;
						border-radius: 10rpx;
						overflow: hidden;

						image {
							width: 100%;
							height: 330rpx;
						}

						.text-info {
							padding: 10rpx 20rpx 15rpx;

							.title {
								color: #222222;
							}

							.old-price {
								margin-top: 8rpx;
								font-size: 26rpx;
								color: #AAAAAA;
								text-decoration: line-through;

								text {
									margin-right: 2px;
									font-size: 20rpx;
								}
							}

							.price {
								display: flex;
								align-items: flex-end;
								color: $theme-color;
								font-size: 34rpx;
								font-weight: 800;

								text {
									padding-bottom: 4rpx;
									font-size: 24rpx;
									font-weight: 800;
								}

								.txt {
									display: flex;
									align-items: center;
									justify-content: center;
									width: 28rpx;
									height: 28rpx;
									margin-left: 15rpx;
									margin-bottom: 10rpx;
									border: 1px solid $theme-color;
									border-radius: 4rpx;
									font-size: 22rpx;
									font-weight: normal;
								}
							}
						}
					}

					&.on {
						display: flex;
					}
				}
			}
		}
	}

	.productList {
		/* #ifdef H5 */
		padding-bottom: 140rpx;
		/* #endif */
	}

	.productList .list {
		padding: 0 20rpx;
	}

	.productList .list.on {
		background-color: #fff;
		border-top: 1px solid #f6f6f6;
	}

	.productList .list .item {
		width: 345rpx;
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
	}

	.productList .list .item.on {
		width: 100%;
		display: flex;
		border-bottom: 1rpx solid #f6f6f6;
		padding: 30rpx 0;
		margin: 0;
	}

	.productList .list .item .pictrue {
		position: relative;
		width: 100%;
		height: 345rpx;
	}

	.productList .list .item .pictrue.on {
		width: 180rpx;
		height: 180rpx;
	}

	.productList .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx 20rpx 0 0;
	}

	.productList .list .item .pictrue image.on {
		border-radius: 6rpx;
	}

	.productList .list .item .text {
		padding: 20rpx 17rpx 26rpx 17rpx;
		font-size: 30rpx;
		color: #222;
	}

	.productList .list .item .text.on {
		width: 508rpx;
		padding: 0 0 0 22rpx;
	}

	.productList .list .item .text .money {
		font-size: 26rpx;
		font-weight: bold;
		margin-top: 8rpx;
	}

	.productList .list .item .text .money.on {
		margin-top: 50rpx;
	}

	.productList .list .item .text .money .num {
		font-size: 34rpx;
	}

	.productList .list .item .text .vip {
		font-size: 22rpx;
		color: #aaa;
		margin-top: 7rpx;
	}

	.productList .list .item .text .vip.on {
		margin-top: 12rpx;
	}

	.productList .list .item .text .vip .vip-money {
		font-size: 24rpx;
		color: #282828;
		font-weight: bold;
	}

	.productList .list .item .text .vip .vip-money image {
		width: 46rpx;
		height: 21rpx;
		margin-left: 4rpx;
	}

	.pictrue {
		position: relative;
	}

	.fixed {
		z-index: 100;
		position: fixed;
		left: 0;
		top: 0;
		background: linear-gradient(90deg, red 50%, #ff5400 100%);

	}

	.mores-txt {
		width: 100%;
		align-items: center;
		justify-content: center;
		height: 70rpx;
		color: #999;
		font-size: 24rpx;

		.iconfont {
			margin-top: 2rpx;
			font-size: 20rpx;
		}
	}

	.menu-txt {
		font-size: 24rpx;
		color: #454545;
	}

	.mp-bg {
		position: absolute;
		left: 0;
		/* #ifdef H5 */
		top: 98rpx;
		/* #endif */
		width: 100%;
		height: 304rpx;
		background: linear-gradient(180deg, #E93323 0%, #F5F5F5 100%, #751A12 100%);
		// border-radius: 0 0 30rpx 30rpx;
	}
</style>
