import Vue from 'vue';
import size from 'lodash/size';
import reduce from 'lodash/reduce';
import { PREVIEW_LABEL } from '@/store/modules/constants';

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
    state.keyboards = state.keyboards.filter((k) => k !== PREVIEW_LABEL);
  },
  setKeyboard(state, _keyboard) {
    state.keyboard = _keyboard;
  },
  setLegends(state, _legends) {
    state.legends = _legends;
  },
  setCurrentLanguage(state, _language) {
    Vue.set(state.configuratorSettings, 'language', _language);
  },
  setFavoriteKeyboard(state, _keyboard) {
    state.configuratorSettings.favoriteKeyboard = _keyboard;
  },
  setFavoriteColor(state, _color) {
    Vue.set(state.configuratorSettings, 'favoriteColor', _color);
  },
  setKeyboards(state, _keyboards) {
    state.keyboards = _keyboards;
    state._keyboards = _keyboards; // make a 2nd copy
  },
  setLayout(state, _layout) {
    if (
      state.keyboardMeta &&
      state.keyboard &&
      state.keyboardMeta[state.keyboard]
    ) {
      const { layout_aliases } = state.keyboardMeta[state.keyboard];
      if (layout_aliases && layout_aliases[_layout]) {
        state.layout = layout_aliases[_layout];
        return;
      }
    }
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
    let keyboards = state._keyboards.filter((k) => {
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
  processLayouts(state, data) {
    if (data || state.isPreview) {
      let layouts = {};
      if (state.isPreview) {
        layouts = data.keyboards[PREVIEW_LABEL].layouts;
      } else {
        if (data && data.keyboards) {
          layouts = data.keyboards[state.keyboard].layouts;
        }
      }
      if (size(layouts) === 0) {
        // API return empty layout object
        state.layouts = { to_be_defined: [] };
      } else if (layouts) {
        // parse the layouts into internal format
        state.layouts = reduce(
          layouts,
          function (acc, _layout, key) {
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
  setAppInitialized(state, status) {
    state.appInitialized = status;
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
  setDarkmode(state, value) {
    state.configuratorSettings.darkmodeEnabled = value;
  },
  setOSKeyboardLayout(state, value) {
    state.configuratorSettings.osKeyboardLayout = value;
  },
  setIso(state, value) {
    state.configuratorSettings.iso = value;
  },
  setClearLayerDefault(state, value) {
    state.configuratorSettings.clearLayerDefault = value;
  },
  toggleSnowflakes(state) {
    state.snowflakes = !state.snowflakes;
  },
  setKeyboardMeta(state, data) {
    state.keyboardMeta = data?.keyboards ? data.keyboards : {};
  }
};

export default mutations;
