<template>
  <!-- prettier-ignore -->
  <div
    :id="myid"
    class="key"
    :class="myclasses"
    :style="mystyles"
    @click="clicked"
    @drop="dropped"
    @dragleave.prevent="dragleave"
    @dragover.prevent="dragover"
    >{{ displayName }}</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'base-key',
  props: {
    id: Number,
    layer: Number,
    w: Number,
    h: Number,
    y: Number,
    x: Number
  },
  computed: {
    ...mapGetters('keymap', ['getKey', 'getSelectedKey', 'lastChanged']),
    myid() {
      return `key-${this.id}`;
    },
    displayName() {
      if (this.lastChanged === this.id) {
        let meta = this.getKey({ index: this.id });
        this.setMeta(meta);
        this.resetLastChanged();
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
    ...mapMutations('keymap', [
      'setSelected',
      'setKeycode',
      'resetLastChanged'
    ]),
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
      this.setKeycode(json.code);
      this.dragleave();
    },
    dragover() {
      // only executed when dragged into drop
      this.inHover = true;
    },
    dragleave() {
      // only executed when dragged out of drop
      this.inHover = false;
    }
  },
  data() {
    return {
      inHover: false,
      meta: {
        name: ''
      }
    };
  }
};
</script>
<style>
.key.overme {
  background: #cceecc;
  border-radius: 4px;
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
