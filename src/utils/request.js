import axios from "axios";
import cookie from 'react-cookies'
axios.defaults.headers.withCredentials = true
const service = axios.create({
    withCredentials: true,
    baseURL: '/api',
    timeout: 3000,
})
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const val = cookie.load('satoken')
    if(val){
        config.headers['satoken'] = val
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  })
export default service
export function request(config){
    return service(config)
}