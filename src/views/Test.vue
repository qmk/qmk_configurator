<template>
  <div class="visual-tester">
    <button id="leaveTest" @click="gohome()">
      <font-awesome-icon icon="chevron-left" size="lg" fixed-width />
      {{ $t('tester.back.label') }}
    </button>
    <button id="resetTest" @click="reset()" :title="$t('tester.reset.title')">
      <font-awesome-icon icon="undo" size="lg" fixed-width />
      {{ $t('tester.reset.label') }}
    </button>
    <!--h2 class="keyboardTesterTitle">{{ $t('tester.page.label') }}</h2-->
    <VisualTesterKeymap></VisualTesterKeymap>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'pinia';
import VisualTesterKeymap from '@/components/VisualTesterKeymap.vue';
import { useTesterStore } from '@/stores/tester';
export default {
  name: 'testerator-component',
  computed: {
    ...mapState('app', ['keyboard', 'layout'])
  },
  components: { VisualTesterKeymap },
  methods: {
    ...mapActions(useTesterStore, ['reset']),
    gohome() {
      this.$router.push(`/${this.keyboard}/${this.layout}`);
    }
  }
};
</script>
