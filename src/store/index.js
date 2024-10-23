import Vue from 'vue';
import Vuex from 'vuex';
import { createPinia, PiniaVuePlugin } from 'pinia';
import app from './modules/app';
import keymap from './modules/keymap';
import keycodes from './modules/keycodes';
import tester from './modules/tester';

Vue.use(Vuex);
Vue.use(PiniaVuePlugin);

export const pinia = createPinia();

export default new Vuex.Store({
  modules: {
    app,
    keymap,
    keycodes,
    tester
  },
  state: {},
  mutations: {},
  actions: {}
  // strict: process.env.NODE_ENV !== 'production'
});
