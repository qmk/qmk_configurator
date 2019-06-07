<template>
  <div id="controller-bottom" class="botctrl">
    <Veil :isVisible="isVeilOpened">
      <template #contents>
        <div class="input-url-modal">
          <div>
            <label for="url-import-field">Url:</label>
            <input
              ref="urlimport"
              id="url-import-field"
              type="text"
              v-model="urlImport"
            />
          </div>
          <div>
            <button @click="closeVeil">cancel</button>
            <button @click="importUrlkeymap">Load</button>
          </div>
        </div>
      </template>
    </Veil>
    <div class="botctrl-1-1">
      <button
        class="fixed-size"
        id="toolbox"
        :title="$t('message.downloadKeymap.title')"
        @click="downloadKeymap"
        v-bind:disabled="disableDownloadKeymap"
      >
        <font-awesome-icon icon="download" size="lg" fixed-width />
        {{ $t('message.downloadKeymap.label') }}
      </button>
      <button
        class="fixed-size"
        id="source"
        @click="downloadSource"
        :title="$t('message.downloadSource.title')"
        v-bind:disabled="disableDownloadSource"
      >
        <font-awesome-icon icon="download" size="lg" fixed-width />
        {{ $t('message.downloadSource.label') }}
      </button>
      <button
        id="export"
        @click="exportJSON"
        :title="$t('message.downloadJSON.title')"
      >
        <font-awesome-icon icon="download" size="lg" fixed-width />
      </button>
      <span class="label-button">{{ $t('message.downloadJSON.label') }}</span>
      <button
        id="import"
        :title="$t('message.importJSON.title')"
        @click="importKeymap"
      >
        <font-awesome-icon icon="upload" size="lg" fixed-width />
      </button>
      <button
        id="import-url"
        :title="$t('message.importUrlJSON.title')"
        @click="openVeil"
      >
        <font-awesome-icon icon="cloud-upload-alt" size="lg" fixed-width />
      </button>
      <button
        id="printkeymaps"
        :title="$t('message.printKeymap.title')"
        @click="printKeymaps"
      >
        <font-awesome-icon icon="print" size="lg" fixed-width />
        <span class="hide-small">{{ $t('message.printKeymap.label') }}</span>
      </button>
      <button
        id="testkeys"
        :title="$t('message.testKeys.title')"
        @click="testKeys"
      >
        <font-awesome-icon icon="keyboard" size="lg" fixed-width />
        <span class="hide-small">{{ $t('message.testKeys.label') }}</span>
      </button>
      <input
        id="fileImport"
        type="file"
        ref="fileImportElement"
        accept="application/json"
        @change="fileImportChanged"
      />
      <input
        id="infoPreview"
        type="file"
        accept="application/json"
        ref="infoPreviewElement"
        @change="infoPreviewChanged"
      />
    </div>
    <div class="botctrl-1-2">
      <button
        id="fwFile"
        @click="downloadFirmware"
        :title="$t('message.downloadFirmware.title')"
        v-bind:disabled="disableDownloadBinary"
      >
        <font-awesome-icon icon="download" size="lg" fixed-width />
        {{ $t('message.downloadFirmware.label') }}
      </button>
    </div>
    <div v-if="downloadElementEnabled">
      <a
        ref="downloadElement"
        v-bind:href="urlEncodedData"
        v-bind:download="filename"
      />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations, mapState, mapGetters } = createNamespacedHelpers('app');
