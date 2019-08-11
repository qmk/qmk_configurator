import axios from 'axios';
import isUndefined from 'lodash/isUndefined';
import size from 'lodash/size';
import reduce from 'lodash/reduce';
import { PREVIEW_LABEL, backend_keyboards_url } from './constants';
import { getPreferredLayout } from '@/jquery';
import { localStorageSet, localStorageLoad, CONSTS } from '../localStorage';
import { getExclusionList } from '@/jquery';

const state = {
  keyboard: '',
  favoriteKeyboard: localStorageLoad(CONSTS.favoriteKeyboard),
  keyboards: [],
  _keyboards: [],
  layout: '',
  layouts: {},
  keymapName: '',
  compileDisabled: false,
  isPreview: false,
  previewRequested: false,
  jobID: '',
  enableDownloads: false,
  firmwareBinaryURL: [],
  firmwareSourceURL: [],
  firmwareFile: '',
  keymapSourceURL: [],
  filter: '',
  keypressListener: undefined,
  showSpinner: false,
  spinnerMsg: '',
  message: '',
  settingsPanelVisible: false,
  author: '',
  notes: '',
  tutorialEnabled: false,
  darkmodeEnabled: localStorageLoad('darkmode') === '1' || false,
  electron: false
};

const steno_keyboards = ['gergo', 'georgi'];

const getters = {
  firmwareFile: state => state.firmwareFile,
  filter: state => state.filter,
  /**
   * keymapName
   * @param {object} state of store
   * @return {string} parsed filtered keymap name
   */
  keymapName: state => {
    return state.keymapName.replace(/\s/g, '_').toLowerCase();
  },
  exportKeymapName: state => {
    let exportName = state.keymapName.replace(/[\s/]/g, '_').toLowerCase();
    if (exportName === '') {
      let keyboardName = state.keyboard.replace(/[\s/]/g, '_').toLowerCase();
      exportName = `${keyboardName}_${state.layout}_mine`.toLowerCase();
    }
    // issue #331 whitelist what we send to API for keymapName and save to disk
    exportName = exportName.replace(/[^a-z0-9_-]/gi, '');
    return exportName;
  }
};

const actions = {
  checkValidKeymap(_, keymap) {
    if (
      isUndefined(keymap.keyboard) ||
      isUndefined(keymap.keymap) ||
      isUndefined(keymap.layout) ||
      isUndefined(keymap.layers)
    ) {
      return false;
    }
    return true;
  },
  fetchKeyboards({ commit }) {
    return axios.get(backend_keyboards_url).then(r => {
      if (r.status === 200) {
        const exclude = getExclusionList();
        commit(
          'setKeyboards',
          r.data.filter(keeb => {
            return isUndefined(exclude[keeb]);
          })
        );
      }
    });
  },
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
  // if init state we just load and not toggling
  toggleDarkMode({ commit, state }, init) {
    let darkStatus = state.darkmodeEnabled;
    if (!init) {
      darkStatus = !darkStatus;
    }
    if (darkStatus) {
      localStorageSet('darkmode', '1');
      document.getElementsByTagName('html')[0].dataset.theme = 'dark';
    } else {
      localStorageSet('darkmode', '0');
      document.getElementsByTagName('html')[0].dataset.theme = '';
    }
    commit('setDarkmode', darkStatus);
  },
  loadApplicationState({ dispatch }) {
    dispatch('toggleDarkMode', true);
    dispatch('loadFavoriteKeyboard');
  },
  loadFavoriteKeyboard({ state, commit }) {
    if (state.favoriteKeyboard) {
      commit('setKeyboard', state.favoriteKeyboard);
    }
  }
};

