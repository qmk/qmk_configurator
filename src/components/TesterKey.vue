<template>
  <!-- prettier-ignore -->
  <div
    :id="myid"
    class="key"
    :class="myclasses"
    :style="mystyles"
    :title="displayName"
  >{{ displayName }}</div>
</template>
<script>
import BaseKey from './BaseKey';
export default {
  name: 'print-key',
  props: {
    layer: Number
  },
  extends: BaseKey,
  computed: {
    myid() {
      return `key-${this.layer}-${this.id}`;
    },
    displayName() {
      return this.formatName(this.breakLines(this.meta.name));
    }
  },
  methods: {
    breakLines(name) {
      if (this.u < 1.75) {
        name = name.replace(' ', '\n').replace('_', '_\n');
      }
      return name;
    }
  }
};
</script>
<style></style>
