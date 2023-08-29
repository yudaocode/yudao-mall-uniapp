<template>
	<view>
		<view class='shoppingCart copy-data'>
			<view class='labelNav acea-row row-around'>
				<view class='item'><text class='iconfont icon-xuanzhong'></text>100%正品保证</view>
				<view class='item'><text class='iconfont icon-xuanzhong'></text>所有商品精挑细选</view>
				<view class='item'><text class='iconfont icon-xuanzhong'></text>售后无忧</view>
			</view>
			<view class="borRadius14 cartBox">
				<view
					v-if="(cartList.valid.length === 0 && cartList.invalid.length === 0) || (cartList.valid.length > 0)"
					class='nav acea-row row-between-wrapper'>
					<view>购物数量 <text class='num font-color'>{{cartCount}}</text></view>
					<view v-if="cartList.valid.length > 0 || cartList.invalid.length > 0"
						class='administrate acea-row row-center-wrapper' @click='manage'>{{ footerswitch ? '管理' : '取消'}}
					</view>
				</view>
				<view v-if="cartList.valid.length > 0 || cartList.invalid.length > 0" class="pad30">
          <!-- 有效的购物车 -->
          <view class='list'>
						<checkbox-group @change="checkboxChange">
							<block v-for="(item,index) in cartList.valid" :key="index">
								<view class='item acea-row row-between-wrapper'>
									<!-- #ifndef MP -->
									<checkbox :value="(item.id).toString()" :checked="item.selected"
                            :disabled="!item.canChecked && footerswitch" style="margin-right: 10rpx;" />
									<!-- #endif -->
									<!-- #ifdef MP -->
									<checkbox :value="item.id" :checked="item.selected"
                            :disabled="!item.canChecked && footerswitch" />
									<!-- #endif -->
									<navigator :url='"/pages/goods_details/index?id=" + item.spu.id' hover-class='none'
                             class='picTxt acea-row row-between-wrapper'>
										<view class='pictrue'>
                      <image v-if="item.sku" :src='item.sku.picUrl' />
                      <image v-else :src='item.spu.picUrl' />
										</view>
										<view class='text'>
											<view class='line1' :class="item.canChecked?'':'reColor'">
                        {{ item.spu.name }}
											</view>
											<view class='infor line1' v-if="item.sku.properties">属性：
                        <text v-for="property in item.sku.properties" style="padding-left: 2px">{{property.valueName}}</text>
                      </view>
											<view class='money' v-if="item.canChecked">￥{{ fen2yuan(item.sku.price) }}</view>
											<!-- TODO 芋艿：重选 -->
                      <view class="reElection acea-row row-between-wrapper" v-else>
												<view class="title">请重新选择商品规格</view>
												<view class="reBnt cart-color acea-row row-center-wrapper" @click.stop="reElection(item)">重选</view>
											</view>
										</view>
										<view class='carnum acea-row row-center-wrapper' v-if="item.canChecked">
											<view class="reduce" :class="item.numSub ? 'on' : ''" @click.stop='subCart(index)'>-</view>
											<view class='num'>{{ item.count }}</view>
											<view class="plus" :class="item.numAdd ? 'on' : ''" @click.stop='addCart(index)'>+</view>
										</view>
									</navigator>
								</view>
							</block>
						</checkbox-group>
					</view>
          <!-- 无效的购物车 -->
          <view v-if="cartList.invalid.length > 0" class='invalidGoods borRadius14'
                :style="cartList.valid.length === 0 && cartList.invalid.length > 0
                  ? 'position: relative;z-index: 111;top: -120rpx;'
                  :'position: static;'">
						<view class='goodsNav acea-row row-between-wrapper'>
							<view v-if="cartList.invalid.length > 1 || cartList.valid.length > 0" @click='goodsOpen'>
								<text class='iconfont' :class='goodsHidden ? "icon-xiangxia":"icon-xiangshang"' /> 失效商品
							</view>
							<view v-else>失效商品</view>
							<view class='del' @click='unsetCart'>
                <text class='iconfont icon-shanchu1' />清空
              </view>
						</view>
						<view class='goodsList' :hidden='goodsHidden'>
							<block v-for="(item,index) in cartList.invalid" :key='index'>
								<view class='item acea-row row-between-wrapper'>
									<view class='invalid'>失效</view>
									<view class='picTxt acea-row row-between-wrapper'>
										<view class='pictrue'>
                      <image v-if="item.sku" :src='item.sku.picUrl' />
                      <image v-else :src='item.spu.picUrl' />
										</view>
										<view class='text acea-row row-column-between'>
											<view class='line1 name'>{{ item.spu.name }}</view>
											<view class='infor line1' v-if="item.sku.properties">属性：
                        <text v-for="property in item.sku.properties" style="padding-left: 2px">{{property.valueName}}</text>
                      </view>
											<view class='acea-row row-between-wrapper'>
												<view class='end'>该商品已失效</view>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</view>
        <!-- TODO -->
				<view class='noCart' v-if="cartList.valid.length === 0 && cartList.invalid.length === 0 && canShow">
					<view class='pictrue'>
						<image src='../../static/images/noCart.png'></image>
					</view>
					<recommend :hostProduct='hostProduct'></recommend>
				</view>
			</view>
		</view>
    <!-- TODO -->
    <view class='footer acea-row row-between-wrapper' v-if="cartList.valid.length > 0">
			<view>
				<checkbox-group @change="checkboxAllChange">
					<checkbox value="all" :checked="!!isAllSelect" />
					<text class='checkAll'>全选({{selectValue.length}})</text>
				</checkbox-group>
			</view>
			<view class='money acea-row row-middle' v-if="footerswitch">
				<text class='font-color'>￥{{ fen2yuan(selectCountPrice) }}</text>
				<form @submit="subOrder" report-submit='true'>
					<button class='placeOrder bg-color' formType="submit">立即下单</button>
				</form>
			</view>
			<view class='button acea-row row-middle' v-else>
				<form @submit="subCollect" report-submit='true'>
					<button class='bnt cart-color' formType="submit">收藏</button>
				</form>
				<form @submit="subDel" report-submit='true'>
					<button class='bnt' formType="submit">删除</button>
				</form>
			</view>
		</view>
    <!-- SKU 不可用的商品，重新选择 SKU TODO -->
    <productWindow :attr="attr" :isShow='1' :iSplus='1' :iScart='1' @myevent="onMyEvent" @ChangeAttr="ChangeAttr"
			@ChangeCartNum="ChangeCartNum" @attrVal="attrVal" @iptCartNum="iptCartNum" @goCat="reGoCat"
			id='product-window'></productWindow>
		<view class="uni-p-b-96" />
		<view class="uni-p-b-98" />
	</view>
