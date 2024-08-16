<template>
  <div class="print-keymap" :style="styles">
    <template v-for="meta in currentLayer(layer)">
      <PrintKey :key="meta.id" :layer="layer" v-bind="meta" :printable="true" />
    </template>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
import { mapState, mapGetters, mapMutations } from 'vuex';
import BaseKeymap from '@/components/BaseKeymap.vue';
import PrintKey from '@/components/PrintKey.vue';

export default {
  name: 'PrintKeymap',
  components: { PrintKey },
  extends: BaseKeymap,
  props: {
    profile: Boolean,
    layer: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      width: 0,
      height: 0
    };
  },
  computed: {
    ...mapState('app', ['layout']),
    ...mapState('keymap', ['config']),
    ...mapGetters('keymap', [
      'getLayer',
      'loadingKeymapPromise',
      'colorway',
      'defaults'
    ]),
    ...mapState('app', ['layout', 'layouts', 'previewRequested'])
  },
  mounted() {
    this.setSize(this.calculateMax(this.layout));
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
      this.profile && console.timeEnd('currentLayer');
      return curLayer;
    },
    getComponent() {
      return PrintKey;
    }
  }
};
</script>
<style>
.print-keymap {
  break-inside: avoid-page;
}
</style>
