export default [
  { label: 'ANSI', width: 'label', group: true },

  { name: 'Esc', code: 'KC_ESC', keys: 'esc', title: 'Escape' },

  { width: 1000 },

  { name: 'F1', code: 'KC_F1', keys: 'f1', title: 'F1' },
  { name: 'F2', code: 'KC_F2', keys: 'f2', title: 'F2' },
  { name: 'F3', code: 'KC_F3', keys: 'f3', title: 'F3' },
  { name: 'F4', code: 'KC_F4', keys: 'f4', title: 'F4' },

  { width: 500 },

  { name: 'F5', code: 'KC_F5', keys: 'f5', title: 'F5' },
  { name: 'F6', code: 'KC_F6', keys: 'f6', title: 'F6' },
  { name: 'F7', code: 'KC_F7', keys: 'f7', title: 'F7' },
  { name: 'F8', code: 'KC_F8', keys: 'f8', title: 'F8' },

  { width: 500 },

  { name: 'F9', code: 'KC_F9', keys: 'f9', title: 'F9' },
  { name: 'F10', code: 'KC_F10', keys: 'f10', title: 'F10' },
  { name: 'F11', code: 'KC_F11', keys: 'f11', title: 'F11' },
  { name: 'F12', code: 'KC_F12', keys: 'f12', title: 'F12' },

  { width: 250 },

  { name: 'Print Screen', code: 'KC_PSCR', title: 'Print Screen' },
  { name: 'Scroll Lock', code: 'KC_SCRL', title: 'Scroll Lock' },
  { name: 'Pause', code: 'KC_PAUS', title: 'Pause' },

  { width: 0 },

  { name: '~\n`', code: 'KC_GRV', keys: '`', title: '` and ~' },
  { name: '!\n1', code: 'KC_1', keys: '1', title: '1 and !' },
  { name: '@\n2', code: 'KC_2', keys: '2', title: '2 and @' },
  { name: '#\n3', code: 'KC_3', keys: '3', title: '3 and #' },
  { name: '$\n4', code: 'KC_4', keys: '4', title: '4 and $' },
  { name: '%\n5', code: 'KC_5', keys: '5', title: '5 and %' },
  { name: '^\n6', code: 'KC_6', keys: '6', title: '6 and ^' },
  { name: '&\n7', code: 'KC_7', keys: '7', title: '7 and &' },
  { name: '*\n8', code: 'KC_8', keys: '8', title: '8 and *' },
  { name: '(\n9', code: 'KC_9', keys: '9', title: '9 and (' },
  { name: ')\n0', code: 'KC_0', keys: '0', title: '0 and )' },
  { name: '_\n-', code: 'KC_MINS', keys: '-', title: '- and _' },
  { name: '+\n=', code: 'KC_EQL', keys: '=', title: '= and +' },
  {
    name: 'Back Space',
    code: 'KC_BSPC',
    keys: 'backspace',
    title: 'Delete (Backspace)',
    width: 2000
  },

  { width: 250 },

  { name: 'Insert', code: 'KC_INS', keys: 'insert', title: 'Insert' },
  { name: 'Home', code: 'KC_HOME', keys: 'home', title: 'Home' },
  { name: 'Page Up', code: 'KC_PGUP', keys: 'pageup', title: 'Page Up' },

  { width: 250 },

  {
    name: 'Num Lock',
    code: 'KC_NUM',
    keys: 'num',
    title: 'Keypad Num Lock and Clear'
  },
  { name: '/', code: 'KC_PSLS', keys: 'num_divide', title: 'Keypad /' },
  { name: '*', code: 'KC_PAST', keys: 'num_multiply', title: 'Keypad *' },
  { name: '-', code: 'KC_PMNS', keys: 'num_subtract', title: 'Keypad -' },

  { width: 0 },

  { name: 'Tab', code: 'KC_TAB', keys: 'tab', title: 'Tab', width: 1500 },
  { name: 'q', code: 'KC_Q', keys: 'q', title: 'q and Q' },
  { name: 'w', code: 'KC_W', keys: 'w', title: 'w and W' },
  { name: 'e', code: 'KC_E', keys: 'e', title: 'e and E' },
  { name: 'r', code: 'KC_R', keys: 'r', title: 'r and R' },
  { name: 't', code: 'KC_T', keys: 't', title: 't and T' },
  { name: 'y', code: 'KC_Y', keys: 'y', title: 'y and Y' },
  { name: 'u', code: 'KC_U', keys: 'u', title: 'u and U' },
  { name: 'i', code: 'KC_I', keys: 'i', title: 'i and I' },
  { name: 'o', code: 'KC_O', keys: 'o', title: 'o and O' },
  { name: 'p', code: 'KC_P', keys: 'p', title: 'p and P' },
  { name: '{\n[', code: 'KC_LBRC', keys: '[', title: '[ and {' },
  { name: '}\n]', code: 'KC_RBRC', keys: ']', title: '] and }' },
  {
    name: '|\n\\',
    code: 'KC_BSLS',
    keys: '\\',
    title: '\\ and |',
    width: 1500
  },

  { width: 250 },

  { name: 'Delete', code: 'KC_DEL', keys: 'delete', title: 'Forward Delete' },
  { name: 'End', code: 'KC_END', keys: 'end', title: 'End' },
  { name: 'Page Down', code: 'KC_PGDN', keys: 'pagedown', title: 'Page Down' },

  { width: 250 },

  { name: '7\nHome', code: 'KC_P7', keys: 'num_7', title: 'Keypad 7 and Home' },
  {
    name: '8\n⏶',
    code: 'KC_P8',
    keys: 'num_8',
    title: 'Keypad 8 and Up Arrow'
  },
  {
    name: '9\nPgUp',
    code: 'KC_P9',
    keys: 'num_9',
    title: 'Keypad 9 and Page Up'
  },
  { name: '+', code: 'KC_PPLS', keys: 'num_add', title: 'Keypad +' },

  { width: 0 },

  {
    name: 'Caps Lock',
    code: 'KC_CAPS',
    keys: 'caps_lock',
    title: 'Caps Lock',
    width: 1750
  },
  { name: 'a', code: 'KC_A', keys: 'a', title: 'a and A' },
  { name: 's', code: 'KC_S', keys: 's', title: 's and S' },
  { name: 'd', code: 'KC_D', keys: 'd', title: 'd and D' },
  { name: 'f', code: 'KC_F', keys: 'f', title: 'f and F' },
  { name: 'g', code: 'KC_G', keys: 'g', title: 'g and G' },
  { name: 'h', code: 'KC_H', keys: 'h', title: 'h and H' },
  { name: 'j', code: 'KC_J', keys: 'j', title: 'j and J' },
  { name: 'k', code: 'KC_K', keys: 'k', title: 'k and K' },
  { name: 'l', code: 'KC_L', keys: 'l', title: 'l and L' },
  { name: ':\n;', code: 'KC_SCLN', keys: ';', title: '; and :' },
  { name: '"\n\'', code: 'KC_QUOT', keys: "'", title: '\' and "' },
  {
    name: 'Enter\n↵',
    code: 'KC_ENT',
    keys: 'enter',
    title: 'Return (Enter)',
    width: 2250
  },

  { width: 3500 },

  {
    name: '4\n⏴',
    code: 'KC_P4',
    keys: 'num_4',
    title: 'Keypad 4 and Left Arrow'
  },
  { name: '5', code: 'KC_P5', keys: 'num_5', title: 'Keypad 5' },
  {
    name: '6\n⏵',
    code: 'KC_P6',
    keys: 'num_6',
    title: 'Keypad 6 and Right Arrow'
  },
  { name: ',', code: 'KC_PCMM', title: 'Keypad ,' },

  { width: 0 },

  {
    name: 'Left Shift',
    code: 'KC_LSFT',
    keys: 'shift',
    title: 'Left Shift',
    width: 2250
  },
  { name: 'z', code: 'KC_Z', keys: 'z', title: 'z and Z' },
  { name: 'x', code: 'KC_X', keys: 'x', title: 'x and X' },
  { name: 'c', code: 'KC_C', keys: 'c', title: 'c and C' },
  { name: 'v', code: 'KC_V', keys: 'v', title: 'v and V' },
  { name: 'b', code: 'KC_B', keys: 'b', title: 'b and B' },
  { name: 'n', code: 'KC_N', keys: 'n', title: 'n and N' },
  { name: 'm', code: 'KC_M', keys: 'm', title: 'm and M' },
  { name: '<\n,', code: 'KC_COMM', keys: ',', title: ', and <' },
  { name: '>\n.', code: 'KC_DOT', keys: '.', title: '. and >' },
  { name: '?\n/', code: 'KC_SLSH', keys: '/', title: '/ and ?' },
  { name: 'Right Shift', code: 'KC_RSFT', title: 'Right Shift', width: 2750 },

  { width: 1250 },

  { name: '⏶', code: 'KC_UP', keys: 'up', title: 'Up Arrow' },

  { width: 1250 },

  { name: '1\nEnd', code: 'KC_P1', keys: 'num_1', title: 'Keypad 1 and End' },
  {
    name: '2\n⏷',
    code: 'KC_P2',
    keys: 'num_2',
    title: 'Keypad 2 and Down Arrow'
  },
  {
    name: '3\nPgDn',
    code: 'KC_P3',
    keys: 'num_3',
    title: 'Keypad 3 and Page Down'
  },
  { name: '=', code: 'KC_PEQL', title: 'Keypad =' },

  { width: 0 },

  {
    name: 'Left Ctrl',
    code: 'KC_LCTL',
    keys: 'ctrl',
    title: 'Left Control',
    width: 1250
  },
  {
    name: 'Left GUI',
    code: 'KC_LGUI',
    keys: 'cmd',
    title: 'Left GUI (Windows/Command/Super)',
    width: 1250
  },
  {
    name: 'Left Alt',
    code: 'KC_LALT',
    keys: 'alt',
    title: 'Left Alt (Option)',
    width: 1250
  },
  {
    name: 'Space',
    code: 'KC_SPC',
    keys: 'space',
    title: 'Spacebar',
    width: 6250
  },
  {
    name: 'Right Alt',
    code: 'KC_RALT',
    title: 'Right Alt (Option/AltGr)',
    width: 1250
  },
  {
    name: 'Right GUI',
    code: 'KC_RGUI',
    title: 'Right GUI (Windows/Command/Super)',
    width: 1250
  },
  {
    name: '≡',
    code: 'KC_APP',
    title: 'Application (Windows Context Menu)',
    width: 1250
  },
  { name: 'Right Ctrl', code: 'KC_RCTL', title: 'Right Control', width: 1250 },

  { width: 250 },

  { name: '⏴', code: 'KC_LEFT', keys: 'left', title: 'Left Arrow' },
  { name: '⏷', code: 'KC_DOWN', keys: 'down', title: 'Down Arrow' },
  { name: '⏵', code: 'KC_RGHT', keys: 'right', title: 'Right Arrow' },

  { width: 250 },

  {
    name: '0\nIns',
    code: 'KC_P0',
    keys: 'num_0',
    title: 'Keypad 0 and Insert',
    width: 2000
  },
  {
    name: '.\nDel',
    code: 'KC_PDOT',
    keys: 'num_decimal',
    title: 'Keypad . and Delete'
  },
  { name: 'Enter', code: 'KC_PENT', keys: 'num_enter', title: 'Keypad Enter' },

  { label: 'Shifted symbols', width: 'label' },

  { name: '~', code: 'KC_TILD', keys: '~', title: '~' },
  { name: '!', code: 'KC_EXLM', keys: '!', title: '!' },
  { name: '@', code: 'KC_AT', keys: '@', title: '@' },
  { name: '#', code: 'KC_HASH', keys: '#', title: '#' },
  { name: '$', code: 'KC_DLR', keys: '$', title: '$' },
  { name: '%', code: 'KC_PERC', keys: '%', title: '%' },
  { name: '^', code: 'KC_CIRC', keys: '^', title: '^' },
  { name: '&', code: 'KC_AMPR', keys: '&', title: '&' },
  { name: '*', code: 'KC_ASTR', keys: '*', title: '*' },
  { name: '(', code: 'KC_LPRN', keys: '(', title: '(' },
  { name: ')', code: 'KC_RPRN', keys: ')', title: ')' },
  { name: '_', code: 'KC_UNDS', keys: '_', title: '_' },
  { name: '+', code: 'KC_PLUS', keys: '+', title: '+' },
  { name: '{', code: 'KC_LCBR', keys: '{', title: '{' },
  { name: '}', code: 'KC_RCBR', keys: '}', title: '}' },
  { name: '<', code: 'KC_LT', keys: '<', title: '<' },
  { name: '>', code: 'KC_GT', keys: '>', title: '>' },
  { name: ':', code: 'KC_COLN', keys: ':', title: ':' },
  { name: '|', code: 'KC_PIPE', keys: '|', title: '|' },
  { name: '?', code: 'KC_QUES', keys: '?', title: '?' },
  { name: '"', code: 'KC_DQUO', keys: '"', title: '"' }
];
