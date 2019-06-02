<template>
  <div class="print-layout">
    <div class="print-controls">
      <button id="leavePrint" @click="gohome">
        <font-awesome-icon icon="chevron-left" size="lg" fixed-width />
        {{ $t('message.back.title') }}
      </button>
      <button id="leavePrint" @click="print()">
        <font-awesome-icon icon="print" size="lg" fixed-width />
        {{ $t('message.print.title') }}
      </button>
    </div>
    <div class="meta-info">
      <table>
        <tr>
          <th>{{ $t('message.keyboard.label') }}</th>
          <td>{{ keyboard }}</td>
        </tr>
        <tr>
          <th>{{ $t('message.layout.label') }}</th>
          <td>{{ layout }}</td>
        </tr>
        <tr>
          <th>{{ $t('message.author.title') }}</th>
          <td>
            <input
              type="text"
              v-model="_author"
              :placeholder="$t('message.author.placeholder')"
            />
          </td>
        </tr>
        <tr @click="toggleDate">
          <th>{{ $t('message.date.title') }}</th>
          <td>{{ today }}</td>
        </tr>
        <tr>
          <th>{{ $t('message.source.title') }}</th>
          <td>
            <a :href="firmwareURL" target="_blank">{{ firmwareURL }}</a>
          </td>
        </tr>
        <tr>
          <th>{{ $t('message.notes.title') }}</th>
          <td>
            <textarea
              v-model="_notes"
              class="optional-notes"
              cols="80"
              rows="3"
              :placeholder="$t('message.notes.placeholder')"
            />
          </td>
        </tr>
      </table>
    </div>
    <div>
      <template v-for="idx in activeLayers">
        <div class="layer-output" :class="firefoxOnly(idx)" :key="idx">
          <h3 class="layer-output-title">
            {{ $t('message.layer.label') }} {{ idx }}
          </h3>
          <PrintKeymap :layer="idx"></PrintKeymap>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import PrintKeymap from '@/components/PrintKeymap';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'printerator',
  computed: {
    ...mapState('app', ['keyboard', 'layout', 'layouts', 'author', 'notes']),
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
    },
    _author: {
      set(value) {
        this.$store.commit('app/setAuthor', value);
      },
      get() {
        return this.author;
      }
    },
    _notes: {
      set(value) {
        this.$store.commit('app/setNotes', value);
      },
      get() {
        return this.notes;
      }
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
    },
    print() {
      if (this._notes === '') {
        this._notes = this.$t('message.layer.empty');
      }
      if (this._author === '') {
        this._author = this.$t('message.anonymous.label');
      }
      Vue.nextTick(() => {
        window.print();
      });
    },
    firefoxOnly(idx) {
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        if ((idx / 3) % 3 == 0) {
          return 'layout-output-firefox';
        }
      }
      return '';
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
.meta-info th:first-letter {
  text-transform: uppercase;
}
.layer-output {
  page-break-inside: avoid;
}
.layout-output-firefox {
  page-break-before: always;
}
.layer-output-title {
  margin-top: 15px;
}
table > tr > th {
  vertical-align: top;
}
textarea.optional-notes {
  font-family: 'Roboto Mono', Monaco, Bitstream Vera Sans Mono, Lucida Console,
    Terminal, Consolas, Liberation Mono, DejaVu Sans Mono, Courier New,
    monospace;
  font-size: 12pt;
}
.print-controls {
  padding-bottom: 20px;
}
</style>
