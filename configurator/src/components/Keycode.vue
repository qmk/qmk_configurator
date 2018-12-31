<!--
  ignore the spacing around the div otherwise we want to
  ignore the space between inline block elements
  @see https://css-tricks.com/fighting-the-space-between-inline-block-elements/ -->
<template>
  <!-- prettier-ignore
  -->
  <div
    draggable
    class="keycode ui-draggable ui-draggable-handle"
    :class="computedClass"
    :data-type="type"
    :data-code="code"
    :title="title"
    @drag="drag"
    @dragstart="dragstart"
    @dragend="dragend"
    @click="clicked"
  >{{ displayName }}</div>
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
    },
    displayName() {
      return this.name.length === 1 ? this.name.toUpperCase() : this.name;
    }
  },
  data() {
    return {};
  },
  methods: {
    dragend() {},
    drag() {},
    dragstart(ev) {
      console.log('dragstarted on ', this.name);
      let { name, keycode, type } = this;
      ev.dropEffect = 'copy';
      ev.dataTransfer.setData(
        'application/json',
        JSON.stringify({ name, type, keycode })
      );
    },
    clicked() {
      this.$store.commit('keymap/setKeycode', this.code);
    }
  }
};
</script>
