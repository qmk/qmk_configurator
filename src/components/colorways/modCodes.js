export default {
  /*
   * List of keycodes that considered mods
   */
  ...[
    'KC_ESC',
    'KC_F5',
    'KC_F6',
    'KC_F7',
    'KC_F8',
    'KC_LEFT',
    'KC_RGHT',
    'KC_UP',
    'KC_DOWN',
    'KC_PSCR',
    'KC_SCRL',
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
    'KC_NUM',
    'KC_PSLS',
    'KC_PAST',
    'KC_PMNS',
    'KC_PPLS',
    'KC_PENT',
    'KC_PCMM',
    'KC_PEQL',
    'KC_CAPS',
    'KC_LCAP',
    'KC_LNUM',
    'KC_LSCR',
    'MO(layer)',
    'TG(layer)',
    'TO(layer)',
    'TT(layer)',
    'DF(layer)',
    'OSL(layer)'
  ].reduce((acc, code) => {
    acc[code] = true;
    return acc;
  }, {})
};
