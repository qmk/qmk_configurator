import defaults from './config';
import Vue from 'vue';

const ANSIcodeToPos = [
  'Escape',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'F13',
  'ScrollLock',
  'Pause',
  'Backquote',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
  'Digit0',
  'Minus',
  'Equal',
  'Backspace',
  'Insert',
  'Home',
  'PageUp',
  'NumLock',
  'NumpadDivide',
  'NumpadMultiply',
  'NumpadSubtract',
  'Tab',
  'KeyQ',
  'KeyW',
  'KeyE',
  'KeyR',
  'KeyT',
  'KeyY',
  'KeyU',
  'KeyI',
  'KeyO',
  'KeyP',
  'BracketLeft',
  'BracketRight',
  'Backslash',
  'Delete',
  'End',
  'PageDown',
  'Numpad7',
  'Numpad8',
  'Numpad9',
  'NumpadAdd',
  'CapsLock',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL',
  'Semicolon',
  'Quote',
  'Enter',
  'Numpad4',
  'Numpad5',
  'Numpad6',
  'ShiftLeft',
  'KeyZ',
  'KeyX',
  'KeyC',
  'KeyV',
  'KeyB',
  'KeyN',
  'KeyM',
  'Comma',
  'Period',
  'Slash',
  'ShiftRight',
  'ArrowUp',
  'Numpad1',
  'Numpad2',
  'Numpad3',
  'NumpadEnter',
  'ControlLeft',
  'MetaLeft',
  'AltLeft',
  'Space',
  'AltRight',
  'MetaRight',
  'ContextMenu',
  'ControlRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
  'Numpad0',
  'NumpadDecimal',
  'IntlBackslash'
];
const ISOcodeToPos = [
  'Escape',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'F13',
  'ScrollLock',
  'Pause',
  'Backquote',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
  'Digit0',
  'Minus',
  'Equal',
  'Backspace',
  'Insert',
  'Home',
  'PageUp',
  'NumLock',
  'NumpadDivide',
  'NumpadMultiply',
  'NumpadSubtract',
  'Tab',
  'KeyQ',
  'KeyW',
  'KeyE',
  'KeyR',
  'KeyT',
  'KeyY',
  'KeyU',
  'KeyI',
  'KeyO',
  'KeyP',
  'BracketLeft',
  'BracketRight',
  'Enter',
  'Delete',
  'End',
  'PageDown',
  'Numpad7',
  'Numpad8',
  'Numpad9',
  'NumpadAdd',
  'CapsLock',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL',
  'Semicolon',
  'Quote',
  'Backslash',
  'Numpad4',
  'Numpad5',
  'Numpad6',
  'ShiftLeft',
  'IntlBackslash',
  'KeyZ',
  'KeyX',
  'KeyC',
  'KeyV',
  'KeyB',
  'KeyN',
  'KeyM',
  'Comma',
  'Period',
  'Slash',
  'ShiftRight',
  'ArrowUp',
  'Numpad1',
  'Numpad2',
  'Numpad3',
  'NumpadEnter',
  'ControlLeft',
  'MetaLeft',
  'AltLeft',
  'Space',
  'AltRight',
  'MetaRight',
  'ContextMenu',
  'ControlRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
  'Numpad0',
  'NumpadDecimal'
];
function reduceCodeToPos(arr) {
  return arr.reduce((acc, code, idx) => {
    acc[code] = idx;
    return acc;
  }, {});
}
const codeToPosition = {
  ANSI: reduceCodeToPos(ANSIcodeToPos),
  ISO: reduceCodeToPos(ISOcodeToPos)
};

