import axios from 'axios'

// 创建一个实例
const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.url.includes('/passport')) {
      return config
    }
    return {
      ...config,
      params: {
        ...config.params,
        appkey: 'onepig_1610436669146',
      },
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use((response) => {
  if (response.data.status === 'success') {
    return response.data
  } else {
    return Promise.reject(response.data.msg)
  }
})
export default instance
