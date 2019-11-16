<template>
  <div id="status">
    <textarea id="terminal" v-model="message" ref="terminal" readonly />
    <font-awesome-icon icon="chevron-up" size="lg" fixed-width 
      id="toggle-terminal"
      :title="$t('message.toggleTerminal.title')"
      @click="toggleTerminal"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
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
    /**
     * toggleTerminal keymap. Attempts to load the keymap data from
     * a predefined known file path.
     * @param {boolean} isAutoInit If the method is called by the code
     * @return {object} promise when it has completed
     */
    toggleTerminal() {
      if (document.getElementById('terminal').getAttribute('class')) {
        document.getElementById('terminal').removeAttribute('class');
      } else {
        document.getElementById('terminal').setAttribute('class', 'collapsed');
      }
    }
  },
  computed: {
    ...mapGetters('status', ['message', 'scrollToLatest'])
  },
  data: () => {
    return {};
  }
};
</script>
<style>
#status {
  position: relative;
}
#toggle-terminal {
  position: absolute;
  top: 6px;
  right: 24px;
  white-space: nowrap;
  margin: 0;
}
#terminal {
  padding: 2px 5px;
  border: 1px solid;
  font-family: 'Roboto Mono', Monaco, 'Bitstream Vera Sans Mono',
    'Lucida Console', Terminal, Consolas, 'Liberation Mono', 'DejaVu Sans Mono',
    'Courier New', monospace;
  white-space: pre-wrap;
  overflow-y: scroll;
  height: 200px;
  font-size: 12px;
  width: 100%;
  margin: 0px auto;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: block;
  transition: all 0.5s ease-out;
}
#terminal.collapsed {
  transition: all 0.5s ease-out;
  height: 0px;
  padding: 0 5px;
}
</style>
