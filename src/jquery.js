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

import { longFormKeycodes } from './longFormKeycodes';
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
  return [
    '1upkeyboards/sweet16',
    '40percentclub/i75',
    '7skb',
    '8pack',
    'adkb96',
    'aeboards/ext65',
    'ai03/equinox',
    'aleth42',
    'angel17',
    'angel64',
    'atreus',
    'bat43',
    'bear_face',
    'bigseries',
    'boston_meetup',
    'bpiphany/pegasushoof',
    'business_card',
    'cannonkeys/satisfaction75',
    'christmas_tree',
    'claw44',
    'converter/palm_usb',
    'converter/sun_usb',
    'converter/usb_usb',
    'crkbd',
    'delikeeb/vanana',
    'delikeeb/waaffle/rev3',
    'deltasplit75',
    'duck/eagle_viper',
    'duck/octagon',
    'duck/orion',
    'dumbpad',
    'eco',
    'eek',
    'ergo42',
    'ergodash',
    'ergoslab',
    'ergotravel',
    'exclusive/e85',
    'fortitude60',
    'getta25',
    'hadron',
    'handwired/bento',
    'handwired/bluepill',
    'handwired/dactyl_manuform',
    'handwired/onekey',
    'handwired/pill60',
    'handwired/postageboard',
    'handwired/pytest/has_community',
    'handwired/qc60',
    'handwired/splittest',
    'handwired/unk',
    'handwired/xealous',
    'hecomi',
    'helix',
    'helix/pico',
    'helix/pico/back',
    'helix/pico/under',
    'helix/rev2',
    'helix/rev2/back',
    'helix/rev2/sc',
    'helix/rev2/under',
    'id80',
    'ivy',
    'jian',
    'jiran',
    'jisplit89',
    'jones',
    'kbdfans/kbd75',
    'keebio/bdn9',
    'keebio/dsp40',
    'keebio/iris',
    'keebio/kbo5000',
    'keebio/levinson',
    'keebio/nyquist',
    'keebio/quefrency',
    'keebio/rorschach',
    'keebio/sinc',
    'keebio/viterbi',
    'keycapsss/kimiko',
    'keycapsss/plaid_pad',
    'kinesis',
    'kudox',
    'kudox_game',
    'kyria',
    'launchpad',
    'lets_split',
    'lets_split_eh',
    'lfkeyboards/lfk78',
    'lfkeyboards/smk65',
    'lily58',
    'maartenwut/atom47',
    'marksard/rhymestone',
    'maxipad',
    'mechllama/g35',
    'mechlovin/adelais',
    'mechlovin/adelais/rgb_led',
    'mechlovin/adelais/standard_led',
    'mechlovin/delphine',
    'mechlovin/hannah60rgb',
    'mechlovin/hannah65',
    'mechlovin/hannah910',
    'mechmini',
    'meira',
    'melgeek/z70ultra',
    'minidox',
    'montsinger/rebound',
    'mschwingen/modelm',
    'murcielago',
    'naked48',
    'naked60',
    'naked64',
    'namecard2x4',
    'navi10',
    'nomu30',
    'oddball',
    'orthodox',
    'pimentoso/paddino02',
    'pico',
    'pinky',
    'planck',
    'ploopyco/trackball',
    'ploopyco/trackball_mini',
    'ploopyco/trackball_nano',
    'ploopyco/trackball_nano/rev1_001',
    'polilla',
    'preonic',
    'primekb/prime_l',
    'projectkb/alice',
    'ps2avrGB',
    'qwertyydox',
    'ramonimbao/herringbone',
    'redox',
    'rgbkb/pan',
    'rgbkb/pan/rev1',
    'rgbkb/sol',
    'rgbkb/zen',
    'rgbkb/zygomorph',
    'runner3680',
    's7_elephant',
    'sentraq/s60_x',
    'setta21',
    'sirius/uni660',
    'sofle',
    'spacetime',
    'suihankey',
    'suihankey/split',
    'tkw/stoutgat/v2',
    'treadstone48',
    'underscore33',
    'unison',
    'uzu42',
    'vitamins_included',
    'whale/sk',
    'yd60mq',
    'ymd75',
    'yosino58',
    'zinc',
    'zvecr/zv48'
  ].reduce((acc, k) => {
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
