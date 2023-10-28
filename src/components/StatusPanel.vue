<template>
  <div id="status">
    <textarea
      id="terminal"
      ref="terminal"
      v-model="message"
      readonly
      :class="terminalClasses"
    />
    <label
      id="toggle-terminal-label"
      for="toggle-terminal"
      :class="terminalClasses"
      @click="toggleTerminal"
      >{{ $t('toggleTerminal.label') }}</label
    >
    <font-awesome-icon
      id="toggle-terminal"
      icon="chevron-up"
      size="lg"
      fixed-width
      :title="$t('toggleTerminal.title')"
      :class="terminalClasses"
      @click="toggleTerminal"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
  name: 'StatusPanel',
  data: () => {
    return {
      isTerminalOpen: true
    };
  },
  computed: {
    ...mapGetters('status', ['message', 'scrollToLatest']),
    ...mapState('app', ['compileDisabled']),
    terminalClasses() {
      const classes = [];
      if (!this.isTerminalOpen) {
        classes.push('collapsed');
      }
      return classes.join(' ');
    }
  },
  watch: {
    message(newV, oldV) {
      if (this.scrollToLatest && newV !== oldV) {
        this.scrollToEnd();
        this.doneScroll();
      }
    },
    compileDisabled(newV) {
      if (newV === true) {
        this.isTerminalOpen = true;
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
    },
    /**
     * toggleTerminal. Collapses/expands the terminal display.
     * @return doesn't return anything because I don't know what I'm
     * doing here.  - noroadsleft
     */
    toggleTerminal() {
      this.isTerminalOpen = !this.isTerminalOpen;
    }
  }
};
</script>
