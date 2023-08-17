<template>
	<view>
    <view class='order-details'>
      <view class="pad30">
        <!-- TODO 芋艿：退款各种 -->
        <view class='nav refund'>
          <view class="title">
            <image src="/static/images/shuoming.png" mode="" />
            {{order.refundStatus==1?'商家审核中':order.refundStatus==2?'商家已退款':'商家拒绝退款'}}
          </view>
          <view class="con pad30">
            {{
               order.refundStatus==1 ? "您已成功发起退款申请，请耐心等待商家处理；退款前请与商家协商一致，有助于更好的处理售后问题":
               order.refundStatus==2 ? "退款已成功受理，如商家已寄出商品请尽快退回；感谢您的支持" : "拒绝原因：" + order.refundReason
            }}
          </view>
        </view>

        <!-- TODO 芋艿：退款订单详情 -->
        <view class='wrapper borRadius14' >
          <view class='item acea-row row-between'>
            <view>收货人：</view>
            <view class='conter'>{{order.realName}}</view>
          </view>
          <view class='item acea-row row-between'>
            <view>联系电话：</view>
            <view class='conter'>{{order.userPhone}}</view>
          </view>
          <view class='item acea-row row-between'>
            <view>收货地址：</view>
            <view class='conter'>{{order.userAddress}}</view>
          </view>
        </view>
      </view>
    </view>
	</view>
</template>
<script>
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
  import * as TradeOrderApi from '@/api/trade/order.js';
  import * as AfterSaleApi from '@/api/trade/afterSale.js';
  export default {
		data() {
			return {
        orderId: 0,
        orderItemId: 0,
        order: {}, // 订单
        orderItem: {}, // 订单项

        wayIndex: 0, // 选中 ways 的位置
        ways: ['仅退款', '退款退货'], // 可选的售后方式

        reasons: [], // 售后原因
        reasonIndex: 0, // 选中 reasons 的位置

        applyPicUrls: [], // 补充凭证图片
			};
		},
		computed: mapGetters(['isLogin']),
		watch:{
			isLogin:{
				handler: function(newV, oldV) {
					if (newV) {
						this.getOrderInfo();
						this.getRefundReason();
					}
				},
				deep:true
			}
		},
		 onLoad: function (options) {
      if (!this.isLogin) {
        toLogin();
        return;
      }
      // if (!options.orderId || !options.orderItemId) {
      //   return this.$util.Tips({
      //     title:'缺少订单id,无法退款'
      //   },{
      //     tab: 3,
      //     url:1
      //   });
      // }
			// this.orderId = parseInt(options.orderId);
      // this.orderItemId = parseInt(options.orderItemId);
      // this.getOrderInfo();
      // this.getRefundReason();
    },
		methods: {
			onLoadFun:function() {
        this.getOrderInfo();
        this.getRefundReason();
      },
      /**
       * 获取订单详情
      */
      getOrderInfo:function(){
        TradeOrderApi.getOrderDetail(this.orderId).then(res => {
          // 设置订单信息
          const order = res.data;
          this.order = order;
          // 查询订单项信息
          this.orderItem = order.items.find(item => item.id === this.orderItemId) || {};
        }).catch(err => {
          return this.$util.Tips({
            title: err
          });
        })
      },
      /**
       * 更改售后方式
       */
      wayChange: function(e) {
        this.$set(this, 'wayIndex', e.detail.value);
        this.getRefundReason();
      },
      /**
       * 获得售后方式
       */
      getWay: function () {
        return this.wayIndex === 0 ? 10 : 20
      },
      /**
       * 获取退款理由
       */
      getRefundReason: function() {
        const way = this.getWay();
        AfterSaleApi.getAfterSaleReasonList(way).then(res => {
          this.reasons = res.data;
        })
      },
      /**
       * 选择售后原因
       */
      bindPickerChange: function(e) {
        this.$set(this, 'reasonIndex', e.detail.value);
      },
      /**
       * 删除图片
       */
      DelPic:function(index) {
        this.applyPicUrls.splice(index, 1);
      },
      /**
       * 上传文件
       */
      uploadpic:function(){
        this.$util.uploadImageOne({}, res => {
          this.applyPicUrls.push(res.data);
          this.$set(this, 'applyPicUrls', this.applyPicUrls);
        });
      },

      /**
       * 申请退货
      */
      subRefund:function(e) {
        const formData = e.detail.value;
        AfterSaleApi.createAfterSale({
          orderItemId: this.orderItemId,
          way: this.getWay(),
          refundPrice: this.orderItem.payPrice,
          applyReason: this.reasons[this.reasonIndex],
          applyDescription: formData.applyDescription,
          applyPicUrls: this.applyPicUrls,
        }).then(res => {
          // TODO 芋艿：这里要改成跳转到售后详情页
          this.$util.Tips({
            title: '申请成功',
            icon: 'success'
          }, {
            tab: 5,
            url: '/pages/users/user_return_list/index?isT=1'
          });
        }).catch(err=>{
          return this.$util.Tips({
            title: err
          });
        })
      }
		}
	}
