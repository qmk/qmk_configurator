<!--
  use component is syntax to avoid inline block space issues
  @see https://css-tricks.com/fighting-the-space-between-inline-block-elements/
-->
<template>
  <div id="keycodes">
    <template v-for="(key, index) in keycodes">
      <component v-bind:is="getComponent(key.code)" v-bind="key" :key="index" />
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import isUndefined from 'lodash/isUndefined';
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
  methods: {
    getComponent(code) {
      return isUndefined(code) ? Space : Keycode;
    }
  }
};
</script>
<style>
.keycodes {
  display: grid;
  grid-template: repeat(auto-fill, 3px) / repeat(auto-fill, 3px);
}
</style>
