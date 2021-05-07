// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import axios from "axios";
import App from './App'
import router from './router'
import map from '@/utils/map'
import hosts from '@/utils/hosts'
import utils from '@/utils/utils'
import filters from '@/filters'
// import { Error_status } from '@/utils/error'

Vue.config.productionTip = false
    // 方法
Vue.prototype.utils = utils

Vue.prototype.$axios = axios;

Vue.prototype.map = map
Vue.prototype.hosts = hosts  
Vue.config.devtools = true
    // axios interceptor
// axios.defaults.withCredentials = true
// axios.interceptors.request.use(config => {
//     config.withCredentials = true
//     return config
// }, error => {
//     console.log(error)
//     return Pomise.reject(error)
// })

for(let item in filters){
    Vue.filter(item,filters[item])
  }

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})