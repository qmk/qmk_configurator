import { defineStore } from 'pinia';
import isUndefined from 'lodash/isUndefined';
import store from '@/store';
import keymapExtras from '@/i18n/keymap_extras';

import ansi from './modules/keycodes/ansi';
import iso_jis from './modules/keycodes/iso-jis';
import quantum from './modules/keycodes/quantum';
import settings from './modules/keycodes/kb-settings';
import media from './modules/keycodes/app-media-mouse';
import steno from './modules/keycodes/steno';

const keycodePickerTabLayout = {
  ANSI_ISO: [...ansi, ...iso_jis],
  ISO_ANSI: [...iso_jis, ...ansi],
  special: [...quantum, ...settings, ...media]
};

function getOSKeyboardLayout() {
  let osKeyboardLayout = store.getters['app/osKeyboardLayout'];
  if (
    isUndefined(osKeyboardLayout) ||
    !Object.keys(keymapExtras).includes(osKeyboardLayout)
  ) {
    const fallbackOSKeyboardLayout = 'keymap_us';
    console.log(
      `The stored OS keyboard layout value (${osKeyboardLayout}) is not a valid value! Falling back to '${fallbackOSKeyboardLayout}'.`
    );
    store.commit('app/setOSKeyboardLayout', fallbackOSKeyboardLayout);
    osKeyboardLayout = fallbackOSKeyboardLayout;
  }
  return osKeyboardLayout;
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
  store.commit('app/setIso', !isANSI());
  const keycodes = [
    ...(isANSI()
      ? keycodePickerTabLayout.ANSI_ISO
      : keycodePickerTabLayout.ISO_ANSI),
    ...keycodePickerTabLayout.special,
    ...(isSteno ? steno : [])
  ];
  const { keycodeLUT } = keymapExtras[getOSKeyboardLayout()];
  return keycodes.map((keycodeObject) =>
    toLocaleKeycode(keycodeLUT, keycodeObject)
  );
}

function countMatches(filter, collection) {
  filter = filter.toUpperCase();
  return collection.reduce((matchCount, { code, name, title }) => {
    if (!isUndefined(code)) {
      if (
        code.includes(filter) ||
        (name && name.toUpperCase().includes(filter)) ||
        (title && title.toUpperCase().includes(filter))
      ) {
        matchCount += 1;
      }
    }
    return matchCount;
  }, 0);
}

export const useKeycodesStore = defineStore('keycodes', {
  state: () => ({
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
  }),
  getters: {
    lookupKeyPressCode: () => (searchTerm) =>
      this.lookupKeycode(searchTerm, true),
    lookupKeycode:
      (state) =>
      (searchTerm, isKeys = false) =>
        state.keycodes.find(
          ({ code, keys }) =>
            code === searchTerm || (isKeys && keys && keys === searchTerm)
        )
  },
  actions: {
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
  }
});
