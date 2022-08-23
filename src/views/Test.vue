<template>
  <div class="visual-tester">
    <button id="leaveTest" @click="gohome()">
      <font-awesome-icon icon="chevron-left" size="lg" fixed-width />
      {{ $t('tester.back.label') }}
    </button>
    <button id="resetTest" :title="$t('tester.reset.title')" @click="reset()">
      <font-awesome-icon icon="undo" size="lg" fixed-width />
      {{ $t('tester.reset.label') }}
    </button>
    <!--h2 class="keyboardTesterTitle">{{ $t('tester.page.label') }}</h2-->
    <VisualTesterKeymap></VisualTesterKeymap>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import VisualTesterKeymap from '@/components/VisualTesterKeymap.vue';
export default {
  name: 'TesteratorComponent',
  components: { VisualTesterKeymap },
  computed: {
    ...mapState('app', ['keyboard', 'layout'])
  },
  methods: {
    ...mapMutations('tester', ['reset']),
    gohome() {
      this.$router.push(`/${this.keyboard}/${this.layout}`);
    }
  }
};
</script>