</script>
<!-- TODO 芋艿：后续清理下 -->
<style scoped lang="scss">
.shuoming{
  width: 32rpx;
  height: 32rpx;
}
.goodCall {
  color: $theme-color;
  text-align: center;
  width: 100%;
  height: 86rpx;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #eee;
  font-size: 30rpx;
  line-height: 86rpx;
  background: #fff;

  .icon-kefu {
    font-size: 36rpx;
    margin-right: 15rpx;
  }

  /* #ifdef MP */
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 86rpx;
    font-size: 30rpx;
    color: $theme-color;
  }

  /* #endif */
}

.order-details .header {
  height: 250rpx;
  padding: 0 30rpx;
}

.order-details .header.on {
  background-color: #666 !important;
}

.order-details .header .pictrue {
  width: 110rpx;
  height: 110rpx;
}

.order-details .header .pictrue image {
  width: 100%;
  height: 100%;
}

.order-details .header .data {
  color: rgba(255, 255, 255, 0.8);
  font-size: 24rpx;
  margin-left: 27rpx;
}

.order-details .header .data.on {
  margin-left: 0;
}

.order-details .header .data .state {
  font-size: 30rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 7rpx;
}

.order-details .header .data .time {
  margin-left: 20rpx;
}

.picTxt {
  height: 150rpx;
}

.order-details .nav {
  background-color: #fff;
  font-size: 26rpx;
  color: #282828;
  padding: 27rpx 0;
  width: 100%;
  border-radius: 14rpx;
  margin: -100rpx auto 0 auto;
}

.order-details .nav .navCon {
  padding: 0 40rpx;
}

.order-details .nav .on {
  color: $theme-color;
}

.order-details .nav .progress {
  padding: 0 65rpx;
  margin-top: 10rpx;
}

.order-details .nav .progress .line {
  width: 100rpx;
  height: 2rpx;
  background-color: #939390;
}

.order-details .nav .progress .iconfont {
  font-size: 25rpx;
  color: #939390;
  margin-top: -2rpx;
}

.order-details .address {
  font-size: 26rpx;
  color: #868686;
  background-color: #fff;
  margin-top: 15rpx;
  padding: 30rpx 24rpx;
}

.order-details .address .name {
  font-size: 30rpx;
  color: #282828;
  margin-bottom: 15rpx;
}

.order-details .address .name .phone {
  margin-left: 40rpx;
}

.order-details .line {
  width: 100%;
  height: 3rpx;
}

.order-details .line image {
  width: 100%;
  height: 100%;
  display: block;
}

.order-details .wrapper {
  background-color: #fff;
  margin-top: 12rpx;
  padding: 30rpx 24rpx;
}

.order-details .wrapper .item {
  font-size: 28rpx;
  color: #282828;
}

.order-details .wrapper .item~.item {
  margin-top: 20rpx;
}

.order-details .wrapper .item .conter {
  color: #868686;
  // width: 490rpx;
  text-align: right;
}

.order-details .wrapper .item .conter .copy {
  font-size: 20rpx;
  color: #333;
  border-radius: 20rpx;
  border: 1rpx solid #666;
  padding: 3rpx 15rpx;
  margin-left: 24rpx;
}

.order-details .wrapper .actualPay {
  border-top: 1rpx solid #eee;
  margin-top: 30rpx;
  padding-top: 30rpx;
}