const mutations = {
  enableCompile(state) {
    state.compileDisabled = false;
  },
  disableCompile(state) {
    state.compileDisabled = true;
  },
  enableElectron(state) {
    state.electron = true;
  },
  requestPreview(state) {
    state.previewRequested = true;
  },
  dismissPreview(state) {
    state.previewRequested = false;
  },
  enablePreview(state) {
    state.isPreview = true;
    state.keyboards = state.keyboards.concat(PREVIEW_LABEL);
  },
  disablePreview(state) {
    state.isPreview = false;
    state.keyboards = state.keyboards.filter(k => k !== PREVIEW_LABEL);
    state.keymapName = '';
  },
  setKeyboard(state, _keyboard) {
    state.keyboard = _keyboard;
  },
  setFavoriteKeyboard(state, _keyboard) {
    state.favoriteKeyboard = _keyboard;
    localStorageSet('favoriteKeyboard', _keyboard);
  },
  setKeyboards(state, _keyboards) {
    state.keyboards = _keyboards;
    state._keyboards = _keyboards; // make a 2nd copy
  },
  setLayout(state, _layout) {
    state.layout = _layout;
  },
  setKeymapName(state, _keymapName) {
    state.keymapName = _keymapName.replace(/[\s/]/g, '_').toLowerCase();
  },
  setJobID(state, jobID) {
    state.jobID = jobID;
  },
  setEnableDownloads(state) {
    state.enableDownloads = true;
  },
  setDisableDownloads(state) {
    state.enableDownloads = false;
  },
  setFirmwareFile(state, filename) {
    state.firmwareFile = filename;
  },
  setFirmwareBinaryURL(state, url) {
    state.firmwareBinaryURL = url;
  },
  setFirmwareSourceURL(state, url) {
    state.firmwareSourceURL = url;
  },
  setFilter(state, filter) {
    state.filter = filter;
    let keyboards = state._keyboards.filter(k => {
      if (state.filter === '') {
        return true;
      }
      return k.startsWith(state.filter);
    });
    if (keyboards.length > 0) {
      // only use filter if it matches
      state.keyboards = keyboards;
    }
  },
  /**
   * processLayouts
   * @param {object} state of store
   * @param {object} resp from API call or a preview object
   *        in same format containing keyboard layouts
   * @return {object} layouts map or empty object
   */
  processLayouts(state, resp) {
    if (resp.status === 200 || state.isPreview) {
      let layouts = {};
      if (state.isPreview) {
        layouts = resp.keyboards[PREVIEW_LABEL].layouts;
      } else {
        layouts = resp.data.keyboards[state.keyboard].layouts;
      }
      if (size(layouts) === 0) {
        // API return empty layout object
        state.layouts = { to_be_defined: [] };
      } else if (layouts) {
        // parse the layouts into internal format
        state.layouts = reduce(
          layouts,
          function(acc, _layout, key) {
            acc[key] = _layout.layout ? _layout.layout : _layout;
            return acc;
          },
          {}
        );
      }
      return state.layouts;
    }
    return {};
  },
  setKeypressListener(state, kpl) {
    // store a function which returns a reference to avoid vuex
    // complaints about modifying the original reference as it's
    // a 3rd party library
    state.keypressListener = kpl;
  },
  stopListening(state) {
    state.keypressListener().stop_listening();
  },
  startListening(state) {
    state.keypressListener().listen();
  },
  resetListener(state) {
    state.keypressListener().reset();
  },
  setShowSpinner(state, nextState) {
    state.showSpinner = nextState;
  },
  setSpinnerMsg(state, nextMsg) {
    state.spinnerMsg = nextMsg;
  },
  setKeymapSourceURL(state, keymap) {
    state.keymapSourceURL = keymap;
  },
  setMessage(state, msg) {
    state.message = msg;
  },
  setSettingsPanel(state, next) {
    state.settingsPanelVisible = next;
  },
  toggleSettingsPanel(state) {
    state.settingsPanelVisible = !state.settingsPanelVisible;
  },
  setHasErrors(state) {
    mutations.disableCompile(state);
  },
  setHasNoErrors(state) {
    mutations.enableCompile(state);
  },
  setAuthor(state, newAuthor) {
    state.author = newAuthor;
  },
  setNotes(state, newNotes) {
    state.notes = newNotes;
  },
  toggleTutorial(state) {
    state.tutorialEnabled = !state.tutorialEnabled;
  },
  setDarkmode(state, enabled) {
    state.darkmodeEnabled = enabled;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
