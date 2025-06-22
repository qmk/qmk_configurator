import isUndefined from 'lodash/isUndefined';

// make a Layer Tap Key Keycode Definition
function makeLT(layer) {
  return {
    name: `LT ${layer}`,
    code: `LT(${layer},kc)`,
    type: 'layer-container',
    layer: layer,
    title: `Momentarily turn on layer ${layer} while held, kc when tapped`
  };
}
// make a One-Shot Mod Keycode Definition
const osmLookup = {
  MOD_LSFT: ['LSft', 'Left Shift'],
  MOD_LCTL: ['LCtl', 'Left Control'],
  MOD_LALT: ['LAlt', 'Left Alt'],
  MOD_LGUI: ['LGUI', 'Left GUI'],
  MOD_RSFT: ['RSft', 'Right Shift'],
  MOD_RCTL: ['RCtl', 'Right Control'],
  MOD_RALT: ['RAlt', 'Right Alt'],
  MOD_RGUI: ['RGUI', 'Right GUI'],
  MOD_HYPR: ['Hyper', 'Left Control, Left Shift, Left Alt and Left GUI'],
  MOD_MEH: ['Meh', 'Left Control, Left Shift, and Left Alt'],
  'MOD_LCTL|MOD_LSFT': ['LCS', 'Left Control and Left Shift'],
  'MOD_LCTL|MOD_LALT': ['LCA', 'Left Control and Left Alt'],
  'MOD_LCTL|MOD_LGUI': ['LCG', 'Left Control and Left GUI'],
  'MOD_LSFT|MOD_LALT': ['LSA', 'Left Shift and Left Alt'],
  'MOD_LSFT|MOD_LGUI': ['LSG', 'Left Shift and Left GUI'],
  'MOD_LALT|MOD_LGUI': ['LAG', 'Left Alt and Left GUI'],
  'MOD_LCTL|MOD_LSFT|MOD_LGUI': [
    'LCSG',
    'Left Control, Left Shift, and Left GUI'
  ],
  'MOD_LCTL|MOD_LALT|MOD_LGUI': [
    'LCAG',
    'Left Control, Left Alt, and Left GUI'
  ],
  'MOD_LSFT|MOD_LALT|MOD_LGUI': ['LSAG', 'Left Shift, Left Alt, and Left GUI'],
  'MOD_RCTL|MOD_RSFT': ['RCS', 'Right Control and Right Shift'],
  'MOD_RCTL|MOD_RALT': ['RCA', 'Right Control and Right Alt'],
  'MOD_RCTL|MOD_RGUI': ['RCG', 'Right Control and Right GUI'],
  'MOD_RSFT|MOD_RALT': ['RSA', 'Right Shift and Right Alt'],
  'MOD_RSFT|MOD_RGUI': ['RSG', 'Right Shift and Right GUI'],
  'MOD_RALT|MOD_RGUI': ['RAG', 'Right Alt and Right GUI'],
  'MOD_RCTL|MOD_RSFT|MOD_RGUI': [
    'RCSG',
    'Right Control, Right Shift, and Right GUI'
  ],
  'MOD_RCTL|MOD_RALT|MOD_RGUI': [
    'RCAG',
    'Right Control, Right Alt, and Right GUI'
  ],
  'MOD_RSFT|MOD_RALT|MOD_RGUI': [
    'RSAG',
    'Right Shift, Right Alt, and Right GUI'
  ]
};
function makeOSM(mod, width = 1000) {
  const tuple = osmLookup[mod];
  if (isUndefined(tuple)) {
    throw new Error(`${mod} is not a valid One Shot Mod`);
  }
  const [name, title] = tuple;
  return {
    name: `OSM ${name}`,
    code: `OSM(${mod})`,
    title: `Hold ${title} for one keypress`,
    width: width
  };
}

