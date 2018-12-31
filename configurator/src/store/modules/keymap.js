import size from 'lodash/size';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
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
  getKey: state => ({ _layer, index }) => state.keymap[_layer][index],
  layer: state => state.layer,
  getLayer: state => _layer => {
    return map(state.keymap[_layer], key => {
      return Object.assign({}, key);
    });
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
      state.keymap[toLayer][index] = { name, code };
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
    state.keymap[state.layer][state.selectedIndex] = { name, code, type };
  },
  setContents(state, { index, key }) {
    state.keymap[state.layer][index].contents = key;
  },
  assignKey(state, { _layer, index, name, code, type }) {
    state.keymap[_layer][index] = {
      name: name,
      code: code,
      type: type
    };
    var keycode = state.keymap[_layer][index];
    if (keycode.type === 'layer') {
      state.keymap[_layer][index].layer = 0;
    }
  },
  swapKeys(state, { _layer, srcIndex, dstIndex }) {
    var temp = state.keymap[_layer][srcIndex];
    state.keymap[_layer][srcIndex] = state.keymap[_layer][dstIndex];
    state.keymap[_layer][dstIndex] = temp;
    state.dirty = true;
  },
  setText(state, { _layer, index, text }) {
    state.keymap[_layer][index].text = text;
  },
  setKey(state, { _layer, index, key }) {
    state.keymap[_layer][index] = key;
  },
  setDirty(state) {
    state.dirty = true;
  },
  clearDirty(state) {
    state.dirty = false;
  },
  clear(state) {
    state.keymap = [];
    state.dirty = false;
  },
  changeLayer(state, newLayer) {
    state.layer = newLayer;
  },
  initLayer: (state, _layer) => {
    if (_layer > 0) {
      // layer 0 is always initialized. Use it as a reference
      let store = this;
      let { name, code } = store.getters['keycodes/lookupKeycode']('KC_NO');
      let KC_NO = { name, code };
      state.keymap[_layer] = reduce(
        state.keymap[0],
        (acc, key, index) => {
          acc[index] = KC_NO;
          return acc;
        },
        {}
      );
    } else {
      // TODO probably need to do something differently here
      state.keymap[_layer] = {};
    }
  },
  resetConfig: state => {
    state.config = Object.assign({}, state.defaults);
  },
  resizeConfig: (state, max) => {
    state.config.SCALE = defaults.MAX_X / max.x;
    state.config.KEY_WIDTH *= state.config.SCALE;
    state.config.KEY_HEIGHT *= state.config.SCALE;
    state.config.SWAP_KEY_HEIGHT *= state.config.SCALE;
    state.config.SWAP_KEY_WIDTH *= state.config.SCALE;
    state.config.KEY_X_SPACING *= state.config.SCALE;
    state.config.KEY_Y_SPACING *= state.config.SCALE;
  },
  initKeymap: (state, { layout, layer }) => {
    state.keymap[layer] = layout.map((key, index) => {
      mutations.assignKey(state, {
        _layer: 0,
        index,
        name: '',
        code: 'KC_NO',
        type: undefined
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
