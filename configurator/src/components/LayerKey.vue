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
    >{{ displayName }}<br /><input
      class="key-layer-input"
      type="number"
      :value="value"
      @focus="focus"
      @input="input"
    /></div>
</template>
<script>
import isNumber from 'lodash/isNumber';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import BaseKey from './BaseKey';
export default {
  name: 'layer-key',
  extends: BaseKey,
  computed: {
    ...mapGetters('keymap', {
      curLayer: 'layer'
    }),
    value() {
      return this.meta.layer;
    }
  },
  methods: {
    ...mapMutations('keymap', ['setText']),
    ...mapActions('keymap', ['setKeycodeLayer']),
    input(e) {
      const toLayer = parseInt(e.data, 10);
      if (isNumber(toLayer)) {
        this.setKeycodeLayer({
          layer: this.curLayer,
          index: this.id,
          toLayer
        });
        this.startListening();
        this.setSelected(undefined);
      }
    },
    focus() {
      this.stopListening();
    }
  }
};
</script>
