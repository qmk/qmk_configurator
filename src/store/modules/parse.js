import escape from 'lodash/escape';
import isUndefined from 'lodash/isUndefined';
import { longFormKeycodes } from '@/longFormKeycodes';

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
function processOneShotMods(keycodesStore, keycode) {
  let internal = keycode.split('(')[1];
  internal = internal.split(')')[0];

  // tokenizers
  let mods = internal.split('|');
  mods = mods.map((amod) => {
    return amod.trim();
  });

  // parser
  mods = mods.map((amod) => {
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

  const metadata = keycodesStore.lookupKeycode(keycode);
  return newKey(metadata, keycode);
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

/**
 * newAnyKey.
 * @param {} keycodesStore - pinia keycodesStore
 * @param {*} keycode
 * @returns
 */
function newAnyKey(keycodesStore, keycode) {
  const anyKey = keycodesStore.lookupKeycode('text');
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
function newLayerContainerKey(keycodesStore, keycode, internal) {
  const internals = internal.split(',');
  const LCKey = keycodesStore.lookupKeycode(`${keycode}(${internals[0]},kc)`);

  let contents = keycodesStore.lookupKeycode(
    longFormKeycodes[internals[1]] || internals[1]
  );
  if (isUndefined(contents)) {
    contents = keycodesStore.lookupKeycode('KC_NO');
  }
  let { code, layer, name, type } = LCKey;
  return Object.assign({ code, layer, name, type, contents: contents });
}

function parseKeycode(keycodesStore, keycode, stats) {
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
      return processOneShotMods(keycodesStore, keycode);
    }

    //Check whether it is a layer switching code, mod-tap, or combo keycode
    if (internal.includes('KC')) {
      // Layer Tap keycode
      if (maincode === 'LT') {
        return newLayerContainerKey(keycodesStore, maincode, internal);
      }
      internal = longFormKeycodes[internal] || internal;
      metadata = keycodesStore.lookupKeycode(internal);
      if (metadata === undefined) {
        stats.any += 1;
        return newAnyKey(keycodesStore, keycode);
      }
      let internalkeycode = newKey(metadata, internal);

      outerKeycode = maincode + '(kc)';
      metadata = keycodesStore.lookupKeycode(outerKeycode);
      if (metadata === undefined) {
        stats.any += 1;
        return newAnyKey(keycodesStore, keycode);
      }

      key = newKey(metadata, outerKeycode, { contents: internalkeycode });
      return key;
    }

    // layer switching
    outerKeycode = maincode + '(layer)';
    metadata = keycodesStore.lookupKeycode(outerKeycode);
    if (metadata === undefined) {
      stats.any += 1;
      return newAnyKey(keycodesStore, keycode);
    }
    key = newKey(metadata, outerKeycode, { layer: internal });
    return key;
  }

  if (keycode.length < 4) {
    // unexpectedly short keycode
    stats.warnings.push(
      `WARNING: Found an unexpected keycode ${escape(keycode)} on layer ${
        stats.layers
      } in keymap. Setting to KC_TRNS\n`
    );
    return keycodesStore.lookupKeycode('KC_TRNS');
  }

  // regular keycode
  metadata = keycodesStore.lookupKeycode(keycode);
  if (metadata === undefined) {
    stats.any += 1;
    return newAnyKey(keycodesStore, keycode);
  }
  return newKey(metadata, keycode);
}

export { parseKeycode };
