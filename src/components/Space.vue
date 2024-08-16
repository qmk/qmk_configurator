<template>
  <!-- prettier-ignore -->
  <div class="space" :class="computedClass" :title="label" @mouseenter="$emit('mouseenter')">
    {{ label }}&nbsp;
    <span :class="iconClass" v-if="icon">
      <font-awesome-icon :icon="icon" fixed-width />
    </span>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
export default {
  name: 'space-component',
  props: {
    label: String,
    width: null,
    icon: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    }
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
