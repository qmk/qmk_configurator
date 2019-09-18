import axios from 'axios';
import store from './store';
import escape from 'lodash/escape';
import partial from 'lodash/partial';
import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';
import first from 'lodash/first';
import keys from 'lodash/keys';
import values from 'lodash/values';
import * as keypress from 'keypress.js';

import { backend_compile_url } from './store/modules/constants';

let keypressListener;
let compile_status = undefined;
let baking = 'Baking';

function init() {
  keypressListener = new keypress.Listener();
  const conf = generateKeypressCombos(store.getters['keycodes/keycodes']);
  keypressListener.register_many(conf);
  keypressListener.simple_combo('ctrl shift i', () => {
    if (!store.state.app.isPreview) {
      store.commit('app/requestPreview');
    }
  });
  keypressListener.simple_combo('ctrl alt n', () => {
    store.commit('keymap/nextColorway');
  });
  keypressListener.simple_combo('ctrl alt u', () => {
    store.commit('keymap/toggleDisplaySizes');
  });
  keypressListener.simple_combo('ctrl alt f', () => {
    store.commit('keymap/toggleContinuousInput');
  });
  keypressListener.simple_combo('ctrl alt s', () => {
    store.commit('app/toggleSettingsPanel');
  });

  store.commit('app/setKeypressListener', () => keypressListener);
}

// returns true if bit `value` of `test` is true
function hasBitsSet(test, value) {
  return ( test & (1<<value) ) === Math.pow(2, value);
}

// check One-Shot Mod keycodes
function checkOneShotMods(keycode) {
    let maincode = keycode.split('(')[0];
    let internal = keycode.split('(')[1];
    internal = internal.split(')')[0];

    // tokenizers
    let mods = internal.split('|');
    mods = mods.map((amod) => {
        return amod.trim();
    });

    // parser
    mods = mods.map((amod) => {
        // MOD_LCTL = 0x0001,
        // MOD_LSFT = 0x0010,
        // MOD_LALT = 0x0100,
        // MOD_LGUI = 0x1000,
        switch (amod) {
        case 'MOD_LCTL':
        case 'MOD_RCTL':
            return 0b0001;
        case 'MOD_LSFT':
        case 'MOD_RSFT':
            return 0b0010;
        case 'MOD_LALT':
        case 'MOD_RALT':
            return 0b0100;
        case 'MOD_LGUI':
        case 'MOD_RGUI':
            return 0b1000;
        case 'MOD_MEH':
            return 0b0111;
        case 'MOD_HYPR':
            return 0b1111;
        }
    });
}

// generate keypress combo list from the keycodes list
function generateKeypressCombos(_keycodes) {
  const combos = _keycodes
    .filter(({ keys }) => {
      // only keycodes with keys members
      return !isUndefined(keys);
    })
    .reduce((acc, keycode) => {
      // de-dupe keypress.js registrations
      if (isUndefined(acc[keycode.keys])) {
        acc[keycode.keys] = keycode;
      }
      return acc;
    }, {});

  return values(combos).map(generateKeypressHandler);
}

const keyLUT = {
  ContextMenu: 'KC_APP'
};

const mods = {
  KC_LSFT: 'KC_RSFT',
  KC_LCTL: 'KC_RCTL',
  KC_LGUI: 'KC_RGUI',
  KC_LALT: 'KC_RALT'
};

const numPad = {
  KC_0: 'KC_P0',
  KC_1: 'KC_P1',
  KC_2: 'KC_P2',
  KC_3: 'KC_P3',
  KC_4: 'KC_P4',
  KC_5: 'KC_P5',
  KC_6: 'KC_P6',
  KC_7: 'KC_P7',
  KC_8: 'KC_P8',
  KC_9: 'KC_P9',
  KC_SLSH: 'KC_PSLS',
  KC_MINS: 'KC_PMNS',
  KC_PLUS: 'KC_PPLS',
  KC_ENT: 'KC_PENT',
  KC_DOT: 'KC_PDOT',
  KC_EQL: 'KC_PEQL'
};

// Used exclusively to detect mods on so we can support modded input
function modHandler(meta, ev) {
  let _meta = meta;

  if (store.state.keymap.ignoreMod) {
    store.commit('keymap/acceptNextMod');
    return;
  }

  // handle special cases eg. ContextMenu
  const special = keyLUT[ev.key];
  if (!isUndefined(special)) {
    _meta = store.getters['keycodes/lookupKeycode'](special);
  } else {
    // detect left and right mods
    if (ev.location === ev.DOM_KEY_LOCATION_RIGHT) {
      _meta = store.getters['keycodes/lookupKeycode'](mods[meta.code]);
    }
  }
  store.commit('keymap/setKeycode', { _code: _meta.code });
}

// Share the code between keydown handlers
// Use currying to bind the meta parameter at runtime.
function keydownHandler(meta, ev) {
  let _meta = meta;

  // detect numpad
  switch (meta.code) {
    case 'KC_0':
    case 'KC_1':
    case 'KC_2':
    case 'KC_3':
    case 'KC_4':
    case 'KC_5':
    case 'KC_6':
    case 'KC_7':
    case 'KC_8':
    case 'KC_9':
    case 'KC_SLSH':
    case 'KC_MINS':
    case 'KC_PLUS':
    case 'KC_ENT':
    case 'KC_DOT':
    case 'KC_EQL':
      if (ev.location === ev.DOM_KEY_LOCATION_NUMPAD) {
        _meta = store.getters['keycodes/lookupKeycode'](numPad[meta.code]);
      }
      break;
  }

  store.commit('keymap/setKeycode', { _code: _meta.code });
  if (ev.shiftKey) {
    store.commit('keymap/ignoreNextMod');
  }
}

