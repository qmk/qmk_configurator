import axios from 'axios';
import escape from 'lodash/escape';
import { backend_readme_url_template } from './constants';

const state = {
  message: '',
  scrollToLatest: false,
  deferredMessage: ''
};
const getters = {
  message: (state) => state.message,
  empty: (state) => state.message === '',
  scrollToLatest: (state) => state.scrollToLatest
};
const actions = {
  scrollToEnd({ commit }) {
    // signal scroll buffer to lastest message
    commit('startScroll');
  },
  viewReadme({ state, commit, dispatch }, _keyboard) {
    return axios
      .get(backend_readme_url_template({ keyboard: _keyboard }))
      .then((result) => {
        if (result.status === 200) {
          commit('clear');
          commit('append', escape(result.data));
          commit('append', escape(state.deferredMessage));
          commit('deferredMessage', '');
          dispatch('scrollToEnd');
        }
      });
  }
};
const mutations = {
  clear(state) {
    state.message = '';
  },
  append(state, message) {
    state.message += message;
  },
  doneScroll(state) {
    state.scrollToLatest = false;
  },
  startScroll(state) {
    state.scrollToLatest = true;
  },
  deferredMessage(state, dmsg) {
    state.deferredMessage = dmsg;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
