<template>
  <div
    class="space"
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
  name: 'space',
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
