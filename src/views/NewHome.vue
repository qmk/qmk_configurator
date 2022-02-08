<template>
  <default-layout>
    <template #infobar><info-bar /></template>
    <template #application>
      <configurator-layout>
        <template #controlpanel>
          <control-panel />
        </template>
        <template #keyboardlayout
          ><div class="rounded-lg bg-white-panel h-100"></div
        ></template>
        <template #layerpicker>
          <div class="rounded-lg bg-white-panel h-100">
            <layer-picker></layer-picker>
          </div>
        </template>
        <template #about
          ><div class="relative h-100 w-100">
            <div class="absolute bottom-0 left-0 text-black text-left">
              This project is maintained by QMK Collaborators and contributors
              like you!<br />&nbsp;<br />Hosted on GitHub Pages<br />&nbsp;<br />Version:
              dev
            </div>
          </div></template
        >
        <template #keycodes>
          <div class="rounded-lg bg-white-panel h-full w-full"></div>
        </template>
      </configurator-layout>
    </template>
    <template #footer>Footer Here</template>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import InfoBar from '@/components/redesign/InfoBar.vue';
import ConfiguratorLayout from '@/components/layouts/ConfiguratorLayout.vue';
import ControlPanel from '@/components/redesign/ControlPanel.vue';
import LayerPicker from '../components/redesign/LayerPicker.vue';
export default {
  name: 'configuratorTwo',
  components: {
    DefaultLayout,
    InfoBar,
    ConfiguratorLayout,
    ControlPanel,
    LayerPicker
  },
  methods: {}
};
</script>
<style></style>
