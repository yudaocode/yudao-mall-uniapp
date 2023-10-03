<template>
	<view>
		<view class='sign-record'>
		   <view class='list' v-for="(item,index) in signList" :key="index">
		      <view class='item'>
		         <view class='listn borRadius14'>
		            <view class='itemn acea-row row-between-wrapper'>
		               <view>
		                  <view class='name line1'>第 {{item.day}} 天签到积分奖励</view>
		                  <view>{{ formatDate(item.createTime) }}</view>
		               </view>
                  <view>
                    <view class='num font-color' v-if="item.point > 0">
                      <span class="num-title">积分</span> +{{ item.point }}
                    </view>
                    <view class='num font-color' v-if="item.experience > 0">
                      <span class="num-title">经验</span> +{{ item.experience }}
                    </view>
                  </view>
		            </view>
		         </view>
		      </view>
		   </view>
		    <view class='loadingicon acea-row row-center-wrapper'>
		        <text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadtitle}}
		     </view>
		</view>
	</view>
</template>

<script>
	import { toLogin } from '@/libs/login.js';
  import { mapGetters } from "vuex";
  import * as SignInApi from '@/api/member/signin';
  import dayjs from "@/plugin/dayjs/dayjs.min.js";
  export default {
		data() {
			return {
				loading: false,
        loadend: false,
        loadtitle: '加载更多',
        page:1,
        limit:8,
        signList:[],
			};
		},
		computed: mapGetters(['isLogin']),
		watch:{
			isLogin: {
				handler:function(newV,oldV) {
					if(newV){
						this.getSignMoneList();
					}
				},
				deep:true
			}
		},
		onLoad(){
			if (!this.isLogin) {
        toLogin();
        return;
			}
      this.getSignMoneList();
    },
		onReachBottom: function () {
      this.getSignMoneList();
    },
		methods: {
      /**
       * 获取签到记录列表
      */
      getSignMoneList:function(){
        if (this.loading || this.loadend) {
          return;
        }
        this.loading = true;
        this.loadtitle = "";
        SignInApi.getSignRecordPage({
          pageNo: this.page,
          pageSize: this.limit
        }).then(res=>{
          const list = res.data.list;
          const loadend = list.length < this.limit;
          this.signList = this.$util.SplitArray(list, this.signList);
          this.$set(this, 'signList', this.signList);
          this.loadend = loadend;
          this.loading = false;
          this.loadtitle = loadend ? "哼😕~我也是有底线的~" : "加载更多"
        }).catch(err => {
          this.loading = false;
          this.loadtitle = '加载更多';
        });
      },
      formatDate: function(date) {
        return dayjs(date).format("YYYY-MM-DD");
      },
		}
	}
</script>

<style>
.sign-record .list .item .num-title {
  font-size: 10rpx;
  margin-right: 8rpx;
}

</style>
