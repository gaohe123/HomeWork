/**
 * @author YangLing
 * @date 2021/12/10 9:12 AM
 */

import axios from "axios";
// import store from "../store";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
      console.log(config)
    //获取vuex里面的token
    // const token = store.getters.getToken;
    //获取vuex里面的schoolid
    // const schoolid = store.getters.getSchoolId;
    //通过请求头将token发送给后台
    // config.headers.token = token;
    //通过请求头将schoolid发送给后台
    // config.headers.schoolid = schoolid;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
