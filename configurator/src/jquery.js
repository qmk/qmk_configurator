import $ from 'jquery';
import 'jquery-ui-bundle';
import store from './store';
import escape from 'lodash/escape';
import isNumber from 'lodash/isNumber';
import partial from 'lodash/partial';
import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';
import first from 'lodash/first';
import keys from 'lodash/keys';
import * as keypress from 'keypress.js';

import { backend_compile_url } from './store/modules/constants';

const defaults = {
  MAX_X: 775,
  KEY_WIDTH: 40,
  KEY_HEIGHT: 40,
  SWAP_KEY_WIDTH: 30,
  SWAP_KEY_HEIGHT: 30,
  KEY_X_SPACING: 45,
  KEY_Y_SPACING: 45,
  SCALE: 1
};

let config = {};

let $visualKeymap;
//let $keycodes;
let keypressListener;
let ignoreKeypressListener;
let offsetTop;
let height;
let compile_status = undefined;

function init() {
  $visualKeymap = $('#visual-keymap2');
  offsetTop = $('.split-content').offset().top;
  height = $('.split-content').height();

  $(document).on('scroll', scrollHandler);

  keypressListener = new keypress.Listener();
  keypressListener.register_many(
    generateKeypressCombos(store.getters['keycodes/keycodes'])
  );
  keypressListener.simple_combo('ctrl shift i', () => {
    if (!store.getters['app/isPreview']) {
      store.commit('app/requestPreview');
    }
  });

  ignoreKeypressListener = partial(rawIgnoreKeypressListener, keypressListener);
}

function rawIgnoreKeypressListener(listener, $element) {
  $element.focus(() => listener.stop_listening()).blur(() => listener.listen());
}

