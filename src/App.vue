<template>
  <div id="app" @click="dismiss">
    <div>
      <header>
        <h1>
          <a href="/">
            <img
              src="./../assets/qmk_icon_512.png"
              alt="QMK Logo"
              width="48"
              style="vertical-align: middle"
            />QMK Configurator
          </a>
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
      <p>{{ $t('message.maintain') }}</p>
      <p>{{ $t('message.hostedOn') }}</p>
    </footer>
    <div
      class="help"
      :class="helpClasses"
      @click="toggleTutorial"
      :title="$t('message.help.label')"
      @mouseenter="
        setMessage($t('message.help.label'));
        hover = true;
      "
      @mouseleave="
        setMessage('');
        hover = false;
      "
    >
      <font-awesome-icon
        v-show="!tutorialEnabled"
        icon="hat-wizard"
        transform="rotate-22"
        size="3x"
      />
      <font-awesome-icon
        v-show="tutorialEnabled"
        icon="magic"
        transform="rotate-185"
        size="3x"
      />
    </div>
    <iframe
      v-if="tutorialEnabled"
      class="embedded-tutorial"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/tx54jkRC9ZY"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
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
      settingsClasses: '',
      hover: false
    };
  },
  watch: {
    $route: function(to) {
      this.settingsClasses =
        to.name === 'print' || to.name === 'test' ? 'hideSettings' : '';
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
    ...mapState(['showSpinner', 'spinnerMsg', 'message', 'tutorialEnabled']),
    showInfoBar() {
      return this.message !== '';
    },
    helpClasses() {
      var classes = [];
      if (this.hover) {
        classes.push('faa-tada', 'animated-hover');
      }
      return classes.join(' ');
    }
  },
  methods: {
    ...mapMutations([
      'setShowSpinner',
      'setSettingsPanel',
      'toggleTutorial',
      'setMessage'
    ]),
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
.embedded-tutorial {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 4000;
  background-color: #ddd;
  padding: 6px;
  border-radius: 3px;
  box-shadow: 0 0 3px #0009;
}

.help {
  position: fixed;
  top: 30px;
  right: 10px;
  opacity: 0.7;
  cursor: pointer;
  color: blue;
}
/* TADA - from https://l-lin.github.io/font-awesome-animation/ */
@keyframes tada {
  0% {
    transform: scale(1);
  }
  10%,
  20% {
    transform: scale(0.9) rotate(-8deg);
  }
  30%,
  50%,
  70% {
    transform: scale(1.3) rotate(8deg);
  }
  40%,
  60% {
    transform: scale(1.3) rotate(-8deg);
  }
  80%,
  100% {
    transform: scale(1) rotate(0);
  }
}

.faa-tada.animated,
.faa-tada.animated-hover:hover,
.faa-parent.animated-hover:hover > .faa-tada {
  animation: tada 2s linear infinite;
}
.faa-tada.animated.faa-fast,
.faa-tada.animated-hover.faa-fast:hover,
.faa-parent.animated-hover:hover > .faa-tada.faa-fast {
  animation: tada 1s linear infinite;
}
.faa-tada.animated.faa-slow,
.faa-tada.animated-hover.faa-slow:hover,
.faa-parent.animated-hover:hover > .faa-tada.faa-slow {
  animation: tada 3s linear infinite;
}
</style>
