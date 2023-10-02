<template>
	<view>
		<view class='order-submission'>
			<view class="allAddress" :style="store_self_mention ? '':'padding-top:10rpx;'">
				<view class="nav acea-row">
					<view class="item font-color" :class="deliveryType === 1 ? 'on' : 'on2'"
                @tap="addressType(1)" v-if='store_self_mention' />
					<view class="item font-color" :class="deliveryType === 2 ? 'on' : 'on2'"
                @tap="addressType(2)" v-if='store_self_mention' />
				</view>
        <!-- 收货地址的选择 -->
				<view class='address acea-row row-between-wrapper' @tap='onAddress' v-if='deliveryType === 1'
              :style="store_self_mention ? '':'border-top-left-radius: 14rpx;border-top-right-radius: 14rpx;'">
					<view class='addressCon' v-if="addressInfo.name">
						<view class='name'>{{ addressInfo.name }}
							<text class='phone'>{{ addressInfo.mobile }}</text>
						</view>
						<view class="acea-row">
							<text class='default font-color' v-if="addressInfo.defaultStatus">[默认]</text>
							<text class="line2">{{ addressInfo.areaName }} {{addressInfo.detailAddress}}</text>
						</view>
					</view>
					<view class='addressCon' v-else>
						<view class='setaddress'>设置收货地址</view>
					</view>
					<view class='iconfont icon-jiantou'></view>
				</view>
        <!-- 门店的选择 -->
				<view class='address acea-row row-between-wrapper' v-else @tap="showStoreList">
					<block v-if="storeList.length>0">
						<view class='addressCon'>
							<view class='name'>{{ system_store.name }}
								<text class='phone'>{{ system_store.phone }}</text>
							</view>
							<view class="line1"> {{ system_store.areaName }}{{", " + system_store.detailAddress}}
							</view>
						</view>
						<view class='iconfont icon-jiantou'></view>
					</block>
					<block v-else>
						<view>暂无门店信息</view>
					</block>
				</view>
				<view class='line'>
					<image src='/static/images/line.jpg'></image>
				</view>
			</view>
			<view class="pad30">
				<orderGoods :cartInfo="cartInfo" />
        <!-- 优惠劵展示 -->
				<view class='wrapper borRadius14'>
					<view class='item acea-row row-between-wrapper' @tap='couponTap'
						v-if="orderInfoVo.type === 0 && productType==='normal'">
						<view>优惠券</view>
						<view class='discount'>{{couponTitle}}
							<text class='iconfont icon-jiantou'></text>
						</view>
					</view>
          <!-- 积分展示 -->
          <view class='item acea-row row-between-wrapper' v-if="orderInfoVo.type === 0 && productType==='normal'">
						<view>积分抵扣</view>
						<view class='discount acea-row row-middle'>
							<view> {{pointStatus ? "剩余积分":"当前积分"}}
								<text class='num font-color'>
                  {{pointStatus ? orderInfoVo.totalPoint - orderInfoVo.usedPoint : (orderInfoVo.totalPoint || 0) }}
                </text>
							</view>
							<checkbox-group @change="ChangeIntegral">
								<checkbox :checked='pointStatus' :disabled="orderInfoVo.totalPoint === 0 && !pointStatus"/>
							</checkbox-group>
						</view>
					</view>
          <!-- VIP 展示 -->
					<view class='item acea-row row-between-wrapper'
						v-if="orderInfoVo.price.vipPrice > 0">
						<view>会员优惠</view>
						<view class='discount'>-￥{{ fen2yuan(orderInfoVo.price.vipPrice) }}</view>
					</view>
          <!-- 配送展示 TODO -->
					<view class='item acea-row row-between-wrapper' v-if='deliveryType === 1'>
						<view>快递费用</view>
						<view class='discount' v-if='orderInfoVo.price.deliveryPrice > 0'>
							+￥{{ fen2yuan(orderInfoVo.price.deliveryPrice) }}
						</view>
						<view class='discount' v-else>免运费</view>
					</view>
					<view v-else>
						<view class="item acea-row row-between-wrapper">
							<view>联系人</view>
							<view class="discount textR">
								<input type="text" placeholder="请填写您的联系姓名" placeholder-style="color:#ccc;"
                       placeholder-class="placeholder" @blur='realName' />
							</view>
						</view>
						<view class="item acea-row row-between-wrapper">
							<view>联系电话</view>
							<view class="discount textR">
								<input type="text" placeholder="请填写您的联系电话"  placeholder-style="color:#ccc;"
                       placeholder-class="placeholder" @blur='phone' />
							</view>
						</view>
					</view>
					<view class='item'>
						<view>备注信息</view>
						<textarea placeholder-class='placeholder' @input='bindHideKeyboard'
                      value="" name="mark" placeholder='请添加备注（150字以内）' />
					</view>
				</view>

        <!-- 各种价格 -->
				<view class='moneyList borRadius14'>
					<view class='item acea-row row-between-wrapper'>
						<view>商品总价：</view>
						<view class='money'>￥{{ fen2yuan(orderInfoVo.price.totalPrice || 0 ) }}</view>
					</view>
					<view class='item acea-row row-between-wrapper' v-if="orderInfoVo.price.couponPrice > 0">
						<view>优惠券抵扣：</view>
						<view class='money'>-￥{{ fen2yuan(orderInfoVo.price.couponPrice) }}</view>
					</view>
					<view class='item acea-row row-between-wrapper' v-if="orderInfoVo.price.pointPrice > 0">
						<view>积分抵扣：</view>
						<view class='money'>-￥{{ fen2yuan(orderInfoVo.price.pointPrice) }}</view>
					</view>
					<view class='item acea-row row-between-wrapper' v-if="orderInfoVo.price.deliveryPrice > 0">
						<view>运费：</view>
						<view class='money'>+￥{{ fen2yuan(orderInfoVo.price.deliveryPrice) }}</view>
					</view>
				</view>
				<view style='height:120rpx;'></view>
			</view>
			<view class='footer acea-row row-between-wrapper'>
				<view>合计:
					<text class='font-color'>￥{{ fen2yuan(orderInfoVo.price.payPrice || 0) }}</text>
				</view>
				<view class='settlement' style='z-index:100' @tap="SubOrder">立即结算</view>
			</view>
		</view>

    <!-- 优惠劵的弹窗选择 -->
    <couponListWindow
      :coupon='coupon'
      @ChangCouponsClose="ChangCouponsClose"
      :openType='openType'
      @ChangCoupons="ChangCoupons"
      :orderShow="orderShow"
    />

    <!-- 收货地址的弹窗选择 -->
    <addressWindow
      ref="addressWindow"
      :address='address'
			:pagesUrl="pagesUrl"
      @OnChangeAddress="OnChangeAddress"
      @changeClose="changeClose"
    />
		<home></home>
	</view>
