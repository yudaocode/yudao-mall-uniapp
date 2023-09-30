<template>
	<view>
		<form @submit="submitSub" report-submit='true'>
			<view class="payment-top acea-row row-column row-center-wrapper">
				<span class="name">我的余额</span>
				<view class="pic">
					￥<span class="pic-font">{{ fen2yuan(wallet.balance || 0) }}</span>
				</view>
			</view>
			<view class="payment">
				<view class="nav acea-row row-around row-middle">
					<view class="item" :class="active==index?'on':''" v-for="(item,index) in navRecharge" :key="index" @click="navRecharges(index)">{{item}}</view>
				</view>
        <!-- 充值 -->
				<view class='tip picList' v-if='!active'>
					<view class="pic-box pic-box-color acea-row row-center-wrapper row-column" :class="activePic === index ? 'pic-box-color-active' : ''"
					 v-for="(item, index) in picList" :key="index" @click="picCharge(index, item)">
						<view class="pic-number-pic">
							{{ fen2yuan(item.payPrice) }}<span class="pic-number"> 元</span>
						</view>
						<view class="pic-number">赠送：{{ fen2yuan(item.bonusPrice) }} 元</view>
					</view>
					<view class="pic-box pic-box-color acea-row row-center-wrapper" :class="parseFloat(activePic)===parseFloat(picList.length)?'pic-box-color-active':''"
                @click="picCharge(picList.length)">
						<input type="number" placeholder="其他" v-model="money" :maxlength="50000" class="pic-box-money pic-number-pic uni-input"
                   :class="parseFloat(activePic) === parseFloat(picList.length) ? 'pic-box-color-active' : ''" />
					</view>
					<view class="tips-box">
						<view class="tips mt-30">注意事项：</view>
						<view class="tips-samll" v-for="item in rechargeAttention" :key="item">
              {{ item }}
            </view>
					</view>
          <button class='but' formType="submit"> 立即充值 </button>
        </view>

        <!-- 佣金提现 -->
        <view class="tip" v-else>
					<view class='input'><text>￥</text><input placeholder="0.00" type='number' placeholder-class='placeholder' :value="number"
						 name="number"></input></view>
					<view class="tips-title">
						<view style="font-weight: bold; font-size: 26rpx;">提示：</view>
						<view style="margin-top: 10rpx;">当前佣金为 <text class='font-color'>￥{{ fen2yuan(spreadInfo.brokeragePrice || 0) }}</text></view>
					</view>
					<view class="tips-box">
						<view class="tips mt-30">注意事项：</view>
						<view class="tips-samll" v-for="item in rechargeAttention" :key="item">
							{{ item }}
						</view>
					</view>
          <button class='but' formType="submit"> 立即转入 </button>
        </view>
			</view>
		</form>
		<home></home>
	</view>
</template>

