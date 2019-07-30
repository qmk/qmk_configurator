<template>
  <!-- prettier-ignore -->
  <div
    :id="myid"
    class="key"
    :class="localClasses"
    :style="mystyles"
    :title="displayName"
  >{{ displayName }}</div>
</template>
<script>
import BaseKey from './BaseKey';
export default {
  name: 'tester-key',
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
    },
    localClasses() {
      let classes = '';
      if (this.meta.active) {
        classes = 'active';
      }
      if (this.meta.detected) {
        classes = 'detected';
      }
      return `${this.myclasses} ${classes}`;
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
<style scoped>
.active {
  background: green;
}
.detected {
  background: lightgreen;
}
div {
  cursor: default;
}
</style>
