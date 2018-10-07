/*
 * @Author: fmain
 * @Date: 2017-07-31 16:58:30
 * @Last Modified by:   fmain
 * @Last Modified time: 2017-07-31 16:58:30
 */

import axios from 'axios';
// import store from '../store';
import  qs from 'qs'


// 创建axios实例
const Axios = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 20000                  // 请求超时时间
});

// request拦截器
Axios.interceptors.request.use(config => {
  config.data = qs.stringify(config.data)
  // if (store.getters.token) {
  //   config.headers['X-Token'] = store.getters.token; // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

export default Axios;
