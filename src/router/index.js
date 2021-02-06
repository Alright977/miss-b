import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout/Home.vue'
import Login from '../views/layout/Login'
import store from '../store/index'
import { getMenuRoute } from '@/utils/permission'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'index',
    meta: {
      title: '首页',
      hide: false,
      icon: 'home',
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '统计',
          icon: 'retweet',
        },
        component: () => import('@/views/page/index'),
      },
    ],
  },
  // 登入
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登入',
      hide: true,
    },
  },
]
// admin权限路由
const asyncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      hide: false,
      icon: 'shopping',
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          icon: 'bars',
          hide: false,
        },
        component: () => import('@/views/page/productList'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          icon: 'shopping-cart',
          hide: false,
        },
        component: () => import('@/views/page/productAdd'),
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '编辑商品',
          icon: 'file-add',
          hide: true,
        },
        component: () => import('@/views/page/productAdd'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
        },
        component: () => import('@/views/page/category'),
      },
    ],
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// 登入校验
let isAddRoutes = false
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.token) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoute(store.state.token, asyncRouterMap)
        // concat连接两个数组，把固定路由和权限路由连接在一个
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          // 添加一个路由
          router.addRoutes(menuRoutes)
        })
        isAddRoutes = true
      }
      return next()
    }
    return next('/login')
  }
  return next()
})
export default router
