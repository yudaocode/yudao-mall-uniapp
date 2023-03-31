<!-- 页面  -->
<template>
  <s-layout title="签到有礼">
    <view v-if="state.loading"></view>
    <view class="sign-wrap" v-else-if="state.data && !state.loading">
      <!-- 签到日历 -->
      <view class="content-box calendar">
        <view class="sign-everyday ss-flex ss-col-center ss-row-between ss-p-x-30">
          <text class="sign-everyday-title">签到日历</text>
          <view class="sign-num-box">
            已连续签到
            <text class="sign-num">{{ state.continue_days }}</text>
            天
          </view>
        </view>

        <!-- 切换年月 -->
        <view class="bar ss-flex ss-col-center ss-row-center">
          <view class="previous" @tap="handleCalendar(0)"><text class="cicon-back"></text></view>
          <view class="date ss-m-x-20">{{ state.cur_year || '--' }} 年 {{ state.cur_month || '--' }} 月</view>
          <view class="next" @tap="handleCalendar(1)"><text class="cicon-forward"></text></view>
        </view>

        <!-- 显示星期 -->
        <view class="week ss-flex">
          <view class="week-item ss-flex ss-row-center" v-for="(item, index) in state.weeks_ch" :key="index">
            {{ item.title }}
          </view>
        </view>

        <!-- 日历表 -->
        <view class="myDateTable">
          <view v-for="(item, j) in state.data.days" :key="j" class="dateCell ss-flex ss-row-center ss-col-center">
            <!-- 空格 -->
            <view class="ss-flex ss-row-center ss-col-center">
              <text :decode="true">&nbsp;&nbsp;</text>
            </view>
            <view>
              <!-- 已签到日期 -->
              <view v-if="item.is_sign" class="is-sign ss-flex ss-row-center">
                <view class="is-sign-num">{{ item.day < 10 ? '0' + item.day : item.day }}</view>
                    <image class="is-sign-image" :src="sheep.$url.static('/static/img/shop/app/correct.png')">
                    </image>
                </view>
                <!-- 未签到日期 -->
                <view class="is-sign ss-flex ss-row-center" v-if="item.is_replenish == 1"
                  @tap="onShowRetroactive(item.date)">
                  <view class="cell-num">{{ item.day < 10 ? '0' + item.day : item.day }}</view>
                      <text class="cicon-title"></text>
                  </view>
                  <view class="is-sign ss-flex ss-row-center" v-if="item.is_replenish == 0 && !item.is_sign">
                    <view class="cell-num">{{ item.day < 10 ? '0' + item.day : item.day }}</view>
                    </view>
                  </view>
                </view>

                <!-- 签到按钮 -->
                <view class="ss-flex ss-col-center ss-row-center sign-box ss-m-y-40">
                  <button class="ss-reset-button sign-btn" v-if="state.isSign === 0" @tap="onSign">签到</button>
                  <button class="ss-reset-button already-btn" v-if="state.isSign === 1" disabled>已签到</button>
                </view>
              </view>
            </view>
            <view class="bg-white ss-m-t-16 ss-p-t-30 ss-p-b-60 ss-p-x-40">
              <view class="activity-title ss-m-b-30">签到说明</view>
              <view class="activity-des">
                1、每日签到固定 {{ state.data.rules.everyday }} 积分
                <text v-if="state.data.rules.is_inc == '1'">
                  ，次日递增奖励 {{ state.data.rules.inc_num }} 积分，直到
                  {{ state.data.rules.until_day }} 天之后不再增加
                </text>
              </view>
              <view class="activity-des" v-if="state.data.rules.discounts?.length > 0">
                2、<text class="" v-for="i in state.data.rules.discounts" :key="i">
                  连续签到 {{ i.full }} 天，奖励 {{ i.value }} 积分；
                </text>
              </view>
              <view class="activity-des" v-if="state.data.rules.is_replenish == '1'">
                {{ state.data.rules.discounts?.length > 0 ? '3' : '2' }}、用户在
                {{ state.data.rules.replenish_limit }} 天内，可补签
                {{ state.data.rules.replenish_days }} 天，每次补签消耗
                {{ state.data.rules.replenish_num }}积分
              </view>
            </view>
          </view>
          <s-empty v-else-if="!state.data && !state.loading" icon="/static/data-empty.png" text="签到活动还未开始">
          </s-empty>
          <su-popup :show="state.showModel" type="center" round="10" :isMaskClick="false">
            <view class="model-box ss-flex-col">
              <view class="ss-m-t-56 ss-flex-col ss-col-center">
                <text class="cicon-check-round"></text>
                <view class="score-title">{{ state.signin.score }}积分</view>
                <view class="model-title ss-flex ss-col-center ss-m-t-22 ss-m-b-30">
                  已连续打卡{{ state.continue_days }}天
                </view>
              </view>
              <view class="model-bg ss-flex-col ss-col-center ss-row-right">
                <view class="title ss-m-b-64">签到成功</view>
                <view class="ss-m-b-40">
                  <button class="ss-reset-button confirm-btn" @tap="onConfirm">确认</button>
                </view>
              </view>
            </view>
          </su-popup>
          <su-popup :show="state.showRetroactive" type="center" round="10" :isMaskClick="false">
            <view class="model-box ss-flex-col">
              <view class="ss-m-t-56 ss-flex-col ss-col-center">
                <text class="cicon-check-round"></text>
                <view class="score-title">消耗{{ state.data?.rules.replenish_num }}积分</view>
                <view class="model-title ss-flex ss-col-center ss-m-t-22 ss-m-b-30">
                  已连续打卡{{ state.continue_days }}天
                </view>
              </view>
              <view class="model-bg ss-flex-col ss-col-center ss-row-right">
                <view class="title ss-m-b-64">确认补签</view>
                <view class="ss-m-b-40 ss-flex">
                  <button class="ss-reset-button cancel-btn" @tap="state.showRetroactive = false">取消</button>
                  <button class="ss-reset-button confirm-btn" @tap="onRetroactive">确认</button>
                </view>
              </view>
            </view>
          </su-popup>
  </s-layout>
