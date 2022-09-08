import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';
import first from 'lodash/first';
import keys from 'lodash/keys';

import exclusion_list from './exclusion_list';

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

export { getExclusionList, getPreferredLayout, checkInvalidKeymap };
