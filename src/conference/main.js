import Vue from 'vue';
import axios from 'axios';
import swal from 'sweetalert2';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';

/* eslint-disable */
export const bus = new Vue()
Vue.config.productionTip = false;

const AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_LIVE_CHAT_END_POINT,
});

const Swal = swal;

Vue.prototype.$swal = Swal;
Vue.prototype.$conference_http = AxiosInstance;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
