import Vue from 'vue'
import Router from 'vue-router'
import MerchantRouter from './merchant'
import PlatformRouter from './platform'
import Login from '@/containers/login.vue'
import ForgetPwd from '@/containers/forgetPwd.vue'
import Layout from '@/containers/layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/forgetPwd',
      component: ForgetPwd
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: Layout,
      children: [ ...MerchantRouter, ...PlatformRouter ]
    }
  ]
})
