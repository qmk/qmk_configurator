export default [
  { label: 'Quantum', width: 'label', group: true },

  { label: 'QMK specific', width: 'label' },

  { name: '', code: 'KC_NO', title: 'KC_NO - Nothing' },
  { name: '▽', code: 'KC_TRNS', title: 'KC_TRNS - Pass-through' },
  { name: 'Reset', code: 'RESET', title: 'RESET - Reset the keyboard' },
  { name: 'Debug', code: 'DEBUG', title: 'DEBUG - Toggle debug mode' },
  {
    name: 'EEPROM Reset',
    code: 'EEP_RST',
    title: 'EEP_RST - Resets EEPROM state',
    width: 1250
  },

  { width: 1000 },
  {
    name: 'Any',
    code: 'text',
    type: 'text',
    title: 'Manually enter any QMK keycode'
  },

  { label: 'Layer functions', width: 'label' },

  {
    name: 'MO',
    code: 'MO(layer)',
    type: 'layer',
    layer: 0,
    title: 'MO(layer) - Momentary turn layer on'
  },
  {
    name: 'TG',
    code: 'TG(layer)',
    type: 'layer',
    layer: 0,
    title: 'TG(layer) - Toggle layer on/off'
  },
  {
    name: 'TO',
    code: 'TO(layer)',
    type: 'layer',
    layer: 0,
    title: 'TO(layer) - Turn on layer when pressed'
  },
  {
    name: 'TT',
    code: 'TT(layer)',
    type: 'layer',
    layer: 0,
    title:
      "TT(layer) - Normally acts like MO unless it's tapped multple times which toggles layer on"
  },
  {
    name: 'DF',
    code: 'DF(layer)',
    type: 'layer',
    layer: 0,
    title: 'DF(layer) - Sets the default layer'
  },
  {
    name: 'OSL',
    code: 'OSL(layer)',
    type: 'layer',
    layer: 0,
    title: 'OSL(layer) - Switch to layer for one keypress'
  },

  {
    label:
      'Mod key combinations (A = Alt, C = Control, G = Windows/Command, S = Shift)',
    width: 'label'
  },

  { name: 'LSft', code: 'LSFT(kc)', type: 'container', title: 'LSFT(kc)' },
  { name: 'LCtl', code: 'LCTL(kc)', type: 'container', title: 'LCTL(kc)' },
  { name: 'LAlt', code: 'LALT(kc)', type: 'container', title: 'LALT(kc)' },
  { name: 'LGui', code: 'LGUI(kc)', type: 'container', title: 'LGUI(kc)' },
  { name: 'RSft', code: 'RSFT(kc)', type: 'container', title: 'RSFT(kc)' },
  { name: 'RCtl', code: 'RCTL(kc)', type: 'container', title: 'RCTL(kc)' },
  { name: 'RAlt', code: 'RALT(kc)', type: 'container', title: 'RALT(kc)' },
  { name: 'RGui', code: 'RGUI(kc)', type: 'container', title: 'RGUI(kc)' },
  { width: 0 },
  {
    name: 'LSft_T',
    code: 'LSFT_T(kc)',
    type: 'container',
    title: 'LSFT_T(kc) - Left Shift when held, kc when tapped'
  },
  {
    name: 'LCtl_T',
    code: 'LCTL_T(kc)',
    type: 'container',
    title: 'LCTL_T(kc) - Left Control when held, kc when tapped'
  },
  {
    name: 'LAlt_T',
    code: 'LALT_T(kc)',
    type: 'container',
    title: 'LALT_T(kc) - Left Alt when held, kc when tapped'
  },
  {
    name: 'LGui_T',
    code: 'LGUI_T(kc)',
    type: 'container',
    title: 'LGUI_T(kc) - Left GUI when held, kc when tapped'
  },
  {
    name: 'RSft_T',
    code: 'RSFT_T(kc)',
    type: 'container',
    title: 'RSFT_T(kc) - Right Shift when held, kc when tapped'
  },
  {
    name: 'RCtl_T',
    code: 'RCTL_T(kc)',
    type: 'container',
    title: 'RCTL_T(kc) - Right Control when held, kc when tapped'
  },
  {
    name: 'RAlt_T',
    code: 'RALT_T(kc)',
    type: 'container',
    title: 'RALT_T(kc) - Right Alt when held, kc when tapped'
  },
  {
    name: 'RGui_T',
    code: 'RGUI_T(kc)',
    type: 'container',
    title: 'RGUI_T(kc) - Right GUI when held, kc when tapped'
  },
  {
    name: 'C_S_T',
    code: 'C_S_T(kc)',
    type: 'container',
    title: 'C_S_T(kc) - Left Control + Left Shift when held, kc when tapped'
  },
  {
    name: 'All_T',
    code: 'ALL_T(kc)',
    type: 'container',
    title: 'ALL_T(kc) - LCTL + LSFT + LALT + LGUI when held, kc when tapped'
  },
  {
    name: 'Meh_T',
    code: 'MEH_T(kc)',
    type: 'container',
    title: 'MEH_T(kc) - LCTL + LSFT + LALT when held, kc when tapped'
  },
  {
    name: 'LCAG_T',
    code: 'LCAG_T(kc)',
    type: 'container',
    title: 'LCAG_T(kc) - LCTL + LALT + LGUI when held, kc when tapped'
  },
  {
    name: 'RCAG_T',
    code: 'RCAG_T(kc)',
    type: 'container',
    title: 'RCAG_T(kc) - RCTL + RALT + RGUI when held, kc when tapped'
  },
  {
    name: 'SGUI_T',
    code: 'SGUI_T(kc)',
    type: 'container',
    title: 'SGUI_T(kc) - LGUI + LSFT when held, kc when tapped'
  },
  {
    name: 'LCA_T',
    code: 'LCA_T(kc)',
    type: 'container',
    title: 'LCA_T(kc) - LCTL + LALT when held, kc when tapped'
  },
  { width: 0 },
  {
    name: 'Hyper',
    code: 'HYPR(kc)',
    type: 'container',
    title: 'HYPR(kc) - LCTL + LSFT + LALT + LGUI'
  },
  {
    name: 'Meh',
    code: 'MEH(kc)',
    type: 'container',
    title: 'MEH(kc) - LCTL + LSFT + LALT'
  },
  {
    name: 'LCAG',
    code: 'LCAG(kc)',
    type: 'container',
    title: 'LCAG(kc) - LCTL + LALT + LGUI'
  },
  {
    name: 'SGUI',
    code: 'SGUI(kc)',
    type: 'container',
    title: 'SGUI(kc) - LGUI + LSFT'
  },
  {
    name: 'LCA',
    code: 'LCA(kc)',
    type: 'container',
    title: 'LCA(kc) - LCTL + LALT'
  },

  { label: 'Special action keys', width: 'label' },

  {
    name: 'Esc/~',
    code: 'KC_GESC',
    title: 'KC_GESC - Esc normally, but ~ when Shift or GUI is pressed'
  },
  {
    name: 'LS/(',
    code: 'KC_LSPO',
    title: 'KC_LSPO - Left shift when held, ( when tapped'
  },
  {
    name: 'RS/)',
    code: 'KC_RSPC',
    title: 'KC_RSPC - Right shift when held, ) when tapped'
  }
];
