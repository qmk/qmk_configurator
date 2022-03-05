const ROW1 = [
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
  'PrintScreen',
  'ScrollLock',
  'Pause'
];

const ROW2 = [
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
  'NumpadSubtract'
];

const ROW3 = [
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
  'NumpadAdd'
];

// ISO Row 3 is different from ANSI by replacing Backslash with Enter
const ISO_ROW3 = [
  ...ROW3.slice(0, ROW3.indexOf('Backslash')),
  'Enter',
  ...ROW3.slice(ROW3.lastIndexOf('Delete'))
];

const ROW4 = [
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
  'Numpad6'
];

// ISO Row 4 replaces Enter with Backslash
const ISO_ROW4 = [
  ...ROW4.slice(0, ROW4.indexOf('Enter')),
  'Backslash',
  ...ROW4.slice(ROW4.lastIndexOf('Numpad4'))
];

const ROW5 = [
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
  'NumpadEnter'
];

// ISO Row 5 has an extra key Non-US Backslash after left shift
const ISO_ROW5 = [ROW5[0], 'IntlBackslash', ...ROW5.slice(1)];

const ROW6 = [
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

const ANSI = [...ROW1, ...ROW2, ...ROW3, ...ROW4, ...ROW5, ...ROW6];
const ISO = [...ROW1, ...ROW2, ...ISO_ROW3, ...ISO_ROW4, ...ISO_ROW5, ...ROW6];
export default { ANSI, ISO };
