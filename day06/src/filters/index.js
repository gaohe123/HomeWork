/**
 * @author YangLing
 * @date 2021/12/10 9:50 AM
 */
import Vue from "vue";
import dayjs from "dayjs";
import rt from "dayjs/plugin/relativeTime";

/**
 * MethodName 格式化后台返回的时间戳
 * @param time
 * @param format
 * @returns {string}
 */
const dateFilter = (time, format = "YYYY-MM-DD") => {
  if (!isNaN(time)) {
    time = parseInt(time);
  }
  return dayjs(time).format(format);
};

// 加载相对时间插件
dayjs.extend(rt);

/**
 * MethodName 处理相对时间
 * @param time
 * @returns {string}
 */
const relativeTime = (time) => {
  if (!isNaN(time)) {
    time = parseInt(time);
  }
  return dayjs().to(dayjs(time));
};

/**
 * 格式化后台返回的时间戳
 */
Vue.filter("dateFilter", dateFilter);

/**
 * 处理相对时间
 */
Vue.filter("relativeTime", relativeTime);

export default {
  dateFilter,
  relativeTime,
};
