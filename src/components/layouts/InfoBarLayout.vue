<template>
  <div class="grid grid-cols-2">
    <div class="flex flex-row items-center p-0 text-left">
      <slot name="branding" />
    </div>
    <div><slot name="statusbar" /></div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'info-bar-layout',
  setup() {}
});
</script>
