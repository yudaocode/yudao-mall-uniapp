<template>
	<view>
		<view class="hdbj"></view>
		<!-- 收藏列表 -->
    <view class='collectionGoods' v-if="collectProductList.length">
			<!-- #ifdef  H5 || MP-->
			<view class='nav acea-row row-between-wrapper'>
				<view>当前共 <text class='num font-color'>{{ totals }}</text>件商品</view>
				<view class='administrate acea-row row-center-wrapper' @click='manage'>{{ footerswitch ? '管理' : '取消'}}
				</view>
			</view>
			<!-- #endif -->
			<view class="list">
				<checkbox-group @change="checkboxChange" class="centent">
					<view v-for="(item,index) in collectProductList" :key="index" class='item acea-row row-middle'>
						<checkbox :value="item.id.toString()" :checked="item.checked" v-if="!footerswitch"
							style="margin-right: 10rpx;" />
						<navigator :url='"/pages/goods_details/index?id="+item.spuId' hover-class='none'
							class="acea-row">
							<view class='pictrue'>
								<image :src="item.picUrl" />
							</view>
							<view>
								<view class='name line1'>{{ item.spuName }}</view>
								<view class='money font-color'>￥{{ item.price }}</view>
							</view>
						</navigator>
					</view>
				</checkbox-group>
			</view>
			<view class='loadingicon acea-row row-center-wrapper'>
				<text class='loading iconfont icon-jiazai' :hidden='!loading' />{{loadTitle}}
			</view>
			<view v-if="!footerswitch" class='footer acea-row row-between-wrapper'>
				<view>
					<checkbox-group @change="checkboxAllChange">
						<checkbox value="all" :checked="!!isAllSelect" />
						<text class='checkAll'>全选</text>
					</checkbox-group>
				</view>
				<view class='button acea-row row-middle'>
					<form @submit="delCollectionAll" report-submit='true'>
						<button class='bnt cart-color' formType="submit">取消收藏</button>
					</form>
				</view>
			</view>
		</view>

    <!-- 热门商品 -->
    <view class='noCommodity' v-else-if="!collectProductList.length && page > 1">
			<view class='pictrue'>
				<image src='../static/noCollection.png'></image>
			</view>
			<recommend :hostProduct="hostProduct"></recommend>
		</view>
		<home></home>
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	import { toLogin } from '@/libs/login.js';
	import recommend from '@/components/recommend';
	import home from '@/components/home';
  import * as ProductSpuApi from '@/api/product/spu.js';
  import * as ProductFavoriteApi from '@/api/product/favorite.js';
  import * as PromotionActivityApi from '@/api/promotion/activity.js';
  import * as ProductUtil from '@/utils/product.js';
	export default {
		components: {
			recommend,
			home
		},
		data() {
			return {
				footerswitch: true,
				loadTitle: '加载更多',
				loading: false,
				loadend: false,
				collectProductList: [], // 收藏列表
				limit: 8,
				page: 1,
				isAllSelect: false, // 全选
				selectValue: [], // 选中的数据
				totals: 0,

        // ========== 热门推荐 ==========
        hostProduct: [],
        hotPage: 1,
        hotLimit: 10,
        hotScroll: false,
      };
		},
		computed: mapGetters(['isLogin']),
		onLoad() {
			if (!this.isLogin) {
        toLogin();
				return
			}
      this.loadend = false;
      this.page = 1;
      this.collectProductList = [];
      this.get_user_collect_product();
		},
		onShow() {
			this.loadend = false;
			this.page = 1;
			this.collectProductList = [];
			this.get_user_collect_product();
		},
		methods: {
      /**
       * 获取收藏产品
       */
      get_user_collect_product: function() {
        let that = this;
        if (this.loading || this.loadend) {
          return;
        }
        this.loading = true;
        this.loadTitle = "";
        ProductFavoriteApi.getFavoritePage({
          pageNo: this.page,
          pageSize: this.limit
        }).then(res => {
          this.totals = res.data.total;
          const collectProductList = res.data.list;
          const loadend = collectProductList.length < this.limit;
          this.collectProductList = this.$util.SplitArray(collectProductList, this.collectProductList);
          this.$set(that, 'collectProductList', this.collectProductList);
          this.loadend = loadend;
          this.loadTitle = loadend ? '我也是有底线的' : '加载更多';
          this.page = this.page + 1;
          this.loading = false;

          // 如果没有收藏，加载热门商品
          if (this.totals === 0) {
            this.get_host_product();
          }
        }).catch(err => {
          this.loading = false;
          this.loadTitle = "加载更多";
        });
      },
      /**
       * 删除多个收藏
       */
      delCollectionAll: function() {
        // 取消收藏
        if (!this.selectValue || this.selectValue.length === 0) {
          return this.$util.Tips({
            title: '请选择商品'
          });
        }
        ProductFavoriteApi.deleteFavoriteList(this.selectValue).then(res => {
          this.$util.Tips({
            title: '取消收藏成功',
            icon: 'success'
          });
          // 重新获得收藏列表
          this.collectProductList = [];
          this.loadend = false;
          this.page = 1;
          this.get_user_collect_product();
        }).catch(err => {
          return this.$util.Tips({
            title: err
          })
        });
      },
      /**
       * 进入【管理】
       */
			manage: function() {
				this.footerswitch = !this.footerswitch;
			},
      /**
       * 选中某个收藏
       */
			checkboxChange: function(event) {
        const items = this.collectProductList;
        const values = event.detail.value;
        for (let i = 0; i < items.length; ++i) {
					const item = items[i]
					if (values.includes(item.spuId)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				this.selectValue = values;
				this.isAllSelect = items.length === values.length;
			},
      /**
       * 全选收藏
       */
			checkboxAllChange: function(event) {
				let value = event.detail.value;
				if (value.length > 0) {
					this.setAllSelectValue(1)
				} else {
					this.setAllSelectValue(0)
				}
			},
      /**
       * 全选收藏
       */
			setAllSelectValue: function(status) {
				const selectValue = [];
				if (this.collectProductList.length > 0) {
					this.collectProductList.map(item => {
						if (status) {
							this.$set(item, 'checked', true)
							selectValue.push(item.spuId);
							this.isAllSelect = true;
						} else {
							this.$set(item, 'checked', false)
							this.isAllSelect = false;
						}
					});
					this.selectValue = selectValue.toString();
				}
			},
			/**
			 * 获取我的推荐
			 */
			get_host_product: function() {
				if (this.hotScroll) {
          return
        }
        ProductSpuApi.getSpuPage({
          recommendType: 'hot',
          pageNo: this.hotPage,
          pageSize: this.hotLimit
        }).then(res => {
          const good_list = res.data.list;
          this.hotPage++
          this.hotScroll = good_list.length < this.hotLimit

          // 设置营销活动
          const spuIds = good_list.map(item => item.id);
          if (spuIds.length > 0) {
            PromotionActivityApi.getActivityListBySpuIds(spuIds).then(res => {
              ProductUtil.setActivityList(good_list, res.data);
              this.hostProduct = this.hostProduct.concat(good_list) // 放在此处，避免 Vue 监控不到数组里的元素变化
            });
          }
        });
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
			this.get_user_collect_product();
			this.get_host_product();
		}
	}
</script>

<style scoped lang="scss">

	.hdbj {
		width: 100%;
		height: 30rpx;
		background-color: #f5f5f5;
		z-index: 999999;
		position: fixed;
		top: 0;
	}

	.order-item {
		width: 100%;
		display: flex;
		position: relative;
		align-items: right;
		flex-direction: row;
	}

	.remove {
		width: 120rpx;
		height: 100%;
		background-color: $theme-color;
		color: white;
		position: absolute;
		top: 0;
		right: -160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
	}

	.collectionGoods {

		.nav {
			width: 92%;
			height: 90rpx;
			background-color: #fff;
			padding: 0 24rpx;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			font-size: 28rpx;
			color: #282828;
			position: fixed;
			left: 30rpx;
			z-index: 5;
			top: 30rpx;
			border-bottom: 1px solid #EEEEEE;
			border-top-left-radius: 14rpx;
			border-top-right-radius: 14rpx;
		}

		.list {
			padding: 30rpx;
			margin-top: 90rpx;

			.name {
				width: 434rpx;
				margin-bottom: 56rpx;
			}
		}

		.centent {
			/* #ifdef H5 || MP */
			background-color: #fff;
			/* #endif */
			border-bottom-left-radius: 14rpx;
			border-bottom-right-radius: 14rpx;
		}
	}

	.collectionGoods .item {
		background-color: #fff;
		padding-left: 24rpx;
		height: 180rpx;
		margin-bottom: 15rpx;
		border-radius: 14rpx;

	}

	.collectionGoods .item .pictrue {
		width: 130rpx;
		height: 130rpx;
		margin-right: 20rpx;
	}

	.collectionGoods .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 14rpx;
	}

	.collectionGoods .item .text {
		width: 535rpx;
		height: 130rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.collectionGoods .item .text .name {
		width: 100%;
	}

	.collectionGoods .item .text .money {
		font-size: 26rpx;
	}

	.collectionGoods .item .text .delete {
		font-size: 26rpx;
		color: #282828;
		width: 144rpx;
		height: 46rpx;
		border: 1px solid #bbb;
		border-radius: 4rpx;
		text-align: center;
		line-height: 46rpx;
	}

	.noCommodity {
		background-color: #fff;
		padding-top: 1rpx;
		border-top: 0;
	}

	.footer {
		z-index: 9;
		width: 100%;
		height: 96rpx;
		background-color: #fff;
		position: fixed;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-top: 1rpx solid #eee;
		border-bottom: 1px solid #EEEEEE;
		/* #ifdef H5 || MP */
		bottom: 0rpx;
		/* #endif */
		/* #ifndef MP */
		// bottom: 98rpx;
		// bottom: calc(98rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		// bottom: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		/* #endif */
		.checkAll {
			font-size: 28rpx;
			color: #282828;
			margin-left: 16rpx;
		}

		.button .bnt {
			font-size: 28rpx;
			color: #999;
			border-radius: 30rpx;
			border: 1px solid #999;
			width: 160rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
		}
	}
</style>
