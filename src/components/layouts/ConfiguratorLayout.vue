<template>
  <div class="grid grid-cols-12 grid-rows-configurator gap-4">
    <div class="col-span-4">
      <slot name="controlpanel"> CONTROL PANEL </slot>
    </div>
    <div class="col-span-7">
      <slot name="keyboardlayout"> KEYBOARD LAYOUT </slot>
    </div>
    <div class="col-span-1">
      <slot name="layerpicker">Layer Picker</slot>
    </div>
    <div class="col-span-4">
      <slot name="about">ABOUT</slot>
    </div>
    <div class="col-span-8">
      <slot name="keycodes">KEYCODES</slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {}
});
</script>
