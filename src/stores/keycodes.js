import Vue from 'vue';
import { defineStore } from 'pinia';
import isUndefined from 'lodash/isUndefined';
import {
  ansi,
  iso_jis,
  quantum,
  settings,
  media,
  steno
} from './keycodes/index.js';
import store from '@/store';

const keycodeLayout = {
  ANSI: [...ansi, ...iso_jis],
  ISO: [...iso_jis, ...ansi],
  normal: [...quantum, ...settings, ...media]
};

function isISO() {
  return store.state.app.configuratorSettings.iso;
}

function generateKeycodes(isIso, isSteno) {
  const keycodes = [
    ...(isIso ? keycodeLayout.ISO : keycodeLayout.ANSI),
    ...keycodeLayout.normal,
    ...(isSteno ? steno : [])
  ];
  return keycodes;
}

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

export const useKeycodesStore = defineStore('keycodes', {
  state() {
    return {
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
  },
  getters: {
    getKeycodes: (state) => state.keycodes,
    lookupKeyPressCode: (state, getters) => (searchTerm) =>
      getters.lookupKeycode(searchTerm, true),
    lookupKeycode:
      (state) =>
      (searchTerm, isKeys = false) =>
        state.keycodes.find(
          ({ code, keys }) =>
            code === searchTerm || (isKeys && keys && keys === searchTerm)
        )
  },
  actions: {
    changeActive(newActive) {
      this.active = newActive;
    },
    enableSteno() {
      this.steno = true;
      this.keycodes = generateKeycodes(isISO(), this.steno);
    },
    disableSteno() {
      this.steno = false;
      this.keycodes = generateKeycodes(isISO(), this.steno);
    },
    enableIso() {
      this.keycodes = generateKeycodes(isISO(), this.steno);
      if (this.active === 'ANSI') {
        this.active = 'ISO/JIS';
      }
    },
    disableIso() {
      this.keycodes = generateKeycodes(isISO(), this.steno);
      if (this.active === 'ISO/JIS') {
        this.active = 'ANSI';
      }
    },
    setSearchFilter(newVal) {
      this.searchFilter = newVal;
      if (this.searchFilter !== '') {
        this.searchCounters = {
          ANSI: countMatches(this.searchFilter, ansi),
          'ISO/JIS': countMatches(this.searchFilter, iso_jis),
          Quantum: countMatches(this.searchFilter, quantum),
          KeyboardSettings: countMatches(this.searchFilter, settings),
          AppMediaMouse: countMatches(this.searchFilter, media)
        };
      }
    }
  }
});
