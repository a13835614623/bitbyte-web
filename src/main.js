import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)
// 导入fontawesome
Vue.component('icon', FontAwesomeIcon)
Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