const state = {
  defaults,
  codeToPosition,
  config: Object.assign({}, defaults),
  layout: 'ANSI',
  keymap: [],
  layouts: {
    ISO: {
      keymapIdx: 1,
      layout: [
        { label: 'Esc', x: 0, y: 0 },
        { label: 'F1', x: 2, y: 0 },
        { label: 'F2', x: 3, y: 0 },
        { label: 'F3', x: 4, y: 0 },
        { label: 'F4', x: 5, y: 0 },
        { label: 'F5', x: 6.5, y: 0 },
        { label: 'F6', x: 7.5, y: 0 },
        { label: 'F7', x: 8.5, y: 0 },
        { label: 'F8', x: 9.5, y: 0 },
        { label: 'F9', x: 11, y: 0 },
        { label: 'F10', x: 12, y: 0 },
        { label: 'F11', x: 13, y: 0 },
        { label: 'F12', x: 14, y: 0 },
        { label: 'PrtSc', x: 15.25, y: 0 },
        { label: 'Scroll Lock', x: 16.25, y: 0 },
        { label: 'Pause', x: 17.25, y: 0 },
        { label: '~', x: 0, y: 1.5 },
        { label: '!', x: 1, y: 1.5 },
        { label: '@', x: 2, y: 1.5 },
        { label: '#', x: 3, y: 1.5 },
        { label: '$', x: 4, y: 1.5 },
        { label: '%', x: 5, y: 1.5 },
        { label: '^', x: 6, y: 1.5 },
        { label: '&', x: 7, y: 1.5 },
        { label: '*', x: 8, y: 1.5 },
        { label: '(', x: 9, y: 1.5 },
        { label: ')', x: 10, y: 1.5 },
        { label: '_', x: 11, y: 1.5 },
        { label: '+', x: 12, y: 1.5 },
        { label: 'Backspace', x: 13, y: 1.5, w: 2 },
        { label: 'Insert', x: 15.25, y: 1.5 },
        { label: 'Home', x: 16.25, y: 1.5 },
        { label: 'PgUp', x: 17.25, y: 1.5 },
        { label: 'Num Lock', x: 18.5, y: 1.5 },
        { label: '/', x: 19.5, y: 1.5 },
        { label: '*', x: 20.5, y: 1.5 },
        { label: '-', x: 21.5, y: 1.5 },
        { label: 'Tab', x: 0, y: 2.5, w: 1.5 },
        { label: 'Q', x: 1.5, y: 2.5 },
        { label: 'W', x: 2.5, y: 2.5 },
        { label: 'E', x: 3.5, y: 2.5 },
        { label: 'R', x: 4.5, y: 2.5 },
        { label: 'T', x: 5.5, y: 2.5 },
        { label: 'Y', x: 6.5, y: 2.5 },
        { label: 'U', x: 7.5, y: 2.5 },
        { label: 'I', x: 8.5, y: 2.5 },
        { label: 'O', x: 9.5, y: 2.5 },
        { label: 'P', x: 10.5, y: 2.5 },
        { label: '{', x: 11.5, y: 2.5 },
        { label: '}', x: 12.5, y: 2.5 },
        // { label: '|', x: 13.5, y: 2.5, w: 1.5 },
        { label: 'Enter', x: 13.75, y: 2.5, w: 1.25, h: 2 },
        { label: 'Delete', x: 15.25, y: 2.5 },
        { label: 'End', x: 16.25, y: 2.5 },
        { label: 'PgDn', x: 17.25, y: 2.5 },
        { label: '7', x: 18.5, y: 2.5 },
        { label: '8', x: 19.5, y: 2.5 },
        { label: '9', x: 20.5, y: 2.5 },
        { label: '+', x: 21.5, y: 2.5, h: 2 },
        { label: 'Caps Lock', x: 0, y: 3.5, w: 1.75 },
        { label: 'A', x: 1.75, y: 3.5 },
        { label: 'S', x: 2.75, y: 3.5 },
        { label: 'D', x: 3.75, y: 3.5 },
        { label: 'F', x: 4.75, y: 3.5 },
        { label: 'G', x: 5.75, y: 3.5 },
        { label: 'H', x: 6.75, y: 3.5 },
        { label: 'J', x: 7.75, y: 3.5 },
        { label: 'K', x: 8.75, y: 3.5 },
        { label: 'L', x: 9.75, y: 3.5 },
        { label: ':', x: 10.75, y: 3.5 },
        { label: '"', x: 11.75, y: 3.5 },
        { label: 'fds', x: 12.75, y: 3.5 },
        { label: '4', x: 18.5, y: 3.5 },
        { label: '5', x: 19.5, y: 3.5 },
        { label: '6', x: 20.5, y: 3.5 },
        { label: 'Shift', x: 0, y: 4.5, w: 1.25 },
        { label: 'IntlBackslash', x: 1.25, y: 4.5 },
        { label: 'Z', x: 2.25, y: 4.5 },
        { label: 'X', x: 3.25, y: 4.5 },
        { label: 'C', x: 4.25, y: 4.5 },
        { label: 'V', x: 5.25, y: 4.5 },
        { label: 'B', x: 6.25, y: 4.5 },
        { label: 'N', x: 7.25, y: 4.5 },
        { label: 'M', x: 8.25, y: 4.5 },
        { label: '<', x: 9.25, y: 4.5 },
        { label: '>', x: 10.25, y: 4.5 },
        { label: '?', x: 11.25, y: 4.5 },
        { label: 'Shift', x: 12.25, y: 4.5, w: 2.75 },
        { label: '\u2191', x: 16.25, y: 4.5 },
        { label: '1', x: 18.5, y: 4.5 },
        { label: '2', x: 19.5, y: 4.5 },
        { label: '3', x: 20.5, y: 4.5 },
        { label: 'Enter', x: 21.5, y: 4.5, h: 2 },
        { label: 'Ctrl', x: 0, y: 5.5, w: 1.25 },
        { label: 'Win', x: 1.25, y: 5.5, w: 1.25 },
        { label: 'Alt', x: 2.5, y: 5.5, w: 1.25 },
        { x: 3.75, y: 5.5, w: 6.25 },
        { label: 'Alt', x: 10, y: 5.5, w: 1.25 },
        { label: 'Win', x: 11.25, y: 5.5, w: 1.25 },
        { label: 'Menu', x: 12.5, y: 5.5, w: 1.25 },
        { label: 'Ctrl', x: 13.75, y: 5.5, w: 1.25 },
        { label: '\u2190', x: 15.25, y: 5.5 },
        { label: '\u2193', x: 16.25, y: 5.5 },
        { label: '\u2192', x: 17.25, y: 5.5 },
        { label: '0', x: 18.5, y: 5.5, w: 2 },
        { label: '.', x: 20.5, y: 5.5 }
      ]
    },
    ANSI: {
      keymapIdx: 0,
      layout: [
        { label: 'Esc', x: 0, y: 0 },
        { label: 'F1', x: 2, y: 0 },
        { label: 'F2', x: 3, y: 0 },
        { label: 'F3', x: 4, y: 0 },
        { label: 'F4', x: 5, y: 0 },
        { label: 'F5', x: 6.5, y: 0 },
        { label: 'F6', x: 7.5, y: 0 },
        { label: 'F7', x: 8.5, y: 0 },
        { label: 'F8', x: 9.5, y: 0 },
        { label: 'F9', x: 11, y: 0 },
        { label: 'F10', x: 12, y: 0 },
        { label: 'F11', x: 13, y: 0 },
        { label: 'F12', x: 14, y: 0 },
        { label: 'PrtSc', x: 15.25, y: 0 },
        { label: 'Scroll Lock', x: 16.25, y: 0 },
        { label: 'Pause', x: 17.25, y: 0 },
        { label: '~', x: 0, y: 1.5 },
        { label: '!', x: 1, y: 1.5 },
        { label: '@', x: 2, y: 1.5 },
        { label: '#', x: 3, y: 1.5 },
        { label: '$', x: 4, y: 1.5 },
        { label: '%', x: 5, y: 1.5 },
        { label: '^', x: 6, y: 1.5 },
        { label: '&', x: 7, y: 1.5 },
        { label: '*', x: 8, y: 1.5 },
        { label: '(', x: 9, y: 1.5 },
        { label: ')', x: 10, y: 1.5 },
        { label: '_', x: 11, y: 1.5 },
        { label: '+', x: 12, y: 1.5 },
        { label: 'Backspace', x: 13, y: 1.5, w: 2 },
        { label: 'Insert', x: 15.25, y: 1.5 },
        { label: 'Home', x: 16.25, y: 1.5 },
        { label: 'PgUp', x: 17.25, y: 1.5 },
        { label: 'Num Lock', x: 18.5, y: 1.5 },
        { label: '/', x: 19.5, y: 1.5 },
        { label: '*', x: 20.5, y: 1.5 },
        { label: '-', x: 21.5, y: 1.5 },
        { label: 'Tab', x: 0, y: 2.5, w: 1.5 },
        { label: 'Q', x: 1.5, y: 2.5 },
        { label: 'W', x: 2.5, y: 2.5 },
        { label: 'E', x: 3.5, y: 2.5 },
        { label: 'R', x: 4.5, y: 2.5 },
        { label: 'T', x: 5.5, y: 2.5 },
        { label: 'Y', x: 6.5, y: 2.5 },
        { label: 'U', x: 7.5, y: 2.5 },
        { label: 'I', x: 8.5, y: 2.5 },
        { label: 'O', x: 9.5, y: 2.5 },
        { label: 'P', x: 10.5, y: 2.5 },
        { label: '{', x: 11.5, y: 2.5 },
        { label: '}', x: 12.5, y: 2.5 },
        { label: '|', x: 13.5, y: 2.5, w: 1.5 },
        { label: 'Delete', x: 15.25, y: 2.5 },
        { label: 'End', x: 16.25, y: 2.5 },
        { label: 'PgDn', x: 17.25, y: 2.5 },
        { label: '7', x: 18.5, y: 2.5 },
        { label: '8', x: 19.5, y: 2.5 },
        { label: '9', x: 20.5, y: 2.5 },
        { label: '+', x: 21.5, y: 2.5, h: 2 },
        { label: 'Caps Lock', x: 0, y: 3.5, w: 1.75 },
        { label: 'A', x: 1.75, y: 3.5 },
        { label: 'S', x: 2.75, y: 3.5 },
        { label: 'D', x: 3.75, y: 3.5 },
        { label: 'F', x: 4.75, y: 3.5 },
        { label: 'G', x: 5.75, y: 3.5 },
        { label: 'H', x: 6.75, y: 3.5 },
        { label: 'J', x: 7.75, y: 3.5 },
        { label: 'K', x: 8.75, y: 3.5 },
        { label: 'L', x: 9.75, y: 3.5 },
        { label: ':', x: 10.75, y: 3.5 },
        { label: '"', x: 11.75, y: 3.5 },
        { label: 'Enter', x: 12.75, y: 3.5, w: 2.25 },
        { label: '4', x: 18.5, y: 3.5 },
        { label: '5', x: 19.5, y: 3.5 },
        { label: '6', x: 20.5, y: 3.5 },
        { label: 'Shift', x: 0, y: 4.5, w: 2.25 },
        { label: 'Z', x: 2.25, y: 4.5 },
        { label: 'X', x: 3.25, y: 4.5 },
        { label: 'C', x: 4.25, y: 4.5 },
        { label: 'V', x: 5.25, y: 4.5 },
        { label: 'B', x: 6.25, y: 4.5 },
        { label: 'N', x: 7.25, y: 4.5 },
        { label: 'M', x: 8.25, y: 4.5 },
        { label: '<', x: 9.25, y: 4.5 },
        { label: '>', x: 10.25, y: 4.5 },
        { label: '?', x: 11.25, y: 4.5 },
        { label: 'Shift', x: 12.25, y: 4.5, w: 2.75 },
        { label: '\u2191', x: 16.25, y: 4.5 },
        { label: '1', x: 18.5, y: 4.5 },
        { label: '2', x: 19.5, y: 4.5 },
        { label: '3', x: 20.5, y: 4.5 },
        { label: 'Enter', x: 21.5, y: 4.5, h: 2 },
        { label: 'Ctrl', x: 0, y: 5.5, w: 1.25 },
        { label: 'Win', x: 1.25, y: 5.5, w: 1.25 },
        { label: 'Alt', x: 2.5, y: 5.5, w: 1.25 },
        { x: 3.75, y: 5.5, w: 6.25 },
        { label: 'Alt', x: 10, y: 5.5, w: 1.25 },
        { label: 'Win', x: 11.25, y: 5.5, w: 1.25 },
        { label: 'Menu', x: 12.5, y: 5.5, w: 1.25 },
        { label: 'Ctrl', x: 13.75, y: 5.5, w: 1.25 },
        { label: '\u2190', x: 15.25, y: 5.5 },
        { label: '\u2193', x: 16.25, y: 5.5 },
        { label: '\u2192', x: 17.25, y: 5.5 },
        { label: '0', x: 18.5, y: 5.5, w: 2 },
        { label: '.', x: 20.5, y: 5.5 }
      ]
    }
  }
};

