import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import StatusBar from '@/components/StatusBar';
import Veil from '@/components/Veil';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueSlideoutPanel from 'vue2-slideout-panel';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

import messages from '@/i18n';

const i18n = new VueI18n({
  locale: window.navigator.language.slice(0, 2),
  fallbackLocale: 'en',
  messages
});

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDownload,
  faUpload,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faExclamationTriangle,
  faCog,
  faKeyboard,
  faChevronLeft,
  faPrint
} from '@fortawesome/free-solid-svg-icons';
import {
  faApple,
  faWindows,
  faLinux
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ga from './ga';

Vue.component('Veil', Veil);
Vue.component('v-select', vSelect);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueSlideoutPanel);

library.add(faDownload);
library.add(faUpload);
library.add(faArrowUp);
library.add(faArrowDown);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faApple);
library.add(faWindows);
library.add(faLinux);
library.add(faCog);
library.add(faKeyboard);
library.add(faExclamationTriangle);
library.add(faChevronLeft);
library.add(faPrint);

ga.init(router);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

new Vue({
  render: h => h(StatusBar)
}).$mount('#status-app');
