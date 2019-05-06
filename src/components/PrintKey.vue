<template>
  <!-- prettier-ignore -->
  <div
    :id="myid"
    class="key"
    :class="myclasses"
    :style="mystyles"
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
      if (this.meta.type === 'layer') {
        return this.meta.code.replace('layer', this.meta.layer);
      }
      return this.formatName(this.meta.name);
    }
  }
};
</script>
<style>
.print-keymap {
  background: #fff;
  border-radius: 5px;
  border: 5px solid #fff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}

.print-keymap {
  position: relative;
}

.print-keymap:after {
  content: ' ';
  display: block;
  height: 0;
  clear: both;
}
</style>
