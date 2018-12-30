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
    width: Number,
    height: Number,
    top: Number,
    left: Number,
    unit: Number
  },
  computed: {
    myid: () => `key-${this.id}`,
    displayName: () =>
      this.meta.name.length === 1
        ? this.meta.name.toUpperCase()
        : this.meta.name,
    myclasses: () => {
      return '';
    },
    mystyles: () => {
      let styles = [];
      if (this.width > 0) {
        styles.push(`width: ${this.width * this.unit}px`);
      }
      if (this.height > 0) {
        styles.push(`height: ${this.width * this.unit}px`);
      }
      return styles.join(' ');
    }
  },
  methods: {}
};
</script>