.order-details .wrapper .actualPay .money {
  font-weight: bold;
  font-size: 30rpx;
}

.order-details .footer {
  width: 100%;
  height: 100rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  padding: 0 30rpx;
  box-sizing: border-box;
}

.order-details .footer .bnt {
  width: 158rpx;
  height: 54rpx;
  text-align: center;
  line-height: 54rpx;
  border-radius: 50rpx;
  color: #fff;
  font-size: 27rpx;
}

.order-details .footer .bnt.cancel {
  color: #aaa;
  border: 1rpx solid #ddd;
}

.order-details .footer .bnt~.bnt {
  margin-left: 18rpx;
}

.order-details .writeOff {
  background-color: #fff;
  margin-top: 15rpx;
  padding-bottom: 50rpx;
}

.order-details .writeOff .title {
  font-size: 30rpx;
  color: #282828;
  height: 87rpx;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24rpx;
  line-height: 87rpx;
}

.order-details .writeOff .grayBg {
  background-color: #f2f5f7;
  width: 590rpx;
  height: 384rpx;
  border-radius: 20rpx 20rpx 0 0;
  margin: 50rpx auto 0 auto;
  padding-top: 55rpx;
}

.order-details .writeOff .grayBg .pictrue {
  width: 290rpx;
  height: 290rpx;
  margin: 0 auto;
}

.order-details .writeOff .grayBg .pictrue image {
  width: 100%;
  height: 100%;
  display: block;
}

.order-details .writeOff .gear {
  width: 590rpx;
  height: 30rpx;
  margin: 0 auto;
}

.order-details .writeOff .gear image {
  width: 100%;
  height: 100%;
  display: block;
}

.order-details .writeOff .num {
  background-color: #f0c34c;
  width: 590rpx;
  height: 84rpx;
  color: #282828;
  font-size: 48rpx;
  margin: 0 auto;
  border-radius: 0 0 20rpx 20rpx;
  text-align: center;
  padding-top: 4rpx;
}

.order-details .writeOff .rules {
  margin: 46rpx 30rpx 0 30rpx;
  border-top: 1px solid #f0f0f0;
  padding-top: 10rpx;
}

.order-details .writeOff .rules .item {
  margin-top: 20rpx;
}

.order-details .writeOff .rules .item .rulesTitle {
  font-size: 28rpx;
  color: #282828;
}

.order-details .writeOff .rules .item .rulesTitle .iconfont {
  font-size: 30rpx;
  color: #333;
  margin-right: 8rpx;
  margin-top: 5rpx;
}

.order-details .writeOff .rules .item .info {
  font-size: 28rpx;
  color: #999;
  margin-top: 7rpx;
}

.order-details .writeOff .rules .item .info .time {
  margin-left: 20rpx;
}

.order-details .map {
  height: 86rpx;
  font-size: 30rpx;
  color: #282828;
  line-height: 86rpx;
  border-bottom: 1px solid #f0f0f0;
  margin-top: 15rpx;
  background-color: #fff;
  padding: 0 24rpx;
}

.order-details .map .place {
  font-size: 26rpx;
  width: 176rpx;
  height: 50rpx;
  border-radius: 25rpx;
  line-height: 50rpx;
  text-align: center;
}

.order-details .map .place .iconfont {
  font-size: 27rpx;
  height: 27rpx;
  line-height: 27rpx;
  margin: 2rpx 3rpx 0 0;
}

.order-details .address .name .iconfont {
  font-size: 34rpx;
  margin-left: 10rpx;
}

.refund {
  padding:  0 !important;
  margin-top: 15rpx;
  background-color: #fff;

  .title {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: #333;
    height: 86rpx;
    border-bottom: 1px solid #f5f5f5;
    font-weight: 400;
    padding: 0 24rpx;

    image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 10rpx;
    }
  }

  .con {
    font-size: 25rpx;
    color: #666666;
    padding: 30rpx 24rpx;
  }
}
</style>
<style>
.qs-btn {
  width: auto;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  border-radius: 50rpx;
  color: #fff;
  font-size: 27rpx;
  padding: 0 3%;
  color: #aaa;
  border: 1px solid #ddd;
  margin-right: 20rpx;
}
</style>
