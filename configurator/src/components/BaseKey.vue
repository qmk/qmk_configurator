<template>
  <!-- prettier-ignore -->
  <div
    :id="myid"
    class="key"
    :class="myclasses"
    :style="mystyles"></div>
</template>
<script>
export default {
  name: 'base-key',
  props: {
    id: Number,
    meta: Object,
    w: Number,
    h: Number,
    y: Number,
    x: Number
  },
  computed: {
    myid() {
      return `key-${this.id}`;
    },
    displayName() {
      return this.meta.name.length === 1
        ? this.meta.name.toUpperCase()
        : this.meta.name;
    },
    myclasses() {
      return '';
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
  methods: {}
};
</script>
