import size from 'lodash/size';
import reduce from 'lodash/reduce';

const state = {
  keymap: [],
  layer: 0,
  dirty: false
};
const getters = {
  getKey: state => ({ _layer, index }) => state.keymap[_layer][index],
  layer: state => state.layer,
  getLayer: state => _layer => {
    return state.keymap[_layer].map(key => {
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
      let { name, code } = lookupKeycode('KC_TRNS');
      state.keymap[toLayer][index] = { name, code };
    }
  }
};
const mutations = {
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
      let { name, code } = lookupKeycode('KC_NO');
      let KC_NO = { name, code };
      state.keymap[_layer] = _.reduce(
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
