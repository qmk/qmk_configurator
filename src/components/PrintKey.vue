<template>
  <div
    :id="myid"
    class="key"
    :class="myclasses"
    :style="mystyles"
    :title="displayName"
  >
    {{ displayName }}
  </div>
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
      if (this.meta.type === 'layer') {
        return this.meta.code.replace('layer', this.meta.layer);
      }
      if (this.meta.type === 'text') {
        return this.formatName(this.breakLines(this.meta.text));
      }
      if (this.meta.type === 'layer-container') {
        return `${this.meta.name.toUpperCase()},\n${this.formatName(
          this.meta.contents.code
        )}`;
      }
      if (this.meta.type === 'container') {
        return `${this.meta.name.toUpperCase()}\n(${this.formatName(
          this.meta.contents.code
        )})`;
      }
      return this.formatName(this.breakLines(this.meta.name));
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
<style>
.print-keymap {
  border-radius: 5px;
  border: 5px solid;
  position: relative;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}

.print-keymap:after {
  content: ' ';
  display: block;
  height: 0;
  clear: both;
}

.print-keymap > .keycode-select {
  border: none !important;
}
</style>
