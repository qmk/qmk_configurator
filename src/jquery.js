import axios from 'axios';
import store from './store';
import escape from 'lodash/escape';
import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';
import first from 'lodash/first';
import keys from 'lodash/keys';

import { longFormKeycodes } from './longFormKeycodes';
import { backend_compile_url } from './store/modules/constants';
import exclusion_list from './exclusion_list';

let compile_status = undefined;
let baking = 'Baking';

/* hasBitsSet
 *
 * arguments:
 *   test (number)
 *   value (number)
 *
 * returns true if bit `value` of `test` is true, false otherwise
 */
function hasBitsSet(test, value) {
  return (test & (1 << value)) === 2 ** value;
}

/* check One-Shot Mod keycodes
 *
 * This code block normalizes the order of One-Shot Mod parameters (MOD_LCTL,
 * MOD_RGUI, etc.) so that there are fewer variants that need to be added to
 * the user interface, such that e.g. OSM(MOD_LCTL|MOD_LALT) and
 * OSM(MOD_LALT|MOD_LCTL) don't need separate keys.
 */
function processOneShotMods(keycode) {
  let internal = keycode.split('(')[1];
  internal = internal.split(')')[0];

  // tokenizers
  let mods = internal.split('|');
  mods = mods.map(amod => {
    return amod.trim();
  });

  // parser
  mods = mods.map(amod => {
    // MOD_LCTL = 0b00001, MOD_RCTL = 0b10001,
    // MOD_LSFT = 0b00010, MOD_RSFT = 0b10010,
    // MOD_LALT = 0b00100, MOD_RALT = 0b10100,
    // MOD_LGUI = 0b01000, MOD_RGUI = 0b11000,
    switch (amod) {
      case 'MOD_LCTL':
        return 0b00001;
      case 'MOD_RCTL':
        return 0b10001;
      case 'MOD_LSFT':
        return 0b00010;
      case 'MOD_RSFT':
        return 0b10010;
      case 'MOD_LALT':
        return 0b00100;
      case 'MOD_RALT':
        return 0b10100;
      case 'MOD_LGUI':
        return 0b01000;
      case 'MOD_RGUI':
        return 0b11000;
      case 'MOD_MEH':
        return 0b00111;
      case 'MOD_HYPR':
        return 0b01111;
    }
  });

  // code generator
  mods = mods.reduce((acc, amod) => {
    acc |= amod;
    return acc;
  });

  let cmods = [];
  const osmHand = hasBitsSet(mods, 4) ? 'MOD_R' : 'MOD_L';
  if (hasBitsSet(mods, 0)) {
    cmods.push(`${osmHand}CTL`);
  }
  if (hasBitsSet(mods, 1)) {
    cmods.push(`${osmHand}SFT`);
  }
  if (hasBitsSet(mods, 2)) {
    cmods.push(`${osmHand}ALT`);
  }
  if (hasBitsSet(mods, 3)) {
    cmods.push(`${osmHand}GUI`);
  }
  if (
    hasBitsSet(mods, 0) &&
    hasBitsSet(mods, 1) &&
    hasBitsSet(mods, 2) &&
    hasBitsSet(mods, 3)
  ) {
    cmods = ['MOD_HYPR'];
  } else if (
    hasBitsSet(mods, 0) &&
    hasBitsSet(mods, 1) &&
    hasBitsSet(mods, 2)
  ) {
    cmods = ['MOD_MEH'];
  }

  mods = cmods.join('|');
  keycode = `OSM(${mods})`;

  const metadata = store.getters['keycodes/lookupKeycode'](keycode);
  return newKey(metadata, keycode);
}

//Function that takes in a keymap loops over it and fills populates the keymap variable
function load_converted_keymap(converted_keymap) {
  //Loop over each layer from the keymap
  console.log('converted_keymap', converted_keymap);
  const acc = converted_keymap.reduce(
    (acc, layerData, _layer) => {
      //Add layer object for every layer that exists
      store.commit('keymap/initLayer', { layer: _layer });
      //Loop over each keycode in the layer
      acc.layers.push(
        layerData.map(keycode => {
          return parseKeycode(keycode, acc.stats);
        })
      );
      acc.stats.layers += 1;
      return acc;
    },
    {
      stats: { count: 0, any: 0, layers: 0, errors: [], warnings: [] },
      layers: []
    }
  );
  store.commit('keymap/setLayers', acc.layers);
  console.log('stat', acc.stats);
  return acc.stats;
}

