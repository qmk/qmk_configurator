import isUndefined from 'lodash/isUndefined';

/**
 * Make a Layer-Tap Keycode Definition
 *
 * @param {number} layer The layer number to activate while the key is held
 * @returns A keycode definition for a Layer-Tap key
 */
function makeLayerTapKey(layer) {
  return {
    name: `LT ${layer}`,
    code: `LT(${layer},kc)`,
    type: 'layer-container',
    layer: layer,
    title: `Momentarily turn on layer ${layer} while held, kc when tapped`
  };
}

const modLookup = {
  LCTL: ['LCtl', 'Left Control'],
  LSFT: ['LSft', 'Left Shift'],
  LALT: ['LAlt', 'Left Alt'],
  LGUI: ['LGUI', 'Left GUI'],

  LCS: ['LCS', 'Left Control and Left Shift'],
  LCA: ['LCA', 'Left Control and Left Alt'],
  LCG: ['LCG', 'Left Control and Left GUI'],
  LSA: ['LSA', 'Left Shift and Left Alt'],
  LSG: ['LSG', 'Left Shift and Left GUI'],
  LAG: ['LAG', 'Left Alt and Left GUI'],

  LCSG: ['LCSG', 'Left Control, Left Shift and Left GUI'],
  LCAG: ['LCAG', 'Left Control, Left Alt and Left GUI'],
  LSAG: ['LSAG', 'Left Shift, Left Alt and Left GUI'],

  RCTL: ['RCtl', 'Right Control'],
  RSFT: ['RSft', 'Right Shift'],
  RALT: ['RAlt', 'Right Alt'],
  RGUI: ['RGUI', 'Right GUI'],

  RCS: ['RCS', 'Right Control and Right Shift'],
  RCA: ['RCA', 'Right Control and Right Alt'],
  RCG: ['RCG', 'Right Control and Right GUI'],
  RSA: ['RSA', 'Right Shift and Right Alt'],
  RSG: ['RSG', 'Right Shift and Right GUI'],
  RAG: ['RAG', 'Right Alt and Right GUI'],

  RCSG: ['RCSG', 'Right Control, Right Shift and Right GUI'],
  RCAG: ['RCAG', 'Right Control, Right Alt and Right GUI'],
  RSAG: ['RSAG', 'Right Shift, Right Alt and Right GUI'],

  MEH: ['Meh', 'Left Control, Left Shift and Left Alt'],
  HYPR: ['Hyper', 'Left Control, Left Shift, Left Alt and Left GUI']
};

/**
 * Make a Mod Keycode Definition
 *
 * @param {string} code The modifier(s) to activate when the key is held
 * @returns A keycode definition for a modifier key
 * @see {@link modLookup}
 */
function makeModKey(code) {
  const tuple = modLookup[code];
  if (isUndefined(tuple)) {
    throw new Error(`${code} is not a valid mod key`);
  }
  const [name, desc] = tuple;
  return {
    name,
    code: `${code}(kc)`,
    type: 'container',
    title: `Hold ${desc} and press kc`
  };
}

/**
 * Make a Mod-Tap Keycode Definition
 *
 * @param {string} code The modifiers to activate while the key is held
 * @returns A keycode definition for a Mod-Tap key
 * @see {@link modLookup}
 */
function makeModTapKey(code) {
  const tuple = modLookup[code];
  if (isUndefined(tuple)) {
    throw new Error(`${code} is not a valid Mod-Tap key`);
  }
  const [name, desc] = tuple;
  return {
    name: `${name}_T`,
    code: `${code}_T(kc)`,
    type: 'container',
    title: `${desc} when held, kc when tapped`
  };
}

/**
 * Make a One-Shot Mod Keycode Definition
 *
 * @param {string} code The modifiers to activate when the key is pressed
 * @returns A keycode definition for an OSM key
 * @see {@link modLookup}
 */
function makeOneShotModKey(code) {
  const tuple = modLookup[code];
  if (isUndefined(tuple)) {
    throw new Error(`${code} is not a valid One Shot Mod key`);
  }
  const [name, desc] = tuple;
  return {
    name: `OSM ${name}`,
    code: `OS_${code}`,
    title: `Hold ${desc} for one keypress`
  };
}

