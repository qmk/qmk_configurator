<template>
  <info-bar-layout>
    <template #branding>QMK Configurator</template>
    <template #service>Service ready</template>
    <template #help>
      <font-awesome-icon icon="question-circle" size="lg" />
    </template>
    <template #settings>
      <font-awesome-icon icon="cog" size="lg" />
    </template>
  </info-bar-layout>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import InfoBarLayout from '@/components/layouts/InfoBarLayout.vue';

export default defineComponent({
  components: { InfoBarLayout },
  name: 'info-bar',
  setup() {}
});
</script>
