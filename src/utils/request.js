import axios from "axios"
axios.defaults.headers.withCredentials = true
const service = axios.create({
  withCredentials: true,
  baseURL: "/api",
  timeout: 3000,
})
service.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const msg = response.data.msg
    if (msg?.startsWith("Token")) {
      window.location.href = "/login"
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default service
export function request(config) {
  return service(config)
}
