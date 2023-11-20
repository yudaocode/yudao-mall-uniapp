<template>
	<view class="page" v-if="payPrice">
		<view class="pay-price">
			<view class="price">
				<text class="unit">￥</text>
				<numberScroll :num='(payPrice / 100.0).toFixed(2)' color="#E93323" width='30' height='50' fontSize='50' />
			</view>
			<view class="count-down">
        支付剩余时间：
        <countDown :is-day="false" :tip-text="' '" :day-text="' '" :hour-text="' : '" :minute-text="' : '" :second-text="' '"
                   :datatime="invalidTime / 1000" :is-col="true" :bgColor="bgColor" />
			</view>
		</view>
		<view class="payment" v-if="channelCode.length > 0">
			<view class="title">
        支付方式
			</view>
			<view class="item acea-row row-between-wrapper" v-for="(item,index) in channels" :key="index" @click="payType(item.code)">
				<view class="left acea-row row-between-wrapper">
					<view class="iconfont" :class="item.icon"></view>
					<view class="text">
						<view class=name>{{item.name}}</view>
						<view class="info" v-if="item.code === 'wallet'">
							{{item.title}} <span class="money">￥{{ fen2yuan(wallet.balance || 0) }}</span>
						</view>
						<view class="info" v-else>{{item.title}}</view>
					</view>
				</view>
				<view class="iconfont" :class="item.code === channelCode ? 'icon-xuanzhong11 font-num':'icon-weixuan'" />
			</view>
		</view>
		<view class="btn">
			<view class="button acea-row row-center-wrapper" @click='goPay(channelCode)'>确认支付</view>
			<view class="wait-pay" @click="goReturnUrl('cancel')">暂不支付</view>
		</view>
	</view>
