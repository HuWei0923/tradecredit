// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill";
import store from './vuex/store'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false

/*引入css*/
import '../static/css/common.css'
import '../static/css/index.css'

/*引入element*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

/*http response 拦截器*/
import axios from 'axios';
axios.interceptors.response.use(response => {
  if (response) {
    //console.log(response);
    if(response.data.code == 1){
      localStorage.clear();     //删除用户信息
      //如果超时就处理 ，指定要跳转的页面(比如登陆页)
      alert('登录失效,请重新登录!')
      setTimeout(function(){
        router.replace({path: '/'})
        window.location.reload()
      },1000)
    }
  }
  return response;
}, error => {
  return Promise.reject(error.response.data) //返回接口返回的错误信息
})


/*使用api*/
import api from './api/index'
Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
