export default [
  { label: 'Quantum', width: 'label', group: true },

  { label: 'QMK specific', width: 'label' },

  { name: '', code: 'KC_NO', title: 'Do nothing' },
  { name: '▽', code: 'KC_TRNS', title: 'Pass-through' },
  { name: 'Reset', code: 'RESET', title: 'Reset the keyboard' },
  { name: 'Debug', code: 'DEBUG', title: 'Toggle debug mode' },
  {
    name: 'EEPROM Reset',
    code: 'EEP_RST',
    title: 'Resets EEPROM state',
    width: 1500
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
    title: 'Momentary turn layer on'
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

  {
    label:
      'Mod key combinations (A = Alt, C = Control, G = Windows/Command, S = Shift)',
    width: 'label'
  },

  { name: 'LSft', code: 'LSFT(kc)', type: 'container' },
  { name: 'LCtl', code: 'LCTL(kc)', type: 'container' },
  { name: 'LAlt', code: 'LALT(kc)', type: 'container' },
  { name: 'LGui', code: 'LGUI(kc)', type: 'container' },
  { name: 'RSft', code: 'RSFT(kc)', type: 'container' },
  { name: 'RCtl', code: 'RCTL(kc)', type: 'container' },
  { name: 'RAlt', code: 'RALT(kc)', type: 'container' },
  { name: 'RGui', code: 'RGUI(kc)', type: 'container' },
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
  {
    name: 'C_S_T',
    code: 'C_S_T(kc)',
    type: 'container',
    title: 'Left Control + Left Shift when held, kc when tapped'
  },
  {
    name: 'All_T',
    code: 'ALL_T(kc)',
    type: 'container',
    title: 'LCTL + LSFT + LALT + LGUI when held, kc when tapped'
  },
  {
    name: 'Meh_T',
    code: 'MEH_T(kc)',
    type: 'container',
    title: 'LCTL + LSFT + LALT when held, kc when tapped'
  },
  {
    name: 'LCAG_T',
    code: 'LCAG_T(kc)',
    type: 'container',
    title: 'LCTL + LALT + LGUI when held, kc when tapped'
  },
  {
    name: 'RCAG_T',
    code: 'RCAG_T(kc)',
    type: 'container',
    title: 'RCTL + RALT + RGUI when held, kc when tapped'
  },
  {
    name: 'SGUI_T',
    code: 'SGUI_T(kc)',
    type: 'container',
    title: 'LGUI + LSFT when held, kc when tapped'
  },
  {
    name: 'LCA_T',
    code: 'LCA_T(kc)',
    type: 'container',
    title: 'LCTL + LALT when held, kc when tapped'
  },
  { width: 0 },
  {
    name: 'Hyper',
    code: 'HYPR(kc)',
    type: 'container',
    title: 'LCTL + LSFT + LALT + LGUI'
  },
  {
    name: 'Meh',
    code: 'MEH(kc)',
    type: 'container',
    title: 'LCTL + LSFT + LALT'
  },
  {
    name: 'LCAG',
    code: 'LCAG(kc)',
    type: 'container',
    title: 'LCTL + LALT + LGUI'
  },
  {
    name: 'SGUI',
    code: 'SGUI(kc)',
    type: 'container',
    title: 'LGUI + LSFT'
  },
  {
    name: 'LCA',
    code: 'LCA(kc)',
    type: 'container',
    title: 'LCTL + LALT'
  },

  { label: 'Special action keys', width: 'label' },

  {
    name: 'Esc/~',
    code: 'KC_GESC',
    title: 'Esc normally, but ~ when Shift or GUI is pressed'
  },
  {
    name: 'LS/(',
    code: 'KC_LSPO',
    title: 'Left shift when held, ( when tapped'
  },
  {
    name: 'RS/)',
    code: 'KC_RSPC',
    title: 'Right shift when held, ) when tapped'
  }
];