const getters = {};
const ANSIkeymap = [
  'KC_ESC',
  'KC_F1',
  'KC_F2',
  'KC_F3',
  'KC_F4',
  'KC_F5',
  'KC_F6',
  'KC_F7',
  'KC_F8',
  'KC_F9',
  'KC_F10',
  'KC_F11',
  'KC_F12',
  'KC_PSCR',
  'KC_SLCK',
  'KC_PAUS',
  'KC_GRV',
  'KC_1',
  'KC_2',
  'KC_3',
  'KC_4',
  'KC_5',
  'KC_6',
  'KC_7',
  'KC_8',
  'KC_9',
  'KC_0',
  'KC_MINS',
  'KC_EQL',
  'KC_BSPC',
  'KC_INS',
  'KC_HOME',
  'KC_PGUP',
  'KC_NLCK',
  'KC_PSLS',
  'KC_PAST',
  'KC_PMNS',
  'KC_TAB',
  'KC_Q',
  'KC_W',
  'KC_E',
  'KC_R',
  'KC_T',
  'KC_Y',
  'KC_U',
  'KC_I',
  'KC_O',
  'KC_P',
  'KC_LBRC',
  'KC_RBRC',
  'KC_BSLS',
  'KC_DEL',
  'KC_END',
  'KC_PGDN',
  'KC_P7',
  'KC_P8',
  'KC_P9',
  'KC_PPLS',
  'KC_CAPS',
  'KC_A',
  'KC_S',
  'KC_D',
  'KC_F',
  'KC_G',
  'KC_H',
  'KC_J',
  'KC_K',
  'KC_L',
  'KC_SCLN',
  'KC_QUOT',
  'KC_ENT',
  'KC_P4',
  'KC_P5',
  'KC_P6',
  'KC_LSFT',
  'KC_Z',
  'KC_X',
  'KC_C',
  'KC_V',
  'KC_B',
  'KC_N',
  'KC_M',
  'KC_COMM',
  'KC_DOT',
  'KC_SLSH',
  'KC_RSFT',
  'KC_UP',
  'KC_P1',
  'KC_P2',
  'KC_P3',
  'KC_PENT',
  'KC_LCTL',
  'KC_LGUI',
  'KC_LALT',
  'KC_SPC',
  'KC_RALT',
  'KC_RGUI',
  'KC_APP',
  'KC_RCTL',
  'KC_LEFT',
  'KC_DOWN',
  'KC_RGHT',
  'KC_P0',
  'KC_PDOT',
  'KC_NUBS'
];

