import dsa from './dsa';
import gmk from './gmk';
import sa from './sa';
import jtk from './jtk';
import kat from './kat';
import mt3 from './mt3';
import dcs from './dcs';
import alphaCodes from './alphaCodes';
import modCodes from './modCodes';

export default {
  alphaCodes,
  modCodes,
  list: [...dcs, ...dsa, ...sa, ...gmk, ...jtk, ...kat, ...mt3],
  /*
   * List of codes we should use icons for instead of text
   */
  iconCodes: {
    KC_UP: 'arrow-up',
    KC_DOWN: 'arrow-down',
    KC_LEFT: 'arrow-left',
    KC_RGHT: 'arrow-right',
    KC_APP: 'bars',
    KC_PWR: 'power-off',
    KC_SLEP: 'moon',
    KC_EJCT: 'eject',
    KC_MPLY: 'play',
    KC_MSTP: 'stop',
    KC_MRWD: 'backward',
    KC_MFFD: 'forward',
    KC_MPRV: 'fast-backward',
    KC_MNXT: 'fast-forward',
    KC_MUTE: 'volume-mute',
    KC_VOLD: 'volume-down',
    KC_VOLU: 'volume-up'
  },
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
