import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from "axios"
import base64url from "base64url"

Vue.prototype.$http = axios
Vue.prototype.$base64URL = base64url
Vue.prototype.$wss = null

Vue.prototype.$accessToken = ''
Vue.prototype.$idToken = {}
Vue.prototype.$userProfile = {
  id: null,
  loginName: 'justinfan12345',
  displayName: 'Anonymous User',
  picture: null
}
Vue.prototype.$channelProfile = {
  name: '',
  audience: 0
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
