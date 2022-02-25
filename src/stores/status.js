import Vue from 'vue';
import axios from 'axios';
import escape from 'lodash/escape';
import { backend_readme_url_template } from '../store/modules/constants';
import { defineStore } from 'pinia';

export const useStatusStore = defineStore('status', {
  state: () => ({
    messages: [],
    scrollToLatest: false,
    deferredMessage: ''
  }),
  getters: {
    messageStr(state) {
      return state.messages.join('');
    },
    empty(state) {
      return state.messages.length === 0;
    }
  },
  actions: {
    scrollToEnd() {
      // signal scroll buffer to lastest message
      this.startScroll();
    },
    async viewReadme(_keyboard) {
      return axios
        .get(backend_readme_url_template({ keyboard: _keyboard }))
        .then((result) => {
          if (result.status === 200) {
            this.clear();
            this.append(escape(result.data));
            this.append(escape(this.deferredMessage));
            // this.setDeferredMessage('');
            this.scrollToEnd();
          }
        });
    },
    clear() {
      Vue.set(this, 'messages', []);
    },
    append(msg) {
      Vue.set(this, 'messages', this.messages.concat(msg));
    },
    doneScroll() {
      this.scrollToLatest = false;
    },
    startScroll() {
      this.scrollToLatest = true;
    },
    setDeferredMessage(state, dmsg) {
      this.deferredMessage = dmsg;
    }
  }
});
