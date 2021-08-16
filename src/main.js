import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import StatusBar from '@/components/StatusBar';
import BrowserWarn from '@/components/BrowserWarn';
import Veil from '@/components/Veil';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueSlideoutPanel from 'vue2-slideout-panel';
import VueI18n from 'vue-i18n';
import VTooltip from 'v-tooltip';

Vue.use(VueI18n);
Vue.use(VTooltip);

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
  faCloudUploadAlt,
  faKeyboard,
  faChevronLeft,
  faChevronRight,
  faPrint,
  faUndo,
  faTrash,
  faHatWizard,
  faMagic,
  faStar,
  faChevronUp,
  faSearch,
  faQuestionCircle,
  faVolumeMute,
  faVolumeUp,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import {
  faApple,
  faWindows,
  faLinux
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import electron from './electron';
// Find out if we are are running inside electon
if (
  isObject(navigator) &&
  isString(navigator.userAgent) &&
  navigator.userAgent.includes('Electron')
)
  electron.init(); // initializes code specific for the electron app

Vue.component('Veil', Veil);
Vue.component('v-select', vSelect);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueSlideoutPanel);

const icons = [
  faApple,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBars,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCloudUploadAlt,
  faCog,
  faDownload,
  faExclamationTriangle,
  faHatWizard,
  faKeyboard,
  faLinux,
  faMagic,
  faPrint,
  faSearch,
  faStar,
  faTrash,
  faUndo,
  faUpload,
  faWindows,
  faQuestionCircle,
  faVolumeUp,
  faVolumeMute
];
library.add(...icons);

Vue.config.productionTip = false;

// Make $i18n vm accessible in the store
store.$i18n = i18n._vm;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');

new Vue({
  i18n,
  store,
  render: (h) => h(StatusBar)
}).$mount('#status-app');

new Vue({
  i18n,
  render: (h) => h(BrowserWarn)
}).$mount('#browser-warn-container');
