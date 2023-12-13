import { ref } from 'vue';
import dayjs from 'dayjs';
import $url from '@/sheep/url';

/**
 * 格式化销量
 * @param {'exact' | string} type 格式类型：exact=精确值，其它=大致数量
 * @param {number} num 销量
 * @return {string} 格式化后的销量字符串
 */
export function formatSales(type, num) {
  let prefix = type!=='exact' && num<10 ? '销量': '已售';
  return formatNum(prefix, type, num)
}

/**
 * 格式化兑换量
 * @param {'exact' | string} type 格式类型：exact=精确值，其它=大致数量
 * @param {number} num 销量
 * @return {string} 格式化后的销量字符串
 */
export function formatExchange(type, num) {
  return formatNum('已兑换', type, num)
}


/**
 * 格式化库存
 * @param {'exact' | any} type 格式类型：exact=精确值，其它=大致数量
 * @param {number} num 销量
 * @return {string} 格式化后的销量字符串
 */
export function formatStock(type, num) {
  return formatNum('库存', type, num)
}

/**
 * 格式化数字
 * @param {string} prefix 前缀
 * @param {'exact' | string} type 格式类型：exact=精确值，其它=大致数量
 * @param {number} num 销量
 * @return {string} 格式化后的销量字符串
 */
export function formatNum(prefix, type, num) {
  num = (num || 0);
  // 情况一：精确数值
  if (type === 'exact') {
    return prefix + num;
  }
  // 情况二：小于等于 10
  if (num < 10) {
    return `${prefix}≤10`;
  }
  // 情况三：大于 10，除第一位外，其它位都显示为0
  // 例如：100  - 199  显示为 100+
  //      9000 - 9999 显示为 9000+
  let pow = Math.pow(10, `${num}`.length - 1);
  return `${prefix}${(num / pow) * pow}+`;
}

// 格式化价格
export function formatPrice(e) {
  return e.length === 1 ? e[0] : e.join('~');
}

// 视频格式后缀列表
const VIDEO_SUFFIX_LIST = ['.avi', '.mp4']
/**
 * 转换商品轮播的链接列表：根据链接的后缀，判断是视频链接还是图片链接
 *
 * @param {string[]} urlList 链接列表
 * @return {{src: string, type: 'video' | 'image' }[]}  转换后的链接列表
 */
export function formatGoodsSwiper(urlList) {
  return urlList.map((url, key) => {
    const isVideo = VIDEO_SUFFIX_LIST.some(suffix => url.includes(suffix));
    const type = isVideo ? 'video' :'image'
    const src = $url.cdn(url);
    return { type, src }
  });
}

/**
 * 格式化订单状态的颜色
 *
 * @param order 订单
 * @return {string} 颜色的 class 名称
 */
export function formatOrderColor(order) {
  if (order.status === 0) {
    return 'info-color';
  }
  if (order.status === 10
    || order.status === 20
    || (order.status === 30 && !order.commentStatus)) {
    return 'warning-color';
  }
  if (order.status === 30 && order.commentStatus) {
    return 'success-color';
  }
  return 'danger-color';
}

/**
 * 格式化订单状态
 *
 * @param order 订单
 */
export function formatOrderStatus(order) {
  if (order.status === 0) {
    return '待付款';
  }
  if (order.status === 10 && order.deliveryType === 1) {
    return '待发货';
  }
  if (order.status === 10 && order.deliveryType === 2) {
    return '待核销';
  }
  if (order.status === 20) {
    return '待收货';
  }
  if (order.status === 30 && !order.commentStatus) {
    return '待评价';
  }
  if (order.status === 30 && order.commentStatus) {
    return '已完成';
  }
  return '已关闭';
}

/**
 * 处理订单的 button 操作按钮数组
 *
 * @param order 订单
 */
export function handleOrderButtons(order) {
  order.buttons = []
  if (order.type === 3) { // 查看拼团
    order.buttons.push('combination');
  }
  if (order.status === 20) { // 确认收货
    order.buttons.push('confirm');
  }
  if (order.logisticsId > 0) { // 查看物流
    order.buttons.push('express');
  }
  if (order.status === 0) { // 取消订单 / 发起支付
    order.buttons.push('cancel');
    order.buttons.push('pay');
  }
  if (order.status === 30 && !order.commentStatus) { // 发起评价
    order.buttons.push('comment');
  }
  if (order.status === 40) { // 删除订单
    order.buttons.push('delete');
  }
}

/**
 * 倒计时
 * @param toTime   截止时间
 * @param fromTime 起始时间，默认当前时间
 * @return {{s: string, ms: number, h: string, m: string}} 持续时间
 */
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

/**
 * 转换为 Dayjs
 * @param {any} time 时间
 * @return {dayjs.Dayjs}
 */
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
    // 'unixTime'
    return dayjs.unix(parseInt(time));
  }
}

/**
 * 将分转成元
 *
 * @param price 分，例如说 100 分
 * @returns {string} 元，例如说 1.00 元
 */
export function fen2yuan(price) {
  return (price / 100.0).toFixed(2)
}

/**
 * 从商品 SKU 数组中，转换出商品属性的数组
 *
 * 类似结构：[{
 *    id: // 属性的编号
 *    name: // 属性的名字
 *    values: [{
 *      id: // 属性值的编号
 *      name: // 属性值的名字
 *    }]
 * }]
 *
 * @param skus 商品 SKU 数组
 */
export function convertProductPropertyList(skus) {
  let result = [];
  for (const sku of skus) {
    if (!sku.properties) {
      continue
    }
    for (const property of sku.properties) {
      // ① 先处理属性
      let resultProperty = result.find(item => item.id === property.propertyId)
      if (!resultProperty) {
        resultProperty = {
          id: property.propertyId,
          name: property.propertyName,
          values: []
        }
        result.push(resultProperty)
      }
      // ② 再处理属性值
      let resultValue = resultProperty.values.find(item => item.id === property.valueId)
      if (!resultValue) {
        resultProperty.values.push({
          id: property.valueId,
          name: property.valueName
        })
      }
    }
  }
  return result;
}