<template>
  <div id="status">
    <transition name="terminal-fade">
      <div id="terminal" v-on:click="showTerminal" v-show="!terminalVisible">
        <span>^ Expand terminal ^</span>
      </div>
    </transition>
    <transition name="terminal-fade">
      <textarea
        id="terminal"
        v-model="message"
        ref="terminal"
        v-show="terminalVisible"
        readonly
      />
    </transition>
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
    },
    showTerminal() {
      this.$store.commit('app/setTerminalVisibility', true);
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
<style>
.terminal-fade-enter-active {
  transition: all 0.3s ease;
}
.terminal-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.terminal-fade-enter,
.terminal-fade-leave-to {
  opacity: 0;
}
div#terminal {
  height: 27px;
  cursor: pointer;
}
</style>
