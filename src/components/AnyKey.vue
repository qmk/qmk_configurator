<template>
  <!-- prettier-ignore -->
  <div
    draggable
    :id="myid"
    class="key key-layer"
    :class="myclasses"
    :style="mystyles"
    @click="clicked"
    @dragstart="dragstart"
    @dragend="dragend"
    @drop.stop="dropped"
    @dragleave.prevent="dragleave"
    @dragover.prevent="dragover"
    @dragenter.prevent="dragenter"
  >{{ displayName }}<input
    class="key-layer-input"
    @focus.prevent.stop="focus"
    @blur.prevent.stop="blur"
    @click.prevent.stop="clickignore"
    ref="input"
    spellcheck="false"
    v-model="value" /><div
        v-if="visible"
        class="remove"
        @click.stop="remove"
      >x</div></div>
</template>
<script>
import { mapMutations } from 'vuex';
import BaseKey from './BaseKey';
export default {
  name: 'any-key',
  extends: BaseKey,
  data() {
    return {
      value: this.meta.text
    };
  },
  methods: {
    ...mapMutations('keymap', ['setText']),
    blur() {
      this.setText({
        layer: this.$store.getters['keymap/layer'],
        index: this.id,
        text: this.value
      });
      this.startListening();
      this.setSelected(undefined);
    },
    focus() {
      this.stopListening();
      this.$refs.input.selectionStart = this.$refs.input.selectionEnd = 1000;
    },
    clickignore() {
      this.stopListening();
    }
  }
};
</script>
