<template>
  <div class="flex flex-row flex-end items-center static justify-end">
    <div class="text-right mr-2"><slot name="service" /></div>
    <div class="m-3 flex-none"><slot name="help" /></div>
    <div class="m-3 flex-none"><slot name="settings" /></div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'status-bar',
  setup() {}
});
</script>
