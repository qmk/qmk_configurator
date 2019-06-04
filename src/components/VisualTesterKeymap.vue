<template>
  <div class="tester">
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
    <div class="info">
      <h3>{{ $t('message.tester.keycodeStatus.label') }}</h3>
      <textarea
        id="terminal"
        ref="status"
        cols="120"
        rows="5"
        v-model="status"
      />
    </div>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import BaseKeymap from '@/components/BaseKeymap';
import TesterKey from '@/components/TesterKey';

export default {
  name: 'visual-tester-keymap',
  extends: BaseKeymap,
  async mounted() {
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
    await this.init();
    this.setSize(this.calculateMax(this.layout));
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
    document.removeEventListener('keyup', this.keyup);
  },
  computed: {
    ...mapState('tester', [
      'layout',
      'defaults',
      'layouts',
      'config',
      'keymap',
      'codeToPosition'
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
    ...mapMutations('tester', ['setActive', 'setDetected']),
    ...mapActions('tester', ['init']),
    getComponent() {
      return TesterKey;
    },
    keyup(ev) {
      const endTS = performance.now();
      const evStr = this.formatKeyEvent(ev, endTS);
      ev.preventDefault();
      ev.stopPropagation();
      const pos = this.codeToPosition[this.firefoxKeys(ev.code)];
      this.writeToStatus(`KEY-UP ---- QMK: '${this.getQMKCode(pos)}' ${evStr}`);
      if (!isUndefined(pos)) {
        this.setDetected(pos);
      }
    },
    keydown(ev) {
      if (ev.repeat) {
        return;
      }
      this.timing[ev.code] = performance.now();
      ev.preventDefault();
      ev.stopPropagation();
      const pos = this.codeToPosition[this.firefoxKeys(ev.code)];
      this.writeToStatus(
        `KEY-DOWN -- QMK: '${this.getQMKCode(pos)}' ${this.formatKeyEvent(ev)}`
      );
      if (!isUndefined(pos)) {
        this.setActive(pos);
      }
    },
    scrollToEnd() {
      let status = this.$refs.status;
      this.$nextTick(() => {
        status.scrollTop = status.scrollHeight;
      });
    },
    writeToStatus(msg) {
      this.status += msg + '\n';
      if (this.status.length > 1000) {
        this.status = this.status
          .split('\n')
          .slice(-20)
          .join('\n');
      }
      this.scrollToEnd();
    },
    formatKeyEvent(ev, endTS) {
      let msg = [];
      if (endTS) {
        msg.push(`in ${(endTS - this.timing[ev.code]).toFixed(3)}ms`);
      }
      msg.unshift(
        `Event key: '${ev.key}', Code: ${ev.code}, keyCode: ${ev.keyCode}`
      );
      return msg.join(' ');
    },
    getQMKCode(pos) {
      return this.$store.state.tester.keymap[0][pos].code;
    },
    firefoxKeys(code) {
      switch (code) {
        case 'OSLeft':
          return 'MetaLeft';
        case 'OSRight':
          return 'MetaRight';
        case 'Help':
          return 'Insert';
        default:
          return code;
      }
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      status: '',
      timing: {}
    };
  },
  components: { TesterKey }
};
</script>
<style>
.tester {
  display: grid;
  grid-template: 1fr 1fr / 1fr;
  justify-items: center;
}
.visual-tester-keymap {
  position: relative;
}
.info {
  margin-top: 40px;
}
</style>
