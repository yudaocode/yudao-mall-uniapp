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
		<view class="payment">
			<view class="title">
        支付方式
			</view>
			<view class="item acea-row row-between-wrapper" v-for="(item,index) in cartArr" :key="index"
				v-show='item.status' @click="payType(item.channelCode)">
				<view class="left acea-row row-between-wrapper">
					<view class="iconfont" :class="item.icon"></view>
					<view class="text">
						<view class=name>{{item.name}}</view>
						<view class="info" v-if="item.value == 'yue'">
							{{item.title}} <span class="money">￥{{ item.number }}</span>
						</view>
						<view class="info" v-else>{{item.title}}</view>
					</view>
				</view>
				<view class="iconfont" :class="item.channelCode === channelCode?'icon-xuanzhong11 font-num':'icon-weixuan'" />
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
	export default {
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
				cartArr: [{ // 支付方式
          name: '微信支付',
          icon: "icon-weixin2",
          title: '使用微信快捷支付',
          status: 1,
          channelCode: "wx_pub"  // TODO 芋艿：未来要考虑各种端
        }, {
          name: '支付宝支付',
          icon: "icon-zhifubao",
          title: '使用支付宝支付',
          status: 1,
          channelCode: "alipay_wap"
        }, {
          name: '余额支付',
          icon: "icon-yuezhifu",
          title: '可用余额',
          status: 1,
        },

        // 如下是各种示例接入的示例，默认关闭
        {
            name: '支付宝支付（PC）',
            icon: "icon-zhifubao",
            value: 'alipay_pc',
            title: '使用支付宝支付',
            status: 1,
            channelCode: "alipay_pc"
        }],
        channelCode: '', // 选中的支付渠道
        bgColor: {
          'bgColor': '#fff',
          'Color': '#E93323',
          'width': '44rpx',
          'timeTxtwidth': '16rpx',
          'isDay': true
        },

        // TODO 芋艿：如下要删除的；
        formContent: '',
      }
		},
		onLoad(options) {
			if (options.order_id) {
        this.orderId = options.order_id
      }
      if (options.returnUrl) {
        this.returnUrl = options.returnUrl
      }
			this.getCashierOrder()
		},
		methods: {
			getCashierOrder() {
				uni.showLoading({
					title: '加载订单中'
				});
        PayOrderApi.getOrder(this.orderId).then(res => {
          // TODO 芋艿：如果已支付，则跳转回
          if (res.data.status === 10) {
            uni.showToast({
              title: '支付成功'
            })
            this.goReturnUrl('success');
            uni.hideLoading();
            return;
          } else if (res.data.status === 20) {
            uni.showToast({
              title: '无法支付，原因：订单已关闭'
            })
            this.goReturnUrl('close');
            uni.hideLoading();
            return;
          }

					console.log(res)
					this.payPrice = res.data.price
					this.invalidTime = res.data.expireTime
					// 微信支付是否开启 TODO 芋艿：强制开启
					// this.cartArr[0].status = res.data.wechat_pay_status || 0
					this.cartArr[0].status = res.data.wechat_pay_status || 1
					// 支付宝是否开启 TODO 芋艿：强制开启
					// this.cartArr[1].status = res.data.ali_pay_status || 0;
					this.cartArr[1].status = res.data.ali_pay_status || 1;
					//#ifdef MP
					this.cartArr[1].status = false;
					//#endif
					// 余额支付是否开启
					// that.cartArr[2].title = '可用余额:' + res.data.userInfo.now_money;
					this.cartArr[2].number = res.data.now_money;
					this.cartArr[2].status = res.data.yue_pay_status

          this.channelCode = this.cartArr[0].channelCode;
					uni.hideLoading();
				}).catch(err => {
					uni.hideLoading();
					return this.$util.Tips({
						title: err
					})
				})
			},
			goPay(channelCode) {
				let that = this;
				if (!that.orderId) return that.$util.Tips({
					title: '请选择要支付的订单'
				});
				if (channelCode === 'yue' && parseFloat(number) < parseFloat(that.payPrice)) return that.$util.Tips({
					title: '余额不足'
				});
				uni.showLoading({
					title: '支付中'
				});
				PayOrderApi.submitOrder({
          id: that.orderId,
          channelCode: channelCode,
          displayMode: 'url', // TODO 芋艿：后续可以优化
          returnUrl: this.getPayReturnUrl(),
				}).then(res => {
          this.handleSubmitOrderResult(res.data);

          if (true) {
            return;
          }
					let status = res.data.status,
						orderId = res.data.result.orderId,
						jsConfig = res.data.result.jsConfig,
						goPages = '/pages/goods/order_pay_status/index?order_id=' + this.orderId + '&msg=' +
            res.msg + '&type=3' + '&totalPrice=' + this.payPrice;
					switch (status) {
						case 'SUCCESS':
							uni.hideLoading();
              return that.$util.Tips({
                title: res.msg,
                icon: 'success'
              }, {
                tab: 4,
                url: goPages
              });
						case 'WECHAT_PAY':
							that.toPay = true;
							// #ifdef MP
							let mp_pay_name = ''
							if (uni.requestOrderPayment) {
								mp_pay_name = 'requestOrderPayment'
							} else {
								mp_pay_name = 'requestPayment'
							}
							uni[mp_pay_name]({
								timeStamp: jsConfig.timestamp,
								nonceStr: jsConfig.nonceStr,
								package: jsConfig.package,
								signType: jsConfig.signType,
								paySign: jsConfig.paySign,
								success: function(res) {
									uni.hideLoading();
									if (that.BargainId || that.combinationId || that.pinkId ||
										that
										.seckillId || that.discountId)
										return that.$util.Tips({
											title: that.$t(`支付成功`),
											icon: 'success'
										}, {
											tab: 4,
											url: goPages
										});
									return that.$util.Tips({
										title: '支付成功',
										icon: 'success'
									}, {
										tab: 5,
										url: goPages
									});
								},
								fail: function(e) {
									uni.hideLoading();
									return that.$util.Tips({
										title: '取消支付'
									}, {
										tab: 5,
										url: goPages + '&status=2'
									});
								},
								complete: function(e) {
									uni.hideLoading();
									//关闭当前页面跳转至订单状态
									if (res.errMsg == 'requestPayment:cancel' || e.errMsg == 'requestOrderPayment:cancel') return that.$util
										.Tips({
											title: '取消支付'
										}, {
											tab: 5,
											url: goPages + '&status=2'
										});
								},
							})
							// #endif
							// #ifdef H5
							this.$wechat.pay(res.data.result.jsConfig).then(res => {
								return that.$util.Tips({
									title: '支付成功',
									icon: 'success'
								}, {
									tab: 5,
									url: goPages
								});
							}).catch(res => {
								if (!this.$wechat.isWeixin()) {
									uni.redirectTo({
										url: goPages + '&msg=' + that.$t(`支付失败`) +
											'&status=2'
										// '&msg=支付失败&status=2'
									})
								}
								if (res.errMsg == 'chooseWXPay:cancel') return that.$util.Tips({
									title: '取消支付'
								}, {
									tab: 5,
									url: goPages + '&status=2'
								});
							})
							// #endif
							// #ifdef APP-PLUS
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: jsConfig,
								success: (e) => {
									let url = goPages;
									uni.showToast({
										title: '支付成功'
									})
									setTimeout(res => {
										uni.redirectTo({
											url: url
										})
									}, 2000)
								},
								fail: (e) => {
									let url = '/pages/goods/order_pay_status/index?order_id=' +
										orderId +
										'&msg=' + '支付失败';
									uni.showModal({
										content: '支付失败',
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												uni.redirectTo({
													url: url
												})
											} else if (res.cancel) {}
										}
									})
								},
								complete: () => {
									uni.hideLoading();
								},
							});
							// #endif
							break;
						case 'PAY_DEFICIENCY':
							uni.hideLoading();
							//余额不足
							return that.$util.Tips({
								title: res.msg
							}, {
								tab: 5,
								url: goPages + '&status=1'
							});
							break;

						case "WECHAT_H5_PAY":
							uni.hideLoading();
							that.$util.Tips({
								title: '等待支付中'
							}, {
								tab: 4,
								url: goPages + '&status=0'
							});
							setTimeout(() => {
								location.href = res.data.result.jsConfig.h5_url;
							}, 1500);
							break;
						case 'ALIPAY_PAY':
							//#ifdef H5
							uni.hideLoading();
							that.$util.Tips({
								title: '等待支付中'
							}, {
								tab: 4,
								url: goPages + '&status=0'
							});
							that.formContent = res.data.result.jsConfig;
							setTimeout(() => {
								document.getElementById('alipaysubmit').submit();
							}, 1500);
							//#endif
							// #ifdef MP
							uni.navigateTo({
								url: `/pages/users/alipay_invoke/index?id=${orderId}&link=${jsConfig.qrCode}`
							});
							// #endif
							// #ifdef APP-PLUS
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: jsConfig,
								success: (e) => {
									uni.showToast({
										title: '支付成功'
									})
									let url = '/pages/goods/order_pay_status/index?order_id=' +
										orderId +
										'&msg=' + '支付成功';
									setTimeout(res => {
										uni.redirectTo({
											url: url
										})
									}, 2000)

								},
								fail: (e) => {
									let url = '/pages/goods/order_pay_status/index?order_id=' +
										orderId +
										'&msg=' + '支付失败';
									uni.showModal({
										content: '支付失败',
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												uni.redirectTo({
													url: url
												})
											} else if (res.cancel) {}
										}
									})
								},
								complete: () => {
									uni.hideLoading();
								},
							});
							// #endif
							break;
					}
				}).catch(err => {
					uni.hideLoading();
					return that.$util.Tips({
						title: err
					}, () => {
						that.$emit('onChangeFun', {
							action: 'pay_fail'
						});
					});
				})
			},

      handleSubmitOrderResult(data) {
        const displayMode = data.displayMode;
        const displayContent = data.displayContent
        // 2.1 如果返回的是 URL，则直接跳转
        if (displayMode === 'url') {
          window.location = displayContent;
          return;
        }
        // 2.2
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
