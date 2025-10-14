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
    // Temporary fix for HHKB JP layout
    if (state.keyboard === 'hhkb/jp') {
      const fixedLayout = {
        "keyboards": {
          "hhkb/jp": {
            "keyboard_name": "JP",
            "manufacturer": "HHKB",
            "maintainer": "qmk",
            "usb": {
              "vid": "0x4848",
              "pid": "0x0002",
              "device_version": "1.0.4"
            },
            "layouts": {
              "LAYOUT_jp": {
                "layout": [
                  {"matrix": [0, 2], "x": 0, "y": 0},
                  {"matrix": [3, 2], "x": 1, "y": 0},
                  {"matrix": [6, 2], "x": 2, "y": 0},
                  {"matrix": [2, 2], "x": 3, "y": 0},
                  {"matrix": [1, 2], "x": 4, "y": 0},
                  {"matrix": [5, 2], "x": 5, "y": 0},
                  {"matrix": [7, 2], "x": 6, "y": 0},
                  {"matrix": [10, 2], "x": 7, "y": 0},
                  {"matrix": [9, 2], "x": 8, "y": 0},
                  {"matrix": [8, 2], "x": 9, "y": 0},
                  {"matrix": [11, 2], "x": 10, "y": 0},
                  {"matrix": [14, 2], "x": 11, "y": 0},
                  {"matrix": [15, 2], "x": 12, "y": 0},
                  {"matrix": [13, 2], "x": 13, "y": 0},
                  {"matrix": [12, 2], "x": 14, "y": 0},
                  {"matrix": [0, 3], "x": 0, "y": 1, "w": 1.5},
                  {"matrix": [6, 3], "x": 1.5, "y": 1},
                  {"matrix": [2, 3], "x": 2.5, "y": 1},
                  {"matrix": [1, 3], "x": 3.5, "y": 1},
                  {"matrix": [5, 3], "x": 4.5, "y": 1},
                  {"matrix": [7, 3], "x": 5.5, "y": 1},
                  {"matrix": [10, 3], "x": 6.5, "y": 1},
                  {"matrix": [9, 3], "x": 7.5, "y": 1},
                  {"matrix": [8, 3], "x": 8.5, "y": 1},
                  {"matrix": [11, 3], "x": 9.5, "y": 1},
                  {"matrix": [14, 3], "x": 10.5, "y": 1},
                  {"matrix": [15, 3], "x": 11.5, "y": 1},
                  {"matrix": [13, 3], "x": 12.5, "y": 1},
                  {"matrix": [6, 6], "x": 0, "y": 2, "w": 1.75},
                  {"matrix": [2, 6], "x": 1.75, "y": 2},
                  {"matrix": [1, 6], "x": 2.75, "y": 2},
                  {"matrix": [5, 6], "x": 3.75, "y": 2},
                  {"matrix": [7, 6], "x": 4.75, "y": 2},
                  {"matrix": [10, 6], "x": 5.75, "y": 2},
                  {"matrix": [9, 6], "x": 6.75, "y": 2},
                  {"matrix": [8, 6], "x": 7.75, "y": 2},
                  {"matrix": [11, 6], "x": 8.75, "y": 2},
                  {"matrix": [14, 6], "x": 9.75, "y": 2},
                  {"matrix": [15, 6], "x": 10.75, "y": 2},
                  {"matrix": [13, 6], "x": 11.75, "y": 2},
                  {"matrix": [12, 6], "x": 12.75, "y": 2},
                  {"matrix": [0, 6], "x": 13.75, "y": 1, "w": 1.25, "h": 2},
                  {"matrix": [0, 5], "x": 0, "y": 3, "w": 2},
                  {"matrix": [6, 5], "x": 2, "y": 3},
                  {"matrix": [2, 5], "x": 3, "y": 3},
                  {"matrix": [1, 5], "x": 4, "y": 3},
                  {"matrix": [5, 5], "x": 5, "y": 3},
                  {"matrix": [7, 5], "x": 6, "y": 3},
                  {"matrix": [10, 5], "x": 7, "y": 3},
                  {"matrix": [9, 5], "x": 8, "y": 3},
                  {"matrix": [8, 5], "x": 9, "y": 3},
                  {"matrix": [11, 5], "x": 10, "y": 3},
                  {"matrix": [14, 5], "x": 11, "y": 3},
                  {"matrix": [15, 5], "x": 12, "y": 3},
                  {"matrix": [13, 5], "x": 13, "y": 3},
                  {"matrix": [12, 5], "x": 14, "y": 3},
                  {"matrix": [0, 4], "x": 0, "y": 4},
                  {"matrix": [3, 4], "x": 1.25, "y": 4},
                  {"matrix": [6, 4], "x": 2.25, "y": 4},
                  {"matrix": [2, 4], "x": 3.25, "y": 4},
                  {"matrix": [1, 4], "x": 4.25, "y": 4},
                  {"matrix": [7, 4], "x": 5.25, "y": 4, "w": 2.5},
                  {"matrix": [9, 4], "x": 7.75, "y": 4},
                  {"matrix": [8, 4], "x": 8.75, "y": 4},
                  {"matrix": [11, 4], "x": 9.75, "y": 4},
                  {"matrix": [14, 4], "x": 10.75, "y": 4},
                  {"matrix": [15, 4], "x": 12, "y": 4},
                  {"matrix": [13, 4], "x": 13, "y": 4},
                  {"matrix": [12, 4], "x": 14, "y": 4}
                ]
              }
            }
          }
        }
      };
      commit('setKeyboardMeta', fixedLayout);
      commit('processLayouts', fixedLayout);
      return { ok: true };
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
