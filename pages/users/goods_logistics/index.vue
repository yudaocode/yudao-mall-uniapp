<template>
	<view>
    <orderGoods
      :productType="orderInfo.type"
      :orderId="orderId"
      :cartInfo="orderInfo.items"
      :jump="false"
    />
		<view class='logistics'>
			<view class='logisticsCon'>
				<view class='company acea-row row-between-wrapper'>
					<view class='picTxt acea-row row-between-wrapper'>
						<view class='iconfont icon-wuliu'></view>
						<view class='text'>
							<view><text class='name line1'>物流公司：</text> {{ orderInfo.logisticsName }}</view>
							<view class='express line1'><text class='name'>快递单号：</text> {{ orderInfo.logisticsNo }}</view>
						</view>
					</view>
					<!-- #ifndef H5 -->
					<view class='copy' @tap='copyOrderId'>复制单号</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class='copy copy-data' :data-clipboard-text="orderInfo.logisticsNo">复制单号</view>
					<!-- #endif -->
				</view>

        <!-- 物流轨迹 -->
				<view class='item' v-for="(item,index) in expressTracks" :key="index">
					<view class='circular' :class='index === 0 ? "on":""'></view>
					<view class='text' :class='index===0 ? "on-font on":""'>
						<view>{{item.content}}</view>
						<view class='data' :class='index===0 ? "on-font on":""'>{{ formatDate(item.time) }}</view>
					</view>
				</view>
			</view>
			<recommend :hostProduct='hostProduct' v-if="hostProduct.length" />
		</view>
	</view>
</template>

<script>
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import recommend from '@/components/recommend';
  import * as OrderApi from '@/api/trade/order.js';
  import dayjs from '@/plugin/dayjs/dayjs.min.js';
  import orderGoods from "@/components/orderGoods";
  import * as ProductSpuApi from '@/api/product/spu.js';
  import * as PromotionActivityApi from '@/api/promotion/activity.js';
  import * as ProductUtil from '@/utils/product.js'
  export default {
		components: {
			recommend,
      orderGoods
		},
		data() {
			return {
				orderId: '',
				product: {
					productInfo: {}
				},
				orderInfo: {},
				expressTracks: [],

				hostProduct: [],
				loading: false,
				goodScroll: true,
				params: { // 精品推荐分页
					page: 1,
					limit: 10,
				},
			};
		},
		computed: mapGetters(['isLogin']),
		watch:{
			isLogin:{
				handler:function(newV, oldV) {
					if (newV) {
						this.getExpress();
						this.get_host_product();
					}
				},
				deep:true
			}
		},
		onLoad: function (options) {
      if (!this.isLogin) {
        toLogin();
        return
      }
      // 解析参数
      if (!options.orderId) {
        return this.$util.Tips({title:'缺少订单号'});
      }
			this.orderId = options.orderId;
      this.getExpress();
      this.get_host_product();
    },
    onReady: function() {
      // #ifdef H5
      this.$nextTick(function() {
        const clipboard = new ClipboardJS(".copy-data");
        clipboard.on("success", () => {
          this.$util.Tips({
            title: '复制成功'
          });
        });
      });
      // #endif
    },
		methods: {
			copyOrderId: function() {
        uni.setClipboardData({ data: this.orderInfo.deliveryId });
      },
      getExpress: function() {
        OrderApi.getOrderExpressTrackList(this.orderId).then(res => {
          this.$set(this, 'expressTracks', (res.data || []).reverse());
        });
        OrderApi.getOrderDetail(this.orderId).then(res => {
          this.$set(this, 'orderInfo', res.data);
        })
      },
      get_host_product: function () {
        this.loading = true
        if (!this.goodScroll) {
          return
        }
        ProductSpuApi.getSpuPage({
          recommendType: 'hot',
          pageNo: this.params.page,
          pageSize: this.params.limit
        }).then(res => {
          this.loading = false
          const good_list = res.data.list;
          this.params.page++
          this.goodScroll = res.data.list.length >= this.params.limit

          // 设置营销活动
          const spuIds = good_list.map(item => item.id);
          if (spuIds.length > 0) {
            PromotionActivityApi.getActivityListBySpuIds(spuIds).then(res => {
              ProductUtil.setActivityList(good_list, res.data);
              this.hostProduct = this.hostProduct.concat(good_list) // 放在此处，避免 Vue 监控不到数组里的元素变化
            });
          }
        });
      },
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      }
		},
		// 滚动到底部
		onReachBottom() {
			if (this.params.page !== 1) {
				this.get_host_product();
			}
		},
	}
</script>
<style scoped lang="scss">
	.logistics .header {
		padding: 23rpx 30rpx;
		background-color: #fff;
		height: 166rpx;
		box-sizing: border-box;
	}

	.logistics .header .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.logistics .header .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.logistics .header .text {
		width: 540rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}

	.logistics .header .text .name {
		width: 365rpx;
		color: #282828;
	}

	.logistics .header .text .money {
		text-align: right;
	}

	.logistics .logisticsCon {
		background-color: #fff;
		margin: 12rpx 0;
	}

	.logistics .logisticsCon .company {
		height: 120rpx;
		margin: 0 0 45rpx 30rpx;
		padding-right: 30rpx;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.logistics .logisticsCon .company .picTxt {
		width: 520rpx;
	}

	.logistics .logisticsCon .company .picTxt .iconfont {
		width: 50rpx;
		height: 50rpx;
		background-color: #666;
		text-align: center;
		line-height: 50rpx;
		color: #fff;
		font-size: 35rpx;
	}

	.logistics .logisticsCon .company .picTxt .text {
		width: 450rpx;
		font-size: 26rpx;
		color: #282828;
	}

	.logistics .logisticsCon .company .picTxt .text .name {
		color: #999;
	}

	.logistics .logisticsCon .company .picTxt .text .express {
		margin-top: 5rpx;
	}

	.logistics .logisticsCon .company .copy {
		font-size: 20rpx;
		width: 106rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 20rpx;
		border: 1rpx solid #999;
	}

	.logistics .logisticsCon .item {
		padding: 0 40rpx;
		position: relative;
	}

	.logistics .logisticsCon .item .circular {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		position: absolute;
		top: -1rpx;
		left: 31.5rpx;
		background-color: #ddd;
	}

	.logistics .logisticsCon .item .circular.on {
		background-color: $theme-color;
	}

	.logistics .logisticsCon .item .text.on-font {
		color: $theme-color;
	}

	.logistics .logisticsCon .item .text .data.on-font {
		color: $theme-color;
	}

	.logistics .logisticsCon .item .text {
		font-size: 26rpx;
		color: #666;
		width: 615rpx;
		border-left: 1rpx solid #e6e6e6;
		padding: 0 0 60rpx 38rpx;
	}

	.logistics .logisticsCon .item .text.on {
		border-left-color: #f8c1bd;
	}

	.logistics .logisticsCon .item .text .data {
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}

	.logistics .logisticsCon .item .text .data .time {
		margin-left: 15rpx;
	}
</style>
