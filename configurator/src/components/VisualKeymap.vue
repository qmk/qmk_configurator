<template>
  <div id="visual-keymap2" :mystyle="style">
    <template v-for="meta in currentLayer">
      <component
        v-bind:is="getComponent(meta)"
        v-bind="meta"
        :key="meta.id"
      />
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import BaseKey from '@/components/BaseKey';
export default {
  computed: {
    ...mapGetters('keymap', ['layer', 'getLayer']),
    style() {
      return '';
    },
    currentLayer() {
      return this.getLayer(this.layer);
    }
  },
  methods: {
    calcKeyKeymapDims(w, h) {
      return {
        w: w * config.KEY_X_SPACING - (config.KEY_X_SPACING - config.KEY_WIDTH),
        h: h * config.KEY_Y_SPACING - (config.KEY_Y_SPACING - config.KEY_HEIGHT)
      };
    },

    calcKeyKeymapPos(x, y) {
      return {
        x: x * config.KEY_X_SPACING,
        y: y * config.KEY_Y_SPACING
      };
    },
    getComponent(meta) {
      debugger;
      switch (meta.type) {
        default:
          return BaseKey;
      }
    }
  },
  components: { BaseKey }
};
</script>
<style>
#visual-keymap2 {
}
</style>
