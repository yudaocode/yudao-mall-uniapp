<template>
	<div>
		<div class="storeBox" ref="container">
			<div class="storeBox-box" v-for="(item, index) in storeList" :key="index" @click.stop="checked(item)">
				<div class="store-img">
          <img :src="item.logo" lazy-load="true" />
        </div>
				<div class="store-cent-left">
					<div class="store-name">{{ item.name }}</div>
					<div class="store-address line1">
						{{ item.areaName }}{{ ", " + item.detailAddress }}
					</div>
				</div>
				<div class="row-right">
					<div>
						<!-- #ifdef H5 -->
						<a class="store-phone" :href="'tel:' + item.phone">
              <span class="iconfont icon-dadianhua01" />
            </a>
						<!-- #endif -->
						<!-- #ifdef MP -->
						<view class="store-phone" @click="call(item.phone)">
              <text class="iconfont icon-dadianhua01" />
            </view>
						<!-- #endif -->
					</div>
					<div class="store-distance" @click.stop="showMaoLocation(item)">
						<span class="addressTxt" v-if="item.distance">距离{{ item.distance.toFixed(2) }}千米</span>
						<span class="addressTxt" v-else>查看地图</span>
						<span class="iconfont icon-youjian" />
					</div>
				</div>
			</div>
			<Loading :loaded="loaded" :loading="loading" />
		</div>
		<div>
			<!-- <iframe v-if="locationShow && !isWeixin" ref="geoPage" width="0" height="0" frameborder="0" style="display:none;"
			 scrolling="no" :src="
          'https://apis.map.qq.com/tools/geolocation?key=' +
            mapKey +
            '&referer=myapp'
        ">
			</iframe> -->
		</div>
	</div>
</template>

<script>
	import Loading from "@/components/Loading";
  import * as DeliveryApi from '@/api/trade/delivery.js';
  const LONGITUDE = "user_longitude";
	const LATITUDE = "user_latitude";
	const MAPKEY = "mapKey";
	export default {
		name: "storeList",
		components: {
			Loading
		},
		data() {
			return {
				loaded: false,
				loading: false,
				storeList: [],
				system_store: {},
				// mapKey: cookie.get(MAPKEY),
				locationShow: false,
				user_latitude: 0,
				user_longitude: 0
			};
		},
		onLoad() {
			try {
				this.user_latitude = uni.getStorageSync('user_latitude');
				this.user_longitude = uni.getStorageSync('user_longitude');
			} catch (e) {
				// error
			}
		},
		mounted() {
			if (this.user_latitude && this.user_longitude) {
				this.getList();
			} else {
				this.selfLocation();
				this.getList();
			}
		},
		methods: {
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
				});
			},
			selfLocation() {
				// #ifdef H5
				if (this.$wechat.isWeixin()) {
          this.$wechat.location().then(res => {
						this.user_latitude = res.latitude;
						this.user_longitude = res.longitude;
						uni.setStorageSync('user_latitude', res.latitude);
						uni.setStorageSync('user_longitude', res.longitude);
            this.getList();
					})
				} else {
				// #endif
					uni.getLocation({
						type: 'wgs84',
						success: (res) => {
							try {
								this.user_latitude = res.latitude;
								this.user_longitude = res.longitude;
								uni.setStorageSync('user_latitude', res.latitude);
								uni.setStorageSync('user_longitude', res.longitude);
							} catch {}
							this.getList();
						},
						complete: () => {
							this.getList();
						}
					});
					// #ifdef H5
				}
				// #endif
			},
			showMaoLocation(e) {
				// #ifdef H5
				if (this.$wechat.isWeixin()) {
          this.$wechat.seeLocation({
						latitude: Number(e.latitude),
						longitude: Number(e.longitude)
					}).then(res => {
						console.log('success');
					})
				} else {
					// #endif
					uni.openLocation({
						latitude: Number(e.latitude),
						longitude: Number(e.longitude),
						name: e.name,
						address: `${e.areaName}-${e.detailAddress}`,
						success: function() {
							console.log('success');
						}
					});
					// #ifdef H5
				}
				// #endif
			},
			//
      /**
       * 选中门店
       */
			checked(e) {
				uni.$emit("handClick", {
					address: e
				});
				uni.navigateBack();
			},
      /**
       * 获取门店列表数据
       */
			getList: function() {
				if (this.loading || this.loaded) {
          return;
        }
				this.loading = true;
        DeliveryApi.getDeliveryPickUpStoreList({
          latitude: this.user_latitude,
          longitude: this.user_longitude
        }).then(res => {
          this.loading = false;
          this.loaded = res.data.length < this.limit;
          this.storeList = res.data;
        }).catch(err => {
          this.$dialog.error(err);
        });
			}
		},
		onReachBottom() {
			this.getList();
		}
	};
</script>
<style>
	.geoPage {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 10000;
	}

	.storeBox {
		width: 100%;
		background-color: #fff;
		padding: 0 30rpx;
	}

	.storeBox-box {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		padding: 23rpx 0;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
	}

	.store-cent {
		display: flex;
		align-items: center;
		width: 80%;
	}

	.store-cent-left {
		width: 45%;
	}

	.store-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 6rpx;
		margin-right: 22rpx;
	}

	.store-img img {
		width: 100%;
		height: 100%;
	}

	.store-name {
		color: #282828;
		font-size: 30rpx;
		margin-bottom: 22rpx;
		font-weight: 800;
	}

	.store-address {
		color: #666666;
		font-size: 24rpx;
	}

	.store-phone {
		width: 50rpx;
		height: 50rpx;
		color: #fff;
		border-radius: 50%;
		display: block;
		text-align: center;
		line-height: 48rpx;
		background-color: #e83323;
		margin-bottom: 22rpx;
		text-decoration: none;
	}

	.store-distance {
		font-size: 22rpx;
		color: #e83323;
	}

	.iconfont {
		font-size: 20rpx;
	}

	.row-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		width: 33.5%;
	}
</style>