</template>
<script>
  import * as CouponApi from '@/api/promotion/coupon.js';
  import * as OrderApi from '@/api/trade/order.js';
  import * as ConfigApi from '@/api/trade/config.js';
  import { openPaySubscribe } from '@/utils/SubscribeMessage.js';
  import * as DeliveryApi from '@/api/trade/delivery.js';
  import couponListWindow from '@/components/couponListWindow';
	import addressWindow from '@/components/addressWindow';
	import orderGoods from '@/components/orderGoods';
	import home from '@/components/home';
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
  import * as Util from '@/utils/util.js';
  import {getTradeConfig} from "../../../api/trade/config";
  export default {
		components: {
			couponListWindow,
			addressWindow,
			orderGoods,
			home
		},
		data() {
			return {
        items: [], // 前端传递的购物项
        cartInfo: [], // 后端返回的购物项
        orderInfoVo: {  // 订单信息
          type: 1, // 交易类型
          price: {} // 价格信息
        },
        mark: '', // 备注信息

				bargain: false, // 是否是砍价
				combination: false, // 是否是拼团
				secKill: false, // 是否是秒杀

        // ========== 积分 ==========
        pointStatus: false, //是否使用积分

        // ========== 优惠劵 ==========
        couponId: 0, // 选中的优惠券 id
        couponTitle: '请选择', // 优惠券的标题
        coupon: { // 优惠券组件
          coupon: false,
          list: [],
          statusTile: '立即使用'
        },

        // ========== 收货地址 ==========
        deliveryType: 1, // 1 - 快递配送；2 - 门店自提
        addressId: 0, // 页面传递的 param 对应的地址 id
        addressInfo: {}, // 选中的地址信息
        address: { // 地址组件
          address: false, // 是否 addressWindow 展示
          addressId: 0 // 真正选中的 address 编号，优先级大于 addressId
        },
        openType: 1, // 优惠券打开方式 1=使用
        orderShow: 'orderShow', // 下单页面使用优惠券组件不展示 tab 切换页
        pagesUrl: "", // 添加收货地址后，回调地址

        // ========== 门店自提 ==========
        store_self_mention: false, // 门店自提是否开启
        storeList: [], // 门店列表
        system_store: {}, // 选中的门店
        contacts: '', // 联系人名
        contactsTel: '', // 联系人手机
      };
		},
		computed: mapGetters(['isLogin', 'systemPlatform', 'productType']),
		watch: {
			isLogin: {
				handler: function(newV, oldV) {
					if (newV) {
						this.getloadPreOrder();
					}
				},
				deep: true
			}
		},
		onLoad(options) {
      if (!this.isLogin) {
        toLogin();
        return
      }

      // 获得订单确认信息
      if (options.cartIds && options.cartIds.length > 0) {
        const cartIds = options.cartIds.split(',');
        this.items = cartIds.map(cartId => ({ cartId }));
      } else if (options.skuId > 0) {
        this.items = [{
          skuId: options.skuId,
          count: options.count | 1
        }]
      }
      this.getloadPreOrder();

      // 处理 address 地址
      this.addressId = options.addressId || 0;
      // 获得门店自提是否开启
      ConfigApi.getTradeConfig().then(res => {
        this.store_self_mention = res.data.deliveryPickUpEnabled && this.productType === 'normal';
      })
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
      // 来自 goods_details_store/index.vue 的门店选择
			uni.$on("handClick", res => {
				if (res) {
					this.system_store = res.address
				}
				// 清除监听
				uni.$off('handClick');
			})
		},
		methods: {
      /**
       * 获得订单确认信息
       */
			getloadPreOrder: function() {
        OrderApi.settlementOrder(this.getSettlementReqVO()).then(res => {
					const orderInfoVo = res.data
					this.orderInfoVo = orderInfoVo;
					this.cartInfo = orderInfoVo.items;
          this.changeAddress(orderInfoVo.address);

          // 获得收件地址列表
          this.$nextTick(function() {
            this.$refs.addressWindow.getAddressList();
          })

          // 获得优惠劵列表
          this.getCouponList();
        }).catch(err => {
					return this.$util.Tips({
						title: err
					});
				})
			},
      SubOrder: function(e) {
        // 校验参数
        if (!this.address.addressId && this.deliveryType === 1) {
          return this.$util.Tips({
            title: '请选择收货地址'
          });
        }
        if (this.deliveryType === 2) {
          if (this.contacts === "" || this.contactsTel === "") {
            return this.$util.Tips({
              title: '请填写联系人或联系人电话'
            });
          }
          if (!/^1(3|4|5|7|8|9|6)\d{9}$/.test(this.contactsTel)) {
            return this.$util.Tips({
              title: '请填写正确的手机号'
            });
          }
          if (!/^[\u4e00-\u9fa5\w]{2,16}$/.test(this.contacts)) {
            return this.$util.Tips({
              title: '请填写您的真实姓名'
            });
          }
          if (this.storeList.length === 0) {
            return this.$util.Tips({
              title: '暂无门店,请选择其他方式'
            });
          }
        }
        // #ifdef MP
        openPaySubscribe().then(() => {
          this.orderCreate();
        });
        // #endif
        // #ifndef MP
        this.orderCreate();
        // #endif
      },
      orderCreate: function() {
        OrderApi.createOrder({
          ...this.getSettlementReqVO(),
          mark: this.mark,
        }).then(res => {
          const returnUrl = encodeURIComponent('/pages/order_pay_status/index?order_id=' + res.data.id);
          uni.navigateTo({
            url: `/pages/goods/cashier/index?order_id=${res.data.payOrderId}&returnUrl=${returnUrl}`
          });
        }).catch(err => {
          uni.hideLoading();
          return this.$util.Tips({
            title: err
          });
        });
      },
      /**
       * 获得结算请求 VO
       */
      getSettlementReqVO() {
        return {
          items: this.items,
          deliveryType: this.deliveryType,
          addressId: this.address.addressId > 0 && this.deliveryType === 1 ? this.address.addressId : undefined,
          pickUpStoreId: this.system_store.id > 0 && this.deliveryType === 2 ? this.system_store.id : undefined,
          receiverName: this.deliveryType === 2 ? this.contacts : undefined,
          receiverMobile: this.deliveryType === 2 ? this.contactsTel : undefined,
          couponId: this.couponId > 0 ? this.couponId : undefined,
          pointStatus: this.pointStatus,
          // TODO 芋艿：秒杀等等
        }
      },

      /**
       * 输入备注
       */
			bindHideKeyboard: function(e) {
				this.mark = e.detail.value;
			},

      // ========== 积分 ==========
      /**
       * 使用积分抵扣
       */
      ChangeIntegral: function() {
        this.pointStatus = !this.pointStatus;
        this.getloadPreOrder();
      },

      // ========== 优惠劵 ==========
      /**
       * 获取当前金额可用优惠券
       */
      getCouponList: function() {
        CouponApi.getMatchCouponList({
          price: this.orderInfoVo.price.payPrice,
          spuIds: this.orderInfoVo.items.map(item => item.spuId),
          skuIds: this.orderInfoVo.items.map(item => item.skuId),
          categoryIds: this.orderInfoVo.items.map(item => item.categoryId)
        }).then(res => {
          this.$set(this.coupon, 'list', res.data);
          // 设置指定优惠劵已选择；用于 couponId 有参数时，默认选中一下
          const useCoupon = res.data.find(coupon => coupon.id === this.couponId);
          if (useCoupon) {
            useCoupon.use_title = '不使用';
            useCoupon.isUse = 1;
            this.couponTitle = useCoupon.name;
          }
        });
      },
      /**
       * 处理点击优惠券后的事件
       */
      ChangCoupons: function(index) {
        const  list = this.coupon.list;
        // 先标记未使用
        for (let i = 0; i < list.length; i++) {
          if (i !== index) {
            list[i].use_title = '';
            list[i].isUse = 0;
          }
        }
        // 再标记使用中的优惠劵
        let couponTitle = '请选择';
        let  couponId = 0;
        if (list[index].isUse) { // 不使用优惠券（就是又点了下，选中的优惠劵）
          list[index].use_title = '';
          list[index].isUse = 0;
        } else { // 使用优惠券
          list[index].use_title = '不使用';
          list[index].isUse = 1;
          couponTitle = list[index].name;
          couponId = list[index].id;
        }
        this.couponTitle = couponTitle;
        this.couponId = couponId;
        this.$set(this.coupon, 'coupon', false);
        this.$set(this.coupon, 'list', list);
        this.getloadPreOrder();
      },
      /**
       * 打开 coupon 优惠劵的选择弹窗
       */
      couponTap: function() {
        this.coupon.coupon = true;
      },
      /**
       * 关闭 coupon 优惠劵的选择弹窗
       */
      ChangCouponsClose: function() {
        this.$set(this.coupon, 'coupon', false);
      },

      // ========== 收货地址 ==========
      /**
       * 打开选择地址的弹窗
       */
      onAddress: function() {
        this.address.address = true;
        // TODO 芋艿：callbackUrl
        this.pagesUrl = '/pages/users/user_address_list/index?';
      },
      /**
       * 选择地址后改变事件
       */
      OnChangeAddress: function(address) {
        this.changeAddress(address);
        this.address.address = false;
        this.getloadPreOrder();
      },
      /**
       * 选择地址
       */
      changeAddress: function (address) {
        if (!address) {
          return;
        }
        this.addressInfo = address;
        this.address.addressId = address.id;
      },
      /**
       * 关闭地址弹窗
       */
      changeClose: function() {
        this.$set(this.address, 'address', false);
      },

      // ========== 门店自提 ==========

      /**
       * 切换物流方式
       */
      addressType: function(deliveryType) {
        this.deliveryType = deliveryType;
        this.getloadPreOrder();
        if (deliveryType === 2) {
          this.getList();
        }
      },
      /**
       * 跳转门店列表
       */
      showStoreList: function() {
        if (this.storeList.length > 0) {
          uni.navigateTo({
            url: '/pages/users/goods_details_store/index'
          })
        }
      },
      /**
       * 获取门店列表数据
       */
      getList: function() {
        let longitude = uni.getStorageSync("user_longitude"); // 经度
        let latitude = uni.getStorageSync("user_latitude"); // 纬度
        DeliveryApi.getDeliveryPickUpStoreList({
          latitude,
          longitude
        }).then(res => {
          let list = res.data || [];
          this.$set(this, 'storeList', list);
          this.$set(this, 'system_store', list[0]);
        }).catch(err => {
          return this.$util.Tips({
            title: err
          });
        })
      },
      realName: function(e) {
        this.contacts = e.detail.value;
      },
      phone: function(e) {
        this.contactsTel = e.detail.value;
      },

      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
    }
	}