function stripANY(keycode) {
  if (keycode.indexOf('ANY(') === 0) {
    // strip ANY from keycodes, this is only for human debugging
    keycode = keycode.slice(4, -1);
  }
  return keycode;
}

/*
function setLayerToNonEmpty(_layer) {
  $(`.layer.${_layer}`).addClass('non-empty');
}
*/

function newAnyKey(keycode) {
  const anyKey = store.getters['keycodes/lookupKeycode']('text');
  // make a copy otherwise it uses a reference
  return Object.assign({}, anyKey, { text: keycode });
}

function newKey(metadata, keycode, obj) {
  var key = {
    name: metadata.name,
    code: keycode,
    type: metadata.type
  };

  if (obj !== undefined) {
    key = Object.assign({}, key, obj);
  }

  return key;
}

// newLayerContainerKey combines aspects of a layer and a container key
// We pre-assign the layers to make the UI easier to implement.
function newLayerContainerKey(keycode, internal) {
  const internals = internal.split(',');
  const LCKey = store.getters['keycodes/lookupKeycode'](
    `${keycode}(${internals[0]},kc)`
  );

  let contents = store.getters['keycodes/lookupKeycode'](internals[1]);
  if (isUndefined(contents)) {
    contents = store.getters['keycodes/lookupKeycode']('KC_NO');
  }
  let { code, layer, name, type } = LCKey;
  return Object.assign({ code, layer, name, type, contents: contents });
}

function parseKeycode(keycode, stats) {
  let metadata;

  keycode = stripANY(keycode);
  stats.count += 1;

  // Check if the keycode is long-form or alternate
  if (longFormKeycodes[keycode]) {
    keycode = longFormKeycodes[keycode];
  }

  // Check if the keycode is a complex/combo keycode ie. contains ()
  if (keycode.includes('(')) {
    // Pull the keycode and or layer from within the brackets
    let key, outerKeycode;
    let splitcode = keycode.split('(');
    let maincode = splitcode[0];
    if (longFormKeycodes[maincode]) {
      maincode = longFormKeycodes[maincode];
    }
    let internal = splitcode[1];
    internal = internal.split(')')[0];

    // check for an OSM keycode
    if (maincode === 'OSM') {
      // ok we know it's OSM
      return processOneShotMods(keycode);
    }

    //Check whether it is a layer switching code or combo keycode
    if (internal.includes('KC')) {
      // Layer Tap keycode
      if (maincode === 'LT') {
        return newLayerContainerKey(maincode, internal);
      }
      // combo keycode
      metadata = store.getters['keycodes/lookupKeycode'](internal);
      if (metadata === undefined) {
        stats.any += 1;
        return newAnyKey(keycode);
      }
      let internalkeycode = newKey(metadata, internal);

      outerKeycode = maincode + '(kc)';
      metadata = store.getters['keycodes/lookupKeycode'](outerKeycode);
      if (metadata === undefined) {
        stats.any += 1;
        return newAnyKey(keycode);
      }

      key = newKey(metadata, outerKeycode, { contents: internalkeycode });
      return key;
    }

    // layer switching
    outerKeycode = maincode + '(layer)';
    metadata = store.getters['keycodes/lookupKeycode'](outerKeycode);
    if (metadata === undefined) {
      stats.any += 1;
      return newAnyKey(keycode);
    }
    key = newKey(metadata, outerKeycode, { layer: internal });
    return key;
  }

  if (keycode.length < 4) {
    // unexpectedly short keycode
    stats.warnings.push(
      `WARNING: Found an unexpected keycode ${keycode} on layer ${stats.layers} in keymap. Setting to KC_TRNS\n`
    );
    return store.getters['keycodes/lookupKeycode']('KC_TRNS');
  }

  // regular keycode
  metadata = store.getters['keycodes/lookupKeycode'](keycode);
  if (metadata === undefined) {
    stats.any += 1;
    return newAnyKey(keycode);
  }
  return newKey(metadata, keycode);
}

function statusError(message) {
  store.commit('status/append', message);
  store.dispatch('status/scrollToEnd');
}

function getExclusionList() {
  return exclusion_list.reduce((acc, k) => {
    acc[k] = true;
    return acc;
  }, {});
}

