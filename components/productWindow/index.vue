<template>
	<view>
		<view class="product-window"
			:class="(attr.cartAttr === true ? 'on' : '') + ' ' + (iSbnt ? 'join':'') + ' ' + (iScart ? 'joinCart':'')">
			<view class="textpic acea-row row-between-wrapper">
				<view class="pictrue">
					<image :src="attr.productSelect.picUrl"></image>
				</view>
				<view class="text">
					<view class="line1">
						{{ attr.productSelect.spuName }}
					</view>
					<view class="money font-color">
						￥<text class="num">{{ fen2yuan(attr.productSelect.price) }}</text>
						<text class="stock" v-if='isShow'>库存: {{ attr.productSelect.stock }}</text>
						<text class='stock' v-if="attr.productSelect.limitCount > 0">限购: {{ attr.productSelect.limitCount }}</text>
					</view>
				</view>
				<view class="iconfont icon-guanbi" @click="close"></view>
			</view>
			<view class="rollTop">
        <!-- 属性 key + value 列表 -->
				<view class="productWinList">
					<view class="item" v-for="(property, propertyIndex) in attr.properties" :key="propertyIndex">
						<view class="title">{{ property.name }}</view>
						<view class="listn acea-row row-middle">
							<view class="itemn" :class="property.index === value.name ? 'on' : ''"
                    v-for="(value, valueIndex) in property.values" :key="valueIndex"
                    @click="clickProperty(propertyIndex, valueIndex)">
								{{ value.name }}
							</view>
						</view>
					</view>
				</view>
				<view class="cart acea-row row-between-wrapper">
					<view class="title">数量</view>
					<view class="carnum acea-row row-left">
						<view class="item reduce" :class="attr.productSelect.cart_num <= 1 ? 'on' : ''"
							@click="CartNumDes">
							-
						</view>
						<view class='item num'>
							<input type="number" v-model="attr.productSelect.cart_num"
								data-name="productSelect.cart_num"
								@input="bindCode(attr.productSelect.cart_num)" />
						</view>
						<view v-if="iSplus" class="item plus" :class="attr.productSelect.cart_num >= attr.productSelect.stock ? 'on'  : ''" @click="CartNumAdd">
							+
						</view>
						<view v-else class='item plus'
							:class='(attr.productSelect.cart_num >= attr.productSelect.stock)
							|| (attr.productSelect.cart_num >= attr.productSelect.limitCount)
							? "on":""'
							@click='CartNumAdd'>+</view>
					</view>
				</view>
			</view>
      <!-- TODO 芋艿：拼团 -->
			<view class="joinBnt bg-color" v-if="iSbnt && attr.productSelect.stock > 0"
            @click="goCat">我要参团</view>
			<view class="joinBnt on"
            v-else-if="iSbnt && attr.productSelect.stock <= 0">已售罄</view>
			<!-- TODO 芋艿：购物车 -->
      <view class="joinBnt bg-color" v-if="iScart && attr.productSelect.stock"
            @click="goCat">确定</view>
			<view class="joinBnt on"
            v-else-if="(iScart && !attr.productSelect.stock)">已售罄</view>
		</view>
		<view class="mask" @touchmove.prevent :hidden="attr.cartAttr === false" @click="close"></view>
	</view>
</template>

<script>
  import * as Util from '@/utils/util.js';
	export default {
		props: {
			attr: {
				type: Object,
				default: () => {}
			},
			isShow: { // 是否展示库存
				type: Number,
				value: 0
			},
			iSbnt: { // 是否拼团商品
				type: Number,
				value: 0
			},
			iSplus: { // 是否允许 + - 操作
				type: Number,
				value: 0
			},
			iScart: { // 是否来自购物车界面
				type: Number,
				value: 0
			}
		},
		data() {
			return {};
		},
		mounted() {},
		methods: {
			goCat: function() {
				this.$emit('goCat');
			},
			/**
			 * 购物车手动输入数量
			 */
			bindCode: function(e) {
        // TODO 芋艿：【优化】方法名的处理；是否可去掉这个事件，统一处理
				this.$emit('iptCartNum', this.attr.productSelect.cart_num);
			},
			close: function() {
        this.$emit('close');
      },
			CartNumDes: function() {
        // TODO 芋艿：【优化】方法名的处理；是否可去掉这个事件，统一处理
				this.$emit('ChangeCartNum', false);
			},
			CartNumAdd: function() {
        // TODO 芋艿：【优化】方法名的处理；是否可去掉这个事件，统一处理
				this.$emit('ChangeCartNum', true);
			},
      /**
       * 选中某个规格属性
       *
       * @param propertyIndex properties 的下标
       * @param valueIndex values 的下标
       */
			clickProperty: function(propertyIndex, valueIndex) {
        this.$set(this.attr.properties[propertyIndex], 'index', this.attr.properties[propertyIndex].values[valueIndex].name);
				let newSkuKey = this.getCheckedValueNames().join(",");
        // TODO 芋艿：【优化】修改下 ChangeAttr 名字，改成 selectSku 更合适
        this.$emit("ChangeAttr", newSkuKey, propertyIndex, valueIndex);
			},
      /**
       * 获取被选中属性值的数组
       *
       * @returns {*[]} 例如说，['红色', '大']
       */
			getCheckedValueNames: function() {
				let properties = this.attr.properties;
				let valueNames = [];
				for (let i = 0; i < properties.length; i++) {
					for (let j = 0; j < properties[i].values.length; j++) {
						if (properties[i].index === properties[i].values[j].name) {
							valueNames.push(properties[i].values[j].name);
						}
					}
				}
				return valueNames;
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      }
		}
	}
