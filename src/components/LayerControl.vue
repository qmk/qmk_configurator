<template>
  <div>
    <p>
      <label>{{ $t('layer.label') }}:</label>
    </p>
    <div class="layers" :class="{ 'copy-target': copyMode }">
      <!-- prettier-ignore -->
      <div
        class="layer"
        :class="layer.clazz"
        v-for="layer in layers"
        :key="layer.id"
        @click="clicked(layer.id)"
      >{{ layer.name }}</div>
    </div>
    <button class="ui-button" v-tooltip="$t('layer.title')" @click="clearLayer">
      <font-awesome-icon icon="trash" size="lg" fixed-width />
    </button>
    <button
      class="ui-button" :class="{ active: copyMode }" v-tooltip="$t('layer.copyTitle')" @click="copyMode = !copyMode">
      <font-awesome-icon icon="copy" size="lg" fixed-width />
    </button>
  </div>
</template>
<script>
import rangeRight from 'lodash/rangeRight';
import isUndefined from 'lodash/isUndefined';
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'layer-control',
  data() {
    return {
      copyMode: false
    };
  },
  watch: {
    layer() {
      // leave copy mode if the active layer changes some other way
      this.copyMode = false;
    }
  },
  computed: {
    ...mapState('keymap', ['layer']),
    ...mapState('app', ['configuratorSettings']),
    ...mapGetters('keymap', ['getLayer']),
    layers() {
      let layers = rangeRight(16).map((layer) => {
        let clazz = [layer];
        let _layer = this.getLayer(layer);
        if (!isUndefined(_layer)) {
          clazz.push('non-empty');
        }
        if (this.layer == layer) {
          clazz.push('active');
        }
        return {
          id: layer,
          name: layer,
          clazz: clazz.join(' ')
        };
      });

      return layers;
    },
    defaultClearLayerCode() {
      return this.configuratorSettings.clearLayerDefault ? 'KC_TRNS' : 'KC_NO';
    }
  },
  methods: {
    ...mapMutations('keymap', ['changeLayer', 'initLayer', 'copyLayer']),
    clicked(id) {
      if (this.copyMode) {
        this.copyTo(id);
        return;
      }
      if (isUndefined(this.getLayer(id))) {
        this.initLayer({
          layer: id,
          code: this.defaultClearLayerCode
        });
      }
      this.changeLayer(id);
    },
    clearLayer() {
      this.copyMode = false;
      if (confirm(this.$t('layer.confirm'))) {
        this.initLayer({
          layer: this.layer,
          code: this.defaultClearLayerCode
        });
        this.$store.commit('keymap/setDirty');
      }
    },
    copyTo(id) {
      this.copyMode = false;
      const from = this.layer;
      if (id === from) {
        return;
      }
      if (
        !isUndefined(this.getLayer(id)) &&
        !confirm(this.$t('layer.copyConfirm', { from, to: id }))
      ) {
        return;
      }
      this.copyLayer({ from, to: id });
      this.changeLayer(id);
    }
  }
};
</script>
