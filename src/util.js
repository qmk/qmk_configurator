import axios from 'axios';
import store from './store';
import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';
import first from 'lodash/first';
import keys from 'lodash/keys';

import { backend_compile_url } from './store/modules/constants';
import exclusion_list from './exclusion_list';

let compile_status = undefined;
let baking = 'Baking';

function getExclusionList() {
  return exclusion_list.reduce((acc, k) => {
    acc[k] = true;
    return acc;
  }, {});
}

/**
 *  getPreferredLayout
 *  @param {array} layouts supported by this keyboard
 *  @return {string} layout we think it should default to
 */
function getPreferredLayout(layouts) {
  let mykeys = keys(layouts);
  if (includes(mykeys, 'LAYOUT')) {
    return 'LAYOUT';
  }
  if (includes(mykeys, 'LAYOUT_all')) {
    return 'LAYOUT_all';
  }
  if (includes(mykeys, 'KEYMAP')) {
    return 'KEYMAP';
  }
  // avoid keymaps ending with _kc unless we have no other choice
  let nextBest = mykeys.filter((key) => !key.endsWith('_kc'));
  if (nextBest.length > 0) {
    return first(nextBest);
  }
  return first(mykeys);
}

function checkInvalidKeymap({ keyboard, keymap, layout, layers }) {
  const res =
    isUndefined(keyboard) ||
    isUndefined(keymap) ||
    isUndefined(layout) ||
    isUndefined(layers);
  return res;
}

/**
 * navigator.platform has been deprecated. Provide a shim that tries to call
 * userAgentData first and failing that uses the original field
 * @returns @see https://wicg.github.io/ua-client-hints/#sec-ch-ua-platform
 */
function getPlatform() {
  if (window) {
    const { navigator } = window;
    if (navigator) {
      const { userAgentData, platform } = navigator;
      if (userAgentData) {
        return userAgentData.platform;
      } else {
        return platform;
      }
    }
  }
  return 'Unknown';
}

export {
  getExclusionList,
  getPreferredLayout,
  checkInvalidKeymap,
  getPlatform
};
