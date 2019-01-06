import $ from 'jquery';
/*
import 'jquery-ui-bundle';
*/
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

function reset_keymap() {}

//Function that takes in a keymap loops over it and fills populates the keymap variable
function load_converted_keymap(converted_keymap) {
  //Loop over each layer from the keymap
  var stats = { count: 0, any: 0, layers: 0 };
  $.each(converted_keymap, function(_layer /*, keys*/) {
    //Add layer object for every layer that exists
    store.commit('keymap/initLayer', _layer);
    //Loop over each keycode in the layer
    $.each(converted_keymap[_layer], function(index, keycode) {
      store.commit('keymap/setKey', {
        _layer,
        index: index,
        key: parseKeycode(keycode, stats)
      });
      let key = store.getters['keymap/getKey']({ _layer, index: index });
      stats.count += 1;

      if (key.name === 'Any') {
        stats.any += 1;
      }
    });
    if (store.getters['keymap/size'](_layer) > 0) {
      setLayerToNonEmpty(_layer);
    }
    stats.layers += 1;
  });

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

function setLayerToNonEmpty(_layer) {
  $(`.layer.${_layer}`).addClass('non-empty');
}

function newAnyKey(keycode) {
  var anyKey = this.getters['keycodes/lookupKeycode']('text');
  // make a copy otherwise it uses a reference
  return $.extend({}, anyKey, { text: keycode });
}

function newKey(metadata, keycode, obj) {
  var key = {
    name: metadata.name,
    code: keycode,
    type: metadata.type
  };

  if (obj !== undefined) {
    key = $.extend(key, obj);
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
    '* Sending ' + _keyboard + ':' + _keymapName + ' with ' + _layout
  );
  $.ajax({
    type: 'POST',
    url: backend_compile_url,
    contentType: 'application/json',
    data: JSON.stringify(data),
    dataType: 'json',
    success: function(d) {
      if (d.enqueued) {
        store.commit('status/append', '\n* Received job_id: ' + d.job_id);
        store.commit('app/setJobID', d.job_id);
        check_status();
      }
    }
  });
}

function enableCompileButton() {
  store.commit('app/enableCompile');
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

function check_status() {
  $.get(backend_compile_url + '/' + store.getters['app/jobID'], function(data) {
    console.log(data);
    let msg;
    switch (data.status) {
      case 'finished':
        store.commit(
          'status/append',
          '\n* Finished:\n' + data.result.output.replace(/\[.*m/gi, '')
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
        msg = compile_status === 'queued' ? ' .' : '\n* Queueing';
        store.commit('status/append', msg);
        setTimeout(check_status, 500);
        break;
      case 'running':
        msg = compile_status === 'running' ? ' .' : '\n* Running';
        store.commit('status/append', msg);
        setTimeout(check_status, 500);
        break;
      case 'unknown':
        enableCompileButton();
        break;
      case 'failed':
        statusError('\n* Failed');
        if (data.result) {
          statusError('\n* Error:\n' + data.result.output);
        }
        enableCompileButton();
        break;
      default:
        console.log('Unexpected status', data.status);
        enableCompileButton();
    }
    store.dispatch('status/scrollToEnd');
    compile_status = data.status;
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
  reset_keymap,
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
