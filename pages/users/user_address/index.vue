<template>
	<view>
		<form @submit="formSubmit" report-submit='true'>
			<view class='addAddress pad30'>
				<view class='list borRadius14'>
					<view class='item acea-row row-between-wrapper' style="border: none;">
						<view class='name'>姓名</view>
						<input type='text' placeholder='请输入姓名' placeholder-style="color:#ccc;" name='name'
                   :value="userAddress.name" placeholder-class='placeholder' maxlength="4" />
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view class='name'>联系电话</view>
						<input type='number' placeholder='请输入联系电话' placeholder-style="color:#ccc;" name="mobile"
                   :value='userAddress.mobile' placeholder-class='placeholder' maxlength="11" />
					</view>
					<view class='item acea-row row-between-wrapper relative'>
						<view class='name'>所在地区</view>
						<view class="address">
							<picker mode="multiSelector" @change="bindRegionChange"
								@columnchange="bindMultiPickerColumnChange" :range="multiArray">
								<view class='acea-row'>
									<view class="picker line1">{{region[0]}}，{{region[1]}}，{{region[2]}}</view>
									<view class='iconfont icon-xiangyou abs_right'></view>
								</view>
							</picker>
						</view>
					</view>
					<view class='item acea-row row-between-wrapper relative'>
						<view class='name'>详细地址</view>
						<input type='text' placeholder='请填写具体地址' placeholder-style="color:#ccc;" name='detailAddress'
                   placeholder-class='placeholder' v-model='userAddress.detailAddress' maxlength="18" />
            <view class='iconfont icon-dizhi font-color abs_right' @tap="chooseLocation" />
					</view>
				</view>
				<view class='default acea-row row-middle borRadius14'>
					<checkbox-group @change='ChangeIsDefault'>
						<checkbox :checked="userAddress.defaultStatus" />设置为默认地址
					</checkbox-group>
				</view>

				<button class='keepBnt bg-color' form-type="submit">立即保存</button>
				<!-- #ifdef MP -->
				<view class="wechatAddress" v-if="!id" @click="getWxAddress">导入微信地址</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="wechatAddress" v-if="this.$wechat.isWeixin() && !id" @click="getAddress">导入微信地址</view>
				<!-- #endif -->
			</view>
		</form>
	</view>
</template>