</template>

<script>
	let sysHeight = 0
	import { cartDel, getResetCart } from '@/api/order.js';
	import { getProductHot, collectAll, getProductDetail } from '@/api/store.js';
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import recommend from '@/components/recommend';
	import productWindow from '@/components/productWindow';
  import * as TradeCartApi from '@/api/trade/cart.js';
  import * as Util from '@/utils/util.js';
  export default {
		components: {
			recommend,
			productWindow,
		},
		data() {
			return {
				goodsHidden: false,
				footerswitch: true,
				hostProduct: [],
        hotPage: 1,
        hotLimit: 10,
        hotScroll: false,

				cartList: { // 购物车列表
					valid: [], // 有效
					invalid: [] // 无效
				},
				isAllSelect: false, // 是否全选
				selectValue: [], // 选中的数据
				selectCountPrice: 0.00, // 选中的金额
        cartCount: 0, // 选中的商品数量

				loading: false,
				loadTitle: '加载更多', //提示语
				attr: {
					cartAttr: false,
					productAttr: [],
					productSelect: {}
				},
				productValue: [], //系统属性
				productInfo: {},
				attrValue: '', //已选属性
				attrTxt: '请选择', //属性页面提示
				cartId: 0,
				product_id: 0,
				sysHeight: sysHeight,
				canShow: false
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad: function(options) {
			if (!this.isLogin) {
				toLogin();
			}
		},
		onShow: function() {
			this.canShow = false
			if (this.isLogin === true) {
        // 加载热门商品
				this.hotPage = 1;
        this.hotLimit = 10;
        this.hostProduct = [];
        this.hotScroll = false;
        this.loadend = false;

        // 加载购物车列表
        this.footerswitch = true;
				this.hotScroll = false;
				this.cartList = {
          valid: [],
          invalid: []
        };
        this.isAllSelect = false; // 全选
        this.selectValue = []; // 选中的数据
        this.selectCountPrice = 0.00;
        this.cartCount = 0;
        this.getCartList();
			}
		},
		methods: {
			// 修改购物车
			reGoCat: function() {
				let that = this,
					productSelect = that.productValue[this.attrValue];
				//如果有属性,没有选择,提示用户选择
				if (
					that.attr.productAttr.length &&
					productSelect === undefined
				)
					return that.$util.Tips({
						title: "产品库存不足，请选择其它"
					});

				let q = {
					id: that.cartId,
					productId: that.product_id,
					num: that.attr.productSelect.cart_num,
					unique: that.attr.productSelect !== undefined ?
						that.attr.productSelect.unique : that.productInfo.id
				};
				getResetCart(q)
					.then(function(res) {
						that.attr.cartAttr = false;
						that.$util.Tips({
							title: "添加购物车成功",
							success: () => {
								that.loadend = false;
								that.cartList.valid = [];
								that.getCartList();
							}
						});
					})
					.catch(res => {
						return that.$util.Tips({
							title: res
						});
					});
			},
			onMyEvent: function() {
				this.$set(this.attr, 'cartAttr', false);
			},
			reElection: function(item) {
				this.getGoodsDetails(item)
			},
			/**
			 * 获取产品详情
			 *
			 */
			getGoodsDetails: function(item) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let that = this;
				that.cartId = item.id;
				that.product_id = item.productId;
				getProductDetail(item.productId).then(res => {
					uni.hideLoading();
					that.attr.cartAttr = true;
					let productInfo = res.data.productInfo;
					that.$set(that, 'productInfo', productInfo);
					that.$set(that.attr, 'productAttr', res.data.productAttr);
					that.$set(that, 'productValue', res.data.productValue);
					that.DefaultSelect();
				}).catch(err => {
					uni.hideLoading();
				})
			},
			/**
			 * 属性变动赋值
			 *
			 */
			ChangeAttr: function(res) {
				let productSelect = this.productValue[res];
				if (productSelect && productSelect.stock > 0) {
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.id);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", res);
					this.$set(this, "attrTxt", "已选择");
				} else {
					this.$set(this.attr.productSelect, "image", this.productInfo.image);
					this.$set(this.attr.productSelect, "price", this.productInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", this.productInfo.id);
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				}
			},
			/**
			 * 默认选中属性
			 *
			 */
			DefaultSelect: function() {
				let productAttr = this.attr.productAttr;
				let value = [];
				for (let key in this.productValue) {
					if (this.productValue[key].stock > 0) {
						value = this.attr.productAttr.length ? key.split(",") : [];
						break;
					}
				}
				for (let i = 0; i < productAttr.length; i++) {
					this.$set(productAttr[i], "index", value[i]);
				}
				//sort();排序函数:数字-英文-汉字；
				let productSelect = this.productValue[value.sort().join(",")];
				if (productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"storeName",
						this.productInfo.storeName
					);
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.id);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", value.sort().join(","));
					this.$set(this, "attrTxt", "已选择");
				} else if (!productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"storeName",
						this.productInfo.storeName
					);
					this.$set(this.attr.productSelect, "image", this.productInfo.image);
					this.$set(this.attr.productSelect, "price", this.productInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", this.productInfo.id);
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				} else if (!productSelect && !productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"storeName",
						this.productInfo.storeName
					);
					this.$set(this.attr.productSelect, "image", this.productInfo.image);
					this.$set(this.attr.productSelect, "price", this.productInfo.price);
					this.$set(this.attr.productSelect, "stock", this.productInfo.stock);
					this.$set(
						this.attr.productSelect,
						"unique",
						this.productInfo.id || ""
					);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				}
			},
			attrVal(val) {
				this.$set(this.attr.productAttr[val.indexw], 'index', this.attr.productAttr[val.indexw].attrValues[val
					.indexn]);
			},
			/**
			 * 购物车数量加和数量减
			 *
			 */
			ChangeCartNum: function(changeValue) {
				//changeValue:是否 加|减
				//获取当前变动属性
				let productSelect = this.productValue[this.attrValue];
				//如果没有属性,赋值给商品默认库存
				if (productSelect === undefined && !this.attr.productAttr.length)
					productSelect = this.attr.productSelect;
				//无属性值即库存为0；不存在加减；
				if (productSelect === undefined) return;
				let stock = productSelect.stock || 0;
				let num = this.attr.productSelect;
				if (changeValue) {
					num.cart_num++;
					if (num.cart_num > stock) {
						this.$set(this.attr.productSelect, "cart_num", stock ? stock : 1);
						this.$set(this, "cart_num", stock ? stock : 1);
					}
				} else {
					num.cart_num--;
					if (num.cart_num < 1) {
						this.$set(this.attr.productSelect, "cart_num", 1);
						this.$set(this, "cart_num", 1);
					}
				}
			},
			/**
			 * 购物车手动填写
			 *
			 */
			iptCartNum: function(e) {
				this.$set(this.attr.productSelect, 'cart_num', e);
			},
			subDel: function(event) {
				let that = this,
					selectValue = that.selectValue;
				if (selectValue.length > 0)
					cartDel(selectValue).then(res => {
						that.loadend = false;
						that.cartList.valid = [];
						that.getCartList();
					});
				else
					return that.$util.Tips({
						title: '请选择产品'
					});
			},
			getSelectValueProductId: function() {
				let that = this;
				let validList = that.cartList.valid;
				let selectValue = that.selectValue;
				let productId = [];
				if (selectValue.length > 0) {
					for (let index in validList) {
						if (that.inArray(validList[index].id, selectValue)) {
							productId.push(validList[index].productId);
						}
					}
				}
				return productId;
			},
			subCollect: function(event) {
				let that = this,
					selectValue = that.selectValue;
				if (selectValue.length > 0) {
					let selectValueProductId = that.getSelectValueProductId();
					collectAll(that.getSelectValueProductId()).then(res => {
						return that.$util.Tips({
							title: '收藏成功',
							icon: 'success'
						});
					}).catch(err => {
						return that.$util.Tips({
							title: err
						});
					});
				} else {
					return that.$util.Tips({
						title: '请选择产品'
					});
				}
			},
			// 立即下单
			subOrder: function(event) {

				let that = this,
					selectValue = that.selectValue;
				if (selectValue.length > 0) {
					that.getPreOrder();
				} else {
					return that.$util.Tips({
						title: '请选择产品'
					});
				}
			},
			/**
			 * 预下单
			 */
			getPreOrder: function() {
				let shoppingCartId = this.selectValue.map(item => {
					return {
						"shoppingCartId": Number(item)
					}
				})
				this.$Order.getPreOrder("shoppingCart", shoppingCartId);
			},
			checkboxAllChange: function(event) {
				let value = event.detail.value;
				if (value.length > 0) {
					this.setAllSelectValue(1)
				} else {
					this.setAllSelectValue(0)
				}
			},
			setAllSelectValue: function(status) {
				let that = this;
				let selectValue = [];
				let valid = that.cartList.valid;
				if (valid.length > 0) {
					let newValid = valid.map(item => {
						if (status) {
							if (that.footerswitch) {
								if (item.canChecked) {
									item.selected = true;
									selectValue.push(item.id);
								} else {
									item.selected = false;
								}
							} else {
								item.selected = true;
								selectValue.push(item.id);
							}
							that.isAllSelect = true;
						} else {
							item.selected = false;
							that.isAllSelect = false;
						}
						return item;
					});
					that.$set(that.cartList, 'valid', newValid);
					that.selectValue = selectValue;
					that.switchSelect();
				}
			},
			checkboxChange: function(event) {
				let that = this;
				let value = event.detail.value;
				let valid = that.cartList.valid;
				let arr1 = [];
				let arr2 = [];
				let arr3 = [];
				let newValid = valid.map(item => {
					if (that.inArray(item.id, value)) {
						if (that.footerswitch) {
							if (item.canChecked) {
								item.selected = true;
								arr1.push(item);
							} else {
								item.selected = false;
							}
						} else {
							item.selected = true;
							arr1.push(item);
						}
					} else {
						item.selected = false;
						arr2.push(item);
					}
					return item;
				});
				if (that.footerswitch) {
					arr3 = arr2.filter(item => !item.canChecked);
				}
				that.$set(that.cartList, 'valid', newValid);
				that.isAllSelect = newValid.length === arr1.length + arr3.length;
				that.selectValue = value;
				that.switchSelect();
			},
      /**
       * 合计金额、数量
       */
			switchSelect: function() {
				const validList = this.cartList.valid;
        const selectValue = this.selectValue;
				if (selectValue.length < 1) {
					this.selectCountPrice = 0.00;
          return;
				}
        // 合计金额
        let selectCountPrice = 0.00;
        let cartCount = 0
        for (let index in validList) {
          if (this.inArray(validList[index].id, selectValue)) {
            selectCountPrice = this.$util.$h.Add(selectCountPrice, this.$util.$h.Mul(validList[index].count, validList[index].sku.price))
            cartCount += validList[index].count
          }
        }
        this.selectCountPrice = selectCountPrice;
        this.cartCount = cartCount;
			},
			/**
			 * 购物车手动填写
			 */
			iptCartNum: function(index) {
				let item = this.cartList.valid[index];
				if (item.cartNum) {
					this.setCartNum(item.id, item.cartNum);
				}
				this.switchSelect();
			},
			blurInput: function(index) {
				let item = this.cartList.valid[index];
				if (!item.cartNum) {
					item.cartNum = 1;
					this.$set(this.cartList, 'valid', this.cartList.valid)
				}
			},
      /**
       * 减少购买数量
       */
			subCart: function(index) {
				let item = this.cartList.valid[index];
        if (item.count < 1) {
          this.$util.Tips({
            title: '商品数量不能减少！'
          });
          return;
        }
        // 本地先修改状态
        item.count = Number(item.count) - 1;
				if (item.count <= 1) {
					item.count = 1;
					item.numSub = true;
				} else {
					item.numSub = false;
					item.numAdd = false;
				}
        // 提交修改
        this.setCartNum(item.id, item.count);
			},
      /**
       * 增加购买数量
       */
			addCart: function(index) {
        // 本地先修改状态
				let item = this.cartList.valid[index];
        item.count = Number(item.count) + 1
				if (item.count >= item.sku.stock) {
					item.count = item.sku.stock;
					item.numAdd = true;
					item.numSub = false;
				} else {
					item.numAdd = false;
					item.numSub = false;
				}
        // 提交修改
				this.setCartNum(item.id, item.count);
			},
      /**
       * 修改购物项为指定数量
       */
			setCartNum(cartId, cartNum) {
        TradeCartApi.updateCart({
          id: cartId,
          count: cartNum
        }).then(res => {
          // 加载最新状态
          this.getCartList()
				});
			},
			getCartData() {
				return new Promise((resolve, reject) => {
          TradeCartApi.getCartList().then((res) => {
						resolve(res.data);
					}).catch(function(err) {
						this.loading = false;
						this.canShow = true;
						this.$util.Tips({
							title: err
						});
					})
				});
			},
			async getCartList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
        // 加载购物车
        const cartList = await this.getCartData();
        const validList = cartList.validList;
        const invalidList = cartList.invalidList;

        // 有效的购物车
        const selectValue = [];
        if (validList.length > 0) {
          for (let index in validList) {
            // 设置是否可减少（到底，不可减少）
            validList[index].numSub = validList[index].cartNum === 1;
            // 设置是否可添加（到顶，不可添加）
            const sku = validList[index].sku;
            validList[index].numAdd = sku && validList[index].count < sku.stock;
            // 设置为选中，并添加到 selectValue 数组中
            // why？库存不足时，可以引导选择该 SPU 对应的其它 SKU。而 invalidList 是 SPU 不存在或者库存彻底不足
            if (sku && sku.stock > 0) {
              validList[index].canChecked = true; // 是否可选中：是
              selectValue.push(validList[index].id);
            } else {
              validList[index].canChecked = false; // 是否可选中：否
            }
          }
        }
        this.$set(this.cartList, 'valid', validList);
        this.selectValue = selectValue;
        let newArr = validList.filter(item => item.canChecked);
        this.isAllSelect = newArr.length === selectValue.length && newArr.length;
        this.switchSelect();

        // 无效的购物车
        this.$set(this.cartList, 'invalid', invalidList);

        // 标记加载结束
        this.loading = false;
        this.canShow = true;
        uni.hideLoading();
			},
			getHostProduct: function() {
				let that = this;
				if (that.hotScroll) return
				getProductHot(
					that.hotPage,
					that.hotLimit,
				).then(res => {
					that.hotPage++
					that.hotScroll = res.data.list.length < that.hotLimit
					that.hostProduct = that.hostProduct.concat(res.data.list)
				});
			},
			goodsOpen: function() {
				let that = this;
				that.goodsHidden = !that.goodsHidden;
			},
			manage: function() {
				let that = this;
				that.footerswitch = !that.footerswitch;
				let arr1 = [];
				let arr2 = [];
				let newValid = that.cartList.valid.map(item => {
					if (that.footerswitch) {
						if (item.canChecked) {
							if (item.selected) {
								arr1.push(item.id);
							}
						} else {
							item.selected = false;
							arr2.push(item);
						}
					} else {
						if (item.selected) {
							arr1.push(item.id);
						}
					}
					return item;
				});
				that.cartList.valid = newValid;
				if (that.footerswitch) {
					that.isAllSelect = newValid.length === arr1.length + arr2.length;
				} else {
					that.isAllSelect = newValid.length === arr1.length;
				}
				that.selectValue = arr1;
				that.switchSelect();
			},
			unsetCart: function() {
				let that = this,
					ids = [];
				for (let i = 0, len = that.cartList.invalid.length; i < len; i++) {
					ids.push(that.cartList.invalid[i].id);
				}
				cartDel(ids).then(res => {
					that.$util.Tips({
						title: '清除成功'
					});
					that.$set(that.cartList, 'invalid', []);
					that.getHostProduct();
				}).catch(res => {

				});
			},

      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
      inArray: function(search, array) {
        for (let i in array) {
          if (array[i] === search) {
            return true;
          }
        }
        return false;
      },
		},
		onReachBottom() {
      // TODO 芋艿：临时禁用
      if (true) {
        return;
      }
			let that = this;
			if (that.cartList.valid.length == 0 && that.cartList.invalid.length == 0 && this.hotPage != 1) {
				that.getHostProduct();
			}
		}
	}
