import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/font-awe-some.js'
import router from './router'
import store from './store'

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
