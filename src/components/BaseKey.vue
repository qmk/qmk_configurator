<template>
  <!-- prettier-ignore -->
  <div
    draggable
    :id="myid"
    class="key"
    :class="myclasses"
    :style="mystyles"
    :title="myTitle"
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
import { mapState, mapGetters, mapMutations } from 'vuex';
import colorways from './colorways';

let substitute = Object.assign(
  {},
  colorways.iconCodes,
  colorways.platformIcons(window.navigator.platform)
);

export default {
  name: 'base-key',
  props: {
    id: Number,
    meta: Object,
    w: Number,
    h: Number,
    y: Number,
    x: Number,
    u: Number,
    colorway: String,
    displaySizes: {
      type: Boolean,
      default: false
    },
    printable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('keymap', ['config']),
    ...mapState('keymap', { curLayer: 'layer' }),
    ...mapGetters('keymap', ['getKey', 'getSelectedKey', 'colorwayOverride']),
    myTitle() {
      return this.meta ? this.meta.code : '';
    },
    myid() {
      return `key-${this.id}`;
    },
    visible() {
      return this.meta ? this.meta.code !== 'KC_NO' : false;
    },
    displayName() {
      if (this.displaySizes) {
        return this.u;
      }
      if (isUndefined(this.meta)) {
        return;
      }
      if (isUndefined(substitute[this.meta.code])) {
        return this.formatName(this.meta.name);
      }
      return undefined;
    },
    icon() {
      if (!this.displaySizes && this.meta && substitute[this.meta.code]) {
        return substitute[this.meta.code];
      }
      return undefined;
    },
    isSelected() {
      // only true if outer key is clicked
      return (
        this.id === this.getSelectedKey &&
        !this.$store.state.keymap.selectedContent
      );
    },
    isContentSelected() {
      return (
        this.$store.state.keymap.selectedContent &&
        this.id === this.getSelectedKey
      );
    },
    myclasses() {
      let classes = [];
      if (this.isSelected) {
        classes.push('keycode-select');
      }
      if (this.inHover) {
        classes.push('overme');
      }
      if (this.inSwap) {
        classes.push('swapme');
      }
      if (this.meta && this.meta.name.length >= 2) {
        classes.push('smaller');
      }
      const { KEY_WIDTH, KEY_HEIGHT } = this.config;
      classes.push(this.getUnitClass(this.u, this.h > this.w));
      if (!isUndefined(this.meta) && !this.printable) {
        if (this.colorwayOverride && this.colorwayOverride[this.meta.code]) {
          // Colorway specific overrides by keycode
          classes.push(
            `${this.colorway}-${this.colorwayOverride[this.meta.code]}`
          );
        } else if (
          // Large alpha keys (like Numpad 0)
          colorways.alphaCodes[this.meta.code]
        ) {
          classes.push(`${this.colorway}-key`);
        } else if (
          // Mod keys
          colorways.modCodes[this.meta.code] ||
          (this.w <= KEY_WIDTH * 3 &&
            (this.w > KEY_WIDTH || this.h > KEY_HEIGHT))
        ) {
          classes.push('mod');
          classes.push(`${this.colorway}-mod`);
        } else {
          // everything else
          classes.push(`${this.colorway}-key`);
        }
      }
      return classes.join(' ');
    },
    mystyles() {
      let styles = [];
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
    ...mapMutations('keymap', [
      'setSelected',
      'setKeycode',
      'swapKeys',
      'setSelectedContent'
    ]),
    ...mapMutations('app', ['stopListening', 'startListening']),
    getUnitClass(unit, rotated) {
      if (rotated) {
        switch (unit) {
          case 2:
            return 'k2uh';
          case 1.25:
            'k125uh';
            return 'k125uh';
          case 1.5:
            return 'k15uh';
          case 1.75:
            return 'k175uh';
          default:
            return 'kiso';
        }
      }
      switch (unit) {
        case 1:
          return 'k1u';
        case 1.25:
          return 'k125u';
        case 1.5:
          return 'k15u';
        case 1.75:
          return 'k175u';
        case 2:
          return 'k2u';
        case 2.25:
          return 'k225u';
        case 2.75:
          return 'k275u';
        case 3:
          return 'k3u';
        case 6:
          return 'k6u';
        case 6.25:
          return 'k625u';
        case 7:
          return 'k7u';
        default:
          return 'k1u';
      }
    },
    clicked() {
      let id = this.id;
      if (this.isSelected) {
        // unselect this key
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
        this.setKeycode({ _code: json.code, layer: json.layer });
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
      this.setKeycode({ _code: 'KC_NO' });
    },
    clickContents() {
      // if you click inner content highlight it
      let id = this.id;
      if (this.isContentSelected) {
        // unselect content if we have previously selected it
        id = undefined;
      }
      this.setSelectedContent(id);
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
@import '../scss/pantone';
@import '../scss/colorways';

.key.overme {
  border-radius: 4px;
}
.key.swapme {
  transform: scale(0.8);
}
.key.smaller {
  font-size: var(--default-smaller-key-font-size);
}
.key {
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: var(--default-key-font-size);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 120%;
  box-shadow: 0px -1px 0px 3px inset rgba(0, 0, 0, 0.1),
    0px 0px 0px 1px rgba(0, 0, 0, 0.3);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.k1u {
  width: calc(var(--default-key-width));
  height: calc(var(--default-key-height));
}
//(w - 1) * this.config.KEY_X_SPACING + this.config.KEY_WIDTH
.k125u {
  width: calc(
    calc(0.25 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k15u {
  width: calc(
    calc(0.5 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k175u {
  width: calc(
    calc(0.75 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k2u {
  width: calc(
    calc(1 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k225u {
  width: calc(
    calc(1.25 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k275u {
  width: calc(
    calc(1.75 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k3u {
  width: calc(
    calc(2 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k6u {
  width: calc(
    calc(5 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k625u {
  width: calc(
    calc(5.25 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k7u {
  width: calc(
    calc(6 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: var(--default-key-height);
}
.k2uh {
  width: var(--default-key-width);
  height: calc(
    calc(1 * var(--default-key-y-spacing)) + var(--default-key-height)
  );
}
.k125uh {
  width: var(--default-key-width);
  height: calc(
    calc(0.25 * var(--default-key-y-spacing)) + var(--default-key-height)
  );
}
.k15uh {
  width: var(--default-key-width);
  height: calc(
    calc(0.5 * var(--default-key-y-spacing)) + var(--default-key-height)
  );
}
.k175uh {
  width: var(--default-key-width);
  height: calc(
    calc(0.75 * var(--default-key-y-spacing)) + var(--default-key-height)
  );
}
.kiso {
  width: calc(
    calc(0.25 * var(--default-key-x-spacing)) + var(--default-key-width)
  );
  height: calc(
    calc(1 * var(--default-key-y-spacing)) + var(--default-key-height)
  );
}
</style>
