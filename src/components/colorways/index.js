import dsa_galaxy_class from './dsa_galaxy_class';
import sa_carbon from './sa_carbon';
import sa_danger_zone from './sa_danger_zone';
import sa_jukebox from './sa_jukebox';
import sa_modern_selectric from './sa_modern_selectric';
import sa_nantucket_selectric from './sa_nantucket_selectric';
import sa_oblivion_hagoromo from './sa_oblivion_hagoromo';
import gmk_dolch from './gmk_dolch';
import gmk_jamon from './gmk_jamon';
import gmk_merlin from './gmk_merlin';
import gmk_metaverse from './gmk_metaverse';
import gmk_mizu from './gmk_mizu';
import gmk_nautilus from './gmk_nautilus';
import gmk_olivetti from './gmk_olivetti';
import gmk_olivia from './gmk_olivia';
import gmk_serika from './gmk_serika';
import gmk_space_cadet from './gmk_space_cadet';
import gmk_striker from './gmk_striker';
import gmk_ta_royal_alpha from './gmk_ta_royal_alpha';
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
    gmk_jamon,
    gmk_merlin,
    gmk_metaverse,
    gmk_mizu,
    gmk_nautilus,
    gmk_olivetti,
    gmk_olivia,
    gmk_serika,
    gmk_space_cadet,
    gmk_striker,
    gmk_ta_royal_alpha,
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
