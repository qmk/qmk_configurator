<template>
  <!-- prettier-ignore -->
  <div
    class="space"
    :class="computedClass"
    :title="label"
  >{{ label }}</div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
export default {
  name: 'space',
  props: {
    label: String,
    width: null
  },
  computed: {
    computedClass() {
      let classes = [];
      if (!isUndefined(this.width)) {
        classes.push(`space-${this.width}`);
      }
      return classes;
    }
  },
  data() {
    return {};
  }
};
</script>
<style>
.space-label {
  width: 100%;
  clear: both;
  height: 20px;
  justify-content: left;
  font-weight: bold;
}
</style>
