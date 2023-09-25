<template>
	<view>
    <!-- 顶部的 nav tab -->
		<view class='navbar' :style="{height:navH+'rpx',opacity:opacity}">
			<view class='navbarH' :style='"height:"+navH+"rpx;"'>
				<view class='navbarCon acea-row row-center-wrapper'>
					<view class="header acea-row row-center-wrapper">
						<view class="item" :class="navActive === index ? 'on' : ''" v-for="(item,index) in navList" :key='index' @tap="tap( index)">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</view>
    <!-- 返回键 -->
    <view id="home" class="home-nav acea-row row-center-wrapper iconfont icon-xiangzuo" :class="opacity>0.5?'on':''" :style="{ top: homeTop + 'rpx' }" v-if="returnShow" @tap="returns">
		</view>
    <!-- 详情 -->
    <view class='product-con'>
			<scroll-view :scroll-top="scrollTop" scroll-y='true' scroll-with-animation="true" :style="'height:'+height+'px;'"
			 @scroll="scroll">
				<view id="past0">
					<productConSwiper :imgUrls='spu.sliderPicUrls' />
          <!-- 价格、库存、销量 -->
          <view class='nav acea-row row-between-wrapper mb30'>
						<view class='money'>￥
              <text class='num'>{{ fen2yuan(spu.price) }}</text>
              <text class='y-money'>￥{{ fen2yuan(spu.marketPrice) }}</text>
            </view>
            <!-- 活动状态 -->
						<view class='acea-row row-middle'>
							<view class='time' v-if="status === 2">
								<view>距秒杀结束仅剩</view>
								<countDown :bgColor="bgColor" :is-day="false" :datatime="activity.endTime / 1000"
                           :tip-text="' '" :day-text="' '" :hour-text="' : '" :minute-text="' : '" :second-text="' '" />
							</view>
						</view>
					</view>
					<view class="pad30 mb30">
						<view class='wrapper borRadius14 mb30'>
							<view class='introduce acea-row row-between'>
								<view class='infor'> {{ spu.name}}</view>
								<view class='iconfont icon-fenxiang' @click="listenerActionSheet"></view>
							</view>
							<view class='label acea-row row-middle'>
								<view class='stock'>累计销售：{{ spu.salesCount}} {{ spu.unitName }}</view>
								<view>限量: {{ activity.stock || 0 }} {{ spu.unitName }}</view>
							</view>
						</view>
            <!-- SKU 选择 -->
            <view class='attribute acea-row row-between-wrapper mb30 borRadius14' @tap='openAttr'>
							<view class="line1">{{ attrValue.length > 0 ? "已选择" : "请选择" }}：
                <text class='atterTxt'>{{attrValue}}</text>
              </view>
							<view class='iconfont icon-jiantou'></view>
						</view>
            <!-- 评论 -->
            <view class='userEvaluation' id="past1">
							<view class='title acea-row row-between-wrapper'
                    :style="replyCount ===0?'border-bottom-left-radius:14rpx;border-bottom-right-radius:14rpx;':''">
								<view>用户评价({{ replyCount }})</view>
								<navigator class='praise' hover-class='none' :url="'/pages/users/goods_comment_list/index?productId='+ activity.spuId">
									<text class='font-color'>{{ replyChance }}%</text>好评率
									<text class='iconfont icon-jiantou'></text>
								</navigator>
							</view>
							<userEvaluation :reply="reply" />
						</view>
					</view>
				</view>
				<view class='product-intro' id="past2">
					<view class='title'>
						<image src="../../../static/images/xzuo.png"></image>
						<span class="sp">产品详情</span>
						<image src="../../../static/images/xyou.png"></image>
					</view>
					<view class='conter'>
						<jyf-parser :html="spu.description" ref="article" :tag-style="tagStyle"></jyf-parser>
					</view>
				</view>
				<view style='height:120rpx;'></view>
			</scroll-view>
			<view class='footer acea-row row-between-wrapper'>
        <!-- 客服 TODO 芋艿：待完成 -->
        <!-- #ifdef MP -->
				<button open-type="contact" hover-class='none' class='item'>
					<view class='iconfont icon-kefu'></view>
					<view>客服</view>
				</button>
				<!-- #endif -->
				<!-- #ifndef MP -->
				<navigator hover-class="none" class="item" @click="kefuClick">
					<view class="iconfont icon-kefu"></view>
					<view>客服</view>
				</navigator>
				<!-- #endif -->
        <!-- 收藏 -->
        <view @tap='setCollect' class='item'>
					<view class='iconfont icon-shoucang1' v-if="userCollect"></view>
					<view class='iconfont icon-shoucang' v-else></view>
					<view>收藏</view>
				</view>
        <!-- 购买操作 -->
        <view class="bnt acea-row" v-if="status === 0">
          <view class="buy bnts bg-color-hui">已关闭</view>
        </view>
        <view class="bnt acea-row" v-else-if="status === 1">
          <view class="joinCart bnts" @tap="openAlone">单独购买</view>
          <view class="buy bnts bg-color-hui">未开始</view>
        </view>
        <view class="bnt acea-row" v-else-if="status === 2 && attr.productSelect.stock > 0">
          <view class="joinCart bnts" @tap="openAlone">单独购买</view>
          <view class="buy bnts" @tap="goBuy">立即购买</view>
        </view>
        <view class="bnt acea-row" v-else-if="status === 2 && (attr.productSelect.stock <= 0)">
          <view class="joinCart bnts" @tap="openAlone">单独购买</view>
          <view class="buy bnts bg-color-hui">已售罄</view>
        </view>
        <view class="bnt acea-row" v-else-if="status === 3">
          <view class="joinCart bnts" @tap="openAlone">单独购买</view>
          <view class="buy bnts bg-color-hui">已结束</view>
        </view>
        <view class="bnt acea-row" v-else> <!-- 兜底 -->
          <view class="joinCart bnts" @tap="openAlone">单独购买</view>
          <view class="buy bnts bg-color-hui">未开始</view>
        </view>
			</view>
		</view>
    <!-- SKU 弹窗 -->
    <product-window
      :attr='attr'
      @ChangeAttr="ChangeAttr"
      @ChangeCartNum="ChangeCartNum"
      @iptCartNum="iptCartNum"
      @close="closeAttr"
    />
		<home></home>
		<!-- 分享按钮 -->
		<view class="generate-posters acea-row row-middle" :class="posters ? 'on' : ''">
			<!-- #ifndef MP -->
			<button class="item" hover-class='none' v-if="weixinStatus === true" @click="H5ShareBox = true">
				<view class="iconfont icon-weixin3"></view>
				<view class="">发送给朋友</view>
			</button>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<button class="item" open-type="share" hover-class='none' @click="closePosters">
				<view class="iconfont icon-weixin3"></view>
				<view class="">发送给朋友</view>
			</button>
			<!-- #endif -->
			<button class="item" hover-class='none' @tap="goPoster">
				<view class="iconfont icon-haibao"></view>
				<view class="">生成海报</view>
			</button>
		</view>
		<view class="mask"  v-if="posters" @click="closePosters"></view>
		<view class="mask"  v-if="canvasStatus"  @click="closePosters"></view>
		<!-- 海报展示 -->
		<view class='poster-pop' v-if="canvasStatus">
			<image src='/static/images/poster-close.png' class='close' @click="posterImageClose"></image>
			<image :src='posterImage'></image>
			<!-- #ifndef H5  -->
			<view class='save-poster' @click="savePosterPath">保存到手机</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="keep">长按图片可以保存到手机</view>
			<!-- #endif -->
		</view>
		<view class="canvas"  v-else>
			<canvas style="width:750px;height:1190px;" canvas-id="firstCanvas"></canvas>
			<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}"/>
		</view>
		<!-- 发送给朋友图片 -->
		<view class="share-box" v-if="H5ShareBox">
			<image src="/static/images/share-info.png" @click="H5ShareBox = false"></image>
		</view>
	</view>
