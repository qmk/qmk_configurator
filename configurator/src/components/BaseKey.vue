<template>
  <!-- prettier-ignore -->
  <div
    draggable
    :id="myid"
    class="key"
    :class="myclasses"
    :style="mystyles"
    @click="clicked"
    @dragstart="dragstart"
    @dragend="dragend"
    @drop.stop="dropped"
    @dragleave.prevent="dragleave"
    @dragover.prevent="dragover"
    @dragenter.prevent="dragenter"
    >{{ displayName }}<font-awesome-icon v-if="icon" size="2x" :icon="icon" /><template
      v-if="visible">
        <div
          v-if="visible"
          class="remove"
          @click.stop="remove"
        >x</div>
    </template></div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
import { mapGetters, mapMutations } from 'vuex';

let substitute = {
  KC_UP: 'arrow-up',
  KC_DOWN: 'arrow-down',
  KC_LEFT: 'arrow-left',
  KC_RGHT: 'arrow-right'
};
export default {
  name: 'base-key',
  props: {
    id: Number,
    meta: Object,
    w: Number,
    h: Number,
    y: Number,
    x: Number,
    colorway: String
  },
  mounted() {
    let icon = [];
    this.platform = window.navigator.platform;
    switch (this.platform) {
      case 'MacIntel':
      case 'Macintosh':
      case 'MacPPC':
      case 'iPhone':
      case 'iPad':
        icon = ['fab', 'apple'];
        break;
      case 'Linux i686':
      case 'Linux x86_64':
      case 'Linux armv7l':
        icon = ['fab', 'linux'];
        break;
      case 'Win32':
        icon = ['fab', 'windows'];
        break;
      default:
        // fall back to text if we can't detect
        icon = undefined;
    }

    substitute = {
      ...substitute,
      KC_LGUI: icon,
      KC_RGUI: icon
    };
  },
  computed: {
    ...mapGetters('keymap', ['getKey', 'getSelectedKey']),
    ...mapGetters('keymap', { curLayer: 'layer' }),
    myid() {
      return `key-${this.id}`;
    },
    visible() {
      return this.meta.code !== 'KC_NO';
    },
    displayName() {
      if (isUndefined(this.meta)) {
        return;
      }
      if (isUndefined(substitute[this.meta.code])) {
        return this.formatName(this.meta.name);
      }
      return undefined;
    },
    icon() {
      if (substitute[this.meta.code]) {
        return substitute[this.meta.code];
      }
      return undefined;
    },
    myclasses() {
      let classes = [];
      if (this.id === this.getSelectedKey) {
        classes.push('keycode-select');
      }
      if (this.inHover) {
        classes.push('overme');
      }
      if (this.inSwap) {
        classes.push('swapme');
      }
      if (this.meta.name.length >= 2) {
        classes.push('smaller');
      } else {
        classes.push('thicker');
      }
      const U = 40;
      if (this.w <= U * 3 && (this.w > U || this.h > U)) {
        classes.push('mod');
        classes.push(`${this.colorway}-mod`);
      } else {
        classes.push(`${this.colorway}-key`);
      }
      return classes.join(' ');
    },
    mystyles() {
      let styles = [];
      if (this.w > 0) {
        styles.push(`width: ${this.w}px;`);
      }
      if (this.h > 0) {
        styles.push(`height: ${this.h}px;`);
      }
      if (this.y > 0) {
        styles.push(`top: ${this.y}px;`);
      }
      if (this.x > 0) {
        styles.push(`left: ${this.x}px;`);
      }
      return styles.join('');
    }
  },
  methods: {
    ...mapMutations('keymap', ['setSelected', 'setKeycode', 'swapKeys']),
    ...mapMutations('app', ['stopListening', 'startListening']),
    clicked() {
      let id = this.id;
      if (this.getSelectedKey === this.id) {
        id = undefined;
      }
      this.setSelected(id);
    },
    setMeta(meta) {
      this.meta = meta;
    },
    dropped(ev) {
      this.setSelected(this.id);
      let json = JSON.parse(ev.dataTransfer.getData('application/json'));
      if (json.action === 'swap') {
        console.log(`swapping ${json.id} with ${this.id}`);
        this.swapKeys({
          layer: this.curLayer,
          srcIndex: json.id,
          dstIndex: this.id
        });
      } else {
        this.setKeycode(json.code);
      }
      this.dragleave();
    },
    dragend() {
      this.inSwap = false;
      this.inHover = false;
      this.$el.style.opacity = '1';
    },
    dragover() {
      return false;
    },
    dragenter() {
      // only executed when dragged into drop
      this.inHover = true;
    },
    dragleave() {
      // only executed when dragged out of drop
      this.inHover = false;
    },
    dragstart(ev) {
      // move elements
      this.inSwap = true;
      let { id } = this;
      ev.dropEffect = 'move';
      ev.dataTransfer.dropEffect = 'move';
      ev.dataTransfer.setData(
        'application/json',
        JSON.stringify({ action: 'swap', id })
      );
    },
    formatName(name) {
      return name.length === 1 ? name.toUpperCase() : name;
    },
    remove() {
      this.setSelected(this.id);
      this.setKeycode('KC_NO');
    }
  },
  data() {
    return {
      inHover: false,
      inSwap: false,
      platform: undefined
    };
  }
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat');
@import '../scss/gmk-abs';
@import '../scss/sp-abs';
@import '../scss/sp-pbt';
@import '../scss/colorways';

.key.overme {
  background: #cceecc !important;
  color: #333;
  border-radius: 4px;
}
.key.swapme {
  transform: scale(0.8);
}
.key.smaller {
  font-size: 0.61rem;
}
.key.thicker {
}
.key.mod {
}
.key {
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 120%;
}

/*
.key {
  color: #aaa;
  font: bold 9pt arial;
  text-decoration: none;
  text-align: center;
  width: 44px;
  height: 41px;
  margin: 5px;
  background: #eff0f2;
  -moz-border-radius: 4px;
  border-radius: 4px;
  border-top: 1px solid #f5f5f5;
  -webkit-box-shadow: inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9,
    0 2px 3px #333;
  -moz-box-shadow: inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9,
    0 2px 3px #333;
  box-shadow: inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9,
    0 2px 3px #333;
  text-shadow: 0px 1px 0px #f5f5f5;
}
.key:active,
.keydown {
  color: #888;
  background: #ebeced;
  margin: 7px 5px 3px;
  -webkit-box-shadow: inset 0 0 25px #ddd, 0 0 3px #333;
  -moz-box-shadow: inset 0 0 25px #ddd, 0 0 3px #333;
  box-shadow: inset 0 0 25px #ddd, 0 0 3px #333;
  border-top: 1px solid #eee;
}
*/
</style>
