import isUndefined from 'lodash/isUndefined';

// make a Layer Tap Key Keycode Definition
function makeLT(layer) {
  return {
    name: `LT ${layer}`,
    code: `LT(${layer},kc)`,
    type: 'layer-container',
    layer: layer,
    title: `kc on tap, switch to layer ${layer} while held`
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
  MOD_HYPR: ['Hyper', 'Control, Shift, Alt and GUI'],
  MOD_MEH: ['Meh', 'Control, Shift, and Alt'],
  'MOD_LCTL|MOD_LSFT': ['CS', 'Control and Shift'],
  'MOD_LCTL|MOD_LALT': ['CA', 'Control and Alt'],
  'MOD_LCTL|MOD_LGUI': ['CG', 'Control and GUI'],
  'MOD_LSFT|MOD_LALT': ['SA', 'Shift and Alt'],
  'MOD_LSFT|MOD_LGUI': ['SG', 'Shift and GUI'],
  'MOD_LALT|MOD_LGUI': ['AG', 'Alt and GUI'],
  'MOD_LCTL|MOD_LSFT|MOD_LGUI': ['CSG', 'Control, Shift, and GUI'],
  'MOD_LCTL|MOD_LALT|MOD_LGUI': ['CAG', 'Control, Alt, and GUI'],
  'MOD_LSFT|MOD_LALT|MOD_LGUI': ['SAG', 'Shift, Alt, and GUI'],
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
    title: `Enable ${title} for one keypress`,
    width: width
  };
}

