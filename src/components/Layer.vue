<template>
  <div class="layer">
    <div>{{ layer.id }}</div>
    <div>
      <button>
        <font-awesome-icon size="lg" fixed-width :icon="arrowUp" />
      </button>
    </div>
    <div>
      <button>
        <font-awesome-icon size="lg" fixed-width :icon="arrowDown" />
      </button>
    </div>
    <div>
      <button><font-awesome-icon size="lg" fixed-width :icon="copy" /></button>
    </div>
    <div>
      <button><font-awesome-icon size="lg" fixed-width :icon="paste" /></button>
    </div>
    <div>
      <button><font-awesome-icon size="lg" fixed-width :icon="trash" /></button>
    </div>
    <div>
      {{ layerSummary }}
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
    }
  }
};
</script>
<style lang="scss" scoped>
.layer {
  display: flex;
}
</style>
