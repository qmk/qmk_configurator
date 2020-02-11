import axios from 'axios';
import isUndefined from 'lodash/isUndefined';
import { backend_keyboards_url } from '@/store/modules/constants';
import { getPreferredLayout, getExclusionList } from '@/jquery';
import { localStorageSet, CONSTS } from '@/store/localStorage';

const steno_keyboards = ['gergo', 'georgi'];

const actions = {
  /**
   * fetchKeyboards - fetch keyboard list from API
   */
  async fetchKeyboards({ commit }) {
    const r = await axios.get(backend_keyboards_url);
    if (r.status === 200) {
      const exclude = getExclusionList();
      const results = r.data.filter(keeb => {
        return isUndefined(exclude[keeb]);
      });
      commit('setKeyboards', results);
      return results;
    }
    return [];
  },
  /**
   * load the default keymap for the currently selected keyboard
   */
  loadDefaultKeymap({ state }) {
    const keyboardPath = state.keyboard.slice(0, 1);
    // eslint-disable-next-line
    const keyboardName = state.keyboard.replace(/\//g, '_');
    return axios
      .get(`keymaps/${keyboardPath}/${keyboardName}_default.json`)
      .then(r => {
        if (r.status === 200) {
          return r.data;
        }
      });
  },
  /**
   * load keymap from the selected URL
   */
  loadKeymapFromUrl(_, url) {
    return axios.get(url).then(r => {
      return r.data;
    });
  },
  /**
   *  changeKeyboard - change the keyboard state
   *  @param {object} internal store state
   *  @param {string} keyboard new keyboard we are switching to
   *  @return {object} promise that will be fulfilled once action is complete
   */
  changeKeyboard({ state, commit, dispatch }, keyboard) {
    const store = this;
    let clearKeymap = false;
    const promise = new Promise(resolve => {
      commit('disablePreview');
      commit('enableCompile');
      if (state.keyboard !== keyboard) {
        // wait until the layouts have loaded to clear the
        // keymap to get the correct number of positions.
        clearKeymap = true;
      }
      commit('setKeyboard', keyboard);
      const oldLayout = state.layout || '';
      commit('setLayout', undefined);
      dispatch('loadLayouts').then(() => {
        let nextLayout = getPreferredLayout(state.layouts);
        // eslint-disable-next-line
        console.info(getPreferredLayout(state.layouts));
        if (oldLayout && !isUndefined(state.layouts[oldLayout])) {
          nextLayout = oldLayout;
        }
        commit('setLayout', nextLayout);

        // enable and disable steno in keycode UI
        const stenoCheck = steno_keyboards.reduce((acc, keeb) => {
          return { [keeb]: true };
        }, {});
        if (stenoCheck[keyboard]) {
          this.commit('keycodes/enableSteno');
        } else {
          this.commit('keycodes/disableSteno');
        }

        if (clearKeymap) {
          store.commit('keymap/clear');
        }

        resolve();
      });
    });
    return promise;
  },
  /**
   * loadLayouts
   * @param {object} internal store state.
   * @param {object} preview object containing layout data.
   *                 We use this instead of loading layout from API.
   * @return {object} promise that is fulfilled once action is complete
   */
  loadLayouts({ commit, state }, preview) {
    if (!isUndefined(preview)) {
      preview.layouts['  '] = { layout: [] };
      let p = new Promise(resolve => {
        let fake = {
          keyboards: {}
        };
        fake.keyboards[state.keyboard] = preview;
        commit('processLayouts', fake);
        resolve(preview);
      });
      return p;
    }
    return axios
      .get(backend_keyboards_url + '/' + state.keyboard)
      .then(resp => {
        commit('processLayouts', resp);
        return resp;
      });
  },
  saveConfiguratorSettings({ state }) {
    localStorageSet(
      CONSTS.configuratorSettings,
      JSON.stringify(state.configuratorSettings)
    );
  },
  async changeLanguage({ dispatch, commit }, lang) {
    // This throws an error because of the mutation of the store
    // i18n does not provide any workaround for this situation
    this.$i18n.locale = lang;
    commit('setCurrentLanguage', lang);
    await dispatch('saveConfiguratorSettings');
  },
  // if init state we just load and not toggling
  async toggleDarkMode({ commit, state, dispatch }, init) {
    let darkStatus = state.configuratorSettings.darkmodeEnabled;
    if (!init) {
      darkStatus = !darkStatus;
    }
    if (darkStatus) {
      document.getElementsByTagName('html')[0].dataset.theme = 'dark';
    } else {
      document.getElementsByTagName('html')[0].dataset.theme = '';
    }
    commit('setDarkmode', darkStatus);
    await dispatch('saveConfiguratorSettings');
  },
  async setFavoriteKeyboard({ commit, dispatch }, keyboard) {
    commit('setFavoriteKeyboard', keyboard);
    await dispatch('saveConfiguratorSettings');
  },
  async setFavoriteColor({ commit, dispatch }, color) {
    commit('setFavoriteColor', color);
    await dispatch('saveConfiguratorSettings');
  },
  async loadApplicationState({ commit, dispatch }) {
    console.log('loadApplicationState Start');
    await dispatch('fetchKeyboards');
    await dispatch('loadFavoriteKeyboard');
    await dispatch('toggleDarkMode', true);
    await dispatch('loadLanguage');
    console.log('loadApplicationState End');
    commit('setAppInitialized', true);
  },
  loadLanguage({ state }) {
    if (
      state.configuratorSettings.language &&
      this.$i18n.locale !== state.configuratorSettings.language
    ) {
      this.$i18n.locale = state.configuratorSettings.language;
    } else {
      state.configuratorSettings.language = this.$i18n.locale;
    }
  },
  async loadFavoriteKeyboard({ dispatch, state, getters, commit }) {
    if (state.configuratorSettings.favoriteKeyboard) {
      if (
        getters.validateKeyboard(state.configuratorSettings.favoriteKeyboard)
      ) {
        console.info(
          `setKeyboard ${state.configuratorSettings.favoriteKeyboard}`
        );
        commit('setKeyboard', state.configuratorSettings.favoriteKeyboard);
      } else {
        console.info(
          'Invalid keyboard favorited. Removing setting from local storage'
        );
        commit('setFavoriteKeyboard', '');
        await dispatch('saveConfiguratorSettings');
      }
    }
  }
};

export default {
  ...actions
};