</template>

<script>
  const app = getApp();
	import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
	import { mapGetters } from "vuex";
	import productConSwiper from '@/components/productConSwiper/index.vue'
	import productWindow from '@/components/productWindow/index.vue'
	import userEvaluation from '@/components/userEvaluation/index.vue'
	// #ifdef MP
	import { base64src } from '@/utils/base64src.js'
	import { getQrcode } from '@/api/api.js';
	// #endif
	import parser from "@/components/jyf-parser/jyf-parser";
	import home from '@/components/home/index.vue'
	import countDown from '@/components/countDown';
	import { imageBase64 } from "@/api/public";
	import { toLogin } from '@/libs/login.js';
	import { silenceBindingSpread } from "@/utils";
  import * as ProductSpuApi from '@/api/product/spu.js';
  import * as ProductFavoriteApi from '@/api/product/favorite.js';
  import * as ProductCommentApi from '@/api/product/comment.js';
  import * as SeckillApi from '@/api/promotion/seckill.js';
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
  import * as Util from '@/utils/util.js';
  import * as ProductUtil from '@/utils/product.js';
	export default {
		data() {
			return {
        // ========== 秒杀活动相关变量 ==========
        id: 0, // 秒杀活动的编号
        activity: {}, // 秒杀活动的信息
        status: 1, // 0 - 已禁用；1 - 未开始；2 - 进行中；3 - 已结束
        bgColor: {
          'bgColor': '#333333',
          'Color': '#fff',
          'isDay': true,
          'width': '44rpx',
          'timeTxtwidth': '16rpx',
        },

        // ========== 商品相关变量 ==========
        spu: {}, // 商品 SPU 详情
        skuMap: [], // 商品 SKU Map
        attrValue: '', // 已选属性名的拼接，例如说 红色,大 这样的格式
        attr: { // productWindow 组件，使用该属性
          cartAttr: false,
          // ↓↓↓ 属性数组，结构为：id = 属性编号；name = 属性编号的名字；values[].id = 属性值的编号，values[].name = 属性值的名字；index = 选中的属性值的名字
          properties: [],
          productSelect: {} // 选中的 SKU
        },
        tagStyle: {
          img: 'width:100%;display:block;',
          table: 'width:100%',
          video: 'width:100%'
        },

        // ========== 评价相关的变量 ==========
        replyCount: 0, // 总评论数量
        replyChance: 0, // 好评率
        reply: [], // 评论列表

        // ========== 收藏相关的变量 ==========
        userCollect: false,

        // ========== 分销相关的变量 ==========
        qrcodeSize: 600, // 二维码的大小
        promotionCode: '', // 二维码图片
        imgTop: '', // 商品图片的 base64 码
        errT: '',  // 获得小程序码失败的提示文本
        posters: false, // 分享弹窗的开关
        weixinStatus: false, // 微信分享是否打开
        canvasStatus: false, // 是否显示海报
        H5ShareBox: false, // 公众号分享的弹出
        posterbackgd: '/static/images/posterbackgd.png',  // 海报的背景，用于海报的生成
        storeImage: '', // 下载商品图片后的文件地址
        actionSheetHidden: true, // 微信小程序的右上角分享的弹出
        posterImage: '', // 海报路径

        // ========== 顶部 nav + scroll 相关的变量 ==========
        returnShow: true, // 判断顶部 [返回] 是否出现
        homeTop: 20, // 头部的 top 位置
        height: 0, // 窗口 height 高度
        scrollY: 0, // 滚动的 Y 轴
        scrollTop: 0,  // 滚动条的 top 位置
        lock: false,  // 是否锁定 scroll 下
        topArr: [], // 每个 nav 的 top 位置
        heightArr: [], // 每个 nav 的 height 高度
        navH: "", // 头部 nav 高度
        opacity: 0, // 头部 nav 的透明度
        navList: ['商品', '评价', '详情'],
        navActive: 0, // 选中的 navList 下标
			}
		},
		components: {
			productConSwiper,
      productWindow,
			userEvaluation,
			"jyf-parser": parser,
			home,
			countDown
		},
		computed: mapGetters(['isLogin','uid','chatUrl']),
		watch:{
			isLogin:{
				handler: function(newV,oldV) {
					if (newV) {
						this.getSeckillDetail();
					}
				},
				deep:true
			}
		},
		onLoad(options) {
			this.$store.commit("PRODUCT_TYPE", 'normal');
			// 设置商品列表高度
			uni.getSystemInfo({
				success: res => {
					this.height = res.windowHeight
					//res.windowHeight:获取整个窗口高度为px，*2为rpx；98为头部占据的高度；
				},
			});
			// #ifndef APP-PLUS
			this.navH = app.globalData.navHeight
			// #endif
			// #ifdef APP-PLUS
			this.navH = 90
			// #endif

			// #ifdef MP || APP-NVUE
			// 小程序链接进入获取绑定关系id
      // 绑定分销关系
      setTimeout(()=>{
				if (options.spread) {
					app.globalData.spread = options.spread;
          BrokerageAPI.bindBrokerageUser(options.spread).then(res => {})
				}
			},2000)
			// #endif

      // 校验参数是否正确
      if (!options.scene && !options.id){
				this.$util.Tips({
					title: '缺少参数无法查看商品'
				}, {
					url: '/pages/index/index'
				});
				return;
			}
      // 解析 id 商品编号
      if (options.scene) { // 仅仅小程序扫码进入
        // TODO 芋艿：code 是啥
        let qrCodeValue = this.$util.getUrlParams(decodeURIComponent(options.scene));
        let mapeMpQrCodeValue = this.$util.formatMpQrCodeData(qrCodeValue);
        app.globalData.spread = mapeMpQrCodeValue.spread;
        this.id = mapeMpQrCodeValue.id;
        // 绑定分销用户
        setTimeout(()=>{
          BrokerageAPI.bindBrokerageUser(mapeMpQrCodeValue.spread).then(res => {}).catch(res => {})
        },2000)
      } else {
        this.id = options.id;
      }

      // 获得秒杀详情
      this.getSeckillDetail();
		},
    //#ifdef MP
    onShareAppMessage() {
      return {
        title: this.spu.name || '',
        imageUrl: this.spu.picUrl,
        path: app.globalData.openPages
      };
    },
    //#endif
    onReady() {
      this.$nextTick(() => {
        // 设置微信的头部 top 位置
        // #ifdef MP
        const menuButton = uni.getMenuButtonBoundingClientRect();
        const query = uni.createSelectorQuery().in(this);
        query.select('#home')
          .boundingClientRect(data => {
            this.homeTop = menuButton.top * 2 + menuButton.height - data.height;
          })
          .exec();
        // #endif
      });
      silenceBindingSpread();
    },
		methods: {
      // ========== 秒杀活动相关 ==========
      getSeckillDetail: function() {
        SeckillApi.getSeckillActivity(this.id).then(res => {
          this.activity = res.data;
          // 计算活动状态
          const now = new Date().getTime();
          if (this.activity.status !== 0) {
            if (this.activity.startTime > now) {
              this.status = 1;
            } else if (now <= this.activity.endTime) {
              this.status = 2;
            } else {
              this.status = 3;
            }
          } else {
            this.status = 0;
          }

          // 获得商品详情
          this.getGoodsDetails();
          // 获得商品收藏
          this.isFavoriteExists();
          // 获得商品评价列表
          this.getProductReplyList();
          this.getProductReplyCount();

          app.globalData.openPages = '/pages/activity/goods_seckill_details/index?id='
            + this.id + '&spread=' + this.uid;
        }).catch(err => {
          this.$util.Tips({
            title:err
          },{
            tab:3
          })
        });
      },

      // ========== 商品详情相关 ==========
      /**
       * 获取产品详情
       */
      getGoodsDetails: function() {
        ProductSpuApi.getSpuDetail(this.activity.spuId).then(res => {
          let spu = res.data;
          let skus = res.data.skus;
          this.$set(this, 'spu', spu);
          this.$set(this.attr, 'properties', ProductUtil.convertProductPropertyList(skus));
          this.$set(this, 'skuMap', ProductUtil.convertProductSkuMap(skus));
          // 将秒杀活动的信息，合并到 SKU 里面，实现秒杀价格的显示
          this.activity.products.forEach(product => {
            this.spu.price = Math.min(this.spu.price, product.seckillPrice); // 设置 SPU 的最低价格
          });
          skus.forEach(sku => {
            const product = this.activity.products.find(product => product.skuId === sku.id);
            if (product) {
              sku.price = product.seckillPrice;
              sku.stock = Math.min(sku.stock, product.stock);
            } else { // 找不到可能是没配置，则不能发起秒杀
              sku.stock = 0;
            }
            // 设置限购数量
            if (this.activity.totalLimitCount > 0 && this.activity.singleLimitCount > 0) {
              sku.limitCount = Math.min(this.activity.totalLimitCount, this.activity.singleLimitCount);
            } else if (this.activity.totalLimitCount > 0) {
              sku.limitCount = this.activity.totalLimitCount;
            } else if (this.activity.singleLimitCount > 0) {
              sku.limitCount = this.activity.singleLimitCount;
            }
          });

          // 处理滚动条
          setTimeout(() => {
            this.infoScroll();
          }, 1000);

          // 设置或下载分销需要的图片
          // #ifdef H5
          this.storeImage = spu.picUrl;
          this.make();
          this.ShareInfo();
          // #endif
          // #ifdef MP
          this.getQrcode();
          this.imgTop = spu.picUrl;
          // #endif
          // #ifndef H5
          this.downloadFilestoreImage();
          // #endif

          // 选中默认 sku
          this.selectDefaultSku();
        }).catch(err => {
          return this.$util.Tips({
            title: err.toString()
          }, {
            tab: 3,
            url: 1
          });
        })
      },
      /**
       * 默认选中属性
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
        this.$set(this.attr.productSelect, "limitCount", sku.limitCount); // 秒杀活动特有字段
        this.$set(this, "attrValue", skuKey.join(","));
      },
      /**
       * 打开 SKU 属性的选择
       */
      openAttr: function() {
        this.$set(this.attr, 'cartAttr', true);
      },
      /**
       * 关闭 productWindow 弹窗
       */
      closeAttr: function() {
        this.$set(this.attr, 'cartAttr', false);
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
        this.$set(this.attr.productSelect, "limitCount", sku.limitCount);
        this.$set(this.attr.productSelect, "cart_num", 1);
        // SKU 关联属性
        this.$set(this.attr.properties[propertyIndex], 'index',
          this.attr.properties[propertyIndex].values[valueIndex].name);
        this.$set(this, "attrValue", newSkuKey);
      },
      /**
       * 购物车数量加和数量减
       *
       * @param changeValue true 增加；false 减少
       */
      ChangeCartNum: function(changeValue) {
        // 获取当前 sku
        let sku = this.attr.productSelect;
        if (!sku) {
          return;
        }

        // 设置数量
        let stock = sku.stock || 0;
        let limitCount = sku.limitCount;
        if (changeValue) {
          sku.cart_num++;
          if (limitCount > 0 && sku.cart_num > limitCount) {
            this.$set(this.attr.productSelect, "cart_num", limitCount);
            this.$util.Tips({
              title: `该商品每次限购 ${sku.limitCount} ${this.spu.unitName}`
            });
          } else if (sku.cart_num > stock) {
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
       *
       * @param number 数量
       */
      iptCartNum: function (number) {
        this.$set(this.attr.productSelect, 'cart_num', number ? number : 1);
        // 判断是否超限购
        let sku = this.attr.productSelect;
        let limitCount = sku.limitCount;
        if (limitCount !== undefined && number > limitCount) {
          this.$set(this.attr.productSelect, "cart_num", limitCount);
          this.$util.Tips({
            title: `该商品每次限购 ${sku.limitCount} ${this.spu.unitName}`
          });
        }
      },
      /**
			 * 单独购买
			 */
      openAlone: function() {
        uni.navigateTo({
          url: `/pages/goods_details/index?id=${this.activity.spuId}`
        })
      },
      /**
       * 下订单
       */
      goBuy: function() {
        // 未登录，需要跳转
        if (!this.isLogin) {
          toLogin();
          return;
        }

        // 【重要】如果 attr 组件未打开，此时需要先打开。等到选择完后，再立即购买
        if (!this.attr.cartAttr) {
          this.openAttr();
          return;
        }

        // 发起下单
        let sku = this.attr.productSelect;
        uni.navigateTo({
          url: '/pages/users/order_confirm/index?skuId=' + sku.id + '&count=' + sku.cart_num
            + '&seckillActivityId=' + this.id
        });
      },
      /**
       * 跳转到客服
       */
      kefuClick(){
        location.href = this.chatUrl;
      },

      // ========== 评价相关的方法 ==========
      /**
       * 获得商品评价列表
       */
      getProductReplyList: function() {
        ProductCommentApi.getCommentList(this.activity.spuId, 3).then(res => {
          this.reply = res.data;
        })
      },
      /**
       * 获得商品评价统计
       */
      getProductReplyCount: function() {
        ProductCommentApi.getCommentStatistics(this.activity.spuId).then(res => {
          const count = res.data.goodCount + res.data.mediocreCount + res.data.negativeCount;
          this.$set(this, 'replyChance', (100.0 * res.data.goodCount / count).toFixed(0));
          this.$set(this, 'replyCount', count);
        });
      },

      // ========== 收藏相关方法 ==========
      /**
       * 获得是否收藏
       */
      isFavoriteExists: function() {
        if (!this.isLogin) {
          return;
        }

        ProductFavoriteApi.isFavoriteExists(this.activity.spuId).then(res => {
          this.userCollect = res.data;
        });
      },
      /**
       * 收藏 / 取消商品
       */
      setCollect: function() {
        if (!this.isLogin) {
          toLogin();
          return;
        }

        // 情况一：取消收藏
        if (this.userCollect) {
          ProductFavoriteApi.deleteFavorite(this.activity.spuId).then(res => {
            this.$set(this, 'userCollect', false);
          })
          // 情况二：添加收藏
        } else {
          ProductFavoriteApi.createFavorite(this.activity.spuId).then(res => {
            this.$set(this, 'userCollect', true);
          })
        }
      },

      // ========== 分销相关的方法 ==========
      /**
       * 生成二维码，设置到 promotionCode 变量
       */
      make() {
        let href = location.href.split('?')[0] + "?id="+ this.id + "&spread="  + this.uid;
        uQRCode.make({
          canvasId: 'qrcode',
          text: href,
          size: this.qrcodeSize,
          margin: 10,
          success: res => {
            this.promotionCode = res;
          },
          complete: () => {},
          fail:res => {
            this.$util.Tips({
              title: '海报二维码生成失败！'
            });
          }
        })
      },
      /**
       * 设置微信公众号的分享标题、内容等信息
       */
      ShareInfo: function() {
        // 只处理微信环境
        if (!this.$wechat.isWeixin()) {
          return
        }
        const spu = this.spu;
        let href = location.href;
        href = href.indexOf("?") === -1 ?
          href + "?spread=" + this.uid :
          href + "&spread=" + this.uid;
        const configAppMessage = {
          title: spu.name,
          imgUrl: spu.picUrl,
          desc: spu.description,
          link: href
        };
        this.$wechat.wechatEvevt([
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareAppMessage",
          "onMenuShareTimeline"
        ], configAppMessage);
      },
      /**
       * 获得商品的封面 base64
       */
      getImageBase64:function(images) {
        imageBase64({
          url: images
        }).then(res=>{
          this.imgTop = res.data.code
        })
      },
      /**
       * 获得小程序的二维码
       */
      getQrcode() {
        let data = {
          pid: this.uid,
          id: this.id,
          path: 'pages/activity/goods_seckill_details/index'
        }
        getQrcode(data).then(res=>{
          base64src(res.data.code, res => {
            this.promotionCode = res;
          });
        }).catch(err => {
          this.errT = err;
        });
      },
      /**
       * 生成海报
       */
      goPoster: function() {
        // 提示正在生成中
        uni.showLoading({
          title: '海报生成中',
          mask: true
        });
        this.posters = false;
        // 如果没有二维码图片，则说明加载失败，进行错误提示
        if(!this.promotionCode){
          uni.hideLoading();
          this.$util.Tips({
            title: this.errT
          });
          return
        }
        // 校验海报是否已经生成；如果失败，则进行错误提示
        setTimeout(() => {
          if (!this.imgTop) {
            uni.hideLoading();
            this.$util.Tips({
              title: '无法生成商品海报！'
            });
          }
        }, 1000);

        // 展示海报
        const that = this;
        let arrImagesUrlTop = '';
        uni.downloadFile({
          url: this.imgTop, //仅为示例，并非真实的资源
          success: (res) => {
            arrImagesUrlTop = res.tempFilePath;
            let arrImages = [that.posterbackgd, arrImagesUrlTop, that.promotionCode];
            const name = that.spu.name;
            const price = that.fen2yuan(that.spu.price);
            const marketPrice = that.fen2yuan(that.spu.marketPrice);
            setTimeout(() => {
              that.$util.PosterCanvas(arrImages, name, price, marketPrice,
                function(tempFilePath) {
                that.posterImage = tempFilePath;
                that.canvasStatus = true;
                uni.hideLoading();
              });
            }, 500);
          }
        });
      },
      /**
       * 关闭分享弹窗
       */
      closePosters: function() {
        this.posters = false;
      },
      /**
       * 隐藏海报
       */
      posterImageClose: function() {
        this.canvasStatus = false
      },
      /**
       * 获取海报产品图（解决跨域问题，只适用于小程序）
       */
      downloadFilestoreImage: function() {
        let that = this;
        uni.downloadFile({
          url: that.setDomain(that.spu.picUrl),
          success: function(res) {
            that.storeImage = res.tempFilePath;
          },
          fail: function() {
            return that.$util.Tips({
              title: ''
            });
          },
        });
      },
      /**
       * 替换安全域名
       */
      setDomain: function(url) {
        url = url ? url.toString() : '';
        // 本地调试打开,生产请注销
        if (url.indexOf("https://") > -1) {
          return url;
        }
        return url.replace('http://', 'https://');
      },
      /**
       * 分享打开
       */
      listenerActionSheet: function() {
        if (!this.isLogin) {
          toLogin();
          return
        }
        // #ifdef H5
        if (this.$wechat.isWeixin() === true) {
          this.weixinStatus = true;
        }
        // #endif
        this.posters = true;
      },
      /**
       * 微信小程序的保存图片到本机
       */
      // #ifdef MP
      savePosterPath: function() {
        let that = this;
        uni.getSetting({
          success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              uni.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  uni.saveImageToPhotosAlbum({
                    filePath: that.posterImage,
                    success: function(res) {
                      that.posterImageClose();
                      that.$util.Tips({
                        title: '保存成功',
                        icon: 'success'
                      });
                    },
                    fail: function(res) {
                      that.$util.Tips({
                        title: '保存失败'
                      });
                    }
                  })
                }
              })
            } else {
              uni.saveImageToPhotosAlbum({
                filePath: that.posterImage,
                success: function(res) {
                  that.posterImageClose();
                  that.$util.Tips({
                    title: '保存成功',
                    icon: 'success'
                  });
                },
                fail: function(res) {
                  that.$util.Tips({
                    title: '保存失败'
                  });
                },
              })
            }
          }
        })
      },
      // #endif

      // ========== 顶部 nav 相关的方法 ==========
      /**
       * 后退
       */
      returns: function() {
        uni.navigateBack()
      },
      /**
       * 点击指定 nav bar
       *
       * @param index 新的 navList 位置
       */
      tap: function(index) {
        this.$set(this, 'navActive', index);
        this.$set(this, 'lock', true);
        this.$set(this, 'scrollTop', index > 0 ? this.topArr[index] - (app.globalData.navHeight / 2)
          : this.topArr[index]);
      },
      /**
       * 滚动
       *
       * @param e 滚动事件
       */
      scroll: function(e) {
        const scrollY = e.detail.scrollTop;
        let opacity = scrollY / 200;
        opacity = opacity > 1 ? 1 : opacity;
        this.$set(this, 'opacity', opacity);
        this.$set(this, 'scrollY', scrollY);
        if (this.lock) {
          this.$set(this, 'lock', false)
          return;
        }
        // 设置选中的 nav
        for (let i = 0; i < this.topArr.length; i++) {
          if (scrollY < this.topArr[i] - (app.globalData.navHeight / 2) + this.heightArr[i]) {
            this.$set(this, 'navActive', i)
            break
          }
        }
      },
      /**
       * 处理器滚动条
       */
      infoScroll: function() {
        const topArr = [];
        const heightArr = [];
        for (let i = 0; i < this.navList.length; i++) {
          // 获取元素所在位置
          const query = wx.createSelectorQuery().in(this);
          const idView = "#past" + i;
          query.select(idView).boundingClientRect();
          query.exec(res => {
            const top = res[0].top;
            const height = res[0].height;
            topArr.push(top);
            heightArr.push(height);
            this.$set(this, 'topArr', topArr);
            this.$set(this, 'heightArr', heightArr);
          });
        }
      },

      fen2yuan(price) {
        return Util.fen2yuan(price)
      }
		},
	}