</template>

<script setup>
import sheep from '@/sheep';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { computed, reactive } from 'vue';

const headerBg = sheep.$url.css('/static/img/shop/app/sign.png');

const state = reactive({
  data: {
    days: [], //日历
    rules: {}, //规则
  },
  cur_year: 0, //当前选的年
  cur_month: 0, //当前选的月
  cur_day: 0, //当前选择的天
  weeks_ch: [
    {
      title: '日',
      value: '0',
    },
    {
      title: '一',
      value: '1',
    },
    {
      title: '二',
      value: '2',
    },
    {
      title: '三',
      value: '3',
    },
    {
      title: '四',
      value: '4',
    },
    {
      title: '五',
      value: '5',
    },
    {
      title: '六',
      value: '6',
    },
  ], //星期
  showModel: false, //签到弹框
  continue_days: 0, //连续签到天数
  signin: {}, // 签到
  showRetroactive: false, //补签弹框
  date: '', //补签选中日期
  isSign: 0, //今天是否签到
  loading: true,
});
async function onSign() {
  const { error, data } = await sheep.$api.activity.signAdd();
  if (error === 0) {
    state.showModel = true;
    state.signin = data;
    // getData();
  }
}

function onShowRetroactive(e) {
  state.showRetroactive = true;
  state.date = e;
}
//签到确认刷新页面
function onConfirm() {
  state.showModel = false;
  getData();
}
//补签
async function onRetroactive() {
  const { error, data } = await sheep.$api.activity.replenish({
    date: state.date,
  });
  if (error === 0) {
    state.showRetroactive = false;
    getData();
  }
}

async function getData(mouth) {
  const { error, data } = await sheep.$api.activity.signList(mouth);
  if (error === 0) {
    state.data = data;
  } else {
    state.data = null;
  }
  state.loading = false;
  if (state.data) {
    state.data.days.forEach((i, index) => {
      if (index < i.week) {
        index++;
        var obj = {
          day: null,
          is_sign: false,
        };
        state.data.days.unshift(obj);
      }
      if (index == 1) {
        let arr = i.date.split('-');
        state.cur_year = arr[0];
        state.cur_month = arr[1];
      }
    });
    if (state.data.days[0].day == null) {
      state.data.days.forEach((i, index) => {
        if (i.current == 'today') {
          state.isSign = i.is_sign;
        }
      });
    }
    state.continue_days = data.continue_days;
  }
}

onReady(() => {
  getData();
});

// 切换控制年月，上一个月，下一个月
const handleCalendar = (type) => {
  const cur_year = parseInt(state.cur_year);
  const cur_month = parseInt(state.cur_month);
  var newMonth;
  var newYear = cur_year;
  if (type === 0) {
    //上个月
    newMonth = cur_month - 1;
    if (newMonth < 1) {
      newYear = cur_year - 1;
      newMonth = 12;
    } else if (newMonth < 10) {
      newMonth = '0' + newMonth;
    }
  } else {
    newMonth = cur_month + 1;
    if (newMonth > 12) {
      newYear = cur_year + 1;
      newMonth = 1;
    } else if (newMonth < 10) {
      newMonth = '0' + newMonth;
    }
  }
  getData({
    month: newYear + '-' + newMonth,
  });
};
</script>

