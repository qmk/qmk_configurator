import store from './store';

export default {
  init() {
    store.commit('app/enableElectron')

    //We use the Bridge as a way to share functions between electron and vue
    window.Bridge.statusAppend = txt => {
      txt = '\n' + txt;
      store.commit('status/append', txt);
      store.dispatch('status/scrollToEnd');
    };
  }
};
