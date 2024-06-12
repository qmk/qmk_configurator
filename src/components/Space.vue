<template>
  <!-- prettier-ignore -->
  <div class="space" :class="computedClass" :title="label" @mouseenter="$emit('mouseenter')">
    {{ label }}&nbsp;
    <span v-if="icon" :class="iconClass">
      <font-awesome-icon :icon="icon" fixed-width />
    </span>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
export default {
  name: 'SpaceComponent',
  props: {
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    computedClass() {
      let classes = [];
      if (!isUndefined(this.width)) {
        classes.push(`space-${this.width}`);
      }
      return classes;
    }
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
