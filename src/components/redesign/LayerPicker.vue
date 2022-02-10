<template>
  <div class="grid" :class="$style.gridLayout">
    <div class="mt-16px m-auto font-bold" :class="[$style.header]">LAYER</div>
    <div
      class="flex flex-col-reverse w-44px"
      :class="[$style.layersCommon, $style.layerLeft]"
    >
      <div
        v-for="layer in leftColumn"
        :key="layer"
        :class="{
          [$style.layerButton]: true,
          [$style.layerButtonLeft]: true,
          [$style.selectedLayer]: selectedLayer === layer,
          [$style.activeLayer]: activeMap[layer]
        }"
      >
        {{ layer }}
      </div>
    </div>

    <div
      class="flex flex-col-reverse w-44px"
      :class="[$style.layerCommon, $style.layerRight]"
    >
      <div
        v-for="layer in rightColumn"
        :key="layer"
        :class="{
          [$style.layerButton]: true,
          [$style.layerButtonRight]: true,
          [$style.selectedLayer]: selectedLayer === layer,
          [$style.activeLayer]: activeMap[layer]
        }"
      >
        {{ layer }}
      </div>
    </div>
    <div class="m-16px" :class="[$style.controls]">
      <feather type="trash-2"></feather>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  props: {
    activeLayers: {
      type: Array,
      default: () => []
    },
    selectedLayer: {
      type: Number,
      default: 1
    }
  },
  emits: ['selectedLayerChanged'],
  data() {
    return {};
  },
  setup(props) {
    const activeMap = ref(
      props.activeLayers.reduce((acc, layer) => {
        acc[layer] = true;
        return acc;
      }, {})
    );
    const rightColumn = [9, 10, 11, 12, 13, 14, 15, 16];
    const leftColumn = [1, 2, 3, 4, 5, 6, 7, 8];
    return {
      leftColumn,
      rightColumn,
      activeMap
    };
  }
});
</script>
<style module>
.gridLayout {
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
.layerCommon {
  font-family: Iosevka;
  font-weight: normal;
  font-weight: 400;
}
.layerLeft {
  grid-area: layerLeft;
}
.layerRight {
  grid-area: layerRight;
}
.controls {
  grid-area: controls;
}

.layerButton {
  @apply rounded-full h-28px w-28px min-h-28px max-h-28px min-w-28px min-w-28px;
  @apply text-lg;
  @apply hover:bg-white-700 hover:text-grey-200;
  @apply active:bg-grey-300 hover:text-white-800;
  @apply cursor-pointer;
}
.layerButtonLeft {
  @apply ml-10px mr-7px mt-5px mb-5px;
}
.layerButtonRight {
  @apply mr-10px ml-7px mt-5px mb-5px;
}
.activeLayer {
  @apply bg-white-700 text-grey-200;
}

.selectedLayer {
  @apply bg-grey-300 text-white-800;
}
</style>
