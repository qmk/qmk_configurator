<template>
  <div class="tester">
    <div class="layout-selector-radios">
      <slot v-for="_layout in availableLayouts">
        <button
          class="layout-btn-select"
          v-on:click="layout = _layout"
          :key="_layout"
          :class="{ active: _layout === layout }"
        >
          {{ _layout }}
        </button>
      </slot>
    </div>
    <div class="visual-tester-keymap" :style="styles">
      <template v-for="meta in testerLayer">
        <component
          :is="getComponent(meta)"
          :key="meta.id"
          :layer="0"
          v-bind="meta"
        />
      </template>
    </div>
    <div class="info">
      <h3 class="info-title">{{ $t('tester.keycodeStatus.label') }}</h3>
      <div class="letter-display">
        <div class="letter-key">
          <label class="key-label">{{ $t('tester.letters.key.label') }}</label>
          {{ lastKey }}
        </div>
        <div class="letter-code">
          <label class="code-label">{{
            $t('tester.letters.code.label')
          }}</label>
          {{ lastCode }}
        </div>
        <div class="letter-key-code" @click="togglehex">
          <label class="keycode-label">{{
            $t('tester.letters.keycode.label')
          }}</label>
          {{ displayKeyCode }}
        </div>
      </div>
      <div
        ref="status"
        class="status-log"
        spellcheck="false"
        v-html="status"
      ></div>
      <div id="chatter-container">
        <span v-tooltip="$t('tester.typewritericon.label')">
          <font-awesome-icon
            class="volume"
            :icon="audioIcon"
            size="lg"
            fixed-width
            @click="toggleAudio"
          />
        </span>
        <label>{{ $t('tester.chatter.label') }}:</label>
        <input
          id="chatter-threshold"
          v-model="chatterThreshold"
          type="number"
          min="1"
          max="100"
          step="1"
          @blur="createKeyListeners"
          @focus="destroyKeyListeners"
        />
        <span v-show="chatterDetected" id="chatter-alert">
          {{ $t('tester.chatter.detectedAlert') }}
        </span>
      </div>
    </div>
    <p>
      {{ $t('tester.docs.paragraph') }}
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
import BaseKeymap from '@/components/BaseKeymap.vue';
import TesterKey from '@/components/TesterKey.vue';
import { Howl } from 'howler';
import { useKeycodesStore } from '../store/keycodes';