function compileLayout(_keyboard, _keymapName, _layout) {
  disableCompileButton();
  let template = store.state.keymap.templates.keymap;
  const layers = store.getters['keymap/exportLayers']({ compiler: true });
  let request = JSON.stringify(
    Object.assign(template, {
      keyboard: _keyboard,
      keymap: _keymapName,
      layout: _layout,
      layers: layers
    })
  );
  console.log(request);
  if (store.getters['status/empty']) {
    store.commit('status/append', '\n');
  }
  store.commit(
    'status/append',
    `* Sending ${_keyboard}:${_keymapName} with ${_layout}`
  );
  axios
    .post(backend_compile_url, request)
    .then(resp => {
      const { status, data } = resp;
      if (status === 200) {
        store.commit('app/setShowSpinner', true);
        if (data.enqueued) {
          store.commit('status/append', `\n* Received job_id: ${data.job_id}`);
          store.dispatch('status/scrollToEnd');
          store.commit('app/setJobID', data.job_id);
          check_status();
        }
      } else {
        throw resp;
      }
    })
    .catch(err => {
      window.alert('Unexpected error ', console.log(err));
    });
}

function enableCompileButton() {
  store.commit('app/enableCompile');
  setTimeout(() => {
    store.commit('app/setShowSpinner', false);
  }, 2000);
}

function disableCompileButton() {
  store.commit('app/disableCompile');
}

function enableOtherButtons() {
  store.commit('app/setEnableDownloads');
}

function disableOtherButtons() {
  store.commit('app/setDisableDownloads');
}

/**
 * check_status waits for a compilation to happen and reports progress
 *
 * It interacts with the app store to update the application.
 *
 */
function check_status() {
  const url = `${backend_compile_url}/${store.state.app.jobID}`;
  const start = performance.now();
  axios
    .get(url)
    .then(resp => {
      console.log(`response in ${performance.now() - start}ms`, resp);
      let msg;
      let { status, data } = resp;
      if (status !== 200) {
        console.log('Unexpected status', data.status);
        enableCompileButton();
      } else {
        const pollInterval = Math.floor(2500 + Math.random() * 1000);
        console.log(`Next Poll in ${pollInterval}ms`);
        switch (data.status) {
          case 'finished':
            store.commit('app/setSpinnerMsg', 'Done!');
            store.commit(
              'status/append',
              `\n* Finished:\n${data.result.output.replace(/\[.*m/gi, '')}`
            );
            store.commit(
              'app/setFirmwareBinaryURL',
              data.result.firmware_binary_url
            );
            store.commit(
              'app/setFirmwareSourceURL',
              data.result.firmware_source_url
            );
            store.commit(
              'app/setKeymapSourceURL',
              data.result.firmware_keymap_url
            );
            store.commit('app/setFirmwareFile', data.result.firmware_filename);
            enableCompileButton();
            enableOtherButtons();
            break;
          case 'queued':
            store.commit('app/setSpinnerMsg', 'Waiting for Oven');
            msg = compile_status === 'queued' ? ' .' : '\n* Queueing';
            store.commit('status/append', msg);
            setTimeout(check_status, pollInterval);
            break;
          case 'running':
            store.commit('app/setSpinnerMsg', baking);
            msg = compile_status === 'running' ? ' .' : '\n* Running';
            store.commit('status/append', msg);
            setTimeout(check_status, pollInterval);
            break;
          case 'unknown':
            store.commit('app/setSpinnerMsg', 'Abort! Abort!');
            enableCompileButton();
            break;
          case 'failed':
            store.commit('app/setSpinnerMsg', 'Abort! Abort!');
            statusError('\n* Failed\n');
            if (data.result) {
              statusError(`* Error:\n${data.result.output}`);
            }
            enableCompileButton();
            break;
          default:
            store.commit('app/setSpinnerMsg', 'Abort! Abort!');
            console.log('Unexpected status', data.status);
            enableCompileButton();
        }
      }
      store.dispatch('status/scrollToEnd');
      compile_status = data.status;
    })
    .catch(err => {
      window.alert('Unexpected error while compiling ', console.log(err));
    });
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
  let nextBest = mykeys.filter(key => !key.endsWith('_kc'));
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

export {
  load_converted_keymap,
  statusError,
  getExclusionList,
  compileLayout,
  enableCompileButton,
  disableCompileButton,
  enableOtherButtons,
  disableOtherButtons,
  getPreferredLayout,
  checkInvalidKeymap
};