export default [
  { label: 'Quantum', width: 'label', group: true },

  { name: 'N/A', code: 'KC_NO', title: 'Do nothing' },
  {
    name: '▽',
    code: 'KC_TRNS',
    title: 'Use the next lowest non-transparent key'
  },

  { width: 1000 },

  {
    name: 'Boot',
    code: 'QK_BOOT',
    title: 'Put the keyboard into bootloader mode for flashing'
  },
  { name: 'Reboot', code: 'QK_RBT', title: 'Reset the keyboard' },
  { name: 'Debug', code: 'DB_TOGG', title: 'Toggle debug mode' },
  {
    name: 'Clear EEPROM',
    code: 'EE_CLR',
    title: "Reinitialize the keyboard's EEPROM (persistent memory)",
    width: 1500
  },

  { width: 1000 },

  {
    name: 'Any',
    code: 'text',
    type: 'text',
    title: 'Manually enter any QMK keycode'
  },

  {
    label: 'Layer and Layer Tap functions',
    icon: 'exclamation-triangle',
    iconClass: 'warning',
    width: 'label',
    title:
      'Note: Layer keys overwrite the key on the target layer to KC_TRNS to avoid layer lock'
  },

  {
    name: 'MO',
    code: 'MO(layer)',
    type: 'layer',
    layer: 0,
    title:
      'Momentarily turn on layer when pressed (requires KC_TRNS on destination layer)'
  },
  {
    name: 'TG',
    code: 'TG(layer)',
    type: 'layer',
    layer: 0,
    title: 'Toggle layer on or off'
  },
  {
    name: 'TO',
    code: 'TO(layer)',
    type: 'layer',
    layer: 0,
    title:
      'Turn on layer and turn off all other layers, except the default layer'
  },
  {
    name: 'TT',
    code: 'TT(layer)',
    type: 'layer',
    layer: 0,
    title:
      "Normally acts like MO unless it's tapped multiple times, which toggles layer on"
  },
  {
    name: 'DF',
    code: 'DF(layer)',
    type: 'layer',
    layer: 0,
    title: 'Set the base (default) layer until the keyboard loses power'
  },
  {
    name: 'PDF',
    code: 'PDF(layer)',
    type: 'layer',
    layer: 0,
    title: 'Set the base (default) layer in EEPROM'
  },
  {
    name: 'OSL',
    code: 'OSL(layer)',
    type: 'layer',
    layer: 0,
    title: 'Momentarily activates layer until a key is pressed'
  },

  { width: 500 },

  makeLayerTapKey(0),
  makeLayerTapKey(1),
  makeLayerTapKey(2),
  makeLayerTapKey(3),
  makeLayerTapKey(4),
  makeLayerTapKey(5),
  makeLayerTapKey(6),
  makeLayerTapKey(7),

  { width: 250 },

  makeLayerTapKey(8),
  makeLayerTapKey(9),
  makeLayerTapKey(10),
  makeLayerTapKey(11),
  makeLayerTapKey(12),
  makeLayerTapKey(13),
  makeLayerTapKey(14),
  makeLayerTapKey(15),

  {
    label:
      'Mod key combinations and Mod-Tap keys (C = Control, S = Shift, A = Alt, G = GUI/Windows/Command/Super)',
    width: 'label'
  },

  makeModKey('LCTL'),
  makeModKey('LSFT'),
  makeModKey('LALT'),
  makeModKey('LGUI'),

  { width: 250 },

  makeModKey('LCS'),
  makeModKey('LCA'),
  makeModKey('LCG'),
  makeModKey('LSA'),
  makeModKey('LSG'),
  makeModKey('LAG'),

  { width: 250 },

  makeModKey('LCSG'),
  makeModKey('LCAG'),
  makeModKey('LSAG'),

  { width: 500 },

  makeModKey('RCTL'),
  makeModKey('RSFT'),
  makeModKey('RALT'),
  makeModKey('RGUI'),

  { width: 250 },

  makeModKey('RCS'),
  makeModKey('RCA'),
  makeModKey('RCG'),
  makeModKey('RSA'),
  makeModKey('RSG'),
  makeModKey('RAG'),

  { width: 250 },

  makeModKey('RCSG'),
  makeModKey('RCAG'),
  makeModKey('RSAG'),

  { width: 500 },

  makeModKey('MEH'),
  makeModKey('HYPR'),

  { width: 0 },

  makeModTapKey('LCTL'),
  makeModTapKey('LSFT'),
  makeModTapKey('LALT'),
  makeModTapKey('LGUI'),

  { width: 250 },

  makeModTapKey('LCS'),
  makeModTapKey('LCA'),
  makeModTapKey('LCG'),
  makeModTapKey('LSA'),
  makeModTapKey('LSG'),
  makeModTapKey('LAG'),

  { width: 250 },

  makeModTapKey('LCSG'),
  makeModTapKey('LCAG'),
  makeModTapKey('LSAG'),

  { width: 500 },

  makeModTapKey('RCTL'),
  makeModTapKey('RSFT'),
  makeModTapKey('RALT'),
  makeModTapKey('RGUI'),

  { width: 250 },

  makeModTapKey('RCS'),
  makeModTapKey('RCA'),
  makeModTapKey('RCG'),
  makeModTapKey('RSA'),
  makeModTapKey('RSG'),
  makeModTapKey('RAG'),

  { width: 250 },

  makeModTapKey('RCSG'),
  makeModTapKey('RCAG'),
  makeModTapKey('RSAG'),

  { width: 500 },

  makeModTapKey('MEH'),
  makeModTapKey('HYPR'),

  {
    label: 'One-Shot Mod keys',
    icon: 'exclamation-triangle',
    iconClass: 'warning',
    width: 'label',
    title:
      'Note: One-Shot keys combining left-hand and right-side modifiers will be sent with all right-hand modifiers'
  },

  makeOneShotModKey('LCTL'),
  makeOneShotModKey('LSFT'),
  makeOneShotModKey('LALT'),
  makeOneShotModKey('LGUI'),

  { width: 250 },

  makeOneShotModKey('LCS'),
  makeOneShotModKey('LCA'),
  makeOneShotModKey('LCG'),
  makeOneShotModKey('LSA'),
  makeOneShotModKey('LSG'),
  makeOneShotModKey('LAG'),

  { width: 250 },

  makeOneShotModKey('LCSG'),
  makeOneShotModKey('LCAG'),
  makeOneShotModKey('LSAG'),

  { width: 250 },

  makeOneShotModKey('MEH'),
  makeOneShotModKey('HYPR'),

  { width: 0 },

  makeOneShotModKey('RCTL'),
  makeOneShotModKey('RSFT'),
  makeOneShotModKey('RALT'),
  makeOneShotModKey('RGUI'),

  { width: 250 },

  makeOneShotModKey('RCS'),
  makeOneShotModKey('RCA'),
  makeOneShotModKey('RCG'),
  makeOneShotModKey('RSA'),
  makeOneShotModKey('RSG'),
  makeOneShotModKey('RAG'),

  { width: 250 },

  makeOneShotModKey('RCSG'),
  makeOneShotModKey('RCAG'),
  makeOneShotModKey('RSAG'),

  { label: 'Special action keys', width: 'label' },

  {
    name: '` / ~\nEsc',
    code: 'QK_GESC',
    title: 'Esc normally, but ` when GUI is active or ~ when Shift is active'
  },

  { width: 250 },

  {
    name: 'LS / (',
    code: 'SC_LSPO',
    title: 'Left Shift when held, ( when tapped'
  },
  {
    name: 'RS / )',
    code: 'SC_RSPC',
    title: 'Right Shift when held, ) when tapped'
  },
  {
    name: 'LC / (',
    code: 'SC_LCPO',
    title: 'Left Control when held, ( when tapped'
  },
  {
    name: 'RC / )',
    code: 'SC_RCPC',
    title: 'Right Control when held, ) when tapped'
  },
  {
    name: 'LA / (',
    code: 'SC_LAPO',
    title: 'Left Alt when held, ( when tapped'
  },
  {
    name: 'RA / )',
    code: 'SC_RAPC',
    title: 'Right Alt when held, ) when tapped'
  },
  {
    name: 'RS / Enter',
    code: 'SC_SENT',
    title: 'Right Shift when held, Enter when tapped'
  },

  { width: 250 },

  {
    name: 'Toggle CW',
    code: 'CW_TOGG',
    title: 'Toggle Caps Word (Enable Caps Lock for the next word)',
    width: 1500
  },

  { width: 250 },

  {
    name: 'Repeat',
    code: 'QK_REP',
    title: 'Repeat last key pressed',
    width: 1500
  },
  {
    name: 'Alt Repeat',
    code: 'QK_AREP',
    title: 'Perform alternate of last key pressed',
    width: 1500
  }
];
