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
    >{{ displayName }}</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'base-key',
  props: {
    id: Number,
    layer: Number,
    meta: Object,
    w: Number,
    h: Number,
    y: Number,
    x: Number
  },
  computed: {
    ...mapGetters('keymap', ['getKey', 'getSelectedKey']),
    myid() {
      return `key-${this.id}`;
    },
    displayName() {
      if (this.meta === undefined) {
        return;
      }
      return this.meta.name.length === 1
        ? this.meta.name.toUpperCase()
        : this.meta.name;
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
          layer: this.layer,
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
      this.$el.style.opacity = '0.4';
      let { id } = this;
      ev.dropEffect = 'move';
      ev.dataTransfer.dropEffect = 'move';
      ev.dataTransfer.setData(
        'application/json',
        JSON.stringify({ action: 'swap', id })
      );
    }
  },
  data() {
    return {
      inHover: false,
      inSwap: false
      /*
      meta: {
        name: ''
      }
      */
    };
  }
};
</script>
<style>
.key.overme {
  background: #cceecc;
  border-radius: 4px;
}
.key.swapme {
  transform: scale(0.8);
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
