<template>
  <div class="settings-panel">
    <h2>{{ $t('message.settingsPanel.title') }}</h2>

    <div class="settings-panel--toggles">
      <div>
        <label
          :title="$t('message.settingsPanel.fastInput.title')"
          @mouseover="help('fastInput')"
          class="settings-panel--text"
          >{{ $t('message.settingsPanel.fastInput.label') }}</label
        >
      </div>
      <div>
        <toggle-button
          id="setting-toggle-fast-input"
          :value="continuousInput"
          :sync="true"
          :labels="labels"
          @change="toggleContinuousInput"
        />
      </div>
      <div>
        <label
          class="settings-panel--text"
          @mouseover="help('displaySizes')"
          :title="$t('message.settingsPanel.displaySizes.title')"
          >{{ $t('message.settingsPanel.displaySizes.label') }}</label
        >
      </div>
      <div>
        <toggle-button
          id="setting-toggle-display-size"
          :value="displaySizes"
          :sync="true"
          :labels="labels"
          @change="toggleDisplaySizes"
        />
      </div>
      <div>
        <label
          class="settings-panel--text"
          @mouseover="help('displaySizes')"
          :title="$t('message.settingsPanel.toggleTutorial.title')"
          >{{ $t('message.settingsPanel.toggleTutorial.label') }}</label
        >
      </div>
      <div>
        <toggle-button
          id="setting-toggle-tutorial"
          :value="tutorialEnabled"
          :sync="true"
          :labels="labels"
          @change="toggleTutorial"
        />
      </div>

      <div>
        <label
          class="settings-panel--text"
          @mouseover="help('darkmode')"
          :title="$t('message.settingsPanel.darkmode.title')"
          >{{ $t('message.settingsPanel.darkmode.title') }}</label
        >
      </div>
      <div>
        <toggle-button
          id="setting-toggle-darkmode"
          :value="configuratorSettings.darkmodeEnabled"
          :sync="true"
          :labels="labels"
          @change="darkMode"
        />
      </div>
      <div>
        <label
          class="settings-panel--text"
          :title="$t('message.settingsPanel.language.title')"
          >{{ $t('message.settingsPanel.language.title') }}</label
        >
      </div>
      <div>
        <select id="setting-panel-language" v-model="language">
          <option v-for="l in languages" :key="l.value" :value="l.value">{{
            l.label
          }}</option>
        </select>
      </div>
    </div>
    <div v-if="helpText" class="settings-panel--help-text">{{ helpText }}</div>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import { ToggleButton } from 'vue-js-toggle-button';
export default {
  name: 'settings-panel',
  data() {
    return {
      labels: {
        checked: this.$t('message.settingsPanel.on.label'),
        unchecked: this.$t('message.settingsPanel.off.label')
      },
      helpText: undefined,
      clearTextTimer: undefined
    };
  },
  components: { ToggleButton },
  computed: {
    ...mapState('keymap', ['continuousInput', 'displaySizes']),
    ...mapState('app', [
      'tutorialEnabled',
      'configuratorSettings',
      'languages'
    ]),
    language: {
      get() {
        return this.configuratorSettings.language;
      },
      async set(value) {
        await this.changeLanguage(value);
      }
    }
  },
  methods: {
    ...mapMutations('keymap', ['toggleDisplaySizes', 'toggleContinuousInput']),
    ...mapMutations('app', ['toggleTutorial']),
    ...mapActions('app', ['toggleDarkMode', 'changeLanguage']),
    darkMode() {
      this.toggleDarkMode();
    },
    help(key) {
      switch (key) {
        case 'fastInput':
          this.helpText = this.$t('message.settingsPanel.fastInput.help');
          break;
        case 'displaySizes':
          this.helpText = this.$t('message.settingsPanel.displaySizes.help');
          break;
      }

      if (this.clearTextTimer) {
        window.clearTimeout(this.clearTextTimer);
        this.clearTextTimer = undefined;
      }
      this.clearTextTimer = window.setTimeout(() => {
        this.helpText = undefined;
      }, 5000);
    }
  }
};
</script>
<style>
.settings-panel {
  margin-top: 50px;
}
.settings-panel--toggles {
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-row-gap: 5px;
}
.settings-panel--text {
  text-align: left;
}
.settings-panel--help-text {
  position: absolute;
  text-align: center;
  font-size: 16px;
  width: 100%;
  height: 80px;
  bottom: 0;
  padding: 5px;
  box-sizing: border-box;
  text-overflow: none;
}
</style>
