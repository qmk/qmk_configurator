<template>
  <div id="browser-warn" v-show="isNotSupported && !isDimissed">
    <a class="dismiss" title="dismiss" v-on:click="dismiss">X</a>
    {{ $t('message.errors.unsupportedBrowser') }}
    <a href="https://www.google.com/intl/en_us/chrome/" target="_blank"
      >Google Chrome</a
    >
    /
    <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank"
      >Mozilla Firefox</a
    >
  </div>
</template>

<script>
export default {
  name: 'browser-warn-bar',
  data() {
    return { isDimissed: false };
  },
  methods: {
    dismiss() {
      this.isDimissed = true;
    }
  },
  computed: {
    isNotSupported() {
      const isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);
      const isFirefox = typeof InstallTrigger !== 'undefined';
      return !(isChrome || isFirefox);
    }
  }
};
</script>

<style>
#browser-warn {
  padding: 0 5px;
  z-index: 3001;
  position: fixed;
  top: 20px;
  left: 0;
  background: #d00;
  color: #e0e0e0;
  width: 100%;
}
#browser-warn a {
  color: #e0e0e0;
  font-weight: bold;
}
a.dismiss {
  cursor: pointer;
}
</style>
