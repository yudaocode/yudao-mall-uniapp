<template>
	<view>
		<view class='line'>
			<image src='../../../static/images/line.jpg' v-if="addressList.length"></image>
		</view>
		<view class='address-management' :class='addressList.length === 0 ? "fff":""'>
			<radio-group class="radio-group" @change="radioChange" v-if="addressList.length">
				<view class='item borRadius14' v-for="(item,index) in addressList" :key="index">
					<view class='address' @click='goOrder(item.id)'>
						<view class='consignee'>收货人：{{ item.name }}
              <text class='phone'>{{item.mobile}}</text>
            </view>
						<view>收货地址：{{item.areaName}} {{item.detailAddress}}</view>
					</view>
					<view class='operation acea-row row-between-wrapper'>
						<!-- #ifndef MP -->
						<radio class="radio" :value="index.toString()" :checked="item.defaultStatus">
							<text>设为默认</text>
						</radio>
						<!-- #endif -->
						<!-- #ifdef MP -->
						<radio class="radio" :value="index" :checked="item.defaultStatus">
							<text>设为默认</text>
						</radio>
						<!-- #endif -->
						<view class='acea-row row-middle'>
							<view @click='editAddress(item.id)'>
                <text class='iconfont icon-bianji' />编辑
              </view>
							<view @click='delAddress(index)'>
                <text class='iconfont icon-shanchu' />删除
              </view>
						</view>
					</view>
				</view>
			</radio-group>
			<view class='loadingicon acea-row row-center-wrapper' v-if="addressList.length">
				<text class='loading iconfont icon-jiazai' :hidden='!loading'></text>{{loadTitle}}
			</view>
			<view class='noCommodity' v-if="addressList.length < 1">
				<view class='pictrue'>
					<image src='../../../static/images/noAddress.png'></image>
				</view>
			</view>
			<view style='height:120rpx;'></view>
		</view>
		<view class='footer acea-row row-between-wrapper'>
			<!-- #ifdef MP-->
			<view class='addressBnt bg-color' @click='addAddress'>
        <text class='iconfont icon-tianjiadizhi' />添加新地址
      </view>
			<view class='addressBnt wxbnt' @click='getWxAddress'>
        <text class='iconfont icon-weixin2' />导入微信地址
      </view>
			<!-- #endif -->
			<!-- #ifdef H5-->
			<view class='addressBnt bg-color' :class="this.$wechat.isWeixin()?'':'on'" @click='addAddress'>
        <text class='iconfont icon-tianjiadizhi' />添加新地址
      </view>
			<view v-if="this.$wechat.isWeixin()" class='addressBnt wxbnt' @click='getAddress'>
        <text class='iconfont icon-weixin2' />导入微信地址
      </view>
			<!-- #endif -->
		</view>
		<home></home>
	</view>
