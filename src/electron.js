import store from './store';

export default {
  init() {
    //We use the Bridge as a way to share functions between electron and vue
    if (window.Bridge) {
      store.commit('app/enableElectron');
      window.Bridge.statusAppendNoLF = (txt) => {
        store.commit('status/append', `${txt}`);
        store.dispatch('status/scrollToEnd');
      };
      window.Bridge.statusAppend = (txt) => {
        store.commit('status/append', `\n${txt}`);
        store.dispatch('status/scrollToEnd');
      };
    }
  }
};
