<template>
  <div>
    <h3>Layers</h3>
    <div class="meta-info">
      <table>
        <tr>
          <th>Keyboard</th>
          <td>{{ keyboard }}</td>
        </tr>
        <tr>
          <th>Layout</th>
          <td>{{ layout }}</td>
        </tr>
        <tr>
          <th>Author</th>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th>Last Generated</th>
          <td>{{ today }}</td>
        </tr>
      </table>
    </div>
    <button @click="gohome">Configurator</button>
    <template v-for="idx in activeLayers">
      <div :key="idx">
        <h3>Layer {{ idx }}</h3>
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
    ...mapGetters('keymap', ['activeLayers']),
    today() {
      return new Date(Date.now()).toISOString();
    }
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
<style>
.meta-info {
  max-width: 500px;
}
</style>
