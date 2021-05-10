import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import api from './api'
// import './api/mock.js'
import * as echarts from 'echarts'
import Preview from '@/extend/preview/preview.js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = api
Vue.prototype.$Preview = Preview

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
