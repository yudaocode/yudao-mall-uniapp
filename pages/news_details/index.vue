<template>
	<view>
		<view class='newsDetail'>
			<view class='title'>{{ articleInfo.title }}</view>
			<view class='list acea-row row-middle'>
				<view class='label'>{{ articleInfo.author }}</view>
				<view class='item'>{{ formatDate(articleInfo.createTime) }}</view>
				<view class='item'><text class='iconfont icon-liulan'></text>{{ articleInfo.browseCount }}</view>
			</view>
			<view class='conters'>
				<jyf-parser :html="content" ref="article" :tag-style="tagStyle" />
			</view>
			<view class="picTxt acea-row row-between-wrapper" v-if="store_info.id">
				<view class="pictrue">
					<image :src="store_info.picUrl" />
				</view>
				<view class="text">
					<view class="name line1">{{ store_info.storeName }}</view>
					<view class="money font-color">
						￥<text class="num">{{ fen2yuan(store_info.price) }}</text>
					</view>
					<view class="y_money">￥{{ fen2yuan(store_info.marketPrice) }}</view>
				</view>
				<navigator :url="'/pages/goods_details/index?id=' + store_info.id" hover-class="none" class="label">
          <text class="span">查看商品</text>
        </navigator>
			</view>
			<!-- #ifdef H5 -->
			<button class="bnt bg-color" hover-class='none' @click="listenerActionSheet" v-if="this.$wechat.isWeixin()">
        和好友一起分享
      </button>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<button class="bnt bg-color" open-type="share" hover-class='none'>和好友一起分享</button>
			<!-- #endif -->
		</view>
		<shareInfo @setShareInfoStatus="setShareInfoStatus" :shareInfoStatus="shareInfoStatus" />
		<home></home>
	</view>
</template>
<script>
	import shareInfo from '@/components/shareInfo';
	import home from '@/components/home';
	import parser from "@/components/jyf-parser/jyf-parser";
  import * as ArticleApi from '@/api/promotion/article.js';
  import * as ProductSpuApi from '@/api/product/spu.js';
  import dayjs from "@/plugin/dayjs/dayjs.min.js";
  import * as Util from '@/utils/util.js';
  export default {
		components: {
			shareInfo,
			home,
			"jyf-parser": parser
		},
		data() {
			return {
				id: 0,
				articleInfo: [],
				store_info: {},
				content:'',
				tagStyle: {
					img: 'width:100%;'
				},
				productId: 0,
        shareInfoStatus: false,
      };
		},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      if (options.hasOwnProperty('id')) {
       this.id = options.id;
      } else{
        // #ifndef H5
        uni.navigateBack({delta: 1 });
        // #endif
        // #ifdef H5
        history.back();
        // #endif
      }
    },
    onShow: function () {
      this.getArticleOne();
    },
    /**
     * 用户点击右上角分享
     */
    // #ifdef MP
    onShareAppMessage: function() {
      return {
        title: this.articleInfo.title,
        imageUrl: this.articleInfo.imageInput.length ? this.articleInfo.imageInput[0] : "",
        desc: this.articleInfo.synopsis,
        path: '/pages/news_details/index?id=' + this.id
      };
    },
    // #endif
		methods: {
      getArticleOne: function() {
        ArticleApi.getArticle(this.id).then(res => {
          uni.setNavigationBarTitle({
             title: res.data.title.substring(0,7) + "..."
          });
          this.$set(this, 'articleInfo', res.data);
          this.$set(this, 'productId', res.data.productId);
          if (res.data.spuId) {
            this.goodInfo(res.data.spuId);
          }
          this.content = res.data.description;
          // #ifdef H5
          if (this.$wechat.isWeixin()) {
            this.setShareInfo();
          }
          // #endif
        });
				// 增加文章浏览量
        ArticleApi.addArticleBrowseCount(this.id)
      },
      goodInfo(id) {
        ProductSpuApi.getSpuDetail(id).then(res=>{
          this.$set(this, 'store_info', res.data);
        })
      },
      listenerActionSheet() {
        this.shareInfoStatus = true
      },
      setShareInfoStatus() {
        this.shareInfoStatus = false
      },
      setShareInfo: function() {
        let href = location.href;
        let configAppMessage = {
          title: this.articleInfo.title,
          desc: this.articleInfo.introduction,
          link: href,
          imgUrl: this.articleInfo.picUrl
        };
        this.$wechat.wechatEvevt([
          "updateAppMessageShareData",
          "updateTimelineShareData"
        ], configAppMessage);
      },

      fen2yuan(price) {
        return Util.fen2yuan(price)
      },
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD");
      }
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background-color: #fff !important;
	}
    .newsDetail{
		padding: 30rpx 0;
	}
	.newsDetail .title {
		padding: 0 30rpx;
		font-size: 34rpx;
		color: #282828;
		font-weight: bold;
		line-height: 1.5;
	}

	.newsDetail .list {
		margin: 28rpx 30rpx 0 30rpx;
		padding-bottom: 25rpx;
	}

	.newsDetail .list .label {
		font-size: 30rpx;
		color: #B1B2B3;
	}

	.newsDetail .list .item {
		margin-left: 27rpx;
		font-size: 30rpx;
		color: #B1B2B3;
	}

	.newsDetail .list .item .iconfont {
		font-size: 28rpx;
		margin-right: 10rpx;
	}

	.newsDetail .list .item .iconfont.icon-shenhezhong {
		font-size: 26rpx;
	}

	.newsDetail .conters {
		padding: 0 30rpx;
		font-size: 32rpx;
		color: #8A8B8C;
		line-height: 1.7;
	}

	.newsDetail .picTxt {
		width: 690rpx;
		height: 200rpx;
		border-radius: 20rpx;
		border: 1px solid #e1e1e1;
		position: relative;
		margin: 30rpx auto 0 auto;
	}

	.newsDetail .picTxt .pictrue {
		width: 200rpx;
		height: 200rpx;
	}

	.newsDetail .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx 0 0 20rpx;
		display: block;
	}

	.newsDetail .picTxt .text {
		width: 460rpx;
	}

	.newsDetail .picTxt .text .name {
		font-size: 30rpx;
		color: #282828;
	}

	.newsDetail .picTxt .text .money {
		font-size: 24rpx;
		margin-top: 40rpx;
		font-weight: bold;
	}

	.newsDetail .picTxt .text .money .num {
		font-size: 36rpx;
	}

	.newsDetail .picTxt .text .y_money {
		font-size: 26rpx;
		color: #999;
		text-decoration: line-through;
	}

	.newsDetail .picTxt .label {
		position: absolute;
		background-color: #303131;
		width: 160rpx;
		height: 50rpx;
		right: -7rpx;
		border-radius: 25rpx 0 6rpx 25rpx;
		text-align: center;
		line-height: 50rpx;
		bottom: 24rpx;
	}

	.newsDetail .picTxt .label .span {
		background-image: linear-gradient(to right, #fff71e 0%, #f9b513 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.newsDetail .picTxt .label:after {
		content: " ";
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: 8rpx solid #303131;
		border-right: 8rpx solid transparent;
		top: -7rpx;
		right: 0;
	}

	.newsDetail .bnt {
		color: #fff;
		font-size: 30rpx;
		width: 690rpx;
		height: 90rpx;
		border-radius: 45rpx;
		margin: 48rpx auto;
		text-align: center;
		line-height: 90rpx;
	}
</style>
