import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';
//import '../node_modules/bulma/css/bulma.css';
import Buefy from 'buefy';
//import 'buefy/dist/buefy.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
//import { faHeadSideMask } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueGeolocation from 'vue-browser-geolocation';

//library.add(faHeadSideMask)
library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon)

require("../vue.config.js");

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
  customIconPacks: {
    fas: {
      sizes: {
        default: "lg",
        "is-small": "1x",
        "is-medium": "2x",
        "is-large": "3x"
      },
      iconPrefix: ""
    }
  }
});




Vue.use(VueGeolocation);

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
const jwtToken = localStorage.getItem('token');
if(jwtToken){
   Vue.prototype.$http.defaults.headers.common['Authorization'] = jwtToken;
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

