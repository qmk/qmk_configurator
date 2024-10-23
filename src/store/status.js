import { defineStore } from 'pinia';
import axios from 'axios';
import { backend_readme_url_template } from './modules/constants';
import { escape } from 'lodash';

export const useStatusStore = defineStore('status', {
  state: () => ({
    message: '',
    scrollToLatest: false,
    deferredMessage: ''
  }),
  getters: {
    empty: (state) => state.message === ''
  },
  actions: {
    /**
     * Signal scroll buffer to latest message.
     */
    scrollToEnd() {
      this.scrollToLatest = true;
    },
    /**
     * clear the message buffer.
     */
    clearStatus() {
      this.message = '';
    },
    /**
     * Append string to message buffer.
     * @param {string} message - message to append
     */
    append(message) {
      this.message += message;
    },
    doneScroll() {
      this.scrollToLatest = false;
    },
    /**
     * Add a deferred message to be appended to end of message buffer at render time.
     * @param {string} dmsg - a differed message
     */
    deferredMessage(dmsg) {
      this.deferredMessage = dmsg;
    },
    /**
     * viewReadme file for keyboard.
     * @async
     * @param {string} keyboard - unique id of keyboard
     * @returns Promise<Axios>
     */
    async viewReadme(keyboard) {
      return axios
        .get(backend_readme_url_template({ keyboard: keyboard }))
        .then((result) => {
          if (result.status === 200) {
            this.message = `${escape(result.data)}${this.deferredMessage}`;
            this.deferredMessage = '';
            this.scrollToEnd();
          }
        });
    }
  }
});
