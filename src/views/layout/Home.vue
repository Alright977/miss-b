<template>
  <div id="app">
    <left-menu :key="key"></left-menu>
    <nav-top></nav-top>
    <router-view></router-view>
  </div>
</template>

<script>
// 菜单
import leftMenu from './components/menu'
// 顶部导航
import navTop from './components/navTop'
export default {
  data() {
    return {
      key: new Date().getTime(),
    }
  },
  components: {
    leftMenu,
    navTop,
  },
  methods: {},
  watch: {
    $route() {
      this.key = new Date().getTime()
    },
  },
}
</script>

<style lang="less">
.nav-left-menu {
  width: 200px;
  position: fixed;
  .left-menu {
    height: 100vh;
  }
}
.nav-btn-menu {
  margin-top: 15px;
  margin-right: 15px;
}

.nav-top-menu {
  transition: margin-left 0.3s;
  height: 40px;
  margin-left: 205px;
  display: flex;
  border-bottom: 1px solid burlywood;
  text-align: center;
  align-items: center;
}
.nav-leftbtn-menu {
  transition: margin-left 0.3s;
  margin-left: 85px;
}
.nav-user-menu {
  font-size: 8px;
  position: absolute;
  right: 30px;
  cursor: pointer;
  li:not(:first-child) {
    display: none;
  }
  &:hover {
    li:first-child {
      display: none;
    }
    li:last-child {
      margin-right: 40px;
      display: block;
    }
  }
}
</style>
