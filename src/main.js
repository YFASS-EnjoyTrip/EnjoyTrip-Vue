import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/common.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret,
  faBookmark,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 23.05.23 Vue 토스트를 위한 추가
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

library.add(faUserSecret, faBookmark, faPenToSquare, faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(Toast);
Vue.prototype.$toast = Toast;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