<script>
	import { editAddress } from '@/api/user.js';
  import * as AddressApi from '@/api/member/address.js';
  import * as AreaApi from '@/api/system/area.js';
  import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import home from '@/components/home';
	let app = getApp();
	export default {
		components: {
			home
		},
		data() {
			return {
        id: 0, // 地址 id
        district: [], // 地区，树形结构
				userAddress: {
					defaultStatus: false
				}, // 地址详情
				region: ['省', '市', '区'], // userAddress 对应的省市区
        multiArray: [], // 当前的省、市、区
        multiIndex: [0, 0, 0], // 当前选中的省 index、市 index、区 index
				cityId: 0, // 区的编号~ 变量名暂时没改过来

        // TODO 芋艿：看看后面咋搞回来
        cartId: '', // 购物车id
        pinkId: 0, // 拼团id
        couponId: 0, // 优惠券id
        bargain: false, // 是否是砍价
				combination: false, // 是否是拼团
				secKill: false, // 是否是秒杀
			};
		},
		computed: mapGetters(['isLogin']),
		watch: {
			isLogin: {
				handler: function(newV, oldV) {
					if (newV) {
						this.getUserAddress();
						this.getCityList();
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

      this.preOrderNo = options.preOrderNo || 0;
      this.id = options.id || 0;
      uni.setNavigationBarTitle({
        title: options.id ? '修改地址' : '添加地址'
      })

      // 获取地址详情
      this.getUserAddress();

      // 检测城市数据是否存在缓存，有的话从缓存取，没有的话请求接口
      if (this.$Cache.has('cityList')) {
        this.district = this.$Cache.getItem('cityList')
        this.initialize();
      } else {
        this.getCityList();
      }
		},
		methods: {
      /**
       * 获得地址
       */
      getUserAddress: function() {
        if (!this.id) {
          return false;
        }
        AddressApi.getAddress(this.id).then(res => {
          this.$set(this, 'userAddress', res.data);
          this.$set(this, 'region', res.data.areaName.split(' '));
          this.city_id = res.data.areaId
        });
      },
      /**
       * 提交用户添加地址
       */
      formSubmit: function(e) {
        // 参数校验
        const value = e.detail.value;
        if (!value.name) {
          return this.$util.Tips({
            title: '请填写收货人姓名'
          });
        }
        if (!value.mobile) {
          return this.$util.Tips({
            title: '请填写联系电话'
          });
        }
        if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.mobile)) {
          return this.$util.Tips({
            title: '请输入正确的手机号码'
          });
        }
        if (this.region === '省-市-区') {
          return this.$util.Tips({
            title: '请选择所在地区'
          });
        }
        if (!value.detailAddress) {
          return this.$util.Tips({
            title: '请填写详细地址'
          });
        }
        value.id = this.id;
        value.areaId = this.cityId;
        value.defaultStatus = this.userAddress.defaultStatus;

        // 提交保存
        uni.showLoading({
          title: '保存中',
          mask: true
        })
        const saveOrUpdateAddress = this.id > 0 ? AddressApi.updateAddress : AddressApi.createAddress;
        saveOrUpdateAddress(value).then(res => {
          if (this.id) {
            this.$util.Tips({
              title: '修改成功',
              icon: 'success'
            });
          } else {
            this.$util.Tips({
              title: '添加成功',
              icon: 'success'
            });
          }
          setTimeout(() => {
            if (this.preOrderNo > 0) {
              uni.redirectTo({
                url: '/pages/users/order_confirm/index?preOrderNo=' + this.preOrderNo + '&addressId=' + (this.id ? this.id : res.data)
              })
            } else {
              // #ifdef H5
              return history.back();
              // #endif
              // #ifndef H5
              return uni.navigateBack({
                delta: 1,
              })
              // #endif
            }
          }, 1000);
        }).catch(err => {
          return this.$util.Tips({
            title: err
          });
        })
      },
      // TODO 芋艿：需要改下
      ChangeIsDefault: function(e) {
        this.$set(this.userAddress, 'defaultStatus', !this.userAddress.defaultStatus);
      },

      /**
       * 获取地址数据
       */
			getCityList: function() {
        AreaApi.getAreaTree().then(res => {
					this.district = res.data;
					let oneDay = 24 * 3600 * 1000;
					this.$Cache.setItem({name: 'cityList', value:res.data, expires:oneDay * 7});  //设置七天过期时间
					this.initialize();
				})
			},
      /**
       * 初始化当前的 multiArray
       */
			initialize: function() {
        const province = [];
        const city = [];
        const area = [];
				if (this.district.length) {
          // 省
          this.district.forEach(item => {
						province.push(item.name);
					});
          // 市
          const cityChildren = this.district[0].children || [];
          cityChildren.forEach(item => {
						city.push(item.name);
					});
          // 区
          const areaChildren = cityChildren.length ? (cityChildren[0].children || []) : [];
          areaChildren.forEach(item => {
						area.push(item.name);
					});
					this.multiArray = [province, city, area]
				}
			},
      /**
       * 提交省市区的选择
       */
			bindRegionChange: function(e) {
				const multiIndex = this.multiIndex;
        const multiArray = this.multiArray;
        const value = e.detail.value;
        const province = this.district[multiIndex[0]] || {
						children: []
        };
				const city = province.children[multiIndex[1]] || {
          children: []
        };
        const area = city.children[multiIndex[2]] || {
          id: 0
        };
				this.region = [multiArray[0][value[0]], multiArray[1][value[1]], multiArray[2][value[2]]]
				this.cityId = area.id
      },
      /**
       * 选择省市区的滚动
       */
			bindMultiPickerColumnChange: function(e) {
        const column = e.detail.column; // multiArray 的下标
				const value = e.detail.value; // multiArray 的值，即选中的第几个
				const multiArray = this.multiArray;
				const multiIndex = this.multiIndex;
				multiIndex[column] = value;
				switch (column) {
					case 0: // 选择【省】
            const currentCity = this.district[value] || {
              child: []
            };
						const areaList = currentCity.children[0] || {
							child: []
						};
						multiArray[1] = currentCity.children.map((item) => {
							return item.name;
						});
						multiArray[2] = areaList.children.map((item) => {
							return item.name;
						});
						break;
					case 1: // 选择【市】
						const cityList = this.district[multiIndex[0]].children[multiIndex[1]].children || [];
						multiArray[2] = cityList.map(item => {
							return item.name;
						});
						break;
					case 2: // 选择【区】
						break;
				}
				// #ifdef MP || APP-PLUS
				this.$set(this.multiArray, 0, multiArray[0]);
				this.$set(this.multiArray, 1, multiArray[1]);
				this.$set(this.multiArray, 2, multiArray[2]);
				// #endif
				// #ifdef H5
				this.multiArray = multiArray;
				// #endif
				this.multiIndex = multiIndex
			},
      /**
       * 通过地图，选择到具体的地址
       * TODO 芋艿：需要测试下；
       */
			chooseLocation: function () {
				uni.chooseLocation({
					success: (res) => {
						this.$set(this.userAddress, 'detailAddress', res.address.replace(/.+?(省|市|自治区|自治州|县|区)/g,''));
					}
				})
			},
			// 导入共享地址（小程序）TODO 芋艿：待实现
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
									defaultStatus: 1,
									name: res.userName,
									postCode: res.postalCode,
									mobile: res.telNumber,
									detail: res.detailInfo,
									id: 0
								}).then(res => {
									setTimeout(function() {
										if (that.cartId) {
											let cartId = that.cartId;
											let pinkId = that.pinkId;
											let couponId = that.couponId;
											that.cartId = '';
											that.pinkId = '';
											that.couponId = '';
											uni.navigateTo({
												url: '/pages/users/order_confirm/index?cartId=' +
													cartId +
													'&addressId=' + (
														that.id ? that
														.id :
														res.data
														.id) +
													'&pinkId=' +
													pinkId +
													'&couponId=' +
													couponId +
													'&secKill=' + that
													.secKill +
													'&combination=' +
													that.combination +
													'&bargain=' + that
													.bargain
											});
										} else {
											uni.navigateBack({
												delta: 1
											});
										}
									}, 1000);
									return that.$util.Tips({
										title: "添加成功",
										icon: 'success'
									});
								}).catch(err => {
									return that.$util.Tips({
										title: err
									});
								});
							},
							fail: function(res) {
								if (res.errMsg == 'chooseAddress:cancel') return that.$util
									.Tips({
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
										success: function(res) {}
									});
								} else if (res.cancel) {
									return that.$util.Tips({
										title: '已取消！'
									});
								}
							}
						})
					},
				})
			},
			// 导入共享地址（微信）；TODO 芋艿：待实现
			getAddress() {
				let that = this;
				that.$wechat.openAddress().then(userInfo => {
					// open();
					editAddress({
							id: this.id,
							name: userInfo.userName,
							mobile: userInfo.telNumber,
							address: {
								province: userInfo.provinceName,
								city: userInfo.cityName,
								district: userInfo.countryName,
								cityId: 0
							},
							detail: userInfo.detailInfo,
							defaultStatus: 1,
							postCode: userInfo.postalCode
						})
						.then(() => {
							setTimeout(function() {
								if (that.cartId) {
									let cartId = that.cartId;
									let pinkId = that.pinkId;
									let couponId = that.couponId;
									that.cartId = '';
									that.pinkId = '';
									that.couponId = '';
									uni.navigateTo({
										url: '/pages/users/order_confirm/index?cartId=' +
											cartId + '&addressId=' + (that.id ? that.id :
												res.data
												.id) + '&pinkId=' + pinkId + '&couponId=' +
											couponId + '&secKill=' + that.secKill +
											'&combination=' + that.combination + '&bargain=' +
											that.bargain
									});
								} else {
									uni.navigateTo({
										url: '/pages/users/user_address_list/index'
									})
									// history.back();
								}
							}, 1000);
							// close();
							that.$util.Tips({
								title: "添加成功",
								icon: 'success'
							});
						})
						.catch(err => {
							// close();
							return that.$util.Tips({
								title: err || "添加失败"
							});
						});
				}).catch(err => {
					console.log(err);
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.addAddress {
		padding-top: 20rpx;
	}
	.addAddress .list {
		background-color: #fff;
		padding: 0 24rpx;
	}

	.addAddress .list .item {
		border-top: 1rpx solid #eee;
		height: 90rpx;
		line-height: 90rpx;
	}

	.addAddress .list .item .name {
		// width: 195rpx;
		font-size: 30rpx;
		color: #333;
	}

	.addAddress .list .item .address {
		flex: 1;
		margin-left: 50rpx;
	}

	.addAddress .list .item input {
		width: 475rpx;
		font-size: 30rpx;
		font-weight: 400;
	}

	.addAddress .list .item .placeholder {
		color: #ccc;
	}

	.addAddress .list .item picker .picker {
		width: 410rpx;
		font-size: 30rpx;
	}

	.addAddress .default {
		padding: 0 30rpx;
		height: 90rpx;
		background-color: #fff;
		margin-top: 23rpx;
	}

	.addAddress .default checkbox {
		margin-right: 15rpx;
	}

	.addAddress .keepBnt {
		width: 690rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		margin: 80rpx auto 24rpx auto;
		font-size: 32rpx;
		color: #fff;
	}

	.addAddress .wechatAddress {
		width: 690rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		margin: 0 auto;
		font-size: 32rpx;
		color: #E93323 ;
		border: 1px solid #E93323;
	}
	.relative{
		position: relative;
	}
	.icon-dizhi{
		font-size: 44rpx;
		z-index: 100;
	}
	.abs_right{
		position: absolute;
		right:0;
	}
</style>
