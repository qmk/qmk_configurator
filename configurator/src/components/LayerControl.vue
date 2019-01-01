<template>
  <div>
    <p><label>Layer:</label></p>
    <div id="layers">
      <!-- prettier-ignore -->
      <div
        class="layer"
        :class="layer.clazz"
        v-for="layer in layers"
        :key="layer.id"
        @click="clicked(layer.id)"
      >{{ layer.name }}</div>
    </div>
  </div>
</template>
<script>
import rangeRight from 'lodash/rangeRight';
import isUndefined from 'lodash/isUndefined';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'layer-control',
  computed: {
    ...mapGetters('keymap', ['layer', 'getLayer']),
    layers() {
      let layers = rangeRight(16).map(layer => {
        let clazz = [layer];
        let _layer = this.getLayer(layer);
        if (!isUndefined(_layer)) {
          clazz.push('non-empty');
        }
        if (this.layer == layer) {
          clazz.push('active');
        }
        return {
          id: layer,
          name: layer,
          clazz: clazz.join(' ')
        };
      });

      return layers;
    }
  },
  methods: {
    ...mapMutations('keymap', ['changeLayer', 'initLayer']),
    clicked(id) {
      if (isUndefined(this.getLayer(id))) {
        this.initLayer(id);
      }
      this.changeLayer(id);
    }
  }
};
</script>
