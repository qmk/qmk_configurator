import {
  localStorageSet,
  localStorageLoad,
  CONSTS
} from '@/store/localStorage';

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
    'keymap_belgian',
    'keymap_bepo',
    'keymap_brazilian_abnt2',
    'keymap_canadian_multilingual',
    'keymap_colemak',
    'keymap_croatian',
    'keymap_czech',
    'keymap_danish',
    'keymap_dvorak_fr',
    'keymap_dvorak',
    'keymap_dvorak_programmer',
    'keymap_estonian',
    'keymap_finnish',
    'keymap_french_afnor',
    'keymap_french',
    'keymap_french_mac_iso',
    'keymap_german',
    'keymap_greek',
    'keymap_hebrew',
    'keymap_hungarian',
    'keymap_icelandic',
    'keymap_irish',
    'keymap_italian',
    'keymap_italian_mac_ansi',
    'keymap_italian_mac_iso',
    'keymap_japanese',
    'keymap_korean',
    'keymap_latvian',
    'keymap_lithuanian_azerty',
    'keymap_lithuanian_qwerty',
    'keymap_neo2',
    'keymap_norman',
    'keymap_norwegian',
    'keymap_polish',
    'keymap_portuguese',
    'keymap_portuguese_mac_iso',
    'keymap_romanian',
    'keymap_russian',
    'keymap_serbian',
    'keymap_serbian_latin',
    'keymap_slovak',
    'keymap_slovenian',
    'keymap_spanish_dvorak',
    'keymap_spanish',
    'keymap_swedish',
    'keymap_swedish_mac_ansi',
    'keymap_swedish_mac_iso',
    'keymap_swedish_pro_mac_ansi',
    'keymap_swedish_pro_mac_iso',
    'keymap_swiss_de',
    'keymap_swiss_fr',
    'keymap_turkish_f',
    'keymap_turkish_q',
    'keymap_uk',
    'keymap_ukrainian',
    'keymap_us_extended',
    'keymap_us_international',
    'keymap_us_international_linux',
    'keymap_us',
    'keymap_workman',
    'keymap_workman_zxcvm'
  ],
  snowflakes: false
};

export default {
  ...state
};
