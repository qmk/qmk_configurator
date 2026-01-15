<template>
  <div class="settings-panel">
    <div class="settings-panel--group">
      <h3>{{ $t('settingsPanel.basic.heading') }}</h3>

      <div class="settings-panel--item">
        <div class="settings-panel--item-label">
          <label>{{ $t('settingsPanel.language.label') }}</label>
          <div class="settings-panel--subtitle">
            {{ $t('settingsPanel.language.help') }}
          </div>
        </div>
        <div class="settings-panel--control">
          <select id="setting-panel-language" v-model="language">
            <option v-for="l in languages" :key="l.value" :value="l.value">
              {{ l.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="settings-panel--item">
        <div class="settings-panel--item-label">
          <label>{{ $t('settingsPanel.darkMode.label') }}</label>
          <div class="settings-panel--subtitle">
            {{ $t('settingsPanel.darkMode.help') }}
          </div>
        </div>
        <div class="settings-panel--control">
          <toggle-button
            id="setting-toggle-darkmode"
            :value="configuratorSettings.darkmodeEnabled"
            :height="toggleButtonHeight"
            :width="toggleButtonWidth"
            :sync="true"
            :labels="labels"
            @change="darkMode"
          />
        </div>
      </div>
    </div>

    <div class="settings-panel--group">
      <h3>{{ $t('settingsPanel.input.heading') }}</h3>

      <div class="settings-panel--item">
        <div class="settings-panel--item-label">
          <label>{{ $t('settingsPanel.fastInput.label') }}</label>
          <div class="settings-panel--subtitle">
            {{ $t('settingsPanel.fastInput.help') }}
          </div>
        </div>
        <div class="settings-panel--control">
          <toggle-button
            id="setting-toggle-fast-input"
            :value="continuousInput"
            :height="toggleButtonHeight"
            :width="toggleButtonWidth"
            :sync="true"
            :labels="labels"
            @change="toggleContinuousInput"
          />
        </div>
      </div>

      <div class="settings-panel--item">
        <div class="settings-panel--item-label">
          <label>{{ $t('settingsPanel.osKeyboardLayout.label') }}</label>
          <div class="settings-panel--subtitle">
            {{ $t('settingsPanel.osKeyboardLayout.help') }}
          </div>
        </div>
        <div class="settings-panel--control">
          <select
            id="setting-panel-os-keyboard-layout"
            v-model="osKeyboardLayout"
          >
            <option
              v-for="osLayout in sortedOSKeyboardLayouts"
              :key="osLayout"
              :value="osLayout"
            >
              {{ $t(`settingsPanel.osKeyboardLayout.option.${osLayout}`) }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="settings-panel--group">
      <h3>{{ $t('settingsPanel.advanced.heading') }}</h3>

      <div class="settings-panel--item">
        <div class="settings-panel--item-label">
          <label>{{ $t('settingsPanel.legends.label') }}</label>
          <div class="settings-panel--subtitle">
            {{ $t('settingsPanel.legends.help') }}
          </div>
        </div>
        <div class="settings-panel--control">
          <select id="setting-panel-legends" v-model="keyLegends">
            <option v-for="l in legendTypes" :key="l" :value="l">
              {{ $t(`settingsPanel.legendType.${l}`) }}
            </option>
          </select>
        </div>
      </div>

      <div class="settings-panel--item">
        <div class="settings-panel--item-label">
          <label>{{ $t('settingsPanel.clearLayer.label') }}</label>
          <div class="settings-panel--subtitle">
            {{ $t('settingsPanel.clearLayer.help') }}
          </div>
        </div>
        <div class="settings-panel--control">
          <toggle-button
            id="settings-panel--clear-keymap"
            :value="configuratorSettings.clearLayerDefault"
            :height="toggleButtonHeight"
            :width="toggleButtonWidth"
            :sync="true"
            :labels="labels"
            @change="clearLayerDefault"
          />
        </div>
      </div>
    </div>

    <div class="settings-panel--group">
      <h3>{{ $t('settingsPanel.help.heading') }}</h3>

      <div class="settings-panel--item">
        <div class="settings-panel--item-label">
          <label>{{ $t('settingsPanel.toggleTutorial.label') }}</label>
          <div class="settings-panel--subtitle">
            {{ $t('settingsPanel.toggleTutorial.help') }}
          </div>
        </div>
        <div class="settings-panel--control">
          <toggle-button
            id="setting-toggle-tutorial"
            :value="tutorialEnabled"
            :height="toggleButtonHeight"
            :width="toggleButtonWidth"
            :sync="true"
            :labels="labels"
            @change="toggleTutorial"
          />
        </div>
      </div>
    </div>
    <div class="settings-panel--group">
      <h3>{{ $t('settingsPanel.printing.heading') }}</h3>
      <div class="settings-panel--item">
        <div class="settings-panel--item-label">
          <label>{{ $t('settingsPanel.printing.useBlankForUnassigned.label') }}</label>
          <div class="settings-panel--subtitle">
            {{ $t('settingsPanel.printing.useBlankForUnassigned.help') }}
          </div>
        </div>
        <div class="settings-panel--control">
          <toggle-button
            id="settings-panel--clear-keymap"
            :value="configuratorSettings.showBlankForUnassigned"
            :height="toggleButtonHeight"
            :width="toggleButtonWidth"
            :sync="true"
            :labels="labels"
            @change="showBlankForUnassigned"
          />
        </div>
      </div>
      <div class="settings-panel--item">
        <div class="settings-panel--item-label">
          <label>{{ $t('settingsPanel.printing.applyDisabledStyleForUnassigned.label') }}</label>
          <div class="settings-panel--subtitle">
            {{ $t('settingsPanel.printing.applyDisabledStyleForUnassigned.help') }}
          </div>
        </div>
        <div class="settings-panel--control">
          <toggle-button
            id="settings-panel--clear-keymap"
            :value="configuratorSettings.applyDisabledStyleForUnassigned"
            :height="toggleButtonHeight"
            :width="toggleButtonWidth"
            :sync="true"
            :labels="labels"
            @change="applyDisabledStyleForUnassigned"
          />
        </div>
      </div>
    </div>
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
      toggleButtonHeight: 26,
      toggleButtonWidth: 60
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
        this.$t(`settingsPanel.osKeyboardLayout.option.${osLayout}`);
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
      'toggleClearLayerDefault',
      'toggleShowBlankForUnassigned',
      'toggleApplyDisabledStyleForUnassigned'
    ]),
    darkMode() {
      this.toggleDarkMode();
    },
    clearLayerDefault() {
      this.toggleClearLayerDefault();
    },
    showBlankForUnassigned() {
      this.toggleShowBlankForUnassigned();
    },
    applyDisabledStyleForUnassigned() {
      this.toggleApplyDisabledStyleForUnassigned();
    }
  }
};
</script>
<style>
.settings-panel {
  margin-top: 50px;
  text-align: left;
  padding: 12px;
  display: grid;
  grid-template: 1fr / 1fr;
  grid-row-gap: 12px;
}
.settings-panel--group {
  padding: 12px;
  border-radius: 12px;
}
.settings-panel--item {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.settings-panel--item-label {
  flex-shrink: 0;
}
.settings-panel--subtitle {
  font-size: 80%;
}
</style>
