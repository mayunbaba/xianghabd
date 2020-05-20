import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/reset.css'
import '@/assets/js/rem.js'

Vue.config.productionTip = false


import {
  Tabbar,TabbarItem,Icon
} from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


