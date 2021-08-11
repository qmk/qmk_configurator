<template>
  <div class="layer-editor-panel">
    <h2>Layer Editor</h2>
    <p style="text-align: justify;">
      Edit layers by moving them up and down or copy and pasting them. Delete
      sets it to default key value. Caveats, empty layers take up more precious
      flash, so try not to leave empty intermediate layers. If a key isn't set
      to KC_TRNS it will not drop through to next layer. Layer 0 is the base
      layer. Layer 15 is the highest layer configurator supports.
    </p>
    <LayerEditor :layers="layers"></LayerEditor>
  </div>
</template>
<script>
import LayerEditor from './LayerEditor';
export default {
  name: 'layer-editor-panel',
  components: {
    LayerEditor
  },
  data() {
    return {
      layers: [{ id: '1' }, { id: '0' }]
    };
  }
};
</script>
<style lang="scss" scoped>
.layer-editor-panel {
  margin: 20px;
  margin-top: 50px;
}
</style>