function scrollHandler() {
  if (offsetTop < $(document).scrollTop()) {
    $('.split-content').addClass('fixed');
    $('#keycodes-section').css('margin-top', height + 'px');
  } else {
    $('#keycodes-section').css('margin-top', '0px');
    $('.split-content').removeClass('fixed');
  }
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

/*
function assignKeycodeToSelectedKey(evt) {
  let _keycode = $(evt.target).data('code');
  if (_keycode === undefined) {
    return;
  }

  let meta = store.getters['keycodes/lookupKeycode'](_keycode);
  if (meta === undefined) {
    return;
  }

  let $key = getSelectedKey();
  let _index = $key.data('index');
  if ($key === undefined || _index === undefined || !isNumber(_index)) {
    return; // not a key
  }
  if ($key.hasClass('key-contents')) {
    store.commit('keymap/setContents', {
      _index,
      key: newKey(meta, _keycode.data('code'))
    });
  } else {
    store.commit('keymap/assignKey', {
      _layer: store.getters['keymap/layer'],
      index: _index,
      name: meta.name,
      code: meta.code,
      type: meta.type
    });
  }
  $key.removeClass('keycode-select'); // clear selection once assigned
  render_key(store.getters['keymap/layer'], _index);
  store.commit('keymap/setDirty');
}
*/

function reset_keymap() {
  //$('.layer').removeClass('non-empty active');
  //$('.layer.0').addClass('active non-empty');
}

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

function calcKeyKeymapDims(w, h) {
  return {
    w: w * config.KEY_X_SPACING - (config.KEY_X_SPACING - config.KEY_WIDTH),
    h: h * config.KEY_Y_SPACING - (config.KEY_Y_SPACING - config.KEY_HEIGHT)
  };
}

function calcKeyKeymapPos(x, y) {
  return {
    x: x * config.KEY_X_SPACING,
    y: y * config.KEY_Y_SPACING
  };
}

function render_layout(_layout) {
  $visualKeymap.find('*').remove();

  var max = { x: 0, y: 0 };

  $.each(_layout, function(k, d) {
    // pre-calc size
    if (!d.w) {
      d.w = 1;
    }
    if (!d.h) {
      d.h = 1;
    }
    var pos = calcKeyKeymapPos(d.x, d.y);
    var dims = calcKeyKeymapDims(d.w, d.h);
    max.x = Math.max(max.x, pos.x + dims.w);
    max.y = Math.max(max.y, pos.y + dims.h);
  });

  if (max.x > defaults.MAX_X) {
    config.SCALE = defaults.MAX_X / max.x;
    config.KEY_WIDTH *= config.SCALE;
    config.KEY_HEIGHT *= config.SCALE;
    config.SWAP_KEY_HEIGHT *= config.SCALE;
    config.SWAP_KEY_WIDTH *= config.SCALE;
    config.KEY_X_SPACING *= config.SCALE;
    config.KEY_Y_SPACING *= config.SCALE;
    max.x *= config.SCALE;
    max.y *= config.SCALE;
  }

  $.each(_layout, function(k, d) {
    if (!d.w) {
      d.w = 1;
    }
    if (!d.h) {
      d.h = 1;
    }
    var pos = calcKeyKeymapPos(d.x, d.y);
    var dims = calcKeyKeymapDims(d.w, d.h);
    var key = $('<div>', {
      class: 'key disabled',
      style: [
        'left: ',
        pos.x,
        'px; top: ',
        pos.y,
        'px; width: ',
        dims.w,
        'px; height: ',
        dims.h,
        'px'
      ].join(''),
      id: 'key-' + k,
      'data-index': k,
      'data-type': 'key',
      'data-w': d.w,
      'data-h': d.h
    });
    $(key).droppable(droppable_config(key, k));
    $visualKeymap.append(key);
    render_key(store.getters['keymap/layer'], k);
  });
  $visualKeymap.css({
    width: max.x + 'px',
    height: max.y + 'px'
  });

  $('.key').each(makeDraggable);
}

function makeDraggable(k, d) {
  $(d).draggable({
    zIndex: 100,
    revert: true,
    revertDuration: 100,
    distance: 5,
    drag: function() {
      var $d = $(d);
      if ($d.hasClass('key')) {
        // reduce size of dragged key to indicate src
        var w = $d.data('w');
        var h = $d.data('h');
        $d.css({
          width: `${config.SWAP_KEY_WIDTH * w}px`,
          height: `${config.SWAP_KEY_HEIGHT * h}px`
        });
      }
      $d.draggable('option', 'revertDuration', 100);
    },
    start: function(event, ui) {
      // center the key under the cursor - stackoverflow
      $(this).draggable('instance').offset.click = {
        left: Math.floor(ui.helper.width() / 2),
        top: Math.floor(ui.helper.height() / 2)
      };
    },
    stop: function() {
      var $d = $(d);
      $d.css({
        'z-index': ''
      });
      if ($d.hasClass('key')) {
        var w = $d.data('w');
        var h = $d.data('h');
        var dims = calcKeyKeymapDims(w, h);
        $d.css({
          width: `${dims.w}px`,
          height: `${dims.h}px`
        });
      }
    }
  });
}

function droppable_config(t, key) {
  return {
    over: function(/* event, ui*/) {
      $(t).addClass('active-key');
      if ($(t).hasClass('key-contents')) {
        $(t)
          .parent()
          .removeClass('active-key');
      }
    },
    out: function(/* event, ui */) {
      $(t).removeClass('active-key');
      if ($(t).hasClass('key-contents')) {
        $(t)
          .parent()
          .addClass('active-key');
      }
    },
    drop: function(event, ui) {
      var $target;
      if ($(t).hasClass('active-key')) {
        $target = $(t);
      } else {
        // this is probably a container
        $target = $(t).find('.active-key');
        if ($target.length === 0) {
          // if we can't find a container
          return;
        }
        $target = $($target[0]);
      }
      var srcKeycode = ui.helper[0];
      $(srcKeycode).draggable('option', 'revertDuration', 0);
      $target.removeClass('active-key');
      setLayerToNonEmpty('active');
      if ($(srcKeycode).hasClass('keycode')) {
        $(t).attr('data-code', srcKeycode.dataset.code);
        // $(t).draggable({revert: true, revertDuration: 100});
        if ($target.hasClass('key-contents')) {
          if (srcKeycode.dataset.type !== 'container') {
            // we currently don't support nested containers
            store.commit('keymap/setContents', {
              index: key,
              key: {
                name: srcKeycode.innerHTML,
                code: srcKeycode.dataset.code,
                type: srcKeycode.dataset.type
              }
            });
          }
        } else {
          store.commit('keymap/assignKey', {
            _layer: store.getters['keymap/layer'],
            index: key,
            name: srcKeycode.innerHTML,
            code: srcKeycode.dataset.code,
            type: srcKeycode.dataset.type
          });
        }
      } else {
        // handle swapping keys in keymap
        var $src = $(srcKeycode);
        var $dst = $(t);
        var srcIndex = $src.data('index');
        var dstIndex = $dst.data('index');

        // get src and dest positions for animation
        var srcPrevPos = ui.draggable.data().uiDraggable.originalPosition;
        var srcPos = {
          left: `${srcPrevPos.left}px`,
          top: `${srcPrevPos.top}px`
        };
        var dstPos = $dst.css(['left', 'top']);

        // use promises to wait until animation finished
        var deferSrc = $.Deferred();
        var deferDst = $.Deferred();

        // animate swapping
        $src.animate(
          { left: dstPos.left, top: dstPos.top },
          150,
          'linear',
          () => {
            deferSrc.resolve();
          }
        );
        $dst.animate(
          { left: srcPos.left, top: srcPos.top },
          150,
          'linear',
          () => {
            deferDst.resolve();
          }
        );

        let animationsFinished = () => {
          // restore original element positions just swap their data
          $src.css({ left: srcPos.left, top: srcPos.top });
          $dst.css({ left: dstPos.left, top: dstPos.top });

          let layer = store.getters['keymap/layer'];
          store.commit('keymap/swapKeys', {
            _layer: layer,
            srcIndex,
            dstIndex
          });

          render_key(layer, srcIndex);
          render_key(layer, key);
        };

        // wait until both animations are complete
        $.when(deferSrc, deferDst).done(animationsFinished);
        return;
      }
      store.commit('keymap/setDirty');
      render_key(store.getters['keymap/layer'], key);
    }
  };
}

function render_key(_layer, k) {
  var $key = $('#key-' + k);
  var promise = store.dispatch('keymap/initKey', { _layer, index: k });
  promise.then(keycode => {
    if (!keycode) {
      let { name, code } = store.getters['keycodes/lookupKeycode']('KC_NO');
      store.commit('keymap/assignKey', {
        _layer,
        index: k,
        name,
        code,
        type: ''
      });
      keycode = store.getters['keymap/getKey']({ _layer, index: k });
    }
    const legend =
      keycode.name.length === 1 ? keycode.name.toUpperCase() : keycode.name;
    $key.html(legend);
    if (keycode.type === 'container') {
      $key.addClass('key-container');
      var $container = $('<div>', {
        class: 'key-contents'
      });
      if (keycode.contents) {
        $container.html(keycode.contents.name);
      }
      $container.droppable(droppable_config($container, k));
      $key.append($container);
    } else if (keycode.type === 'layer') {
      $key.addClass('key-layer');
      $key.append($('<br/>'));
      var layer_input1 = $('<input>', {
        class: 'key-layer-input',
        type: 'number',
        val: keycode.layer
      }).on('input', function() {
        var val = $(this).val();
        var toLayer = parseInt(val, 10);
        if (isNumber(toLayer)) {
          store
            .dispatch('keymap/setKeycodeLayer', {
              _layer,
              index: k,
              toLayer
            })
            .then(() => {
              setLayerToNonEmpty(toLayer);
            });
        }
      });
      ignoreKeypressListener(layer_input1);
      $key.append(layer_input1);
    } else if (keycode.type === 'text') {
      $key.addClass('key-layer');
      var layer_input = $('<input>', {
        class: 'key-layer-input',
        val: keycode.text
      }).on('input', function(/*e*/) {
        store.commit('keymap/setText', {
          _layer: store.getters['keymap/layer'],
          index: k,
          text: $(this).val()
        });
      });
      ignoreKeypressListener(layer_input);
      $key.append(layer_input);
    } else {
      $key.removeClass('key-container');
      $key.removeClass('key-layer');
    }
    if (keycode.code !== 'KC_NO') {
      var remove_keycode = $('<div>', {
        class: 'remove',
        html: '&#739;',
        click: function(evt) {
          let layer = store.getters['keymap/layer'];
          evt.preventDefault();
          evt.stopPropagation();
          store.commit('keymap/assignKey', {
            _layer: layer,
            index: k,
            name: '',
            code: 'KC_NO',
            type: ''
          });
          render_key(layer, k);
        }
      });
      $key.append(remove_keycode);
    }
  });
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
  render_key,
  render_layout,
  getExclusionList,
  compileLayout,
  enableCompileButton,
  disableCompileButton,
  enableOtherButtons,
  disableOtherButtons,
  getPreferredLayout
};
