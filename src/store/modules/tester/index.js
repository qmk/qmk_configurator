import defaults from '../config';
import keys from 'lodash/keys';
import Vue from 'vue';
import qmkToPos from './qmk';
import codeToPos from './codeToPos';
import layouts from './layouts';
import isUndefined from 'lodash/isUndefined';
import { useKeycodesStore } from '../../keycodes';

function reduceCodeToPos(arr) {
  // Create look up table for Browser Code to Layout position
  return arr.reduce((acc, code, idx) => {
    acc[code] = idx;
    return acc;
  }, {});
}

const codeToPosition = {
  ANSI: reduceCodeToPos(codeToPos.ANSI),
  ISO: reduceCodeToPos(codeToPos.ISO)
};

function getDefaultLayout() {
  const userLang = navigator.language || navigator.userLanguage;
  let layout = 'ANSI';
  if (userLang.toLowerCase().indexOf('en') < 0) {
    layout = 'ISO';
  }
  return layout;
}

const state = {
  defaults,
  codeToPosition,
  config: Object.assign({}, defaults),
  layout: getDefaultLayout(),
  keymap: {},
  layouts: {
    ISO: layouts.ISO,
    ANSI: layouts.ANSI
  },
  chatterDetected: false
};

const getters = {
  availableLayouts(state) {
    return keys(state.layouts).sort();
  },
  getQMKCode(state) {
    return (pos) => {
      if (isUndefined(pos)) {
        return '';
      }
      return state.keymap[state.layout][pos].code;
    };
  },
  activeKeymap(state) {
    return state.keymap[state.layout];
  },
  activeLayoutMeta(state) {
    return state.layouts[state.layout];
  },
  codeToPosition(state) {
    return state.codeToPosition[state.layout];
  }
};

function mapKeymap(store, arr) {
  // Create look up table for QMK Code to Layout position
  const keycodesStore = useKeycodesStore();
  return arr.map((code) => {
    const meta = keycodesStore.lookupKeycode(code);
    return {
      ...meta
    };
  });
}

const actions = {
  init({ state, commit }) {
    const store = this;
    commit('setKeymap', {
      ANSI: mapKeymap(store, qmkToPos.ANSI),
      ISO: mapKeymap(store, qmkToPos.ISO)
    });
    return state.keymap;
  }
};

const mutations = {
  setLayout(state, layout) {
    state.layout = layout;
  },
  setKeymap(state, keymap) {
    state.keymap = keymap;
  },
  setActive(state, { pos }) {
    Vue.set(state.keymap[state.layout][pos], 'active', true);
    Vue.set(state.keymap[state.layout][pos], 'detected', false);
  },
  setDetected(state, { pos }) {
    Vue.set(state.keymap[state.layout][pos], 'active', false);
    Vue.set(state.keymap[state.layout][pos], 'detected', true);
  },
  setChatterDetected(state, { pos }) {
    state.chatterDetected = true;
    Vue.set(state.keymap[state.layout][pos], 'chatter', true);
  },
  reset(state) {
    state.chatterDetected = false;
    state.keymap[state.layout].forEach((v, idx) => {
      Vue.set(state.keymap[state.layout][idx], 'detected', false);
      Vue.set(state.keymap[state.layout][idx], 'chatter', false);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
