<template>
	<div class="group-con">
		<div class="header acea-row row-between-wrapper">
      <!-- 拼团活动的信息 -->
			<div class="pictrue">
        <img :src="pinkT.picUrl" />
      </div>
			<div class="text">
				<div class="line1" v-text="activity.name" />
				<div class="money">
					￥
					<span class="num" v-text="fen2yuan(pinkT.combinationPrice) || 0"></span>
					<span class="team cart-color">{{ pinkT.userSize + '人拼' }}</span>
				</div>
			</div>
			<div v-if="status === 3" class="iconfont icon-pintuanshibai"></div>
			<div v-else-if="status === 2" class="iconfont icon-pintuanchenggong font-color-red"></div>
		</div>
		<div class="wrapper">
      <!-- 拼团进展：拼团中 -->
			<div class="title acea-row row-center-wrapper" v-if="status === 1">
				<div class="line"></div>
				<div class="name acea-row row-center-wrapper">
					剩余
					<CountDown :bgColor="bgColor" :is-day="false" :tip-text="' '" :day-text="' '" :hour-text="' : '"
						:minute-text="' : '" :second-text="' '" :datatime="pinkT.expireTime / 1000"></CountDown>
					<span class="end">结束</span>
				</div>
				<div class="line"></div>
			</div>
      <!-- 拼团进展：拼团成功 -->
      <div class="tips font-color-red" v-if="status === 2">恭喜您拼团成功</div>
      <!-- 拼团进展：拼团失败 -->
      <div class="tips" v-else-if="status === 3">还差{{ count }}人，拼团失败</div>

      <!-- 拼团中的记录列表 -->
			<div class="tips font-color-red" v-else-if="status === 1">拼团中，还差{{ count }}人拼团成功</div>
      <!-- 当前拼团记录列表 -->
			<div class="list acea-row row-middle"
				:class="[status === 2 || status === 3 ? 'result' : '', iShidden ? 'on' : '']">
				<div class="pinkT">
					<div class="pictrue">
            <img :src="pinkT.avatar" />
          </div>
					<div class="chief">团长</div>
				</div>
				<block v-if="pinkAll.length > 0">
					<div class="pictrue" v-for="(item, index) in pinkAll" :key="item.id">
            <img :src="item.avatar" />
          </div>
				</block>
				<div class="pictrue" v-for="index in count">
          <img class="img-none" src="/static/images/vacancy.png" />
        </div>
			</div>
			<div v-if="(status === 2 || status === 3) && count > 9"
           class="lookAll acea-row row-center-wrapper"
           @click="lookAll">
				{{ iShidden ? '收起' : '查看全部' }}
				<span class="iconfont" :class="iShidden ? 'icon-xiangshang' : 'icon-xiangxia'" />
			</div>

      <!-- 拼团操作：邀请 -->
			<!-- #ifndef MP -->
			<div v-if="userBool === 1 && status === 1">
				<div class="teamBnt bg-color-red" @click="goPoster">邀请好友参团</div>
			</div>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<button open-type="share" class="teamBnt bg-color-red" v-if="userBool === 1 && status === 1">邀请好友参团</button>
			<!-- #endif -->
      <!-- 拼团操作：过期 -->
      <div class="teamBnt bg-color-hui" v-if="status === 3">拼团已过期</div>
      <!-- 拼团操作：参团 -->
      <div class="teamBnt bg-color-red" v-else-if="userBool === 0 && count > 0 && status === 1" @click="openAttr">
        我要参团
			</div>
      <!-- 拼团操作：再次开团 -->
      <div class="teamBnt bg-color-red" v-if="status === 2 || status === 3"
           @click="goDetail(activity.id)">再次开团</div>
      <!-- 拼团操作：再次开团 -->
      <div class="cancel" @click="getCombinationRemove" v-if="status === 1 && userBool === 1">
				<span class="iconfont icon-guanbi3" /> 取消开团
			</div>
      <!-- 拼团操作：查看订单 -->
			<div class="lookOrder" v-if="status === 2" @click="goOrder">
				查看订单信息 <span class="iconfont icon-xiangyou" />
			</div>
		</div>

    <!-- 更多拼团 -->
		<div class="group-recommend">
			<div class="title acea-row row-between-wrapper">
				<div>大家都在拼</div>
				<div class="more" @click="goList">
					更多拼团 <span class="iconfont icon-jiantou"></span>
				</div>
			</div>
			<div class="list acea-row row-middle">
				<div class="item" v-for="(item, index) in storeCombinationHost" :key="index" @click="goDetail(item.id)">
					<div class="pictrue">
						<img :src="item.picUrl" />
						<div class="team" v-text="(item.userSize) + '人团'"></div>
					</div>
					<div class="name line1" v-text="item.spuName"></div>
					<div class="money font-color-red" v-text="'￥' + fen2yuan(item.combinationPrice)"></div>
				</div>
			</div>
		</div>

    <!--  SKU 选择 -->
		<product-window
      :attr="attr"
      :iSbnt="1"
      @ChangeAttr="ChangeAttr"
			@ChangeCartNum="ChangeCartNum"
      @iptCartNum="iptCartNum"
      @close="closeAttr"
      @goCat="goPay"
    />
		<view class="mask" v-if="posters || canvasStatus" @click="listenerActionClose"></view>
		<!-- 发送给朋友图片 -->
		<view class="share-box" v-if="H5ShareBox">
			<image src="/static/images/share-info.png" @click="H5ShareBox = false"></image>
		</view>
		<!-- 海报展示 -->
		<view class='poster-pop' v-if="canvasStatus">
			<image :src='imagePath'></image>
			<!-- #ifndef H5  -->
			<view class='save-poster' @click="savePosterPath">保存到手机</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="keep">长按图片保存至相册</view>
			<view class='iconfont icon-cha2 close' @tap='listenerActionClose'></view>
			<!-- #endif -->
		</view>
		<view class="canvas">
			<canvas style="width:597px;height:850px;" canvas-id="activityCanvas"></canvas>
			<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}"
				style="opacity: 0;" />
		</view>
		<home></home>
	</div>
