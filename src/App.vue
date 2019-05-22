<template>
  <div id="app" @click="dismiss">
    <div>
      <header>
        <h1>
          <a href="/"
            ><img
              src="./../assets/qmk_icon_512.png"
              alt="QMK Logo"
              width="48"
              style="vertical-align: middle"
            />QMK Configurator</a
          >
        </h1>
        <p class="random-potato">{{ potatoFact }}</p>
      </header>
      <router-view />
      <spinner :isVisible="showSpinner" :status="spinnerMsg" />
      <InfoBar :msg="message" />
      <div class="openSettings" :class="settingsClasses">
        <button @click="showSettings">
          <font-awesome-icon icon="chevron-left" size="lg" />
          <font-awesome-icon icon="cog" size="lg" />
        </button>
      </div>
    </div>
    <slideout-panel></slideout-panel>
    <footer>
      <p>
        This project is maintained by QMK collaborators and contributors like
        you!
      </p>
      <p>Hosted on GitHub Pages</p>
    </footer>
  </div>
</template>
<script>
import size from 'lodash/size';
import InfoBar from '@/components/InfoBar';
import random from 'lodash/random';
import Spinner from '@/components/spinner';
import SettingsPanel from '@/components/SettingsPanel';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('app');
import isFunction from 'lodash/isFunction';
export default {
  name: 'app',
  components: {
    Spinner,
    InfoBar
  },
  data() {
    return {
      potatoFact: 'QMK for potatoes',
      interval: 120000,
      destroyWatcher: undefined,
      panel: undefined,
      settingsClasses: ''
    };
  },
  watch: {
    $route: function(to) {
      this.settingsClasses = to.name === 'print' ? 'hideSettings' : '';
    }
  },
  mounted() {
    this.randomPotatoFact();
    this.interval = setInterval(() => {
      this.randomPotatoFact();
    }, this.interval);
    this.destroyWatcher = this.$store.watch(
      state => state.app.settingsPanelVisible,
      this.toggleSettingsPanel
    );
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (isFunction(this.destroyWatcher)) {
      this.destroyWatcher();
    }
  },
  computed: {
    ...mapState(['showSpinner', 'spinnerMsg', 'message']),
    showInfoBar() {
      return this.message !== '';
    }
  },
  methods: {
    ...mapMutations(['setShowSpinner', 'setSettingsPanel']),
    randomPotatoFact() {
      const len = size(this.$t('message.potato'));
      this.potatoFact = this.$t('message.potato.' + random(1, len));
    },
    dismiss() {
      this.setShowSpinner(false);
    },
    toggleSettingsPanel(visible) {
      if (visible) {
        this.panel = this.$showPanel({
          component: SettingsPanel,
          openOn: 'right',
          props: {},
          width: '300px'
        });
        this.panel.promise.then(() => {
          // user clicked on veil
          this.setSettingsPanel(false);
        });
      } else {
        this.panel.hide();
        this.panel = undefined;
      }
    },
    showSettings() {
      this.setSettingsPanel(true);
    }
  }
};
</script>
<style lang="scss">
#app {
  display: grid;
  grid-template: 1fr / minmax(1000px, 1300px);
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.openSettings {
  position: fixed;
  right: 0;
  top: 50%;
}
div.openSettings > button {
  cursor: pointer;
}
.hideSettings {
  display: none;
}
</style>
