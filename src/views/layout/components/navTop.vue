<template>
  <div class="nav-top-menu" :class="{ 'nav-leftbtn-menu': $store.state.collapsed }">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed" class="nav-btn-menu">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>

    <!-- 面包屑 -->
    <a-breadcrumb>
      <a-breadcrumb-item> {{ currentRoute[0] ? currentRoute[0].meta.title : '' }}</a-breadcrumb-item>
      <a-breadcrumb-item>
        <span>{{ currentRoute[1] ? currentRoute[1].meta.title : '' }} </span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <ul class="nav-user-menu">
      <li>欢迎你 {{ $store.state.token }}</li>
      <li @click="loginOut()">退出</li>
    </ul>
  </div>
</template>

<script>
import { clearSession } from '@/utils/webStorage'
export default {
  data() {
    return {
      currentRoute: [
        {
          name: 'Home',
          meta: {
            title: '首页',
          },
        },
        {
          name: 'Index',
          meta: {
            title: '统计',
          },
        },
      ],
    }
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed')
    },
    // 退出登入
    loginOut() {
      clearSession()
      this.$router.push({
        name: 'Login',
      })
    },
  },
  watch: {
    $route: function matched() {
      this.currentRoute = this.$router.currentRoute.matched
    },
  },
}
</script>
