export default {
  /*
   * List of keycodes that should always be considered alphas
   */
  ...[
    'KC_F1',
    'KC_F2',
    'KC_F3',
    'KC_F4',
    'KC_F9',
    'KC_F10',
    'KC_F11',
    'KC_F12',
    'KC_BSLS',
    'KC_P0',
    'KC_P1',
    'KC_P2',
    'KC_P3',
    'KC_P4',
    'KC_P5',
    'KC_P6',
    'KC_P7',
    'KC_P8',
    'KC_P9',
    'KC_PDOT'
  ].reduce((acc, code) => {
    acc[code] = true;
    return acc;
  }, {})
};
