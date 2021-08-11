<template>
  <div class="edited-layer">
    <div>
      <button :disabled="isUpDisabled">
        <font-awesome-icon size="lg" fixed-width :icon="arrowUp" />
      </button>
    </div>
    <div>
      <button :disabled="isDownDisabled">
        <font-awesome-icon size="lg" fixed-width :icon="arrowDown" />
      </button>
    </div>
    <div>{{ layer.id }}</div>
    <div>
      {{ layerSummary }}
    </div>
    <div>
      <button><font-awesome-icon size="lg" fixed-width icon="copy" /></button>
    </div>
    <div>
      <button><font-awesome-icon size="lg" fixed-width icon="paste" /></button>
    </div>
    <div>
      <button><font-awesome-icon size="lg" fixed-width icon="trash" /></button>
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
  border: 2px solid #3939bf;
  padding: 10px 15px;
}
.margin-right-1 {
  margin-right: 5px;
}
</style>
