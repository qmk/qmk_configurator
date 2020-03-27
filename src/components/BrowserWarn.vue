<template>
  <div id="browser-warn" v-show="isNotSupported && !isDimissed">
    <a class="dismiss" title="dismiss" v-on:click="dismiss">X</a>
    {{ $t('errors.unsupportedBrowser') }}
    <a
      href="https://www.google.com/intl/en_us/chrome/"
      target="_blank"
      rel="noopener"
      >Google Chrome</a
    >
    /
    <a
      href="https://www.mozilla.org/en-US/firefox/new/"
      target="_blank"
      rel="noopener"
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
      const usrAgent = window.navigator.userAgent.toLowerCase();
      const isChrome =
        (usrAgent.indexOf('chrome') !== -1 ||
          usrAgent.indexOf('chromium') !== -1) &&
        usrAgent.indexOf('edge') === -1 &&
        usrAgent.indexOf('opr') === -1;
      const isFirefox = usrAgent.indexOf('firefox') !== -1;
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
