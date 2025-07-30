<template>
  <div id="app" @click="dismiss">
    <span style="display: none">{{ revision }}</span>
    <div>
      <header>
        <Transition name="potato-fade" mode="out-in">
          <p class="random-potato" :key="potatoFactId">
            {{ $t(potatoFactId) }}
          </p>
        </Transition>
      </header>
      <router-view />
      <spinner :is-visible="showSpinner" :status="spinnerMsg" />
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
      :title="$t('help.label')"
      @click="toggleTutorial"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      v-tooltip.bottom-end="$t('help.label')"
    >
      <font-awesome-icon
        v-show="!snowflakes && !tutorialEnabled"
        icon="hat-wizard"
        transform="rotate-22"
        size="3x"
      />
      <img
        v-show="snowflakes && !tutorialEnabled"
        class="santa-hat"
        src="../assets/Santa_hat.svg"
        alt="Santa Hat by Theresa Knott [Public domain], via Wikimedia Commons"
      />
      <font-awesome-icon
        v-show="!snowflakes && tutorialEnabled"
        icon="magic"
        transform="rotate-185"
        size="3x"
      />
      <img
        v-show="snowflakes && tutorialEnabled"
        class="jinglebell"
        src="../assets/jinglebell.svg"
        alt="Jingle Bell SVG Icon made from Icon Fonts is licensed by CC BY 3.0"
      />
    </div>
    <iframe
      v-if="tutorialEnabled"
      class="embedded-tutorial"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/-imgglzDMdY?list=PLZlceRZZjRugJFL-vnenYnDrbMc6wu_e_"
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
import InfoBar from '@/components/InfoBar.vue';
import random from 'lodash/random';
import Spinner from '@/components/spinner.vue';
import SettingsPanel from '@/components/SettingsPanel.vue';
import { createNamespacedHelpers, mapActions, mapGetters } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('app');
import isFunction from 'lodash/isFunction';
import SnowFlake from '@/components/SnowFlake.vue';

export default {
  name: 'app',
  components: {
    Spinner,
    InfoBar,
    SnowFlake
  },
  data() {
    return {
      revision: import.meta.env.VITE_GHA_COMMIT || 'dev',
      potatoFactId: 'potatoes',
      interval: 120000,
      destroyWatcher: undefined,
      panel: undefined,
      settingsClasses: '',
      hover: false
    };
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
  methods: {
    ...mapMutations(['setShowSpinner', 'setSettingsPanel', 'toggleTutorial']),
    ...mapActions('app', ['loadApplicationState']),
    randomPotatoFact() {
      const len = size(this.$t('potato'));
      this.potatoFactId = 'potato.' + random(1, len);
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
          width: '480px'
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
@use '@/scss/style.scss';

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

.qmk-logo {
  grid-column: qmk-logo;
  background-image: url('/qmk_icon_36.png');
  width: 36px;
  height: 36px;
  transform: scale(0.777777);
  margin-top: 2px;
}

.potato-fade-enter-active,
.potato-fade-leave-active {
  transition: opacity 0.3s ease;
}
.potato-fade-enter,
.potato-fade-leave-to {
  opacity: 0;
}
.potato-fade-leave,
.potato-fade-enter-to {
  opacity: 1;
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
