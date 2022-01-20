<template>
  <div class="grid grid-cols-infobar">
    <div class="text-left"><slot name="branding" /></div>
    <div class=""><slot name="service" /></div>
    <div class=""><slot name="help" /></div>
    <div class=""><slot name="settings" /></div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'info-bar-layout',
  setup() {}
});
</script>
