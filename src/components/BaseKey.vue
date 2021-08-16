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

const _getKeySizeClass = (unith, unitw) => {
  if (unith == 1) {
    switch (unitw) {
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
      case 4:
        return 'k4u';
      case 6:
        return 'k6u';
      case 6.25:
        return 'k625u';
      case 7:
        return 'k7u';
    }
  }
  if (unitw == 1) {
    switch (unith) {
      case 1.25:
        return 'k125uh';
      case 1.5:
        return 'k15uh';
      case 1.75:
        return 'k175uh';
      case 2:
        return 'k2uh';
    }
  }
  if (unith === 2) {
    if (unitw === 1.25) {
      return 'kiso';
    } else if (unitw === 2.25) {
      return 'kbae';
    }
  }
  return 'custom';
};

const cache = new Map();

const getKeySizeClass = (unitheight, unitwidth) => {
  const key = `${unitheight}-${unitwidth}`;
  let hit = cache.has(key);
  if (hit) {
    return cache.get(key);
  }
  const value = _getKeySizeClass(unitheight, unitwidth);
  cache.set(key, value);
  return value;
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
    uh: Number,
    uw: Number,
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
        return this.uh > this.uw
          ? this.uw === 1
            ? this.uh
            : `${this.uw} /\n ${this.uh}`
          : this.uw;
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
      if (this.meta && this.meta.name.length >= 2 && !this.displaySizes) {
        classes.push('smaller');
      }
      const { KEY_WIDTH, KEY_HEIGHT } = this.config;
      classes.push(getKeySizeClass(this.uh, this.uw));
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
      if (getKeySizeClass(this.uh, this.uw) === 'custom') {
        // explicitly override the height and width calculations for the keymap and provide custom values
        if (this.uw !== 1) {
          styles.push(`--unit-width: ${this.uw};`);
        }
        if (this.uh !== 1) {
          styles.push(`--unit-height: ${this.uh};`);
        }
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
    clicked() {
      let id = this.id;
      if (this.isSelected) {
        // unselect this key
        id = undefined;
      }
      this.setSelected(id);
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
  width: calc(
    var(--unit-width) * var(--default-key-x-spacing) -
      (var(--default-key-x-spacing) - var(--default-key-width))
  );
  height: calc(
    var(--unit-height) * var(--default-key-y-spacing) -
      (var(--default-key-y-spacing) - var(--default-key-height))
  );
}
.k125u {
  --unit-width: 1.25;
}
.k15u {
  --unit-width: 1.5;
}
.k175u {
  --unit-width: 1.75;
}
.k2u {
  --unit-width: 2;
}
.k225u {
  --unit-width: 2.25;
}
.k275u {
  --unit-width: 2.75;
}
.k3u {
  --unit-width: 3;
}
.k4u {
  --unit-width: 4;
}
.k6u {
  --unit-width: 6;
}
.k625u {
  --unit-width: 6.25;
}
.k7u {
  --unit-width: 7;
}
.k125uh {
  --unit-height: 1.25;
}
.k15uh {
  --unit-height: 1.5;
}
.k175uh {
  --unit-height: 1.75;
}
.k2uh {
  --unit-height: 2;
}
.kiso {
  width: calc(0.5 * var(--default-key-x-spacing) + var(--default-key-width));
  height: var(--default-key-height);
  padding: 0px;
  margin-left: calc(var(--default-key-x-spacing) * -0.25);
  border-radius: 6px 6px 0px 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 0px 2px inset,
    rgba(0, 0, 0, 0.3) 0px 0px 0px 1px;
}
.kiso::after {
  background: inherit;
  position: absolute;
  content: '';
  right: -1px;
  top: var(--default-key-height);
  height: var(--default-key-x-spacing);
  width: calc(1.25 * var(--default-key-width));
  border-radius: 0px 0px 6px 6px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px -2px 0px 2px inset,
    rgba(0, 0, 0, 0.3) 0px 2px 0px 1px;
}
.kbae {
  width: calc(0.5 * var(--default-key-x-spacing) + var(--default-key-width));
  height: calc(1.1 * var(--default-key-height));
  padding: 0px;
  margin-left: calc(var(--default-key-x-spacing) * 0.75);
  border-radius: 6px 6px 0px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 0px 2px inset,
    rgba(0, 0, 0, 0.3) 0px 0px 0px 1px;
}
.kbae::after {
  background: inherit;
  position: absolute;
  content: '';
  right: -1px;
  top: calc(var(--default-key-x-spacing) - 1px);
  height: var(--default-key-height);
  width: calc(
    1.25 * var(--default-key-x-spacing) + 1 * var(--default-key-width) - 2px
  );
  border-radius: 6px 0px 6px 6px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 0.1, 0, 0.1) 0px -2px 0px 2px inset,
    rgba(0, 0, 0, 0.3) 0px 1px 0px 1px;
}
</style>
