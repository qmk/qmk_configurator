import defaults from './config';
import keys from 'lodash/keys';
import isUndefined from 'lodash/isUndefined';
import Vue from 'vue';

import { qmkToPos, codeToPos, layouts } from './tester/index';

import { useKeycodesStore } from '@/stores/keycodes';
import { defineStore } from 'pinia';

const ACTIVE = 'active';
const DETECTED = 'detected';
const CHATTER = 'chatter';

function reduceCodeToPos(arr) {
  // Create look up table for Browser Code to Layout position
  return arr.reduce((acc, code, idx) => {
    acc[code] = idx;
    return acc;
  }, {});
}

const _codeToPosition = {
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

function mapKeymap(arr) {
  // Create look up table for QMK Code to Layout position
  return arr.map((code) => {
    const keycodesStore = useKeycodesStore();
    const meta = keycodesStore.lookupKeycode(code);
    return {
      ...meta
    };
  });
}

export const useTesterStore = defineStore('tester', {
  state() {
    return {
      defaults,
      _codeToPosition,
      config: Object.assign({}, defaults),
      layout: getDefaultLayout(),
      keymap: {},
      layouts: {
        ISO: layouts.ISO,
        ANSI: layouts.ANSI
      },
      chatterDetected: false
    };
  },
  getters: {
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
      return state._codeToPosition[state.layout];
    }
  },
  actions: {
    init() {
      this.setKeymap({
        ANSI: mapKeymap(qmkToPos.ANSI),
        ISO: mapKeymap(qmkToPos.ISO)
      });
      return this.keymap;
    },
    setLayout(layout) {
      this.layout = layout;
    },
    setKeymap(keymap) {
      this.keymap = keymap;
    },
    setActive({ pos }) {
      Vue.set(this.keymap[this.layout][pos], ACTIVE, true);
      Vue.set(this.keymap[this.layout][pos], DETECTED, false);
    },
    setDetected({ pos }) {
      Vue.set(this.keymap[this.layout][pos], ACTIVE, false);
      Vue.set(this.keymap[this.layout][pos], DETECTED, true);
    },
    setChatterDetected({ pos }) {
      this.chatterDetected = true;
      Vue.set(this.keymap[this.layout][pos], DETECTED, true);
    },
    reset() {
      this.chatterDetected = false;
      this.keymap[this.layout].forEach((v, idx) => {
        Vue.set(this.keymap[this.layout][idx], DETECTED, false);
        Vue.set(this.keymap[this.layout][idx], CHATTER, false);
      });
    }
  }
});