</template>
<script>
  import CountDown from "@/components/countDown";
	import numberScroll from '@/components/numberScroll.vue'
  import * as PayOrderApi from '@/api/pay/order.js';
  import * as PayChannelApi from '@/api/pay/channel.js';
  import * as WalletApi from '@/api/pay/wallet.js';
  import {fen2yuan} from "../../../utils/util";
  import { mapGetters } from "vuex";
  export default {
    computed: mapGetters([ 'openid' ]),
    components: {
      CountDown,
			numberScroll
		},
		data() {
			return {
        orderId: 0, // 支付单号
        returnUrl: '', // 调回地址
        payPrice: 0, // 支付金额
        invalidTime: 0, // 过期时间

        wallet: {},

        channelCode: '', // 选中的支付渠道
        channels: [{ // 支付方式
          name: '微信支付', // 微信公众号
          icon: "icon-weixin2",
          title: '使用微信快捷支付',
          code: "wx_pub"
        }, {
          name: '微信支付', // 微信小程序
          icon: "icon-weixin2",
          title: '使用微信快捷支付',
          code: "wx_lite"
        }, {
          name: '支付宝支付',
          icon: "icon-zhifubao",
          title: '使用支付宝支付',
          code: "alipay_wap"
        }, {
          name: '余额支付',
          icon: "icon-yuezhifu",
          title: '可用余额',
          code: "wallet"
        }, {
          name: '模拟支付',
          icon: "icon-yuezhifu",
          title: '使用模拟支付',
          code: "mock"
        },

        // 如下是各种示例接入的示例，默认关闭
        {
            name: '支付宝支付（PC）', // PC 支付
            icon: "icon-zhifubao",
            title: '使用支付宝支付',
            code: "alipay_pc"
        }],

        bgColor: {
          'bgColor': '#fff',
          'Color': '#E93323',
          'width': '44rpx',
          'timeTxtwidth': '16rpx',
          'isDay': true
        },
      }
		},
		onLoad(options) {
			if (options.order_id) {
        this.orderId = options.order_id
      }
      if (options.returnUrl) {
        this.returnUrl = decodeURIComponent(options.returnUrl)
      }
			this.getCashierOrder()
		},
		methods: {
      fen2yuan,
			getCashierOrder() {
				uni.showLoading({
					title: '加载订单中'
				});
        PayOrderApi.getOrder(this.orderId).then(res => {
          // 如果已支付、或者已关闭，则直接跳转
          if (!res.data){
            this.goReturnUrl('close');
            return;
          }
          if (res.data.status === 10) {
            this.goReturnUrl('success');
            return;
          } else if (res.data.status === 20) {
            this.goReturnUrl('close');
            return;
          }

          // 设置属性
					this.payPrice = res.data.price
					this.invalidTime = res.data.expireTime

          // 移除多余的支付渠道；
          this.removeDisableChannel(res.data.appId);

					uni.hideLoading();
				}).catch(err => {
					uni.hideLoading();
					return this.$util.Tips({
						title: err
					})
				})
			},
			goPay(channelCode) {
				if (!this.orderId) {
          return this.$util.Tips({
            title: '请选择要支付的订单'
          });
        }
				if (channelCode === 'yue' && parseFloat(number) < parseFloat(this.payPrice)) {
          return this.$util.Tips({
            title: '余额不足'
          });
        }
				uni.showLoading({
					title: '支付中'
				});
				PayOrderApi.submitOrder({
          id: this.orderId,
          channelCode: channelCode,
          returnUrl: this.getPayReturnUrl(),
          channelExtras: { // TODO 芋艿：等登录接入完成，需要改成动态读取
            // openid: "ockUAwIZ-0OeMZl9ogcZ4ILrGba0" // wx_pub 微信公众号支付的 openid
            // openid: "oLefc4g5GjKWHJjLjMSXB3wX0fD0" // wx_lite 微信小程序支付的 openid
            openid: this.openid
          }
				}).then(res => {
          this.handleSubmitOrderResult(res.data);
        }).catch(err => {
          uni.hideLoading();
          this.$util.Tips({
            title: err
          })
        })
			},

      handleSubmitOrderResult(data) {
        // 1. 如果已支付、或者已关闭，则直接跳转
        if (data.status === 10) {
          this.goReturnUrl('success');
          return;
        } else if (data.status === 20) {
          this.goReturnUrl('close');
          return;
        }

        // 2. 根据 displayMode 模式，进行对应的处理
        const displayMode = data.displayMode;
        const displayContent = data.displayContent
        // 2.1 如果返回的是 URL，则直接跳转
        if (displayMode === 'url') {
          window.location = displayContent;
          return;
        }
        // 2.2 如果返回的是 APP，则自定义处理
        if (displayMode === 'app') {
          if (this.channelCode === 'wx_pub') {
            this.handleSubmitOrderResultForWxPub(displayContent)
            return;
          }
          if (this.channelCode === 'wx_lite') {
            this.handleSubmitOrderResultForWxLite(displayContent)
            return;
          }
        }
      },
      /**
       * 发起微信公众号支付
       */
      handleSubmitOrderResultForWxPub(displayContent) {
        const payConfig = JSON.parse(displayContent);
        this.$wechat.pay({
          timestamp: payConfig.timeStamp,
          nonceStr: payConfig.nonceStr,
          package: payConfig.packageValue,
          signType: payConfig.signType,
          paySign: payConfig.paySign,
        }).then(res => {
          // 失败的情况
          if (res.errMsg === 'chooseWXPay:cancel') {
            return this.$util.Tips({
              title: '取消微信支付'
            });
          }
          if (res.errMsg) {
            return this.$util.Tips({
              title: res.errMsg,
              icon: 'error'
            })
          }

          // 成功的情况
          return this.$util.Tips({
            title: '支付成功',
            icon: 'success'
          }, () => {
            this.goReturnUrl('success');
          });
        }).catch(res => {
          return this.$util.Tips({
            title: '初始化微信支付失败，请重试或者选择其它支付方式',
            icon: 'error'
          })
        })
      },
      /**
       * 发起微信小程序支付
       */
      handleSubmitOrderResultForWxLite(displayContent) {
        const payConfig = JSON.parse(displayContent);
        uni.requestPayment({
          timeStamp: payConfig.timeStamp,
          nonceStr: payConfig.nonceStr,
          package: payConfig.packageValue,
          signType: payConfig.signType,
          paySign: payConfig.paySign,
          success: res => {
            uni.hideLoading();
            return this.$util.Tips({
              title: '支付成功',
              icon: 'success'
            }, () => {
              this.goReturnUrl('success');
            });
          },
          fail: e => {
            uni.hideLoading();
            // 关闭支付的情况
            if (e.errMsg === 'requestPayment:cancel'
              || e.errMsg === 'requestPayment:fail cancel') {
              return this.$util.Tips({
                title: '取消支付'
              });
            }
            return this.$util.Tips({
              title: e.errMsg,
              icon: 'error'
            });
          }
        })
      },

      /**
       * 移除被禁用的支付渠道
       */
      removeDisableChannel(appId) {
        // 1.1 如果不在小程序里，则移除微信小程序支付
        // #ifndef MP
        this.channels = this.channels.filter(item => item.code !== 'wx_lite')
        // #endif
        // #ifdef MP
        this.channels = this.channels.filter(item => item.code !== 'wx_pub')
        // #endif

        // 1.2 如果不是公众号环境，则移除微信公众号支付
        // #ifdef H5
        if (!this.$wechat.isWeixin()) {
          this.channels = this.channels.filter(item => item.code !== 'wx_pub')
        }
        // #endif

        // 2. 读取配置，移除被禁用的支付渠道
        PayChannelApi.getEnableChannelCodeList(appId).then(res => {
          this.channels = this.channels.filter(item => res.data.includes(item.code));

          // 默认选中第一个
          if (this.channels.length > 0) {
            this.payType(this.channels[0].code)
          }
        })

        // 3. // 获得钱包
        WalletApi.getPayWallet().then(res=>{
          this.wallet = res.data;
        })
      },
      /**
       * 设置支付方式
       */
      payType(channelCode) {
        this.channelCode = channelCode
      },
      /**
       * 获得支付的 return url
       */
      getPayReturnUrl() {
        // #ifdef H5
        return location.href
        // #endif
        // #ifdef APP-PLUS
        return '/pages/goods/order_details/index?order_id=' + this.orderId + '&returnUrl=' + this.returnUrl;
        // #endif
        return '';
      },
      /**
       * 回到业务的 URL
       *
       * @param payResult 支付结果
       *                  ① success：支付成功
       *                  ② cancel：取消支付
       *                  ③ close：支付已关闭
       */
      goReturnUrl(payResult) {
        uni.reLaunch({
          url: this.returnUrl.indexOf('?') >= 0
            ? this.returnUrl + '&payResult=' + payResult
            : this.returnUrl + '?payResult=' + payResult
        })
      },
    }
	}
