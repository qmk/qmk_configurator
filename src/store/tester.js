import { defineStore } from 'pinia';
import defaults from '../config';
import codeToPos from './modules/tester/codeToPos';
import layouts from './modules/tester/layouts';
import { isUndefined } from 'lodash';

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

export const useStore = defineStore('tester', {
  state: () => ({
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
  }),
  getters: {
    availableLayouts(state) {
      return Object.keys(state.layouts.sort());
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
    },
    actions: {}
  }
});
