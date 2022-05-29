import dsa from './dsa';
import gmk from './gmk';
import sa from './sa';
import jtk from './jtk';
import kat from './kat';
import mt3 from './mt3';
import alphaCodes from './alphaCodes';
import modCodes from './modCodes';

export default {
  alphaCodes,
  modCodes,
  list: [...dsa, ...sa, ...gmk, ...jtk, ...kat, ...mt3],
  /*
   * List of codes we should use icons for instead of text
   */
  iconCodes: {
    KC_UP: 'arrow-up',
    KC_DOWN: 'arrow-down',
    KC_LEFT: 'arrow-left',
    KC_RGHT: 'arrow-right',
    KC_APP: 'bars'
  },
  /**
   * returns the correct icons for the identified platform
   * @see https://wicg.github.io/ua-client-hints/#sec-ch-ua-platform
   */
  platformIcons(platform) {
    let icon = [];
    switch (platform) {
      case 'macOS':
      case 'iOS':
      case 'MacIntel':
      case 'Macintosh':
      case 'MacPPC':
      case 'iPhone':
      case 'iPad':
        icon = ['fab', 'apple'];
        break;
      case 'Linux':
      case 'Android':
      case 'Chrome OS':
      case 'Linux i686':
      case 'Linux x86_64':
      case 'Linux armv7l':
        icon = ['fab', 'linux'];
        break;
      case 'Windows':
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
