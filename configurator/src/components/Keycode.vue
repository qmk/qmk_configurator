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
    name: String,
    classes: String
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
      if (this.dragging) {
        classes.push('dragging');
      }
      if (this.classes) {
        classes.push(this.classes);
      }
      return classes.join(' ');
    },
    displayName() {
      return this.name.length === 1 ? this.name.toUpperCase() : this.name;
    }
  },
  data() {
    return {
      dragging: false,
      crt: undefined,
      hidden: undefined
    };
  },
  methods: {
    dragend() {
      console.log('finished dragging');
      this.dragging = false;
      this.hidden.removeChild(this.crt);
    },
    drag() {},
    dragstart(ev) {
      console.log('dragstarted on ', this.name);

      this.crt = this.$el.cloneNode(true);
      this.hidden.appendChild(this.crt);
      ev.dataTransfer.setDragImage(this.crt, 0, 0);

      this.dragging = true;
      let { name, code, type } = this;
      ev.dropEffect = 'copy';
      ev.dataTransfer.dropEffect = 'move';
      ev.dataTransfer.setData(
        'application/json',
        JSON.stringify({ name, type, code })
      );
    },
    clicked() {
      this.$store.commit('keymap/setKeycode', this.code);
    }
  },
  mounted() {
    this.hidden = document.getElementsByClassName('hidden')[0];
  }
};
</script>
<style>
.dragging {
}
</style>
