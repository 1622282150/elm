import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import search from '@/pages/search'
import order from '@/pages/order'
import me from '@/pages/me'
import detail from '@/pages/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/order',
      component: order
    },
    {
      path: '/me',
      component: me
    },
    {
      path: '/detail',
      component: detail
    }
  ]
})
