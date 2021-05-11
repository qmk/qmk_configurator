import { createApp, h } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import StatusBar from '@/components/StatusBar';
import BrowserWarn from '@/components/BrowserWarn';
import Veil from '@/components/Veil';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueSlideoutPanel from 'vue2-slideout-panel';
import VueI18n from 'vue-i18n';
import VTooltip from 'v-tooltip';

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

localVue.use(VueSlideoutPanel);

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

// Make $i18n vm accessible in the store
store.$i18n = i18n._vm;

localVue.use(VTooltip);

createApp({
  i18n,
  render: () => h(App)
})
  .use(router)
  .use(store)
  .use(VueI18n)
  .component('Veil', Veil)
  .component('v-select', vSelect)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app', { localVue });

createApp({
  i18n,
  render: () => h(StatusBar)
})
  .use(store)
  .use(VueI18n)
  .mount('#status-app');

createApp({
  i18n,
  render: () => h(BrowserWarn)
})
  .use(VueI18n)
  .mount('#browser-warn-container');
