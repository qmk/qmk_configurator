import {
  localStorageSet,
  localStorageLoad,
  CONSTS
} from '@/store/localStorage';

function setDefaultConfiguratorSettings() {
  // detect if OS supports dark mode and set as default
  const osDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialConfig = {
    version: CONSTS.configuratorSettingsVersion,
    darkmodeEnabled: osDarkMode,
    favoriteKeyboard: '',
    favoriteColor: '',
    clearLayerDefault: false,
    iso: false,
    osKeyboardLayout: 'keymap_us'
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
  keyboardMeta: {},
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
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
    { value: 'ms', label: 'Bahasa Malaysia' },
    { value: 'pl-PL', label: 'Polski' },
    { value: 'pt-BR', label: 'Português brasileiro' },
    { value: 'ru', label: 'Русский' },
    { value: 'ja', label: '日本語' },
    { value: 'zh-CN', label: '简体中文' }
  ],
  osKeyboardLayouts: [
    // The labels are translatable strings
    'keymap_us',
    'keymap_uk',
    'keymap_german',
    'keymap_russian'
  ],
  snowflakes: false
};

export default {
  ...state
};
