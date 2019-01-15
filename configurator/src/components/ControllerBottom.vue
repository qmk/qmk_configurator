<template>
  <div id="controller-bottom" class="botctrl">
    <div class="botctrl-1-1">
      <button
        class="fixed-size"
        id="toolbox"
        title="Load firmware file in QMK Toolbox"
        v-bind:disabled="disableDownloads"
      >
        <font-awesome-icon icon="download" size="lg" fixed-width /> Keymap Only
      </button>
      <button
        class="fixed-size"
        id="source"
        @click="downloadSource"
        title="Download QMK Firmware code"
        v-bind:disabled="disableDownloads"
      >
        <font-awesome-icon icon="download" size="lg" fixed-width /> Full Source
      </button>
      <button
        id="export"
        @click="exportJSON"
        title="Export QMK Keymap JSON file"
      >
        <font-awesome-icon icon="download" size="lg" fixed-width />
      </button>
      <span class="label-button">Keymap.JSON</span>
      <button
        id="import"
        title="Import QMK Keymap JSON file"
        @click="importKeymap"
      >
        <font-awesome-icon icon="upload" size="lg" fixed-width />
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
        <font-awesome-icon icon="download" size="lg" fixed-width /> Firmware
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
import isUndefined from 'lodash/isUndefined';
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

      /* TODO Add check for keyboard name and layout */

      this.$store.commit('app/setKeyboard', data.keyboard);
      this.$store
        .dispatch('app/changeKeyboard', this.$store.getters['app/keyboard'])
        .then(() => {
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
            load_converted_keymap(data.layers);
            store.commit('app/setKeymapName', data.keymap);
          });
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
<style scoped>
.fixed-size {
  min-width: 150px;
}
#export {
  border-radius: 4px 0 0 4px;
  margin-right: 1px;
}
#import {
  border-radius: 0 4px 4px 0;
}
.label-button {
  line-height: 155%;
  vertical-align: middle;
  display: inline-block;
  margin: -3px 1px 0 0;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: bold;
  background-color: #49ad4c;
  color: white;
  height: 19px;
  border: 0px solid #000;
  padding: 6px 12px 6px;
  text-transform: uppercase;
}
</style>
