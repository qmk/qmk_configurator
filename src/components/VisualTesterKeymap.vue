<template>
  <div class="visual-tester-keymap" :style="styles">
    <template v-for="meta in testerLayer">
      <component
        :layer="0"
        v-bind:is="getComponent(meta)"
        v-bind="meta"
        :key="meta.id"
      />
    </template>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import BaseKeymap from '@/components/BaseKeymap';
import TesterKey from '@/components/TesterKey';

export default {
  name: 'visual-tester-keymap',
  extends: BaseKeymap,
  async mounted() {
    await this.init();
    this.setSize(this.calculateMax(this.layout));
  },
  computed: {
    ...mapState('tester', [
      'layout',
      'defaults',
      'layouts',
      'config',
      'keymap'
    ]),
    ...mapGetters('keymap', ['colorway']),
    styles() {
      let styles = [];
      styles.push(`width: ${this.width}px;`);
      styles.push(`height: ${this.height}px;`);
      styles.push(`font-size: ${this.fontsize * this.config.SCALE}em;`);
      return styles.join('');
    },
    testerLayer() {
      if (this.keymap.length === 0) {
        return [];
      }
      const layout = this.layouts[this.layout];
      const keymap = this.keymap[0];
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
            layer: 0,
            meta: keymap[index]
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
    ...mapMutations('keymap', ['resizeConfig']),
    ...mapActions('tester', ['init']),
    getComponent() {
      return TesterKey;
    }
  },
  data() {
    return {
      width: 0,
      height: 0
    };
  },
  components: { TesterKey }
};
</script>
<style>
.visual-tester-keymap {
  position: relative;
}
</style>
