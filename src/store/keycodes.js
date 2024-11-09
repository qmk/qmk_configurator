import { defineStore } from 'pinia';
import isUndefined from 'lodash/isUndefined';
import store from '@/store';
import keymapExtras from '@/i18n/keymap_extras';

import ansi from './modules/keycodes/ansi';
import iso_jis from './modules/keycodes/iso-jis';
import quantum from './modules/keycodes/quantum';
import settings from './modules/keycodes/kb-settings';
import media from './modules/keycodes/app-media-mouse';
import steno from './modules/keycodes/steno';

const keycodePickerTabLayout = {
  ANSI_ISO: [...ansi, ...iso_jis],
  ISO_ANSI: [...iso_jis, ...ansi],
  special: [...quantum, ...settings, ...media]
};

/**
 * Validates the os keyboard layout and if not valid returns a default of 'keymap_us'.
 * @returns {string}
 */
function getOSKeyboardLayout() {
  let osKeyboardLayout = store.getters['app/osKeyboardLayout'];
  if (isUndefined(osKeyboardLayout) || !keymapExtras[osKeyboardLayout]) {
    const fallbackOSKeyboardLayout = 'keymap_us';
    console.log(
      `The stored OS keyboard layout value (${osKeyboardLayout}) is not a valid value! Falling back to '${fallbackOSKeyboardLayout}'.`
    );
    store.commit('app/setOSKeyboardLayout', fallbackOSKeyboardLayout);
    osKeyboardLayout = fallbackOSKeyboardLayout;
  }
  return osKeyboardLayout;
}

function isANSI() {
  return keymapExtras[getOSKeyboardLayout()].isANSI;
}

/**
 * Remap keycodes to their Locale equivalent for the OS layout.
 * @param {Object} keycodeLUT
 * @param {KeycodeDefinition|KeycodeLabel|WidthPlaceholder} keycodeObject
 * @returns {KeycodeDefinition|WidthPlaceholder|KeycodeLabel}
 */
function toLocaleKeycode(keycodeLUT, keycodeObject) {
  console.assert(!isUndefined(keycodeLUT));
  if (!keycodeObject.name || !keycodeObject.code) {
    // Not a KeycodeDefinition; return as is
    return keycodeObject;
  }
  if (keycodeLUT[keycodeObject.code]) {
    // Clone in a shallow manner the original keycodeObject object and
    // override the name, title, and possibly other fields
    return { ...keycodeObject, ...keycodeLUT[keycodeObject.code] };
  } else {
    return keycodeObject;
  }
}

/**
 * Used to dynamically generate the tab data for the keycode
 * display. This UI is customized based on the OS keyboard layout
 * selected.
 *
 * @param {string} osKeyboardLayout
 * @param {boolean} isSteno
 * @returns {Array.<KeycodeDefinition|KeycodeLabel|WidthPlaceholder>}
 */
function generateKeycodes(osKeyboardLayout, isSteno = false) {
  store.commit('app/setIso', !isANSI());
  const keycodes = [
    ...(isANSI()
      ? keycodePickerTabLayout.ANSI_ISO
      : keycodePickerTabLayout.ISO_ANSI),
    ...keycodePickerTabLayout.special,
    ...(isSteno ? steno : [])
  ];
  const { keycodeLUT } = keymapExtras[getOSKeyboardLayout()];
  return keycodes.map((keycodeObject) =>
    toLocaleKeycode(keycodeLUT, keycodeObject)
  );
}

/**
 * Counts the number of potential matches in each keycode array.
 * The keycode arrays represent the source data used to render the keycodes
 * display. This count is used to give hints of matches per tab in the UI.
 *
 * @param {string} filter
 * @param {Array.<KeycodeDefinition|KeycodeLabel|WidthPlaceholder>} collection of keycode objects
 * @returns
 */
function countMatches(filter, collection) {
  filter = filter.toUpperCase();
  return collection.reduce((matchCount, { code, name, title }) => {
    if (!isUndefined(code)) {
      if (
        code.includes(filter) ||
        name?.toUpperCase().includes(filter) ||
        title?.toUpperCase().includes(filter)
      ) {
        matchCount += 1;
      }
    }
    return matchCount;
  }, 0);
}

