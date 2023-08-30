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
									<checkbox :value="item.id.toString()" :checked="item.selected"
                            :disabled="!item.canChecked && footerswitch" style="margin-right: 10rpx;" />
									<!-- #endif -->
									<!-- #ifdef MP -->
									<checkbox :value="item.id.toString()" :checked="item.selected"
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
											<view class='infor line1' v-if="item.sku">属性：
                        <text v-for="property in item.sku.properties" style="padding-left: 2px">{{property.valueName}}</text>
                      </view>
											<view class='money' v-if="item.canChecked">￥{{ fen2yuan(item.sku.price) }}</view>
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
        <!-- 热门推荐 -->
				<view class='noCart' v-if="cartList.valid.length === 0 && cartList.invalid.length === 0 && canShow">
					<view class='pictrue'>
						<image src='../../static/images/noCart.png' />
					</view>
					<recommend :hostProduct='hostProduct'></recommend>
				</view>
			</view>
		</view>
    <!-- 管理操作 -->
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
    <!-- SKU 不可用的商品，重新选择 SKU -->
    <productWindow
      :attr="attr"
      :isShow='1'
      :iSplus='1'
      :iScart='1'
      @ChangeAttr="ChangeAttr"
			@ChangeCartNum="ChangeCartNum"
      @iptCartNum="iptCartNum"
      @close="closeAttr"
      @goCat="reGoCat"
    />
		<view class="uni-p-b-96" />
		<view class="uni-p-b-98" />
	</view>
</template>

