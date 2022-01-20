<template>
  <info-bar-layout>
    <template #branding>QMK Configurator</template>
    <template #statusbar><status-bar /></template>
  </info-bar-layout>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import InfoBarLayout from '@/components/layouts/InfoBarLayout.vue';
import StatusBar from '@/components/redesign/StatusBar.vue';

export default defineComponent({
  components: { InfoBarLayout, StatusBar },
  name: 'info-bar',
  setup() {}
});
</script>
