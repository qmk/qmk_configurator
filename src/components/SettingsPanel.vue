<template>
  <div class="settings-panel">
    <h2>Configurator Settings</h2>
    <div class="settings-panel--toggles">
      <div>
        <label
          title="ctrl + alt + f"
          @mouseover="help('fastInput')"
          class="settings-panel--text"
          >Fast Input</label
        >
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
          title="ctrl + alt + u"
          class="settings-panel--text"
          @mouseover="help('displaySizes')"
          >Show Key Sizes</label
        >
      </div>
      <div>
        <toggle-button
          :value="displaySizes"
          :sync="true"
          :labels="labels"
          @change="toggleDisplaySizes"
        />
      </div>
    </div>
    <div v-if="helpText" class="settings-panel--help-text">
      {{ helpText }}
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { ToggleButton } from 'vue-js-toggle-button';
export default {
  name: 'settings-panel',
  data() {
    return {
      labels: { checked: 'On', unchecked: 'Off' },
      helpText: undefined,
      clearTextTimer: undefined
    };
  },
  components: { ToggleButton },
  computed: {
    ...mapGetters('keymap', ['displaySizes', 'continuousInput'])
  },
  methods: {
    ...mapMutations('keymap', ['toggleDisplaySizes', 'toggleContinuousInput']),
    help(key) {
      switch (key) {
        case 'fastInput':
          this.helpText =
            'Input keys via keyboard without clicking each position.';
          break;
        case 'displaySizes':
          this.helpText = 'Show keycap sizes in Key Units';
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
