<template>
  <div class="print-keymap" :style="styles">
    <template v-for="meta in currentLayer(layer)">
      <component
        :layer="layer"
        v-bind:is="getComponent(meta)"
        v-bind="meta"
        :key="meta.id"
        :printable="true"
      />
    </template>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
import { mapState, mapGetters, mapMutations } from 'vuex';
import BaseKeymap from '@/components/BaseKeymap';
import BaseKey from '@/components/BaseKey';
import PrintKey from '@/components/PrintKey';

export default {
  name: 'print-keymap',
  extends: BaseKeymap,
  props: {
    profile: Boolean,
    layer: Number
  },
  mounted() {
    this.setSize(this.calculateMax(this.layout));
  },
  computed: {
    ...mapState('app', ['layout', 'displaySizes']),
    ...mapState('keymap', ['config', 'displaySizes']),
    ...mapGetters('keymap', [
      'getLayer',
      'loadingKeymapPromise',
      'colorway',
      'defaults'
    ]),
    ...mapState('app', ['layout', 'layouts', 'previewRequested']),
    styles() {
      let styles = [];
      styles.push(`width: ${this.width}px;`);
      styles.push(`height: ${this.height}px;`);
      styles.push(`font-size: ${this.fontsize * this.config.SCALE}em;`);
      return styles.join('');
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
    currentLayer(layerIDX) {
      const layout = this.layouts[this.layout];
      const keymap = this.getLayer(layerIDX);
      if (isUndefined(layout) || isUndefined(keymap)) {
        return [];
      }
      if (this.loadingKeymapPromise) {
        const _promise = this.loadingKeymapPromise;
        this.setLoadingKeymapPromise(undefined);
        _promise();
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
            colorway: colorway,
            displaySizes: this.displaySizes
          },
          coor,
          dims
        );
      });
      // eslint-disable-next-line no-console
      this.profile && console.timeEnd('currentLayer');
      return curLayer;
    },
    /**
     * Due to a quirk in how reactivity works we have to clear the layout
     * name to reset the UI to it's old value.
     * We should ignore these events to avoid updating the visual keymap.
     * If either the existing or the new layout is empty string return true.
     * We use a change in layout to decide whether to reset the keymap.
     */
    isLayoutUIUpdate(newLayout, oldLayout) {
      return newLayout === '' || oldLayout === '';
    },
    getComponent() {
      return PrintKey;
    }
  },
  data() {
    return {
      width: 0,
      height: 0
    };
  },
  components: { BaseKey, PrintKey }
};
</script>
<style>
.print-keymap {
  break-inside: avoid-page;
}
</style>
