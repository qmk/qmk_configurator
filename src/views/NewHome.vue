<template>
  <configurator-layout class="h-100">
    <template #topbar>New Configurator Goes Here</template>
    <template #application>Application Goes Here</template>
    <template #footer>Footer Here</template>
  </configurator-layout>
</template>

<script>
import ConfiguratorLayout from '@/components/layouts/ConfiguratorLayout.vue';
export default {
  name: 'configuratorTwo',
  components: { ConfiguratorLayout },
  methods: {}
};
</script>
<style></style>
