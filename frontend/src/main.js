import Vue from 'vue'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import './config/bootstrap'
import './config/msgs'
import './config/axios'
import store from './config/Store'
import router from './config/router'
import './config/mq'

Vue.config.productionTip = false
new Vue({
	store,
	router,
  render: h => h(App)
}).$mount('#app')