<template>
  <div class="settings-panel">
    <h2>{{ $t('settingsPanel.title') }}</h2>

    <div class="settings-panel--toggles">
      <div>
        <label
          :title="$t('settingsPanel.fastInput.title')"
          @mouseover="help('fastInput')"
          class="settings-panel--text"
          >{{ $t('settingsPanel.fastInput.label') }}</label
        >
      </div>
      <div>
        <toggle-button
          id="setting-toggle-fast-input"
          :value="continuousInput"
          :width="defaultWidth"
          :sync="true"
          :labels="labels"
          @change="toggleContinuousInput"
        />
      </div>
      <div>
        <label
          class="settings-panel--text"
          @mouseover="help('displaySizes')"
          :title="$t('settingsPanel.displaySizes.title')"
          >{{ $t('settingsPanel.displaySizes.label') }}</label
        >
      </div>
      <div>
        <toggle-button
          id="setting-toggle-display-size"
          :value="displaySizes"
          :width="defaultWidth"
          :sync="true"
          :labels="labels"
          @change="toggleDisplaySizes"
        />
      </div>
      <div>
        <label
          class="settings-panel--text"
          @mouseover="help('toggleTutorial')"
          :title="$t('settingsPanel.toggleTutorial.label')"
          >{{ $t('settingsPanel.toggleTutorial.label') }}</label
        >
      </div>
      <div>
        <toggle-button
          id="setting-toggle-tutorial"
          :value="tutorialEnabled"
          :width="defaultWidth"
          :sync="true"
          :labels="labels"
          @change="toggleTutorial"
        />
      </div>

      <div>
        <label
          class="settings-panel--text"
          @mouseover="help('darkmode')"
          :title="$t('settingsPanel.darkmode.label')"
          >{{ $t('settingsPanel.darkmode.label') }}</label
        >
      </div>
      <div>
        <toggle-button
          id="setting-toggle-darkmode"
          :value="configuratorSettings.darkmodeEnabled"
          :width="defaultWidth"
          :sync="true"
          :labels="labels"
          @change="darkMode"
        />
      </div>
      <div>
        <label
          class="settings-panel--text"
          @mouseover="help('language')"
          :title="$t('settingsPanel.language.title')"
          >{{ $t('settingsPanel.language.title') }}</label
        >
      </div>
      <div>
        <select id="setting-panel-language" v-model="language">
          <option v-for="l in languages" :key="l.value" :value="l.value">
            {{ l.label }}
          </option>
        </select>
      </div>
      <div>
        <label
          class="settings-panel--clear-keymap"
          @mouseover="help('clearLayer')"
          :title="$t('settingsPanel.clearLayer.title')"
          >{{ $t('settingsPanel.clearLayer.title') }}</label
        >
        <div>
          <toggle-button
            id="settings-panel--clear-keymap"
            :value="configuratorSettings.clearLayerDefault"
            :width="defaultWidth"
            :sync="true"
            :labels="clearLayerLabels"
            @change="clearLayerDefault"
          />
        </div>
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
        checked: this.$t('settingsPanel.on.label'),
        unchecked: this.$t('settingsPanel.off.label')
      },
      clearLayerLabels: {
        checked: this.$t('settingsPanel.kctrns.label'),
        unchecked: this.$t('settingsPanel.kcno.label')
      },
      helpText: undefined,
      clearTextTimer: undefined,
      defaultWidth: 75
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
    ...mapMutations('app', ['toggleTutorial', 'toggleSnowflakes']),
    ...mapActions('app', [
      'toggleDarkMode',
      'changeLanguage',
      'toggleClearLayerDefault'
    ]),
    darkMode() {
      this.toggleDarkMode();
    },
    clearLayerDefault() {
      this.toggleClearLayerDefault();
    },
    help(key) {
      switch (key) {
        case 'fastInput':
          this.helpText = this.$t('settingsPanel.fastInput.help');
          break;
        case 'displaySizes':
          this.helpText = this.$t('settingsPanel.displaySizes.help');
          break;
        case 'toggleTutorial':
          this.helpText = this.$t('settingsPanel.toggleTutorial.help');
          break;
        case 'darkmode':
          this.helpText = this.$t('settingsPanel.darkmode.help');
          break;
        case 'language':
          this.helpText = this.$t('settingsPanel.language.help');
          break;
        case 'clearLayer':
          this.helpText = this.$t('settingsPanel.clearLayer.help');
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
  grid-template: 1fr / 1fr;
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