</script>

<style lang="scss" scoped>
	.page {
		.pay-price {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			padding: 50rpx 0 40rpx 0;

			.price {
				color: #E93323;
				margin-bottom: 20rpx;
				display: flex;
				align-items: flex-end;

				.unit {
					font-size: 34rpx;
					font-weight: 500;
					line-height: 41rpx;
				}

				.num {
					font-size: 50rpx;
					font-weight: 600;
				}
			}

			.count-down {
				display: flex;
				align-items: center;
				background-color: #fff;
				padding: 8rpx 28rpx;
				border-radius: 40rpx;
				font-size: 24rpx;
				color: #E93323;

				.time {
					margin-top: 0 !important;
				}

				/deep/.red {
					margin: 0 !important;
				}
			}
		}

		.payment {
			width: 690rpx;
			border-radius: 14rpx 14rpx;
			background-color: #fff;
			z-index: 999;
			margin: 0 30rpx;

			.title {
				color: #666666;
				font-size: 26rpx;
				padding: 30rpx 0 0 30rpx;
			}

			.payMoney {
				font-size: 28rpx;
				color: #333333;
				text-align: center;
				margin-top: 50rpx;

				.font-color {
					margin-left: 10rpx;

					.money {
						font-size: 40rpx;
					}
				}
			}


		}

		.payment.on {
			transform: translate3d(0, 0, 0);
		}

		.icon-xuanzhong11 {
			color: #E93323 !important;
		}

		.payment .item {
			border-bottom: 1rpx solid #eee;
			height: 130rpx;
			margin-left: 30rpx;
			padding-right: 30rpx;
		}

		.payment .item:last-child {
			border-bottom: none;
		}

		.payment .item .left {
			flex: 1;
		}

		.payment .item .left .text {
			flex: 1;
		}

		.payment .item .left .text .name {
			font-size: 30rpx;
			color: #333;
		}

		.payment .item .left .text .info {
			font-size: 22rpx;
			color: #999;
		}

		.payment .item .left .text .info .money {
			color: #ff9900;
		}

		.payment .item .left .iconfont {
			font-size: 50rpx;
			color: #09bb07;
			margin-right: 28rpx;
		}

		.payment .item .left .iconfont.icon-zhifubao {
			color: #00aaea;
		}

		.payment .item .left .iconfont.icon-yuezhifu {
			color: #ff9900;
		}

		.payment .item .left .iconfont.icon-yuezhifu1 {
			color: #eb6623;
		}

		.payment .item .left .iconfont.icon-tonglianzhifu1 {
			color: #305fd8;
		}

		.payment .item .iconfont {
			font-size: 40rpx;
			color: #ccc;
		}

		.icon-haoyoudaizhifu {
			color: #F34C3E !important;
		}

		.btn {
			position: fixed;
			left: 30rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			bottom: 30rpx;
			bottom: calc(30rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
			bottom: calc(30rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		}

		.wait-pay {
			color: #aaa;
			font-size: 24rpx;
			padding-top: 20rpx;
		}

		.button {
			width: 690rpx;
			height: 90rpx;
			border-radius: 45rpx;
			color: #FFFFFF;
			background-color: #E93323;

		}

	}
</style>
