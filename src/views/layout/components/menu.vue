<template>
  <div class="nav-left-menu">
    <a-menu :default-selected-keys="[$router.currentRoute.matched[1] ? $router.currentRoute.matched[1].name : '']" :default-open-keys="[$router.currentRoute.matched[0] ? $router.currentRoute.matched[0].name : '']" mode="inline" theme="dark" :inline-collapsed="$store.state.collapsed" class="left-menu">
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu :key="route.name" v-if="!route.meta.hide">
          <span slot="title"
            ><a-icon :type="route.meta.icon" />
            <span>{{ route.meta.title }}</span>
          </span>
          <template v-for="children in route.children">
            <a-menu-item :key="children.name" v-if="!children.meta.hide">
              <a-icon :type="children.meta.icon" />
              {{ children.meta.title }}
              <router-link :to="{ name: children.name }"> {{ children.meta.title }}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script>
export default {}
</script>
