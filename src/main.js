import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store, { pinia } from './store';
import StatusBar from '@/components/StatusBar.vue';
import BrowserWarn from '@/components/BrowserWarn.vue';
import Veil from '@/components/Veil.vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueSlideoutPanel from 'vue2-slideout-panel';
import VueI18n from 'vue-i18n';
import VTooltip from 'v-tooltip';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/montserrat/400.css';

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
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBackward,
  faBars,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCloudUploadAlt,
  faCog,
  faDownload,
  faEject,
  faExclamationTriangle,
  faFastBackward,
  faFastForward,
  faForward,
  faHatWizard,
  faKeyboard,
  faMagic,
  faMoon,
  faPlay,
  faPowerOff,
  faPrint,
  faQuestionCircle,
  faSearch,
  faStar,
  faStop,
  faTimes,
  faTrash,
  faUndo,
  faUpload,
  faVolumeDown,
  faVolumeMute,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import {
  faApple,
  faGithub,
  faLinux,
  faWindows
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
) {
  electron.init(); // initializes code specific for the electron app
}

Vue.component('VeilComponent', Veil);
Vue.component('VSelect', vSelect);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.use(VueSlideoutPanel);

const icons = [
  faApple,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBackward,
  faBars,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCloudUploadAlt,
  faCog,
  faDownload,
  faEject,
  faExclamationTriangle,
  faFastBackward,
  faFastForward,
  faForward,
  faGithub,
  faHatWizard,
  faKeyboard,
  faLinux,
  faMagic,
  faMoon,
  faPlay,
  faPowerOff,
  faPrint,
  faQuestionCircle,
  faSearch,
  faStar,
  faStop,
  faTimes,
  faTrash,
  faUndo,
  faUpload,
  faVolumeDown,
  faVolumeMute,
  faVolumeUp,
  faWindows
];
library.add(...icons);

Vue.config.productionTip = false;

// Make $i18n vm accessible in the store
store.$i18n = i18n._vm;

new Vue({
  router,
  store,
  pinia,
  i18n,
  render: (h) => h(App)
}).$mount('#app');

new Vue({
  store,
  pinia,
  i18n,
  render: (h) => h(StatusBar)
}).$mount('#status-app');

new Vue({
  i18n,
  render: (h) => h(BrowserWarn)
}).$mount('#browser-warn-container');
