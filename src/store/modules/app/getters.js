import size from 'lodash/size';
import isUndefined from 'lodash/isUndefined';
const getters = {
  firmwareFile: (state) => state.firmwareFile,
  validateKeyboard: (state) => (keyboard) => {
    const valid = state.keyboards.includes(keyboard);
    console.info(`Validate keyboard:${keyboard} valid:${valid}`);
    return valid;
  },
  filter: (state) => state.filter,
  /**
   * keymapName
   * @param {object} state of store
   * @return {string} parsed filtered keymap name
   */
  keymapName: (state) => {
    return state.keymapName.replace(/\s/g, '_').toLowerCase();
  },
  exportKeymapName: (state) => {
    let exportName = state.keymapName.replace(/[\s/]/g, '_').toLowerCase();
    if (exportName === '') {
      let keyboardName = state.keyboard.replace(/[\s/]/g, '_').toLowerCase();
      exportName = `${keyboardName}_${state.layout}_mine`.toLowerCase();
    }
    // issue #331 whitelist what we send to API for keymapName and save to disk
    exportName = exportName.replace(/[^a-z0-9_-]/gi, '');
    return exportName;
  },
  keyCount: (state) => {
    if (
      size(state.layouts) > 0 &&
      !isUndefined(state.layout) &&
      !isUndefined(state.layouts[state.layout])
    ) {
      return state.layouts[state.layout].length;
    }
    return 0;
  }
};

export default {
  ...getters
};