</script>

<style scoped lang="scss">
	.product-window {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		background-color: #fff;
		z-index: 77;
		border-radius: 16rpx 16rpx 0 0;
		padding-bottom: 140rpx;
		transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
	}

	.product-window.on {
		transform: translate3d(0, 0, 0);
	}

	.product-window.join {
		padding-bottom: 30rpx;
	}

	.product-window.joinCart {
		padding-bottom: 30rpx;
		z-index: 999;
	}

	.product-window .textpic {
		padding: 0 130rpx 0 30rpx;
		margin-top: 29rpx;
		position: relative;
	}

	.product-window .textpic .pictrue {
		width: 150rpx;
		height: 150rpx;
	}

	.product-window .textpic .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.product-window .textpic .text {
		width: 410rpx;
		font-size: 32rpx;
		color: #333333;
	}

	.product-window .textpic .text .money {
		font-size: 24rpx;
		margin-top: 40rpx;
	}

	.product-window .textpic .text .money .num {
		font-size: 36rpx;
	}

	.product-window .textpic .text .money .stock {
		color: #999;
		margin-left: 18rpx;
	}

	.product-window .textpic .iconfont {
		position: absolute;
		right: 30rpx;
		top: -5rpx;
		font-size: 35rpx;
		color: #8a8a8a;
	}

	.product-window .rollTop {
		max-height: 500rpx;
		overflow: auto;
		margin-top: 36rpx;
	}

	.product-window .productWinList .item~.item {
		margin-top: 36rpx;
	}

	.product-window .productWinList .item .title {
		font-size: 30rpx;
		color: #999;
		padding: 0 30rpx;
	}

	.product-window .productWinList .item .listn {
		padding: 0 30rpx 0 16rpx;
	}

	.product-window .productWinList .item .listn .itemn {
		border: 1px solid #F2F2F2;
		font-size: 26rpx;
		color: #282828;
		padding: 7rpx 33rpx;
		border-radius: 40rpx;
		margin: 20rpx 0 0 14rpx;
		background-color: #F2F2F2;
	}

	.product-window .productWinList .item .listn .itemn.on {
		color: $theme-color;
		background: rgba(255, 244, 243, 1);
		border-color: $theme-color;
	}

	.product-window .productWinList .item .listn .itemn.limit {
		color: #999;
		text-decoration: line-through;
	}

	.product-window .cart {
		margin-top: 36rpx;
		padding: 0 30rpx;
	}

	.product-window .cart .title {
		font-size: 30rpx;
		color: #999;
	}

	.product-window .cart .carnum {
		height: 54rpx;
		margin-top: 24rpx;
	}

	.product-window .cart .carnum view {
		// border: 1px solid #a4a4a4;
		width: 84rpx;
		text-align: center;
		height: 100%;
		line-height: 54rpx;
		color: #282828;
		font-size: 45rpx;
	}

	.product-window .cart .carnum .reduce {
		border-right: 0;
		border-radius: 6rpx 0 0 6rpx;
		line-height: 48rpx;
	}

	.product-window .cart .carnum .reduce.on {
		// border-color: #e3e3e3;
		color: #DEDEDE;
		font-size: 44rpx;
	}

	.product-window .cart .carnum .plus {
		border-left: 0;
		border-radius: 0 6rpx 6rpx 0;
		line-height: 46rpx;
	}

	.product-window .cart .carnum .plus.on {
		border-color: #e3e3e3;
		color: #dedede;
	}

	.product-window .cart .carnum .num {
		background: rgba(242, 242, 242, 1);
		color: #282828;
		font-size: 28rpx;
		border-radius: 12rpx;
		line-height: 29px;
		height: 54rpx;

		input {
			display: -webkit-inline-box;
		}
	}

	.product-window .joinBnt {
		font-size: 30rpx;
		width: 620rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		color: #fff;
		margin: 21rpx auto 0 auto;
	}

	.product-window .joinBnt.on {
		background-color: #bbb;
		color: #fff;
	}
</style>
