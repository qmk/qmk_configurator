import { localStorageLoad, CONSTS } from '@/store/localStorage';
import osKeyboardLayouts from '@/os_keyboard_layouts';

function getDefaultConfiguratorSettings() {
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
  return initialConfig;
}

function loadSettings() {
  try {
    // Locally stored configuratorSettings can miss properties that were added in a new update,
    // so it is important to merge them with the default configurator settings to ensure that all
    // settings are set.
    let conf = {
      ...getDefaultConfiguratorSettings(),
      ...JSON.parse(localStorageLoad(CONSTS.configuratorSettings))
    };
    return conf;
  } catch {
    return getDefaultConfiguratorSettings();
  }
}

const state = {
  keyboard: '',
  keyboardMeta: {},
  configuratorSettings: loadSettings(),
  keyboards: [], // current filtered view keyboards
  appInitialized: false,
  _keyboards: [], // upstream source list of keyboards
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
    { value: 'zh-CN', label: '简体中文' },
    { value: 'zh-TW', label: '繁體中文(台灣)' },
    { value: 'zh-HK', label: '繁體中文(香港)' }
  ],
  legends: 'keymap',
  legendTypes: ['keymap', 'matrix', 'index', 'size'],
  osKeyboardLayouts,
  snowflakes: false
};

export default state;
