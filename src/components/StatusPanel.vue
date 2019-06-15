<template>
  <div id="status">
    <textarea
      id="terminal"
      v-model="message"
      ref="terminal"
      v-show="terminalVisible"
      readonly
    />
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
export default {
  name: 'status-panel',
  watch: {
    message(newV, oldV) {
      if (this.scrollToLatest && newV !== oldV) {
        this.scrollToEnd();
        this.doneScroll();
      }
    }
  },
  methods: {
    ...mapMutations('status', ['doneScroll']),
    scrollToEnd() {
      let terminal = this.$refs.terminal;
      this.$nextTick(() => {
        terminal.scrollTop = terminal.scrollHeight;
      });
    }
  },
  computed: {
    ...mapGetters('status', ['message', 'scrollToLatest']),
    ...mapState('app', ['terminalVisible'])
  },
  data: () => {
    return {};
  }
};
</script>
