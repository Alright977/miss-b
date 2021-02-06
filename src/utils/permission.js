// 存储角色相对应的权限名称
const roleToRoute = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductEdit',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductEdit',
    },
    {
      name: 'Category',
    },
  ],
}

// 过滤没有权限的路由
export function getMenuRoute(role, routes) {
  const allowRoutesName = roleToRoute[role].map((item) => item.name)
  const resultRoutes = routes.filter((r) => {
    const obj = r
    if (allowRoutesName.includes(r.name)) {
      const { children } = obj
      obj.children = children.filter((c) => allowRoutesName.includes(c.name))
      return true
    }
    return false
  })
  return resultRoutes
}
