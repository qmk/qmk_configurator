<template>
  <div class="edited-layer">
    <div>
      <button class="up-button button-defaults" :disabled="isUpDisabled">
        <font-awesome-icon size="lg" fixed-width :icon="arrowUp" />
      </button>
    </div>
    <div>
      <button class="down-button button-defaults" :disabled="isDownDisabled">
        <font-awesome-icon size="lg" fixed-width :icon="arrowDown" />
      </button>
    </div>
    <div>{{ layer.id }}</div>
    <div>
      {{ layerSummary }}
    </div>
    <div>
      <button class="copy-button button-defaults" title="copy">
        <font-awesome-icon size="lg" fixed-width icon="copy" />
      </button>
    </div>
    <div>
      <button class="paste-button button-defaults" title="paste">
        <font-awesome-icon size="lg" fixed-width icon="paste" />
      </button>
    </div>
    <div>
      <button class="trash-button button-defaults" title="clear">
        <font-awesome-icon size="lg" fixed-width icon="trash" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'layer',
  props: {
    layer: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      arrowUp: 'arrow-up',
      arrowDown: 'arrow-down'
    };
  },
  computed: {
    layerSummary() {
      return 'layer summary goes here';
    },
    isDownDisabled() {
      return this.layer.id === 0;
    },
    isUpDisabled() {
      return this.layer.id === 15;
    }
  }
};
</script>
<style lang="scss" scoped>
.edited-layer {
  display: grid;
  grid-template: 1fr / 1fr 1fr 1fr 10fr 1fr 1fr 1fr;
  border-radius: 10px;
  border: 2px solid #04e1d1;
  padding: 8px 15px;
  grid-gap: 4px;
  margin-bottom: 4px;
}
.button-defaults {
  border-radius: 4px;
}
.trash-button {
  background: #b33a3a;
  color: #eee;
  border-color: #a32a2a;
}
.paste-button {
  background: #fca307;
  border-color: #dc9307;
  color: #eee;
}
.copy-button,
.up-button,
.down-button {
  background: #a1d078;
  border-color: #91c068;
  color: #eee;
}
</style>
