<template>
  <div id="status">
    <textarea id="terminal" v-model="message" ref="terminal" readonly />
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
