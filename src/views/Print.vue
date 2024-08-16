<template>
  <div class="print-layout">
    <div class="print-controls">
      <button id="leavePrint" class="ui-button" @click="gohome">
        <font-awesome-icon icon="chevron-left" size="lg" fixed-width />
        {{ i18n('back.title') }}
      </button>
      <button id="print" class="ui-button" @click="print()">
        <font-awesome-icon icon="print" size="lg" fixed-width />
        {{ i18n('print.title') }}
      </button>
    </div>
    <div class="meta-info">
      <table>
        <tr>
          <th>{{ i18n('keyboard.label') }}</th>
          <td>{{ keyboard }}</td>
        </tr>
        <tr>
          <th>{{ i18n('layout.label') }}</th>
          <td>{{ layout }}</td>
        </tr>
        <tr>
          <th>{{ i18n('author.title') }}</th>
          <td>
            <input
              type="text"
              v-model="_author"
              :placeholder="i18n('author.placeholder')"
            />
          </td>
        </tr>
        <tr @click="toggleDate">
          <th>{{ i18n('date.title') }}</th>
          <td>{{ today }}</td>
        </tr>
        <tr>
          <th>{{ i18n('source.title') }}</th>
          <td>
            <a :href="firmwareURL" target="_blank" :class="myclasses">{{
              firmwareURL
            }}</a>
          </td>
        </tr>
        <tr>
          <th>{{ i18n('notes.title') }}</th>
          <td>
            <textarea
              v-model="_notes"
              class="optional-notes"
              cols="80"
              rows="3"
              :placeholder="i18n('notes.placeholder')"
            />
          </td>
        </tr>
      </table>
    </div>
    <div>
      <template v-for="index in activeLayers">
        <div class="layer-output" :class="firefoxOnly(index)" :key="index">
          <h3 class="layer-output-title">
            {{ i18n('layer.label') }} {{ index }}
          </h3>
          <PrintKeymap :layer="index"></PrintKeymap>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import PrintKeymap from '@/components/PrintKeymap.vue';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'printerator-component',
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
      return `https://github.com/qmk/qmk_firmware/tree/master/keyboards/${this.keyboard}`;
    },
    myclasses() {
      let classes = [];
      if ((this.keyboard.match(/\//g) || []).length > 0) {
        classes.push(`source-small`);
      }
      return classes.join(' ');
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
    i18n(postfix) {
      return this.$t(`print.${postfix}`);
    },
    gohome() {
      this.$router.push(`/${this.keyboard}/${this.layout}`);
    },
    toggleDate() {
      this.dateToggle = !this.dateToggle;
    },
    print() {
      if (this._notes === '') {
        this._notes = this.$t('print.notes.empty');
      }
      if (this._author === '') {
        this._author = this.$t('print.anonymous.label');
      }
      Vue.nextTick(() => {
        window.print();
      });
    },
    firefoxOnly(index) {
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        if ((index / 3) % 3 == 0) {
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
  font-size: 14px;
  width: 400px;
}
.print-controls {
  padding-bottom: 20px;
}

.source-small {
  font-size: 80%;
}
</style>
