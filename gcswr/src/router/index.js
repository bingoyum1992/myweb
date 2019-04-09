import Vue from 'vue'
import router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(router)

export default new router({
  history:true,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Home,
      children:[
        {
          path: '/',
          component: resolve => require(['../components/pages/LangArt.vue'],resolve)
        },
        {
          path: '/piction',
          component: resolve => require(['../components/pages/Piction.vue'],resolve)
        },
        {
          path: '/sport',
          component: resolve => require(['../components/pages/Sport.vue'],resolve)
        },
        {
          path: '/userCenter',
          component: resolve => require(['../components/pages/userCenter.vue'],resolve)
        },
        {
          path: '/modifyPass',
          component: resolve => require(['../components/pages/modifyPass.vue'],resolve)
        },


      ]
    },
  ]
})
