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
    <visualKeymap />
    <div class="split-content">
      <div class="left-side">
        <p><label>Layer:</label></p>
        <div id="layers">
          <div class="layer 15">15</div>
          <div class="layer 14">14</div>
          <div class="layer 13">13</div>
          <div class="layer 12">12</div>
          <div class="layer 11">11</div>
          <div class="layer 10">10</div>
          <div class="layer 9">9</div>
          <div class="layer 8">8</div>
          <div class="layer 7">7</div>
          <div class="layer 6">6</div>
          <div class="layer 5">5</div>
          <div class="layer 4">4</div>
          <div class="layer 3">3</div>
          <div class="layer 2">2</div>
          <div class="layer 1">1</div>
          <div class="layer active 0">0</div>
        </div>
      </div>
      <div class="right-side">
        <p><label>Keymap:</label></p>
        <div id="visual-keymap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ControllerTop from '@/components/ControllerTop';
import StatusPanel from '@/components/StatusPanel';
import ControllerBottom from '@/components/ControllerBottom';
import VisualKeymap from '@/components/VisualKeymap';
import * as jquery from '@/jquery';

export default {
  name: 'Main',
  props: {},
  components: { ControllerTop, StatusPanel, ControllerBottom, VisualKeymap },
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