import first from 'lodash/first';
import isUndefined from 'lodash/isUndefined';
import escape from 'lodash/escape';
const encoding = 'data:text/plain;charset=utf-8,';
import { clearKeymapTemplate } from '@/common.js';
import { PREVIEW_LABEL } from '@/store/modules/constants';
import {
  load_converted_keymap,
  disableCompileButton,
  disableOtherButtons,
  getPreferredLayout
} from '@/jquery';
export default {
  name: 'bottom-controller',
  computed: {
    ...mapState([
      'keyboard',
      'layout',
      'previewRequested',
      'enableDownloads',
      'firmwareBinaryURL',
      'firmwareSourceURL',
      'keymapSourceURL',
      'author',
      'notes'
    ]),
    ...mapGetters(['exportKeymapName']),
    disableDownloadKeymap() {
      return !this.enableDownloads && this.keymapSourceURL !== '';
    },
    disableDownloadSource() {
      return !this.enableDownloads && this.firmwareSourceURL !== '';
    },
    disableDownloadBinary() {
      return (
        !this.enableDownloads ||
        isUndefined(this.firmwareBinaryURL) ||
        this.firmwareBinaryURL === ''
      );
    }
  },
  watch: {
    /**
     * isPreview.
     * When isPreview changes we click the infoPreview element.
     * @param {Bool} newValue isPreview has changed
     * @return {null} nothing
     */
    previewRequested(newValue) {
      if (newValue) {
        this.$refs.infoPreviewElement.click();
        window.setTimeout(() => this.dismissPreview());
      }
    }
  },
  methods: {
    ...mapMutations(['dismissPreview', 'stopListening', 'startListening']),
    importUrlkeymap: function() {
      const url = this.urlImport;
      axios
        .get(url)
        .then(r => {
          this.reader = new FileReader();
          this.reader.onload = this.importJSONOnLoad;
          const b = new Blob([JSON.stringify(r.data)], {
            type: 'application/json'
          });
          this.reader.readAsText(b);
        })
        .catch(() => {
          alert('Seems like there is an issue trying to get the file');
        });
      this.closeVeil();
    },
    openVeil: function() {
      this.isVeilOpened = true;
      this.stopListening();
      Vue.nextTick(() => {
        this.$refs.urlimport.focus();
      });
    },
    closeVeil: function() {
      this.startListening();
      this.urlImport = '';
      this.isVeilOpened = false;
    },
    exportJSON() {
      //Squashes the keymaps to the api payload format, might look into making this a function
      let layers = this.$store.getters['keymap/exportLayers']({
        compiler: false
      });

      //API payload format
      let data = {
        keyboard: this.keyboard,
        keymap: this.exportKeymapName,
        layout: this.layout,
        layers: layers,
        author: this.author,
        notes: this.notes
      };

      this.download(
        `${this.$store.getters['app/exportKeymapName']}.json`,
        JSON.stringify(data)
      );
    },
    download(filename, data) {
      this.urlEncodedData = encoding + encodeURIComponent(data);
      this.filename = filename;
      this.downloadElementEnabled = true;
      Vue.nextTick(() => {
        this.$refs.downloadElement.click();
        this.downloadElementEnabled = false;
      });
    },
    downloadFirmware() {
      this.urlEncodedData = first(this.firmwareBinaryURL);
      this.filename = this.$store.getters['app/firmwareFile'];
      this.downloadElementEnabled = true;
      Vue.nextTick(() => {
        this.$refs.downloadElement.click();
        this.downloadElementEnabled = false;
      });
    },
    downloadSource() {
      this.urlEncodedData = first(this.firmwareSourceURL);
      this.filename = 'source.zip';
      this.downloadElementEnabled = true;
      Vue.nextTick(() => {
        this.$refs.downloadElement.click();
        this.downloadElementEnabled = false;
      });
    },
    downloadKeymap() {
      this.urlEncodedData = first(this.keymapSourceURL);
      this.filename = 'source.zip';
      this.downloadElementEnabled = true;
      Vue.nextTick(() => {
        this.$refs.downloadElement.click();
        this.downloadElementEnabled = false;
      });
    },
    importKeymap() {
      if (this.$store.getters['keymap/isDirty']) {
        if (
          !confirm(
            clearKeymapTemplate({ action: 'change keyboard and layout' })
          )
        ) {
          return false;
        }
      }
      this.$refs.fileImportElement.click();
    },
    fileImportChanged() {
      var files = this.$refs.fileImportElement.files;
      this.reader = new FileReader();
      this.reader.onload = this.importJSONOnLoad;
      this.reader.readAsText(first(files));
      this.$refs.fileImportElement.value = ''; // clear value for chrome issue #83
    },
    importJSONOnLoad() {
      let jsonText = this.reader.result;

      let data;
      try {
        data = JSON.parse(jsonText);
      } catch (error) {
        console.log(error);
        alert(this.$t('message.errors.invalidQMKKeymap'));
        return;
      }

      if (data.version && data.keyboard && data.keyboard.settings) {
        alert(this.$t('message.errors.kbfirmwareJSONUnsupported'));
        return;
      }

      if (
        isUndefined(data.keyboard) ||
        isUndefined(data.keymap) ||
        isUndefined(data.layout) ||
        isUndefined(data.layers)
      ) {
        alert(this.$t('message.errors.unknownJSON'));
        return;
      }

      /* TODO Add check for keyboard name and layout */

      if (!isUndefined(data.author)) {
        const { author, notes } = data;
        this.$store.commit('app/setAuthor', escape(author));
        this.$store.commit('app/setNotes', escape(notes));
      }
      this.$store.commit('app/setKeyboard', data.keyboard);
      this.$store.dispatch('app/changeKeyboard', this.keyboard).then(() => {
        this.$store.commit('app/setLayout', data.layout);
        // todo validate these values
        this.$router.replace({
          path: `/${data.keyboard}/${data.layout}`
        });

        var store = this.$store;
        let promise = new Promise(resolve =>
          store.commit('keymap/setLoadingKeymapPromise', resolve)
        );
        promise.then(() => {
          const stats = load_converted_keymap(data.layers);
          const msg = this.$t('message.statsTemplate', stats);
          store.commit('status/deferredMessage', msg);
          store.dispatch('status/viewReadme', this.keyboard).then(() => {
            store.commit('app/setKeymapName', data.keymap);
            store.commit('keymap/setDirty');
          });
        });
        disableOtherButtons();
      });
    },
    infoPreviewChanged() {
      var files = this.$refs.infoPreviewElement.files;
      if (files.length === 0) {
        return;
      }
      this.$store.commit('app/enablePreview');
      disableCompileButton();
      this.reader = new FileReader();
      this.reader.onload = this.previewInfoOnLoad;
      this.reader.readAsText(first(files));
      this.$refs.infoPreviewElement.value = ''; // clear value for chrome issue #83
    },
    previewInfoOnLoad() {
      var jsonText = this.reader.result;
      var data;
      try {
        data = JSON.parse(jsonText);
      } catch (error) {
        console.log(error);
        alert("Sorry, that doesn't appear to be a valid QMK info file.");
        return;
      }

      this.$store.commit('app/setKeyboard', PREVIEW_LABEL);
      /*
       * Preview Mode State hack
       * When we load a info.json preview we are bypassing the normal XHR request to the backend for
       * layouts and supplying an in memory data structure.
       * Due to a quirk in how the keymap is rendered we use a change in layout to detect changes in Visual
       * Keymap and reset the keymap there.
       * This does not always work if the layout we are transitioning too has the same name as the current layout.
       * To work around this we have to set the layout to something else temporarily to force a re-render.
       *
       * The preview code works around this problem by creating a fake keyboard layout called '  ',
       * and temporarily sets the keyboard to this value. Then it waits until the next scheduler tick and sets
       * the value to the correct one. Info.json preview mode was always a hack and needs some redesign.
       *
       * TODO come up with a better way of resetting keymap than depending on visual keymap change detection
       */
      const store = this.$store;
      this.$store.dispatch('app/loadLayouts', data).then(() => {
        // This is a special hack to get around change detection
        this.$store.commit('app/setLayout', '  ');
        Vue.nextTick(() => {
          const layout = getPreferredLayout(store.state.app.layouts);
          store.commit('keymap/clear');
          store.commit('app/setLayout', layout);
          // clear the keymap data is now responsibility of code that changes layout
          store.commit('keymap/clear');
          store.commit('app/setKeymapName', 'info.json preview');
          store.commit('status/clear');
          store.commit(
            'status/append',
            [
              'Preview info.json mode\n',
              'For Developers only, working on new keyboards.\n',
              '\tctrl, alt, u - see key sizes',
              '\tctrl, alt, n - cycle colorways',
              '\tlayout drop down to preview layouts'
            ].join('\n')
          );
        });
      });
    },
    printKeymaps() {
      this.$router.push('/print');
    },
    testKeys() {
      this.$router.push('/test');
    }
  },
  data: () => {
    return {
      isVeilOpened: false,
      downloadElementEnabled: false,
      urlEncodedData: '',
      filename: '',
      urlImport: '',
      reader: undefined
    };
  }
};
</script>
<style scoped>
.input-url-modal {
  background-color: #eee;
  border-color: #ccc;
  border-radius: 5px;
  width: 400px;
  min-height: 400px;
}
.fixed-size {
  min-width: 150px;
}
#export {
  border-radius: 4px 0 0 4px;
  margin-right: 1px;
}
#import,
#import-url {
  border-radius: 0 4px 4px 0;
}
.label-button {
  line-height: 155%;
  vertical-align: middle;
  display: inline-block;
  margin: -3px 1px 0 0;
  font-size: 14px;
  font-weight: bold;
  background-color: #49ad4c;
  color: white;
  height: 19px;
  border: 0px solid #000;
  padding: 6px 12px 6px;
  text-transform: uppercase;
}
.hide-small {
}
@media (max-width: 90rem) {
  .hide-small {
    display: none;
  }
}
</style>
