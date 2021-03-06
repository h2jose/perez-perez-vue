import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';

import VuetifyConfirm from "vuetify-confirm";
Vue.use(VuetifyConfirm, { vuetify });

import DefaultLayout from './layouts/Default.vue'
Vue.component('Layout', DefaultLayout)

//axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.defaults.baseURL = 'https://perez-perez-app.herokuapp.com/api/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