/**
 * Use Options style for now.
 */
export const useKeycodesStore = defineStore('keycodes', {
  /**
   *
   * @returns {KeycodeStoreState}
   */
  state: () => ({
    keycodes: [
      ...keycodePickerTabLayout.ANSI_ISO,
      ...keycodePickerTabLayout.special
    ],
    searchFilter: '',
    searchCounters: {
      ANSI: 0,
      'ISO/JIS': 0,
      Quantum: 0,
      KeyboardSettings: 0,
      AppMediaMouse: 0
    },
    steno: false,
    active: 'ANSI'
  }),
  getters: {
    lookupKeyPressCode: () => (searchTerm) =>
      this.lookupKeycode(searchTerm, true),
    lookupKeycode:
      (state) =>
      (searchTerm, isKeys = false) =>
        state.keycodes.find(
          ({ code, keys }) =>
            code === searchTerm || (isKeys && keys && keys === searchTerm)
        )
  },
  actions: {
    changeActive(newActive) {
      this.active = newActive;
    },
    enableSteno() {
      this.steno = true;
      this.keycodes = generateKeycodes(getOSKeyboardLayout(), this.steno);
    },
    disableSteno() {
      this.steno = false;
      this.keycodes = generateKeycodes(getOSKeyboardLayout(), this.steno);
    },
    updateKeycodeNames() {
      this.keycodes = generateKeycodes(getOSKeyboardLayout(), this.steno);
    },
    setSearchFilter(newVal) {
      this.searchFilter = newVal;
      if (this.searchFilter !== '') {
        this.searchCounters = {
          ANSI: countMatches(this.searchFilter, ansi),
          'ISO/JIS': countMatches(this.searchFilter, iso_jis),
          Quantum: countMatches(this.searchFilter, quantum),
          KeyboardSettings: countMatches(this.searchFilter, settings),
          AppMediaMouse: countMatches(this.searchFilter, media)
        };
      }
    }
  }
});

/**
 * @typedef {Object} KeycodeLabel - used to label groups of keycodes
 * @property {string} label - Label name
 * @property {'label'} width - always the special indicator 'label'
 * @property {boolean} [group] - group following keycodes under this
 * @property {string} [icon] - font-awesome icon to display
 * @property {string} [iconClass] - css class to apply
 */

/**
 * @typedef {Object} WidthPlaceholder - used for spacing
 * @property {number} width - width in Key Units * 1000. e.g. 1U = 1000, 2U = 2000
 */

/**
 * @typedef {Object} KeycodeDefinition - metadata about a keycode
 * @property {string} name - UI display label for the keycode
 * @property {string} code - QMK keycode definition
 * @property {string} [keys] - javascript keypress id. Used by keyboard handler
 * @property {number} [width] - width in Key Units * 1000. e.g. 1U = 1000, 2U = 2000
 * @property {'text'|'layer'|'container'|'layer-container'} [type]
 * @property {number} [layer]
 * @property {string} [title] - help text for hover
 */

/**
 * @typedef {{}
 *  & Record<'ISO/JIS', number>
 *  & Record<'ANSI', number>
 *  & Record<'Quantum', number>
 *  & Record<'KeyboardSettings', number>
 *  & Record<'AppMediaMouse', number>
 * } SearchCounters
 *
 */

/**
 * @typedef {Object} KeycodeStoreState
 * @property {Array.<KeycodeDefinition|KeycodeLabel|WidthPlaceholder>} keycodes - active keycodes
 * @property {string} searchFilter - current query in keycode picker search filter
 * @property {SearchCounters} searchCounters - count of matching keycodes per tab
 * @property {boolean} steno - is steno tab active
 * @property {'ANSI'|'ISO/JIS'|'AppMediaMouse'|'Quantum'|'Steno'|'KeyboardSettings'} active - active tab
 */
