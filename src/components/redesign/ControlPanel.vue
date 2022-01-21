<template>
  <div class="h-full w-full">
    <div class="flex flex-col w-full gap-2">
      <import-control />
      <export-control />
      <potato-facts />
      <compile-control />
      <extra-links />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import ImportControl from '@/components/redesign/ImportControl.vue';
import ExportControl from '@/components/redesign/ExportControl.vue';
import PotatoFacts from '@/components/redesign/PotatoFacts.vue';
import ExtraLinks from '@/components/redesign/ExtraLinks.vue';
import CompileControl from '@/components/redesign/CompileControl.vue';

export default defineComponent({
  components: {
    ImportControl,
    ExportControl,
    PotatoFacts,
    ExtraLinks,
    CompileControl
  },
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
