<template>
  <div>
    <div class="main">
      <Main />
    </div>
    <div>
      <keycodes />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main.vue';
import Keycodes from '@/components/Keycodes.vue';

export default {
  name: 'configurator',
  components: {
    Main,
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
