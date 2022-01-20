<template>
  <div class="rounded-lg bg-white-app text-black pr-4 pl-4 min-h-max pt-2 pb-2">
    <div class="m-2">
      <slot name="infobar" />
    </div>
    <div class="gap-0"><slot name="application" /></div>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {}
});
</script>