</script>

<style scoped lang="scss">
	.userEvaluation{
		i{
			display: inline-block;
		}
	}
	.product-con{
		.line1{
			width: 600rpx;
		}
	}
	.share-box {
		z-index: 1000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}
	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top: 1rpx solid #eee;
	}

	.generate-posters.on {
		transform: translate3d(0, 0, 0);
	}

	.generate-posters .item {
		flex: 50%;
		text-align: center;
		font-size: 30rpx;
	}

	.generate-posters .item .iconfont {
		font-size: 80rpx;
		color: #5eae72;
	}

	.generate-posters .item .iconfont.icon-haibao {
		color: #5391f1;
	}

	.navbar .header {
		height: 96rpx;
		font-size: 30rpx;
		color: #050505;
		background-color: #fff;
		/* #ifdef MP */
		padding-right: 95rpx;
		/* #endif */
	}

	.icon-xiangzuo {
		/* #ifdef H5 */
		top: 30rpx !important;
		/* #endif */
	}

	.navbar .header .item {
		position: relative;
		margin: 0 25rpx;
	}

	.navbar .header .item.on:before {
		position: absolute;
		width: 60rpx;
		height: 5rpx;
		background-repeat: no-repeat;
		content: "";
		background-image: linear-gradient(to right, #ff3366 0%, #ff6533 100%);
		bottom: -10rpx;
		left: 50%;
		margin-left: -28rpx;
	}

	.navbar {
		position: fixed;
		background-color: #fff;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
	}

	.navbar .navbarH {
		position: relative;
	}

	.navbar .navbarH .navbarCon {
		position: absolute;
		bottom: 0;
		height: 100rpx;
		width: 100%;
	}

	.icon-xiangzuo {
		color: #000;
		position: fixed;
		font-size: 40rpx;
		width: 100rpx;
		height: 56rpx;
		line-height: 54rpx;
		z-index: 1000;
		left: 33rpx;
	}

	.product-con .nav {
		background-image: url('data:image/png;base64,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');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 110rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #E93323;
	}

	.product-con .nav .money {
		font-size: 28rpx;
		color: #fff;
	}

	.product-con .nav .money .num {
		font-size: 48rpx;
	}

	.product-con .nav .money .y-money {
		font-size: 26rpx;
		margin-left: 10rpx;
		text-decoration: line-through;
	}

	.product-con .nav .time {
		font-size: 20rpx;
		color: #fff;
		text-align: center;
	}

	.product-con .nav .time .timeCon {
		margin-top: 10rpx;
	}

	.product-con .nav .time .timeCon .num {
		padding: 0 7rpx;
		font-size: 22rpx;
		color: #ff3d3d;
		background-color: #fff;
		border-radius: 2rpx;
	}

	.product-con .nav .timeState {
		font-size: 28RPX;
		color: #FFF;
	}

	.product-con .nav .iconfont {
		color: #fff;
		font-size: 30rpx;
		margin-left: 20rpx;
	}

	.product-con .wrapper .introduce {
		margin: 0;
	}

	.product-con .wrapper .introduce .infor {
		width: 570rpx;
	}

	.product-con .wrapper .introduce .iconfont {
		font-size: 36rpx;
		color: #999999;
	}

	.product-con .wrapper .label {
		margin: 18rpx 0 0 0;
		font-size: 24rpx;
		color: #82848f;
	}

	.product-con .wrapper .label .stock {
		width: 255rpx;
		margin-right: 28rpx;
	}

	.product-con .footer {
		padding: 0 20rpx 0 30rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		height: 100rpx;
		background-color: #fff;
		z-index: 99;
		border-top: 1rpx solid #f0f0f0;
		text-align: center;
	}

	.product-con .footer .item {
		font-size: 18rpx;
		color: #666;
	}

	.product-con .footer .item .iconfont {
		text-align: center;
		font-size: 40rpx;
	}

	.product-con .footer .item .iconfont.icon-shoucang1 {
		color: #f00;
	}

	.product-con .footer .item .iconfont.icon-gouwuche1 {
		font-size: 40rpx;
		position: relative;
	}

	.product-con .footer .item .iconfont.icon-gouwuche1 .num {
		color: #fff;
		position: absolute;
		font-size: 18rpx;
		padding: 2rpx 8rpx 3rpx;
		border-radius: 200rpx;
		top: -10rpx;
		right: -10rpx;
	}

	.product-con .footer .bnt {
		width: 540rpx;
		height: 76rpx;
	}

	.product-con .footer .bnt .bnts {
		width: 270rpx;
		text-align: center;
		line-height: 76rpx;
		color: #fff;
		font-size: 28rpx;
	}

	.product-con .footer .bnt .joinCart {
		border-radius: 50rpx 0 0 50rpx;
		background-image: linear-gradient(to right, #fea10f 0%, #fa8013 100%);
	}

	.product-con .footer .bnt .buy {
		border-radius: 0 50rpx 50rpx 0;
		background-image: linear-gradient(to right, #fa6514 0%, #e93323 100%);
	}

	.setCollectBox {
		font-size: 18rpx;
		color: #666;
	}

	.bg-color-hui {
		background: #bbbbbb !important;
	}
	.canvas {
		position:fixed;
		z-index: -5;
		opacity: 0;
	}

	.poster-pop {
		width: 450rpx;
		height: 714rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99;
		top: 50%;
		margin-top: -357rpx;
	}

	.poster-pop image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.poster-pop .close {
		width: 46rpx;
		height: 75rpx;
		position: fixed;
		right: 0;
		top: -73rpx;
		display: block;
	}

	.poster-pop .save-poster {
		background-color: #df2d0a;
		font-size: ：22rpx;
		color: #fff;
		text-align: center;
		height: 76rpx;
		line-height: 76rpx;
		width: 100%;
	}

	.poster-pop .keep {
		color: #fff;
		text-align: center;
		font-size: 25rpx;
		margin-top: 10rpx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9;
	}
	.home-nav {
		/* #ifdef H5 */
		top: 20rpx !important;
		/* #endif */
	}

	.home-nav {
		color: #fff;
		position: fixed;
		font-size: 33rpx;
		width: 56rpx;
		height: 56rpx;
		z-index: 999;
		left: 33rpx;
		background: rgba(190, 190, 190, 0.5);
		border-radius: 50%;
		&.on{
			background: unset;
			color: #333;
		}
	}

	.home-nav .line {
		width: 1rpx;
		height: 24rpx;
		background: rgba(255, 255, 255, 0.25);
	}

	.home-nav .icon-xiangzuo {
		width: auto;
		font-size: 28rpx;
	}
</style>
