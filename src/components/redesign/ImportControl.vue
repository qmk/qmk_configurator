<template>
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
    <button
      class="
        btn
        bg-upload-active
        text-white
        hover:bg-upload-focus hover:text-upload-active
        active:text-black active:bg-upload-active
      "
    >
      Upload .JSON
    </button>
    <button
      class="
        btn
        bg-upload-active
        text-white
        hover:bg-upload-focus hover:text-upload-active
        active:text-black active:bg-upload-active
      "
    >
      Import URL
    </button>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {}
});
</script>