<style lang="scss" scoped>
.header-box {
  border-top: 2rpx solid rgba(#dfdfdf, 0.5);
}

// 日历
.calendar {
  background: #fff;

  .sign-everyday {
    height: 100rpx;
    background: rgba(255, 255, 255, 1);
    border: 2rpx solid rgba(223, 223, 223, 0.4);

    .sign-everyday-title {
      font-size: 32rpx;
      color: rgba(51, 51, 51, 1);
      font-weight: 500;
    }

    .sign-num-box {
      font-size: 26rpx;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);

      .sign-num {
        font-size: 30rpx;
        font-weight: 600;
        color: #ff6000;
        padding: 0 10rpx;
        font-family: OPPOSANS;
      }
    }
  }

  // 年月日
  .bar {
    height: 100rpx;

    .date {
      font-size: 30rpx;
      font-family: OPPOSANS;
      font-weight: 500;
      color: #333333;
      line-height: normal;
    }
  }

  .cicon-back {
    margin-top: 6rpx;
    font-size: 30rpx;
    color: #c4c4c4;
    line-height: normal;
  }

  .cicon-forward {
    margin-top: 6rpx;
    font-size: 30rpx;
    color: #c4c4c4;
    line-height: normal;
  }

  // 星期
  .week {
    .week-item {
      font-size: 24rpx;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      flex: 1;
    }
  }

  // 日历表
  .myDateTable {
    display: flex;
    flex-wrap: wrap;

    .dateCell {
      width: calc(750rpx / 7);
      height: 80rpx;
      font-size: 26rpx;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}

.is-sign {
  width: 48rpx;
  height: 48rpx;
  position: relative;

  .is-sign-num {
    font-size: 24rpx;
    font-family: OPPOSANS;
    font-weight: 500;
    line-height: normal;
  }

  .is-sign-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 48rpx;
    height: 48rpx;
  }
}

.cell-num {
  font-size: 24rpx;
  font-family: OPPOSANS;
  font-weight: 500;
  color: #333333;
  line-height: normal;
}

.cicon-title {
  position: absolute;
  right: -10rpx;
  top: -6rpx;
  font-size: 20rpx;
  color: red;
}

// 签到按钮
.sign-box {
  height: 140rpx;
  width: 100%;

  .sign-btn {
    width: 710rpx;
    height: 80rpx;
    border-radius: 35rpx;
    font-size: 30rpx;
    font-weight: 500;
    box-shadow: 0 0.2em 0.5em rgba(#ff6000, 0.4);
    background: linear-gradient(90deg, #ff6000, #fe832a);
    color: #fff;
  }

  .already-btn {
    width: 710rpx;
    height: 80rpx;
    border-radius: 35rpx;
    font-size: 30rpx;
    font-weight: 500;
  }
}

.model-box {
  width: 520rpx;
  // height: 590rpx;
  background: linear-gradient(177deg, #ff6000 0%, #fe832a 100%);
  // background: linear-gradient(177deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
  border-radius: 10rpx;

  .cicon-check-round {
    font-size: 70rpx;
    color: #fff;
  }

  .score-title {
    font-size: 34rpx;
    font-family: OPPOSANS;
    font-weight: 500;
    color: #fcff00;
  }

  .model-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #ffffff;
  }

  .model-bg {
    width: 520rpx;
    height: 344rpx;
    background-size: 100% 100%;
    background-image: v-bind(headerBg);
    background-repeat: no-repeat;
    border-radius: 0 0 10rpx 10rpx;

    .title {
      font-size: 34rpx;
      font-weight: bold;
      // color: var(--ui-BG-Main);
      color: #ff6000;
    }

    .subtitle {
      font-size: 26rpx;
      font-weight: 500;
      color: #999999;
    }

    .cancel-btn {
      width: 220rpx;
      height: 70rpx;
      border: 2rpx solid #ff6000;
      border-radius: 35rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #ff6000;
      line-height: normal;
      margin-right: 10rpx;
    }

    .confirm-btn {
      width: 220rpx;
      height: 70rpx;
      background: linear-gradient(90deg, #ff6000, #fe832a);
      box-shadow: 0 0.2em 0.5em rgba(#ff6000, 0.4);
      border-radius: 35rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #ffffff;
      line-height: normal;
    }
  }
}

//签到说明
.activity-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333333;
  line-height: normal;
}

.activity-des {
  font-size: 26rpx;
  font-weight: 500;
  color: #666666;
  line-height: 40rpx;
}
</style>
