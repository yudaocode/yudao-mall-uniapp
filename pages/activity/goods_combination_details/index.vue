<template>
	<view>
    <!-- 顶部的 nav tab -->
		<view class='navbar' :style="{height:navH+'rpx',opacity:opacity}">
			<view class='navbarH' :style='"height:"+navH+"rpx;"'>
				<view class='navbarCon acea-row row-center-wrapper'>
					<view class="header acea-row row-center-wrapper">
						<view class="item" :class="navActive === index ? 'on' : ''" v-for="(item,index) in navList"
							:key='index' @tap="tap(item,index)">
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
			<scroll-view :scroll-top="scrollTop" scroll-y='true' scroll-with-animation="true"
				:style="'height:'+height+'px;'" @scroll="scroll">
				<view id="past0">
          <productConSwiper :imgUrls='spu.sliderPicUrls' />
          <!-- 价格、库存、销量 -->
          <view class="pad30">
						<view class='wrapper mb30'>
							<view class='share acea-row row-between row-bottom'>
								<view class='money font-color'>￥
                  <text class='num'>{{ fen2yuan(spu.price) }}</text>
                  <text class='y-money'>￥{{ fen2yuan(spu.marketPrice) }}</text>
								</view>
								<view class='iconfont icon-fenxiang' @click="listenerActionSheet"></view>
							</view>
							<view class='introduce line2'>{{ spu.name }}</view>
							<view class='label acea-row row-between-wrapper'>
								<view class='stock'>类型：{{ activity.userSize || 0}}人团</view>
                <view class='stock'>累计销售：{{ spu.salesCount}} {{ spu.unitName }}</view>
								<view />
							</view>
						</view>
            <!-- SKU 选择 -->
            <view class='attribute acea-row row-between-wrapper mb30 borRadius14' @tap='openAttr'>
              <view class="line1">{{ attrValue.length > 0 ? "已选择" : "请选择" }}：
                <text class='atterTxt'>{{attrValue}}</text>
              </view>
              <view class='iconfont icon-jiantou'></view>
						</view>
            <!-- 拼成列表 -->
						<view class='notice acea-row row-middle mb30 borRadius14' v-if="activity.successCount > 0">
							<view class='num font-color'>
								<text class='iconfont icon-laba'></text>
								已拼{{ activity.successCount }} {{ spu.unitName }}
                <text class='line'>|</text>
							</view>
							<view class='swiper'>
								<swiper :indicator-dots="false" :autoplay="autoplay" interval="2500"
									duration="500" vertical="true" circular="true">
									<block v-for="(item, index) in successRecords" :key='index'>
										<swiper-item>
											<view class='line1'>{{ item.nickname }}拼团成功</view>
										</swiper-item>
									</block>
								</swiper>
							</view>
						</view>
            <!-- 待拼列表 -->
            <view v-if='attr.productSelect.stock > 0' class='assemble mb30 borRadius14'>
							<view class='item acea-row row-between-wrapper' v-for='(item,index) in runningRecords'
                    :key='index' v-if="index < AllIndex">
								<view class='pictxt acea-row row-between-wrapper'>
									<view class='pictrue'>
										<image :src='item.avatar'></image>
									</view>
									<view class='text line1'>{{ item.nickname }}</view>
								</view>
								<view class='right acea-row row-middle'>
									<view>
										<view class='lack'>
                      还差<text class='font-color'>{{ item.userSize - item.userCount }}</text>人成团
                    </view>
										<view class='time acea-row'>
											<count-down :is-day="false" :tip-text="'剩余 '" :day-text="' '" :hour-text="':'" :minute-text="':'"
                                  :second-text="' '" :datatime="item.expireTime / 1000" :bgColor="bgColor" />
										</view>
									</view>
									<navigator hover-class='none' :url="'/pages/activity/goods_combination_status/index?id='+item.id"
                             class='spellBnt'>
                    去拼单 <text class='iconfont icon-jiantou'></text>
									</navigator>
								</view>
							</view>
							<template v-if="runningRecords.length">
								<view class='more' @tap='showAll' v-if="runningRecords.length > AllIndex">
                  查看更多 <text class='iconfont icon-xiangxia' />
                </view>
								<view class='more' @tap='hideAll'
									v-else-if="runningRecords.length === AllIndex && runningRecords.length !== AllIndexDefault">
                  收起 <text class='iconfont icon-xiangshang' />
                </view>
							</template>
						</view>
						<view class='playWay mb30 borRadius14'>
							<view class='title acea-row row-between row-middle'>
								<view>拼团玩法</view>
							</view>
							<view class='way acea-row row-middle'>
								<view class='item acea-row row-middle'>
									<text class='num'>①</text>
									开团/参团
								</view>
								<view class='iconfont icon-arrow'></view>
								<view class='item'>
									<text class='num'>②</text>
									邀请好友
								</view>
								<view class='iconfont icon-arrow'></view>
								<view class='item'>
									<view>
										<text class='num'>③</text>
										满员发货
									</view>
								</view>
							</view>
						</view>
            <!-- 评论 -->
            <view class='userEvaluation borRadius14' id="past1">
							<view class='title acea-row row-between-wrapper' :style="replyCount===0?'border-bottom-left-radius:14rpx;border-bottom-right-radius:14rpx;':''">
								<view>用户评价<i>({{replyCount}})</i></view>
								<navigator class='praise' hover-class='none'
									:url='"/pages/users/goods_comment_list/index?productId="+spu.productId'>
									<i>好评</i><text class='font-color'>{{ replyChance || 0}}%</text>
									<text class='iconfont icon-jiantou'></text>
								</navigator>
							</view>
							<userEvaluation :reply="reply" v-if="reply.length>0"></userEvaluation>
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
    <!-- 左侧的分销提示 -->
		<shareRedPackets
      :sharePacket="sharePacket"
      @listenerActionSheet="listenerActionSheet"
			@closeChange="closeChange"
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
			<button class="item" hover-class='none' @tap="goPoster">
				<view class="iconfont icon-haibao"></view>
				<view class="">生成海报</view>
			</button>
		</view>
		<view class="mask" v-if="posters" @click="closePosters"></view>
		<view class="mask" v-if="canvasStatus" @click="listenerActionClose"></view>

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
		<view class="canvas" v-else>
			<canvas style="width:750px;height:1190px;" canvas-id="firstCanvas"></canvas>
			<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
		</view>
		<!-- 发送给朋友图片 -->
		<view class="share-box" v-if="H5ShareBox">
			<image src="/static/images/share-info.png" @click="H5ShareBox = false"></image>
		</view>
		<home></home>
	</view>
