import axios from 'axios';
import escape from 'lodash/escape';
import { backend_readme_url_template } from './constants';

const state = {
  message: '',
  scrollToLatest: false
};
const getters = {
  message: state => state.message,
  empty: state => state.message === '',
  scrollToLatest: state => state.scrollToLatest
};
const actions = {
  scrollToEnd({ commit }) {
    // signal scroll buffer to lastest message
    commit('startScroll');
  },
  viewReadme({ commit }, _keyboard) {
    return axios
      .get(backend_readme_url_template({ keyboard: _keyboard }))
      .then(result => {
        if (result.status === 200) {
          commit('append', escape(result.data));
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
