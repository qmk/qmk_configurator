const state = {
  keycodes: [
    { label: 'ANSI', width: 'label', group: true },

    { name: 'Esc', code: 'KC_ESC', keys: 'esc', title: 'KC_ESC' },
    { width: 1000 },
    { name: 'F1', code: 'KC_F1', title: 'KC_F1' },
    { name: 'F2', code: 'KC_F2', title: 'KC_F2' },
    { name: 'F3', code: 'KC_F3', title: 'KC_F3' },
    { name: 'F4', code: 'KC_F4', title: 'KC_F4' },
    { width: 500 },
    { name: 'F5', code: 'KC_F5', title: 'KC_F5' },
    { name: 'F6', code: 'KC_F6', title: 'KC_F6' },
    { name: 'F7', code: 'KC_F7', title: 'KC_F7' },
    { name: 'F8', code: 'KC_F8', title: 'KC_F8' },
    { width: 500 },
    { name: 'F9', code: 'KC_F9', title: 'KC_F9' },
    { name: 'F10', code: 'KC_F10', title: 'KC_F10' },
    { name: 'F11', code: 'KC_F11', title: 'KC_F11' },
    { name: 'F12', code: 'KC_F12', title: 'KC_F12' },
    { width: 250 },
    { name: 'Print Screen', code: 'KC_PSCR', title: 'KC_PSCR' },
    { name: 'Scroll Lock', code: 'KC_SLCK', title: 'KC_SLCK' },
    { name: 'Pause', code: 'KC_PAUS', title: 'KC_PAUS' },
    { width: 0 },

    { name: '~\n`', code: 'KC_GRV', keys: '`', title: 'KC_GRV' },
    { name: '!\n1', code: 'KC_1', keys: '1', title: 'KC_1' },
    { name: '@\n2', code: 'KC_2', keys: '2', title: 'KC_2' },
    { name: '#\n3', code: 'KC_3', keys: '3', title: 'KC_3' },
    { name: '$\n4', code: 'KC_4', keys: '4', title: 'KC_4' },
    { name: '%\n5', code: 'KC_5', keys: '5', title: 'KC_5' },
    { name: '^\n6', code: 'KC_6', keys: '6', title: 'KC_6' },
    { name: '&\n7', code: 'KC_7', keys: '7', title: 'KC_7' },
    { name: '*\n8', code: 'KC_8', keys: '8', title: 'KC_8' },
    { name: '(\n9', code: 'KC_9', keys: '9', title: 'KC_9' },
    { name: ')\n0', code: 'KC_0', keys: '0', title: 'KC_0' },
    { name: '_\n-', code: 'KC_MINS', keys: '-', title: 'KC_MINS' },
    { name: '+\n=', code: 'KC_EQL', keys: '=', title: 'KC_EQL' },
    { name: 'Back Space', code: 'KC_BSPC', keys: 'backspace', title: 'KC_BSPC', width: 2000 },
    { width: 250 },
    { name: 'Insert', code: 'KC_INS', keys: 'insert', title: 'KC_INS' },
    { name: 'Home', code: 'KC_HOME', keys: 'home', title: 'KC_HOME' },
    { name: 'Page Up', code: 'KC_PGUP', keys: 'pageup', title: 'KC_PGUP' },
    { width: 250 },
    { name: 'Num Lock', code: 'KC_NLCK', keys: 'num', title: 'KC_NLCK' },
    { name: '/', code: 'KC_PSLS', keys: 'num_divide', title: 'KC_PSLS' },
    { name: '*', code: 'KC_PAST', keys: 'num_multiply', title: 'KC_PAST' },
    { name: '-', code: 'KC_PMNS', keys: 'num_subtract', title: 'KC_PMNS' },
    { width: 0 },

    { name: 'Tab', code: 'KC_TAB', keys: 'tab', title: 'KC_TAB', width: 1500 },
    { name: 'q', code: 'KC_Q', keys: 'q', title: 'KC_Q' },
    { name: 'w', code: 'KC_W', keys: 'w', title: 'KC_W' },
    { name: 'e', code: 'KC_E', keys: 'e', title: 'KC_E' },
    { name: 'r', code: 'KC_R', keys: 'r', title: 'KC_R' },
    { name: 't', code: 'KC_T', keys: 't', title: 'KC_T' },
    { name: 'y', code: 'KC_Y', keys: 'y', title: 'KC_Y' },
    { name: 'u', code: 'KC_U', keys: 'u', title: 'KC_U' },
    { name: 'i', code: 'KC_I', keys: 'i', title: 'KC_I' },
    { name: 'o', code: 'KC_O', keys: 'o', title: 'KC_O' },
    { name: 'p', code: 'KC_P', keys: 'p', title: 'KC_P' },
    { name: '{\n[', code: 'KC_LBRC', keys: '[', title: 'KC_LBRC' },
    { name: '}\n]', code: 'KC_RBRC', keys: ']', title: 'KC_RBRC' },
    { name: '|\n\\', code: 'KC_BSLS', keys: '\\', title: 'KC_BSLS', width: 1500 },
    { width: 250 },
    { name: 'Del', code: 'KC_DEL', keys: 'delete', title: 'KC_DEL' },
    { name: 'End', code: 'KC_END', keys: 'end', title: 'KC_END' },
    { name: 'Page Down', code: 'KC_PGDN', keys: 'pagedown', title: 'KC_PGDN' },
    { width: 250 },
    { name: '7', code: 'KC_P7', keys: 'num_7', title: 'KC_P7' },
    { name: '8', code: 'KC_P8', keys: 'num_8', title: 'KC_P8' },
    { name: '9', code: 'KC_P9', keys: 'num_9', title: 'KC_P9' },
    { name: '+', code: 'KC_PPLS', keys: 'num_add', title: 'KC_PPLS' },
    { width: 0 },

    { name: 'Caps Lock', code: 'KC_CAPS', keys: 'caps_lock', title: 'KC_CAPS', width: 1750 },
    { name: 'a', code: 'KC_A', keys: 'a', title: 'KC_A' },
    { name: 's', code: 'KC_S', keys: 's', title: 'KC_S' },
    { name: 'd', code: 'KC_D', keys: 'd', title: 'KC_D' },
    { name: 'f', code: 'KC_F', keys: 'f', title: 'KC_F' },
    { name: 'g', code: 'KC_G', keys: 'g', title: 'KC_G' },
    { name: 'h', code: 'KC_H', keys: 'h', title: 'KC_H' },
    { name: 'j', code: 'KC_J', keys: 'j', title: 'KC_J' },
    { name: 'k', code: 'KC_K', keys: 'k', title: 'KC_K' },
    { name: 'l', code: 'KC_L', keys: 'l', title: 'KC_L' },
    { name: ':\n;', code: 'KC_SCLN', keys: ';', title: 'KC_SCLN' },
    { name: '"\n\'', code: 'KC_QUOT', keys: "'", title: 'KC_QUOT' },
    { name: 'Enter', code: 'KC_ENT', keys: 'enter', title: 'KC_ENT', width: 2250 },
    { width: 3500 },
    { name: '4', code: 'KC_P4', keys: 'num_4', title: 'KC_P4' },
    { name: '5', code: 'KC_P5', keys: 'num_5', title: 'KC_P5' },
    { name: '6', code: 'KC_P6', keys: 'num_6', title: 'KC_P6' },
    { name: ',', code: 'KC_PCMM', title: 'KC_PCMM' },
    { width: 0 },

    { name: 'Left Shift', code: 'KC_LSFT', keys: 'shift', title: 'KC_LSFT', width: 2250 },
    { name: 'z', code: 'KC_Z', keys: 'z', title: 'KC_Z' },
    { name: 'x', code: 'KC_X', keys: 'x', title: 'KC_X' },
    { name: 'c', code: 'KC_C', keys: 'c', title: 'KC_C' },
    { name: 'v', code: 'KC_V', keys: 'v', title: 'KC_V' },
    { name: 'b', code: 'KC_B', keys: 'b', title: 'KC_B' },
    { name: 'n', code: 'KC_N', keys: 'n', title: 'KC_N' },
    { name: 'm', code: 'KC_M', keys: 'm', title: 'KC_M' },
    { name: '<\n,', code: 'KC_COMM', keys: ',', title: 'KC_COMM' },
    { name: '>\n.', code: 'KC_DOT', keys: '.', title: 'KC_DOT' },
    { name: '?\n/', code: 'KC_SLSH', keys: '/', title: 'KC_SLSH' },
    { name: 'Right Shift', code: 'KC_RSFT', title: 'KC_RSFT', width: 2750 },
    { width: 1250 },
    { name: 'Up', code: 'KC_UP', keys: 'up', title: 'KC_UP' },
    { width: 1250 },
    { name: '1', code: 'KC_P1', keys: 'num_1', title: 'KC_P1' },
    { name: '2', code: 'KC_P2', keys: 'num_2', title: 'KC_P2' },
    { name: '3', code: 'KC_P3', keys: 'num_3', title: 'KC_P3' },
    { name: '=', code: 'KC_PEQL', title: 'KC_PEQL' },
    { width: 0 },

    { name: 'Left Ctrl', code: 'KC_LCTL', keys: 'ctrl', title: 'KC_LCTL', width: 1250 },
    { name: 'Left OS', code: 'KC_LGUI', keys: 'cmd', title: 'KC_LGUI', width: 1250 },
    { name: 'Left Alt', code: 'KC_LALT', keys: 'alt', title: 'KC_LALT', width: 1250 },
    { name: 'Space', code: 'KC_SPC', keys: 'space', title: 'KC_SPC', width: 6250 },
    { name: 'Right Alt', code: 'KC_RALT', title: 'KC_RALT', width: 1250 },
    { name: 'Right OS', code: 'KC_RGUI', title: 'KC_RGUI', width: 1250 },
    { name: 'Menu', code: 'KC_APP', title: 'KC_APP', width: 1250 },
    { name: 'Right Ctrl', code: 'KC_RCTL', title: 'KC_RCTL', width: 1250 },
    { width: 250 },
    { name: 'Left', code: 'KC_LEFT', keys: 'left', title: 'KC_LEFT' },
    { name: 'Down', code: 'KC_DOWN', keys: 'down', title: 'KC_DOWN' },
    { name: 'Right', code: 'KC_RGHT', keys: 'right', title: 'KC_RGHT' },
    { width: 250 },
    { name: '0', code: 'KC_P0', keys: 'num_0', title: 'KC_P0', width: 2000 },
    { name: '.', code: 'KC_PDOT', keys: 'num_decimal', title: 'KC_PDOT' },
    { name: 'Enter', code: 'KC_PENT', keys: 'num_enter', title: 'KC_PENT' },

    { label: 'Shifted symbols', width: 'label' },

    { name: '~', code: 'KC_TILD', keys: '`', title: 'KC_TILD' },
    { name: '!', code: 'KC_EXLM', keys: '!', title: 'KC_EXLM' },
    { name: '@', code: 'KC_AT', keys: '@', title: 'KC_AT' },
    { name: '#', code: 'KC_HASH', keys: '#', title: 'KC_HASH' },
    { name: '$', code: 'KC_DLR', keys: '$', title: 'KC_DLR' },
    { name: '%', code: 'KC_PERC', keys: '%', title: 'KC_PERC' },
    { name: '^', code: 'KC_CIRC', keys: '^', title: 'KC_CIRC' },
    { name: '&', code: 'KC_AMPR', keys: '&', title: 'KC_AMPR' },
    { name: '*', code: 'KC_ASTR', keys: '*', title: 'KC_ASTR' },
    { name: '(', code: 'KC_LPRN', keys: '(', title: 'KC_LPRN' },
    { name: ')', code: 'KC_RPRN', keys: ')', title: 'KC_RPRN' },
    { name: '_', code: 'KC_UNDS', keys: '_', title: 'KC_UNDS' },
    { name: '+', code: 'KC_PLUS', keys: '+', title: 'KC_PLUS' },
    { name: '{', code: 'KC_LCBR', keys: '{', title: 'KC_LCBR' },
    { name: '}', code: 'KC_RCBR', keys: '}', title: 'KC_RCBR' },
    { name: '<', code: 'KC_LT', keys: '<', title: 'KC_LT' },
    { name: '>', code: 'KC_GT', keys: '>', title: 'KC_GT' },
    { name: ':', code: 'KC_COLN', keys: ':', title: 'KC_COLN' },
    { name: '|', code: 'KC_PIPE', keys: '|', title: 'KC_PIPE' },
    { name: '?', code: 'KC_QUES', keys: '?', title: 'KC_QUES' },
    { name: '"', code: 'KC_DQUO', keys: '"', title: 'KC_DQUO' },


    { label: 'ISO/JIS', width: 'label', group: true },

    { name: 'Esc', code: 'KC_ESC', keys: 'esc', title: 'KC_ESC' },
    { width: 1000 },
    { name: 'F1', code: 'KC_F1', title: 'KC_F1' },
    { name: 'F2', code: 'KC_F2', title: 'KC_F2' },
    { name: 'F3', code: 'KC_F3', title: 'KC_F3' },
    { name: 'F4', code: 'KC_F4', title: 'KC_F4' },
    { width: 500 },
    { name: 'F5', code: 'KC_F5', title: 'KC_F5' },
    { name: 'F6', code: 'KC_F6', title: 'KC_F6' },
    { name: 'F7', code: 'KC_F7', title: 'KC_F7' },
    { name: 'F8', code: 'KC_F8', title: 'KC_F8' },
    { width: 500 },
    { name: 'F9', code: 'KC_F9', title: 'KC_F9' },
    { name: 'F10', code: 'KC_F10', title: 'KC_F10' },
    { name: 'F11', code: 'KC_F11', title: 'KC_F11' },
    { name: 'F12', code: 'KC_F12', title: 'KC_F12' },
    { width: 250 },
    { name: 'Print Screen', code: 'KC_PSCR', title: 'KC_PSCR' },
    { name: 'Scroll Lock', code: 'KC_SLCK', title: 'KC_SLCK' },
    { name: 'Pause', code: 'KC_PAUS', title: 'KC_PAUS' },
    { width: 0 },

    { name: '¬\n`', code: 'KC_GRV', keys: '`', title: 'KC_GRV' },
    { name: '!\n1', code: 'KC_1', keys: '1', title: 'KC_1' },
    { name: '"\n2', code: 'KC_2', keys: '2', title: 'KC_2' },
    { name: '£\n3', code: 'KC_3', keys: '3', title: 'KC_3' },
    { name: '$\n4', code: 'KC_4', keys: '4', title: 'KC_4' },
    { name: '%\n5', code: 'KC_5', keys: '5', title: 'KC_5' },
    { name: '^\n6', code: 'KC_6', keys: '6', title: 'KC_6' },
    { name: '&\n7', code: 'KC_7', keys: '7', title: 'KC_7' },
    { name: '*\n8', code: 'KC_8', keys: '8', title: 'KC_8' },
    { name: '(\n9', code: 'KC_9', keys: '9', title: 'KC_9' },
    { name: ')\n0', code: 'KC_0', keys: '0', title: 'KC_0' },
    { name: '_\n-', code: 'KC_MINS', keys: '-', title: 'KC_MINS' },
    { name: '+\n=', code: 'KC_EQL', keys: '=', title: 'KC_EQL' },
    { name: '|\n¥', code: 'KC_JYEN', title: 'KC_JYEN - JIS Yen and |' },
    { name: 'Back Space', code: 'KC_BSPC', keys: 'backspace', title: 'KC_BSPC' },
    { width: 250 },
    { name: 'Insert', code: 'KC_INS', keys: 'insert', title: 'KC_INS' },
    { name: 'Home', code: 'KC_HOME', keys: 'home', title: 'KC_HOME' },
    { name: 'Page Up', code: 'KC_PGUP', keys: 'pageup', title: 'KC_PGUP' },
    { width: 250 },
    { name: 'Num Lock', code: 'KC_NLCK', keys: 'num', title: 'KC_NLCK' },
    { name: '/', code: 'KC_PSLS', keys: 'num_divide', title: 'KC_PSLS' },
    { name: '*', code: 'KC_PAST', keys: 'num_multiply', title: 'KC_PAST' },
    { name: '-', code: 'KC_PMNS', keys: 'num_subtract', title: 'KC_PMNS' },
    { width: 0 },

    { name: 'Tab', code: 'KC_TAB', keys: 'tab', title: 'KC_TAB', width: 1500 },
    { name: 'q', code: 'KC_Q', keys: 'q', title: 'KC_Q' },
    { name: 'w', code: 'KC_W', keys: 'w', title: 'KC_W' },
    { name: 'e', code: 'KC_E', keys: 'e', title: 'KC_E' },
    { name: 'r', code: 'KC_R', keys: 'r', title: 'KC_R' },
    { name: 't', code: 'KC_T', keys: 't', title: 'KC_T' },
    { name: 'y', code: 'KC_Y', keys: 'y', title: 'KC_Y' },
    { name: 'u', code: 'KC_U', keys: 'u', title: 'KC_U' },
    { name: 'i', code: 'KC_I', keys: 'i', title: 'KC_I' },
    { name: 'o', code: 'KC_O', keys: 'o', title: 'KC_O' },
    { name: 'p', code: 'KC_P', keys: 'p', title: 'KC_P' },
    { name: '{\n[', code: 'KC_LBRC', keys: '[', title: 'KC_LBRC' },
    { name: '}\n]', code: 'KC_RBRC', keys: ']', title: 'KC_RBRC' },
    { width: 1500 },
    { width: 250 },
    { name: 'Del', code: 'KC_DEL', keys: 'delete', title: 'KC_DEL' },
    { name: 'End', code: 'KC_END', keys: 'end', title: 'KC_END' },
    { name: 'Page Down', code: 'KC_PGDN', keys: 'pagedown', title: 'KC_PGDN' },
    { width: 250 },
    { name: '7', code: 'KC_P7', keys: 'num_7', title: 'KC_P7' },
    { name: '8', code: 'KC_P8', keys: 'num_8', title: 'KC_P8' },
    { name: '9', code: 'KC_P9', keys: 'num_9', title: 'KC_P9' },
    { name: '+', code: 'KC_PPLS', keys: 'num_add', title: 'KC_PPLS' },
    { width: 0 },

    { name: 'Caps Lock', code: 'KC_CAPS', keys: 'caps_lock', title: 'KC_CAPS', width: 1750 },
    { name: 'a', code: 'KC_A', keys: 'a', title: 'KC_A' },
    { name: 's', code: 'KC_S', keys: 's', title: 'KC_S' },
    { name: 'd', code: 'KC_D', keys: 'd', title: 'KC_D' },
    { name: 'f', code: 'KC_F', keys: 'f', title: 'KC_F' },
    { name: 'g', code: 'KC_G', keys: 'g', title: 'KC_G' },
    { name: 'h', code: 'KC_H', keys: 'h', title: 'KC_H' },
    { name: 'j', code: 'KC_J', keys: 'j', title: 'KC_J' },
    { name: 'k', code: 'KC_K', keys: 'k', title: 'KC_K' },
    { name: 'l', code: 'KC_L', keys: 'l', title: 'KC_L' },
    { name: ':\n;', code: 'KC_SCLN', keys: ';', title: 'KC_SCLN' },
    { name: '@\n\'', code: 'KC_QUOT', keys: "'", title: 'KC_QUOT' },
    { name: '~\n#', code: 'KC_NUHS', title: 'KC_NUHS - Non-US # and ~' },
    { width: 1250 },
    {
      name: 'Enter',
      code: 'KC_ENT',
      keys: 'enter',
      classes: 'isoenter',
      width: 1250,
      title: 'KC_ENT',
    },
    { width: 3500 },
    { name: '4', code: 'KC_P4', keys: 'num_4', title: 'KC_P4' },
    { name: '5', code: 'KC_P5', keys: 'num_5', title: 'KC_P5' },
    { name: '6', code: 'KC_P6', keys: 'num_6', title: 'KC_P6' },
    { name: ',', code: 'KC_PCMM', title: 'KC_PCMM' },
    { width: 0 },

    { name: 'Left Shift', code: 'KC_LSFT', keys: 'shift', title: 'KC_LSFT', width: 1250 },
    { name: '|\n\\', code: 'KC_NUBS', title: 'KC_NUBS - Non-US \\ and |' },
    { name: 'z', code: 'KC_Z', keys: 'z', title: 'KC_Z' },
    { name: 'x', code: 'KC_X', keys: 'x', title: 'KC_X' },
    { name: 'c', code: 'KC_C', keys: 'c', title: 'KC_C' },
    { name: 'v', code: 'KC_V', keys: 'v', title: 'KC_V' },
    { name: 'b', code: 'KC_B', keys: 'b', title: 'KC_B' },
    { name: 'n', code: 'KC_N', keys: 'n', title: 'KC_N' },
    { name: 'm', code: 'KC_M', keys: 'm', title: 'KC_M' },
    { name: '<\n,', code: 'KC_COMM', keys: ',', title: 'KC_COMM' },
    { name: '>\n.', code: 'KC_DOT', keys: '.', title: 'KC_DOT' },
    { name: '?\n/', code: 'KC_SLSH', keys: '/', title: 'KC_SLSH' },
    { name: '_\n\\', code: 'KC_RO', title: 'KC_RO - JIS \\ and _' },
    { name: 'Right Shift', code: 'KC_RSFT', title: 'KC_RSFT', width: 1750 },
    { width: 1250 },
    { name: 'Up', code: 'KC_UP', keys: 'up', title: 'KC_UP' },
    { width: 1250 },
    { name: '1', code: 'KC_P1', keys: 'num_1', title: 'KC_P1' },
    { name: '2', code: 'KC_P2', keys: 'num_2', title: 'KC_P2' },
    { name: '3', code: 'KC_P3', keys: 'num_3', title: 'KC_P3' },
    { name: '=', code: 'KC_PEQL', title: 'KC_PEQL' },
    { width: 0 },

    { name: 'Left Ctrl', code: 'KC_LCTL', keys: 'ctrl', title: 'KC_LCTL', width: 1250 },
    { name: 'Left OS', code: 'KC_LGUI', keys: 'cmd', title: 'KC_LGUI', width: 1250 },
    { name: 'Left Alt', code: 'KC_LALT', keys: 'alt', title: 'KC_LALT', width: 1250 },
    { name: '無変換', code: 'KC_MHEN', title: 'KC_MHEN - JIS Muhenkan', width: 1250 },
    { name: 'Space', code: 'KC_SPC', keys: 'space', title: 'KC_SPC', width: 4000 },
    { name: '変換', code: 'KC_HENK', title: 'KC_HENK - JIS Henkan', width: 1250 },
    {
      name: 'かな',
      code: 'KC_KANA',
      title: 'KC_KANA - JIS Katakana/Hiragana',
      width: 1250
    },
    { name: 'Right OS', code: 'KC_RGUI', title: 'KC_RGUI', width: 1250 },
    { name: 'Menu', code: 'KC_APP', title: 'KC_APP' },
    { name: 'Right Ctrl', code: 'KC_RCTL', title: 'KC_RCTL', width: 1250 },
    { width: 250 },
    { name: 'Left', code: 'KC_LEFT', keys: 'left', title: 'KC_LEFT' },
    { name: 'Down', code: 'KC_DOWN', keys: 'down', title: 'KC_DOWN' },
    { name: 'Right', code: 'KC_RGHT', keys: 'right', title: 'KC_RGHT' },
    { width: 250 },
    { name: '0', code: 'KC_P0', keys: 'num_0', title: 'KC_P0', width: 2000 },
    { name: '.', code: 'KC_PDOT', keys: 'num_decimal', title: 'KC_PDOT' },
    { name: 'Enter', code: 'KC_PENT', keys: 'num_enter', title: 'KC_PENT' },

    { label: 'Korean and Chinese', width: 'label' },

    { name: '漢字', code: 'KC_HANJ', title: 'KC_HANJ - Korean Hanja' },
    { name: '한영', code: 'KC_HAEN', title: 'KC_HAEN - Korean Han/Yeong' },

    { label: 'Shifted symbols', width: 'label' },

    { name: '~', code: 'KC_TILD', keys: '`', title: 'KC_TILD' },
    { name: '!', code: 'KC_EXLM', keys: '!', title: 'KC_EXLM' },
    { name: '@', code: 'KC_AT', keys: '@', title: 'KC_AT' },
    { name: '#', code: 'KC_HASH', keys: '#', title: 'KC_HASH' },
    { name: '$', code: 'KC_DLR', keys: '$', title: 'KC_DLR' },
    { name: '%', code: 'KC_PERC', keys: '%', title: 'KC_PERC' },
    { name: '^', code: 'KC_CIRC', keys: '^', title: 'KC_CIRC' },
    { name: '&', code: 'KC_AMPR', keys: '&', title: 'KC_AMPR' },
    { name: '*', code: 'KC_ASTR', keys: '*', title: 'KC_ASTR' },
    { name: '(', code: 'KC_LPRN', keys: '(', title: 'KC_LPRN' },
    { name: ')', code: 'KC_RPRN', keys: ')', title: 'KC_RPRN' },
    { name: '_', code: 'KC_UNDS', keys: '_', title: 'KC_UNDS' },
    { name: '+', code: 'KC_PLUS', keys: '+', title: 'KC_PLUS' },
    { name: '{', code: 'KC_LCBR', keys: '{', title: 'KC_LCBR' },
    { name: '}', code: 'KC_RCBR', keys: '}', title: 'KC_RCBR' },
    { name: '<', code: 'KC_LT', keys: '<', title: 'KC_LT' },
    { name: '>', code: 'KC_GT', keys: '>', title: 'KC_GT' },
    { name: ':', code: 'KC_COLN', keys: ':', title: 'KC_COLN' },
    { name: '|', code: 'KC_PIPE', keys: '|', title: 'KC_PIPE' },
    { name: '?', code: 'KC_QUES', keys: '?', title: 'KC_QUES' },
    { name: '"', code: 'KC_DQUO', keys: '"', title: 'KC_DQUO' },


    { label: 'Quantum', width: 'label', group: true },

    { label: 'QMK specific', width: 'label' },

    { name: '', code: 'KC_NO', title: 'KC_NO - Nothing' },
    { name: '▽', code: 'KC_TRNS', title: 'KC_TRNS - Pass-through' },
    { name: 'Reset', code: 'RESET', title: 'RESET - Reset the keyboard' },
    { name: 'Debug', code: 'DEBUG', title: 'DEBUG - Toggle debug mode' },
    { name: 'EEPROM Reset', code: 'EEP_RST', title: 'EEP_RST - Resets EEPROM state', width: 1250 },

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
    },


    { label: 'Keyboard Settings', group: true },

    { label: 'Keyboard settings (persistent)', width: 'label' },

    {
      name: 'Swap LCtl/Caps',
      code: 'MAGIC_SWAP_CONTROL_CAPSLOCK',
      title: 'Swap Left Control and Caps Lock',
      width: 1500
    },
    {
      name: 'Caps>LCtl',
      code: 'MAGIC_CAPSLOCK_TO_CONTROL',
      title: 'Treat Caps Lock as Left Control',
      width: 1500
    },
    {
      name: 'Swap LAlt/LGUI',
      code: 'MAGIC_SWAP_LALT_LGUI',
      title: 'Swap Left Alt and Left GUI',
      width: 1500
    },
    {
      name: 'Swap RAlt/RGUI',
      code: 'MAGIC_SWAP_RALT_RGUI',
      title: 'Swap Right Alt and Right GUI',
      width: 1500
    },
    {
      name: 'Disable GUI',
      code: 'MAGIC_NO_GUI',
      title: 'Disable the GUI keys (useful when gaming)',
      width: 1500
    },
    {
      name: 'Swap ` with Esc',
      code: 'MAGIC_SWAP_GRAVE_ESC',
      title: 'Swap ` and Escape',
      width: 1500
    },
    {
      name: 'Swap \\ with Bksp',
      code: 'MAGIC_SWAP_BACKSLASH_BACKSPACE',
      title: 'Swap Backslash and Backspace',
      width: 1500
    },
    {
      name: 'NKRO On',
      code: 'MAGIC_HOST_NKRO',
      title: 'Force N-Key Rollover (NKRO) on',
      width: 1500
    },
    {
      name: 'Swap Alt/GUI',
      code: 'MAGIC_SWAP_ALT_GUI',
      title: 'Swap Alt and GUI on both sides (for macOS)',
      width: 1500
    },
    {
      width: 0
    },
    {
      name: 'Rev LCtl/Caps',
      code: 'MAGIC_UNSWAP_CONTROL_CAPSLOCK',
      title: 'Unswap Left Control and Caps Lock',
      width: 1500
    },
    {
      name: 'Rev Caps>LCtl',
      code: 'MAGIC_UNCAPSLOCK_TO_CONTROL',
      title: 'Stop treating Caps Lock as Left Control',
      width: 1500
    },
    {
      name: 'Rev LAlt/LGUI',
      code: 'MAGIC_UNSWAP_LALT_LGUI',
      title: 'Unswap Left Alt and Left GUI',
      width: 1500
    },
    {
      name: 'Rev RAlt/RGUI',
      code: 'MAGIC_UNSWAP_RALT_RGUI',
      title: 'Unswap Right Alt and Right GUI',
      width: 1500
    },
    {
      name: 'Enable GUI',
      code: 'MAGIC_UNNO_GUI',
      title: 'Enable the GUI keys',
      width: 1500
    },
    {
      name: 'Rev ` with Esc',
      code: 'MAGIC_UNSWAP_GRAVE_ESC',
      title: 'Unswap ` and Escape',
      width: 1500
    },
    {
      name: 'Rev \\ with Bksp',
      code: 'MAGIC_UNSWAP_BACKSLASH_BACKSPACE',
      title: 'Unswap Backslash and Backspace',
      width: 1500
    },
    {
      name: 'NKRO Off',
      code: 'MAGIC_UNHOST_NKRO',
      title: 'Force N-Key Rollover (NKRO) off',
      width: 1500
    },
    {
      name: 'Rev Alt/GUI',
      code: 'MAGIC_UNSWAP_ALT_GUI',
      title: 'Unswap Alt and GUI on both sides (for macOS)',
      width: 1500
    },
    {
      name: 'Togg NKRO',
      code: 'MAGIC_TOGGLE_NKRO',
      title: 'Turn NKRO on or off',
      width: 1500
    },

    {
      label: 'Backlight settings',
      width: 'label'
    },

    {
      name: 'BL Toggle',
      code: 'BL_TOGG' ,
      title: 'BL_TOGG - Turn the backlight on or off'
    },
    {
      name: 'BL Cycle',
      code: 'BL_STEP' ,
      title: 'BL_STEP - Cycle through backlight levels'
    },
    {
      name: 'BL On',
      code: 'BL_ON',
      title: 'Set the backlight to max brightness'
    },
    {
      name: 'BL Off',
      code: 'BL_OFF',
      title: 'Turn the backlight off'
    },
    {
      name: 'BL +',
      code: 'BL_INC' ,
      title: 'BL_INC - Increase the backlight level'
    },
    {
      name: 'BL -',
      code: 'BL_DEC' ,
      title: 'BL_DEC - Decrease the backlight level'
    },
    {
      name: 'BL Breath',
      code: 'BL_BRTG',
      title: 'Toggle backlight breathing'
    },

    { label: 'RGB Lighting settings', width: 'label' },

    { name: 'RGB Toggle', code: 'RGB_TOG', title: 'RGB_TOG - Toggle RGB lighting on or off' },
    { name: 'RGB Mode +', code: 'RGB_MOD', title: 'RGB_MOD - Next mode' },
    { name: 'RGB Mode -', code: 'RGB_RMOD', title: 'RGB_RMOD - Previous mode' },
    { name: 'Hue +', code: 'RGB_HUI', title: 'RGB_HUI - Increase hue' },
    { name: 'Hue -', code: 'RGB_HUD', title: 'RGB_HUD - Decrease hue' },
    { name: 'Sat +', code: 'RGB_SAI', title: 'RGB_SAI - Increase saturation' },
    { name: 'Sat -', code: 'RGB_SAD', title: 'RGB_SAD - Decrease saturation' },
    { name: 'Bright +', code: 'RGB_VAI', title: 'RGB_VAI - Increase value (brightness)' },
    { name: 'Bright -', code: 'RGB_VAD', title: 'RGB_VAD - Decrease value (brightness)' },
    { name: 'Effect +', code: 'RGB_SPI', title: 'RGB_SPI - Increase effect speed' },
    { name: 'Effect -', code: 'RGB_SPD', title: 'RGB_SPD - Decrease effect speed' },
    { name: 'RGB Mode P', code: 'RGB_M_P', title: 'RGB_M_P - RGB Mode: Plain' },
    { name: 'RGB Mode B', code: 'RGB_M_B', title: 'RGB_M_B - RGB Mode: Breathe' },
    { name: 'RGB Mode R', code: 'RGB_M_R', title: 'RGB_M_R - RGB Mode: Rainbow' },
    { name: 'RGB Mode SW', code: 'RGB_M_SW', title: 'RGB_M_SW - RGB Mode: Swirl' },
    { name: 'RGB Mode SN', code: 'RGB_M_SN', title: 'RGB_M_SN - RGB Mode: Snake' },
    { name: 'RGB Mode K', code: 'RGB_M_K', title: 'RGB_M_K - RGB Mode: Knight Rider' },
    { name: 'RGB Mode X', code: 'RGB_M_X', title: 'RGB_M_X - RGB Mode: Christmas' },
    { name: 'RGB Mode G', code: 'RGB_M_G', title: 'RGB_M_G - RGB Mode: Gradient' },


    { label: 'App, Media, and Mouse', width: 'label', group: true },

    { label: 'Application', width: 'label' },

    { name: 'Power', code: 'KC_PWR', title: 'KC_PWR - System Power Down' },
    { name: 'Sleep', code: 'KC_SLEP', title: 'KC_SLEP - System Sleep' },
    { name: 'Wake', code: 'KC_WAKE', title: 'KC_WAKE - System Wake' },
    { width: 250 },
    { name: 'Exec', code: 'KC_EXEC', title: 'KC_EXEC' },
    { name: 'Help', code: 'KC_HELP', title: 'KC_HELP' },
    { name: 'Menu', code: 'KC_MENU', title: 'KC_MENU' },
    { name: 'Select', code: 'KC_SLCT', title: 'KC_SLCT' },
    { name: 'Stop', code: 'KC_STOP', title: 'KC_STOP' },
    { name: 'Again', code: 'KC_AGIN', title: 'KC_AGIN' },
    { name: 'Undo', code: 'KC_UNDO', title: 'KC_UNDO' },
    { name: 'Cut', code: 'KC_CUT', title: 'KC_CUT' },
    { name: 'Copy', code: 'KC_COPY', title: 'KC_COPY' },
    { name: 'Paste', code: 'KC_PSTE', title: 'KC_PSTE' },
    { name: 'Find', code: 'KC_FIND', title: 'KC_FIND' },

    { label: 'Multimedia Keys', width: 'label' },

    { name: 'Previous', code: 'KC_MPRV', title: 'KC_MPRV - Media Previous' },
    { name: 'Next', code: 'KC_MNXT', title: 'KC_MNXT - Media Next' },
    { name: 'Mute', code: 'KC_MUTE', title: 'KC_MUTE - Mute Audio' },
    { name: 'Vol -', code: 'KC_VOLD', title: 'KC_VOLD - Volume Down' },
    { name: 'Vol +', code: 'KC_VOLU', title: 'KC_VOLU - Volume Up' },
    { name: 'Media Stop', code: 'KC_MSTP', title: 'KC_MSTP - Media Stop' },
    { name: 'Play', code: 'KC_MPLY', title: 'KC_MPLY - Play/Pause' },
    { name: 'Sleep', code: 'KC_SLEP', title: 'KC_SLEP - System Sleep' },

    { label: 'Multimedia Keys (macOS)', width: 'label' },

    { name: 'Prev Track', code: 'KC_MRWD', title: 'Previous Track (macOS)' },
    { name: 'Next Track', code: 'KC_MFFD', title: 'Next Track (macOS)' },
    { name: 'Mute', code: 'KC__MUTE', title: 'Mute Audio (macOS)' },
    { name: 'Vol -', code: 'KC__VOLDOWN', title: 'Volume Down (macOS)' },
    { name: 'Vol +', code: 'KC__VOLUP', title: 'Volume Up (macOS)' },
    { width: 250 },
    { name: 'Eject', code: 'KC_EJCT', title: 'Eject (macOS)'},

    { label: 'Mouse Keys', width: 'label' },

    { name: 'Mouse Up', code: 'KC_MS_U', title: 'KC_MS_U - Mouse Cursor Up' },
    { name: 'Mouse Down', code: 'KC_MS_D', title: 'KC_MS_D - Mouse Cursor Down' },
    { name: 'Mouse Left', code: 'KC_MS_L', title: 'KC_MS_L - Mouse Cursor Left' },
    { name: 'Mouse Right', code: 'KC_MS_R', title: 'KC_MS_R - Mouse Cursor Right' },
    { width: 250 },
    { name: 'Mouse 1', code: 'KC_BTN1', title: 'KC_BTN1 - Mouse Button 1' },
    { name: 'Mouse 2', code: 'KC_BTN2', title: 'KC_BTN2 - Mouse Button 2' },
    { name: 'Mouse 3', code: 'KC_BTN3', title: 'KC_BTN3 - Mouse Button 3' },
    { name: 'Mouse 4', code: 'KC_BTN4', title: 'KC_BTN4 - Mouse Button 4' },
    { name: 'Mouse 5', code: 'KC_BTN5', title: 'KC_BTN5 - Mouse Button 5' },
    { width: 250 },
    { name: 'Mouse Wheel Up', code: 'KC_WH_U', title: 'KC_WH_U - Mouse Wheel Up' },
    { name: 'Mouse Wheel Down', code: 'KC_WH_D', title: 'KC_WH_D - Mouse Wheel Down' },
    { name: 'Mouse Wheel Left', code: 'KC_WH_L', title: 'KC_WH_L - Mouse Wheel Left' },
    { name: 'Mouse Wheel Right', code: 'KC_WH_R', title: 'KC_WH_R - Mouse Wheel Right' },
    { width: 250 },
    { name: 'Mouse Accel 0', code: 'KC_ACL0', title: 'Set mouse acceleration to 0' },
    { name: 'Mouse Accel 1', code: 'KC_ACL1', title: 'Set mouse acceleration to 1' },
    { name: 'Mouse Accel 2', code: 'KC_ACL2', title: 'Set mouse acceleration to 2' }

  ]
};

const getters = {
  keycodes: state => state.keycodes,
  lookupKeyPressCode: (state, getters) => searchTerm =>
    getters.lookupKeycode(searchTerm, true),
  lookupKeycode: state => (searchTerm, isKeys = false) => {
    var found = state.keycodes.find(({ code, keys }) => {
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
