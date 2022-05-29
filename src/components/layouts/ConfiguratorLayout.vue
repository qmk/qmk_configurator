<template>
  <div class="">
    <div>
      <slot name="topbar" />
    </div>
    <main class=""><slot name="application" /></main>
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
