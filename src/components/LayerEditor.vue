<template>
  <div>
    <layer :key="layer.id" v-for="layer in layers">{{ layer.id }}</layer>
  </div>
</template>
<script>
import Layer from 'Layer';
export default {
  name: 'layer-editor',
  components: {
    Layer
  },
  props: {
    layers: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style lang="scss" scoped></style>
