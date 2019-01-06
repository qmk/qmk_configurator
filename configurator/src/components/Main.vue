<template>
  <div>
    <controllerTop /><statusPanel /><controllerBottom />
    <a
      class="hint"
      target="_blank"
      href="https://github.com/qmk/qmk_toolbox/releases"
    >
      Download QMK Toolbox
    </a>
    <div class="split-content" :class="classes">
      <div class="left-side"><layerControl /></div>
      <div class="right-side">
        <p><label>Keymap:</label></p>
        <visualKeymap :profile="true" />
      </div>
    </div>
    <div style="display:hidden" class="hidden"></div>
  </div>
</template>

<script>
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
  mounted() {
    jquery.init();
    this.setVisualKeymapOffsetTop(this.$el.offsetTop);
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  computed: {
    ...mapGetters('keymap', ['vkOffsetTop', 'visualKeymapFixed']),
    classes() {
      let classes = [];
      if (this.visualKeymapFixed) {
        classes.push('fixed');
      }
      return classes.join(' ');
    }
  },
  methods: {
    ...mapMutations('keymap', [
      'setVisualKeymapFixed',
      'setVisualKeymapOffsetTop'
    ]),
    scrollHandler() {
      if (
        this.visualKeymapFixed === false &&
        window.scrollY > this.vkOffsetTop
      ) {
        this.setVisualKeymapFixed(true);
      }

      if (
        this.visualKeymapFixed === true &&
        window.scrollY < this.vkOffsetTop
      ) {
        this.setVisualKeymapFixed(false);
      }
    }
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
