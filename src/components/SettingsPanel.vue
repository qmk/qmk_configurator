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
          class="settings-panel--legends"
          @mouseover="help('legends')"
          :title="$t('settingsPanel.legends.title')"
          >{{ $t('settingsPanel.legends.title') }}</label
        >
      </div>
      <div>
        <select id="setting-panel-legends" v-model="keyLegends">
          <option v-for="l in legendTypes" :key="l" :value="l">
            {{ $t(`settingsPanel.legendType.${l}`) }}
          </option>
        </select>
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
          class="settings-panel--text"
          @mouseover="help('osKeyboardLayout')"
          :title="$t('settingsPanel.osKeyboardLayout.title')"
          >{{ $t('settingsPanel.osKeyboardLayout.title') }}</label
        >
      </div>
      <div>
        <select
          id="setting-panel-os-keyboard-layout"
          v-model="osKeyboardLayout"
        >
          <option
            v-for="osLayout in sortedOSKeyboardLayouts"
            :key="osLayout"
            :value="osLayout"
          >
            {{ $t(`settingsPanel.osKeyboardLayout.label.${osLayout}`) }}
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
    ...mapState('keymap', ['continuousInput']),
    ...mapState('app', [
      'tutorialEnabled',
      'configuratorSettings',
      'languages',
      'legendTypes',
      'legends',
      'osKeyboardLayouts'
    ]),
    language: {
      get() {
        return this.configuratorSettings.language;
      },
      async set(value) {
        try {
          await this.changeLanguage(value);
        } catch (error) {
          console.error('Setting a new value for the language failed!', error);
        }
      }
    },
    keyLegends: {
      get() {
        return this.legends;
      },
      async set(value) {
        try {
          await this.setLegends(value);
        } catch (error) {
          console.error('Setting a new value for the legends failed!', error);
        }
      }
    },
    osKeyboardLayout: {
      get() {
        return this.configuratorSettings.osKeyboardLayout;
      },
      async set(value) {
        try {
          await this.changeOSKeyboardLayout(value);
        } catch (error) {
          console.error(
            'Setting a new value for the OS keyboard layout failed!',
            error
          );
        }
      }
    },
    sortedOSKeyboardLayouts: function () {
      // Locale-aware sort of the OS keyboard layouts by their labels.
      const translatedLayoutName = (osLayout) =>
        this.$t(`settingsPanel.osKeyboardLayout.label.${osLayout}`);
      return [...this.osKeyboardLayouts].sort((a, b) =>
        translatedLayoutName(a).localeCompare(translatedLayoutName(b))
      );
    }
  },
  methods: {
    ...mapMutations('keymap', ['toggleContinuousInput']),
    ...mapMutations('app', [
      'setLegends',
      'toggleTutorial',
      'toggleSnowflakes'
    ]),
    ...mapActions('app', [
      'toggleDarkMode',
      'changeLanguage',
      'changeOSKeyboardLayout',
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
        case 'legends':
          this.helpText = this.$t('settingsPanel.legends.help');
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
        case 'osKeyboardLayout':
          this.helpText = this.$t('settingsPanel.osKeyboardLayout.help');
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
