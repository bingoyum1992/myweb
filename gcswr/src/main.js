// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(elementui)
/* eslint-disable no-new */
router.beforeEach((to,from,next) =>{
  const user = sessionStorage.getItem('username');
  if(to.path=='/'){
  if(user!='null'&&user!=null){
    next('welcome')
  }
  next();
}else{
  if(user!='null'&&user!=null){
  next();
  }else{
    next('/');
  }
}
})
const app = new Vue({
 router:router,
 render:h=>h(App)
}).$mount('#app')
