<template>
  <div id="visual-keymap" :style="styles">
    <template v-for="meta in currentLayer">
      <transition name="fade" appear :key="meta.id">
        <component
          v-bind:is="getComponent(meta)"
          v-bind="meta"
          :key="meta.id"
        />
      </transition>
    </template>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
import random from 'lodash/random';
import { mapGetters, mapMutations } from 'vuex';
import BaseKey from '@/components/BaseKey';
import AnyKey from '@/components/AnyKey';
import LayerKey from '@/components/LayerKey';
import ContainerKey from '@/components/ContainerKey';

export default {
  name: 'visual-keymap',
  props: {
    profile: Boolean
  },
  watch: {
    layout(newLayout, oldLayout) {
      // eslint-disable-next-line no-console
      this.profile && console.time('layout');
      if (!isUndefined(newLayout) && newLayout !== oldLayout) {
        // eslint-disable-next-line no-console
        this.profile && console.time('layout::reset');
        this.resetConfig();
        this.changeLayer(0);
        this.clear();
        // eslint-disable-next-line no-console
        this.profile && console.time('layout::initkeymap');
        this.initKeymap({
          layer: 0,
          layout: this.layouts[newLayout]
        });
        // eslint-disable-next-line no-console
        this.profile && console.timeEnd('layout::initkeymap');
        // eslint-disable-next-line no-console
        this.profile && console.timeEnd('layout::reset');

        // eslint-disable-next-line no-console
        this.profile && console.time('layout::scale');
        const layout = this.layouts[this.layout];
        const max = layout.reduce(
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
        // eslint-disable-next-line no-console
        this.profile && console.timeEnd('layout::scale');
      }
      // eslint-disable-next-line no-console
      this.profile && console.timeEnd('layout');
    }
  },
  computed: {
    ...mapGetters('keymap', [
      'layer',
      'getLayer',
      'defaults',
      'config',
      'loadingKeymapPromise'
    ]),
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
      if (isUndefined(layout) || isUndefined(keymap)) {
        return [];
      }
      if (this.loadingKeymapPromise) {
        this.loadingKeymapPromise();
        this.setLoadingKeymapPromise(undefined);
      }
      // Calculate Max with given layout
      // eslint-disable-next-line no-console
      this.profile && console.time('currentLayer');
      const colorway = this.colorway;
      let curLayer = layout.map((pos, index) => {
        let _pos = Object.assign({ w: 1, h: 1 }, pos);
        const coor = this.calcKeyKeymapPos(_pos.x, _pos.y);
        const dims = this.calcKeyKeymapDims(_pos.w, _pos.h);
        return Object.assign(
          {
            id: index,
            layer: this.layer,
            meta: keymap[index],
            colorway: colorway
          },
          coor,
          dims
        );
      });
      // eslint-disable-next-line no-console
      this.profile && console.timeEnd('currentLayer');
      return curLayer;
    }
  },
  methods: {
    ...mapMutations('keymap', [
      'changeLayer',
      'clear',
      'initKeymap',
      'resetConfig',
      'resizeConfig',
      'setLoadingKeymapPromise'
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
      switch (meta.meta.type) {
        case 'container':
          return ContainerKey;
        case 'layer':
          return LayerKey;
        case 'text':
          return AnyKey;
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
    const colorways = [
      'modern-selectric',
      'danger-zone',
      'oblivion-hagoromo',
      'pulse'
    ];
    return {
      width: 0,
      height: 0,
      colorway: colorways[random(0, colorways.length - 1)]
    };
  },
  components: { BaseKey, AnyKey, LayerKey, ContainerKey }
};
</script>
<style>
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
