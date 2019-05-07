import dsaGalaxyClass from './dsa-galaxy-class';
import gmkOlivia from './gmk-olivia';
import saVilebloom from './sa-vilebloom';
import alphaCodes from './alphaCodes';
import modCodes from './modCodes';

export default {
  alphaCodes,
  modCodes,
  list: [
    dsaGalaxyClass,
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
    saVilebloom,

    { name: 'gmk-dolch' },
    { name: 'gmk-jamon' },
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
    gmkOlivia,
    { name: 'gmk-serika' },
    { name: 'gmk-space-cadet' },
    { name: 'gmk-ta-royal-alpha' },
    { name: 'gmk-wob' }
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
