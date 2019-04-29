<template>
  <div>
    <h3>Printable View</h3>
    <button @click="gohome">Configurator</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'printerator',
  computed: {
    ...mapState('app', ['keyboard', 'layout'])
  },
  components: {},
  methods: {
    gohome() {
      this.$router.push(`/${this.keyboard}/${this.layout}`);
    }
  }
};
</script>
<style></style>
