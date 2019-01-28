<template>
  <div>
    <div class="beta-feedback">
      <a target="_blank" :href="redditPost" rel="noopener">
        <button class="beta-button">Beta Feedback</button>
      </a>
    </div>
    <div ref="console">
      <controllerTop /><statusPanel /><controllerBottom />
    </div>
    <a
      class="hint"
      target="_blank"
      href="https://github.com/qmk/qmk_toolbox/releases"
    >
      Download QMK Toolbox
    </a>
    <div class="split-content">
      <div class="left-side"><layerControl /></div>
      <div class="right-side">
        <p>
          <label title="Ctrl + Alt + N to cycle next colorway">
            Keymap:
            <select id="colorway-select" v-model="curIndex">
              <option
                class="option"
                v-for="(name, index) in displayColorways"
                :key="index"
                :value="index"
              >
                {{ name }}
              </option>
            </select>
          </label>
        </p>
        <visualKeymap :profile="false" />
      </div>
    </div>
  </div>
</template>

<script>
import capitalize from 'lodash/capitalize';
import { mapGetters, mapMutations } from 'vuex';
import ControllerTop from '@/components/ControllerTop';
import StatusPanel from '@/components/StatusPanel';
import ControllerBottom from '@/components/ControllerBottom';
import VisualKeymap from '@/components/VisualKeymap';
import LayerControl from '@/components/LayerControl';
import * as jquery from '@/jquery';

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
    ...mapGetters('keymap', ['colorwayIndex', 'colorways']),
    curIndex: {
      get() {
        return this.colorwayIndex;
      },
      set(value) {
        this.nextColorway(value);
      }
    },
    displayColorways() {
      return this.colorways.map(keyset => {
        return keyset
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => capitalize(word))
          .join(' ')
          .replace(/Gmk/, 'GMK')
          .replace(/^Sa/, 'SA')
          .replace(/^Dsa/, 'DSA')
          .replace(/Wob/, 'WOB')
          .replace(/Ta/, 'TA');
      });
    },
    redditPost() {
      return 'https://www.reddit.com/r/MechanicalKeyboards/comments/aio97b/qmk_configurator_updates_beta_need_your_input/';
    }
  },
  methods: {
    ...mapMutations('keymap', ['nextColorway'])
  },
  mounted() {
    jquery.init();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Main {
}
.hint {
  display: grid;
  justify-content: start;
  align-content: start;
}
#colorway-select {
  font-family: sans-serif;
}
.beta-feedback {
  position: fixed;
  right: 10px;
  top: 30px;
}
.beta-button {
  height: 30px;
  font-size: 15px;
  background: #4b0082;
  border-radius: 9px;
  color: #ffa500;
  cursor: pointer;
}
</style>
