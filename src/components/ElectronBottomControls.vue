<template>
  <div>
    <button
      id="fwFile"
      class="fixed-size"
      :title="$t('flashFirmware.title')"
      :disabled="disableDownloadBinary"
      @click="autoFlashFirmware"
    >
      <font-awesome-icon icon="download" size="lg" fixed-width />
      {{ $t('flashFirmware.label') }}
    </button>
    <button
      id="fwFile"
      class="fixed-size"
      :title="$t('flashFile.title')"
      :disabled="disableFlashFile"
      @click="flashFirmware"
    >
      <font-awesome-icon icon="download" size="lg" fixed-width />
      {{ $t('flashFile.label') }}
    </button>
  </div>
</template>
<script>
import first from 'lodash/first';
import isUndefined from 'lodash/isUndefined';
import { mapState } from 'vuex';

export default {
  name: 'ElectronBottomControls',
  props: {
    disableDownloadBinary: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  computed: {
    ...mapState('app', ['keyboard', 'firmwareBinaryURL', 'firmwareFile']),
    disableFlashFile() {
      return !window.Bridge.enableFlashing;
    },
    disableFlashSource() {
      return (
        !window.Bridge.enableFlashing ||
        isUndefined(this.firmwareBinaryURL) ||
        this.firmwareBinaryURL === ''
      );
    }
  },
  methods: {
    flashFirmware() {
      window.Bridge.autoFlash = false;
      window.Bridge.flashFile();
    },
    autoFlashFirmware() {
      window.Bridge.autoFlash = true;
      window.Bridge.flashURL(
        first(this.firmwareBinaryURL),
        this.keyboard,
        this.firmwareFile
      );
    }
  }
};
</script>