<script>
  let sysHeight = 0
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import recommend from '@/components/recommend';
	import productWindow from '@/components/productWindow';
  import * as TradeCartApi from '@/api/trade/cart.js';
  import * as ProductSpuApi from '@/api/product/spu.js'
  import * as ProductFavoriteApi from '@/api/product/favorite.js';
  import * as Util from '@/utils/util.js';
  import * as ProductUtil from '@/utils/product.js';
  import * as PromotionActivityApi from '@/api/promotion/activity.js';
  export default {
		components: {
			recommend,
			productWindow,
		},
		data() {
			return {
        sysHeight: sysHeight,
        goodsHidden: false,
				footerswitch: true,
				hostProduct: [],
        hotPage: 1,
        hotLimit: 10,
        hotScroll: false,

        // 购物车列表
				cartList: { // 购物车列表
					valid: [], // 有效
					invalid: [] // 无效
				},
				isAllSelect: false, // 是否全选
				selectValue: [], // 选中的数据
				selectCountPrice: 0.00, // 选中的金额
        cartCount: 0, // 选中的商品数量
        canShow: false, // 是否可展示

        // 重选
        cartId: 0, // 重选的 cart id
        product_id: 0, // 重选的 SPU 编号
        attr: {  // productWindow 组件，使用该属性
					cartAttr: false,  // 是否打开属性的选择弹出
          // ↓↓↓ 属性数组，结构为：id = 属性编号；name = 属性编号的名字；values[].id = 属性值的编号，values[].name = 属性值的名字；index = 选中的属性值的名字
					properties: [],
					productSelect: {} // 选中的 SKU
				},
        spu: {}, // 商品 SPU 详情
        skuMap: [], // 商品 SKU Map
        attrValue: '', // 已选属性名的拼接，例如说 红色,大 这样的格式
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
        this.getHostProduct()

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
      /**
       * 修改购物车
       */
			reGoCat: function() {
				const productSelect = this.skuMap[this.attrValue];
				// 如果有属性,没有选择,提示用户选择
				if (this.attr.properties.length &&
          productSelect === undefined) {
					return this.$util.Tips({
						title: "产品库存不足，请选择其它"
					});
        }

        TradeCartApi.resetCart({
          id: this.cartId,
          skuId: this.attr.productSelect.id,
          count: this.attr.productSelect.cart_num
        }).then(res => {
          this.attr.cartAttr = false;
          this.$util.Tips({
            title: this.$t(`添加购物车成功`)
          });
          this.cartList.valid = [];
          this.getCartList();
        }).catch(res => {
          return this.$util.Tips({
            title: res
          });
        });
			},
      /**
       * 重选 SKU
       */
			reElection: function(item) {
				this.getGoodsDetails(item)
			},
			/**
			 * 获取产品详情
			 */
			getGoodsDetails: function(item) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
        this.cartId = item.id;
        this.product_id = item.spu.id;
        ProductSpuApi.getSpuDetail(item.spu.id).then(res => {
          uni.hideLoading();
          this.attr.cartAttr = true;
          let spu = res.data;
          let properties = ProductUtil.convertProductPropertyList(res.data.skus);
          let skuMap = ProductUtil.convertProductSkuMap(res.data.skus);
          // 设置变量
          this.$set(this, 'spu', spu);
          this.$set(this.attr, 'properties', properties);
          this.$set(this, 'skuMap', skuMap);
          this.selectDefaultSku();
        }).catch(err => {
          uni.hideLoading();
        })
			},
      /**
       * 关闭 productWindow 弹窗
       */
      closeAttr: function () {
        this.$set(this.attr, "cartAttr", false);
      },
			/**
       * 属性变动赋值
       *
       * @param newSkuKey 新的 skuKey
       * @param propertyIndex properties 的下标
       * @param valueIndex values 的下标
			 */
			ChangeAttr: function(newSkuKey, propertyIndex, valueIndex) {
        // SKU
        let sku = this.skuMap[newSkuKey];
        if (!sku) {
          return;
        }
        this.$set(this.attr.productSelect, "id", sku.id);
        this.$set(this.attr.productSelect, "picUrl", sku.picUrl);
        this.$set(this.attr.productSelect, "price", sku.price);
        this.$set(this.attr.productSelect, "stock", sku.stock);
        this.$set(this.attr.productSelect, "cart_num", 1);
        // SKU 关联属性
        this.$set(this.attr.properties[propertyIndex], 'index',
          this.attr.properties[propertyIndex].values[valueIndex].name);
        this.$set(this, "attrValue", newSkuKey);
			},
      /**
       * 查找默认选中的 sku，设置到 attr.productSelect 中
       *
       * 先找有库存的 SKU，否则找第一个 SKU
       */
			selectDefaultSku: function() {
        const properties = this.attr.properties;
        // 获得选中的属性值的名字，例如说 "黑色,大"，则 skuKey = ["黑色", "大"]
        let skuKey = undefined;
        for (let key in this.skuMap) {
          if (this.skuMap[key].stock > 0) {
            skuKey = key.split(",");
            break;
          }
        }
        if (!skuKey) { // 如果找不到，则选中第一个
          skuKey = Object.keys(this.skuMap)[0].split(",");
        }
        // 使用 index 属性表示当前选中的，值为属性值的名字
        for (let i = 0; i < properties.length; i++) {
          this.$set(properties[i], "index", skuKey[i]);
        }

        let sku = this.skuMap[skuKey.join(",")];
        if (!sku) {
          return
        }
        this.$set(this.attr.productSelect, "spuName", this.spu.name);
        this.$set(this.attr.productSelect, "id", sku.id);
        this.$set(this.attr.productSelect, "picUrl", sku.picUrl);
        this.$set(this.attr.productSelect, "price", sku.price);
        this.$set(this.attr.productSelect, "stock", sku.stock);
        this.$set(this.attr.productSelect, "cart_num", 1);
        this.$set(this, "attrValue", skuKey.join(","));
			},
			/**
			 * 购物车数量加和数量减
       *
       * @param changeValue true 增加；false 减少
			 */
			ChangeCartNum: function(changeValue) {
				/// 获取当前 sku
        let sku = this.attr.productSelect;
        if (!sku) {
          return;
        }

        // 设置数量
        let stock = sku.stock || 0;
        if (changeValue) {
          sku.cart_num++;
          if (sku.cart_num > stock) {
            this.$set(this.attr.productSelect, "cart_num", stock);
          }
        } else {
          sku.cart_num--;
          if (sku.cart_num < 1) {
            this.$set(this.attr.productSelect, "cart_num", 1);
          }
        }
			},
			/**
			 * 购物车手动填写
			 */
			iptCartNum: function(number) {
        this.$set(this.attr.productSelect, 'cart_num', number ? number : 1);
			},
      /**
       * 删除选中的商品
       */
			subDel: function(event) {
        const selectValue = this.selectValue;
        if (selectValue.length === 0) {
          return this.$util.Tips({
            title: '请选择产品'
          });
        }
        TradeCartApi.deleteCart(selectValue).then(res => {
          this.getCartList();
        });
			},
			getSelectValueProductId: function() {
				const validList = this.cartList.valid;
				const selectValue = this.selectValue;
				let productId = [];
				if (selectValue.length > 0) {
					for (let index in validList) {
						if (this.inArray(validList[index].id, selectValue)) {
							productId.push(validList[index].spu.id);
						}
					}
				}
				return productId;
			},
      /**
       * 收藏选中的商品
       */
			subCollect: function(event) {
				const spuIds = this.getSelectValueProductId();
        if (spuIds.length === 0) {
          return this.$util.Tips({
            title: '请选择产品'
          });
        }

        ProductFavoriteApi.createFavoriteList(spuIds).then(res => {
          return this.$util.Tips({
            title: '收藏成功',
            icon: 'success'
          });
        }).catch(err => {
          return that.$util.Tips({
            title: err
          });
        });
			},
      /**
       * 立即下单
       */
			subOrder: function(event) {
        const selectValue = this.selectValue;
        if (selectValue.length === 0) {
          return this.$util.Tips({
            title: '请选择产品'
          });
        }
        uni.navigateTo({
          url: '/pages/users/order_confirm/index?cartIds=' + selectValue.join(',')
        });
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
      /**
       * 全选 / 全不选
       */
			checkboxAllChange: function(event) {
				let value = event.detail.value;
				if (value.length > 0) {
					this.setAllSelectValue(true)
				} else {
					this.setAllSelectValue(false)
				}
			},
      /**
       * 全选 / 全不选
       */
			setAllSelectValue: function(selected) {
        const valid = this.cartList.valid;
        const values = [];
        for (const item of valid) {
          values.push(item.id.toString());
        }
        TradeCartApi.updateCartSelected({
          ids: values,
          selected: selected
        }).then(res => {
          this.getCartList()
        })
			},
      /**
       * 更新是否选中
       */
			checkboxChange: function(event) {
        // 由于 uniapp 不支持直接通过 event 获取到变更的值，所以只能通过比对
        const valid = this.cartList.valid;
        const oldValues = [];
        for (const item of valid) {
          if (item.canChecked && item.selected) {
            oldValues.push(item.id.toString());
          } else if (!this.footerswitch && item.selected) {
            oldValues.push(item.id.toString());
          }
        }
        const newValues = event.detail.value;

        // 情况一：选中
        const selectedItem = newValues.find(item => !oldValues.includes(item));
        if (selectedItem) {
          TradeCartApi.updateCartSelected({
            ids: [selectedItem],
            selected: true
          }).then(res => {
            this.getCartList()
          })
          return;
        }
        // 情况二：取消选中
        const cancelSelectedItem = oldValues.find(item => !newValues.includes(item));
        if (cancelSelectedItem) {
          TradeCartApi.updateCartSelected({
            ids: [cancelSelectedItem],
            selected: false
          }).then(res => {
            this.getCartList()
          })
        }
			},
      /**
       * 合计金额、数量
       */
			switchSelect: function() {
        // 是否全选
        const validList = this.cartList.valid;
        const selectValue = [];
        let isAllSelect = true;
        if (validList && validList.length > 0) {
          for (const item of validList) {
            if (item.canChecked) {
              if (item.selected) {
                selectValue.push(item.id);
              } else {
                isAllSelect = false;
              }
            } else {
              if (!this.footerswitch && item.selected) {
                selectValue.push(item.id);
              }
              if (!this.footerswitch && !item.selected) {
                isAllSelect = false;
              }
            }
          }
        }
        this.selectValue = selectValue;
        this.isAllSelect = isAllSelect;

        // 合计金额
        let selectCountPrice = 0.00;
        let cartCount = 0
        for (let index in validList) {
          if (this.inArray(validList[index].id, selectValue)
            && validList[index].sku) {
            selectCountPrice = this.$util.$h.Add(selectCountPrice, this.$util.$h.Mul(validList[index].count, validList[index].sku.price))
            cartCount += validList[index].count
          }
        }
        this.selectCountPrice = selectCountPrice;
        this.cartCount = cartCount;
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
        TradeCartApi.updateCartCount({
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
            } else {
              validList[index].canChecked = false; // 是否可选中：否
            }
          }
        }
        this.$set(this.cartList, 'valid', validList);
        this.switchSelect();

        // 无效的购物车
        this.$set(this.cartList, 'invalid', invalidList);

        // 标记加载结束
        this.canShow = true;
        uni.hideLoading();
			},

      /**
       * 获得“热门推荐”
       */
			getHostProduct: function() {
        ProductSpuApi.getSpuPage({
          recommendType: 'hot',
          pageNo: this.hotPage,
          pageSize: this.hotLimit
        }).then(res => {
          const good_list = res.data.list;
          this.hotPage++
          this.hotScroll = good_list.length < this.hotLimit

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
			goodsOpen: function() {
				this.goodsHidden = !this.goodsHidden;
			},
      /**
       * 切换到管理
       */
			manage: function() {
				this.footerswitch = !this.footerswitch;
				this.switchSelect();
			},
      /**
       * 清空
       */
			unsetCart: function() {
        const ids = [];
        for (let i = 0, len = this.cartList.invalid.length; i < len; i++) {
          ids.push(this.cartList.invalid[i].id);
        }
        TradeCartApi.deleteCart(ids).then(res => {
          this.$util.Tips({
            title: '清除成功'
          });
          this.getCartList()
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
			if (this.cartList.valid.length === 0
        && this.cartList.invalid.length === 0
        && this.hotPage != 1) {
				this.getHostProduct();
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
