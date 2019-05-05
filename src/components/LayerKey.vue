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
    >{{ displayName }}<div><input
      class="key-layer-input"
      :class="errorClasses"
      type="number"
      :value="value"
      @focus="focus"
      @blur="blur"
      @input="input"
      /></div><div
        v-if="visible"
        class="remove"
        @click.stop="remove"
      >x</div>
  </div>
</template>
<script>
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import BaseKey from './BaseKey';
export default {
  name: 'layer-key',
  extends: BaseKey,
  data() {
    return {
      error: false
    };
  },
  computed: {
    ...mapGetters('keymap', {
      curLayer: 'layer'
    }),
    value() {
      return this.meta.layer;
    },
    errorClasses() {
      if (this.error) {
        return 'input-error';
      }
      return '';
    }
  },
  methods: {
    ...mapMutations('app', ['setHasErrors', 'setHasNoErrors']),
    ...mapMutations('keymap', ['setText']),
    ...mapActions('keymap', ['setKeycodeLayer']),
    input(e) {
      const toLayer = parseInt(e.target.value, 10);
      if (!isNaN(toLayer) && isNumber(toLayer)) {
        this.error = toLayer < 0 || toLayer > 15;
        this.setKeycodeLayer({
          layer: this.curLayer,
          index: this.id,
          toLayer
        });
      }
      if (this.error) {
        this.setHasErrors();
      } else {
        this.setHasNoErrors();
      }
    },
    blur() {
      this.startListening();
      this.setSelected(undefined);
    },
    focus() {
      this.stopListening();
    }
  }
};
</script>
<style>
.key-layer-input.input-error {
  outline-color: red;
  border-color: red;
}
</style>
