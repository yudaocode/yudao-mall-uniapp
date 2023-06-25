<template>
	<view>
		<view class='searchGood'>
			<view class='search acea-row row-between-wrapper'>
				<view class='input acea-row row-between-wrapper'>
					<text class='iconfont icon-sousuo2'></text>
					<input type='text' :value='searchValue' :focus="focus" placeholder='点击搜索商品'
                 placeholder-class='placeholder' @input="setValue" />
				</view>
				<view class='bnt' @tap='searchBut'>搜索</view>
			</view>
      <!-- 搜索词 -->
			<view class='title'>热门搜索</view>
			<view class='list acea-row'>
				<block v-for="(item,index) in hotSearchList" :key="index">
					<view class='item' @tap='setHotSearchValue(item.title)'>{{item.title}}</view>
				</block>
			</view>
			<view class='line'></view>
      <!-- 搜索结果 -->
			<goodList :bastList="bastList" v-if="bastList.length > 0" />
			<view class='loadingicon acea-row row-center-wrapper' v-if="bastList.length > 0">
				<text class='loading iconfont icon-jiazai' :hidden='!loading' /> {{loadTitle}}
			</view>
		</view>

    <!-- 商品推荐 -->
		<view class='noCommodity'>
			<view class='pictrue'  v-if="bastList.length === 0 && isbastList">
				<image src='../../static/images/noSearch.png'></image>
			</view>
			<recommend :hostProduct='hostProduct' v-if="bastList.length === 0"></recommend>
		</view>
	</view>
</template>

<script>
	import { getSearchKeyword } from '@/api/store.js';
	import goodList from '@/components/goodList';
	import recommend from '@/components/recommend';
  import * as ProductSpuApi from '@/api/product/spu.js';
  import * as PromotionActivityApi from '@/api/promotion/activity.js';
  import * as ProductUtil from '@/utils/product.js';
  export default {
		components: {
			goodList,
			recommend
		},
		data() {
			return {
        // ========== 商品搜索 ==========
        hotSearchList: [], // 热门搜索词
        searchValue: '',
				focus: true,

				bastList: [],  // 商品搜索结果
				limit: 8,
				page: 1,
				loading: false,
				loadend: false,
				loadTitle: '加载更多',
				isbastList: false,

        // ========== 商品推荐 ==========
        hostProduct: [],
        hotPage: 1,
        isScroll: true,
      };
		},
		onShow: function() {
			this.getRoutineHotSearch();
			this.getHostProduct();
		},
		onReachBottom: function() {
			if(this.bastList.length > 0){
				this.getProductList();
			} else {
				this.getHostProduct();
			}
		},
		methods: {
      /**
       * TODO 芋艿：待接入
       */
			getRoutineHotSearch: function() {
				getSearchKeyword().then(res => {
					this.$set(this, 'hotSearchList', res.data);
				});
			},
      /**
       * 输入搜索热词
       *
       * @param searchValue 搜索热词
       */
      setHotSearchValue: function(searchValue) {
        this.setValue(searchValue);
        this.page = 1;
        this.loadend = false;
        this.$set(this, 'bastList', []);
        this.getProductList();
      },
      /**
       * 输入搜索词
       *
       * @param searchValue 搜索词
       */
      setValue: function(searchValue) {
        this.$set(this, 'searchValue', searchValue.detail.value);
      },
      /**
       * 点击搜索
       */
      searchBut: function() {
        this.focus = false;
        if (this.searchValue.length > 0) {
          this.page = 1;
          this.loadend = false;
          this.$set(this, 'bastList', []);
          uni.showLoading({
            title: '正在搜索中'
          });
          this.getProductList();
          uni.hideLoading();
        } else {
          return this.$util.Tips({
            title: '请输入要搜索的商品',
            icon: 'none',
            duration: 1000,
            mask: true,
          });
        }
      },
      /**
       * 执行搜索商品
       */
			getProductList: function() {
				if (this.loadend || this.loading) {
          return;
        }
				this.loading = true;
				this.loadTitle = '';
        ProductSpuApi.getSpuPage({
					keyword: this.searchValue,
          pageNo: this.page,
          pageSize: this.limit
				}).then(res => {
					const good_list = res.data.list;
          const	loadend = good_list.length < this.limit;
					this.loading = false;
					this.loadend = loadend;
					this.loadTitle = loadend ? "😕人家是有底线的~~" : "加载更多";
					this.page = this.page + 1;
					this.isbastList = true;
          // 设置营销活动
          const spuIds = good_list.map(item => item.id);
          if (spuIds.length > 0) {
            PromotionActivityApi.getActivityListBySpuIds(spuIds).then(res => {
              ProductUtil.setActivityList(good_list, res.data);
              this.bastList = this.$util.SplitArray(good_list, this.bastList); // 放在此处，避免 Vue 监控不到数组里的元素变化
            });
          }
        }).catch(err => {
					this.loading = false
					this.loadTitle = '加载更多'
				});
			},
      /**
       * 获得热门推荐
       */
			getHostProduct: function() {
				if (!this.isScroll) {
          return
        }
        ProductSpuApi.getSpuPage({
          recommendType: 'hot',
          pageNo: this.hotPage,
          pageSize: this.limit
        }).then(res => {
          const good_list = res.data.list;
          this.isScroll = good_list.length >= this.limit
          this.hotPage += 1;
          // 设置营销活动
          const spuIds = good_list.map(item => item.id);
          if (spuIds.length > 0) {
            PromotionActivityApi.getActivityListBySpuIds(spuIds).then(res => {
              ProductUtil.setActivityList(good_list, res.data);
              this.hostProduct = this.hostProduct.concat(good_list); // 放在此处，避免 Vue 监控不到数组里的元素变化
            });
          }
				});
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #fff !important;
	}

	.searchGood .search {
		padding-left: 30rpx;
		background-color: #fff !important;
	}

	.searchGood .search {
		padding-top: 20rpx;
	}

	.searchGood .search .input {
		width: 598rpx;
		background-color: #f7f7f7;
		border-radius: 33rpx;
		padding: 0 35rpx;
		box-sizing: border-box;
		height: 66rpx;
	}

	.searchGood .search .input input {
		width: 472rpx;
		font-size: 26rpx;
	}

	.searchGood .search .input .placeholder {
		color: #bbb;
	}

	.searchGood .search .input .iconfont {
		color: #000;
		font-size: 35rpx;
	}

	.searchGood .search .bnt {
		width: 120rpx;
		text-align: center;
		height: 66rpx;
		line-height: 66rpx;
		font-size: 30rpx;
		color: #282828;
	}

	.searchGood .title {
		font-size: 28rpx;
		color: #999;
		margin: 50rpx 30rpx 25rpx 30rpx;
	}

	.searchGood .list {
		padding-left: 10rpx;
	}

	.searchGood .list .item {
		font-size: 26rpx;
		color: #454545;
		padding: 0 21rpx;
		height: 60rpx;
		border-radius: 30rpx;
		line-height: 60rpx;
		border: 1rpx solid #aaa;
		margin: 0 0 20rpx 20rpx;
	}

	.searchGood .line {
		border-bottom: 1rpx solid #eee;
		margin: 20rpx 30rpx 0 30rpx;
	}
</style>
