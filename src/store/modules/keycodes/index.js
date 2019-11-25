import isUndefined from 'lodash/isUndefined';
import ansi from './ansi';
import iso_jis from './iso-jis';
import quantum from './quantum';
import settings from './kb-settings';
import media from './app-media-mouse';
import steno from './steno';
const state = {
  keycodes: [...ansi, ...iso_jis, ...quantum, ...settings, ...media],
  searchFilter: '',
  searchCounters: {
    ANSI: 0,
    'ISO/JIS': 0,
    Quantum: 0,
    KeyboardSettings: 0,
    AppMediaMouse: 0
  }
};

const getters = {
  keycodes: state => state.keycodes,
  lookupKeyPressCode: (state, getters) => searchTerm =>
    getters.lookupKeycode(searchTerm, true),
  lookupKeycode: state => (searchTerm, isKeys = false) => {
    var found = state.keycodes.find(({ code, keys }) => {
      return code === searchTerm || (isKeys && keys && keys === searchTerm);
    });
    return found;
  }
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
  enableSteno(state) {
    state.keycodes = [
      ...ansi,
      ...iso_jis,
      ...quantum,
      ...settings,
      ...media,
      ...steno
    ];
  },
  disableSteno(state) {
    state.keycodes = [...ansi, ...iso_jis, ...quantum, ...settings, ...media];
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
