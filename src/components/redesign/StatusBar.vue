<template>
  <status-bar-layout>
    <template #service>Service ready</template>
    <template #help>
      <font-awesome-icon icon="question-circle" size="lg" />
    </template>
    <template #settings>
      <font-awesome-icon icon="cog" size="lg" />
    </template>
  </status-bar-layout>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import StatusBarLayout from '@/components/layouts/StatusBarLayout.vue';
export default defineComponent({
  components: { StatusBarLayout },
  setup() {}
});
</script>
