<template>
  <div
    class="keycode"
    :class="computedClass"
    :data-type="type"
    :data-code="code"
    :title="title"
  >
    {{ name }}
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
export default {
  name: 'keycode',
  props: {
    type: String,
    code: String,
    title: String,
    width: null,
    name: String
  },
  computed: {
    computedClass() {
      let classes = [];
      if (!isUndefined(this.width)) {
        classes.push(`keycode-${this.width}`);
      }
      if (!isUndefined(this.type)) {
        classes.push(`keycode-${this.type}`);
      }
      return classes;
    }
  },
  data() {
    return {};
  }
};
</script>
