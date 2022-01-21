<template>
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
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {}
});
</script>
