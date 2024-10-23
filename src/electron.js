import store from './store';
import { useStatusStore } from './store/status';

export default {
  init() {
    //We use the Bridge as a way to share functions between electron and vue
    const statusStore = useStatusStore();
    if (window.Bridge) {
      store.commit('app/enableElectron');
      window.Bridge.statusAppendNoLF = (txt) => {
        statusStore.append(`${txt}`);
        statusStore.scrollToEnd();
      };
      window.Bridge.statusAppend = (txt) => {
        statusStore.append(`\n${txt}`);
        statusStore.scrollToEnd();
      };
    }
  }
};
