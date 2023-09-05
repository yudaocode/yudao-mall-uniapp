import dayjs from "@/plugin/dayjs/dayjs.min.js";

/**
 * 获得当前周的开始和结束时间
 */
export function getWeekTimes() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  return [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek, 0, 0, 0),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - dayOfWeek), 23, 59, 59)
  ]
}

/**
 * 获得当前月的开始和结束时间
 */
export function getMonthTimes() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const startDate = new Date(year, month, 1, 0, 0, 0);
  const nextMonth = new Date(year, month + 1, 1);
  const endDate = new Date(nextMonth.getTime() - 1);
  return [startDate, endDate]
}
