<template>
	<view>
		<form  @submit="subRefund" report-submit='true'>
		  <view class='apply-return'>
		    <view class='goodsStyle acea-row row-between borRadius14'>
          <view class='pictrue'>
            <image :src='orderItem.picUrl' />
          </view>
          <view class='text acea-row row-between'>
            <view class='name line2'>{{ orderItem.spuName }}</view>
            <view class='money'>
              <view>￥{{(parseFloat(orderItem.price) / 100.0).toFixed(2)}}</view>
              <view class='num'>x{{ orderItem.count}}</view>
            </view>
          </view>
        </view>
		    <view class='list borRadius14'>
          <view class='item acea-row row-between-wrapper'>
            <view>售后方式</view>
            <!-- 如果未发货，则只能退款 -->
            <view class="" v-if="order.status === 10">仅退款</view>
            <picker v-else class='num' @change="wayChange"
                    :value="wayIndex" :range="ways">
              <view class="picker acea-row row-between-wrapper">
                <view class='reason'>{{ ways[wayIndex] }}</view>
                <text class='iconfont icon-jiantou'></text>
              </view>
            </picker>
          </view>
          <!-- TODO 芋艿：按照有赞的做法；未发货，不输入件数；已发货，可调整 -->
          <view class='item acea-row row-between-wrapper'>
            <view>退货件数</view>
            <view class='num'>{{ orderItem.count }}</view>
          </view>
          <!-- TODO 芋艿：后端改成可以填写金额 -->
          <view class='item acea-row row-between-wrapper'>
            <view>退款金额</view>
            <view class='num'>￥{{ (parseFloat(orderItem.payPrice) / 100.0).toFixed(2) }}</view>
          </view>
          <view class='item acea-row row-between-wrapper'>
            <view>退款原因</view>
            <picker class='num' @change="bindPickerChange" :value="reasonIndex" :range="reasons">
              <view class="picker acea-row row-between-wrapper">
                <view class='reason'>{{ reasons[reasonIndex] }}</view>
                <text class='iconfont icon-jiantou'></text>
              </view>
            </picker>
          </view>
          <view class='item textarea acea-row row-between'>
            <view>备注说明</view>
            <textarea placeholder='填写备注信息，100字以内' class='num' name="applyDescription"
                      placeholder-class='填写备注信息，100字以内' />
          </view>
          <view class='item acea-row row-between' style="border: none;">
            <view class='title acea-row row-between-wrapper'>
              <view>上传凭证</view>
              <view class='tip'>( 最多可上传3张 )</view>
            </view>
            <view class='upload acea-row row-middle'>
              <view class='pictrue' v-for="(item,index) in applyPicUrls" :key="index">
                <image :src='item' />
                <view class='iconfont icon-guanbi1 font-color' @tap='DelPic(index)' />
              </view>
              <view class='pictrue acea-row row-center-wrapper row-column' @tap='uploadpic'
                    v-if="applyPicUrls.length < 3">
                <text class='iconfont icon-icon25201' />
                <view>上传凭证</view>
              </view>
            </view>
          </view>
				  <button class='returnBnt bg-color' form-type="submit">提交</button>
		    </view>
		  </view>
		</form>
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
      if (!options.orderId || !options.orderItemId) {
        return this.$util.Tips({
          title:'缺少订单id,无法退款'
        },{
          tab: 3,
          url:1
        });
      }
			this.orderId = parseInt(options.orderId);
      this.orderItemId = parseInt(options.orderItemId);
      this.getOrderInfo();
      this.getRefundReason();
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
          this.$util.Tips({
            title: '申请成功',
            icon: 'success'
          }, {
            tab: 5,
            url: '/pages/users/user_return_detail/index?id=' + res.data
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
<style scoped lang="scss">
	.apply-return{
		padding: 20rpx 30rpx 70rpx 30rpx;
	}
	.apply-return .list{background-color:#fff;margin-top:18rpx;padding:0 24rpx 70rpx 24rpx;}
	.apply-return .list .item{min-height:90rpx;border-bottom:1rpx solid #eee;font-size:30rpx;color:#333;}
	.apply-return .list .item .num{color:#282828;width:427rpx;text-align:right;}
	.apply-return .list .item .num .picker .reason{width:385rpx;}
	.apply-return .list .item .num .picker .iconfont{color:#666;font-size:30rpx;margin-top:2rpx;}
	.apply-return .list .item.textarea{padding:24rpx 0;}
	.apply-return .list .item textarea{height:100rpx;font-size:30rpx;}
	.apply-return .list .item .placeholder{color:#bbb;}
	.apply-return .list .item .title{height:95rpx;width:100%;}
	.apply-return .list .item .title .tip{font-size:30rpx;color:#bbb;}
	.apply-return .list .item .upload{padding-bottom:36rpx;}
	.apply-return .list .item .upload .pictrue{border-radius: 14rpx; margin:22rpx 23rpx 0 0;width:156rpx;height:156rpx;position:relative;font-size:24rpx;color:#bbb;}
	.apply-return .list .item .upload .pictrue:nth-of-type(4n){margin-right:0;}
	.apply-return .list .item .upload .pictrue image{width:100%;height:100%;border-radius:14rpx;}
	.apply-return .list .item .upload .pictrue .icon-guanbi1{position:absolute;font-size:45rpx;top:-10rpx;right:-10rpx;}
	.apply-return .list .item .upload .pictrue .icon-icon25201{color:#bfbfbf;font-size:50rpx;}
	.apply-return .list .item .upload .pictrue:nth-last-child(1){border:1rpx solid #ddd;box-sizing:border-box;}
	.apply-return .returnBnt{font-size:32rpx;color:#fff;width:100%;height:86rpx;border-radius:50rpx;text-align:center;line-height:86rpx;margin:43rpx auto;}
</style>
