<template>
	<view>
		<view class='bill-details'>
			<view class='nav acea-row'>
				<view class='item' :class='type === undefined ? "on":""' @click='changeType(undefined)'>全部</view>
				<view class='item' :class='type === "1" ? "on":""' @click='changeType("1")'>收入</view>
				<view class='item' :class='type === "2" ? "on":""' @click='changeType("2")'>支出</view>
			</view>
			<view class='sign-record'>
				<view class='list' v-for="(item,index) in userBillList" :key="index">
					<view class='item'>
						<view class='listn borRadius14'>
							<view class='itemn acea-row row-between-wrapper'>
								<view>
									<view class='name line1'>{{ item.title }}</view>
									<view>{{ formatDate(item.createTime) }}</view>
								</view>
								<view class='num' v-if="item.price > 0">+{{ fen2yuan(item.price) }}</view>
								<view class='num font-color' v-else>{{ fen2yuan(item.price) }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class='loadingicon acea-row row-center-wrapper' v-if="userBillList.length > 0">
					<text class='loading iconfont icon-jiazai' :hidden='loading === false'></text>{{loadTitle}}
				</view>
				<view v-if="userBillList.length === 0">
					<emptyPage title="暂无账单的记录哦～"></emptyPage>
				</view>
			</view>
		</view>
		<home></home>
	</view>
</template>

<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import emptyPage from '@/components/emptyPage.vue';
	import home from '@/components/home';
  import * as WalletApi from '@/api/pay/wallet.js';
  import dayjs from '@/plugin/dayjs/dayjs.min.js';
  import * as Util from '@/utils/util.js';
  export default {
		components: {
			emptyPage,
			home
		},
		data() {
			return {
				loadTitle: '加载更多',
				loading: false,
				loadend: false,
				page: 1,
				limit: 10,
				type: undefined,
				userBillList: [],
			};
		},
		computed: mapGetters(['isLogin']),
		onShow() {
			if (!this.isLogin) {
        toLogin();
        return;
			}
      this.getUserBillList();
    },
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.type = options.type;
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getUserBillList();
		},
		methods: {
			/**
			 * 获取账户明细
			 */
			getUserBillList: function() {
				if (this.loadend || this.loading) {
          return;
        }
				this.loading = true;
				this.loadTitle = "";
        WalletApi.getWalletTransactionPage({
          pageNo: this.page,
          pageSize: this.limit,
          type: this.type
        }).then(res => {
					const list = res.data.list ? res.data.list : [];
					const	loadend = res.data.list < res.data.limit;
					this.userBillList = this.$util.SplitArray(list, this.userBillList);
					this.$set(this, 'userBillList', this.userBillList);
          this.loadend = loadend;
          this.loading = false;
          this.loadTitle = loadend ? "哼😕~我也是有底线的~" : "加载更多";
          this.page = this.page + 1;
				}).catch(err => {
          this.loading = false;
          this.loadTitle = '加载更多';
        });
			},
			/**
			 * 切换导航
			 */
			changeType: function(type) {
				this.type = type;
				this.loadend = false;
				this.page = 1;
				this.$set(this, 'userBillList', []);
				this.getUserBillList();
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      }
		}
	}
</script>
<style scoped lang='scss'>
	.sign-record{

	}
	.bill-details .nav {
		background-color: #fff;
		height: 90rpx;
		width: 100%;
		line-height: 90rpx;
	}

	.bill-details .nav .item {
		flex: 1;
		text-align: center;
		font-size: 30rpx;
		color: #282828;
	}

	.bill-details .nav .item.on {
		color: $theme-color;
		border-bottom: 3rpx solid $theme-color;
	}
</style>
