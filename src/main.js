import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import StatusBar from '@/components/StatusBar';
import Veil from '@/components/Veil';
import vSelect from 'vue-select';

Vue.component('Veil', Veil);
Vue.component('v-select', vSelect);

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDownload,
  faUpload,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import {
  faApple,
  faWindows,
  faLinux
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faDownload);
library.add(faUpload);
library.add(faArrowUp);
library.add(faArrowDown);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faApple);
library.add(faWindows);
library.add(faLinux);
library.add(faExclamationTriangle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

new Vue({
  render: h => h(StatusBar)
}).$mount('#status-app');
