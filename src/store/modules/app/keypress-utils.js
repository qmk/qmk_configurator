import isUndefined from 'lodash/isUndefined';
import { useKeycodesStore } from '../../keycodes';

const keyLUT = {
  ContextMenu: 'KC_APP'
};

const modsLUT = {
  KC_LSFT: 'KC_RSFT',
  KC_LCTL: 'KC_RCTL',
  KC_LGUI: 'KC_RGUI',
  KC_LALT: 'KC_RALT'
};

const numPadLUT = {
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

// generate keypress combo list from the keycodes list
export function generateKeypressCombos(store, _keycodes) {
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

  return Object.values(combos).map(generateKeypressHandler.bind(null, store));
}

// Share the code between keydown handlers
// Use currying to bind the meta parameter at runtime.
export function keydownHandler(store, meta, ev) {
  let _meta = meta;
  const keycodesStore = useKeycodesStore();

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
        _meta = keycodesStore.lookupKeycode(numPadLUT[meta.code]);
      }
      break;
  }

  store.commit('keymap/setKeycode', { _code: _meta.code });
  if (ev.shiftKey) {
    store.commit('keymap/ignoreNextMod');
  }
}

// Used exclusively to detect mods on so we can support modded input
export function modHandler(store, meta, ev) {
  let _meta = meta;

  if (store.state.keymap.ignoreMod) {
    store.commit('keymap/acceptNextMod');
    return;
  }

  // handle special cases eg. ContextMenu
  const keycodesStore = useKeycodesStore();
  const special = keyLUT[ev.key];
  if (!isUndefined(special)) {
    _meta = keycodesStore.lookupKeycode(special);
  } else {
    // detect left and right mods
    if (ev.location === ev.DOM_KEY_LOCATION_RIGHT) {
      _meta = keycodesStore.lookupKeycode(modsLUT[meta.code]);
    }
  }
  store.commit('keymap/setKeycode', { _code: _meta.code });
}

// generate a keypress combo handler per keycode
export function generateKeypressHandler(store, keycode) {
  const keycodesStore = useKeycodesStore();
  const meta = keycodesStore.lookupKeycode(keycode.code);
  switch (meta.code) {
    case 'KC_LGUI':
    case 'KC_LALT':
    case 'KC_LCTL':
      return {
        keys: keycode.keys,
        on_keydown: modHandler.bind(null, store, meta),
        prevent_default: true
      };
    case 'KC_LSFT':
      return {
        keys: keycode.keys,
        on_keyup: modHandler.bind(null, store, meta),
        prevent_default: true
      };
    default:
      return {
        keys: keycode.keys,
        on_keydown: keydownHandler.bind(null, store, meta),
        prevent_default: true
      };
  }
}