export default [
  { label: 'Quantum', width: 'label', group: true },

  { name: '', code: 'KC_NO', title: 'Do nothing' },
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

  makeLT(0),
  makeLT(1),
  makeLT(2),
  makeLT(3),
  makeLT(4),
  makeLT(5),
  makeLT(6),
  makeLT(7),

  { width: 250 },

  makeLT(8),
  makeLT(9),
  makeLT(10),
  makeLT(11),
  makeLT(12),
  makeLT(13),
  makeLT(14),
  makeLT(15),

  {
    label:
      'Mod key combinations (C = Control, S = Shift, A = Alt, G = GUI/Windows/Command/Super)',
    width: 'label'
  },

  {
    name: 'LCtl',
    code: 'LCTL(kc)',
    type: 'container',
    title: 'Hold Left Control and press kc'
  },
  {
    name: 'LSft',
    code: 'LSFT(kc)',
    type: 'container',
    title: 'Hold Left Shift and press kc'
  },
  {
    name: 'LAlt',
    code: 'LALT(kc)',
    type: 'container',
    title: 'Hold Left Alt and press kc'
  },
  {
    name: 'LGUI',
    code: 'LGUI(kc)',
    type: 'container',
    title: 'Hold Left GUI and press kc'
  },

  { width: 250 },

  { width: 1000 }, // LCS
  {
    name: 'LCA',
    code: 'LCA(kc)',
    type: 'container',
    title: 'Hold Left Control and Left Alt and press kc'
  },
  {
    name: 'LSA',
    code: 'LSA(kc)',
    type: 'container',
    title: 'Hold Left Shift and Left Alt and press kc'
  },
  {
    name: 'LSG',
    code: 'LSG(kc)',
    type: 'container',
    title: 'Hold Left Shift and Left GUI and press kc'
  },
  {
    name: 'LAG',
    code: 'LAG(kc)',
    type: 'container',
    title: 'Hold Left Alt and Left GUI and press kc'
  },
  {
    name: 'LCAG',
    code: 'LCAG(kc)',
    type: 'container',
    title: 'Hold Left Control, Left Alt and Left GUI and press kc'
  },

  { width: 1000 },

  {
    name: 'RCtl',
    code: 'RCTL(kc)',
    type: 'container',
    title: 'Hold Right Control and press kc'
  },
  {
    name: 'RSft',
    code: 'RSFT(kc)',
    type: 'container',
    title: 'Hold Right Shift and press kc'
  },
  {
    name: 'RAlt',
    code: 'RALT(kc)',
    type: 'container',
    title: 'Hold Right Alt and press kc'
  },
  {
    name: 'RGUI',
    code: 'RGUI(kc)',
    type: 'container',
    title: 'Hold Right GUI and press kc'
  },

  { width: 250 },

  {
    name: 'RCS',
    code: 'RCS(kc)',
    type: 'container',
    title: 'Hold Right Control and Right Shift and press kc'
  },
  { width: 1000 }, // RCA
  {
    name: 'RSA',
    code: 'RSA(kc)',
    type: 'container',
    title: 'Hold Right Shift and Right Alt and press kc'
  },
  {
    name: 'RSG',
    code: 'RSG(kc)',
    type: 'container',
    title: 'Hold Right Shift and Right GUI and press kc'
  },
  {
    name: 'RAG',
    code: 'RAG(kc)',
    type: 'container',
    title: 'Hold Right Alt and Right GUI and press kc'
  },
  { width: 1000 }, // RCAG

  { width: 1000 },

  {
    name: 'Meh',
    code: 'MEH(kc)',
    type: 'container',
    title: 'Hold Left Control, Shift and Alt and press kc'
  },
  {
    name: 'Hyper',
    code: 'HYPR(kc)',
    type: 'container',
    title: 'Hold Left Control, Shift, Alt and GUI and press kc'
  },

  { width: 0 },

  {
    name: 'LCtl_T',
    code: 'LCTL_T(kc)',
    type: 'container',
    title: 'Left Control when held, kc when tapped'
  },
  {
    name: 'LSft_T',
    code: 'LSFT_T(kc)',
    type: 'container',
    title: 'Left Shift when held, kc when tapped'
  },
  {
    name: 'LAlt_T',
    code: 'LALT_T(kc)',
    type: 'container',
    title: 'Left Alt when held, kc when tapped'
  },
  {
    name: 'LGUI_T',
    code: 'LGUI_T(kc)',
    type: 'container',
    title: 'Left GUI when held, kc when tapped'
  },

  { width: 250 },

  {
    name: 'C_S_T',
    code: 'C_S_T(kc)',
    type: 'container',
    title: 'Left Control and Left Shift when held, kc when tapped'
  },
  {
    name: 'LCA_T',
    code: 'LCA_T(kc)',
    type: 'container',
    title: 'Left Control and Left Alt when held, kc when tapped'
  },
  {
    name: 'LSA_T',
    code: 'LSA_T(kc)',
    type: 'container',
    title: 'Left Shift and Left Alt when held, kc when tapped'
  },
  {
    name: 'LSG_T',
    code: 'LSG_T(kc)',
    type: 'container',
    title: 'Left Shift and Left GUI when held, kc when tapped'
  },
  {
    name: 'LAG_T',
    code: 'LAG_T(kc)',
    type: 'container',
    title: 'Left Shift and Left Alt when held, kc when tapped'
  },
  {
    name: 'LCAG_T',
    code: 'LCAG_T(kc)',
    type: 'container',
    title: 'Left Control, Left Alt and Left GUI when held, kc when tapped'
  },

  { width: 1000 },

  {
    name: 'RCtl_T',
    code: 'RCTL_T(kc)',
    type: 'container',
    title: 'Right Control when held, kc when tapped'
  },
  {
    name: 'RSft_T',
    code: 'RSFT_T(kc)',
    type: 'container',
    title: 'Right Shift when held, kc when tapped'
  },
  {
    name: 'RAlt_T',
    code: 'RALT_T(kc)',
    type: 'container',
    title: 'Right Alt when held, kc when tapped'
  },
  {
    name: 'RGUI_T',
    code: 'RGUI_T(kc)',
    type: 'container',
    title: 'Right GUI when held, kc when tapped'
  },

  { width: 250 },

  {
    name: 'RCS_T',
    code: 'RCS_T(kc)',
    type: 'container',
    title: 'Right Control and Right Shift when held, kc when tapped'
  },
  { width: 1000 }, // RCA_T
  {
    name: 'RSA_T',
    code: 'RSA_T(kc)',
    type: 'container',
    title: 'Right Control and Right Alt when held, kc when tapped'
  },
  {
    name: 'RSG_T',
    code: 'RSG_T(kc)',
    type: 'container',
    title: 'Right Control and Right Shift when held, kc when tapped'
  },
  {
    name: 'RAG_T',
    code: 'RAG_T(kc)',
    type: 'container',
    title: 'Right Control and Right Alt when held, kc when tapped'
  },
  {
    name: 'RCAG_T',
    code: 'RCAG_T(kc)',
    type: 'container',
    title: 'Right Control, Left Alt and Left GUI when held, kc when tapped'
  },

  { width: 1000 },

  {
    name: 'Meh_T',
    code: 'MEH_T(kc)',
    type: 'container',
    title: 'Left Control, Shift and Alt when held, kc when tapped'
  },
  {
    name: 'Hyper_T',
    code: 'HYPR_T(kc)',
    type: 'container',
    title: 'Left Control, Shift, Alt and GUI when held, kc when tapped'
  },

  {
    label: 'One-Shot Mod keys',
    icon: 'exclamation-triangle',
    iconClass: 'warning',
    width: 'label',
    title:
      'Note: One-Shot keys combining left-hand and right-side modifiers will be sent with all right-hand modifiers'
  },

  makeOSM('MOD_LCTL'),
  makeOSM('MOD_LSFT'),
  makeOSM('MOD_LALT'),
  makeOSM('MOD_LGUI'),

  { width: 250 },

  makeOSM('MOD_LCTL|MOD_LSFT'),
  makeOSM('MOD_LCTL|MOD_LALT'),
  makeOSM('MOD_LCTL|MOD_LGUI'),
  makeOSM('MOD_LSFT|MOD_LALT'),
  makeOSM('MOD_LSFT|MOD_LGUI'),
  makeOSM('MOD_LALT|MOD_LGUI'),

  { width: 250 },

  makeOSM('MOD_LCTL|MOD_LSFT|MOD_LGUI'),
  makeOSM('MOD_LCTL|MOD_LALT|MOD_LGUI'),
  makeOSM('MOD_LSFT|MOD_LALT|MOD_LGUI'),

  { width: 250 },

  makeOSM('MOD_MEH'),
  makeOSM('MOD_HYPR'),

  { width: 0 },

  makeOSM('MOD_RCTL'),
  makeOSM('MOD_RSFT'),
  makeOSM('MOD_RALT'),
  makeOSM('MOD_RGUI'),

  { width: 250 },

  makeOSM('MOD_RCTL|MOD_RSFT'),
  makeOSM('MOD_RCTL|MOD_RALT'),
  makeOSM('MOD_RCTL|MOD_RGUI'),
  makeOSM('MOD_RSFT|MOD_RALT'),
  makeOSM('MOD_RSFT|MOD_RGUI'),
  makeOSM('MOD_RALT|MOD_RGUI'),

  { width: 250 },

  makeOSM('MOD_RCTL|MOD_RSFT|MOD_RGUI'),
  makeOSM('MOD_RCTL|MOD_RALT|MOD_RGUI'),
  makeOSM('MOD_RSFT|MOD_RALT|MOD_RGUI'),

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