</script>

<style scoped lang="scss">
	.invalidClas {
		position: relative;
		z-index: 111;
		top: -120rpx;
	}

	.invalidClasNO {
		position: static;
		margin-top: 15px;
	}

	.cartBox {
		// background-color: #fff;
	}

	.shoppingCart {
		/* #ifdef H5 */
		// padding-bottom: 0;
		// padding-bottom: constant(safe-area-inset-bottom);
		// padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}

	.shoppingCart .labelNav {
		height: 178rpx;
		padding: 30rpx 30rpx 0 30rpx;
		font-size: 22rpx;
		color: #fff;
		position: fixed;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		background-color: $theme-color;
		z-index: 5;
		top: 0;
	}

	.shoppingCart .labelNav .item .iconfont {
		font-size: 25rpx;
		margin-right: 10rpx;
	}

	.shoppingCart .nav {
		width: 92%;
		height: 90rpx;
		background-color: #fff;
		padding: 0 24rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #282828;
		position: fixed;
		left: 30rpx;
		z-index: 6;
		top: 94rpx;
		border-top-left-radius: 14rpx;
		border-top-right-radius: 14rpx;
	}

	.shoppingCart .nav .num {
		margin-left: 12rpx;
	}

	.shoppingCart .nav .administrate {
		font-size: 28rpx;
		color: #333333;
	}

	.shoppingCart .noCart {
		margin-top: 171rpx;
		background-color: #fff;
		padding-top: 0.1rpx;
	}

	.shoppingCart .noCart .pictrue {
		width: 414rpx;
		height: 336rpx;
		margin: 78rpx auto 56rpx auto;
	}

	.shoppingCart .noCart .pictrue image {
		width: 100%;
		height: 100%;
	}

	.shoppingCart .list {
		width: 100%;
		margin-top: 178rpx;
		overflow: hidden;
		border-bottom-left-radius: 14rpx;
		border-bottom-right-radius: 14rpx;
	}

	.shoppingCart .list .item {
		padding: 24rpx;
		background-color: #fff;
	}

	.shoppingCart .list .item .picTxt {
		width: 582rpx;
		position: relative;
	}

	.shoppingCart .list .item .picTxt .pictrue {
		width: 160rpx;
		height: 160rpx;
	}

	.shoppingCart .list .item .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.shoppingCart .list .item .picTxt .text {
		width: 396rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.shoppingCart .list .item .picTxt .text .reColor {
		color: #999;
	}

	.shoppingCart .list .item .picTxt .text .reElection {
		margin-top: 20rpx;
	}

	.shoppingCart .list .item .picTxt .text .reElection .title {
		font-size: 24rpx;
	}

	.shoppingCart .list .item .picTxt .text .reElection .reBnt {
		width: 120rpx;
		height: 46rpx;
		border-radius: 23rpx;
		font-size: 26rpx;
	}

	.shoppingCart .list .item .picTxt .text .infor {
		font-size: 24rpx;
		color: #999999;
		margin-top: 16rpx;
	}

	.shoppingCart .list .item .picTxt .text .money {
		font-size: 32rpx;
		color: #E93323;
		margin-top: 28rpx;
		font-weight: 600;
	}

	.shoppingCart .list .item .picTxt .carnum {
		height: 47rpx;
		position: absolute;
		bottom: 7rpx;
		right: 0;
	}

	.shoppingCart .list .item .picTxt .carnum view {
		border: 1rpx solid #a4a4a4;
		width: 66rpx;
		text-align: center;
		height: 100%;
		line-height: 44rpx;
		font-size: 28rpx;
		color: #a4a4a4;
	}

	.shoppingCart .list .item .picTxt .carnum .reduce {
		border-right: 0;
		border-radius: 3rpx 0 0 3rpx;
		border-radius: 22rpx 0rpx 0rpx 22rpx;
		font-size: 34rpx;
		line-height: 40rpx;
	}

	.shoppingCart .list .item .picTxt .carnum .reduce.on {
		border-color: #e3e3e3;
		color: #dedede;
	}

	.shoppingCart .list .item .picTxt .carnum .plus {
		border-left: 0;
		border-radius: 0 3rpx 3rpx 0;
		border-radius: 0rpx 22rpx 22rpx 0rpx;
		font-size: 34rpx;
		line-height: 40rpx;
	}

	.shoppingCart .list .item .picTxt .carnum .num {
		color: #282828;
	}

	.shoppingCart .invalidGoods {
		background-color: #fff;
		margin-top: 30rpx;
		/* #ifdef MP */
		margin-top: 140rpx;
		/* #endif */

	}

	.shoppingCart .invalidGoods .goodsNav {
		width: 100%;
		height: 90rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #333333;
	}

	.shoppingCart .invalidGoods .goodsNav .iconfont {
		color: #424242;
		font-size: 28rpx;
		margin-right: 17rpx;
	}

	.shoppingCart .invalidGoods .goodsNav .del {
		font-size: 26rpx;
		color: #333;
	}

	.shoppingCart .invalidGoods .goodsNav .del .icon-shanchu1 {
		color: #333;
		font-size: 33rpx;
		vertical-align: -2rpx;
		margin-right: 8rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item {
		padding: 24rpx;
	}

	.shoppingCart .invalidGoods .goodsList .picTxt {
		width: 576rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .invalid {
		font-size: 22rpx;
		color: #CCCCCC;
		height: 36rpx;
		border-radius: 3rpx;
		text-align: center;
		line-height: 36rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .pictrue {
		width: 160rpx;
		height: 160rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .text {
		width: 396rpx;
		font-size: 28rpx;
		color: #999;
		height: 140rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .text .name {
		width: 100%;
	}

	.shoppingCart .invalidGoods .goodsList .item .text .infor {
		font-size: 24rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .text .end {
		font-size: 26rpx;
		color: #bbb;
	}

	.footer {
		z-index: 9;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		padding: 0 24rpx;
		box-sizing: border-box;
		border-top: 1rpx solid #eee;
		// border-bottom: 1px solid #EEEEEE;
		/* #ifdef H5 */
		bottom: 98rpx;
		/* #endif */
		/* #ifdef MP */
		bottom: 0;
		/* #endif */
		/* #ifndef MP */
		// bottom: 98rpx;
		// bottom: calc(98rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		// bottom: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		/* #endif */
	}

	.footer .checkAll {
		font-size: 28rpx;
		color: #282828;
		margin-left: 14rpx;
	}

	.footer .money {
		font-size: 30rpx;

		.font-color {
			font-weight: 600;
		}
	}

	.footer .placeOrder {
		color: #fff;
		font-size: 30rpx;
		width: 226rpx;
		height: 70rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 70rpx;
		margin-left: 22rpx;
	}

	.footer .button .bnt {
		font-size: 28rpx;
		color: #999;
		border-radius: 50rpx;
		border: 1px solid #999;
		width: 160rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.footer .button form~form {
		margin-left: 17rpx;
	}

	.uni-p-b-96 {
		height: 96rpx;
	}
</style>
