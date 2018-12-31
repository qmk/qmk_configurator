<template>
  <div id="visual-keymap" :style="styles">
    <template v-for="meta in currentLayer">
      <component v-bind:is="getComponent(meta)" v-bind="meta" :key="meta.id" />
    </template>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import BaseKey from '@/components/BaseKey';

export default {
  watch: {
    layout(newLayout, oldLayout) {
      if (newLayout !== oldLayout) {
        this.resetConfig();
        this.$store.commit('keymap/clear');
        this.$store.commit('keymap/changeLayer', 0);
        this.$store.commit('keymap/initLayer', 0);
        this.$store.commit('keymap/initKeymap', {
          layer: 0,
          layout: this.layouts[newLayout]
        });
      }
    }
  },
  computed: {
    ...mapGetters('keymap', ['layer', 'getLayer', 'defaults', 'config']),
    ...mapGetters('app', ['layout', 'layouts']),
    styles() {
      let styles = [];
      styles.push(`width: ${this.width}px;`);
      styles.push(`height: ${this.height}px;`);
      return styles.join('');
    },
    currentLayer() {
      const layout = this.layouts[this.layout];
      // Calculate Max with given layout
      const max = reduce(
        layout,
        (acc, pos) => {
          let _pos = Object.assign({ w: 1, h: 1 }, pos);
          const coor = this.calcKeyKeymapPos(_pos.x, _pos.y);
          const dims = this.calcKeyKeymapDims(_pos.w, _pos.h);
          acc.x = Math.max(acc.x, coor.x + dims.w);
          acc.y = Math.max(acc.y, coor.y + dims.h);
          return acc;
        },
        {
          x: 0,
          y: 0
        }
      );
      if (max.x > this.defaults.MAX_X) {
        this.resizeConfig(max);
        max.x *= this.config.SCALE;
        max.y *= this.config.SCALE;
      }
      this.setSize(max);
      let curLayer = map(layout, (pos, index) => {
        let _pos = Object.assign({ w: 1, h: 1 }, pos);
        const coor = this.calcKeyKeymapPos(_pos.x, _pos.y);
        const dims = this.calcKeyKeymapDims(_pos.w, _pos.h);
        return Object.assign({ id: index, layer: this.layer }, coor, dims);
      });
      return curLayer;
    }
  },
  methods: {
    ...mapMutations('keymap', ['resizeConfig', 'resetConfig']),
    calcKeyKeymapDims(w, h) {
      return {
        w:
          w * this.config.KEY_X_SPACING -
          (this.config.KEY_X_SPACING - this.config.KEY_WIDTH),
        h:
          h * this.config.KEY_Y_SPACING -
          (this.config.KEY_Y_SPACING - this.config.KEY_HEIGHT)
      };
    },
    calcKeyKeymapPos(x, y) {
      return {
        x: x * this.config.KEY_X_SPACING,
        y: y * this.config.KEY_Y_SPACING
      };
    },
    getComponent(meta) {
      switch (meta.type) {
        default:
          return BaseKey;
      }
    },
    setSize(max) {
      this.width = max.x;
      this.height = max.y;
    }
  },
  data() {
    return {
      width: 0,
      height: 0
    };
  },
  components: { BaseKey }
};
</script>
<style>
#visual-keymap2 {
}
</style>
