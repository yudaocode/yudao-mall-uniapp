<template>
	<view>
		<view class='cash-withdrawal'>
			<view class='nav acea-row'>
				<view v-for="(item, index) in WithdrawTypeEnum" :key="index" v-if="withdrawTypes.includes(item.type)"
              class='item font-color' @click="switchWithdrawType(item.type)">
					<view class='line bg-color' :class='withdrawType === item.type ? "on":""'></view>
					<view class='iconfont' :class='item.icon+" "+(withdrawType === item.type ? "on":"")'></view>
					<view>{{item.name}}</view>
				</view>
			</view>
			<view class='wrapper'>
				<view :hidden='withdrawType !== WithdrawTypeEnum.BANK.type' class='list'>
					<form @submit="subCash" report-submit='true'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>持卡人</view>
							<view class='input'><input placeholder='请输入持卡人姓名' placeholder-class='placeholder' name="name"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>卡号</view>
							<view class='input'><input type='number' placeholder='请填写卡号' placeholder-class='placeholder' name="cardum"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>银行</view>
							<view class='input'>
								<picker @change="bindPickerChange" :value="bankIndex" range-key="label" :range="bankList">
									<text class='Bank'>{{bankList[bankIndex] && bankList[bankIndex].label}}</text>
									<text class='iconfont icon-qiepian38'></text>
								</picker>
							</view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>提现</view>
							<view class='input'><input :placeholder='"最低提现金额"+minPrice' placeholder-class='placeholder' name="money" type='digit'></input></view>
						</view>
						<view class='tip'>
              当前可提现金额: <text class="price">￥{{ fen2yuan(commission.brokeragePrice) }}，</text>冻结佣金：￥{{ fen2yuan(commission.frozenPrice) }}
						</view>
						<view class='tip'>
              说明: 每笔佣金的冻结期为{{frozenDays}}天，到期后可提现
						</view>
						<button formType="submit" class='bnt bg-color'>提现</button>
					</form>
				</view>
				<view :hidden='withdrawType !== WithdrawTypeEnum.WECHAT.type' class='list'>
					<form @submit="subCash" report-submit='true'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>账号</view>
							<view class='input'><input placeholder='请填写您的微信账号' placeholder-class='placeholder' name="name"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>提现</view>
							<view class='input'><input :placeholder='"最低提现金额" + minPrice' placeholder-class='placeholder' name="money" type='digit'></input></view>
						</view>
						<view class='item acea-row row-top row-between'>
							<view class='name'>收款码</view>
							<view class="input acea-row">
								<view class="picEwm" v-if="qrcodeUrlW">
									<image :src="qrcodeUrlW"></image>
									<text class='iconfont icon-guanbi1 font-color' @click='DelPicW'></text>
								</view>
								<view class='pictrue acea-row row-center-wrapper row-column' @click='uploadpic("W")' v-else>
								  <text class='iconfont icon-icon25201'></text>
								  <view>上传图片</view>
								</view>
							</view>
						</view>
						<view class='tip'>
              当前可提现金额: <text class="price">￥{{ fen2yuan(commission.brokeragePrice) }}，</text>冻结佣金：￥{{ fen2yuan(commission.frozenPrice) }}
						</view>
						<view class='tip'>
              说明: 每笔佣金的冻结期为{{frozenDays}}天，到期后可提现
						</view>
						<button formType="submit" class='bnt bg-color'>提现</button>
					</form>
				</view>
				<view :hidden='withdrawType !== WithdrawTypeEnum.ALIPAY.type' class='list'>
					<form @submit="subCash" report-submit='true'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>账号</view>
							<view class='input'><input placeholder='请填写您的支付宝账号' placeholder-class='placeholder' name="name"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>提现</view>
							<view class='input'><input :placeholder='"最低提现金额"+minPrice' placeholder-class='placeholder' name="money" type='digit'></input></view>
						</view>
						<view class='item acea-row row-top row-between'>
							<view class='name'>收款码</view>
							<view class="input acea-row">
								<view class="picEwm" v-if="qrcodeUrlZ">
									<image :src="qrcodeUrlZ"></image>
									<text class='iconfont icon-guanbi1 font-color' @click='DelPicZ'></text>
								</view>
								<view class='pictrue acea-row row-center-wrapper row-column' @click='uploadpic("Z")' v-else>
								  <text class='iconfont icon-icon25201'></text>
								  <view>上传图片</view>
								</view>
							</view>
						</view>
						<view class='tip'>
							当前可提现金额: <text class="price">￥{{ fen2yuan(commission.brokeragePrice) }}，</text>冻结佣金：￥{{ fen2yuan(commission.frozenPrice) }}
						</view>
						<view class='tip'>
							说明: 每笔佣金的冻结期为{{frozenDays}}天，到期后可提现
						</view>
						<button formType="submit" class='bnt bg-color'>提现</button>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
  import * as TradeConfigApi from '@/api/trade/config.js';
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
  import * as Util from '@/utils/util.js';
  import { getDicts } from "@/api/system/dict";
  import { DICT_TYPE, BrokerageWithdrawTypeEnum } from "@/utils/dict";
  export default {
		data() {
			return {
				WithdrawTypeEnum: BrokerageWithdrawTypeEnum,
				withdrawType: 0,
				bankIndex: 0,
				bankList: [], // 提现银行
				minPrice: 0.00, // 最低提现金额
        frozenDays: 0, // 佣金冻结期
        withdrawTypes: [], // 提现方式
				isClone: false,
				commission: {}, // 分销信息
				qrcodeUrlW:"",
				qrcodeUrlZ:"",
				isCommitted: false // 防止多次提交
			};
		},
		computed: mapGetters(['isLogin']),
		watch:{
			isLogin:{
				handler: function(newV,oldV) {
					if(newV){
						this.getUserExtractBank();
						this.getExtractUser();
					}
				},
				deep:true
			}
		},
		onLoad() {
			if (!this.isLogin) {
        toLogin();
        return;
			}
      this.getUserExtractBank();
      this.getExtractUser();
		},
		methods: {
			uploadpic: function (type) {
        this.$util.uploadImageOne({}, res => {
          this.newAvatar = res.data;
          if (type === 'W') {
            this.qrcodeUrlW = res.data;
          } else {
            this.qrcodeUrlZ = res.data;
          }
        });
			},
			/**
			 * 删除图片
			*/
			DelPicW: function () {
			  this.qrcodeUrlW = "";
			},
			DelPicZ: function () {
			  this.qrcodeUrlZ = "";
			},
			getExtractUser(){
        BrokerageAPI.getBrokerageUser().then(res=>{
					this.commission = res.data;
				})
        TradeConfigApi.getTradeConfig().then(res => {
          this.minPrice = Util.fen2yuan(res.data.brokerageWithdrawMinPrice || 0);
          this.frozenDays = res.data.brokerageFrozenDays || 0;
          this.withdrawTypes = res.data.brokerageWithdrawType || [];
          this.withdrawType = this.withdrawTypes[0]; // 默认选中第一个提现方式
        });
			},
			getUserExtractBank: function() {
				let that = this;
        getDicts(DICT_TYPE.BROKERAGE_BANK_NAME).then(res => {
					let bankList = res.data;
					bankList.unshift({ label: '请选择银行' });
					that.$set(that, 'bankList', bankList);
				});
			},
			switchWithdrawType: function(current) {
				this.withdrawType = current;
			},
			bindPickerChange: function(e) {
				this.bankIndex = e.detail.value;
			},
			moneyInput(e) {
				//正则表达试
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
        //重新赋值给input
        this.$nextTick(() => {
          this.money= e.target.value
        })
			},
			subCash: function(e) {
				let that = this,
					value = e.detail.value;
        const form = { type: this.withdrawType };
					if (this.withdrawType === this.WithdrawTypeEnum.BANK.type) { // 银行卡
            if (value.name.length === 0) {
              return this.$util.Tips({
                title: '请填写持卡人姓名'
              });
            }
						if (value.cardum.length === 0) {
              return this.$util.Tips({
                title: '请填写卡号'
              });
            }
						if (that.bankIndex === 0) {
              return this.$util.Tips({
                title: "请选择银行"
              });
            }
            form.name = value.name;
            form.accountNo = value.cardum;
            form.bankName = that.bankList[that.bankIndex].value;
					} else if (that.withdrawType === this.WithdrawTypeEnum.WECHAT.type) { // 微信
						if (value.name.length === 0) {
              return this.$util.Tips({
                title: '请填写微信号'
              });
            }
						form.accountNo = value.name;
            form.accountQrCodeUrl = this.qrcodeUrlW;
					} else if (that.withdrawType === this.WithdrawTypeEnum.ALIPAY.type) { // 支付宝
						if (value.name.length === 0) {
              return this.$util.Tips({
                title: '请填写账号'
              });
            }
            form.accountNo = value.name;
            form.accountQrCodeUrl = this.qrcodeUrlZ;
					}
					if (value.money.length === 0) {
            return this.$util.Tips({
              title: '请填写提现金额'
            });
          }
					if (!(/^(\d?)+(\.\d{0,2})?$/.test(value.money))) {
            return this.$util.Tips({
              title: '提现金额保留2位小数'
            });
          }
					if (value.money < that.minPrice) {
            return this.$util.Tips({
              title: '提现金额不能低于' + that.minPrice
            });
          }
          form.price = value.money * 100;
					if (this.isCommitted === false){
            this.isCommitted=true;
            BrokerageAPI.createBrokerageWithdraw(form).then(res => {
              return this.$util.Tips({
                title: "提现成功",
                icon: 'success'
            },{ tab: 2, url: '/pages/users/user_spread_user/index' });
					}).catch(err => {
						 this.isCommitted=false;
              return this.$util.Tips({
                title: err
              });
					});
				}
			},
      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff !important;
	}

	.cash-withdrawal .nav {
		height: 130rpx;
		box-shadow: 0 10rpx 10rpx #f8f8f8;
	}

	.cash-withdrawal .nav .item {
		font-size: 26rpx;
		flex: 1;
		text-align: center;
	}

	.cash-withdrawal .nav .item~.item {
		border-left: 1px solid #f0f0f0;
	}

	.cash-withdrawal .nav .item .iconfont {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 2rpx solid $theme-color;
		text-align: center;
		line-height: 37rpx;
		margin: 0 auto 6rpx auto;
		font-size: 22rpx;
		box-sizing: border-box;
	}

	.cash-withdrawal .nav .item .iconfont.on {
		background-color: $theme-color;
		color: #fff;
		border-color: $theme-color;
	}

	.cash-withdrawal .nav .item .line {
		width: 2rpx;
		height: 20rpx;
		margin: 0 auto;
		transition: height 0.3s;
	}

	.cash-withdrawal .nav .item .line.on {
		height: 39rpx;
	}

	.cash-withdrawal .wrapper .list {
		padding: 0 30rpx;
	}

	.cash-withdrawal .wrapper .list .item {
		border-bottom: 1rpx solid #eee;
		min-height: 28rpx;
		font-size: 30rpx;
		color: #333;
		padding: 39rpx 0;
	}

	.cash-withdrawal .wrapper .list .item .name {
		width: 130rpx;
	}

	.cash-withdrawal .wrapper .list .item .input {
		width: 505rpx;
	}

	.cash-withdrawal .wrapper .list .item .input .placeholder {
		color: #bbb;
	}

	.cash-withdrawal .wrapper .list .item .picEwm,.cash-withdrawal .wrapper .list .item .pictrue{
		width:140rpx;
		height:140rpx;
		border-radius:3rpx;
		position: relative;
		margin-right: 23rpx;
	}

	.cash-withdrawal .wrapper .list .item .picEwm image{
		width:100%;
		height:100%;
		border-radius:3rpx;
	}

	.cash-withdrawal .wrapper .list .item .picEwm .icon-guanbi1{
		position:absolute;
		right: -14rpx;
		top: -16rpx;
		font-size:40rpx;
	}

	.cash-withdrawal .wrapper .list .item .pictrue{
		border:1px solid rgba(221,221,221,1);
		font-size:22rpx;
		color: #BBBBBB;
	}

	.cash-withdrawal .wrapper .list .item .pictrue .icon-icon25201{
		font-size: 47rpx;
		color: #DDDDDD;
		margin-bottom: 3px;
	}

	.cash-withdrawal .wrapper .list .tip {
		font-size: 26rpx;
		color: #999;
		margin-top: 25rpx;
	}

	.cash-withdrawal .wrapper .list .bnt {
		font-size: 32rpx;
		color: #fff;
		width: 690rpx;
		height: 90rpx;
		text-align: center;
		border-radius: 50rpx;
		line-height: 90rpx;
		margin: 64rpx auto;
	}

	.cash-withdrawal .wrapper .list .tip2 {
		font-size: 26rpx;
		color: #999;
		text-align: center;
		margin: 44rpx 0 20rpx 0;
	}

	.cash-withdrawal .wrapper .list .value {
		height: 135rpx;
		line-height: 135rpx;
		border-bottom: 1rpx solid #eee;
		width: 690rpx;
		margin: 0 auto;
	}

	.cash-withdrawal .wrapper .list .value input {
		font-size: 80rpx;
		color: #282828;
		height: 135rpx;
		text-align: center;
	}

	.cash-withdrawal .wrapper .list .value .placeholder2 {
		color: #bbb;
	}

	.price {
		color: $theme-color;
	}
</style>
