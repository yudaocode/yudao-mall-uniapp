<template>
	<view>
		<view class='commission-details'>
			<view class='promoterHeader bg-color'>
				<view class='headerCon acea-row row-between-wrapper'>
					<view>
						<view class='name'>{{name}}</view>
						<view class='money' v-if="type === 1">￥<text class='num'>{{ fen2yuan(spreadInfo.withdrawPrice, 0) }}</text></view>
						<view class='money' v-else>￥<text class='num'>{{ fen2yuan(spreadInfo.brokeragePrice, 0) }}</text></view>
					</view>
					<view class='iconfont icon-jinbi1'></view>
				</view>
			</view>
      <!-- 情况一：提现列表 -->
			<view class='sign-record' v-if="type === 1">
				<block v-for="(item,index) in recordList" :key="index" v-if="recordList.length > 0">
					<view class='list'>
						<view class='item'>
							<view class='listn borRadius14'>
								<block :key="index">
									<view class='itemn acea-row row-between-wrapper'>
										<view>
											<view class='name line1'>{{ item.statusName }}</view>
											<view>{{ formatDate(item.createTime) }}</view>
										</view>
										<view class='num font-color'>+{{ fen2yuan(item.price) }}</view>
									</view>
								</block>
							</view>
						</view>
					</view>
				</block>
				<view v-if="recordList.length === 0">
					<emptyPage title='暂无提现记录~'></emptyPage>
				</view>
			</view>
      <!-- 情况二：佣金列表 -->
      <view class='sign-record' v-else>
				<block v-for="(item,index) in recordList" :key="index" v-if="recordList.length > 0">
					<view class='list'>
						<view class='item'>
							<view class='listn borRadius14'>
                <block :key="index">
									<view class='itemn acea-row row-between-wrapper'>
										<view>
											<view class='name line1'>{{ item.title }}</view>
											<view>{{ formatDate(item.createTime) }}</view>
										</view>
										<view class='num font-color' v-if="item.price > 0">+{{item.price}}
										</view>
										<view class='num' v-else>{{item.price}}</view>
									</view>
								</block>
							</view>
						</view>
					</view>
				</block>
				<view v-if="recordList.length === 0">
					<emptyPage title='暂无佣金记录~'></emptyPage>
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
				name: '', // 标题
				type: 0, // 类型；1 - 提现；2 - 佣金

        page: 1,
				limit: 15,
				recordList: [],
				statuss: false, // 是否到达底部

        spreadInfo: {},
      };
		},
		computed: mapGetters(['isLogin']),
		onLoad(options) {
			if (!this.isLogin) {
        toLogin();
        return;
      }
      this.type = parseInt(options.type);
		},
		onShow: function() {
      this.getSpreadInfo();
      // 获得列表
			let type = this.type;
			if (type === 1) {
				uni.setNavigationBarTitle({
					title: "提现记录"
				});
				this.name = '提现总额';
				this.getList();
			} else if (type === 2) {
				uni.setNavigationBarTitle({
					title: "佣金记录"
				});
				this.name = '佣金明细';
				this.getRecordList();
			} else {
				uni.showToast({
					title: '参数错误',
					icon: 'none',
					duration: 1000,
					mask: true,
					success: function(res) {
						setTimeout(function() {
							// #ifndef H5
							uni.navigateBack({
								delta: 1,
							});
							// #endif
							// #ifdef H5
							history.back();
							// #endif
						}, 1200)
					},
				});
			}
		},
		methods: {
      /**
       * 获得提现列表
       */
			getList: function() {
				if (this.statuss) {
          return;
        }
        const recordList = this.recordList;
        let recordListNew = [];
        BrokerageAPI.getBrokerageWithdrawPage({
          pageNo: this.page,
          pageSize: this.limit
				}).then(res => {
					const len = res.data.list ? res.data.list.length : 0;
					const recordListData = res.data.list || [];
					recordListNew = recordList.concat(recordListData);
					this.statuss = this.limit > len;
          this.page = this.page + 1;
          this.$set(this, 'recordList', recordListNew);
				});
			},
      /**
       * 获得佣金列表
       */
			getRecordList: function() {
				if (this.statuss) {
          return;
        }
        let page = this.page;
        let limit = this.limit;
        let recordList = this.recordList;
        let recordListNew = [];
        BrokerageAPI.getBrokerageRecordPage({
					pageNo: this.page,
					pageSize: this.limit
				}).then(res => {
					if (!res.data.list) {
						return;
					}
          const len = res.data.list ? res.data.list.length : 0;
          const recordListData = res.data.list || [];
          recordListNew = recordList.concat(recordListData);
          this.statuss = limit > len;
          this.page = page + 1;
          this.$set(this, 'recordList', recordListNew);
				});
			},
      /**
       * 获取个人用户信息
       */
      getSpreadInfo: function() {
        BrokerageAPI.getBrokerageUserSummary().then(res => {
          this.$set(this,'spreadInfo',res.data);
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
			this.getRecordList();
		}
	}
</script>
<style scoped lang="scss">
	.commission-details .promoterHeader .headerCon .money {
		font-size: 36rpx;
	}

	.commission-details .promoterHeader .headerCon .money .num {
		font-family: 'Guildford Pro';
	}
</style>