export default [
  { label: 'Quantum', width: 'label', group: true },

  { label: 'QMK specific', width: 'label' },

  { name: '', code: 'KC_NO', title: 'Do nothing' },
  {
    name: '▽',
    code: 'KC_TRNS',
    title: 'Use the next lowest non-transparent key'
  },
  { name: 'Reset', code: 'QK_BOOT', title: 'Reset the keyboard' },
  { name: 'Debug', code: 'DB_TOGG', title: 'Toggle debug mode' },
  {
    name: 'EEPROM Reset',
    code: 'EE_CLR',
    title: 'Resets EEPROM state',
    width: 1500
  },
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
    title: 'Momentary turn layer on. AKA FN'
  },
  {
    name: 'TG',
    code: 'TG(layer)',
    type: 'layer',
    layer: 0,
    title: 'Toggle layer on/off'
  },
  {
    name: 'TO',
    code: 'TO(layer)',
    type: 'layer',
    layer: 0,
    title: 'Turn on layer when pressed'
  },
  {
    name: 'TT',
    code: 'TT(layer)',
    type: 'layer',
    layer: 0,
    title:
      "Normally acts like MO unless it's tapped multple times which toggles layer on"
  },
  {
    name: 'DF',
    code: 'DF(layer)',
    type: 'layer',
    layer: 0,
    title: 'Sets the default layer'
  },
  {
    name: 'OSL',
    code: 'OSL(layer)',
    type: 'layer',
    layer: 0,
    title: 'Switch to layer for one keypress'
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
      'Mod key combinations (A = Alt, C = Control, G = Windows/Command/GUI, S = Shift)',
    width: 'label'
  },

  { name: 'LSft', code: 'LSFT(kc)', type: 'container', title: 'Left Shift' },
  { name: 'LCtl', code: 'LCTL(kc)', type: 'container', title: 'Left Control' },
  { name: 'LAlt', code: 'LALT(kc)', type: 'container', title: 'Left Alt' },
  { name: 'LGui', code: 'LGUI(kc)', type: 'container', title: 'Left GUI' },
  { width: 250 },
  { name: 'RSft', code: 'RSFT(kc)', type: 'container', title: 'Right Shift' },
  { name: 'RCtl', code: 'RCTL(kc)', type: 'container', title: 'Right Control' },
  { name: 'RAlt', code: 'RALT(kc)', type: 'container', title: 'Right Alt' },
  { name: 'RGui', code: 'RGUI(kc)', type: 'container', title: 'Right GUI' },
  { width: 0 },
  {
    name: 'LSft_T',
    code: 'LSFT_T(kc)',
    type: 'container',
    title: 'Left Shift when held, kc when tapped'
  },
  {
    name: 'LCtl_T',
    code: 'LCTL_T(kc)',
    type: 'container',
    title: 'Left Control when held, kc when tapped'
  },
  {
    name: 'LAlt_T',
    code: 'LALT_T(kc)',
    type: 'container',
    title: 'Left Alt when held, kc when tapped'
  },
  {
    name: 'LGui_T',
    code: 'LGUI_T(kc)',
    type: 'container',
    title: 'Left GUI when held, kc when tapped'
  },
  { width: 250 },
  {
    name: 'RSft_T',
    code: 'RSFT_T(kc)',
    type: 'container',
    title: 'Right Shift when held, kc when tapped'
  },
  {
    name: 'RCtl_T',
    code: 'RCTL_T(kc)',
    type: 'container',
    title: 'Right Control when held, kc when tapped'
  },
  {
    name: 'RAlt_T',
    code: 'RALT_T(kc)',
    type: 'container',
    title: 'Right Alt when held, kc when tapped'
  },
  {
    name: 'RGui_T',
    code: 'RGUI_T(kc)',
    type: 'container',
    title: 'Right GUI when held, kc when tapped'
  },
  { width: 250 },
  {
    name: 'C_S_T',
    code: 'C_S_T(kc)',
    type: 'container',
    title: 'Left Control + Left Shift when held, kc when tapped'
  },
  {
    name: 'LCA_T',
    code: 'LCA_T(kc)',
    type: 'container',
    title: 'Left Control + Left Alt when held, kc when tapped'
  },
  {
    name: 'SGUI_T',
    code: 'SGUI_T(kc)',
    type: 'container',
    title: 'Left Shift + Left GUI when held, kc when tapped'
  },
  { width: 250 },
  {
    name: 'LCAG_T',
    code: 'LCAG_T(kc)',
    type: 'container',
    title: 'Left Control, Alt and GUI when held, kc when tapped'
  },
  {
    name: 'RCAG_T',
    code: 'RCAG_T(kc)',
    type: 'container',
    title: 'Right Control, Alt and GUI when held, kc when tapped'
  },
  { width: 250 },
  {
    name: 'Meh_T',
    code: 'MEH_T(kc)',
    type: 'container',
    title: 'Left Control, Shift and Alt when held, kc when tapped'
  },
  {
    name: 'All_T',
    code: 'ALL_T(kc)',
    type: 'container',
    title: 'Left Control, Shift, Alt and GUI when held, kc when tapped'
  },
  { width: 0 },
  {
    name: 'LCA',
    code: 'LCA(kc)',
    type: 'container',
    title: 'Left Control + Left Alt'
  },
  {
    name: 'LSA',
    code: 'LSA(kc)',
    type: 'container',
    title: 'Left Shift + Left Alt'
  },
  {
    name: 'SGUI',
    code: 'SGUI(kc)',
    type: 'container',
    title: 'Left Shift + Left GUI'
  },
  {
    name: 'LAG',
    code: 'LAG(kc)',
    type: 'container',
    title: 'Left Alt + Left GUI'
  },
  { width: 250 },
  {
    name: 'RCS',
    code: 'RCS(kc)',
    type: 'container',
    title: 'Right Control + Right Shift'
  },
  {
    name: 'RSA',
    code: 'RSA(kc)',
    type: 'container',
    title: 'Right Shift + Right Alt'
  },
  {
    name: 'RSG',
    code: 'RSG(kc)',
    type: 'container',
    title: 'Right Shift + Right GUI'
  },
  {
    name: 'RAG',
    code: 'RAG(kc)',
    type: 'container',
    title: 'Right Alt + Right GUI'
  },
  { width: 250 },
  {
    name: 'LCAG',
    code: 'LCAG(kc)',
    type: 'container',
    title: 'Left Control, Alt and GUI'
  },
  { width: 2250 },
  {
    name: 'Meh',
    code: 'MEH(kc)',
    type: 'container',
    title: 'Left Control, Shift and Alt'
  },
  {
    name: 'Hyper',
    code: 'HYPR(kc)',
    type: 'container',
    title: 'Left Control, Shift, Alt and GUI'
  },

  {
    label: 'One-Shot Mod keys',
    icon: 'exclamation-triangle',
    iconClass: 'warning',
    width: 'label',
    title:
      'Note: One-Shot keys combining left-hand and right-side modifiers will be sent with all right-hand modifiers'
  },

  makeOSM('MOD_LSFT'),
  makeOSM('MOD_LCTL'),
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
  makeOSM('MOD_RSFT'),
  makeOSM('MOD_RCTL'),
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
  {
    name: 'CW Toggle',
    code: 'CW_TOGG',
    title: 'Toggle Caps Word (Enable Caps Lock for the next word)',
    width: 1500
  }
];
