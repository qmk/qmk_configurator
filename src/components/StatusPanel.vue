<template>
  <div id="status">
    <textarea
      id="terminal"
      v-model="statusStore.messageStr"
      ref="terminal"
      readonly
      :class="terminalClasses"
    />
    <label
      for="toggle-terminal"
      id="toggle-terminal-label"
      :class="terminalClasses"
      @click="toggleTerminal"
      >{{ $t('toggleTerminal.label') }}</label
    >
    <font-awesome-icon
      icon="chevron-up"
      size="lg"
      fixed-width
      id="toggle-terminal"
      :title="$t('toggleTerminal.title')"
      :class="terminalClasses"
      @click="toggleTerminal"
    />
  </div>
</template>
<script>
import { useStatusStore } from '@/stores/status';
import { mapState } from 'vuex';
import { mapStores } from 'pinia';
export default {
  name: 'status-panel',
  watch: {
    compileDisabled(newV) {
      if (newV === true) {
        this.isTerminalOpen = true;
      }
    }
  },
  mounted() {
    const statusStore = useStatusStore();
    this.statusStoreWatcher = statusStore.$subscribe(() => {
      if (this.statusStore.scrollToLatest) {
        this.statusStore.scrollToEnd();
        this.statusStore.doneScroll();
      }
    });
  },
  beforeDestroy() {
    if (this.statusStoreWatcher) {
      this.statusStoreWatcher();
    }
  },
  methods: {
    // ...mapMutations('status', ['doneScroll']),
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
  },
  computed: {
    ...mapStores(useStatusStore),
    ...mapState('app', ['compileDisabled']),
    terminalClasses() {
      const classes = [];
      if (!this.isTerminalOpen) {
        classes.push('collapsed');
      }
      return classes.join(' ');
    }
  },
  data: () => {
    return {
      isTerminalOpen: true,
      statusStoreWatcher: undefined
    };
  }
};
</script>