</script>

<style lang="scss" scoped>
	.line2{
		width: 504rpx;
	}
	.textR {
		text-align: right;
	}

	.order-submission .line {
		width: 100%;
		height: 3rpx;
	}

	.order-submission .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-submission .address {
		padding: 28rpx;
		background-color: #fff;
		box-sizing: border-box;
	}

	.order-submission .address .addressCon {
		width: 596rpx;
		font-size: 26rpx;
		color: #666;
	}

	.order-submission .address .addressCon .name {
		font-size: 30rpx;
		color: #282828;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.order-submission .address .addressCon .name .phone {
		margin-left: 50rpx;
	}

	.order-submission .address .addressCon .default {
		margin-right: 12rpx;
	}

	.order-submission .address .addressCon .setaddress {
		color: #333;
		font-size: 28rpx;
	}

	.order-submission .address .iconfont {
		font-size: 35rpx;
		color: #707070;
	}

	.order-submission .allAddress {
		width: 100%;
		background: linear-gradient(to bottom, #e93323 0%, #f5f5f5 100%);
		// background-image: linear-gradient(to bottom, #e93323 0%, #f5f5f5 100%);
		// background-image: -webkit-linear-gradient(to bottom, #e93323 0%, #f5f5f5 100%);
		// background-image: -moz-linear-gradient(to bottom, #e93323 0%, #f5f5f5 100%);
		padding: 100rpx 30rpx 0 30rpx;
	}

	.order-submission .allAddress .nav {
		width: 690rpx;
		margin: 0 auto;
	}

	.order-submission .allAddress .nav .item {
		width: 334rpx;
	}

	.order-submission .allAddress .nav .item.on {
		position: relative;
		width: 230rpx;
	}

	.order-submission .allAddress .nav .item.on::before {
		position: absolute;
		bottom: 0;
		content: "快递配送";
		font-size: 28rpx;
		display: block;
		height: 0;
		width: 336rpx;
		border-width: 0 20rpx 80rpx 0;
		border-style: none solid solid;
		border-color: transparent transparent #fff;
		z-index: 2;
		border-radius: 14rpx 36rpx 0 0;
		text-align: center;
		line-height: 80rpx;
	}

	.order-submission .allAddress .nav .item:nth-of-type(2).on::before {
		content: "到店自提";
		border-width: 0 0 80rpx 20rpx;
		border-radius: 36rpx 14rpx 0 0;
	}

	.order-submission .allAddress .nav .item.on2 {
		position: relative;
	}

	.order-submission .allAddress .nav .item.on2::before {
		position: absolute;
		bottom: 0;
		content: "到店自提";
		font-size: 28rpx;
		display: block;
		height: 0;
		width: 401rpx;
		border-width: 0 0 60rpx 60rpx;
		border-style: none solid solid;
		border-color: transparent transparent #f7c1bd;
		border-radius: 36rpx 14rpx 0 0;
		text-align: center;
		line-height: 60rpx;
	}

	.order-submission .allAddress .nav .item:nth-of-type(1).on2::before {
		content: "快递配送";
		border-width: 0 60rpx 60rpx 0;
		border-radius: 14rpx 36rpx 0 0;
	}

	.order-submission .allAddress .address {
		width: 690rpx;
		max-height: 180rpx;
		margin: 0 auto;
	}

	.order-submission .allAddress .line {
		width: 100%;
		margin: 0 auto;
	}

	.order-submission .wrapper .item .discount .placeholder {
		color: #ccc;
	}

	.order-submission .wrapper {
		background-color: #fff;
		margin-top: 15rpx;
	}

	.order-submission .wrapper .item {
		padding: 27rpx 24rpx;
		font-size: 30rpx;
		color: #333333;
		border-bottom: 1px solid #F5F5F5;
	}

	.order-submission .wrapper .item .discount {
		font-size: 30rpx;
		color: #333;
	}

	.order-submission .wrapper .item .discount .iconfont {
		color: #515151;
		font-size: 30rpx;
		margin-left: 15rpx;
	}

	.order-submission .wrapper .item .discount .num {
		font-size: 32rpx;
		margin-right: 20rpx;
	}

	.order-submission .wrapper .item .shipping {
		font-size: 30rpx;
		color: #999;
		position: relative;
		padding-right: 58rpx;
	}

	.order-submission .wrapper .item .shipping .iconfont {
		font-size: 35rpx;
		color: #707070;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 30rpx;
	}

	.order-submission .wrapper .item textarea {
		background-color: #f9f9f9;
		width: auto !important;
		height: 140rpx;
		border-radius: 14rpx;
		margin-top: 30rpx;
		padding: 15rpx;
		box-sizing: border-box;
		font-weight: 400;
	}

	.order-submission .wrapper .item .placeholder {
		color: #ccc;
	}

	.order-submission .wrapper .item .list {
		margin-top: 35rpx;
	}

	.order-submission .moneyList {
		margin-top: 15rpx;
		background-color: #fff;
		padding: 30rpx;
	}

	.order-submission .moneyList .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-submission .moneyList .item~.item {
		margin-top: 20rpx;
	}

	.order-submission .moneyList .item .money {
		color: #666666;
	}

	.order-submission .footer {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #333;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.order-submission .footer .settlement {
		font-size: 30rpx;
		color: #fff;
		width: 240rpx;
		height: 70rpx;
		background-color: $theme-color;
		border-radius: 50rpx;
		text-align: center;
		line-height: 70rpx;
	}

	.footer .transparent {
		opacity: 0
	}
</style>
