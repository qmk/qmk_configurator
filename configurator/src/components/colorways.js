export default {
  list: [
    {
      name: 'dsa-galaxy-class',
      override: {
        KC_ESC: 'pink',
        KC_F1: 'darker-blue',
        KC_F2: 'darker-blue',
        KC_F3: 'darker-blue',
        KC_F4: 'darker-blue',
        KC_F5: 'pink',
        KC_F6: 'pink',
        KC_F7: 'pink',
        KC_F8: 'pink',
        KC_F9: 'light-blue',
        KC_F10: 'light-blue',
        KC_F11: 'light-blue',
        KC_F12: 'light-blue',
        KC_PSCR: 'purple',
        KC_SLCK: 'purple',
        KC_PAUS: 'purple',
        KC_GRV: 'mod',
        KC_GESC: 'mod',
        KC_1: 'mod',
        KC_2: 'mod',
        KC_3: 'mod',
        KC_4: 'mod',
        KC_5: 'mod',
        KC_6: 'mod',
        KC_7: 'mod',
        KC_8: 'mod',
        KC_9: 'mod',
        KC_0: 'mod',
        KC_MINS: 'mod',
        KC_EQL: 'mod',
        KC_TAB: 'purple',
        KC_CAPS: 'purple',
        KC_LSFT: 'purple',
        KC_LCTL: 'purple',
        KC_LGUI: 'purple',
        KC_LALT: 'purple',
        KC_SPC: 'gray',
        KC_RALT: 'purple',
        KC_RGUI: 'purple',
        KC_INS: 'pink',
        KC_HOME: 'pink',
        KC_PGUP: 'pink',
        KC_DEL: 'pink',
        KC_END: 'pink',
        KC_PGDN: 'pink',
        KC_UP: 'darker-blue',
        KC_LEFT: 'darker-blue',
        KC_DOWN: 'darker-blue',
        KC_RGHT: 'darker-blue',
        KC_NLCK: 'mod',
        KC_PSLS: 'mod',
        KC_PAST: 'mod',
        KC_PMNS: 'mod',
        KC_PPLS: 'mod',
        KC_PENT: 'mod',
        KC_PDOT: 'pink',
        KC_P0: 'pink',
        KC_P1: 'light-blue',
        KC_P2: 'light-blue',
        KC_P3: 'light-blue',
        KC_P4: 'light-blue',
        KC_P5: 'light-blue',
        KC_P6: 'light-blue',
        KC_P7: 'light-blue',
        KC_P8: 'light-blue',
        KC_P9: 'light-blue'
      }
    },
    { name: 'sa-carbon' },
    { name: 'sa-danger-zone' },
    {
      name: 'sa-jukebox',
      override: {
        KC_ESC: 'accent',
        KC_ENT: 'accent'
      }
    },
    { name: 'sa-modern-selectric' },
    { name: 'sa-nantucket-selectric' },
    { name: 'sa-oblivion-hagoromo' },

    { name: 'gmk-dolch' },
    { name: 'gmk-merlin' },
    {
      name: 'gmk-metaverse',
      override: {
        KC_ESC: 'accent',
        KC_ENT: 'accent',
        KC_F5: 'accent',
        KC_F6: 'accent',
        KC_F7: 'accent',
        KC_F8: 'accent',
        KC_LGUI: 'accent',
        KC_RGUI: 'accent',
        KC_LEFT: 'accent',
        KC_RGHT: 'accent',
        KC_DOWN: 'accent',
        KC_UP: 'accent'
      }
    },
    {
      name: 'gmk-nautilus',
      override: {
        KC_ENT: 'accent',
        KC_ESC: 'accent'
      }
    },
    { name: 'gmk-olivetti' },
    {
      name: 'gmk-olivia',
      override: {
        KC_SPC: 'accent',
        KC_ENT: 'accent',
        KC_ESC: 'accent',
        KC_F1: 'key',
        KC_F2: 'key',
        KC_F3: 'key',
        KC_F4: 'key',
        KC_F9: 'key',
        KC_F10: 'key',
        KC_F11: 'key',
        KC_F12: 'key',
        KC_LEFT: 'accent',
        KC_RGHT: 'accent',
        KC_DOWN: 'accent',
        KC_UP: 'accent'
      }
    },
    { name: 'gmk-space-cadet' },
    { name: 'gmk-ta-royal-alpha' },
    { name: 'gmk-wob' }
    //,
    //{ name: 'dsa-drifter' }
  ],
  /*
   * List of codes we should use icons for instead of text
   */
  iconCodes: {
    KC_UP: 'arrow-up',
    KC_DOWN: 'arrow-down',
    KC_LEFT: 'arrow-left',
    KC_RGHT: 'arrow-right'
  },
  /*
   * List of keycodes that considered mods
   */
  modCodes: [
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
  }, {}),
  /**
   * returns the correct icons for the identified platform
   */
  platformIcons(platform) {
    let icon = [];
    switch (platform) {
      case 'MacIntel':
      case 'Macintosh':
      case 'MacPPC':
      case 'iPhone':
      case 'iPad':
        icon = ['fab', 'apple'];
        break;
      case 'Linux i686':
      case 'Linux x86_64':
      case 'Linux armv7l':
        icon = ['fab', 'linux'];
        break;
      case 'Win32':
        icon = ['fab', 'windows'];
        break;
      default:
        // fall back to text if we can't detect
        icon = undefined;
    }

    return {
      KC_LGUI: icon,
      KC_RGUI: icon
    };
  }
};
