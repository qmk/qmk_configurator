<template>
  <div class="layer-editor-panel">
    <h2>{{ $t('layerEditorPanel.header') }}</h2>
    <p style="text-align: justify;">
      {{ $t('layerEditorPanel.helpText') }}
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
