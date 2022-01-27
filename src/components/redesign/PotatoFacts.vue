<template>
  <div
    class="
      w-full
      h-84px
      border-blue-100
      text-left
      p-8px
      border-2 border-solid
      rounded-lg
      relative
    "
  >
    {{ potatoFact }}
    <div class="absolute bottom-0 right-1 text-indigo-400">
      <a @click="decrementIdx" i>
        <font-awesome-icon icon="less-than" size="sm" fixed-width />
      </a>
      <a @click="incrementIdx">
        <font-awesome-icon icon="greater-than" size="sm" fixed-width />
      </a>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import random from 'lodash/random';
import size from 'lodash/size';

let cancelInterval = undefined;

// Because I'm using vue2 I have to use legacy API because
// i18n API composition only really works for vue3 at this time.
export default defineComponent({
  props: {
    delay: {
      type: Number,
      default: 12000
    }
  },
  data() {
    const factCount = size(this.$t('potato'));
    return {
      interval: this.delay,
      intervalHandle: undefined,
      currentFactIdx: random(1, factCount),
      factCount
    };
  },
  computed: {
    potatoFact() {
      return this.$t('potato.' + this.currentFactIdx);
    }
  },
  mounted() {
    this.intervalHandle = setInterval(() => {
      this.incrementIdx();
    }, this.interval);
  },
  destroyed() {
    cancelInterval(this.intervalHandle);
  },
  methods: {
    incrementIdx() {
      this.currentFactIdx = (this.currentFactIdx + 1) % this.factCount;
      if (this.currentFactIdx === 0) {
        this.currentFactIdx = 1;
      }
    },
    decrementIdx() {
      this.currentFactIdx = (this.currentFactIdx - 1) % this.factCount;
      if (this.currentFactIdx <= 0) {
        this.currentFactIdx = this.factCount - this.currentFactIdx;
      }
    }
  }
});
</script>
