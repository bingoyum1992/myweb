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
      component: Home,
      children:[
        {
          path: '/',
          component: resolve => require(['../components/pages/LangArt.vue'],resolve),
          meta:{
            keepAlive:true
          }
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
          component: resolve => require(['../components/pages/userCenter.vue'],resolve),
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/modifyPass',
          component: resolve => require(['../components/pages/modifyPass.vue'],resolve)
        },
        {
          path: '/Manage',
          component: resolve => require(['../components/pages/Manage.vue'],resolve),
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/Article',
          component: resolve => require(['../components/pages/Article.vue'],resolve),
          meta:{
            keepAlive:false
          }
        }
      ]
    },
  ]
})
