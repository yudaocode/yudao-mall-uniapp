import dayjs from "dayjs";

/**
 * 将一个整数转换为分数保留两位小数
 * @param {number | string | undefined} num 整数
 * @return {number} 分数
 */
export const formatToFraction = (num) => {
  if (typeof num === 'undefined') return 0
  const parsedNumber = typeof num === 'string' ? parseFloat(num) : num
  return parseFloat((parsedNumber / 100).toFixed(2))
}

/**
 * 将一个数转换为 1.00 这样
 * 数据呈现的时候使用
 *
 * @param {number | string | undefined} num 整数
 * @return {string} 分数
 */
export const floatToFixed2 = (num) => {
  let str = '0.00'
  if (typeof num === 'undefined') {
    return str
  }
  const f = formatToFraction(num)
  const decimalPart = f.toString().split('.')[1]
  const len = decimalPart ? decimalPart.length : 0
  switch (len) {
    case 0:
      str = f.toString() + '.00'
      break
    case 1:
      str = f.toString() + '.0'
      break
    case 2:
      str = f.toString()
      break
  }
  return str
}

/**
 * 将一个分数转换为整数
 *
 * @param {number | string | undefined} num 分数
 * @return {number} 整数
 */
export const convertToInteger = (num) => {
  if (typeof num === 'undefined') return 0
  const parsedNumber = typeof num === 'string' ? parseFloat(num) : num
  // TODO 分转元后还有小数则四舍五入
  return Math.round(parsedNumber * 100)
}



/**
 * 时间日期转换
 * @param {dayjs.ConfigType} date 当前时间，new Date() 格式
 * @param {string} format 需要转换的时间格式字符串
 * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
 * @description format 季度："YYYY-mm-dd HH:MM:SS QQQQ"
 * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
 * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
 * @returns {string} 返回拼接后的时间字符串
 */
export function formatDate(date, format) {
  // 日期不存在，则返回空
  if (!date) {
    return ''
  }
  // 日期存在，则进行格式化
  if (format === undefined) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  return dayjs(date).format(format)
}
