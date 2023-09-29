<template>
	<view class="product-con">
    <!-- 顶部的 nav tab -->
		<view class='navbar' :style="{ height: navH+'rpx', opacity: opacity }">
			<view class='navbarH' :style='"height:"+navH+"rpx;"'>
				<view class='navbarCon acea-row row-center-wrapper' :style="{ paddingRight: navbarRight + 'px' }">
					<view class="header acea-row row-center-wrapper">
						<view class="item" :class="navActive === index ? 'on' : ''"
                  v-for="(item,index) in navList" :key='index' @tap="tap(index)">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</view>
    <!-- 返回键 -->
		<view id="home" class="home acea-row row-center-wrapper iconfont icon-xiangzuo" :class="opacity > 0.5?'on':''"
			:style="{ top: homeTop + 'rpx' }" v-if="returnShow" @tap="returns">
		</view>
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y='true' scroll-with-animation="true"
				:style='"height:"+height+"px;"' @scroll="scroll">
				<view id="past0">
					<productConSwiper :imgUrls="spu.sliderPicUrls" :videoline="spu.videoUrl" />
					<view class="pad30">
            <!-- 价格、库存、销量 -->
						<view class='wrapper mb30 borRadius14'>
							<view class='share acea-row row-between row-bottom'>
								<view class='money font-color'>
									￥
									<text class='num'>{{ fen2yuan(spu.price) }}</text>
									<text class='vip-money' v-if="spu.vipPrice && spu.vipPrice > 0">￥{{ fen2yuan(spu.price - spu.vipPrice) }}</text>
									<image v-if="spu.vipPrice && spu.vipPrice > 0" src="../../static/images/vip.png" />
								</view>
								<view class='iconfont icon-fenxiang' @click="listenerActionSheet"></view>
							</view>
							<view class='introduce'>{{ spu.name }}</view>
							<view class='label acea-row row-between-wrapper'>
								<view>原价:￥{{ fen2yuan(spu.marketPrice) }}</view>
								<view>库存:{{ spu.stock }} {{ spu.unitName}}</view>
								<view>
									销量:{{ spu.salesCount}} {{ spu.unitName }}
								</view>
							</view>
              <!-- 优惠劵 -->
							<view v-if="coupon.list.length > 0 && type==='normal'"
								class='coupon acea-row row-between-wrapper' @click='couponTap'>
								<view class='hide line1 acea-row'>
									优惠券：
									<view class='activity'>
										满{{ fen2yuan(coupon.list[0].usePrice) }}
                    <text v-if="coupon.list[0].discountType === 1"> 减 {{ fen2yuan(coupon.list[0].discountPrice) }} 元</text>
                    <text v-else>打 {{ (coupon.list[0].discountPercent / 10.0).toFixed(1) }} 折</text>
                  </view>
								</view>
								<view class='iconfont icon-jiantou'></view>
							</view>
              <!-- 营销活动 -->
              <view class="coupon acea-row row-between-wrapper" v-if="activityH5.length">
								<view class="line1 acea-row">
									<text class="activityName">活&nbsp;&nbsp;&nbsp;动：</text>
									<view v-for='(item, index) in activityH5' :key='index' @click="goActivity(item)"
										class="activityBox">
										<view v-if="item.type === 1" class="activity_miao">
											<text class="iconfonts iconfont icon-pintuan"></text>
											<text class="activity_title"> 参与秒杀</text>
										</view>
										<view v-if="item.type === 2" class="activity_kan">
											<text class="iconfonts iconfont icon-shenhezhong"></text>
											<text class="activity_title"> 参与砍价</text>
										</view>
                    <view v-if="item.type === 3" class="activity_pin">
                    <text class="iconfonts iconfont icon-kanjia"></text>
											<text class="activity_title"> 参与拼团</text>
										</view>
									</view>
								</view>
							</view>
						</view>
            <!-- SKU 选择 -->
						<view class='attribute acea-row row-between-wrapper mb30 borRadius14' @click="openAttr">
							<view class="line1">{{ attrValue.length > 0 ? "已选择" : "请选择" }}：
								<text class='atterTxt'>{{attrValue}}</text>
							</view>
							<view class='iconfont icon-jiantou'></view>
						</view>
            <!-- 评论 -->
						<view class='userEvaluation' id="past1">
							<view class='title acea-row row-between-wrapper'
								:style="replyCount==0?'border-bottom-left-radius:14rpx;border-bottom-right-radius:14rpx;':''">
								<view>用户评价<i>({{replyCount}})</i></view>
								<navigator class='praise' hover-class='none' :url='"/pages/users/goods_comment_list/index?productId="+id'>
									<i>好评</i>&nbsp;<text class='font-color'> {{ replyChance || 0 }}%</text>
									<text class='iconfont icon-jiantou'></text>
								</navigator>
							</view>
							<block v-if="replyCount">
								<userEvaluation :reply="reply"></userEvaluation>
							</block>
						</view>
						<!-- 优品推荐 -->
						<view class="superior borRadius14" if='good_list.length' id="past2">
							<view class="title acea-row row-center-wrapper">
								<image src="../../static/images/xzuo.png"></image>
								<view class="titleTxt">优品推荐</view>
								<image src="../../static/images/xyou.png"></image>
							</view>
							<view class="slider-banner banner">
								<swiper indicator-dots="true" :autoplay="autoplay" :circular="circular"
									:interval="interval" :duration="duration" indicator-color="#999"
									indicator-active-color="#e93323" :style="'height:'+clientHeight+'px'">
									<swiper-item v-for="(item, indexw) in good_list" :key="indexw">
										<view class="list acea-row row-middle" :id="'list'+indexw">
											<view class="item" v-for="(val, indexn) in item.list" :key="indexn" @click="goDetail(val)">
												<view class="pictrue">
													<image :src="val.picUrl"></image>
													<span class="pictrue_log pictrue_log_class"
                                v-if="val.activityList && val.activityList[0] && val.activityList[0].type === 1">秒杀</span>
													<span class="pictrue_log pictrue_log_class"
                                v-if="val.activityList && val.activityList[0] && val.activityList[0].type === 2">砍价</span>
													<span class="pictrue_log pictrue_log_class"
                                v-if="val.activityList && val.activityList[0] && val.activityList[0].type === 3">拼团</span>
												</view>
												<view class="name line1">{{val.name}}</view>
												<view class="money font-color">¥{{ fen2yuan(val.price) }}</view>
											</view>
										</view>
									</swiper-item>
									<!-- <view class="swiper-pagination" slot="pagination"></view> -->
								</swiper>
							</view>
						</view>
					</view>
				</view>
				<view class='product-intro' id="past3">
					<view class='title'>
						<image src="../../static/images/xzuo.png"></image>
						<span class="sp">产品详情</span>
						<image src="../../static/images/xyou.png"></image>
					</view>
					<view class='conter'>
						<jyf-parser :html="spu.description" ref="article" :tag-style="tagStyle"></jyf-parser>
					</view>
				</view>
				<view style='height:120rpx;'></view>
			</scroll-view>
		</view>
		<view class='footer acea-row row-between-wrapper'>
      <!-- 客服 TODO 芋艿：待完成 -->
			<!-- #ifdef MP -->
			<button open-type="contact" hover-class='none' class='item'>
				<view class='iconfont icon-kefu'></view>
				<view>客服</view>
			</button>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<view class="item" @click="kefuClick">
				<view class="iconfont icon-kefu"></view>
				<view>客服</view>
			</view>
			<!-- #endif -->
      <!-- 场景：普通订单 -->
      <block v-if="type === 'normal'">
        <!-- 收藏 -->
        <view @click="setCollect" class='item'>
					<view class='iconfont icon-shoucang1' v-if="userCollect"></view>
					<view class='iconfont icon-shoucang' v-else></view>
					<view>收藏</view>
				</view>
				<navigator open-type='switchTab' class="animated item" :class="cartAnimated ? 'bounceIn':''"
                   url='/pages/order_addcart/order_addcart' hover-class="none">
					<view class='iconfont icon-gouwuche1'>
						<text v-if="cartCount > 0" class='num bg-color'>{{ cartCount }}</text>
					</view>
					<view>购物车</view>
				</navigator>
        <!-- 无库存，不允许购买 -->
				<view class="bnt acea-row" v-if="attr.productSelect.stock <= 0">
					<form @submit="joinCart" report-submit="true">
            <button class="joinCart bnts" form-type="submit">加入购物车</button>
          </form>
					<form report-submit="true">
            <button class="buy bnts bg-color-hui" form-type="submit">已售罄</button>
					</form>
				</view>
        <!-- 有库存，允许购买 -->
        <view class="bnt acea-row" v-else>
					<form @submit="joinCart" report-submit="true">
            <button class="joinCart bnts" form-type="submit">加入购物车</button>
          </form>
					<form @submit="goBuy" report-submit="true">
            <button class="buy bnts" form-type="submit">立即购买</button>
					</form>
				</view>
			</block>
      <!-- 场景：视频订单 -->
      <block v-else-if="type === 'video'">
        <!-- 无库存，不允许购买 -->
        <view class="bnt bntVideo acea-row" v-if="attr.productSelect.stock <= 0 && type === 'video'">
          <form report-submit="true"><button class="buy bnts bg-color-hui" form-type="submit">已售罄</button></form>
        </view>
        <!-- 有库存，允许购买 -->
        <view class="bnt bntVideo acea-row" v-if="attr.productSelect.stock > 0 && type === 'video'">
          <form @submit="goBuy" report-submit="true"><button class="buy bnts" form-type="submit">立即购买</button>
          </form>
        </view>
      </block>
		</view>
    <!-- 左侧的分销提示 -->
		<shareRedPackets
      :sharePacket="sharePacket"
      @listenerActionSheet="listenerActionSheet"
      @closeChange="closeChange"
    />
		<!-- SKU 弹窗 -->
		<productWindow
      :attr="attr"
      :isShow='1'
      :iSplus='1'
      @ChangeAttr="ChangeAttr"
			@ChangeCartNum="ChangeCartNum"
      @iptCartNum="iptCartNum"
      @close="closeAttr"
    />
		<home></home>
    <!-- 优惠劵弹窗 -->
		<couponListWindow
      :coupon='coupon'
      @ChangCouponsClone="ChangCouponsClone"
      @ChangCoupons="ChangCoupons"
      @tabCouponType="tabCouponType"
    />
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
			<button class="item" hover-class='none' @click="goPoster">
				<view class="iconfont icon-haibao"></view>
				<view class="">生成海报</view>
			</button>
		</view>
    <!-- 海报展示 -->
		<view class="mask" v-if="posters" @click="closePosters"></view>
		<view class="mask" v-if="canvasStatus"></view>
		<!-- 海报展示【操作】 -->
		<view class='poster-pop' v-if="canvasStatus">
			<image src='../../static/images/poster-close.png' class='close' @click="posterImageClose"></image>
			<image :src='imagePath'></image>
			<!-- #ifndef H5  -->
			<view class='save-poster' @click="savePosterPath">保存到手机</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="keep">长按图片可以保存到手机</view>
			<!-- #endif -->
		</view>
		<view class="canvas" v-else>
			<canvas style="width:750px;height:1190px;" canvas-id="firstCanvas"></canvas>
			<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
		</view>
		<!-- 发送给朋友图片 -->
		<view class="share-box" v-if="H5ShareBox">
			<image src="/static/images/share-info.png" @click="H5ShareBox = false"></image>
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import productConSwiper from '@/components/productConSwiper';
	import couponListWindow from '@/components/couponListWindow';
	import productWindow from '@/components/productWindow';
	import userEvaluation from '@/components/userEvaluation';
	import shareRedPackets from '@/components/shareRedPackets';
	import home from '@/components/home';
	import parser from "@/components/jyf-parser/jyf-parser";
  import * as ProductSpuApi from '@/api/product/spu.js';
  import * as ProductFavoriteApi from '@/api/product/favorite.js';
  import * as ProductCommentApi from '@/api/product/comment.js';
  import * as CouponApi from '@/api/promotion/coupon.js';
  import * as PromotionActivityApi from '@/api/promotion/activity.js';
  import * as TradeCartApi from '@/api/trade/cart.js';
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
  import * as Util from '@/utils/util.js';
  import * as ProductUtil from '@/utils/product.js';
  // #ifdef MP
	import { base64src } from '@/utils/base64src.js'
	import { getQrcode } from '@/api/api.js';
	// #endif
	const app = getApp();
	export default {
		components: {
			productConSwiper,
			couponListWindow,
			productWindow,
			userEvaluation,
			shareRedPackets,
			home,
			"jyf-parser": parser
		},
		data() {
			return {
        // ========== 商品详情相关的变量 ==========
        id: 0, // 商品 id
        type: "", // 商品展示类型；normal - 普通；video - 视频
        spu: {}, // 商品 SPU 详情
        skuMap: [], // 商品 SKU Map
        attrValue: '', // 已选属性名的拼接，例如说 红色,大 这样的格式
        attr: { // productWindow 组件，使用该属性
          cartAttr: false, // 是否打开属性的选择弹出
          // ↓↓↓ 属性数组，结构为：id = 属性编号；name = 属性编号的名字；values[].id = 属性值的编号，values[].name = 属性值的名字；index = 选中的属性值的名字
          properties: [],
          productSelect: {} // 选中的 SKU
        },
        cartCount: 0, // 购物车的数量
        cartAnimated: false, // 购物车的动画开关
        tagStyle: { // 商品描述的样式
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

        // ========== 优惠劵相关的变量 ==========
        coupon: {
          coupon: false, // 弹窗是否打开
          type: 1, // 筛选的优惠劵类型
          list: [], // 优惠劵列表
        },

        // ========== 营销活动相关的变量 ==========
        activityH5: [], // 活动列表

        // ========== 商品推荐相关的变量 ==========
        good_list: [],   // 推荐的商品数组
        circular: false, // swiper 的 circular 变量
        autoplay: false, // swiper 的 autoplay 变量
        duration: 500,   // swiper 的 duration 变量
        interval: 3000,  // swiper 的 interval 变量

        // ========== 分销相关的变量 ==========
        qrcodeSize: 600, // 二维码的大小
        promotionCode: '', // 二维码图片
        imgTop: '', // 商品图片的 base64 码
        errT: '',  // 获得小程序码失败的提示文本
        posters: false, // 分享弹窗的开关
        weixinStatus: false, // 微信分享是否打开
        canvasStatus: false, // 是否显示海报
        imagePath: '', // 海报路径
        H5ShareBox: false, // 公众号分享的弹出
        posterbackgd: '/static/images/posterbackgd.png',  // 海报的背景，用于海报的生成
        storeImage: '', // 下载商品图片后的文件地址
        sharePacket: { // 分销弹出信息
          enabled: false, // 默认不显示
        },
        actionSheetHidden: true, // 微信小程序的右上角分享的弹出

        // ========== 顶部 nav + scroll 相关的变量 ==========
        returnShow: true, // 判断顶部 [返回] 是否出现
        homeTop: 20, // 头部的 top 位置
        clientHeight: "",  // 客户端 height 高度
        height: 0, // 窗口 height 高度
        scrollY: 0, // 滚动的 Y 轴
        scrollTop: 0,  // 滚动条的 top 位置
        lock: false,  // 是否锁定 scroll 下
        topArr: [], // 每个 nav 的 top 位置
        heightArr: [], // 每个 nav 的 height 高度
        navH: "", // 头部 nav 高度
        navbarRight: 0,  // 头部 nav 距离 right 距离
        opacity: 0, // 头部 nav 的透明度
        navList: [], // 头部 nav 列表
        navActive: 0, // 选中的 navList 下标
      };
		},
		computed: mapGetters(['isLogin', 'uid', 'chatUrl']),
		watch: {
			isLogin: {
        // TODO 芋艿：测试下，如果登录后，这里的效果
				handler: function(newV, oldV) {
					let that = this;
					if (newV === true) {
						that.getCouponList();
						that.getCartCount();
            that.isFavoriteExists();
          }
				},
				deep: true
			}
		},
		onLoad(options) {
      // 设置返回、nav 高度、总高度等字段
			const pages = getCurrentPages();
      this.returnShow = pages.length !== 1;
      this.navH = app.globalData.navHeight;
			uni.getSystemInfo({
				success: ( res ) => {
					this.height = res.windowHeight;
				}
			});

      // #ifdef MP || APP-PLUS
      // 小程序链接进入获取绑定关系id
      // 绑定分销关系
      setTimeout(()=>{
        if(options.spread){
          app.globalData.spread = options.spread;
          BrokerageAPI.bindBrokerageUser(options.spread).then(res => {})
        }
      },2000)
      // #endif

      // 校验参数是否正确
			if (!options.scene && !options.id) {
				this.$util.Tips({
					title: '缺少参数无法查看商品'
				}, {
					url: '/pages/index/index'
				});
				return;
			}
      let that = this
      // 解析 id 商品编号
      if (options.hasOwnProperty('id') || options.scene) {
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
        // 设置 type 商品类型
        if (options.type === undefined || options.type == null) {
          this.type = 'normal'
        } else {
          this.type = options.type
        }
				this.$store.commit("PRODUCT_TYPE", that.type);
			}

      // 请求后端，加载商品等相关信息
			this.getGoodsDetails();
			this.getCouponList();
      // 获得商品评价列表
			this.getProductReplyList();
			this.getProductReplyCount();
			this.getGoods();
		},
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
		},
		/**
		 * 微信小程序的用户点击右上角分享，会回调该方法
		 */
		// #ifdef MP
		onShareAppMessage: function() {
      this.$set(this, 'actionSheetHidden', !this.actionSheetHidden);
			return {
				title: this.spu.name || '',
				imageUrl: this.spu.picUrl || '',
				path: '/pages/goods_details/index?id=' + this.id + '&spread=' + this.uid,
			}
		},
		// #endif
		methods: {
      // ========== 商品详情相关 ==========
      /**
       * 获取产品详情
       */
      getGoodsDetails: function() {
        ProductSpuApi.getSpuDetail(this.id).then(res => {
          let spu = res.data;
          let skus = res.data.skus;
          this.$set(this, 'spu', spu);
          this.$set(this.attr, 'properties', ProductUtil.convertProductPropertyList(skus));
          this.$set(this, 'skuMap', ProductUtil.convertProductSkuMap(skus));

          // 设置营销活动
          PromotionActivityApi.getActivityListBySpuId(this.id).then(res => {
            let activityList = res.data;
            activityList = ProductUtil.sortActivityList(activityList);
            this.$set(this, 'activityH5', activityList);
          });

          // 设置标题
          uni.setNavigationBarTitle({
            title: spu.name.substring(0, 7) + "..."
          })

          // 登录情况下，获得购物车、分享等信息
          if (this.isLogin) {
            this.getCartCount();
            this.isFavoriteExists();
            this.getBrokeragePrice();
            // #ifdef H5
            this.make();
            this.ShareInfo();
            this.imgTop = this.spu.picUrl;
            // #endif
            // #ifdef MP
            this.getQrcode();
            // #endif
          }

          // 处理滚动条
          setTimeout(() => {
            this.infoScroll();
          }, 500);

          // 设置或下载分销需要的图片
          // #ifdef MP
          this.imgTop = spu.picUrl
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
      getBrokeragePrice: function() {
        BrokerageAPI.getProductBrokeragePrice(this.id).then(res => {
          this.sharePacket = res.data
        });
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
       * 打开 SKU 属性的选择
       */
      openAttr: function() {
        this.$set(this.attr, 'cartAttr', true);
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
       *
       * @param number 数量
       */
      iptCartNum: function(number) {
        this.$set(this.attr.productSelect, 'cart_num', number ? number : 1);
      },
      /**
       * 打开属性加入购物车
       */
      joinCart: function() {
        // 未登录，需要跳转
        if (!this.isLogin) {
          toLogin();
          return;
        }

        // 【重要】如果 attr 组件未打开，此时需要先打开。等到选择完后，再添加购物车
        if (!this.attr.cartAttr) {
          this.openAttr();
          return
        }

        // 库存不足
        let sku = this.attr.productSelect;
        if (sku.stock === 0) {
          return that.$util.Tips({
            title: "产品库存不足，请选择其它"
          });
        }

        // 添加购物车
        TradeCartApi.addCart({
          count: sku.cart_num,
          skuId: sku.id,
        }).then(res => {
          // 关闭 attr 组件
          this.attr.cartAttr = false;
          // 提示成功
          this.$util.Tips({
            title: "添加购物车成功",
            success: () => {
              this.getCartCount(true);
            }
          });
        }).catch(res => {
          this.$util.Tips({
            title: res
          });
        });
      },
      /**
       * 立即购买
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
        });
      },
      /**
       * 获取购物车数量
       *
       * @param isAnima 是否展示购物车动画和重置属性
       */
      getCartCount: function(isAnima) {
        const isLogin = this.isLogin;
        if (!isLogin) {
          return
        }
        TradeCartApi.getCartCount().then(res => {
          this.cartCount = res.data;
          // 加入购物车后重置属性
          if (isAnima) {
            this.cartAnimated = true;
            setTimeout(() => {
              this.cartAnimated = false;
            }, 500);
          }
        });
      },
      /**
       * 跳转到客服
       */
      kefuClick() {
        location.href = this.chatUrl;
      },

      // ========== 评价相关的方法 ==========
      /**
       * 获得商品评价列表
       */
      getProductReplyList: function() {
        ProductCommentApi.getCommentList(this.id).then(res => {
          this.reply = res.data;
        })
      },
      /**
       * 获得商品评价统计
       */
      getProductReplyCount: function() {
        ProductCommentApi.getCommentStatistics(this.id).then(res => {
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
        ProductFavoriteApi.isFavoriteExists(this.id).then(res => {
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
          ProductFavoriteApi.deleteFavorite(this.id).then(res => {
            this.$set(this, 'userCollect', false);
          })
        // 情况二：添加收藏
        } else {
          ProductFavoriteApi.createFavorite(this.id).then(res => {
            this.$set(this, 'userCollect', true);
          })
        }
      },

      // ========== 优惠劵相关方法 ==========
      /**
       * 获取优惠券
       */
      getCouponList(useType) {
        CouponApi.getCouponTemplateList(this.id, useType).then(res => {
          this.$set(this.coupon, 'list', res.data);
        })
      },
      /**
       * 打开优惠券弹窗
       */
      couponTap: function() {
        if (!this.isLogin) {
          toLogin();
          return
        }
        this.getCouponList(1);
        this.$set(this.coupon, 'coupon', true);
      },
      /**
       * 关闭优惠劵弹窗
       */
      ChangCouponsClone: function() {
        this.$set(this.coupon, 'coupon', false)
      },
      /**
       * 切换优惠劵弹窗的使用类型
       *
       * @param useType 使用类型
       */
      tabCouponType(useType) {
        this.$set(this.coupon, 'type', useType);
        this.getCouponList(useType);
      },
      /**
       * 领取完毕后，刷新下优惠劵列表
       */
      ChangCoupons: function() {
        this.getCouponList(this.coupon.type);
      },

      // ========== 营销相关方法 ==========
      /**
       * 前往商品的活动详情页
       *
       * @param activity 活动
       */
      goActivity: function(activity) {
        if (activity.type === 1) {
          uni.navigateTo({
            url: `/pages/activity/goods_seckill_details/index?id=${activity.id}`
          });
        } else if (activity.type === 2) {
          uni.navigateTo({
            url: `/pages/activity/goods_bargain_details/index?id=${this.id}&startBargainUid=${this.uid}`
          });
        } else {
          uni.navigateTo({
            url: `/pages/activity/goods_combination_details/index?id=${this.id}`
          });
        }
      },

      // ========== 商品推荐相关方法 ==========
      /**
       * 优品推荐
       */
      getGoods() {
        ProductSpuApi.getSpuList('good').then(res => {
          const good_list = res.data || [];
          if (good_list.length <= 0) {
            return;
          }
          const count = Math.ceil(good_list.length / 6);
          const goodArray = [];
          for (let i = 0; i < count; i++) {
            let list = good_list.slice(i * 6, i * 6 + 6);
            if (list.length) goodArray.push({
              list: list
            });
          }
          this.$set(this, 'good_list', goodArray);

          // 设置 nav bar
          let navList = ['商品', '评价', '详情'];
          if (goodArray.length) {
            navList.splice(2, 0, '推荐')
          }
          this.$set(this, 'navList', navList);
          this.$nextTick(() => {
            if (good_list.length) {
              this.setClientHeight();
            }
          })

          // 设置营销活动
          const spuIds = good_list.map(item => item.id);
          if (spuIds.length > 0) {
            PromotionActivityApi.getActivityListBySpuIds(spuIds).then(res => {
              ProductUtil.setActivityList(good_list, res.data);
            });
          }
        })
      },
			/**
			 * 去商品详情页
       *
       * @param spu 点击的商品
			 */
			goDetail(spu) {
        const activity = spu.activityList && spu.activityList[0] ? spu.activityList[0] : undefined;
				if (!activity) {
					uni.redirectTo({
						url: '/pages/goods_details/index?id=' + spu.id
					})
					return;
				}
        // 秒杀
        if (activity.type === 1) {
          uni.redirectTo({
            url: `/pages/activity/goods_seckill_details/index?id=${activity.id}`
          })
          return
        }
				// 砍价
				if (activity.type === 2) {
					uni.redirectTo({
						url: `/pages/activity/goods_bargain_details/index?id=${spu.id}&bargain=${this.uid}`
					})
					return
				}
				// 拼团
				if (activity.type === 3) {
					uni.redirectTo({
						url: `/pages/activity/goods_combination_details/index?id=${spu.id}`
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
          fail: res => {
            this.$util.Tips({
              title: '海报二维码生成失败！'
            });
          }
        })
      },
      /**
       * 设置微信公众号的分享标题、内容等信息
       */
      ShareInfo() {
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
       * 获得小程序的二维码
       */
      getQrcode() {
        let data = {
          pid: this.uid,
          id: this.id,
          path: 'pages/goods_details/index'
        }
        getQrcode(data).then(res => {
          base64src(res.data.code, res => {
            this.promotionCode = res;
          });
        }).catch(err => {
          this.errT = err;
        });
      },
      /**
       * 生成海报，并进行展示
       */
      goPoster: function() {
        // 提示正在生成中
        uni.showLoading({
          title: '海报生成中',
          mask: true
        });
        this.posters = false;
        // 如果没有二维码图片，则说明加载失败，进行错误提示
        if (!this.promotionCode) {
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
          url: that.imgTop, // 仅为示例，并非真实的资源
          success: (res) => {
            arrImagesUrlTop = res.tempFilePath;
            const arrImages = [that.posterbackgd, arrImagesUrlTop, that.promotionCode];
            const name = that.spu.name;
            const price = that.fen2yuan(that.spu.price);
            const marketPrice = that.fen2yuan(that.spu.marketPrice);
            setTimeout(() => {
              that.$util.PosterCanvas(arrImages, name, price, marketPrice,
                function(tempFilePath) {
                  that.imagePath = tempFilePath;
                  that.canvasStatus = true;
                  uni.hideLoading();
                });
            }, 500);
          }
        });
      },
      /**
       * 隐藏海报
       */
      posterImageClose: function() {
        this.canvasStatus = false
      },
      /**
       * 关闭分享弹窗
       */
      closePosters: function() {
        this.posters = false;
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
            that.storeImage = '';
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
                    filePath: that.imagePath,
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
                filePath: that.imagePath,
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
      /**
       * 关闭分销的弹窗
       */
      closeChange: function() {
        this.$set(this.sharePacket, 'enabled', false);
      },

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
       * 计算并设置客户端 height 高度
       */
      setClientHeight: function() {
        if (!this.good_list.length) {
          return;
        }
        let view = uni.createSelectorQuery().in(this).select("#list0");
        view.fields({
          size: true,
        }, data => {
          this.$set(this, 'clientHeight', data.height + 20)
        }).exec();
      },
      /**
       * 滚动
       *
       * @param e 滚动事件
       */
      scroll: function(e) {
        const	scrollY = e.detail.scrollTop;
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
          const query = uni.createSelectorQuery().in(this);
          const idView = "#past" + i;
          query.select(idView).boundingClientRect();
          query.exec((res) => {
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
		}
	}
</script>

<style scoped lang="scss">
	.product-con {
		height: 100%;
	}

	.activityName {
		line-height: 44rpx;
	}

	.userEvaluation {
		i {
			display: inline-block;
		}
	}

	.bntVideo {
		width: auto !important;

		.buy {
			border-radius: 50rpx !important;
		}
	}

	.attribute {
		.line1 {
			width: 600rpx;
		}
	}

	.chat-btn {
		background-color: antiquewhite !important;
	}

	.activity_pin {
		width: auto;
		height: 44rpx;
		line-height: 44rpx;
		background: linear-gradient(90deg, rgba(233, 51, 35, 1) 0%, rgba(250, 101, 20, 1) 100%);
		opacity: 1;
		border-radius: 22rpx;
		padding: 0 15rpx;
		// margin-left: 19rpx;
	}

	.activity_miao {
		width: auto;
		height: 44rpx;
		line-height: 44rpx;
		padding: 0 15rpx;
		background: linear-gradient(90deg, rgba(250, 102, 24, 1) 0%, rgba(254, 161, 15, 1) 100%);
		opacity: 1;
		border-radius: 22rpx;
		margin-left: 19rpx;
	}

	.iconfonts {
		color: #fff !important;
		font-size: 28rpx;
	}

	.activity_title {
		font-size: 24rpx;
		color: #fff;
	}

	.activity_kan {
		width: auto;
		height: 44rpx;
		line-height: 44rpx;
		padding: 0 15rpx;
		background: linear-gradient(90deg, rgba(254, 159, 15, 1) 0%, rgba(254, 178, 15, 1) 100%);
		opacity: 1;
		border-radius: 22rpx;
		margin-left: 19rpx;
	}

	.mask {
		z-index: 300 !important;
	}

	.head-bar {
		background: #fff;
	}

	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 388;
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

	.product-con .mask {
		z-index: 88;
	}

	.product-con .footer {
		padding: 0 20rpx 0 30rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		height: 100rpx;
		background-color: #fff;
		z-index: 277;
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
		width: 444rpx;
		height: 76rpx;
	}

	.product-con .footer .bnt .bnts {
		width: 222rpx;
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

	.product-con .store-info {
		margin-top: 20rpx;
		background-color: #fff;
	}

	.product-con .store-info .title {
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #282828;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #f5f5f5;
	}

	.product-con .store-info .info {
		padding: 0 30rpx;
		height: 126rpx;
	}

	.product-con .store-info .info .picTxt {
		width: 615rpx;
	}

	.product-con .store-info .info .picTxt .pictrue {
		width: 76rpx;
		height: 76rpx;
	}

	.product-con .store-info .info .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.product-con .store-info .info .picTxt .text {
		width: 522rpx;
	}

	.product-con .store-info .info .picTxt .text .name {
		font-size: 30rpx;
		color: #282828;
	}

	.product-con .store-info .info .picTxt .text .address {
		font-size: 24rpx;
		color: #666;
		margin-top: 3rpx;
	}

	.product-con .store-info .info .picTxt .text .address .iconfont {
		color: #707070;
		font-size: 18rpx;
		margin-left: 10rpx;
	}

	.product-con .store-info .info .picTxt .text .address .addressTxt {
		max-width: 480rpx;
	}

	.product-con .store-info .info .iconfont {
		font-size: 40rpx;
	}

	.product-con .superior {
		background-color: #fff;
		margin-top: 30rpx;
		padding: 0 24rpx 30rpx 24rpx;
	}

	.product-con .superior .title {
		height: 98rpx;
	}

	.product-con .superior .title image {
		width: 20rpx;
		height: 20rpx;
	}

	.product-con .superior .title .titleTxt {
		margin: 0 10rpx;
		font-size: 30rpx;
		color: #333333;
		// background-image: linear-gradient(to right, #f57a37 0%, #f21b07 100%);
		// -webkit-background-clip: text;
		// -webkit-text-fill-color: transparent;
	}

	.product-con .superior .slider-banner {
		width: 100%;
		margin: 0 auto;
		position: relative;
	}

	.product-con .superior .slider-banner swiper {
		height: 100%;
		width: 100%;
	}

	.product-con .superior .slider-banner swiper-item {
		height: 100%;
	}

	.product-con .superior .slider-banner .list {
		width: 100%;
	}

	.product-con .superior .slider-banner .list .item {
		width: 198rpx;
		margin: 0 22rpx 30rpx 0;
		font-size: 26rpx;
	}

	.product-con .superior .slider-banner .list .item:nth-of-type(3n) {
		margin-right: 0;
	}

	.product-con .superior .slider-banner .list .item .pictrue {
		position: relative;
		width: 100%;
		height: 198rpx;
	}

	.product-con .superior .slider-banner .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.product-con .superior .slider-banner .list .item .name {
		color: #282828;
		margin-top: 12rpx;
	}

	.product-con .superior .slider-banner .swiper-pagination-bullet {
		background-color: #999;
	}

	.product-con .superior .slider-banner .swiper-pagination-bullet-active {
		background-color: $theme-color;
	}

	button {
		padding: 0;
		margin: 0;
		line-height: normal;
		background-color: #fff;
	}

	button::after {
		border: 0;
	}

	action-sheet-item {
		padding: 0;
		height: 240rpx;
		align-items: center;
		display: flex;
	}

	.contact {
		font-size: 16px;
		width: 50%;
		background-color: #fff;
		padding: 8rpx 0;
		border-radius: 0;
		margin: 0;
		line-height: 2;
	}

	.contact::after {
		border: none;
	}

	.action-sheet {
		font-size: 17px;
		line-height: 1.8;
		width: 50%;
		position: absolute;
		top: 0;
		right: 0;
		padding: 25rpx 0;
	}

	.canvas {
		position: fixed;
		z-index: -5;
		opacity: 0;
	}

	.poster-pop {
		position: fixed;
		width: 450rpx;
		height: 714rpx;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
		margin-top: -432rpx;
		z-index: 399;
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

	.pro-wrapper .iconn {
		background-image: url('data:image/png;base64,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');
		width: 100rpx;
		height: 100rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
	}

	.pro-wrapper .iconn.iconn1 {
		background-image: url('data:image/png;base64,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');
	}

	.pictrue_log {
		width: 80upx;
		height: 40upx;
		border-radius: 10upx 0 12upx 0;
		line-height: 40upx;
		font-size: 24upx;
	}

	.pictrue_log_class {
		z-index: 3;
		background: -webkit-gradient(linear, left top, right top, from(rgba(246, 122, 56, 1)), to(rgba(241, 27, 9, 1)));
		background: linear-gradient(90deg, rgba(246, 122, 56, 1) 0%, rgba(241, 27, 9, 1) 100%);
		opacity: 1;
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		text-align: center;

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
		top: 20rpx !important;
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
		z-index: 99;
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
		font-size: 36rpx;
		width: 100rpx;
		height: 56rpx;
		line-height: 54rpx;
		z-index: 1000;
		left: -5rpx;
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
</style>
