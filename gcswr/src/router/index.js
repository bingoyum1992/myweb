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
          path: '/langart',
          component: resolve => require(['../components/pages/LangArt.vue'],resolve)
        }
      ]
    },
  ]
})
