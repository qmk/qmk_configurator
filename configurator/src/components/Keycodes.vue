<template>
  <div id="keycodes">
    <template v-for="(key, index) in keycodes">
      <keycode v-if="key.code" v-bind="key" :key="index" />
      <space v-if="!key.code" v-bind="key" :key="index" />
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Keycode from '@/components/Keycode';
import Space from '@/components/Space';

export default {
  name: 'keycodes',
  components: { Keycode, Space },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters('keycodes', ['keycodes'])
  },
  methods: {}
};
</script>
<style>
.keycodes {
  display: grid;
  grid-template: repeat(auto-fill, 3px) / repeat(auto-fill, 3px);
}
</style>
