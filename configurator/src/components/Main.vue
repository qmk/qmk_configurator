<template>
  <div>
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
          <label title="Ctrl + N to cycle next colorway">
            Keymap: {{ this.colorway }}
          </label>
        </p>
        <visualKeymap :profile="false" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters('keymap', ['colorway'])
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
</style>
