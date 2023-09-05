<template>
	<view>
		<view class="promoter-order">
			<view class='promoterHeader bg-color'>
				<view class='headerCon acea-row row-between-wrapper'>
					<view>
						<view class='name'>累积推广订单</view>
						<view><text class='num'>{{recordCount || 0}}</text>单</view>
					</view>
					<view class='iconfont icon-2'></view>
				</view>
			</view>
			<view class='list' v-if="recordList.length>0">
				<block v-for="(item, index) in recordList" :key="index">
					<view class='item'>
						<view class='listn'>
							<block :key="index">
								<view class='itenm borRadius14'>
									<view class='top acea-row row-between-wrapper'>
										<view class='pictxt acea-row row-between-wrapper'>
											<view class='text line1'>{{item.title}}</view>
										</view>
										<view class='money'>返佣：<text class='font-color'>￥{{ fen2yuan(item.price) }}</text></view>
									</view>
									<view class='bottom'>
										<view><text class='name'>生效时间：</text>{{ formatDate(item.finishTime) }}</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</block>
			</view>
			<view v-if="recordList.length === 0">
				<emptyPage title="暂无推广订单～"></emptyPage>
			</view>
		</view>
		<home></home>
	</view>
</template>
<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import emptyPage from '@/components/emptyPage.vue'
	import home from '@/components/home';
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
  import * as Util from '@/utils/util.js';
  import dayjs from "@/plugin/dayjs/dayjs.min.js";
  export default {
		components: {
			emptyPage,
			home
		},
		data() {
			return {
				page: 1,
				limit: 10,
				status: false,
				recordList: [],
				recordCount: 0,
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad() {
			if (!this.isLogin) {
        toLogin();
        return;
			}
      this.getRecordOrderList();
    },
		methods: {
			getRecordOrderList: function() {
				if (this.status) {
          return;
        }
        const page = this.page;
        const limit = this.limit;
        const recordList = this.recordList;
        BrokerageAPI.getBrokerageRecordPage({
					pageNo: page,
					pageSize: limit,
          bizType: 1, // 订单
          status: 1, // 已结算
				}).then(res => {
					let recordListData = res.data.list ? res.data.list : [];
          const len = res.data.list ? res.data.list.length : 0;
          const recordListNew = recordList.concat(recordListData);
          this.recordCount = res.data.total || 0;
					this.status = limit > len;
					this.page = page + 1;
          this.$set(this, 'recordList', recordListNew);
				});
			},
      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      },
		},
		onReachBottom() {
			this.getRecordOrderList()
		}
	}
</script>

<style scoped lang="scss">
	.promoter-order .list .item .title {
		height: 133rpx;
		font-size: 26rpx;
		color: #999;
	}

	.promoter-order .list .item .title .data {
		font-size: 28rpx;
		color: #282828;
		margin-bottom: 5rpx;
	}

	.promoter-order .list .item .listn .itenm {
		background-color: #fff;
	}

	.promoter-order .list .item .listn .itenm~.itenm {
		margin-top: 20rpx;
	}

	.promoter-order .list .item .listn .itenm .top {
		padding: 0 24rpx;
		border-bottom: 1rpx solid #eee;
		height: 100rpx;
	}

	.promoter-order .list .item .listn .itenm .top .pictxt {
		width: 320rpx;
	}

	.promoter-order .list .item .listn .itenm .top .pictxt .text {
		width: 230rpx;
		font-size: 30rpx;
		color: #282828;
	}

	.promoter-order .list .item .listn .itenm .top .pictxt .pictrue {
		width: 66rpx;
		height: 66rpx;
	}

	.promoter-order .list .item .listn .itenm .top .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 3rpx solid #fff;
		box-sizing: border-box;
		box-shadow: 0 0 15rpx #aaa;
	}

	.promoter-order .list .item .listn .itenm .top .money {
		font-size: 28rpx;
	}

	.promoter-order .list .item .listn .itenm .bottom {
		padding: 20rpx 24rpx;
		font-size: 28rpx;
		color: #666;
		line-height: 1.6;
	}

	.promoter-order .list .item .listn .itenm .bottom .name {
		color: #999;
	}
</style>
