<template>
  <div class="quality-recommend">
    <div class="slider-banner swiper">
			<view class="swiper">
				<swiper indicator-dots="true" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration"
				 indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
					<block v-for="(item,index) in imgUrls" :key="index">
						<swiper-item>
							<image :src="item.pic" class="slide-image"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
    </div>
    <div class="title acea-row row-center-wrapper">
      <div class="line"></div>
      <div class="name">
        <span class="iconfont" :class="icon"></span>{{ name }}
      </div>
      <div class="line"></div>
    </div>
		<view class="wrapper">
			<GoodList :bastList="goodsList" :is-sort="false" />
			<view class="txt-bar" v-if="goodsList.length>0 && !isScroll">我是有底线的~</view>
			<emptyPage v-if="goodsList.length === 0 && !isScroll" title="暂无数据~"></emptyPage>
		</view>
  </div>
</template>
<script>
import emptyPage from '@/components/emptyPage.vue'
import GoodList from "@/components/goodList";
import * as ProductSpuApi from '@/api/product/spu.js';
import * as PromotionActivityApi from '@/api/promotion/activity.js';
import * as ProductUtil from '@/utils/product.js';
export default {
  name: "HotNewGoods",
  components: {
    GoodList,
		emptyPage,
  },
  props: {},
  data: function() {
    return {
      imgUrls: [], // TODO @芋艿：没想好，读取哪里的 banner
      goodsList: [],
      name: "",
      icon: "",
			type: 0,
			autoplay: true,
			circular: true,
			interval: 3000,
			duration: 500,
      recommendType: '',
			page: 1,
			limit: 8,
			isScroll: true
    };
  },
  onLoad: function(option) {
	this.type = option.type
    this.titleInfo();
    this.getIndexGroomList();
  },
  methods: {
    titleInfo: function() {
      if (this.type === "1") {
        this.name = "精品推荐";
        this.icon = "icon-jingpintuijian";
				uni.setNavigationBarTitle({
					title:"精品推荐"
				})
        this.recommendType = 'best';
      } else if (this.type === "2") {
        this.name = "热门榜单";
        this.icon = "icon-remen";
				uni.setNavigationBarTitle({
					title:"热门榜单"
				})
        this.recommendType = 'hot';
      } else if (this.type === "3") {
        this.name = "首发新品";
        this.icon = "icon-xinpin";
				uni.setNavigationBarTitle({
					title:"首发新品"
				})
        this.recommendType = 'new';
      } else if (this.type === "4") {
        this.name = "促销单品";
        this.icon = "icon-xinpin";
				uni.setNavigationBarTitle({
					title:"促销单品"
				})
        this.recommendType = 'benefit';
      }
    },
    /**
     * 获得推荐商品列表
     */
    getIndexGroomList: function() {
			if(!this.isScroll) {
        return
      }
      ProductSpuApi.getSpuPage({
        recommendType: this.recommendType,
        pageNo: this.page,
        pageSize: this.limit
      }).then(res => {
        const good_list = res.data.list;
        this.isScroll = good_list.length >= this.limit
        this.page++

        // 设置营销活动
        const spuIds = good_list.map(item => item.id);
        if (spuIds.length > 0) {
          PromotionActivityApi.getActivityListBySpuIds(spuIds).then(res => {
            ProductUtil.setActivityList(good_list, res.data);
            this.goodsList = this.goodsList.concat(good_list); // 放在此处，避免 Vue 监控不到数组里的元素变化
          });
        }
      }).catch(res => {
        this.$util.Tips({ title: res });
      });
    }
  },
	onReachBottom() {
		this.getIndexGroomList()
	}
};
</script>
<style lang="scss">
	/deep/ .empty-box{
		background-color: #f5f5f5;
	}
	.swiper,swiper,swiper-item,.slide-image{
		width: 100%;
		height: 280rpx;
	}
	.quality-recommend {
		.wrapper{
			background: #fff;
		}
		.title {
	    height: 120rpx;
	    font-size:32rpx;
	    color: #282828;
	    background-color: #f5f5f5;
			.line{
				width: 230rpx;
				height: 2rpx;
				background-color: #e9e9e9;
			}
		}
	}
	.txt-bar{
		padding: 20rpx 0;
		text-align: center;
		font-size: 26rpx;
		color: #666;
		background-color: #f5f5f5;
	}
</style>
