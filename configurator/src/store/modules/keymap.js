import Vue from 'vue';
import size from 'lodash/size';
import reduce from 'lodash/reduce';
import isUndefined from 'lodash/isUndefined';
const defaults = {
  MAX_X: 775,
  KEY_WIDTH: 40,
  KEY_HEIGHT: 40,
  SWAP_KEY_WIDTH: 30,
  SWAP_KEY_HEIGHT: 30,
  KEY_X_SPACING: 45,
  KEY_Y_SPACING: 45,
  SCALE: 1
};

const state = {
  keymap: [{}],
  layer: 0,
  dirty: false,
  selectedIndex: undefined,
  defaults,
  config: Object.assign({}, defaults)
};

const getters = {
  defaults: state => Object.assign({}, state.defaults),
  config: state => state.config,
  getSelectedKey: state => state.selectedIndex,
  getKey: state => ({ _layer = state.layer, index }) =>
    state.keymap[_layer][index],
  layer: state => state.layer,
  getLayer: state => _layer => {
    return state.keymap[_layer];
  },
  size: state => _layer => {
    return size(state.keymap[_layer]);
  },
  isDirty: state => state.dirty,
  exportLayers: state => ({ compiler }) => {
    return reduce(
      state.keymap,
      function(layers, _layer, k) {
        layers[k] = [];
        var aLayer = reduce(
          _layer,
          function(acc, key, i) {
            var keycode = key.code;
            if (keycode) {
              if (keycode.indexOf('(kc)') !== -1) {
                if (key.contents) {
                  keycode = keycode.replace('kc', key.contents.code);
                } else {
                  keycode = keycode.replace('kc', 'KC_NO');
                }
              }
              if (keycode.indexOf('(layer)') !== -1) {
                keycode = keycode.replace('layer', key.layer);
              }
              if (keycode.indexOf('text') !== -1) {
                // add a special ANY marker to keycodes that were defined using ANY
                // This will be stripped back off on import.
                keycode = compiler ? key.text : `ANY(${key.text})`;
              }
            } else {
              console.log(`ERROR: unexpected keycode ${key}`, k, i, _layer);
            }
            acc.push(keycode);
            return acc;
          },
          []
        );
        layers[k] = aLayer;
        return layers;
      },
      []
    );
  }
};
const actions = {
  initKey: ({ state, commit }, { _layer, index }) => {
    if (state.keymap[_layer] === undefined) {
      commit('initLayer', _layer);
    }
    return state.keymap[_layer][index];
  },
  setKeycodeLayer({ state, commit }, { _layer, index, toLayer }) {
    state.keymap[_layer][index].layer = toLayer;
    if (toLayer !== _layer) {
      if (state.keymap[toLayer] === undefined) {
        commit('initLayer', toLayer);
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
  }
};
const mutations = {
  setSelected(state, index) {
    state.selectedIndex = index;
  },
  setKeycode(state, _code) {
    if (isUndefined(state.selectedIndex)) {
      return;
    }
    let store = this;
    let { name, code, type } = store.getters['keycodes/lookupKeycode'](_code);
    Vue.set(state.keymap[state.layer], state.selectedIndex, {
      name,
      code,
      type
    });
    mutations.setSelected(state, undefined);
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
  swapKeys(state, { layer, srcIndex, dstIndex }) {
    var temp = state.keymap[layer][srcIndex];
    Vue.set(state.keymap[layer], srcIndex, state.keymap[layer][dstIndex]);
    Vue.set(state.keymap[layer], dstIndex, temp);
    mutations.setSelected(state, undefined);
    mutations.setDirty(state);
  },
  setText(state, { _layer, index, text }) {
    Vue.set(state.keymap[_layer][index], 'text', text);
  },
  setKey(state, { _layer, index, key }) {
    Vue.set(state.keymap[_layer], index, key);
  },
  setDirty(state) {
    state.dirty = true;
  },
  clearDirty(state) {
    state.dirty = false;
  },
  clear(state) {
    state.keymap = Vue.set(state, 'keymap', [{}]);
    state.dirty = false;
  },
  changeLayer(state, newLayer) {
    state.layer = newLayer;
  },
  resetConfig: state => {
    state.config = Object.assign({}, state.defaults);
  },
  resizeConfig: (state, max) => {
    let {
      KEY_WIDTH,
      KEY_HEIGHT,
      SWAP_KEY_HEIGHT,
      SWAP_KEY_WIDTH,
      KEY_X_SPACING,
      KEY_Y_SPACING
    } = state.config;
    Vue.set(state.config, 'SCALE', (defaults.MAX_X / max.x).toFixed(3));
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
      (KEY_X_SPACING *= state.config.SCALE)
    );
    Vue.set(
      state.config,
      'KEY_Y_SPACING',
      (KEY_Y_SPACING *= state.config.SCALE)
    );
  },
  initKeymap: (state, { layout, layer }) => {
    Vue.set(
      state.keymap,
      layer,
      layout.map(() => {
        return {
          name: '',
          code: 'KC_NO',
          type: undefined
        };
      })
    );
  },
  initLayer: (state, layer) => {
    if (layer > 0) {
      // layer 0 is always initialized. Use it as a reference
      mutations.initKeymap(state, { layer: layer, layout: state.keymap[0] });
    } else {
      // TODO probably need to do something differently here
      Vue.set(state.keymap, layer, {});
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
