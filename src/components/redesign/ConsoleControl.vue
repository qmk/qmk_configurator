<template>
  <div class="rounded-lg bg-cool-gray-50 text-black min-h-48px p-2 relative">
    <div class="absolute left-3 top-2">
      <font-awesome-icon icon="book-open" size="lg" fixed-width />
    </div>
    <h4 class="font-bold mt-2">Console</h4>
    <div ref="terminal" class="pl-2 pr-2"></div>
    <div class="absolute right-3 top-2">
      <font-awesome-icon icon="expand-alt" size="lg" fixed-width />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import { Terminal } from 'xterm';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { FitAddon } from 'xterm-addon-fit';
export default defineComponent({
  name: 'console-control',
  mounted() {
    this.term.open(this.$refs.terminal);
    this.fitAddon.fit();
    this.term.write('hello world! https://config.qmk.fm');
  },
  setup() {
    const term = new Terminal({
      rows: 25,
      cols: 80,
      fontFamily: 'Courier',
      theme: { background: '#ccd9f7', foreground: '#333' },
      scrollback: 400
    });
    term.loadAddon(new WebLinksAddon());
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    return { term, fitAddon };
  }
});
</script>
