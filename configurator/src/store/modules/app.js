import axios from 'axios';
import isUndefined from 'lodash/isUndefined';
import size from 'lodash/size';
import reduce from 'lodash/reduce';
import { PREVIEW_LABEL, backend_keyboards_url } from './constants';
import { getPreferredLayout } from '@/jquery';

const state = {
  keyboard: '',
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
  filter: '',
  keypressListener: undefined
};

const getters = {
  keyboard: state => state.keyboard,
  keyboards: state => state.keyboards,
  layout: state => state.layout,
  layouts: state => state.layouts,
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
      exportName = `${state.keyboard}_${state.layout}_mine`.toLowerCase();
    }
    return exportName;
  },
  compileDisabled: state => state.compileDisabled,
  isPreview: state => state.isPreview,
  previewRequested: state => state.previewRequested,
  jobID: state => state.jobID,
  enableDownloads: state => state.enableDownloads,
  firmwareBinaryURL: state => state.firmwareBinaryURL,
  firmwareSourceURL: state => state.firmwareSourceURL
};

const actions = {
  /**
   *  changeKeyboard - change the keyboard state
   *  @param {object} internal store state
   *  @param {string} keyboard new keyboard we are switching to
   *  @return {object} promise that will be fulfilled once action is complete
   */
  changeKeyboard({ state, commit, dispatch }, keyboard) {
    let promise = new Promise(resolve => {
      commit('disablePreview');
      commit('enableCompile');
      commit('setKeyboard', keyboard);
      commit('setLayout', undefined);
      dispatch('loadLayouts').then(() => {
        console.log(getPreferredLayout(state.layouts));
        commit('setLayout', getPreferredLayout(state.layouts));
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
  }
};

const mutations = {
  enableCompile(state) {
    state.compileDisabled = false;
  },
  disableCompile(state) {
    state.compileDisabled = true;
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
