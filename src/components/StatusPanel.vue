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
        document.getElementById('toggle-terminal').removeAttribute('class');
      } else {
        document.getElementById('terminal').setAttribute('class', 'collapsed');
        document.getElementById('toggle-terminal').setAttribute('class', 'collapsed');
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
