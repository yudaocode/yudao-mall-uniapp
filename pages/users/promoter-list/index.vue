<template>
	<view>
		<view class="promoter-list">
			<view class='promoterHeader bg-color'>
				<view class='headerCon acea-row row-between'>
					<view>
						<view class='name'>推广人数</view>
						<view><text class='num'>{{peopleData.firstBrokerageUserCount + peopleData.secondBrokerageUserCount}}</text>人</view>
					</view>
					<view class='iconfont icon-tuandui'></view>
				</view>
			</view>
			<view class="pad30">
				<view class='nav acea-row row-around'>
					<view :class="level === 1 ? 'item on' : 'item'" @click='setType(1)'>一级({{peopleData.firstBrokerageUserCount}})</view>
					<view :class="level === 2 ? 'item on' : 'item'" @click='setType(2)'>二级({{peopleData.secondBrokerageUserCount}})
					</view>
				</view>
				<view class='search acea-row row-between-wrapper'>
					<view class='input'><input placeholder='点击搜索会员名称' placeholder-class='placeholder' v-model="nickname"
							@confirm="submitForm" confirm-type='search' name="search"></input></view>
					<button class='iconfont icon-sousuo2' @click="submitForm"></button>
				</view>
				<view class='list'>
					<view class="sortNav acea-row row-middle">
						<view class="sortItem" @click='setSort("userCount","asc")' v-if="sort === 'userCountDESC'">团队排序
							<image src='/static/images/sort1.png'></image>
						</view>
						<view class="sortItem" @click='setSort("userCount", "desc")' v-else-if="sort === 'userCountASC'">团队排序
							<image src='/static/images/sort3.png'></image>
						</view>
						<view class="sortItem" @click='setSort("userCount","desc")' v-else>团队排序
							<image src='/static/images/sort2.png'></image>
						</view>
						<view class="sortItem" @click='setSort("price","asc")' v-if="sort === 'priceDESC'">
							金额排序
							<image src='/static/images/sort1.png'></image>
						</view>
						<view class="sortItem" @click='setSort("price", "desc")' v-else-if="sort === 'priceASC'">金额排序
							<image src='/static/images/sort3.png'></image>
						</view>
						<view class="sortItem" @click='setSort("price","desc")' v-else>金额排序
							<image src='/static/images/sort2.png'></image>
						</view>
						<view class="sortItem" @click='setSort("orderCount","asc")' v-if="sort === 'orderCountDESC'">订单排序
							<image src='/static/images/sort1.png'></image>
						</view>
						<view class="sortItem" @click='setSort("orderCount", "desc")' v-else-if="sort === 'orderCountASC'">订单排序
							<image src='/static/images/sort3.png'></image>
						</view>
						<view class="sortItem" @click='setSort("orderCount","desc")' v-else>订单排序
							<image src='/static/images/sort2.png'></image>
						</view>
					</view>
					<block v-for="(item,index) in recordList" :key="index">
						<view class='item acea-row row-between-wrapper'>
							<view class="picTxt acea-row row-between-wrapper">
								<view class='pictrue'>
									<image :src='item.avatar'></image>
								</view>
								<view class='text'>
									<view class='name line1'>{{item.nickname}}</view>
									<view>加入时间: {{ formatDate(item.brokerageTime) }}</view>
								</view>
							</view>
							<view class="right">
								<view><text class='num font-color'>{{ item.brokerageUserCount || 0}}</text>人
								</view>
								<view><text class="num">{{ item.orderCount|| 0}}</text>单</view>
								<view><text class="num">{{ fen2yuan(item.brokeragePrice || 0) }}</text>元</view>
							</view>
						</view>
					</block>
					<Loading :loaded="status" :loading="loadingList"></Loading>
					<block v-if="recordList.length === 0 && isShow">
						<emptyPage title="暂无推广人数～"></emptyPage>
					</block>
				</view>
			</view>
		</view>
		<home></home>
	</view>
