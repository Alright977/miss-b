import axios from '@/https'

export default {
  // 登入请求
  login(params) {
    return axios.post('/passport/login', params)
  },

  // 类目请求
  catelist(params) {
    return axios.get('/category/all', { params })
  },

  // 产品列表
  prolist(params) {
    return axios.get('/products/all', { params })
  },

  // 删除
  remove(params) {
    return axios.delete(`/products/${params.id}`)
  },
  // 新增
  add(params) {
    return axios.post('/products/add', params)
  },

  // 读取商品
  detail(id) {
    return axios.get(`/products/${id}`)
  },

  // 编辑商品
  edit(params) {
    return axios.put('/products/edit', params)
  },
}
