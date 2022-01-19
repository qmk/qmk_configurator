<template>
  <!-- prettier-ignore -->
  <div
    :id="myid"
    class="key tester-key"
    :class="localClasses"
    :style="mystyles"
    :title="displayName"
  >{{ displayName }}</div>
</template>
<script>
import BaseKey from './BaseKey.vue';
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
      const classes = [];
      if (this.meta.active) {
        classes.push('active');
      }
      if (this.meta.chatter) {
        classes.push('chatter-detected');
      }
      if (this.meta.detected) {
        classes.push('detected');
      }
      return `${this.myclasses} ${classes.join(' ')}`;
    }
  },
  methods: {
    breakLines(name) {
      if (this.uw < 1.75) {
        name = name.replace(' ', '\n').replace('_', '_\n');
      }
      return name;
    }
  }
};
</script>