const ISOkeymap = [
  'KC_ESC',
  'KC_F1',
  'KC_F2',
  'KC_F3',
  'KC_F4',
  'KC_F5',
  'KC_F6',
  'KC_F7',
  'KC_F8',
  'KC_F9',
  'KC_F10',
  'KC_F11',
  'KC_F12',
  'KC_PSCR',
  'KC_SLCK',
  'KC_PAUS',
  'KC_GRV',
  'KC_1',
  'KC_2',
  'KC_3',
  'KC_4',
  'KC_5',
  'KC_6',
  'KC_7',
  'KC_8',
  'KC_9',
  'KC_0',
  'KC_MINS',
  'KC_EQL',
  'KC_BSPC',
  'KC_INS',
  'KC_HOME',
  'KC_PGUP',
  'KC_NLCK',
  'KC_PSLS',
  'KC_PAST',
  'KC_PMNS',
  'KC_TAB',
  'KC_Q',
  'KC_W',
  'KC_E',
  'KC_R',
  'KC_T',
  'KC_Y',
  'KC_U',
  'KC_I',
  'KC_O',
  'KC_P',
  'KC_LBRC',
  'KC_RBRC',
  'KC_ENT',
  'KC_DEL',
  'KC_END',
  'KC_PGDN',
  'KC_P7',
  'KC_P8',
  'KC_P9',
  'KC_PPLS',
  'KC_CAPS',
  'KC_A',
  'KC_S',
  'KC_D',
  'KC_F',
  'KC_G',
  'KC_H',
  'KC_J',
  'KC_K',
  'KC_L',
  'KC_SCLN',
  'KC_QUOT',
  'KC_BSLS',
  'KC_P4',
  'KC_P5',
  'KC_P6',
  'KC_LSFT',
  'KC_BSLS',
  'KC_Z',
  'KC_X',
  'KC_C',
  'KC_V',
  'KC_B',
  'KC_N',
  'KC_M',
  'KC_COMM',
  'KC_DOT',
  'KC_SLSH',
  'KC_RSFT',
  'KC_UP',
  'KC_P1',
  'KC_P2',
  'KC_P3',
  'KC_PENT',
  'KC_LCTL',
  'KC_LGUI',
  'KC_LALT',
  'KC_SPC',
  'KC_RALT',
  'KC_RGUI',
  'KC_APP',
  'KC_RCTL',
  'KC_LEFT',
  'KC_DOWN',
  'KC_RGHT',
  'KC_P0',
  'KC_PDOT'
];
function mapKeymap(store, arr) {
  return arr.map(code => {
    const meta = store.getters['keycodes/lookupKeycode'](code);
    return {
      ...meta
    };
  });
}
const actions = {
  init({ state, commit }) {
    const store = this;
    commit('setKeymap', [
      mapKeymap(store, ANSIkeymap),
      mapKeymap(store, ISOkeymap)
    ]);
    return state.keymap;
  }
};

const mutations = {
  setLayout(state, layout) {
    state.layout = layout;
  },
  setKeymap(state, keymap) {
    state.keymap = keymap;
  },
  setActive(state, { keymapIdx, pos }) {
    Vue.set(state.keymap[keymapIdx][pos], 'active', true);
    Vue.set(state.keymap[keymapIdx][pos], 'detected', false);
  },
  setDetected(state, { keymapIdx, pos }) {
    Vue.set(state.keymap[keymapIdx][pos], 'active', false);
    Vue.set(state.keymap[keymapIdx][pos], 'detected', true);
  },
  reset(state, keymapIdx) {
    state.keymap[keymapIdx].map((v, idx) => {
      Vue.set(state.keymap[keymapIdx][idx], 'detected', false);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
