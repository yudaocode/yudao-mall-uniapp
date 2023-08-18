<template>
	<view>
    <!-- TODO 芋艿：退货地址，后续写在这里，还是写在退款详情界面 -->
		<form @submit="subRefund" report-submit='true'>
		  <view class='apply-return'>
		    <view class='list borRadius14'>
          <view class='item acea-row row-between-wrapper'>
            <view>物流公司</view>
            <picker class='num' @change="bindPickerChange" :value="expressIndex"
                    :range="expresses" range-key="name">
              <view class="picker acea-row row-between-wrapper">
                <view class='reason'>{{ expresses[expressIndex].name }}</view>
                <text class='iconfont icon-jiantou'></text>
              </view>
            </picker>
          </view>
          <view class='item textarea acea-row row-between'>
            <view>物流单号</view>
            <input placeholder='请填写物流单号' class='num' name="logisticsNo" placeholder-class='placeholder' />
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
  import * as AfterSaleApi from '@/api/trade/afterSale.js';
  import * as DeliveryApi from '@/api/trade/delivery.js';
  export default {
		data() {
			return {
        id: 0, // 售后编号

        expresses: [], // 快递公司数组
        expressIndex: 0, // 选中 expresses 的位置
			};
		},
		computed: mapGetters(['isLogin']),
		watch:{
			isLogin:{
				handler: function(newV, oldV) {
					if (newV) {
						this.getExpressList();
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
      if (!options.id) {
         return this.$util.Tips({
           title: '缺少退款编号，无法查看'
         },{
           tab: 3,
           url:1
         });
      }
      this.id = parseInt(options.id);
      this.getExpressList();
    },
		methods: {
			onLoadFun:function() {
        this.getExpressList();
      },
      /**
       * 获得快递公司
       */
      getExpressList: function() {
        DeliveryApi.getDeliveryExpressList().then(res => {
          this.expresses = res.data;
        })
      },
      /**
       * 选择快递公司
       */
      bindPickerChange: function(e) {
        this.$set(this, 'expressIndex', e.detail.value);
      },

      /**
       * 申请退货
      */
      subRefund:function(e) {
        const formData = e.detail.value;
        AfterSaleApi.deliveryAfterSale({
          id: this.id,
          logisticsId: this.expresses[this.expressIndex].id,
          logisticsNo: formData.logisticsNo,
        }).then(res => {
          this.$util.Tips({
            title: '填写退货成功',
            icon: 'success'
          }, {
            tab: 5,
            url: '/pages/users/user_return_detail/index?id=' + this.id
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
