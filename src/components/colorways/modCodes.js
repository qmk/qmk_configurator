export default {
  /*
   * List of keycodes that considered mods
   */
  ... [
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
    'KC_LEFT',
    'KC_RGHT',
    'KC_UP',
    'KC_DOWN',
    'KC_PSCR',
    'KC_SLCK',
    'KC_PAUS',
    'KC_INS',
    'KC_DEL',
    'KC_HOME',
    'KC_END',
    'KC_PGUP',
    'KC_PGDN',
    'KC_LSFT',
    'KC_RSFT',
    'KC_TAB',
    'KC_RGUI',
    'KC_LGUI',
    'KC_LALT',
    'KC_RALT',
    'KC_LCTL',
    'KC_RCTL',
    'KC_ENT',
    'KC_BSPC',
    'KC_NLCK',
    'KC_PSLS',
    'KC_PAST',
    'KC_PMNS',
    'KC_PPLS',
    'KC_PENT',
    'MO(layer)',
    'TG(layer)',
    'TO(layer)',
    'TT(layer)',
    'DF(layer)',
    'OSL(layer)',
    'KC_ESC'
  ].reduce((acc, code) => {
    acc[code] = true;
    return acc;
  }, {})
};
