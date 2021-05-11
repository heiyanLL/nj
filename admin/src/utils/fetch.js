import axios from 'axios'
import router from '@/router'
import { Message, Loading } from 'element-ui'
let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://121.196.42.224/hy/' : '',
  timeout: 7000, // 请求超时时间
})
// 添加请求拦截器
Service.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: 'loading...'
  })
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  loadingInstance.close()
  if(response.data.result && response.data.result.code == '05') {
    router.replace({path: '/login'})
  }
  return response.data
}, error => {
  console.log('TCL: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  loadingInstance.close()
  return Promise.reject(error)
})

export default Service