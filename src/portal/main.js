// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios';
import swal from 'sweetalert2';
// Plugins
import VueSession from 'vue-session'
import Cookies from "js-cookie";
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes/routes';
import fullscreen from 'vue-fullscreen';
import api_calls from "@/portal/api_calls";
import GAuth from 'vue-google-oauth2'
import { tlt, change_locale_language, api_status_code } from "@/portal/mixins";
import store from './store';


export const bus = new Vue()
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueSession, {
  persist: true
})
Vue.use(fullscreen);
Vue.mixin(tlt); //Method to translate Text
Vue.mixin(change_locale_language);
Vue.mixin(api_status_code);

/* eslint-disable no-new */

const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
let user_login_type;
var cookieArr = document.cookie.split(";");
for(var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if("login_type" == cookiePair[0].trim()) {
      user_login_type = decodeURIComponent(cookiePair[1])
    }
}
router.beforeEach((to, from, next) => {
  axios.get(api_calls.maintainence_check_endpoint(), {
    params: {
      is_get: true
    }
  })
  .then((response) => {
    if (response.data.message.MSG_CODE === 10001421){
      let under_deployment = response.data.data.under_deployment;
      if(under_deployment == true){    
        call_maintenance()
      }
    }else {
      Swal({
        title: response.data.message.MSG_CODE,
        text: response.data.message.MSG,
        showCancelButton: false,
        showConfirmButton: false,
        type: "error"
      })
    }
  }).catch(()=> {
    bus.$emit("is_maintenance_portal", true)
  })
  if((to.name=="Dashboard") &&( from.name=="Direct Response Bot") && (user_login_type=="Bot")){next({ name: 'Direct Response Bot'})}
  else {next()}
})

function call_maintenance(){
  
  bus.$emit("is_maintenance_portal", true)
}


// global library setup
const AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_LIVE_CHAT_END_POINT,
});

const Swal = swal;

Vue.prototype.$swal = Swal;
Vue.prototype.$conference_http = AxiosInstance;

const gauthOption = {
  clientId: process.env.VUE_APP_G_AUTH,
  // clientId: "313691206949-6tk4pc6dj3ok7ej50j52j8ucab092mei.apps.googleusercontent.com",
  // scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
// this.$store.dispatch("changeLanguageData")


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
