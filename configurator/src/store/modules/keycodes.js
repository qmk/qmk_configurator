const state = [
  { name: 'Esc', code: 'KC_ESC', keys: 'esc' },
  { width: 1000 },
  { name: 'F1', code: 'KC_F1' },
  { name: 'F2', code: 'KC_F2' },
  { name: 'F3', code: 'KC_F3' },
  { name: 'F4', code: 'KC_F4' },
  { width: 500 },
  { name: 'F5', code: 'KC_F5' },
  { name: 'F6', code: 'KC_F6' },
  { name: 'F7', code: 'KC_F7' },
  { name: 'F8', code: 'KC_F8' },
  { width: 500 },
  { name: 'F9', code: 'KC_F9' },
  { name: 'F10', code: 'KC_F10' },
  { name: 'F11', code: 'KC_F11' },
  { name: 'F12', code: 'KC_F12' },
  { width: 250 },
  { name: 'Print Screen', code: 'KC_PSCR' },
  { name: 'Scroll Lock', code: 'KC_SLCK' },
  { name: 'Pause', code: 'KC_PAUS' },
  { width: 0 },

  { name: '~\n`', code: 'KC_GRV', keys: '`' },
  { name: '!\n1', code: 'KC_1', keys: '1' },
  { name: '@\n2', code: 'KC_2', keys: '2' },
  { name: '#\n3', code: 'KC_3', keys: '3' },
  { name: '$\n4', code: 'KC_4', keys: '4' },
  { name: '%\n5', code: 'KC_5', keys: '5' },
  { name: '^\n6', code: 'KC_6', keys: '6' },
  { name: '&\n7', code: 'KC_7', keys: '7' },
  { name: '*\n8', code: 'KC_8', keys: '8' },
  { name: '(\n9', code: 'KC_9', keys: '9' },
  { name: ')\n0', code: 'KC_0', keys: '0' },
  { name: '_\n-', code: 'KC_MINS', keys: '-' },
  { name: '+\n=', code: 'KC_EQL', keys: '=' },
  { name: 'Back Space', code: 'KC_BSPC', keys: 'backspace', width: 2000 },
  { width: 250 },
  { name: 'Insert', code: 'KC_INS', keys: 'insert' },
  { name: 'Home', code: 'KC_HOME', keys: 'home' },
  { name: 'Page Up', code: 'KC_PGUP', keys: 'pageup' },
  { width: 250 },
  { name: 'Num Lock', code: 'KC_NLCK', keys: 'num' },
  { name: '/', code: 'KC_PSLS', keys: 'num_divide' },
  { name: '*', code: 'KC_PAST', keys: 'num_multiply' },
  { name: '-', code: 'KC_PMNS', keys: 'num_subtract' },
  { width: 0 },

  { name: 'Tab', code: 'KC_TAB', keys: 'tab', width: 1500 },
  { name: 'q', code: 'KC_Q', keys: 'q' },
  { name: 'w', code: 'KC_W', keys: 'w' },
  { name: 'e', code: 'KC_E', keys: 'e' },
  { name: 'r', code: 'KC_R', keys: 'r' },
  { name: 't', code: 'KC_T', keys: 't' },
  { name: 'y', code: 'KC_Y', keys: 'y' },
  { name: 'u', code: 'KC_U', keys: 'u' },
  { name: 'i', code: 'KC_I', keys: 'i' },
  { name: 'o', code: 'KC_O', keys: 'o' },
  { name: 'p', code: 'KC_P', keys: 'p' },
  { name: '{\n[', code: 'KC_LBRC', keys: '[' },
  { name: '}\n]', code: 'KC_RBRC', keys: ']' },
  { name: '|\n\\', code: 'KC_BSLS', keys: '\\', width: 1500 },
  { width: 250 },
  { name: 'Del', code: 'KC_DEL', keys: 'delete' },
  { name: 'End', code: 'KC_END', keys: 'end' },
  { name: 'Page Down', code: 'KC_PGDN', keys: 'pagedown' },
  { width: 250 },
  { name: '7', code: 'KC_P7', keys: 'num_7' },
  { name: '8', code: 'KC_P8', keys: 'num_8' },
  { name: '9', code: 'KC_P9', keys: 'num_9' },
  { name: '+', code: 'KC_PPLS', keys: 'num_add' },
  { width: 0 },

  { name: 'Caps Lock', code: 'KC_CAPS', keys: 'caps_lock', width: 1750 },
  { name: 'a', code: 'KC_A', keys: 'a' },
  { name: 's', code: 'KC_S', keys: 's' },
  { name: 'd', code: 'KC_D', keys: 'd' },
  { name: 'f', code: 'KC_F', keys: 'f' },
  { name: 'g', code: 'KC_G', keys: 'g' },
  { name: 'h', code: 'KC_H', keys: 'h' },
  { name: 'j', code: 'KC_J', keys: 'j' },
  { name: 'k', code: 'KC_K', keys: 'k' },
  { name: 'l', code: 'KC_L', keys: 'l' },
  { name: ':\n;', code: 'KC_SCLN', keys: ';' },
  { name: '"\n\'', code: 'KC_QUOT', keys: "'" },
  { name: 'Enter', code: 'KC_ENT', keys: 'enter', width: 2250 },
  { width: 3500 },
  { name: '4', code: 'KC_P4', keys: 'num_4' },
  { name: '5', code: 'KC_P5', keys: 'num_5' },
  { name: '6', code: 'KC_P6', keys: 'num_6' },
  { name: ',', code: 'KC_PCMM' },
  { width: 0 },

  { name: 'Left Shift', code: 'KC_LSFT', keys: 'shift', width: 2250 },
  { name: 'z', code: 'KC_Z', keys: 'z' },
  { name: 'x', code: 'KC_X', keys: 'x' },
  { name: 'c', code: 'KC_C', keys: 'c' },
  { name: 'v', code: 'KC_V', keys: 'v' },
  { name: 'b', code: 'KC_B', keys: 'b' },
  { name: 'n', code: 'KC_N', keys: 'n' },
  { name: 'm', code: 'KC_M', keys: 'm' },
  { name: '<\n,', code: 'KC_COMM', keys: ',' },
  { name: '>\n.', code: 'KC_DOT', keys: '.' },
  { name: '?\n/', code: 'KC_SLSH', keys: '/' },
  { name: 'Right Shift', code: 'KC_RSFT', width: 2750 },
  { width: 1250 },
  { name: 'Up', code: 'KC_UP', keys: 'up' },
  { width: 1250 },
  { name: '1', code: 'KC_P1', keys: 'num_1' },
  { name: '2', code: 'KC_P2', keys: 'num_2' },
  { name: '3', code: 'KC_P3', keys: 'num_3' },
  { name: '=', code: 'KC_PEQL' },
  { width: 0 },

  { name: 'Left Ctrl', code: 'KC_LCTL', keys: 'ctrl', width: 1250 },
  { name: 'Left OS', code: 'KC_LGUI', keys: 'cmd', width: 1250 },
  { name: 'Left Alt', code: 'KC_LALT', keys: 'alt', width: 1250 },
  { name: 'Space', code: 'KC_SPC', keys: 'space', width: 6250 },
  { name: 'Right Alt', code: 'KC_RALT', width: 1250 },
  { name: 'Right OS', code: 'KC_RGUI', width: 1250 },
  { name: 'Menu', code: 'KC_APP', width: 1250 },
  { name: 'Right Ctrl', code: 'KC_RCTL', width: 1250 },
  { width: 250 },
  { name: 'Left', code: 'KC_LEFT', keys: 'left' },
  { name: 'Down', code: 'KC_DOWN', keys: 'down' },
  { name: 'Right', code: 'KC_RGHT', keys: 'right' },
  { width: 250 },
  { name: '0', code: 'KC_P0', width: 2000, keys: 'num_0' },
  { name: '.', code: 'KC_PDOT', keys: 'num_decimal' },
  { name: 'Enter', code: 'KC_PENT', keys: 'num_enter' },

  { label: 'International', width: 'label' },

  { name: 'NUHS', code: 'KC_NUHS', title: 'Non-US # and ~' },
  { name: 'NUBS', code: 'KC_NUBS', title: 'Non-US \\ and |' },

  { name: 'Ro', code: 'KC_RO', title: 'JIS \\ and |' },
  { name: '¥', code: 'KC_JYEN' },

  { name: '無変換', code: 'KC_MHEN', title: 'JIS Muhenkan' },
  { name: '漢字', code: 'KC_HANJ', title: '' },

  { name: '한영', code: 'KC_HAEN', title: '' },
  { name: '変換', code: 'KC_HENK', title: 'JIS Henkan' },
  { name: 'かな', code: 'KC_KANA', title: 'JIS Katakana/Hiragana' },

  { label: 'QMK specific', width: 'label' },

  { name: '', code: 'KC_NO', title: 'Nothing' },
  { name: '▽', code: 'KC_TRNS', title: 'Pass-through' },
  { name: 'Reset', code: 'RESET', title: 'Reset the keyboard' },
  { name: 'Debug', code: 'DEBUG', title: 'Toggle debug mode' },
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
    title: 'Shift when held, kc when tapped'
  },
  {
    name: 'LCtl_T',
    code: 'LCTL_T(kc)',
    type: 'container',
    title: 'Control when held, kc when tapped'
  },
  {
    name: 'LAlt_T',
    code: 'LALT_T(kc)',
    type: 'container',
    title: 'Alt when held, kc when tapped'
  },
  {
    name: 'LGui_T',
    code: 'LGUI_T(kc)',
    type: 'container',
    title: 'Gui when held, kc when tapped'
  },
  {
    name: 'RSft_T',
    code: 'RSFT_T(kc)',
    type: 'container',
    title: 'Shift when held, kc when tapped'
  },
  {
    name: 'RCtl_T',
    code: 'RCTL_T(kc)',
    type: 'container',
    title: 'Control when held, kc when tapped'
  },
  {
    name: 'RAlt_T',
    code: 'RALT_T(kc)',
    type: 'container',
    title: 'Alt when held, kc when tapped'
  },
  {
    name: 'RGui_T',
    code: 'RGUI_T(kc)',
    type: 'container',
    title: 'Gui when held, kc when tapped'
  },
  {
    name: 'CS_T',
    code: 'C_S_T(kc)',
    type: 'container',
    title: 'Control + Shift when held, kc when tapped'
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
    code: 'SCMD_T(kc)',
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
    name: 'ALTG',
    code: 'ALTG(kc)',
    type: 'container',
    title: 'RCTL + RALT'
  },
  {
    name: 'SGUI',
    code: 'SCMD(kc)',
    type: 'container',
    title: 'LGUI + LSFT'
  },
  { name: 'LCA', code: 'LCA(kc)', type: 'container', title: 'LCTL + LALT' },

  { label: 'Alphabet', width: 'label' },

  { name: 'a', code: 'KC_A' },
  { name: 'b', code: 'KC_B' },
  { name: 'c', code: 'KC_C' },
  { name: 'd', code: 'KC_D' },
  { name: 'e', code: 'KC_E' },
  { name: 'f', code: 'KC_F' },
  { name: 'g', code: 'KC_G' },
  { name: 'h', code: 'KC_H' },
  { name: 'i', code: 'KC_I' },
  { name: 'j', code: 'KC_J' },
  { name: 'k', code: 'KC_K' },
  { name: 'l', code: 'KC_L' },
  { name: 'm', code: 'KC_M' },
  { width: 0 },
  { name: 'n', code: 'KC_N' },
  { name: 'o', code: 'KC_O' },
  { name: 'p', code: 'KC_P' },
  { name: 'q', code: 'KC_Q' },
  { name: 'r', code: 'KC_R' },
  { name: 's', code: 'KC_S' },
  { name: 't', code: 'KC_T' },
  { name: 'u', code: 'KC_U' },
  { name: 'v', code: 'KC_V' },
  { name: 'w', code: 'KC_W' },
  { name: 'x', code: 'KC_X' },
  { name: 'y', code: 'KC_Y' },
  { name: 'z', code: 'KC_Z' },

  { label: 'Special action keys', width: 'label' },
  {
    name: 'Esc/~',
    code: 'KC_GESC',
    title: 'Esc normally, but ~ when shift/gui is pressed'
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
  },

  { label: 'Shifted symbols', width: 'label' },

  { name: '~', code: 'KC_TILD', keys: '`' },
  { name: '!', code: 'KC_EXLM', keys: '!' },
  { name: '@', code: 'KC_AT', keys: '@' },
  { name: '#', code: 'KC_HASH', keys: '#' },
  { name: '$', code: 'KC_DLR', keys: '$' },
  { name: '%', code: 'KC_PERC', keys: '%' },
  { name: '^', code: 'KC_CIRC', keys: '^' },
  { name: '&', code: 'KC_AMPR', keys: '&' },
  { name: '*', code: 'KC_ASTR', keys: '*' },
  { name: '(', code: 'KC_LPRN', keys: '(' },
  { name: ')', code: 'KC_RPRN', keys: ')' },
  { name: '_', code: 'KC_UNDS', keys: '_' },
  { name: '+', code: 'KC_PLUS', keys: '+' },
  { name: '{', code: 'KC_LCBR', keys: '{' },
  { name: '}', code: 'KC_RCBR', keys: '}' },
  { name: '<', code: 'KC_LT', keys: '<' },
  { name: '>', code: 'KC_GT', keys: '>' },
  { name: ':', code: 'KC_COLN', keys: ':' },
  { name: '|', code: 'KC_PIPE', keys: '|' },
  { name: '?', code: 'KC_QUES', keys: '?' },
  { name: '"', code: 'KC_DQUO', keys: '"' },

  { label: 'Application', width: 'label' },

  { name: 'Power', code: 'KC_PWR' },
  { name: 'Help', code: 'KC_HELP' },
  { name: 'Stop', code: 'KC_STOP' },
  { name: 'Again', code: 'KC_AGIN' },
  { name: 'Menu', code: 'KC_MENU' },
  { name: 'Undo', code: 'KC_UNDO' },
  { name: 'Select', code: 'KC_SLCT' },
  { name: 'Copy', code: 'KC_COPY' },
  { name: 'Exec', code: 'KC_EXEC' },
  { name: 'Paste', code: 'KC_PSTE' },
  { name: 'Find', code: 'KC_FIND' },
  { name: 'Cut', code: 'KC_CUT' },

  { label: 'Keyboard settings (persistent)', width: 'label' },

  { name: 'Swap C/Caps', code: 'MAGIC_SWAP_CONTROL_CAPSLOCK' },
  { name: 'Caps>C', code: 'MAGIC_CAPSLOCK_TO_CONTROL' },
  { name: 'Swap LA/LO', code: 'MAGIC_SWAP_LALT_LGUI' },
  { name: 'Swap RA/RO', code: 'MAGIC_SWAP_RALT_RGUI' },
  { name: 'No O', code: 'MAGIC_NO_GUI' },
  { name: 'Swap `/Esc', code: 'MAGIC_SWAP_GRAVE_ESC' },
  { name: 'Swap \\/BS', code: 'MAGIC_SWAP_BACKSLASH_BACKSPACE' },
  { name: 'NKRO', code: 'MAGIC_HOST_NKRO' },
  { name: 'Swap A/O', code: 'MAGIC_SWAP_ALT_GUI' },
  { name: 'Rev C/Caps', code: 'MAGIC_UNSWAP_CONTROL_CAPSLOCK' },
  { name: 'Rev Caps>C', code: 'MAGIC_UNCAPSLOCK_TO_CONTROL' },
  { name: 'Rev LA/LO', code: 'MAGIC_UNSWAP_LALT_LGUI' },
  { name: 'Rev RA/RO', code: 'MAGIC_UNSWAP_RALT_RGUI' },
  { name: 'Rev No O', code: 'MAGIC_UNNO_GUI' },
  { name: 'Rev `/Esc', code: 'MAGIC_UNSWAP_GRAVE_ESC' },
  { name: 'Rev \\/BS', code: 'MAGIC_UNSWAP_BACKSLASH_BACKSPACE' },
  { name: 'Rev NKRO', code: 'MAGIC_UNHOST_NKRO' },
  { name: 'Rev A/O', code: 'MAGIC_UNSWAP_ALT_GUI' },
  { name: 'Togg NKRO', code: 'MAGIC_TOGGLE_NKRO' },

  { label: 'Backlight settings', width: 'label' },

  { name: 'BL Toggle', code: 'BL_TOGG' },
  { name: 'BL +', code: 'BL_INC' },
  { name: 'BL -', code: 'BL_DEC' },
  { name: 'BL Cycle', code: 'BL_STEP' },

  { label: 'RGB Lighting settings', width: 'label' },

  { name: 'RGB Toggle', code: 'RGB_TOG' },
  { name: 'RGB Mode +', code: 'RGB_MOD' },
  { name: 'RGB Mode -', code: 'RGB_RMOD' },
  { name: 'Hue +', code: 'RGB_HUI' },
  { name: 'Hue -', code: 'RGB_HUD' },
  { name: 'Sat +', code: 'RGB_SAI' },
  { name: 'Sat -', code: 'RGB_SAD' },
  { name: 'Bright +', code: 'RGB_VAI' },
  { name: 'Bright -', code: 'RGB_VAD' },
  { name: 'Effect +', code: 'RGB_SPI' },
  { name: 'Effect -', code: 'RGB_SPD' },
  { name: 'RGB Mode P', code: 'RGB_M_P', title: 'Plain' },
  { name: 'RGB Mode B', code: 'RGB_M_B', title: 'Breathe' },
  { name: 'RGB Mode R', code: 'RGB_M_R', title: 'Rainbow' },
  { name: 'RGB Mode SW', code: 'RGB_M_SW', title: 'Swirl' },
  { name: 'RGB Mode SN', code: 'RGB_M_SN', title: 'Snake' },
  { name: 'RGB Mode K', code: 'RGB_M_K', title: 'Knight' },
  { name: 'RGB Mode X', code: 'RGB_M_X', title: 'Xmas' },
  { name: 'RGB Mode G', code: 'RGB_M_G', title: 'Gradient' },

  { label: 'Multimedia Keys', width: 'label' },

  { name: 'Previous', code: 'KC_MPRV', title: 'Media Previous' },
  { name: 'Next', code: 'KC_MNXT', title: 'Media Next' },
  { name: 'Mute', code: 'KC_MUTE', title: 'Mute Audio' },
  { name: 'Vol -', code: 'KC_VOLD', title: 'Volume Down' },
  { name: 'Vol +', code: 'KC_VOLU', title: 'Volume Up' },
  { name: 'Media Stop', code: 'KC_MSTP', title: 'Media Stop' },
  { name: 'Play', code: 'KC_MPLY', title: 'Play/Pause' },
  { name: 'Sleep', code: 'KC_SLEP', title: 'System Sleep' }
];

const getters = {
  lookupKeyPressCode: () => searchTerm =>
    getters.lookupKeycode(searchTerm, true),
  lookupKeycode: state => (searchTerm, isKeys = false) => {
    var found = state.find(({ code, keys }) => {
      return code === searchTerm || (isKeys && keys && keys === searchTerm);
    });
    return found;
  }
};

const actions = {};
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
