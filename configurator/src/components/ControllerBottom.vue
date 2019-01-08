<template>
  <div id="controller-bottom" class="botctrl">
    <div class="botctrl-1-1">
      <button
        id="toolbox"
        title="Load firmware file in QMK Toolbox"
        v-bind:disabled="disableDownloads"
      >
        Open in QMK Toolbox
      </button>
      <button
        id="source"
        @click="downloadSource"
        title="Download QMK Firmware code"
        v-bind:disabled="disableDownloads"
      >
        Download Source
      </button>
      <button
        id="export"
        @click="exportJSON"
        title="Export QMK Keymap JSON file"
      >
        Export Keymap
      </button>
      <button
        id="import"
        title="Import QMK Keymap JSON file"
        @click="importKeymap"
      >
        Import Keymap
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
        title="Download firmware file for flashing"
        v-bind:disabled="disableDownloads"
      >
        Download Firmware
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
import Vue from 'vue';
import first from 'lodash/first';
import isUndefined from 'lodash/first';
const encoding = 'data:text/plain;charset=utf-8,';
import { clearKeymapTemplate } from '@/common.js';
import { PREVIEW_LABEL } from '@/store/modules/constants';
import {
  reset_keymap,
  load_converted_keymap,
  disableCompileButton,
  disableOtherButtons,
  getPreferredLayout
} from '@/jquery';
export default {
  name: 'bottom-controller',
  computed: {
    disableDownloads() {
      return !this.$store.getters['app/enableDownloads'];
    },
    previewRequested() {
      return this.$store.getters['app/previewRequested'];
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
        window.setTimeout(() => this.$store.commit('app/dismissPreview'));
      }
    }
  },
  methods: {
    exportJSON() {
      //Squashes the keymaps to the api payload format, might look into making this a function
      let layers = this.$store.getters['keymap/exportLayers']({
        compiler: false
      });

      //API payload format
      let data = {
        keyboard: this.$store.getters['app/keyboard'],
        keymap: this.$store.getters['app/exportKeymapName'],
        layout: this.$store.getters['app/layout'],
        layers: layers
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
      this.urlEncodedData = first(this.$store.getters['app/firmwareBinaryURL']);
      this.filename = this.$store.getters['app/firmwareFile'];
      this.downloadElementEnabled = true;
      Vue.nextTick(() => {
        this.$refs.downloadElement.click();
        this.downloadElementEnabled = false;
      });
    },
    downloadSource() {
      this.urlEncodedData = first(this.$store.getters['app/firmwareSourceURL']);
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
        alert("Sorry, that doesn't appear to be a valid QMK keymap file.");
        return;
      }

      if (data.version && data.keyboard && data.keyboard.settings) {
        alert(
          "Sorry, QMK Configurator doesn't support importing kbfirmware JSON files."
        );
        return;
      }

      if (
        isUndefined(data.keyboard) ||
        isUndefined(data.keymap) ||
        isUndefined(data.layout) ||
        isUndefined(data.layers)
      ) {
        alert("Sorry, this doesn't appear to be a QMK keymap file.");
        return;
      }

      reset_keymap();

      this.$store.commit('app/setKeyboard', data.keyboard);
      this.$store
        .dispatch('app/changeKeyboard', this.$store.getters['app/keyboard'])
        .then(() => {
          this.$store.commit('app/setLayout', data.layout);
          this.$store.commit('app/setKeymapName', data.keymap);
          // todo validate these values
          this.$router.replace({
            path: `/${data.keyboard}/${data.layout}`
          });

          this.$store.commit('status/clear');
          load_converted_keymap(data.layers);

          this.$store.commit('keymap/setDirty');
          disableOtherButtons();
          this.$store.dispatch('status/viewReadme', data.keyboard);
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

      reset_keymap();

      this.$store.commit('app/setKeyboard', PREVIEW_LABEL);
      this.$store.dispatch('app/loadLayouts', data).then(() => {
        const layout = getPreferredLayout(this.$store.getters['app/layouts']);
        this.$store.commit('app/setLayout', layout);
        this.$store.commit('app/setKeymapName', 'info.json preview');
      });
    }
  },
  data: () => {
    return {
      downloadElementEnabled: false,
      urlEncodedData: '',
      filename: '',
      reader: undefined
    };
  }
};
</script>