// generate a keypress combo handler per keycode
function generateKeypressHandler(keycode) {
  const meta = store.getters['keycodes/lookupKeycode'](keycode.code);
  switch (meta.code) {
    case 'KC_LGUI':
    case 'KC_LALT':
    case 'KC_LCTL':
      return {
        keys: keycode.keys,
        on_keydown: partial(modHandler, meta),
        prevent_default: true
      };
    case 'KC_LSFT':
      return {
        keys: keycode.keys,
        on_keyup: partial(modHandler, meta),
        prevent_default: true
      };
    default:
      return {
        keys: keycode.keys,
        on_keydown: partial(keydownHandler, meta),
        prevent_default: true
      };
  }
}

//Function that takes in a keymap loops over it and fills populates the keymap variable
function load_converted_keymap(converted_keymap) {
  //Loop over each layer from the keymap
  console.log('converted_keymap', converted_keymap);
  const acc = converted_keymap.reduce(
    (acc, layerData, _layer) => {
      //Add layer object for every layer that exists
      store.commit('keymap/initLayer', _layer);
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
      stats: { count: 0, any: 0, layers: 0 },
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

  // Check if the keycode is a complex/combo keycode ie. contains ()
  if (keycode.includes('(')) {
    // Pull the keycode and or layer from within the brackets
    let key, outerKeycode;
    let splitcode = keycode.split('(');
    let maincode = splitcode[0];
    let internal = splitcode[1];
    internal = internal.split(')')[0];

    // check for an OSM keycode
    if (maincode === 'OSM') {
      // ok we know it's OSM, check that it's a valid OSM code
      checkOneShotMods(keycode);

      // code generator
      mods = mods.reduce((acc, amod) => {
        acc |= amod;
        return acc;
      });

      let cmods = [];
      if ( hasBitsSet(mods, 0) ) {
        cmods.push('MOD_LCTL');
      }
      if ( hasBitsSet(mods, 1) ) {
        cmods.push('MOD_LSFT');
      }
      if ( hasBitsSet(mods, 2) ) {
        cmods.push('MOD_LALT');
      }
      if ( hasBitsSet(mods, 3) ) {
        cmods.push('MOD_LGUI');
      }
      if (
        hasBitsSet(mods, 0) &&
        hasBitsSet(mods, 1) &&
        hasBitsSet(mods, 2) &&
        hasBitsSet(mods, 3)
      ) {
        cmods = ['MOD_HYPR'];
      }
      else if (
        hasBitsSet(mods, 0) &&
        hasBitsSet(mods, 1) &&
        hasBitsSet(mods, 2)
      ) {
        cmods = ['MOD_MEH'];
      }

      mods = cmods.join('|');
      keycode = `OSM(${mods})`;


      metadata = store.getters['keycodes/lookupKeycode'](keycode);
      if (metadata === undefined) {
        // it's not valid - return an ANY key
        stats.any += 1;
        return newAnyKey(keycode);
      }
      // it's valid - return a keycode
      return newKey(metadata, keycode);
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
  return [
    '40percentclub/i75',
    '8pack',
    'bigseries',
    'boston_meetup',
    'business_card',
    'cannonkeys/satisfaction75',
    'chibios_test',
    'christmas_tree',
    'claw44',
    'converter/palm_usb',
    'converter/sun_usb',
    'converter/usb_usb',
    'crkbd',
    'deltasplit75',
    'duck/eagle_viper',
    'duck/octagon',
    'eco',
    'ergo42',
    'ergodash',
    'ergotravel',
    'fortitude60',
    'hadron',
    'handwired/bluepill',
    'handwired/dactyl_manuform',
    'handwired/onekey',
    'handwired/qc60',
    'handwired/xealous',
    'hecomi',
    'helix',
    'kbdfans/kbd75',
    'keebio/iris',
    'keebio/levinson',
    'keebio/nyquist',
    'keebio/quefrency',
    'keebio/rorschach',
    'keebio/viterbi',
    'kinesis',
    'launchpad',
    'lets_split',
    'lets_split_eh',
    'lily58',
    'maartenwut/atom47',
    'maxipad',
    'mechllama/g35',
    'mechmini',
    'meira',
    'minidox',
    'orthodox',
    'pinky',
    'planck',
    'preonic',
    'ps2avrGB',
    'qwertyydox',
    'redox',
    'rgbkb/sol',
    'rgbkb/zen',
    'rgbkb/zygomorph',
    'runner3680',
    'sentraq/s60_x',
    'spacetime',
    'treadstone48',
    'vitamins_included',
    'yosino58',
    'zinc'
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
  const url = `${backend_compile_url}/${store.state.app.jobID}`;
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
            setTimeout(check_status, 500);
            break;
          case 'running':
            store.commit('app/setSpinnerMsg', baking);
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

function checkInvalidKeymap(keymap) {
  const res =
    isUndefined(keymap.keyboard) ||
    isUndefined(keymap.keymap) ||
    isUndefined(keymap.layout) ||
    isUndefined(keymap.layers);
  return res;
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
  getPreferredLayout,
  checkInvalidKeymap
};
