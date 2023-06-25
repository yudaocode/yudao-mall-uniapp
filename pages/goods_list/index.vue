<template>
	<view>
		<view class='productList'>
			<view class='search bg-color acea-row row-between-wrapper'>
				<!-- #ifdef H5 -->
				<view class="iconfont icon-xiangzuo" @click="goback()"></view>
				<!-- #endif -->
				<view class='input acea-row row-between-wrapper'><text class='iconfont icon-sousuo'></text>
					<input placeholder='搜索商品名称' placeholder-class='placeholder' confirm-type='search' name="search"
						:value='where.keyword' @confirm="searchSubmit" />
				</view>
				<view class='iconfont' :class='is_switch ? "icon-pailie":"icon-tupianpailie"' @click='Changswitch'>
				</view>
			</view>
			<view class='nav acea-row row-middle'>
				<view class='item' :class='title ? "font-color":""' @click='set_where(1)'>{{title ? title:'默认'}}</view>
				<view class='item' @click='set_where(2)'>
					价格
					<image v-if="price === 1" src='../../static/images/up.png'></image>
					<image v-else-if="price === 2" src='../../static/images/down.png'></image>
					<image v-else src='../../static/images/horn.png'></image>
				</view>
				<view class='item' @click='set_where(3)'>
					销量
					<image v-if="stock === 1" src='../../static/images/up.png'></image>
					<image v-else-if="stock === 2" src='../../static/images/down.png'></image>
					<image v-else src='../../static/images/horn.png'></image>
				</view>
				<!-- down -->
				<view class='item' :class='nows ? "font-color":""' @click='set_where(4)'>新品</view>
			</view>
			<view :class='is_switch?"":"listBox"' v-if="productList.length > 0">
				<view class='list acea-row row-between-wrapper' :class='is_switch?"":"on"'>
					<view class='item' :class='is_switch?"":"on"' hover-class='none'
						v-for="(item,index) in productList" :key="index" @click="godDetail(item)">
						<view class='pictrue' :class='is_switch?"":"on"'>
							<image :src='item.picUrl' :class='is_switch?"":"on"'></image>
							<span class="pictrue_log_class"
								:class="is_switch ? 'pictrue_log_big' : 'pictrue_log'"
								v-if="item.activityList && item.activityList[0] && item.activityList[0].type === 1">秒杀</span>
							<span class="pictrue_log_class"
								:class="is_switch ? 'pictrue_log_big' : 'pictrue_log'"
								v-if="item.activityList && item.activityList[0] && item.activityList[0].type === 2">砍价</span>
							<span class="pictrue_log_class"
								:class="is_switch ? 'pictrue_log_big' : 'pictrue_log'"
								v-if="item.activityList && item.activityList[0] && item.activityList[0].type === 3">拼团</span>
						</view>
						<view class='text' :class='is_switch?"":"on"'>
							<view class='name line1'>{{item.name}}</view>
							<view class='money font-color' :class='is_switch?"":"on"'>￥<text
									class='num'>{{ fen2yuan(item.price) }}</text></view>
							<view class='vip acea-row row-between-wrapper' :class='is_switch?"":"on"'>
								<view class='vip-money' v-if="item.vipPrice > 0">￥{{ fen2yuan(item.vipPrice) }}
									<image src='../../static/images/vip.png'></image>
								</view>
								<view>已售 {{ item.salesCount || 0}} {{item.unitName}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class='loadingicon acea-row row-center-wrapper' v-if='productList.length > 0'>
					<text class='loading iconfont icon-jiazai' :hidden='!loading'/> {{loadTitle}}
				</view>
			</view>
		</view>
		<view class='noCommodity' v-if="productList.length === 0 && where.pageNo > 1">
			<view class='pictrue'>
				<image src='../../static/images/noShopper.png'></image>
			</view>
			<recommend :hostProduct="hostProduct" />
		</view>
	</view>
</template>
<script>
	import recommend from '@/components/recommend';
	import { mapGetters } from "vuex";
	import { goShopDetail } from '@/libs/order.js'
  import * as ProductSpuApi from '@/api/product/spu.js';
  import * as PromotionActivityApi from '@/api/promotion/activity.js';
  import * as ProductUtil from '@/utils/product.js';
  import * as Util from '@/utils/util.js';
  export default {
		computed: mapGetters(['uid']),
		components: {
			recommend
		},
		data() {
			return {
				productList: [],
				is_switch: true,
				where: { // 筛选条件
					keyword: '',
          sortField: '',
          sortAsc: '',
          recommendType: '',
					pageNo: 1,
					pageSize: 20,
          categoryId: 0,
				},
				price: 0,
				stock: 0,
				nows: false,
				loadend: false,
				loading: false,
				loadTitle: '加载更多',
				title: '',

        // ========== 热门商品 ==========
				hostProduct: [],
				hotPage: 1,
				hotLimit: 10,
				hotScroll: false
			};
		},
		onLoad: function(options) {
			this.$set(this.where, 'categoryId', options.cid || 0);
			this.title = options.title || '';
			this.$set(this.where, 'keyword', options.searchValue || '');
			this.get_product_list();
		},
		methods: {
			goback() {
				// #ifdef H5
				return history.back();
				// #endif
				// #ifndef H5
				return uni.navigateBack({
					delta: 1,
				})
				// #endif
			},
			// 去详情页
			godDetail(item) {
				goShopDetail(item, this.uid).then(res => {
					uni.navigateTo({
						url: `/pages/goods_details/index?id=${item.id}`
					})
				})
			},
			Changswitch: function() {
				this.is_switch = !this.is_switch
			},
			searchSubmit: function(e) {
        this.$set(this.where, 'keyword', e.detail.value);
        this.loadend = false;
        this.$set(this.where, 'pageNo', 1)
				this.get_product_list(true);
			},
      /**
       * 点击事件处理
       */
			set_where: function(e) {
				switch (e) {
					case 1:
						return;
						break;
					case 2:
						if (this.price === 0) this.price = 1;
						else if (this.price === 1) this.price = 2;
						else if (this.price === 2) this.price = 0;
						this.stock = 0;
						break;
					case 3:
						if (this.stock === 0) this.stock = 1;
						else if (this.stock === 1) this.stock = 2;
						else if (this.stock === 2) this.stock = 0;
						this.price = 0
						break;
					case 4:
						this.nows = !this.nows;
						break;
				}
				this.loadend = false;
				this.$set(this.where, 'pageNo', 1);
				this.get_product_list(true);
			},
      /**
       * 设置where条件
       */
			setWhere: function() {
				if (this.price === 0 && this.stock === 0) {
          this.where.sortField = undefined;
          this.where.sortAsc = undefined;
        } else if (this.price === 1) {
          this.where.sortField = 'price';
          this.where.sortAsc = true;
        } else if (this.price === 2) {
          this.where.sortField = 'price';
          this.where.sortAsc = false;
        } else if (this.stock === 1) {
          this.where.sortField = 'salesCount';
          this.where.sortAsc = true;
        } else if (this.stock === 2) {
          this.where.sortField = 'salesCount';
          this.where.sortAsc = false;
        }
				this.where.recommendType = this.nows ? 'new' : undefined;
			},
      /**
       * 查找产品
       */
			get_product_list: function(isPage) {
				this.setWhere();
				if (this.loadend || this.loading) {
          return;
        }
				if (isPage === true) {
          this.$set(this, 'productList', []);
        }
				this.loading = true;
				this.loadTitle = '';
        ProductSpuApi.getSpuPage(this.where).then(res => {
          const good_list = res.data.list;
          const loadend = good_list.length < this.where.limit;
					this.loadend = loadend;
					this.loading = false;
					this.loadTitle = loadend ? '已全部加载' : '加载更多';
					this.$set(this.where, 'pageNo', this.where.pageNo + 1);
          // 设置营销活动
          const spuIds = good_list.map(item => item.id);
          if (spuIds.length > 0) {
            PromotionActivityApi.getActivityListBySpuIds(spuIds).then(res => {
              ProductUtil.setActivityList(good_list, res.data);
              const productList = this.$util.SplitArray(good_list, this.productList)
              this.$set(this, 'productList', productList); // 放在此处，避免 Vue 监控不到数组里的元素变化
            });
          }

          // 加载不到商品的情况下，加载热门商品
					if (good_list.length === 0 && this.productList.length === 0) {
						this.get_host_product();
					}
        }).catch(err => {
					this.loading = false;
					this.loadTitle = '加载更多';
				});
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
      },

      fen2yuan(price) {
        return Util.fen2yuan(price)
      }
		},
		onReachBottom() {
			if (this.productList.length > 0) {
				this.get_product_list();
			} else {
				this.get_host_product();
			}
		}
	}
</script>

<style scoped lang="scss">
	.iconfont {
		color: #fff;
	}
    .listBox{
		padding: 20px 15px;
		margin-top: 154rpx;
	}
	.productList .search {
		width: 100%;
		height: 86rpx;
		padding-left: 23rpx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
	}

	.productList .search .input {
		// width: 640rpx;
		height: 60rpx;
		background-color: #fff;
		border-radius: 50rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.productList .search .input input {
		/* #ifdef H5 */
		width: 528rpx;
		/* #endif */
		/* #ifndef H5 */
		width: 548rpx;
		/* #endif */
		height: 100%;
		font-size: 26rpx;
	}

	.productList .search .input .placeholder {
		color: #999;
	}

	.productList .search .input .iconfont {
		font-size: 35rpx;
		color: #555;
	}

	.productList .search .icon-pailie,
	.productList .search .icon-tupianpailie {
		color: #fff;
		width: 62rpx;
		font-size: 40rpx;
		height: 86rpx;
		line-height: 86rpx;
	}

	.productList .nav {
		height: 86rpx;
		color: #454545;
		position: fixed;
		left: 0;
		width: 100%;
		font-size: 28rpx;
		background-color: #fff;
		margin-top: 86rpx;
		top: 0;
		z-index: 9;
	}

	.productList .nav .item {
		width: 25%;
		text-align: center;
	}

	.productList .nav .item.font-color {
		font-weight: bold;
	}

	.productList .nav .item image {
		width: 15rpx;
		height: 19rpx;
		margin-left: 10rpx;
	}

	.productList .list {
		padding: 0 30rpx;
		margin-top: 192rpx;

	}

	.productList .list.on {
		border-radius: 14rpx;
		margin-top: 0 !important;
		background-color: #fff;
		padding: 40rpx 0 0 0;
		// margin: 20rpx 0;
		// background-color: #fff;
	}

	.productList .list .item {
		width: 335rpx;
		background-color: #fff;
		border-radius: 14rpx;
		margin-bottom: 20rpx;
	}

	.productList .list .item.on {
		width: 100%;
		display: flex;
		padding: 0 24rpx 50rpx 24rpx;
		margin: 0;
		border-radius: 14rpx;
	}

	.productList .list .item .pictrue {
		position: relative;
		width: 100%;
		height: 335rpx;
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
		padding: 18rpx 20rpx;
		font-size: 30rpx;
		color: #222;
	}

	.productList .list .item .text.on {
		width: 456rpx;
		padding: 0 0 0 20rpx;
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

	.noCommodity {
		background-color: #fff;
		padding-bottom: 30rpx;
		margin-top: 172rpx;
	}
</style>
