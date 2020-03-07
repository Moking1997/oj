import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'

import Home from '@/router/home'
import Admin from '@/router/admin'
import Problem from '@/router/problem'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    Home,
    Admin,
    Problem
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  const tokenStr = window.sessionStorage.getItem('token')
  const limit = window.sessionStorage.getItem('limit')
  if (!tokenStr) return next('/login')
  if (to.path === '/admin' && limit == 2) {
    alert('您无权限,请登入')
    return next('/login')
  }

  next()
})

export default router
