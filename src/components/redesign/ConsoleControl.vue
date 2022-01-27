<template>
  <div class="rounded-lg bg-cool-gray-50 text-black h-48px relative">
    <div class="absolute left-3 top-2">
      <font-awesome-icon icon="book-open" size="lg" fixed-width />
    </div>
    <div class="absolute right-3 top-2">
      <font-awesome-icon icon="expand-alt" size="lg" fixed-width />
    </div>
    <h4 class="font-bold mt-2">Console</h4>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'console-control',
  setup() {}
});
</script>