export default {
  name: 'VisualTesterKeymap',
  components: { TesterKey },
  extends: BaseKeymap,
  data() {
    const sound = new Howl({
      src: ['typewriter-2.mp3'],
      sprite: {
        0: [107, 207],
        1: [304, 270],
        2: [646, 219],
        3: [862, 144],
        4: [1013, 263]
      },
      html5: true
    });
    return {
      chatterThreshold: 8,
      width: 0,
      height: 0,
      status: '',
      timingKeyUp: {},
      timingKeyDown: {},
      lastKey: '',
      lastCode: '',
      lastKeyCode: '',
      displayHex: false,
      audioIcon: 'volume-mute',
      curIndex: 0,
      sound,
      index: Object.keys(sound._sprite)
    };
  },
  computed: {
    ...mapState('tester', [
      'defaults',
      'layouts',
      'config',
      'keymap',
      'chatterDetected'
    ]),
    ...mapGetters('keymap', ['colorway']),
    ...mapGetters('tester', [
      'availableLayouts',
      'getQMKCode',
      'activeKeymap',
      'activeLayoutMeta',
      'codeToPosition'
    ]),
    layout: {
      get() {
        return this.$store.state.tester.layout;
      },
      set(value) {
        this.$store.commit('tester/reset', value);
        this.$store.commit('tester/setLayout', value);
      }
    },
    testerLayer() {
      const keymap = this.activeKeymap;
      if (isUndefined(keymap)) {
        return [];
      }

      // Calculate Max with given layout
      this.profile && console.time('currentLayer');
      const curLayer = this.activeLayoutMeta.map((pos, index) => {
        const _pos = Object.assign({ w: 1, h: 1 }, pos);
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
      this.profile && console.timeEnd('currentLayer');
      return curLayer;
    },
    displayKeyCode() {
      return this.displayHex
        ? `0x${this.lastKeyCode.toString(16)}`
        : this.lastKeyCode;
    }
  },
  async mounted() {
    this.createKeyListeners();
    const keycodesStore = useKeycodesStore();
    keycodesStore.updateKeycodeNames();
    await this.init();
    this.setSize(this.calculateMax(this.layout));
  },
  beforeDestroy() {
    this.destroyKeyListeners();
  },
  methods: {
    ...mapMutations('keymap', ['resizeConfig']),
    ...mapMutations('tester', [
      'setActive',
      'setDetected',
      'setChatterDetected'
    ]),
    ...mapActions('tester', ['init']),
    toggleAudio() {
      this.audioIcon =
        this.audioIcon === 'volume-mute' ? 'volume-up' : 'volume-mute';
    },
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
    getElapsedTime(ev, endTs) {
      return (endTs - this.timingKeyDown[ev.code]).toFixed(3);
    },
    createKeyListeners() {
      document.addEventListener('keydown', this.keydown);
      document.addEventListener('keyup', this.keyup);
    },
    destroyKeyListeners() {
      document.removeEventListener('keydown', this.keydown);
      document.removeEventListener('keyup', this.keyup);
    },
    keyup(ev) {
      const endTS = performance.now();
      this.timingKeyUp[ev.code] = endTS;
      const elapsedTime = this.getElapsedTime(ev, endTS);
      const evStr = this.formatKeyEvent(ev, elapsedTime);
      ev.preventDefault();
      ev.stopPropagation();
      const pos = this.codeToPosition[this.firefoxKeys(ev.code)];
      this.writeToStatus(this.formatLog('KEY-UP', pos, evStr));
      if (!isUndefined(pos)) {
        this.setDetected({
          pos
        });
      }
    },
    keydown(ev) {
      if (ev.repeat) {
        return;
      }
      ev.preventDefault();
      ev.stopPropagation();

      this.timingKeyDown[ev.code] = performance.now();
      const pos = this.codeToPosition[this.firefoxKeys(ev.code)];
      this.writeToStatus(
        this.formatLog('KEY-DOWN', pos, this.formatKeyEvent(ev))
      );
      this.lastKey = ev.key === ' ' ? ev.code : ev.key;
      this.lastCode = ev.code;
      this.lastKeyCode = ev.keyCode;
      if (!isUndefined(pos)) {
        this.setActive({ pos });

        // Chatter detection is triggered when a switch
        // triggers an event too quickly after the last
        // keyUp of the switch. Which means the switch
        // may be broken. QMK command LT() will not trigger
        // it because it only sends one signal
        if (
          this.timingKeyUp[ev.code] &&
          this.timingKeyDown[ev.code] - this.timingKeyUp[ev.code] <
            this.chatterThreshold
        ) {
          this.setChatterDetected({ pos });
        }
      }
      if (this.audioIcon !== 'volume-mute') {
        this.sound.play(this.index[this.curIndex]);
        this.curIndex = (this.curIndex + 1) % this.index.length;
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
        this.status = this.status.split('\n').slice(-20).join('\n');
      }
      this.scrollToEnd();
    },
    formatKeyEvent(ev, time) {
      const msg = [];
      if (time) {
        msg.push(`in ${time}ms`);
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
    firefoxKeys(code) {
      // Remap certain codes on Firefox for consistency
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
  }
};
</script>
<style>
#chatter-alert {
  text-transform: uppercase;
  font-weight: bold;
  color: red;
}
#chatter-container {
  text-align: left;
}
#chatter-threshold {
  margin: 0 5px;
  width: 50px;
}
#chatter-threshold::-webkit-inner-spin-button,
#chatter-threshold::-webkit-outer-spin-button {
  -webkit-appearance: inner-spin-button !important;
  opacity: 1;
}
.layout-selector-container select {
  padding: 5px 4px;
  border-radius: 4px;
  border: 1px solid;
  margin-left: 10px;
}
.tester {
  margin-top: 35px;
  display: grid;
  grid-template: 45px 1fr 1fr / 1fr;
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
  border: 1px solid;
  grid-column: letter-mid;
  grid-row: letter;
}
.letter-code {
  position: relative;
  grid-column: letter-left;
  grid-row: letter;
  border: 1px solid;
}
.letter-key-code {
  position: relative;
  grid-column: letter-right;
  grid-row: letter;
  border: 1px solid;
  cursor: pointer;
}
.status-log {
  grid-row: info-bottom;
  padding: 2px 5px;
  width: 869px;
  text-align: left;
  border: 1px solid;
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
}
.layout-btn-select {
  line-height: 120%;
  margin: 0px 4px 0px 0px;
  border-radius: 3px;
  border: 0px solid;
  padding: 6px 12px;
  cursor: pointer;
  margin-bottom: 10px;
}
.volume {
  margin-right: 10px;
}
</style>
