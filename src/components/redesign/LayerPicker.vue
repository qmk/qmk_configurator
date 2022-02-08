<template>
  <div class="grid grid-layout">
    <div class="header mt-16px m-auto font-bold">LAYER</div>
    <div class="layer-left flex flex-col-reverse">
      <div v-for="layer in leftColumn" :key="layer" class="layer-button">
        {{ layer }}
      </div>
    </div>
    <div class="layer-right flex flex-col-reverse">
      <div v-for="layer in rightColumn" :key="layer" class="layer-button">
        {{ layer }}
      </div>
    </div>
    <div class="controls m-16px"><feather type="trash-2"></feather></div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  data() {
    return {};
  },
  setup() {
    const rightColumn = [9, 10, 11, 12, 13, 14, 15, 16];
    const leftColumn = [1, 2, 3, 4, 5, 6, 7, 8];
    return {
      leftColumn,
      rightColumn
    };
  }
});
</script>
<style scoped>
.grid-layout {
  grid-template:
    'head head'
    'layerLeft layerRight'
    'controls controls';
  grid-template-rows: 42px 1fr 100px;
  grid-template-columns: 1fr 1fr;
}
.header {
  grid-area: head;
}
.layer-left {
  grid-area: layerLeft;
}
.layer-right {
  grid-area: layerRight;
}
.controls {
  grid-area: controls;
}

.layer-button {
  @apply min-h-28px max-h-28px min-w-28px min-w-28px m-5px;
  @apply text-lg;
}
</style>
