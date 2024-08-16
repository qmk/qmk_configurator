<template>
  <div>
    <div class="main">
      <MainComponent />
    </div>
    <div>
      <keycodes />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainComponent from '@/components/Main.vue';
import Keycodes from '@/components/Keycodes.vue';

export default {
  name: 'configurator-component',
  components: {
    MainComponent,
    Keycodes
  },
  methods: {}
};
</script>
<style>
.keycodes-section {
  margin-top: 30px;
  text-align: left;
}
.keycodes-section label {
  padding-left: 20px;
}
</style>
