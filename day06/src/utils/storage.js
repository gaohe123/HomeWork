/**
 * @author YangLing
 * @date 2021/12/10 9:43 AM
 */

/**
 * MethodName 存储数据
 * @param key
 * @param value
 */
export const setItem = (key, value) => {
  if (typeof value == "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

/**
 * MethodName 获取本地存储数据
 * @param key
 * @returns {string|any}
 */
export const getItem = (key) => {
  let data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

/**
 * MethodName 删除本地存储数据
 * @param key
 */
export const removeItem = (key) => {
  localStorage.removeItem(key);
};

/**
 * MethodName 清空本地存储数据
 * @param key
 */
export const removeAllItem = (key) => {
  localStorage.clear(key);
};
