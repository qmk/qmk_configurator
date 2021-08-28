<template>
  <div>
    <div ref="console">
      <controllerTop v-if="appInitialized" />
      <statusPanel />
      <controllerBottom />
    </div>
    <div class="hint hint-right">
      <a
        href="https://github.com/qmk/qmk_toolbox/releases"
        v-tooltip="$t('downloadToolbox.label')"
        target="_blank"
        rel="noopener"
        >{{ $t('downloadToolbox.label') }}</a
      >
    </div>
    <div class="split-content">
      <div class="left-side">
        <layerControl />
      </div>
      <div class="right-side">
        <div class="keymap--area">
          <label class="keymap--label" v-tooltip="$t('ColorwayTip.title')">
            {{ $t('keymap.label') }}:
            <font-awesome-icon
              v-if="continuousInput"
              icon="keyboard"
              fixed-width
            />
          </label>
          &nbsp;
          <!-- maintain spacing for paragraph -->
          <select
            class="keymap--keyset"
            id="colorway-select"
            v-model="curIndex"
          >
            <option
              class="option"
              v-for="(name, index) in displayColorways"
              :key="index"
              :value="index"
            >
              {{ name }}
            </option>
          </select>
          <a
            id="favorite-colorway"
            v-tooltip="$t('favoriteColor')"
            @click="favColor"
            :class="{
              active: isFavoriteColor
            }"
          >
            <font-awesome-icon icon="star" size="lg" fixed-width />
          </a>
        </div>
        <visualKeymap :profile="false" />
        <span class="keymap--count"
          ><span class="keymap--counter">{{ keyCount }}</span
          >Keys</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import capitalize from 'lodash/capitalize';
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex';
import ControllerTop from '@/components/ControllerTop';
import StatusPanel from '@/components/StatusPanel';
import ControllerBottom from '@/components/ControllerBottom';
import VisualKeymap from '@/components/VisualKeymap';
import LayerControl from '@/components/LayerControl';

export default {
  name: 'Main',
  props: {},
  components: {
    ControllerTop,
    StatusPanel,
    ControllerBottom,
    VisualKeymap,
    LayerControl
  },
  computed: {
    ...mapState('app', ['appInitialized', 'configuratorSettings']),
    ...mapGetters('app', ['keyCount']),
    ...mapState('keymap', ['continuousInput']),
    ...mapGetters('keymap', ['colorwayIndex', 'colorways', 'size']),
    curIndex: {
      get() {
        return this.colorwayIndex;
      },
      set(value) {
        this.nextColorway(value);
      }
    },
    displayColorways() {
      return this.colorways.map((keyset) => {
        return keyset
          .replace(/-/g, ' ')
          .split(' ')
          .map((word) => capitalize(word))
          .join(' ')
          .replace(/Gmk/, 'GMK')
          .replace(/^Sa/, 'SA')
          .replace(/^Dsa/, 'DSA')
          .replace(/^Jtk/, 'JTK')
          .replace(/Kat/, 'KAT')
          .replace(/Wob/, 'WOB')
          .replace(/Ta/, 'TA')
          .replace(/ ?Plus/g, '+')
          .replace(/ ?Dot ?/g, '\.');
      });
    },
    redditPost() {
      return 'https://www.reddit.com/r/MechanicalKeyboards/comments/aio97b/qmk_configurator_updates_beta_need_your_input/';
    },
    isFavoriteColor() {
      return (
        this.configuratorSettings.favoriteColor &&
        this.displayColorways[this.curIndex].toLowerCase() ===
          this.configuratorSettings.favoriteColor.toLowerCase()
      );
    }
  },
  methods: {
    ...mapActions('app', ['setFavoriteColor', 'initKeypressListener']),
    ...mapMutations('keymap', ['nextColorway']),
    ...mapMutations('app', ['resetListener']),
    favColor() {
      if (this.isFavoriteColor) {
        this.setFavoriteColor('');
      } else {
        this.setFavoriteColor(this.displayColorways[this.curIndex]);
      }
    }
  },
  async mounted() {
    await this.initKeypressListener();
    // Loading favorite color
    if (this.configuratorSettings.favoriteColor) {
      const favoriteColor =
        this.configuratorSettings.favoriteColor.toLowerCase();
      this.curIndex = this.displayColorways.findIndex(
        (color) => color.toLowerCase() === favoriteColor
      );
    }
  },
  beforeDestroy() {
    this.resetListener();
  }
};
</script>
<style>
.hint-right {
  display: grid;
  justify-content: end;
}
#colorway-select {
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
.beta-feedback {
  position: fixed;
  right: 10px;
  top: 30px;
}
.beta-button {
  height: 30px;
  font-size: 15px;
  border-radius: 9px;
  cursor: pointer;
}
.keymap--label {
  float: left;
}
.keymap--counter {
  display: inline-block;
  padding: 0 5px;
  margin-top: 2px;
}
.keymap--count {
  float: right;
  color: #999;
}
.keymap--keyset {
  float: right;
}
.keymap--area {
  margin-top: 1em;
  margin-bottom: 1em;
  height: 1.5em;
}
</style>
