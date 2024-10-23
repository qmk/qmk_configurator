import { defineStore } from 'pinia';
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
     * @param {string} dmsg - a deferred message
     */
    setDeferredMessage(dmsg) {
      this.deferredMessage = dmsg;
    },
    /**
     * viewReadme file for keyboard.
     * @async
     * @param {string} keyboard - unique id of keyboard
     * @returns Promise<Axios>
     */
    async viewReadme(keyboard) {
      return fetch(backend_readme_url_template({ keyboard: keyboard })).then(
        async (response) => {
          if (response.ok) {
            const description = await response.text();
            this.message = `${escape(description)}${escape(
              this.deferredMessage
            )}`;
            this.deferredMessage = '';
            this.scrollToEnd();
          }
        }
      );
    }
  }
});
