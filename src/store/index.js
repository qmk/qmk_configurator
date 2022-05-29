import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import keymap from './modules/keymap';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    keymap
  },
  state: {},
  mutations: {},
  actions: {},
  strict: process.env.NODE_ENV !== 'production'
});