</template>
<script>
	import CountDown from '@/components/countDown';
	import ProductWindow from '@/components/productWindow';
	import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js';
	import { imageBase64 } from "@/api/public";
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from 'vuex';
	import { postCombinationRemove } from '@/api/activity';
  import * as ProductSpuApi from '@/api/product/spu.js';
  import * as CombinationApi from '@/api/promotion/combination.js';
  import * as Util from '@/utils/util.js';
  import * as ProductUtil from '@/utils/product.js';
	import home from '@/components/home';
	const NAME = 'GroupRule';
	const app = getApp();
	export default {
		name: NAME,
		components: {
			CountDown,
			ProductWindow,
			home
		},
		props: {},
		data: function() {
			return {
        // ========== 拼团活动相关变量 ==========
        storeCombination: {}, //拼团产品
        activity: {}, // 拼团活动的信息
        bgColor: {
          'bgColor': '#333333',
          'Color': '#fff',
          'width': '44rpx',
          'timeTxtwidth': '16rpx',
          'isDay': true
        },

        // ========== 拼团记录相关变量 ==========
        pinkId: 0, // 拼团记录编号
        pinkT: {}, // 团长信息
        pinkAll: [], // 团员列表
        count: 0, // 拼团剩余人数
        userBool: 0, // 判断当前用户是否在团内 | 0=未在,1=在
        status: 1, // 拼团记录的状态 | 1=进行中,2=已完成,3=未完成
        iShidden: false, // 拼团记录是否隐藏（查看全部、收齐）
        currentPinkOrder: '', // 当前用户的拼团订单
        timestamp: (new Date()).getTime(), // 当前时间戳

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

        // ========== 用户相关变量 ==========
        userInfo: {},

        // ========== 拼团推荐相关变量 ==========
				storeCombinationHost: [], // 拼团推荐

        // ========== 分销相关的变量 ==========
        qrcodeSize: 600, // 二维码的大小
        promotionCode: '', // 二维码图片
        imgTop: '', // 商品图片的 base64 码
        posters: false, // 分享弹窗的开关
        canvasStatus: false, // 是否显示海报
        H5ShareBox: false, // 公众号分享的弹出
        posterbackgd: '/static/images/canbj.png',  // 海报的背景，用于海报的生成
      };
		},
		watch: {
			userData: {
				handler: function(newV, oldV) {
					if (newV) {
						this.userInfo = newV;
						app.globalData.openPages = '/pages/activity/goods_combination_status/index?id='
              + this.pinkId +
							"&spread=" + this.uid;
					}
				},
				deep: true
			}
		},
		computed: mapGetters({
			'isLogin': 'isLogin',
			'userData': 'userInfo',
			'uid': 'uid'
		}),
		onLoad(options) {
      // 未登录，需要先去登录
			this.pinkId = options.id;
			if (!this.isLogin) {
				toLogin();
			}

      // TODO 芋艿：这里调用下加载 userinfo 信息，目前先写死；
      this.userInfo = {
        nickname: '芋艿'
      }

      // 加载拼团信息
      this.getCombinationPink();
		},
		//#ifdef MP
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			return {
				title: '您的好友' + this.userInfo.nickname + '邀请您参团' + this.activity.name,
				path: app.globalData.openPages,
				imageUrl: this.pinkT.picUrl
			};
		},
		//#endif
		methods: {
      /**
       * 获得拼团记录
       */
      getCombinationPink: function() {
        CombinationApi.getCombinationRecordDetail(this.pinkId).then(res => {
          // 记录
          this.$set(this, 'pinkT', res.data.headRecord);
          this.$set(this, 'pinkAll', res.data.memberRecords);
          // 状态相关的字段
          this.$set(this, 'count', res.data.headRecord.userSize - res.data.headRecord.userCount);
          this.$set(this, 'userBool', res.data.orderId > 0 ? 1 : 0);
          this.$set(this, 'status', res.data.headRecord.status);
          this.$set(this, 'currentPinkOrder', res.data.orderId);

          // 加载拼团活动
          CombinationApi.getCombinationActivity(res.data.headRecord.activityId).then(res => {
            this.activity = res.data;

            // 获得商品详情
            this.getGoodsDetails();
          })

          // 加载更多拼团记录
          this.combinationMore();
        }).catch(err => {
          this.$util.Tips({
            title: err
          }, {
            url: '/pages/index/index'
          });
        });
      },
      /**
       * 前往订单
       */
      goOrder: function() {
        uni.navigateTo({
          url: '/pages/order_details/index?order_id=' + this.currentPinkOrder
        });
      },
      /**
       * 查看更多 / 收齐
       */
      lookAll: function() {
        this.iShidden = !this.iShidden;
      },
      // 拼团取消 TODO 芋艿
      getCombinationRemove: function() {
        var that = this;
        postCombinationRemove({
          id: that.pinkId
        }).then(res => {
          that.$util.Tips({
            title: res.msg
          }, {
            tab: 3
          });
        }).catch(res => {
          that.$util.Tips({
            title: res
          });
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

          //#ifdef H5
          this.getImageBase64(spu.picUrl);
          this.make();
          this.setOpenShare();
          //#endif

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
        this.$set(this.attr.productSelect, "limitCount", sku.limitCount); // 拼团活动特有字段
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
       * 下订单
       */
      goPay() {
        let sku = this.attr.productSelect;
        uni.navigateTo({
          url: '/pages/users/order_confirm/index?skuId=' + sku.id + '&count=' + sku.cart_num
            + '&combinationActivityId=' + this.activity.id
            + '&combinationHeadId=' + this.pinkId
        });
      },
      /**
       * 拼团详情
       */
      goDetail: function(id) {
        uni.navigateTo({
          url: '/pages/activity/goods_combination_details/index?id=' + id
        });
      },

      // ========== 拼团推荐 ==========
      /**
       * 前往拼团列表
       */
      goList: function() {
        uni.navigateTo({
          url: '/pages/activity/goods_combination/index'
        });
      },
      /**
       * 更多拼团
       */
      combinationMore: function() {
        CombinationApi.getHeadCombinationRecordList(undefined, 1, 9).then(res => {
          this.storeCombinationHost = res.data;
        }).catch(res => {
          this.$util.Tips({
            title: res
          });
        })
      },

      // ========== 分销相关的方法 ==========
      /**
       * 生成二维码，设置到 promotionCode 变量
       */
      make() {
        let href = location.protocol + '//' + location.host +
          '/pages/activity/goods_combination_status/index?id=' + this.pinkId + "&spread=" + this.uid;
        uQRCode.make({
          canvasId: 'qrcode',
          text: href,
          size: this.qrcodeSize,
          margin: 10,
          success: res => {
            this.promotionCode = res;
          },
          fail: res => {
            this.$util.Tips({
              title: '海报二维码生成失败！'
            });
          }
        })
      },
      //#ifdef H5
      /**
       * 设置微信公众号的分享标题、内容等信息
       */
      setOpenShare() {
        // 只处理微信环境
        if (!this.$wechat.isWeixin()) {
          return
        }
        let configTimeline = {
          title: '您的好友' + this.userInfo.nickname + '邀请您参团' + this.spu.name,
          desc: this.spu.name,
          link: window.location.protocol + '//' + window.location.host +
            '/pages/activity/goods_combination_status/index?id=' + this.pinkId + "&spread=" + this.uid,
          imgUrl: this.spu.picUrl
        };
        this.$wechat.wechatEvevt([
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareAppMessage',
          'onMenuShareTimeline'], configTimeline)
          .then(res => {
            console.log(res);
          }).catch(res => {
            if (res.is_ready) {
              res.wx.updateAppMessageShareData(configTimeline);
              res.wx.updateTimelineShareData(configTimeline);
              res.wx.onMenuShareAppMessage(configTimeline);
              res.wx.onMenuShareTimeline(configTimeline);
            }
          });
      },
      //#endif
      /**
       * 获得商品的封面 base64
       */
      getImageBase64: function(images) {
        imageBase64({
          url: images
        }).then(res => {
          this.imgTop = res.data.code;
        })
      },
      /**
       * 生成海报
       */
      goPoster: function() {
        //#ifdef H5
        if (this.$wechat.isWeixin()) {
          this.H5ShareBox = true;
          return
        }
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
        let arrImagesUrlTop = '';
        uni.downloadFile({
          url: this.imgTop,
          success: (res) => {
            arrImagesUrlTop = res.tempFilePath;
            let arrImages = [this.posterbackgd, arrImagesUrlTop, this.promotionCode];
            const price = this.fen2yuan(this.pinkT.combinationPrice);
            setTimeout(() => {
              this.$util.activityCanvas(arrImages, this.spu.name,
                price, this.pinkT.userSize +
                '人团', '还差' + this.count + '人拼团成功', 9,
                (tempFilePath) => {
                  this.imagePath = tempFilePath;
                  this.canvasStatus = true;
                  uni.hideLoading();
                });
            }, 500);
          }
        });
        //#endif
      },
      /**
       * 分享关闭
       */
      listenerActionClose: function() {
        this.posters = false;
        this.canvasStatus = false;
      },

      fen2yuan(price) {
        return Util.fen2yuan(price)
      }
		}
	};
</script>
<style lang="scss" scoped>
	.pinkT {
		position: relative;

		.chief {
			position: absolute;
			width: 72rpx;
			height: 30rpx;
			background-color: #E93323;
			border-radius: 15rpx;
			font-size: 20rpx;
			line-height: 30rpx;
			text-align: center;
			right: -24rpx;
			top: -16rpx;
			color: #fff;
		}
	}

	.canvas {
		position: fixed;
		opacity: 0;
	}
	.poster-pop {
		width: 594rpx;
		height: 850rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		top: 50%;
		margin-top: -466rpx;

		image {
			width: 100%;
			height: 100%;
			display: block;
			border-radius: 10rpx;
		}

		.close {
			text-align: center;
			margin-top: 55rpx;
			color: #fff;
			font-size: 52rpx;
		}

		.save-poster {
			background-color: #df2d0a;
			font-size: ：22rpx;
			color: #fff;
			text-align: center;
			height: 76rpx;
			line-height: 76rpx;
			width: 100%;
		}

		.keep {
			color: #fff;
			text-align: center;
			font-size: 25rpx;
			margin-top: 25rpx;
		}
	}

	/*开团*/
	.group-con .header {
		width: 100%;
		height: 186rpx;
		background-color: #fff;
		border-top: 1px solid #f5f5f5;
		padding: 0 30rpx;
		position: relative;
	}

	.group-con .header .iconfont {
		font-size: 100rpx;
		position: absolute;
		color: #ccc;
		right: 33rpx;
		bottom: 20rpx;
	}

	.group-con .header .pictrue {
		width: 140rpx;
		height: 140rpx;
	}

	.group-con .header .pictrue img {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.group-con .header .text {
		width: 540rpx;
		font-size: 30rpx;
		color: #222;
	}

	.group-con .header .text .money {
		font-size: 24rpx;
		font-weight: bold;
		margin-top: 15rpx;
	}

	.group-con .header .text .money .num {
		font-size: 32rpx;
	}

	.group-con .header .text .money .team {
		padding: 1rpx 10rpx;
		font-weight: normal;
		border-radius: 50rpx;
		font-size: 20rpx;
		vertical-align: 4rpx;
		margin-left: 15rpx;
	}

	.group-con .wrapper {
		background-color: #fff;
		margin-top: 20rpx;
		padding: 2rpx 0 35rpx 0;
	}

	.group-con .wrapper .title {
		margin-top: 30rpx;
	}

	.group-con .wrapper .title .line {
		width: 136rpx;
		height: 1px;
		background-color: #ddd;
	}

	.group-con .wrapper .title .name {
		margin: 0 45rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.group-con .wrapper .title .name .time {
		margin: 0 14rpx;
	}

	.group-con .wrapper .title .name .timeTxt {
		color: #fc4141;
	}

	.group-con .wrapper .title .name .time .styleAll {
		background-color: #ffcfcb;
		text-align: center;
		border-radius: 3rpx;
		font-size: 28rpx;
		font-weight: bold;
		display: inline-block;
		vertical-align: middle;
		color: #fc4141;
		padding: 2rpx 5rpx;
	}

	.group-con .wrapper .tips {
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 30rpx;
		color: #999;
	}

	.group-con .wrapper .list {
		padding: 0 30rpx;
		margin-top: 45rpx;
	}

	.group-con .wrapper .list.result {
		max-height: 240rpx;
	}

	.group-con .wrapper .list.result.on {
		max-height: 2000rpx;
	}

	.group-con .wrapper .list .pictrue {
		width: 94rpx;
		height: 94rpx;
		margin: 0 0 29rpx 35rpx;
	}

	.group-con .wrapper .list .pictrue img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2rpx solid #e93323;
	}

	.group-con .wrapper .list .pictrue img.img-none {
		border: none;
	}

	.group-con .wrapper .lookAll {
		font-size: 24rpx;
		color: #282828;
		padding-top: 10rpx;
	}

	.group-con .wrapper .lookAll .iconfont {
		font-size: 25rpx;
		margin: 2rpx 0 0 10rpx;
	}

	.group-con .wrapper .teamBnt {
		font-size: 30rpx;
		width: 620rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		color: #fff;
		margin: 21rpx auto 0 auto;
	}

	.group-con .wrapper .cancel,
	.group-con .wrapper .lookOrder {
		text-align: center;
		font-size: 24rpx;
		color: #282828;
		padding-top: 30rpx;
	}

	.group-con .wrapper .cancel .iconfont {
		font-size: 35rpx;
		color: #2c2c2c;
		vertical-align: -4rpx;
		margin-right: 9rpx;
	}

	.group-con .wrapper .lookOrder .iconfont {
		font-size: 25rpx;
		color: #2c2c2c;
		margin-left: 10rpx;
	}

	.group-con .group-recommend {
		background-color: #fff;
		margin-top: 25rpx;
	}

	.group-con .group-recommend .title {
		padding-right: 30rpx;
		margin-left: 30rpx;
		height: 85rpx;
		border-bottom: 1px solid #eee;
		font-size: 28rpx;
		color: #282828;
	}

	.group-con .group-recommend .title .more {
		color: #808080;
	}

	.group-con .group-recommend .title .more .iconfont {
		margin-left: 13rpx;
		font-size: 28rpx;
	}

	.group-con .group-recommend .list {
		margin-top: 30rpx;
	}

	.group-con .group-recommend .list .item {
		width: 210rpx;
		margin: 0 0 25rpx 30rpx;
	}

	.group-con .group-recommend .list .item .pictrue {
		width: 100%;
		height: 210rpx;
		position: relative;
	}

	.group-con .group-recommend .list .item .pictrue img {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.group-con .group-recommend .list .item .pictrue .team {
		position: absolute;
		top: 28rpx;
		left: -5rpx;
		min-width: 100rpx;
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;
		border-radius: 0 18rpx 18rpx 0;
		font-size: 20rpx;
		color: #fff;
		background-image: linear-gradient(to right, #fb5445 0%, #e93323 100%);
		background-image: -webkit-linear-gradient(to right, #fb5445 0%, #e93323 100%);
		background-image: -moz-linear-gradient(to right, #fb5445 0%, #e93323 100%);
	}

	.group-con .group-recommend .list .item .name {
		font-size: 28rpx;
		color: #333;
		margin-top: 0.18rem;
	}

	.group-con .group-recommend .list .item .money {
		font-weight: bold;
		font-size: 28rpx;
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
