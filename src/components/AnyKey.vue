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
  ><div :class="`${hasFocus ? 'key-layer-title-focus' : 'key-layer-title'}`">{{ displayName }}<div><input
  v-if="isShowingKeymapLegends"
  class="key-layer-input"
  @focus.prevent.stop="focus"
  @blur.prevent.stop="blur"
  @click.prevent.stop="clickignore"
  ref="input"
  spellcheck="false"
  :style="`width:calc(${this.charLength}ch + 6px);`"
  v-model="value" /></div></div><div
        v-if="visible"
        class="remove"
        @click.stop="remove"
      ><font-awesome-icon icon="times" size="xs" /></div></div>
</template>
<script>
import { mapMutations } from 'vuex';
import BaseKey from './BaseKey.vue';
export default {
  name: 'any-key',
  extends: BaseKey,
  data() {
    return {
      charLength: 3,
      hasFocus: false
    };
  },
  computed: {
    value: {
      get() {
        return this.meta.text;
      },
      set(value) {
        this.updateWidth(value);
        this.setText({
          layer: this.$store.state.keymap.layer,
          index: this.id,
          text: value
        });
      }
    }
  },
  methods: {
    ...mapMutations('keymap', ['setText']),
    blur() {
      this.startListening();
      this.hasFocus = false;
      this.charLength = 3;
      this.setSelected(undefined);
    },
    focus() {
      this.stopListening();
      this.hasFocus = true;
      this.charLength = this.value ? this.value.length : 3;
      this.$refs.input.selectionStart = this.$refs.input.selectionEnd = 1000;
    },
    updateWidth(value) {
      this.charLength = value.length;
    },
    clickignore() {
      this.stopListening();
    }
  }
};
</script>
