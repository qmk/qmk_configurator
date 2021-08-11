import Vue from 'vue';
import random from 'lodash/random';
import size from 'lodash/size';
import reduce from 'lodash/reduce';
import isUndefined from 'lodash/isUndefined';
import colorways from '@/components/colorways';
import defaults from './config';
import axios from 'axios';
import { backend_skeletons_url } from './constants';
import { parseKeycode } from './parse.js';

const state = {
  keymap: [[]], // array of arrays
  layer: 0,
  dirty: false,
  selectedIndex: undefined,
  selectedContent: false,
  defaults,
  config: Object.assign({}, defaults),
  // super hacky way to wait for visual keymap to be done
  // basically when we load a keymap create a promise that will run the keymap loading code
  // but let the visualkeymap signal when it is done and resolve the promise at that time
  // otherwise they race against each other and the visual keymap erases the keymapd data
  loadingKeymapPromise: undefined,
  colorways: colorways.list,
  colorwayIndex: random(0, colorways.list.length - 1),
  displaySizes: false,
  continuousInput: false,
  ignoreMod: false,
  templates: {
    keymap: {
      version: 1,
      documentation:
        "This file is a QMK Configurator export. You can import this at <https://config.qmk.fm>. It can also be used directly with QMK's source code.\n\nTo setup your QMK environment check out the tutorial: <https://docs.qmk.fm/#/newbs>\n\nYou can convert this file to a keymap.c using this command: `qmk json2c {keymap}`\n\nYou can compile this keymap using this command: `qmk compile {keymap}`\n"
    }
  }
};
// Use for computed properties
const getters = {
  colorway: state => state.colorways[state.colorwayIndex].name,
  colorways: state => state.colorways.map(colorway => colorway.name),
  colorwayOverride: state => state.colorways[state.colorwayIndex].override,
  colorwayIndex: state => state.colorwayIndex,
  loadingKeymapPromise: state => state.loadingKeymapPromise,
  defaults: state => Object.assign({}, state.defaults),
  getSelectedKey: state => state.selectedIndex,
  getKey: state => ({ _layer = state.layer, index }) =>
    state.keymap[_layer][index],
  getLayer: state => _layer => {
    return state.keymap[_layer];
  },
  size: state => (_layer = 0) => {
    return size(state.keymap[_layer]);
  },
  isDirty: state => state.dirty,
  /**
   * Convert internal representation of keycodes into QMK keycodes for export or compilation
   * @param {boolean} compiler is the target
   */
  exportLayers: state => ({ compiler }) => {
    var highestActiveLayer = state.keymap.reduce((acc, layer, index) => {
      if (!isUndefined(layer)) {
        return index;
      }
      return acc;
    }, 0);

    return reduce(
      state.keymap,
      function convertALayer(exportedLayers, _layer, currentLayerIdx) {
        // Ignore Empty layers if there are no layers above this layer
        if (currentLayerIdx > highestActiveLayer) {
          return exportedLayers;
        }

        exportedLayers[currentLayerIdx] = [];
        // Work around backend not handling sparse keymaps
        // insert an dummy layer filled with KC_TRNS
        if (
          compiler &&
          currentLayerIdx < highestActiveLayer &&
          (isUndefined(_layer) || _layer.length === 0)
        ) {
          _layer = state.keymap[0].map(() => {
            return {
              name: '',
              code: 'KC_TRNS',
              type: undefined
            };
          });
        }

        // Convert internal representation to QMK keycodes
        // lodash/reduce handles null/undefined safely and returns empty array
        var aLayer = reduce(
          _layer,
          function exportQMKKeycode(newLayer, key, i) {
            var keycode = key.code;
            if (keycode) {
              if (keycode.endsWith('(kc)') || keycode.endsWith(',kc)')) {
                if (key.contents) {
                  keycode = keycode.replace('kc', key.contents.code);
                } else {
                  keycode = keycode.replace('kc', 'KC_NO');
                }
              }
              if (keycode.endsWith('(layer)')) {
                keycode = keycode.replace('layer', key.layer);
              }
              if (keycode === 'text') {
                // add a special ANY marker to keycodes that were defined using ANY
                // This will be stripped back off on import.
                keycode = compiler ? key.text : `ANY(${key.text})`;
              }
            } else {
              // eslint-disable-next-line
              console.error(`ERROR: unexpected keycode ${key}`, k, i, _layer);
            }
            newLayer.push(keycode);
            return newLayer;
          },
          []
        );
        exportedLayers[currentLayerIdx] = aLayer;
        return exportedLayers;
      },
      []
    );
  },
  activeLayers(state) {
    const active = state.keymap.reduce(
      (active, layer, idx) => {
        if (idx === 0) {
          // layer 0 is always active
          return active;
        }
        const hasKeys = layer.filter(key => key.code !== 'KC_NO').length > 0;
        if (hasKeys) {
          active.push(idx);
        }
        return active;
      },
      [0]
    );
    return active;
  }
};
const actions = {
  initKey({ state, commit }, { _layer, index }) {
    if (state.keymap[_layer] === undefined) {
      commit('initLayer', { layer: _layer });
    }
    return state.keymap[_layer][index];
  },
  setKeycodeLayer({ state, commit }, { layer, index, toLayer }) {
    commit('setKeyLayer', { layer, index, toLayer });
    if (toLayer !== layer) {
      if (state.keymap[toLayer] === undefined) {
        commit('initLayer', { layer: toLayer });
      }
      let store = this;
      let { name, code } = store.getters['keycodes/lookupKeycode']('KC_TRNS');
      commit('assignKey', {
        _layer: toLayer,
        index,
        name,
        code,
        type: undefined
      });
    }
  },
  initTemplates({ commit }) {
    return axios
      .get(`${backend_skeletons_url}/keymap`)
      .then(resp => {
        if (resp.status === 200) {
          let template = Object.assign({}, resp.data);
          delete template.keyboard;
          delete template.keymap;
          delete template.layout;
          delete template.layers;
          commit('setKeymapTemplate', template);
        }
      })
      .catch(err => {
        console.warn('unable to get keymap template. error:', err);
      });
  },
  //Function that takes in a keymap loops over it and fills populates the keymap variable
  load_converted_keymap({ commit }, converted_keymap) {
    const store = this;
    //Loop over each layer from the keymap
    console.log('converted_keymap', converted_keymap);
    const acc = converted_keymap.reduce(
      (acc, layerData, _layer) => {
        //Add layer object for every layer that exists
        commit('initLayer', { layer: _layer });
        //Loop over each keycode in the layer
        acc.layers.push(
          layerData.map(keycode => {
            return parseKeycode(store, keycode, acc.stats);
          })
        );
        acc.stats.layers += 1;
        return acc;
      },
      {
        stats: { count: 0, any: 0, layers: 0 },
        layers: []
      }
    );
    commit('setLayers', acc.layers);
    console.log('stat', acc.stats);
    return acc.stats;
  }
};
const mutations = {
  setKeymapTemplate(state, template) {
    Vue.set(state.templates, 'keymap', template);
  },
  setSelected(state, index) {
    state.selectedIndex = index;
    state.selectedContent = false;
  },
  setSelectedContent(state, index) {
    if (state.selectedIndex === index) {
      // key already selected - toggle inner content selection
      state.selectedContent = !state.selectedContent;
    } else {
      // select content
      state.selectedContent = true;
    }
    state.selectedIndex = index;
  },
  setKeycode(state, { _code, layer }) {
    if (isUndefined(state.selectedIndex)) {
      return;
    }
    let store = this;
    let { name, code, type } = store.getters['keycodes/lookupKeycode'](_code);

    if (state.selectedContent) {
      // only set values on contents not container, does not support continuous input
      mutations.setContents(state, {
        index: state.selectedIndex,
        key: { name, code, type, layer }
      });
      state.selectedIndex = undefined;
      state.selectedContent = false;
    } else {
      // normal key selected
      Vue.set(state.keymap[state.layer], state.selectedIndex, {
        name,
        code,
        type
      });
      if (type === 'layer') {
        Vue.set(state.keymap[state.layer][state.selectedIndex], 'layer', 0);
      }
      if (type === 'layer-container') {
        if (state.keymap[layer] === undefined) {
          mutations.initLayer(state, { layer });
        }
        Vue.set(state.keymap[state.layer][state.selectedIndex], 'layer', layer);
      }
      if (state.continuousInput) {
        const nextIndex = (state.selectedIndex + 1) % state.keymap[0].length;
        mutations.setSelected(state, nextIndex);
      } else {
        mutations.setSelected(state, undefined);
      }
    }
    mutations.setDirty(state);
  },
  setContents(state, { index, key }) {
    Vue.set(state.keymap[state.layer][index], 'contents', key);
  },
  assignKey(state, { _layer, index, name, code, type }) {
    Vue.set(state.keymap[_layer], index, {
      name: name,
      code: code,
      type: type
    });
    var keycode = state.keymap[_layer][index];
    if (keycode.type === 'layer') {
      Vue.set(state.keymap[_layer][index], 'layer', 0);
    }
  },
  setKeyLayer(state, { layer, index, toLayer }) {
    Vue.set(state.keymap[layer][index], 'layer', toLayer);
  },
  swapKeys(state, { layer, srcIndex, dstIndex }) {
    var temp = state.keymap[layer][srcIndex];
    Vue.set(state.keymap[layer], srcIndex, state.keymap[layer][dstIndex]);
    Vue.set(state.keymap[layer], dstIndex, temp);
    mutations.setSelected(state, undefined);
    mutations.setDirty(state);
  },
  setText(state, { layer, index, text }) {
    Vue.set(state.keymap[layer][index], 'text', text);
  },
  setKey(state, { _layer, index, key }) {
    Vue.set(state.keymap[_layer], index, key);
  },
  setLayers(state, layers) {
    Vue.set(state, 'keymap', layers);
  },
  setDirty(state) {
    state.dirty = true;
  },
  clearDirty(state) {
    state.dirty = false;
  },
  clear(state) {
    state.keymap = [[]];
    state.dirty = false;
  },
  changeLayer(state, newLayer) {
    if (newLayer === state.layer) {
      return;
    }
    if (state.layer !== 0) {
      // Only make a layer active if there are actual keys on it
      const activeKeys = state.keymap[state.layer].filter(
        k => k.code !== 'KC_NO'
      );
      if (activeKeys.length === 0) {
        // clear empty layers because this is confusing to users
        Vue.set(state.keymap, state.layer, undefined);
      }
    }
    state.layer = newLayer;
  },
  resetConfig(state) {
    state.config = Object.assign({}, state.defaults);
  },
  resizeConfig(state, max) {
    let {
      KEY_WIDTH,
      KEY_HEIGHT,
      SWAP_KEY_HEIGHT,
      SWAP_KEY_WIDTH,
      KEY_X_SPACING,
      KEY_Y_SPACING
    } = state.config;
    Vue.set(state.config, 'SCALE', (defaults.MAX_X / max.x).toFixed(3) * 1);
    Vue.set(state.config, 'KEY_WIDTH', (KEY_WIDTH *= state.config.SCALE));
    Vue.set(state.config, 'KEY_HEIGHT', (KEY_HEIGHT *= state.config.SCALE));
    Vue.set(
      state.config,
      'SWAP_KEY_HEIGHT',
      (SWAP_KEY_HEIGHT *= state.config.SCALE)
    );
    Vue.set(
      state.config,
      'SWAP_KEY_WIDTH',
      (SWAP_KEY_WIDTH *= state.config.SCALE)
    );
    Vue.set(
      state.config,
      'KEY_X_SPACING',
      (KEY_X_SPACING *= state.config.SCALE).toFixed(3) * 1
    );
    Vue.set(
      state.config,
      'KEY_Y_SPACING',
      (KEY_Y_SPACING *= state.config.SCALE).toFixed(3) * 1
    );
  },
  initKeymap(state, { layout, layer, code = 'KC_NO' }) {
    const { name } = this.getters['keycodes/lookupKeycode'](code);
    Vue.set(
      state.keymap,
      layer,
      layout.map(() => {
        return {
          name,
          code,
          type: undefined
        };
      })
    );
  },
  initLayer(state, { layer, code = 'KC_NO' }) {
    if (layer > 0) {
      // layer 0 is always initialized. Use it as a reference
      this.commit('keymap/initKeymap', {
        layer,
        layout: state.keymap[0],
        code
      });
    } else {
      // TODO probably need to do something differently here
      if (state.keymap[0].length > 0) {
        this.commit('keymap/initKeymap', {
          layer,
          layout: state.keymap[0].map(() => {}),
          code: 'KC_NO'
        });
      } else {
        Vue.set(state.keymap, layer, [[]]);
      }
    }
  },
  setLoadingKeymapPromise(state, resolve) {
    state.loadingKeymapPromise = resolve;
  },
  nextColorway(state, index) {
    if (isUndefined(index)) {
      state.colorwayIndex = (state.colorwayIndex + 1) % state.colorways.length;
    } else {
      state.colorwayIndex = index;
    }
  },
  toggleDisplaySizes(state) {
    state.displaySizes = !state.displaySizes;
  },
  toggleContinuousInput(state) {
    state.continuousInput = !state.continuousInput;
  },
  ignoreNextMod(state) {
    state.ignoreMod = true;
  },
  acceptNextMod(state) {
    state.ignoreMod = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
