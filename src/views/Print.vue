<template>
  <div>
    <h3>Printable View</h3>
    <button @click="gohome">Configurator</button>
    <template v-for="idx in activeLayers">
      <h3>Layer {{ idx }}</h3>
      <div :key="idx">
        <PrintKeymap :layer="idx"></PrintKeymap>
      </div>
    </template>
  </div>
</template>

<script>
import PrintKeymap from '@/components/PrintKeymap';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'printerator',
  computed: {
    ...mapState('app', ['keyboard', 'layout', 'layouts']),
    ...mapGetters('keymap', ['activeLayers'])
  },
  components: { PrintKeymap },
  mounted() {
    console.log('Active layers', this.activeLayers);
  },
  methods: {
    gohome() {
      this.$router.push(`/${this.keyboard}/${this.layout}`);
    }
  }
};
</script>
<style></style>
