import isUndefined from 'lodash/isUndefined';
import { keypress } from 'keypress.js';
import { generateKeypressCombos } from './keypress-utils.js';
import {
  backend_keyboards_url,
  backend_keyboard_list_url
} from '@/store/modules/constants';
import { getPreferredLayout, getExclusionList } from '@/util';
import { localStorageSet, CONSTS } from '@/store/localStorage';
import { useKeycodesStore } from '../../keycodes.js';

const steno_keyboards = new Set([
  'gboards/gergo',
  'gboards/georgi',
  'stenokeyboards/the_uni/pro_micro',
  'stenokeyboards/the_uni/rp_2040',
  'stenokeyboards/the_uni/usb_c'
]);

const actions = {
  /**
   * fetchKeyboards - fetch keyboard list from API
   */
  async fetchKeyboards({ commit }) {
    try {
      const r = await fetch(backend_keyboard_list_url);
      if (r.ok) {
        const data = await r.json();
        const exclude = getExclusionList();
        const results = data.keyboards.filter((keeb) => {
          return isUndefined(exclude[keeb]);
        });
        commit('setKeyboards', results);
        return results;
      }
    } catch (error) {
      console.error('Error fetching keyboards', error);
    }
    // always return an empty array if we fail to fetch
    return [];
  },
  /**
   * load the default keymap for the currently selected keyboard
   */
  async loadDefaultKeymap({ state }) {
    const keyboardPath = state.keyboard.slice(0, 1).toLowerCase();
    const keyboardName = state.keyboard.replace(/\//g, '_');
    try {
      const resp = await fetch(
        `keymaps/${keyboardPath}/${keyboardName}_default.json`
      );
      if (resp.ok) {
        return await resp.json();
      }
    } catch (error) {
      console.error('Error fetching default keymap', error);
    }
    return undefined;
  },
  /**
   * load keymap from the selected URL
   */
  async loadKeymapFromUrl(_, url) {
    return fetch(url).then(async (r) => {
      if (r.ok) {
        return await r.json();
      }
      console.error('Error fetching keymap from URL', r.statusText);
    });
  },
  /**
   *  changeKeyboard - change the keyboard state
   *  @param {object} internal store state
   *  @param {string} keyboard new keyboard we are switching to
   *  @return {object} promise that will be fulfilled once action is complete
   */
  async changeKeyboard({ state, commit, dispatch }, keyboard) {
    const store = this;
    let clearKeymap = false;
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
    await dispatch('loadLayouts');
    let nextLayout = getPreferredLayout(state.layouts);
    console.info(getPreferredLayout(state.layouts));
    if (oldLayout && !isUndefined(state.layouts[oldLayout])) {
      nextLayout = oldLayout;
    }
    commit('setLayout', nextLayout);

    // enable and disable steno in keycode UI
    const keycodesStore = useKeycodesStore();
    if (steno_keyboards.has(keyboard)) {
      keycodesStore.enableSteno();
    } else {
      keycodesStore.disableSteno();
    }

    if (clearKeymap) {
      store.commit('keymap/clear');
    }

    return Promise.resolve();
  },
  /**
   * loadLayouts
   * @param {object} internal store state.
   * @param {object} preview object containing layout data.
   *                 We use this instead of loading layout from API.
   * @return {object} promise that is fulfilled once action is complete
   */
  async loadLayouts({ commit, state }, preview) {
    if (!isUndefined(preview)) {
      preview.layouts['  '] = { layout: [] };
      let p = new Promise((resolve) => {
        let fake = {
          keyboards: {}
        };
        fake.keyboards[state.keyboard] = preview;
        commit('setKeyboardMeta', {});
        commit('processLayouts', fake);
        resolve(preview);
      });
      return p;
    }
    const resp = await fetch(
      `${backend_keyboards_url}/${state.keyboard}/info.json`
    );
    if (resp.ok) {
      const data = await resp.json();
      commit('setKeyboardMeta', data);
      commit('processLayouts', data);
      return resp;
    }
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
  async changeOSKeyboardLayout({ dispatch, state, commit }, osLayout) {
    commit('setOSKeyboardLayout', osLayout);
    const keycodesStore = useKeycodesStore();

    // Important to call keycodesStore.updatekeycodeNames *before* keymap/updateKeycodeNames.
    keycodesStore.updateKeycodeNames();
    this.commit('keymap/updateKeycodeNames');
    keycodesStore.changeActive(
      state.configuratorSettings.iso ? 'ISO/JIS' : 'ANSI'
    );
    this.commit(
      'tester/setLayout',
      state.configuratorSettings.iso ? 'ISO' : 'ANSI'
    );
    await this.dispatch('tester/init');
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
  async toggleClearLayerDefault({ commit, state, dispatch }) {
    let status = state.configuratorSettings.clearLayerDefault;
    status = !status;
    commit('setClearLayerDefault', status);
    await dispatch('saveConfiguratorSettings');
  },
  async toggleShowBlankForUnassigned({ commit, state, dispatch }) {
    let status = state.configuratorSettings.showBlankForUnassigned;
    status = !status;
    commit('setShowBlankForUnassigned', status);
    await dispatch('saveConfiguratorSettings');
  },
  async toggleApplyDisabledStyleForUnassigned({ commit, state, dispatch }) {
    let status = state.configuratorSettings.applyDisabledStyleForUnassigned;
    status = !status;
    commit('setApplyDisabledStyleForUnassigned', status);
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
  },
  // initialize keypress.js using helper functions in ./keypress.js
  async initKeypressListener({ commit }) {
    const store = this;
    const keypressListener = new keypress.Listener();
    const keycodesStore = useKeycodesStore();
    const conf = generateKeypressCombos(store, keycodesStore.keycodes);
    keypressListener.register_many(conf);
    keypressListener.simple_combo('ctrl shift i', () => {
      if (!store.state.app.isPreview) {
        commit('requestPreview');
      }
    });
    keypressListener.simple_combo('ctrl alt n', () => {
      store.commit('keymap/nextColorway');
    });
    keypressListener.simple_combo('ctrl alt f', () => {
      store.commit('keymap/toggleContinuousInput');
    });
    keypressListener.simple_combo('ctrl alt s', () => {
      commit('toggleSettingsPanel');
    });

    commit('setKeypressListener', () => keypressListener);
  },

  /**
   * update keymapName and set/clear dirty in store
   */
  async updateKeymapName({ commit, rootState }, _keymapName) {
    const store = this;

    commit('setKeymapName', _keymapName);
    if (_keymapName !== '' && !rootState.keymap.dirty) {
      store.commit('keymap/setDirty');
    }
    if (_keymapName === '' && rootState.keymap.dirty) {
      store.commit('keymap/clearDirty');
    }
  }
};

export default actions;
