import {
  localStorageSet,
  localStorageLoad,
  CONSTS
} from '@/store/localStorage';

function setDefaultConfiguratorSettings() {
  const initialConfig = {
    version: CONSTS.configuratorSettingsVersion,
    darkmodeEnabled: false,
    favoriteKeyboard: '',
    favoriteColor: ''
  };
  localStorageSet(CONSTS.configuratorSettings, JSON.stringify(initialConfig));
  return initialConfig;
}

function loadSettings() {
  try {
    let conf = JSON.parse(localStorageLoad(CONSTS.configuratorSettings));
    if (!conf) {
      return setDefaultConfiguratorSettings();
    }
    return conf;
  } catch {
    return setDefaultConfiguratorSettings();
  }
}

const state = {
  keyboard: '',
  configuratorSettings: loadSettings(),
  keyboards: [],
  appInitialized: false,
  _keyboards: [],
  layout: '',
  layouts: {},
  keymapName: '',
  compileDisabled: false,
  isPreview: false,
  previewRequested: false,
  jobID: '',
  enableDownloads: false,
  firmwareBinaryURL: [],
  firmwareSourceURL: [],
  firmwareFile: '',
  keymapSourceURL: [],
  filter: '',
  keypressListener: undefined,
  showSpinner: false,
  spinnerMsg: '',
  message: '',
  settingsPanelVisible: false,
  author: '',
  notes: '',
  tutorialEnabled: false,
  electron: false,
  languages: [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' },
    { value: 'es', label: 'Español' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ru', label: 'Русский' },
    { value: 'pt-BR', label: 'Brasileira' },
    { value: 'pl-PL', label: 'Polski' },
    { value: 'ms', label: 'Bahasa Malaysia' }
  ],
  snowflakes: false
};

export default {
  ...state
};
