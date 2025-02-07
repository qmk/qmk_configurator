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
    :class="errorClasses"
    type="number"
    min="0"
    max="15"
    :value="value"
    @focus="focus"
    @blur="blur"
    @input="input"
    /></div></div><div
        v-if="visible"
        class="remove"
        @click.stop="remove"
      ><font-awesome-icon icon="times" size="xs" /></div>
  </div>
</template>
<script>
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';
import { mapState, mapMutations, mapActions } from 'vuex';
import BaseKey from './BaseKey.vue';
export default {
  name: 'layer-key',
  extends: BaseKey,
  data() {
    return {
      error: false,
      hasFocus: false
    };
  },
  computed: {
    ...mapState('keymap', {
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
        if (!this.error) {
          // don't set keycode layer if error
          this.setKeycodeLayer({
            layer: this.curLayer,
            index: this.id,
            toLayer
          });
        }
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
      this.hasFocus = false;
    },
    focus() {
      this.stopListening();
      this.hasFocus = true;
    }
  }
};
</script>
