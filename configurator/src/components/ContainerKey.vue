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
    @focus="focus"
    @blur="blur"
    v-model="value" /></div>
</template>
<script>
import isNumber from 'lodash/isNumber';
import { mapMutations } from 'vuex';
import BaseKey from './BaseKey';
export default {
  name: 'container-key',
  extends: BaseKey,
  data() {
    return {
      value: this.meta.text
    };
  },
  methods: {
    ...mapMutations('keymap', ['setText']),
    blur() {
      const toLayer = parseInt(this.value, 10);
      if (isNumber(toLayer)) {
        this.setText({
          layer: this.$store.getters['keymap/layer'],
          index: this.id,
          toLayer
        });
      }
      this.startListening();
      this.setSelected(undefined);
    },
    focus() {
      this.stopListening();
    }
  }
};
</script>