</template>
<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import emptyPage from '@/components/emptyPage.vue'
	import Loading from "@/components/Loading";
	import home from '@/components/home';
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
  import * as Util from '@/utils/util.js';
  import dayjs from "@/plugin/dayjs/dayjs.min.js";
  export default {
		components: {
			Loading,
			emptyPage,
			home
		},
		data() {
			return {
        peopleData: {
          firstBrokerageUserCount: 0,
          secondBrokerageUserCount: 0
        },

        recordList: [],
        page: 1,
				limit: 20,
				nickname: '',
				isAsc: 'desc',
				sortKey: 'userCount',
        sort: 'userCountDESC',
        level: 1,
				status: false,
				loadingList: false,
				isShow: false,
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad() {
			if (!this.isLogin) {
        toLogin();
        return;
			}
      this.userSpreadNewList();
      this.spreadPeoCount();
		},
		onShow: function() {
			if (this.is_show) this.userSpreadNewList();
		},
		onHide: function() {
			this.is_show = true;
		},
		methods: {
			setSort: function(sortKey, isAsc) {
				this.isAsc = isAsc;
				this.sort = sortKey + isAsc.toUpperCase();
				this.sortKey = sortKey;
				this.page = 1;
				this.limit = 20;
				this.status = false;
				this.$set(this, 'recordList', []);
				this.userSpreadNewList();
			},
			submitForm: function() {
				this.page = 1;
				this.limit = 20;
				this.status = false;
				this.$set(this, 'recordList', []);
				this.userSpreadNewList();
			},

			setType: function(level) {
				if (this.level !== level) {
					this.level = level;
					this.page = 1;
					this.limit = 20;
					this.nickname = '';
					this.status = false;
					this.loadingList = false;
					this.$set(this, 'recordList', []);
					this.userSpreadNewList();
				}
			},
			spreadPeoCount() {
        BrokerageAPI.getBrokerageUserSummary().then(res => {
					this.peopleData = res.data;
				});
			},
			userSpreadNewList: function() {
				let page = this.page;
				let limit = this.limit;
				let status = this.status;
 				let recordList = this.recordList;
				let recordListNew = [];
				if (this.loadingList || status) {
          return;
        }
        BrokerageAPI.getBrokerageUserChildSummaryPage({
					pageNo: page,
					pageSize: limit,
					nickname: this.nickname,
					level: this.level,
					'sortingField.field': this.sortKey,
          'sortingField.order': this.isAsc,
				}).then(res => {
					let recordListData = res.data.list ? res.data.list : [];
					let len = recordListData.length;
					recordListNew = recordList.concat(recordListData);
					this.status = limit > len;
					this.page = page + 1;
					this.$set(this, 'recordList', recordListNew || []);
					this.loadingList = false;
					if (this.recordList.length === 0) {
            this.isShow = true;
          }
				});
			},
      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      },
		},
		onReachBottom: function() {
			this.userSpreadNewList();
		}
	}
</script>

<style scoped lang="scss">
	.promoter-list .nav {
		background-color: #fff;
		height: 86rpx;
		line-height: 86rpx;
		font-size: 28rpx;
		color: #282828;
		border-bottom: 1rpx solid #eee;
		border-top-left-radius: 14rpx;
		border-top-right-radius: 14rpx;
		margin-top: -30rpx;
	}

	.promoter-list .nav .item.on {
		border-bottom: 5rpx solid $theme-color;
		color: $theme-color;
	}

	.promoter-list .search {
		width: 100%;
		background-color: #fff;
		height: 100rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		border-bottom-left-radius: 14rpx;
		border-bottom-right-radius: 14rpx;
	}

	.promoter-list .search .input {
		width: 592rpx;
		height: 60rpx;
		border-radius: 50rpx;
		background-color: #f5f5f5;
		text-align: center;
		position: relative;
	}

	.promoter-list .search .input input {
		height: 100%;
		font-size: 26rpx;
		width: 610rpx;
		text-align: center;
	}

	.promoter-list .search .input .placeholder {
		color: #bbb;
	}

	.promoter-list .search .input .iconfont {
		position: absolute;
		right: 28rpx;
		color: #999;
		font-size: 28rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.promoter-list .search .iconfont {
		font-size: 32rpx;
		color: #515151;
		height: 60rpx;
		line-height: 60rpx;
	}

	.promoter-list .list {
		margin-top: 20rpx;
	}

	.promoter-list .list .sortNav {
		background-color: #fff;
		height: 76rpx;
		border-bottom: 1rpx solid #eee;
		color: #333;
		font-size: 28rpx;
		border-top-left-radius: 14rpx;
		border-top-right-radius: 14rpx;
	}

	.promoter-list .list .sortNav .sortItem {
		text-align: center;
		flex: 1;
	}

	.promoter-list .list .sortNav .sortItem image {
		width: 24rpx;
		height: 24rpx;
		margin-left: 6rpx;
		vertical-align: -3rpx;
	}

	.promoter-list .list .item {
		background-color: #fff;
		border-bottom: 1rpx solid #eee;
		height: 152rpx;
		padding: 0 24rpx;
		font-size: 24rpx;
		color: #666;
	}

	.promoter-list .list .item .picTxt .pictrue {
		width: 106rpx;
		height: 106rpx;
		border-radius: 50%;
	}

	.promoter-list .list .item .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 3rpx solid #fff;
		box-shadow: 0 0 10rpx #aaa;
		box-sizing: border-box;
	}

	.promoter-list .list .item .picTxt .text {
		// width: 304rpx;
		font-size: 24rpx;
		color: #666;
		margin-left: 14rpx;
	}

	.promoter-list .list .item .picTxt .text .name {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 13rpx;
	}

	.promoter-list .list .item .right {
		text-align: right;
		font-size: 22rpx;
		color: #333;
	}

	.promoter-list .list .item .right .num {
		margin-right: 7rpx;
	}
</style>
