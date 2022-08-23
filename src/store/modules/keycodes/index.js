import isUndefined from 'lodash/isUndefined';
import ansi from './ansi';
import iso_jis from './iso-jis';
import quantum from './quantum';
import settings from './kb-settings';
import media from './app-media-mouse';
import steno from './steno';
import store from '@/store';
import keymapExtras from '@/i18n/keymap_extras';

const keycodePickerTabLayout = {
  ANSI_ISO: [...ansi, ...iso_jis],
  ISO_ANSI: [...iso_jis, ...ansi],
  special: [...quantum, ...settings, ...media]
};

const state = {
  keycodes: [
    ...keycodePickerTabLayout.ANSI_ISO,
    ...keycodePickerTabLayout.special
  ],
  searchFilter: '',
  searchCounters: {
    ANSI: 0,
    'ISO/JIS': 0,
    Quantum: 0,
    KeyboardSettings: 0,
    AppMediaMouse: 0
  },
  steno: false,
  active: 'ANSI'
};

function getOSKeyboardLayout() {
  const fallbackOSKeyboardLayout = 'keymap_us';
  return (
    store.state.app.configuratorSettings.osKeyboardLayout ||
    fallbackOSKeyboardLayout
  );
}

function isANSI() {
  return keymapExtras[getOSKeyboardLayout()].isANSI;
}

function toLocaleKeycode(keycodeLUT, keycodeObject) {
  console.assert(!isUndefined(keycodeLUT));
  if (
    !Object.keys(keycodeObject).includes('name') ||
    !Object.keys(keycodeObject).includes('code')
  ) {
    // Not an object describing a keyboard key; return as is
    return keycodeObject;
  }
  if (keycodeLUT[keycodeObject.code]) {
    // Clone in a shallow manner the original keycodeObject object and
    // override the name, title, and possibly other fields
    return { ...keycodeObject, ...keycodeLUT[keycodeObject.code] };
  } else {
    return keycodeObject;
  }
}

function generateKeycodes(osKeyboardLayout, isSteno) {
  store.state.app.configuratorSettings.iso = !isANSI();
  const keycodes = [
    ...(isANSI()
      ? keycodePickerTabLayout.ANSI_ISO
      : keycodePickerTabLayout.ISO_ANSI),
    ...keycodePickerTabLayout.special,
    ...(isSteno ? steno : [])
  ];
  if (!Object.keys(keymapExtras).includes(getOSKeyboardLayout())) {
    console.log(
      `${getOSKeyboardLayout()} is not a valid OS keyboard layout value!`
    );
    return keycodes;
  }
  const { keycodeLUT } = keymapExtras[getOSKeyboardLayout()];
  return keycodes.map((keycodeObject) =>
    toLocaleKeycode(keycodeLUT, keycodeObject)
  );
}

const getters = {
  keycodes: (state) => state.keycodes,
  lookupKeyPressCode: (state, getters) => (searchTerm) =>
    getters.lookupKeycode(searchTerm, true),
  lookupKeycode:
    (state) =>
    (searchTerm, isKeys = false) =>
      state.keycodes.find(
        ({ code, keys }) =>
          code === searchTerm || (isKeys && keys && keys === searchTerm)
      )
};

function countMatches(filter, collection) {
  filter = filter.toUpperCase();
  return collection.reduce((acc, { group, width, code, name, title }) => {
    if (!isUndefined(code)) {
      if (
        code.includes(filter) ||
        (name && name.toUpperCase().includes(filter)) ||
        (title && title.toUpperCase().includes(filter))
      ) {
        acc += 1;
      }
    }
    return acc;
  }, 0);
}

const actions = {};
const mutations = {
  changeActive(state, newActive) {
    state.active = newActive;
  },
  enableSteno(state) {
    state.steno = true;
    state.keycodes = generateKeycodes(getOSKeyboardLayout(), state.steno);
  },
  disableSteno(state) {
    state.steno = false;
    state.keycodes = generateKeycodes(getOSKeyboardLayout(), state.steno);
  },
  updateKeycodeNames(state) {
    state.keycodes = generateKeycodes(getOSKeyboardLayout(), state.steno);
    if (isANSI()) {
      if (state.active === 'ISO/JIS') {
        state.active = 'ANSI';
      }
    } else {
      if (state.active === 'ANSI') {
        state.active = 'ISO/JIS';
      }
    }
  },
  setSearchFilter(state, newVal) {
    state.searchFilter = newVal;
    if (this.searchFilter !== '') {
      state.searchCounters = {
        ANSI: countMatches(state.searchFilter, ansi),
        'ISO/JIS': countMatches(state.searchFilter, iso_jis),
        Quantum: countMatches(state.searchFilter, quantum),
        KeyboardSettings: countMatches(state.searchFilter, settings),
        AppMediaMouse: countMatches(state.searchFilter, media)
      };
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
