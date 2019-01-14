import axios from 'axios';
import store from './store';
import escape from 'lodash/escape';
import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';
import first from 'lodash/first';
import keys from 'lodash/keys';
import * as keypress from 'keypress.js';

import { backend_compile_url } from './store/modules/constants';

//let $keycodes;
let keypressListener;
let compile_status = undefined;
let baking = 'Baking';

function init() {
  keypressListener = new keypress.Listener();
  keypressListener.register_many(
    generateKeypressCombos(store.getters['keycodes/keycodes'])
  );
  keypressListener.simple_combo('ctrl shift i', () => {
    if (!store.getters['app/isPreview']) {
      store.commit('app/requestPreview');
    }
  });

  store.commit('app/setKeypressListener', () => keypressListener);
}

// generate keypress combo list from the keycodes list
function generateKeypressCombos(_keycodes) {
  const combos = _keycodes
    .filter(({ keys }) => {
      // only keycodes with keys members
      return !isUndefined(keys);
    })
    .map(keycode => generateKeypressHandler(keycode));
  return combos;
}

// generate a keypress combo handler per keycode
function generateKeypressHandler(keycode) {
  return {
    keys: keycode.keys,
    on_keydown: () => {
      const meta = store.getters['keycodes/lookupKeyPressCode'](keycode.keys);
      if (isUndefined(meta)) {
        return;
      }

      store.commit('keymap/setKeycode', meta.code);
    }
  };
}

//Function that takes in a keymap loops over it and fills populates the keymap variable
function load_converted_keymap(converted_keymap) {
  //Loop over each layer from the keymap
  var stats = { count: 0, any: 0, layers: 0 };
  console.log(converted_keymap);
  let layers = [];
  converted_keymap.forEach((layerData, _layer) => {
    //Add layer object for every layer that exists
    store.commit('keymap/initLayer', _layer);
    //Loop over each keycode in the layer
    layers.push(
      layerData.map(keycode => {
        return parseKeycode(keycode, stats);
      })
    );
    stats.layers += 1;
  });
  store.commit('keymap/setLayers', layers);

  console.log('stat', stats);
  var msg = `\nLoaded ${stats.layers} layers and ${
    stats.count
  } keycodes. Defined ${stats.any} Any key keycodes\n`;
  store.commit('status/append', msg);
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
  var anyKey = this.getters['keycodes/lookupKeycode']('text');
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

function parseKeycode(keycode, stats) {
  let metadata;

  keycode = stripANY(keycode);

  // Check if the keycode is a complex/combo keycode ie. contains ()
  if (keycode.includes('(')) {
    // Pull the keycode and or layer from within the brackets
    let key, outerKeycode;
    let splitcode = keycode.split('(');
    let maincode = splitcode[0];
    let internal = splitcode[1];
    internal = internal.split(')')[0];

    //Check whether it is a layer switching code or combo keycode
    if (internal.includes('KC')) {
      // combo keycode
      metadata = store.getters['keycodes/lookupKeycode'](internal);
      if (metadata === undefined) {
        return newAnyKey(keycode);
      }
      let internalkeycode = newKey(metadata, internal);

      outerKeycode = maincode + '(kc)';
      metadata = store.getters['keycodes/lookupKeycode'](outerKeycode);
      if (metadata === undefined) {
        return newAnyKey(keycode);
      }

      key = newKey(metadata, keycode, { contents: internalkeycode });
      return key;
    }

    // layer switching
    outerKeycode = maincode + '(layer)';
    metadata = store.getters['keycodes/lookupKeycode'](outerKeycode);
    if (metadata === undefined) {
      return newAnyKey(keycode);
    }
    key = newKey(metadata, keycode, { layer: internal });
    return key;
  }

  if (keycode.length < 4) {
    // unexpectedly short keycode
    store.commit(
      'status/append',
      `Found an unexpected keycode '${escape(keycode)}' on layer ${
        stats.layers
      } in keymap. Setting to KC_TRNS\n`
    );
    return store.getters['keycodes/lookupKeycode']('KC_TRNS');
  }

  // regular keycode
  metadata = store.getters['keycodes/lookupKeycode'](keycode);
  if (metadata === undefined) {
    return newAnyKey(keycode);
  }
  return newKey(metadata, keycode);
}

function statusError(message) {
  store.commit('status/append', message);
  store.dispatch('status/scrollToEnd');
}

function getExclusionList() {
  return [
    'atom47',
    'bigseries',
    'chibios_test',
    'christmas_tree',
    'converter/usb_usb',
    'crkbd',
    'deltasplit75',
    'duck/eagle_viper',
    'duck/octagon',
    'e6v2',
    'eco',
    'ergo42',
    'ergodash',
    'ergotravel',
    'fortitude60',
    'fourier',
    'hadron',
    'handwired/dactyl_manuform',
    'handwired/qc60',
    'handwired/xealous',
    'helix',
    'iris',
    'jc65',
    'kbd75',
    'kinesis',
    'launchpad',
    'lets_split',
    'lets_split_eh',
    'levinson',
    'lfkeyboards',
    'lily58',
    'mechmini',
    'meira',
    'minidox',
    'nyquist',
    'orthodox',
    'planck',
    'preonic',
    'ps2avrGB',
    'quefrency',
    'qwertyydox',
    'redox',
    'rorschach',
    's60_x',
    'vitamins_included',
    'viterbi',
    'zen'
  ].reduce((acc, k) => {
    acc[k] = true;
    return acc;
  }, {});
}

function compileLayout(_keyboard, _keymapName, _layout) {
  disableCompileButton();
  var layers = store.getters['keymap/exportLayers']({ compiler: true });
  var data = {
    keyboard: _keyboard,
    keymap: _keymapName,
    layout: _layout,
    layers: layers
  };
  console.log(JSON.stringify(data));
  if (store.getters['status/empty']) {
    store.commit('status/append', '\n');
  }
  store.commit(
    'status/append',
    `* Sending ${_keyboard}:${_keymapName} with ${_layout}`
  );
  axios
    .post(backend_compile_url, JSON.stringify(data))
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
  const url = `${backend_compile_url}/${store.getters['app/jobID']}`;
  axios
    .get(url)
    .then(resp => {
      console.log(resp);
      let msg;
      let { status, data } = resp;
      if (status !== 200) {
        console.log('Unexpected status', data.status);
        enableCompileButton();
      } else {
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
            store.commit('app/setFirmwareFile', data.result.firmware_filename);
            enableCompileButton();
            enableOtherButtons();
            break;
          case 'queued':
            store.commit('app/setSpinnerMsg', 'Waiting for Oven');
            msg = compile_status === 'queued' ? ' .' : '\n* Queueing';
            store.commit('status/append', msg);
            setTimeout(check_status, 500);
            break;
          case 'running':
            store.commit('app/setSpinnerMsg', baking);
            baking += '.';
            if (baking.length > 10) {
              baking = baking.slice(0, 6);
            }
            msg = compile_status === 'running' ? ' .' : '\n* Running';
            store.commit('status/append', msg);
            setTimeout(check_status, 500);
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

export {
  init,
  load_converted_keymap,
  statusError,
  getExclusionList,
  compileLayout,
  enableCompileButton,
  disableCompileButton,
  enableOtherButtons,
  disableOtherButtons,
  getPreferredLayout
};
