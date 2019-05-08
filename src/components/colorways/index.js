import dsa_galaxy_class from './dsa_galaxy_class';
import sa_carbon from './sa_carbon';
import sa_danger_zone from './sa_danger_zone';
import sa_jukebox from './sa_jukebox';
import sa_modern_selectric from './sa_modern_selectric';
import sa_nantucket_selectric from './sa_nantucket_selectric';
import sa_oblivion_hagoromo from './sa_oblivion_hagoromo';
import gmk_dolch from './gmk_dolch';
import gmk_olivia from './gmk_olivia';
import sa_vilebloom from './sa_vilebloom';
import alphaCodes from './alphaCodes';
import modCodes from './modCodes';

export default {
  alphaCodes,
  modCodes,
  list: [
    dsa_galaxy_class,
    sa_carbon,
    sa_danger_zone,
    sa_jukebox,
    sa_modern_selectric,
    sa_nantucket_selectric,
    sa_oblivion_hagoromo,
    sa_vilebloom,

    gmk_dolch,
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
      name: 'gmk-mizu',
      override: {
        KC_ESC: 'accent',
        KC_F1: 'key',
        KC_F2: 'key',
        KC_F3: 'key',
        KC_F4: 'key',
        KC_F9: 'key',
        KC_F10: 'key',
        KC_F11: 'key',
        KC_F12: 'key',
        KC_BSLS: 'key',
        KC_ENT: 'accent',
        KC_PENT: 'accent'
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
    gmk_olivia,
    { name: 'gmk-serika' },
    { name: 'gmk-space-cadet' },
    {
      name: 'gmk-striker',
      override: {
        KC_ESC: 'accent',
        KC_ENT: 'accent',
        KC_PENT: 'accent',
        KC_SPC: 'accent'
      }
    },
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
