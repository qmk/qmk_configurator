<template>
  <div class="print-keymap" :style="styles">
    <template v-for="meta in currentLayer(layer)">
      <PrintKey :layer="layer" v-bind="meta" :key="meta.id" :printable="true" />
    </template>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
import { mapState, mapGetters, mapMutations } from 'vuex';
import BaseKeymap from '@/components/BaseKeymap';
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
    ...mapState('app', ['layout', 'layouts', 'previewRequested'])
  },
  methods: {
    ...mapMutations('keymap', ['resizeConfig']),
    currentLayer(layerIndex) {
      const layout = this.layouts[this.layout];
      const keymap = this.getLayer(layerIndex);
      if (isUndefined(layout) || isUndefined(keymap)) {
        return [];
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
  components: { PrintKey }
};
</script>
<style>
.print-keymap {
  break-inside: avoid-page;
}
</style>
