import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import proList from '@/pages/proList'
import essInfo from '@/pages/essInfo'
import management from '@/pages/management'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/proList',
      name: 'proList',
      component: proList
    },
    {
      path: '/essInfo',
      name: 'essInfo',
      component: essInfo
    },
    {
      path: '/management',
      name: 'management',
      component: management
    }
  ]
})