</template>
<script>
	import { editAddress } from '@/api/user.js';
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import home from '@/components/home';
  import * as AddressApi from '@/api/member/address.js';
  export default {
		components: {
			home
		},
		data() {
			return {
				addressList: [],
				loading: false,
				loadTitle: '加载更多',

        // TODO 芋艿：看看后面咋搞回来
        preOrderNo: '',
        cartId: '',
        pinkId: 0,
        couponId: 0,
				bargain: false, // 是否是砍价
				combination: false, // 是否是拼团
				secKill: false, // 是否是秒杀
			};
		},
		computed: mapGetters(['isLogin']),
		watch:{
			isLogin:{
				handler: function(newV, oldV) {
					if (newV) {
						this.getUserAddress(true);
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
      this.preOrderNo = options.preOrderNo || 0;
      this.getAddressList();
		},
		onShow: function() {
			this.getAddressList();
		},
		methods: {
      /**
       * 获取地址列表
       */
      getAddressList: function() {
        if (this.loading) {
          return;
        }
        this.loading = true;
        this.loadTitle = '';
        AddressApi.getAddressList().then(res => {
          this.$set(this, 'addressList', res.data);
          this.loadTitle = '我也是有底线的';
          this.loading = false;
        }).catch(err => {
          this.loading = false;
          this.loadTitle = '加载更多';
        });
      },
      /**
       * 设置默认地址
       */
      radioChange: function(e) {
        const index = parseInt(e.detail.value);
        const address = this.addressList[index];
        if (address === undefined) {
          return this.$util.Tips({
            title: '您设置的默认地址不存在!'
          });
        }
        AddressApi.updateAddress({
          ...address,
          defaultStatus: true
        }).then(res => {
          for (let i = 0, len = this.addressList.length; i < len; i++) {
            if (i === index) {
              this.addressList[i].defaultStatus = true;
            } else {
              this.addressList[i].defaultStatus = false;
            }
          }
          this.$util.Tips({
            title: '设置成功',
            icon: 'success'
          }, () => {
            this.$set(this, 'addressList', this.addressList);
          });
        }).catch(err => {
          return this.$util.Tips({
            title: err
          });
        });
      },
      /**
       * 编辑地址
       */
      editAddress: function(id) {
        let cartId = this.cartId,
          pinkId = this.pinkId,
          couponId = this.couponId;
        this.cartId = '';
        this.pinkId = '';
        this.couponId = '';
        uni.navigateTo({
          url: '/pages/users/user_address/index?id=' + id + '&cartId=' + cartId + '&pinkId=' + pinkId + '&couponId=' +
            couponId + '&secKill' + this.secKill + '&combination=' + this.combination + '&bargain=' + this.bargain
        })
      },
      /**
       * 删除地址
       */
      delAddress: function(index) {
        const address = this.addressList[index];
        if (address === undefined) {
          return this.$util.Tips({
            title: '您删除的地址不存在!'
          });
        }
        AddressApi.deleteAddress(address.id).then(res => {
          this.$util.Tips({
            title: '删除成功',
            icon: 'success'
          }, () => {
            this.addressList.splice(index, 1);
            this.$set(this, 'addressList', this.addressList);
          });
        }).catch(err => {
          return this.$util.Tips({
            title: err
          });
        });
      },
      /**
       * 新增地址
       */
      addAddress: function() {
        this.cartId = '';
        this.pinkId = '';
        this.couponId = '';
        uni.navigateTo({
          url: '/pages/users/user_address/index?preOrderNo=' + this.preOrderNo
        })
      },

      // TODO 芋艿：微信导入；
			/**
			 * 导入微信地址（小程序）
			 */
			getWxAddress: function() {
				let that = this;
				uni.authorize({
					scope: 'scope.address',
					success: function(res) {
						uni.chooseAddress({
							success: function(res) {
								let addressP = {};
								addressP.province = res.provinceName;
								addressP.city = res.cityName;
								addressP.district = res.countyName;
								addressP.cityId = 0;
								editAddress({
									address: addressP,
									defaultStatus: true,
									realName: res.userName,
									postCode: res.postalCode,
									phone: res.telNumber,
									detail: res.detailInfo,
									id: 0
									//type: 1//区别城市id（导入微信地址无城市id需要后台自己查找）;
								}).then(res => {
									that.$util.Tips({
										title: "添加成功",
										icon: 'success'
									}, function() {
										that.getAddressList(true);
									});
								}).catch(err => {
									return that.$util.Tips({
										title: err
									});
								});
							},
							fail: function(res) {
								if (res.errMsg == 'chooseAddress:cancel') return that.$util.Tips({
									title: '取消选择'
								});
							},
						})
					},
					fail: function(res) {
						uni.showModal({
							title: '您已拒绝导入微信地址权限',
							content: '是否进入权限管理，调整授权？',
							success(res) {
								if (res.confirm) {
									uni.openSetting({
										success: function(res) {
											console.log(res.authSetting)
										}
									});
								} else if (res.cancel) {
									return that.$util.Tips({
										title: '已取消！'
									});
								}
							}
						})
					}
				})
			},
      // TODO 芋艿：微信导入；
      /**
			 * 导入微信地址（公众号）
			 */
			getAddress() {
				let that = this;
				that.$wechat.openAddress().then(userInfo => {
					// open();
					editAddress({
							realName: userInfo.userName,
							phone: userInfo.telNumber,
							address: {
								province: userInfo.provinceName,
								city: userInfo.cityName,
								district: userInfo.countryName,
								cityId: 0
							},
							detail: userInfo.detailInfo,
							postCode: userInfo.postalCode,
							defaultStatus: true
						})
						.then(() => {
							that.$util.Tips({
								title: "添加成功",
								icon: 'success'
							}, function() {
								// close();
								that.getAddressList();
							});
						})
						.catch(err => {
							// close();
							return that.$util.Tips({
								title: err || "添加失败"
							});
						});
				});
			},
			goOrder: function(id) {
				if(this.preOrderNo){
					uni.redirectTo({
						url: '/pages/users/order_confirm/index?is_address=1&preOrderNo=' + this.preOrderNo + '&addressId=' +  id
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-management{
		padding: 20rpx 30rpx;
	}
	.address-management.fff {
		background-color: #fff;
		height: 1300rpx
	}

	.line {
		width: 100%;
		height: 3rpx;
		image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	.address-management .item {
		background-color: #fff;
		padding: 0 20rpx;
		margin-bottom: 20rpx;
	}

	.address-management .item .address {
		padding: 35rpx 0;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;
	}

	.address-management .item .address .consignee {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 8rpx;
	}

	.address-management .item .address .consignee .phone {
		margin-left: 25rpx;
	}

	.address-management .item .operation {
		height: 83rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.address-management .item .operation .radio text {
		margin-left: 13rpx;
	}

	.address-management .item .operation .iconfont {
		color: #2c2c2c;
		font-size: 35rpx;
		vertical-align: -2rpx;
		margin-right: 10rpx;
	}

	.address-management .item .operation .iconfont.icon-shanchu {
		margin-left: 35rpx;
		font-size: 38rpx;
	}

	 .footer {
		position: fixed;
		width: 100%;
		background-color: #fff;
		bottom: 0;
		height: 106rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

    .footer .addressBnt {
		width: 330rpx;
		height: 76rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 76rpx;
		font-size: 30rpx;
		color: #fff;
	}

	 .footer .addressBnt.on {
		width: 690rpx;
		margin: 0 auto;
	}

	 .footer .addressBnt .iconfont {
		font-size: 35rpx;
		margin-right: 8rpx;
		vertical-align: -1rpx;
	}

	 .footer .addressBnt.wxbnt {
		background-color: #fe960f;
	}
</style>