</template>

<script>
  const app = getApp();
	import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
	import { mapGetters } from "vuex";
	// #ifdef MP
	import { base64src } from '@/utils/base64src.js'
	import { getQrcode } from '@/api/api.js';
	// #endif
	import productConSwiper from '@/components/productConSwiper'
	import { toLogin } from '@/libs/login.js';
	import { imageBase64 } from "@/api/public";
	import parser from "@/components/jyf-parser/jyf-parser";
	import home from '@/components/home/index.vue'
	import productWindow from '@/components/productWindow/index.vue'
	import userEvaluation from '@/components/userEvaluation/index.vue'
	import countDown from '@/components/countDown/index.vue'
	import shareRedPackets from '@/components/shareRedPackets';
  import * as ProductSpuApi from '@/api/product/spu.js';
  import * as ProductFavoriteApi from '@/api/product/favorite.js';
  import * as ProductCommentApi from '@/api/product/comment.js';
  import * as CombinationApi from '@/api/promotion/combination.js';
  import * as BrokerageAPI from '@/api/trade/brokerage.js'
  import * as Util from '@/utils/util.js';
  import * as ProductUtil from '@/utils/product.js';
	export default {
		components: {
			shareRedPackets,
			productConSwiper,
			"jyf-parser": parser,
			home,
			"product-window": productWindow,
			userEvaluation,
			countDown
		},
		computed: mapGetters({
			'isLogin': 'isLogin',
			'uid': 'uid',
			'chatUrl': 'chatUrl'
		}),
		data() {
			return {
        // ========== 拼团活动相关变量 ==========
        id: 0, // 拼团活动的编号
        activity: {}, // 拼团活动的信息
        status: 1, // 0 - 已禁用；1 - 未开始；2 - 进行中；3 - 已结束
        bgColor:{
          'bgColor': '',
          'Color': '#999999',
          'isDay': true
        },
        successRecords: [], // 成功的拼团记录
        runningRecords: [], // 进行中的拼团记录
        AllIndex: 2, // runningRecords 展示的数量，用于收起
        AllIndexDefault: 0, // AllIndex 的默认值，用于收起
        circular: true, // 进行中的拼团记录的轮播相关的 4 个变量
        autoplay: true,
        interval: 3000,
        duration: 500,

        // ========== 商品相关变量 ==========
        spu: {}, // 商品 SPU 详情
        skuMap: [], // 商品 SKU Map
        attrValue: '', // 已选属性名的拼接，例如说 红色,大 这样的格式
        attr: { // productWindow 组件，使用该属性
          cartAttr: false,
          // ↓↓↓ 属性数组，结构为：id = 属性编号；name = 属性编号的名字；values[].id = 属性值的编号，values[].name = 属性值的名字；index = 选中的属性值的名字
          productAttr: [],
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
        posterbackgd: '/static/images/posterbackgd.png', // 海报的背景，用于海报的生成
        storeImage: '', // 下载商品图片后的文件地址
        actionSheetHidden: true, // 微信小程序的右上角分享的弹出
        posterImage: '', // 海报路径
        sharePacket: { // 分销弹出信息
          enabled: false, // 默认不显示
        },

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
				storeInfo: {},
			}
		},
		watch: {
			isLogin: {
				handler: function(newV, oldV) {
					if (newV) {
						this.combinationDetail();
					}
				},
				deep: true
			},
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
			// #ifdef MP
			this.navH = app.globalData.navHeight;
			// #endif
			// #ifndef MP
			this.navH = 96;
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
        }, 2000)
      } else {
        this.id = options.id;
      }

      // 获取拼团信息
      this.combinationDetail();
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
    },
		methods: {
      // ========== 拼团活动相关 ==========
      combinationDetail() {
        CombinationApi.getCombinationActivity(this.id).then(res => {
          this.activity = res.data;
          uni.setNavigationBarTitle({
            title: this.activity.name.substring(0, 16)
          })
          // 计算总的 quota 数量
          this.activity.quota = this.activity.products.reduce((accumulator, product) => {
            return accumulator + product.quota;
          }, 0);
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
          // 参团记录
          CombinationApi.getHeadCombinationRecordList(this.id, 1).then(res => {
            this.runningRecords = res.data;
          })
          CombinationApi.getHeadCombinationRecordList(this.id, 2).then(res => {
            this.successRecords = res.data;
          })

          // 获得商品详情
          this.getGoodsDetails();
          // 获得商品收藏
          this.isFavoriteExists();
          this.getBrokeragePrice();
          // 获得商品评价列表
          this.getProductReplyList();
          this.getProductReplyCount();

        }).catch(function(err) {
          that.$util.Tips({
            title: err
          }, {
            tab: 3
          })
        })
      },
      /**
       * 显示所有参团记录
       */
      showAll: function() {
        this.AllIndexDefault = this.AllIndex;
        this.AllIndex = this.runningRecords.length;
      },
      /**
       * 隐藏所有参团记录
       */
      hideAll: function() {
        this.AllIndex = this.AllIndexDefault;
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
          // 将拼团活动的信息，合并到 SKU 里面，实现拼团价格的显示
          this.activity.products.forEach(product => {
            this.spu.price = Math.min(this.spu.price, product.combinationPrice); // 设置 SPU 的最低价格
          });
          skus.forEach(sku => {
            const product = this.activity.products.find(product => product.skuId === sku.id);
            if (product) {
              sku.price = product.combinationPrice;
            } else { // 找不到可能是没配置，则不能发起拼团
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
      getBrokeragePrice: function() {
        BrokerageAPI.getProductBrokeragePrice(this.activity.spuId).then(res => {
          this.sharePacket = res.data
        });
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
        this.$set(this.attr.productSelect, "limitCount", sku.limitCount);  // 拼团活动特有字段
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
       */
      iptCartNum: function(number) {
        this.$set(this.attr.productSelect, 'cart_num', number ? number : 1);
        // 判断是否超限购
        let sku = this.attr.productSelect;
        let limitCount = sku.limitCount;
        if (limitCount > 0 && number > limitCount) {
          this.$set(this.attr.productSelect, "cart_num", limitCount);
          this.$util.Tips({
            title: `该商品每次限购 ${sku.limitCount} ${this.spu.unitName}`
          });
        }
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
          this.$set(this, 'replyChance', 100.0 * res.data.goodCount / count);
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
      /**
       * 单独购买
       */
      openAlone() {
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
            + '&combinationActivityId=' + this.id
        });
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
       * 分享关闭
       */
      listenerActionClose: function() {
        this.canvasStatus = false;
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
		}
	}
</script>

<style scoped lang="scss">
	.userEvaluation{
		i{
			display: inline-block;
		}
	}
	.attribute{
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
		z-index: 1000;
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

	.product-con .wrapper {
        margin-top: 30rpx;
		border-radius: 14rpx;
	}

	.product-con .wrapper .share .money .y-money {
		color: #82848f;
		margin-left: 13rpx;
		text-decoration: line-through;
		font-weight: normal;
	}

	.product-con .notice {
		width: 100%;
		height: 62rpx;
		background-color: #ffedeb;
		padding: 0 24rpx;
		box-sizing: border-box;
	}

	.product-con .notice .num {
		font-size: 24rpx;
	}

	.product-con .notice .num .iconfont {
		font-size: 30rpx;
		vertical-align: -3rpx;
		margin-right: 20rpx;
	}

	.product-con .notice .num .line {
		color: #333333;
		margin-left: 15rpx;
	}

	.product-con .notice .swiper {
		height: 100%;
		width: 360rpx;
		line-height: 62rpx;
		overflow: hidden;
		margin-left: 14rpx;
	}

	.product-con .notice .swiper swiper {
		height: 100%;
		width: 100%;
		overflow: hidden;
		font-size: 24rpx;
		color: #333333;
	}

	.product-con .assemble {
		background-color: #fff;
	}

	.product-con .assemble .item {
		padding-right: 24rpx;
		margin-left: 24rpx;
		border-bottom: 1rpx solid #f0f0f0;
		height: 130rpx;
	}

	.product-con .assemble .item .pictxt .text {
		width: 172rpx;
		margin-left: 16rpx;
	}

	.product-con .assemble .item .pictxt .pictrue {
		width: 80rpx;
		height: 80rpx;
		background: #f0f0f0;
		border-radius: 50%;
	}

	.product-con .assemble .item .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.product-con .assemble .item .right .lack {
		font-size: 24rpx;
		color: #333333;
	}

	.product-con .assemble .item .right .time {
		position: relative;
		left: -10rpx;
		font-size: 22rpx;
		color: #82848f;
		margin-top: 5rpx;
	}

	.product-con .assemble .item .right .spellBnt {
		font-size: 24rpx;
		color: #fff;
		width: 140rpx;
		height: 50rpx;
		border-radius: 50rpx;
		background: linear-gradient(90deg, #FF5555 0%, #FF0000 100%);
		text-align: center;
		line-height: 50rpx;
		margin-left: 16rpx;
	}

	.product-con .assemble .item .right .spellBnt .iconfont {
		font-size: 25rpx;
		margin-left: 5rpx;
	}

	.product-con .assemble .more {
		font-size: 24rpx;
		color: #333333;
		text-align: center;
		height: 90rpx;
		line-height: 90rpx;
	}

	.product-con .assemble .more .iconfont {
		margin-left: 13rpx;
		font-size: 25rpx;
	}

	.product-con .playWay {
		background-color: #fff;
		padding: 0 24rpx;
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.product-con .playWay .title {
		height: 86rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
	}

	.product-con .playWay .title .iconfont {
		margin-left: 13rpx;
		font-size: 26rpx;
		color: #717171;
	}

	.product-con .playWay .way {
		height: 110rpx;
		line-height: 110rpx;
		font-size: 26rpx;
		color: #333333;
	}

	.product-con .playWay .way .iconfont {
		color: #cdcdcd;
		font-size: 26rpx;
		margin: 0 35rpx;
	}

	.product-con .playWay .way .item .num {
		font-size: 35rpx;
		vertical-align: 4rpx;
		margin-right: 6rpx;
		display: inline-block;
	}

	.product-con .playWay .way .item .tip {
		font-size: 22rpx;
		color: #a5a5a5;
		margin-top: 7rpx;
	}

	.product-con .footer {
		padding: 0 20rpx 0 30rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		height: 100rpx;
		background-color: #fff;
		z-index: 999;
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

	.canvas {
		position: fixed;
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

		&.on {
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

	.share-box {
		z-index: 1000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.share-box image {
		width: 100%;
		height: 100%;
	}
</style>
