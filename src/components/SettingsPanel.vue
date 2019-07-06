<template>
  <div class="settings-panel">
    <h2>{{ $t('message.settingsPanel.title') }}</h2>

    <div class="settings-panel--toggles">
      <div>
        <label
          :title="$t('message.settingsPanel.fastInput.title')"
          @mouseover="help('fastInput')"
          class="settings-panel--text"
        >
          {{ $t('message.settingsPanel.fastInput.label') }}
        </label>
      </div>
      <div>
        <toggle-button
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
        >
          {{ $t('message.settingsPanel.displaySizes.label') }}
        </label>
      </div>
      <div>
        <toggle-button
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
          :title="$t('message.settingsPanel.displaySizes.title')"
        >
          {{ $t('message.settingsPanel.toggleTutorial.label') }}
        </label>
      </div>
      <div>
        <toggle-button
          :value="tutorialVisible"
          :sync="true"
          :labels="labels"
          @change="toggleTutorial"
        />
      </div>
    </div>
    <div v-if="helpText" class="settings-panel--help-text">
      {{ helpText }}
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
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
    ...mapState('keymap', ['continuousInput', 'displaySizes'])
  },
  methods: {
    ...mapMutations('keymap', ['toggleDisplaySizes', 'toggleContinuousInput']),
    ...mapMutations('app', ['toggleTutorial']),
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
  margin-top: 30px;
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
  align-text: center;
  font-size: 16px;
  width: 100%;
  background: #add8e6;
  height: 80px;
  bottom: 0;
  color: #222;
  padding: 5px;
  box-sizing: border-box;
  text-overflow: none;
}
</style>
