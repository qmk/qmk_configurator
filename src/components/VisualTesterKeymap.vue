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
      <h3 class="info-title">{{ $t('message.tester.keycodeStatus.label') }}</h3>
      <div class="letter-display">
        <div class="letter-key">
          <label class="key-label">
            {{ $t('message.tester.letters.key.label') }}
          </label>
          {{ lastKey }}
        </div>
        <div class="letter-code">
          <label class="code-label">
            {{ $t('message.tester.letters.code.label') }}
          </label>
          {{ lastCode }}
        </div>
        <div class="letter-key-code" @click="togglehex">
          <label class="keycode-label">
            {{ $t('message.tester.letters.keycode.label') }}
          </label>
          {{ displayKeyCode }}
        </div>
      </div>
      <div
        class="status-log"
        ref="status"
        spellcheck="false"
        v-html="status"
      ></div>
    </div>
    <p>
      {{ $t('message.tester.docs.paragraph') }}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code"
        >Code</a
      >,
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key"
        >Key</a
      >
    </p>
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
    },
    displayKeyCode() {
      return this.displayHex
        ? `0x${this.lastKeyCode.toString(16)}`
        : this.lastKeyCode;
    }
  },
  methods: {
    ...mapMutations('keymap', ['resizeConfig']),
    ...mapMutations('tester', ['setActive', 'setDetected']),
    ...mapActions('tester', ['init']),
    getComponent() {
      return TesterKey;
    },
    greenMarkup(text, padlen) {
      return `<span class="log-green">${text.padEnd(padlen, ' ')}</span>`;
    },
    formatLog(keyEventStr, pos, evStr) {
      const qmkCode = this.getQMKCode(pos);
      return [
        keyEventStr.padEnd(8, ' '),
        '- QMK:',
        this.greenMarkup(qmkCode, 7),
        evStr
      ].join(' ');
    },
    keyup(ev) {
      const endTS = performance.now();
      const evStr = this.formatKeyEvent(ev, endTS);
      ev.preventDefault();
      ev.stopPropagation();
      const pos = this.codeToPosition[this.firefoxKeys(ev.code)];
      this.writeToStatus(this.formatLog('KEY-UP', pos, evStr));
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
        this.formatLog('KEY-DOWN', pos, this.formatKeyEvent(ev))
      );
      this.lastKey = ev.key === ' ' ? ev.code : ev.key;
      this.lastCode = ev.code;
      this.lastKeyCode = ev.keyCode;
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
        [
          'Event key:',
          this.greenMarkup(ev.key, 11),
          'Code:',
          this.greenMarkup(ev.code, 13),
          'KeyCode:',
          ev.keyCode
        ].join(' ')
      );
      return msg.join(' ');
    },
    getQMKCode(pos) {
      console.log(pos);
      if (pos === undefined) {
        return '';
      }
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
    },
    togglehex() {
      this.displayHex = !this.displayHex;
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      status: '',
      timing: {},
      lastKey: '',
      lastCode: '',
      lastKeyCode: '',
      displayHex: false
    };
  },
  components: { TesterKey }
};
</script>
<style>
span.log-green {
  color: lightgreen;
}
.tester {
  margin-top: 35px;
  display: grid;
  grid-template: 1fr 1fr / 1fr;
  justify-items: center;
}
.visual-tester-keymap {
  position: relative;
}
.info {
  margin-top: 10px;
  display: grid;
  grid-template: [info-title] 30px [info-top] 4rem [info-bottom] 13rem / 1fr;
}
.info-title {
  grid-row: info-title;
}
.letter-display {
  color: rgba(0, 0, 0, 0.7);
  grid-row: info-top;
  display: grid;
  grid-template: [letter] 3rem / [letter-left] 1fr [letter-mid] 1fr [letter-right] 1fr;
  grid-column-gap: 10px;
  font-size: 2rem;
  font-family: 'Roboto Mono', Monaco, Bitstream Vera Sans Mono, Lucida Console,
    Terminal, Consolas, Liberation Mono, DejaVu Sans Mono, Courier New,
    monospace;
}
.letter-key {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.7);
  grid-column: letter-mid;
  grid-row: letter;
}
.letter-code {
  position: relative;
  grid-column: letter-left;
  grid-row: letter;
  border: 1px solid rgba(0, 0, 0, 0.7);
}
.letter-key-code {
  position: relative;
  grid-column: letter-right;
  grid-row: letter;
  border: 1px solid rgba(0, 0, 0, 0.7);
  cursor: pointer;
}
.status-log {
  grid-row: info-bottom;
  padding: 2px 5px;
  width: 869px;
  text-align: left;
  background: #272822;
  color: #f8f8f2;
  border: 1px solid #000;
  font-family: 'Roboto Mono', Monaco, Bitstream Vera Sans Mono, Lucida Console,
    Terminal, Consolas, Liberation Mono, DejaVu Sans Mono, Courier New,
    monospace;
  white-space: pre-wrap;
  overflow-y: scroll;
  height: 200px;
  font-size: 12px;
  margin: 0px auto;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: block;
}
.key-label,
.keycode-label,
.code-label {
  position: absolute;
  font-size: 8px;
  right: 2px;
  bottom: 1px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
