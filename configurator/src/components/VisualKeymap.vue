<template>
  <div id="visual-keymap" :style="styles">
    <template v-for="meta in currentLayer">
      <component v-bind:is="getComponent(meta)" v-bind="meta" :key="meta.id" />
    </template>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
import { mapGetters, mapMutations } from 'vuex';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import BaseKey from '@/components/BaseKey';

export default {
  watch: {
    layout(newLayout, oldLayout) {
      if (!isUndefined(newLayout) && newLayout !== oldLayout) {
        this.resetConfig();
        this.clear();
        this.changeLayer(0);
        this.initLayer(0);
        this.initKeymap({
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
      styles.push(`font-size: ${this.fontsize * this.config.SCALE}em;`);
      return styles.join('');
    },
    currentLayer() {
      const layout = this.layouts[this.layout];
      const keymap = this.getLayer(this.layer);
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
        return Object.assign(
          {
            id: index,
            layer: this.layer,
            meta: keymap[index]
          },
          coor,
          dims
        );
      });
      return curLayer;
    }
  },
  methods: {
    ...mapMutations('keymap', [
      'changeLayer',
      'clear',
      'initKeymap',
      'initLayer',
      'resetConfig',
      'resizeConfig'
    ]),
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
