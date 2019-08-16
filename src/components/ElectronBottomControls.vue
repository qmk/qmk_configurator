<template>
  <div>
    <button
      class="fixed-size"
      id="fwFile"
      @click="autoFlashFirmware"
      :title="$t('message.flashFirmware.title')"
      :disabled="disableDownloadBinary"
    >
      <font-awesome-icon icon="download" size="lg" fixed-width />
      {{ $t('message.flashFirmware.label') }}
    </button>
    <button
      class="fixed-size"
      id="fwFile"
      @click="flashFirmware"
      :title="$t('message.flashFile.title')"
      :disabled="disableFlashFile"
    >
      <font-awesome-icon icon="download" size="lg" fixed-width />
      {{ $t('message.flashFile.label') }}
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
