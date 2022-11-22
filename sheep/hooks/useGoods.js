import { ref } from 'vue';
import dayjs from 'dayjs';
import $url from '@/sheep/url';

// 格式化销量
export function formatSales(type, num) {
  num = num + '';
  if (type === 'exact') {
    return '已售' + num;
  } else {
    if (num < 10) {
      return '销量≤10';
    } else {
      let a = Math.pow(10, num.length - 1);
      return '已售' + parseInt(num / a) * a + '+';
    }
  }
}

// 格式化兑换量
export function formatExchange(type, num) {
  num = num + '';
  if (type === 'exact') {
    return '已兑换' + num;
  } else {
    if (num < 10) {
      return '已兑换≤10';
    } else {
      let a = Math.pow(10, num.length - 1);
      return '已兑换' + parseInt(num / a) * a + '+';
    }
  }
}

// 格式化库存
export function formatStock(type, num) {
  num = num + '';
  if (type === 'exact') {
    return '库存' + num;
  } else {
    if (num < 10) {
      return '库存≤10';
    } else {
      let a = Math.pow(10, num.length - 1);
      return '库存 ' + parseInt(num / a) * a + '+';
    }
  }
}

// 格式化价格
export function formatPrice(e) {
  return e.length === 1 ? e[0] : e.join('~');
}

// 格式化商品轮播
export function formatGoodsSwiper(list) {
  let swiper = [];
  list.forEach((item, key) => {
    if (item.indexOf('.avi') !== -1 || item.indexOf('.mp4') !== -1) {
      swiper.push({
        src: $url.cdn(item),
        type: 'video',
      });
    } else {
      swiper.push({
        src: $url.cdn(item),
        type: 'image',
      });
    }
  });
  return swiper;
}

export function formatOrderColor(type) {
  if (
    type === 'apply_refund' ||
    type === 'groupon_ing' ||
    type === 'nocomment' ||
    type === 'noget' ||
    type === 'nosend'
  ) {
    return 'warning-color';
  } else if (
    type === 'closed' ||
    type === 'groupon_invalid' ||
    type === 'cancel' ||
    type === 'refund_agree'
  ) {
    return 'danger-color';
  } else if (type === 'completed') {
    return 'success-color';
  } else if (type === 'unpaid') {
    return 'info-color';
  }
}

// 计算相隔时间
export function useDurationTime(toTime, fromTime = '') {
  toTime = getDayjsTime(toTime);
  if (fromTime === '') {
    fromTime = dayjs();
  }
  let duration = ref(toTime - fromTime);
  if (duration.value > 0) {
    setTimeout(() => {
      if (duration.value > 0) {
        duration.value -= 1000;
      }
    }, 1000);
  }

  let durationTime = dayjs.duration(duration.value);
  return {
    h: (durationTime.months() * 30 * 24 + durationTime.days() * 24 + durationTime.hours())
      .toString()
      .padStart(2, '0'),
    m: durationTime.minutes().toString().padStart(2, '0'),
    s: durationTime.seconds().toString().padStart(2, '0'),
    ms: durationTime.$ms,
  };
}

function getDayjsTime(time) {
  time = time.toString();
  if (time.indexOf('-') > 0) {
    // 'date'
    return dayjs(time);
  }
  if (time.length > 10) {
    // 'timestamp'
    return dayjs(parseInt(time));
  }
  if (time.length === 10) {
    // 'unixtime'
    return dayjs.unix(parseInt(time));
  }
}