<script>
  import * as WalletApi from '@/api/pay/wallet.js';
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
  import * as Util from '@/utils/util.js';
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import home from '@/components/home';
	export default {
		components: {
			home
		},
		data() {
			return {
        wallet: {},
        spreadInfo: {},

        now_money: 0,
				navRecharge: ['账户充值', '佣金转入'],
				active: 0,
				number: '',
				placeholder: "0.00",
				from: '',
				picList: [],
				activePic: 0,
				money: "",
				rechar_id: 0, // 选择的套餐编号
				rechargeAttention: [
          '1、充值金额最少为 1 元',
          '2、充值后只能用于消费',
          '3、提现金额需要有手续费',
          '4、提现到账需要 2~3 天时间'
        ]
			};
		},
		computed: mapGetters(['isLogin', 'systemPlatform','userInfo']),
		watch:{
			isLogin:{
				handler: function(newV, oldV) {
					if(newV){
						this.getRecharge();
					}
				},
				deep:true
			}
		},
		onLoad(options) {
			if (!this.isLogin) {
        toLogin();
        return;
			}
      this.getRecharge();
		},
		methods: {
			/**
			 * 选择金额
			 */
			picCharge(idx, item) {
				this.activePic = idx;
				if (item === undefined) {
					this.rechar_id = 0;
				} else {
					this.money = "";
					this.rechar_id = item.id;
				}
			},

			/**
			 * 充值额度选择
			 */
			getRecharge() {
        // 获得钱包
        WalletApi.getPayWallet().then(res=>{
          this.wallet = res.data;
        })
        // 获得佣金
        BrokerageAPI.getBrokerageUser().then(res => {
          this.$set(this,'spreadInfo',res.data);
        });

        // 获得充值套餐
        WalletApi.getWalletRechargePackageList().then(res => {
          this.picList = res.data;
          if (this.picList.length > 0) {
            this.rechar_id = this.picList[0].id;
          }
        }).catch(res => {
          this.$dialog.toast({
            mes: res
          });
        });
			},

			onLoadFun: function() {
				this.getRecharge();
			},
			navRecharges: function(index) {
				this.active = index;
			},

			/**
			 * 用户充值
			 */
			submitSub: function(e) {
				let that = this
				let value = e.detail.value.number;
				// 转入余额
				if (that.active) {
					if (parseFloat(value) < 0 || parseFloat(value) === NaN || value === undefined || value === "") {
						return that.$util.Tips({
							title: '请输入金额'
						});
					}
					uni.showModal({
						title: '转入余额',
						content: '转入余额后无法再次转出，确认是否转入余额',
						success(res) {
							if (!res.confirm) {
                return that.$util.Tips({
                  title: '已取消'
                });
							}
              BrokerageAPI.createBrokerageWithdraw({
                type: 1,
                price: parseFloat(value) * 100
              }).then(res => {
                return that.$util.Tips({
                  title: '转入成功',
                  icon: 'success'
                }, {
                  tab: 5,
                  url: '/pages/users/user_money/index'
                });
              }).catch(err=>{
                return that.$util.Tips({
                  title: err
                });
              })
						},
					})
				} else {
					uni.showLoading({
						title: '正在支付',
					})
					let money = parseFloat(this.money);
					if (this.rechar_id === 0) {
						if (Number.isNaN(money)) {
							return that.$util.Tips({
								title: '充值金额必须为数字'
							});
						}
						if (money <= 0) {
							return that.$util.Tips({
								title: '充值金额不能为 0'
							});
						}
						if (money > 50000) {
							return that.$util.Tips({
								title: '充值金额最大值为 50000'
							});
						}
					}
          WalletApi.createWalletRecharge({
            payPrice: money ? money * 100 : undefined,
            packageId: this.rechar_id
					}).then(res => {
            const returnUrl = encodeURIComponent('/pages/users/user_payment/index');
            uni.navigateTo({
              url: `/pages/goods/cashier/index?order_id=${res.data.payOrderId}&returnUrl=${returnUrl}`
            })
					}).catch(err => {
						uni.hideLoading();
						return that.$util.Tips({
							title: err
						})
					});
				}
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      }
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.payment {
		position: relative;
		top: -60rpx;
		width: 100%;
		background-color: #fff;
		border-radius: 10rpx;
		padding-top: 25rpx;
		border-top-right-radius: 14rpx;
		border-top-left-radius: 14rpx;
	}

	.payment .nav {
		height: 75rpx;
		line-height: 75rpx;
		padding: 0 100rpx;
	}

	.payment .nav .item {
		font-size: 30rpx;
		color: #333;
	}

	.payment .nav .item.on {
		font-weight: bold;
		border-bottom: 4rpx solid #e83323;
	}

	.payment .input {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px dashed #dddddd;
		margin: 60rpx auto 0 auto;
		padding-bottom: 20rpx;
		font-size: 56rpx;
		color: #333333;
		flex-wrap: nowrap;

	}

	.payment .input text {
		padding-left: 106rpx;
	}

	.payment .input input {
		padding-right: 106rpx;
		width: 300rpx;
		height: 94rpx;
		text-align: center;
		font-size: 70rpx;
	}

	.payment .placeholder {
		color: #d0d0d0;
		height: 100%;
		line-height: 94rpx;
	}

	.payment .tip {
		font-size: 26rpx;
		color: #888888;
		padding: 0 30rpx;
		margin-top: 25rpx;
	}

	.payment .but {
		color: #fff;
		font-size: 30rpx;
		width: 700rpx;
		height: 86rpx;
		border-radius: 43rpx;
		margin: 50rpx auto 0 auto;
		background: linear-gradient(90deg, #FF7931 0%, #F11B09 100%);
		line-height: 86rpx;
	}

	.payment-top {
		width: 100%;
		height: 350rpx;
		background-color: #e83323;

		.name {
			font-size: 26rpx;
			color: rgba(255, 255, 255, 0.8);
			margin-top: -38rpx;
			margin-bottom: 30rpx;
		}

		.pic {
			font-size: 32rpx;
			color: #fff;
		}

		.pic-font {
			font-size: 78rpx;
			color: #fff;
		}
	}

	.picList {
		display: flex;
		flex-wrap: wrap;
		margin: 30rpx 0;

		.pic-box {
			width: 32%;
			height: auto;
			border-radius: 20rpx;
			margin-top: 21rpx;
			padding: 20rpx 0;
			margin-right: 12rpx;

			&:nth-child(3n) {
				margin-right: 0;
			}
		}

		.pic-box-color {
			background-color: #f4f4f4;
			color: #656565;
		}

		.pic-number {
			font-size: 22rpx;
		}

		.pic-number-pic {
			font-size: 38rpx;
			margin-right: 10rpx;
			text-align: center;
		}

	}
    .pic-box-color-active {
			background-color: #ec3323 !important;
			color: #fff !important;
	}
	.tips-box {
		.tips {
			font-size: 28rpx;
			color: #333333;
			font-weight: 800;
			margin-bottom: 14rpx;
			margin-top: 20rpx;
		}

		.tips-samll {
			font-size: 24rpx;
			color: #333333;
			margin-bottom: 14rpx;
		}

		.tip-box {
			margin-top: 30rpx;
		}
	}

	.tips-title {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #333;
	}
</style>
