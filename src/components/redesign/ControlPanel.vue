<template>
  <div class="h-full w-full">
    <div class="flex flex-col w-full gap-2">
      <div
        class="
          w-full
          h-56px
          p-8px
          flex flex-row
          justify-between
          bg-white-panel
          rounded-lg
        "
      >
        <button class="btn btn-blue">Upload .JSON</button>
        <button class="btn btn-blue-2">Import URL</button>
      </div>
      <div class="w-full flex flex-row p-0 h-40px gap-1 justify-between">
        <button class="btn flex-grow bg-white-panel">KEYMAP.JSON</button>
        <button class="btn flex-grow bg-white-panel">View Raw Data</button>
        <button class="btn bg-white-panel">Print</button>
      </div>
      <div
        class="
          w-full
          h-84px
          border-blue-100
          text-left
          p-8px
          border-2 border-solid
          rounded-lg
        "
      >
        Potato Facts
      </div>
      <div
        class="
          w-full
          flex flex-row
          h-56px
          rounded-lg
          bg-white-panel
          p-8px
          justify-between
        "
      >
        <button class="btn flex-grow">Compile</button>
        <button class="btn flex-grow">Firmware</button>
        <button class="btn flex-grow">Full Source</button>
      </div>
      <div class="rounded-lg w-full flex flex-row gap-1">
        <button class="btn rounded-lg flex-grow bg-white-panel">
          Get QMK Toolbox
        </button>
        <button class="btn rounded-lg flex-grow bg-white-panel">
          Questions?
        </button>
        <button class="btn rounded-lg bg-white-panel">Discord</button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {}
});
</script>
<style>
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue-2 {
  @apply bg-blue-300 text-white;
  @apply text-blue-600;
}
</style>
