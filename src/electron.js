import store from './store';

export default {
  init() {
    store.commit('app/enableElectron');

    //We use the Bridge as a way to share functions between electron and vue
    if (window.Bridge) {
      window.Bridge.statusAppend = txt => {
        store.commit('status/append', `\n${txt}`);
        store.dispatch('status/scrollToEnd');
      };
    }
  }
};
