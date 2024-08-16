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
    :style="computedStyles"
    @drag="drag"
    @dragstart="dragstart"
    @dragend="dragend"
    @click="clicked"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
    >{{ displayName }}</div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';

const debug = false;
export default {
  name: 'keycode-component',
  props: {
    type: String,
    code: String,
    title: String,
    width: null,
    name: String,
    classes: String,
    styles: Object,
    layer: Number
  },
  computed: {
    computedStyles() {
      if (this.styles) {
        return this.styles;
      }
      return '';
    },
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
      return this.name;
    },
    displayTitle() {
      return this.title ? `${this.code}\n${this.title}` : this.code;
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
      debug && console.log('finished dragging');
      this.dragging = false;
      this.hidden.removeChild(this.crt);
    },
    drag() {},
    dragstart(ev) {
      debug && console.log('dragstarted on ', this.name);

      this.crt = this.$el.cloneNode(true);
      this.hidden.appendChild(this.crt);
      ev.dataTransfer.setDragImage(this.crt, 0, 0);

      this.dragging = true;
      let { name, code, type, layer } = this;
      ev.dropEffect = 'copy';
      ev.dataTransfer.dropEffect = 'move';
      ev.dataTransfer.setData(
        'application/json',
        JSON.stringify({ name, type, code, layer })
      );
    },
    clicked() {
      this.$store.commit('keymap/setKeycode', {
        _code: this.code,
        layer: this.layer
      });
    }
  },
  mounted() {
    this.hidden = document.getElementsByClassName('qmk-hidden-drag-n-drop')[0];
  }
};
</script>
