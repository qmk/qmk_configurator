import isUndefined from 'lodash/isUndefined';
import ansi from './ansi';
import iso_jis from './iso-jis';
import quantum from './quantum';
import settings from './kb-settings';
import media from './app-media-mouse';
import steno from './steno';
import store from '@/store';

const keycodeLayout = {
  ANSI: [...ansi, ...iso_jis],
  ISO: [...iso_jis, ...ansi],
  normal: [...quantum, ...settings, ...media]
};

const state = {
  keycodes: [...keycodeLayout.ANSI, ...keycodeLayout.normal],
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

function isISO() {
  return store.state.app.configuratorSettings.iso;
}

function generateKeycodes() {
  const keycodes = [
    ...(isISO() ? keycodeLayout.ISO : keycodeLayout.ANSI),
    ...keycodeLayout.normal,
    ...(state.steno ? steno : [])
  ];
  return keycodes;
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
    state.keycodes = generateKeycodes();
  },
  disableSteno(state) {
    state.steno = false;
    state.keycodes = generateKeycodes();
  },
  enableIso(state) {
    state.keycodes = generateKeycodes();
    if (state.active === 'ANSI') {
      state.active = 'ISO/JIS';
    }
  },
  disableIso(state) {
    state.keycodes = generateKeycodes();
    if (state.active === 'ISO/JIS') {
      state.active = 'ANSI';
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
