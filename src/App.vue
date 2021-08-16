<template>
  <div id="app" @click="dismiss">
    <span style="display: none">{{ revision }}</span>
    <div>
      <header>
        <p class="random-potato">{{ potatoFact }}</p>
      </header>
      <router-view />
      <spinner :isVisible="showSpinner" :status="spinnerMsg" />
      <InfoBar :msg="message" />
    </div>
    <slideout-panel></slideout-panel>
    <footer>
      <p>{{ $t('maintain') }}</p>
      <p>{{ $t('hostedOn') }}</p>
      <p style="font-size: 10px">version: {{ revision }}</p>
    </footer>
    <div
      class="help"
      :class="helpClasses"
      @click="toggleTutorial"
      :title="$t('help.label')"
      @mouseenter="
        setMessage($t('help.label'));
        hover = true;
      "
      @mouseleave="
        setMessage('');
        hover = false;
      "
    >
      <font-awesome-icon
        v-show="!snowflakes && !tutorialEnabled"
        icon="hat-wizard"
        transform="rotate-22"
        size="3x"
      />
      <img
        class="santa-hat"
        src="../assets/Santa_hat.svg"
        v-show="snowflakes && !tutorialEnabled"
        alt="Santa Hat by Theresa Knott [Public domain], via Wikimedia Commons"
      />
      <font-awesome-icon
        v-show="!snowflakes && tutorialEnabled"
        icon="magic"
        transform="rotate-185"
        size="3x"
      />
      <img
        class="jinglebell"
        src="../assets/jinglebell.svg"
        v-show="snowflakes && tutorialEnabled"
        alt="Jingle Bell SVG Icon made from Icon Fonts is licensed by CC BY 3.0"
      />
    </div>
    <iframe
      v-if="tutorialEnabled"
      class="embedded-tutorial"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/-imgglzDMdY"
      frameborder="0"
      sandbox="allow-scripts allow-same-origin"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <SnowFlake v-if="snowflakes" />
  </div>
</template>
<script>
import size from 'lodash/size';
import InfoBar from '@/components/InfoBar';
import random from 'lodash/random';
import Spinner from '@/components/spinner';
import SettingsPanel from '@/components/SettingsPanel';
import { createNamespacedHelpers, mapActions, mapGetters } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('app');
import isFunction from 'lodash/isFunction';
import SnowFlake from '@/components/SnowFlake';

export default {
  name: 'app',
  components: {
    Spinner,
    InfoBar,
    SnowFlake
  },
  data() {
    return {
      revision: process.env.VUE_APP_TRAVIS_COMMIT || 'dev',
      potatoFact: 'QMK for potatoes',
      interval: 120000,
      destroyWatcher: undefined,
      panel: undefined,
      settingsClasses: '',
      hover: false
    };
  },
  async beforeMount() {
    await this.appLoad();
    this.randomPotatoFact();
    this.interval = setInterval(() => {
      this.randomPotatoFact();
    }, this.interval);
  },
  created() {
    // will trigger function before closing/refreshing tab
    window.addEventListener('beforeunload', this.showConfirmationPrompt);
  },
  mounted() {
    this.destroyWatcher = this.$store.watch(
      (state) => state.app.settingsPanelVisible,
      this.toggleSettingsPanel
    );
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (isFunction(this.destroyWatcher)) {
      this.destroyWatcher();
    }
    // remove event listener
    window.removeEventListener('beforeunload', this.showConfirmationPrompt);
  },
  computed: {
    ...mapGetters('keymap', ['isDirty']),
    ...mapState([
      'showSpinner',
      'spinnerMsg',
      'message',
      'tutorialEnabled',
      'snowflakes'
    ]),
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
    ...mapActions('app', ['loadApplicationState']),
    randomPotatoFact() {
      const len = size(this.$t('potato'));
      this.potatoFact = this.$t('potato.' + random(1, len));
    },
    async appLoad() {
      await this.loadApplicationState();
    },
    dismiss() {
      this.setShowSpinner(false);
    },
    showConfirmationPrompt(e) {
      // implemented according to https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload

      if (this.isDirty === true) {
        // Cancel default event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';

        // will show prompt
        return true;
      }
      // will not show confirmation prompt
      return null;
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
@import './scss/style.scss';
#app {
  display: grid;
  grid-template: 1fr / minmax(1000px, 1300px);
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.embedded-tutorial {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 4000;
  padding: 6px;
  border-radius: 3px;
  box-shadow: 0 0 3px #0009;
}

.help {
  position: fixed;
  top: 50px;
  right: 10px;
  opacity: 0.7;
  cursor: pointer;
}

.santa-hat {
  width: 56px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
}

.jinglebell {
  width: 50px;
  transform: rotate(-9deg);
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
.faa-parent.animated-hover:hover > .faa-tada.faa-slow {
  animation: tada 3s linear infinite;
}
.faa-parent.animated-hover:hover > .faa-tada.faa-slow {
  animation: tada 3s linear infinite;
}
</style>
