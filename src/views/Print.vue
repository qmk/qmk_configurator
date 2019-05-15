<template>
  <div class="print-layout">
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
          <td><input type="text" placeholder="Optionally Your Name" /></td>
        </tr>
        <tr @click="toggleDate">
          <th>Last Generated</th>
          <td>{{ today }}</td>
        </tr>
        <tr>
          <th>Source Code</th>
          <td>
            <a :href="firmwareURL" target="_blank">{{ firmwareURL }}</a>
          </td>
        </tr>
        <tr>
          <th>Notes</th>
          <td>
            <textarea
              cols="80"
              rows="5"
              placeholder="Notes about this configuration"
            />
          </td>
        </tr>
      </table>
    </div>
    <button @click="gohome">Configurator</button>
    <div>
      <template v-for="idx in activeLayers">
        <div class="layer-output" :key="idx">
          <h3>Layer {{ idx }}</h3>
          <PrintKeymap :layer="idx"></PrintKeymap>
        </div>
      </template>
    </div>
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
      const date = new Date(Date.now());
      if (this.dateToggle) {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      }
      return `${date.toISOString()}`;
    },
    firmwareURL() {
      const keeb = this.keyboard.split('/');
      return `https://github.com/qmk/qmk_firmware/tree/master/keyboards/${
        keeb[0]
      }`;
    }
  },
  components: { PrintKeymap },
  mounted() {
    console.log('Active layers', this.activeLayers);
  },
  methods: {
    gohome() {
      this.$router.push(`/${this.keyboard}/${this.layout}`);
    },
    toggleDate() {
      this.dateToggle = !this.dateToggle;
    }
  },
  data() {
    return {
      dateToggle: true
    };
  }
};
</script>
<style>
.print-layout {
  display: grid;
  justify-items: center;
  grid-template: repeat(auto-fill, 1fr) / 1fr;
}
.meta-info {
  max-width: 800px;
}
.layer-output {
  page-break-inside: avoid;
}
</style>
