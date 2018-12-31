<template>
  <!-- prettier-ignore -->
  <div
    :id="myid"
    class="key"
    :class="myclasses"
    :style="mystyles"
    @click="clicked"
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
    ...mapMutations('keymap', ['resetLastChanged']),
    clicked() {
      let id = this.id;
      if (this.getSelectedKey === this.id) {
        id = undefined;
      }
      this.$store.commit('keymap/setSelected', id);
    },
    setMeta(meta) {
      this.meta = meta;
    }
  },
  data() {
    return {
      meta: {
        name: ''
      }
    };
  }
};
</script>
