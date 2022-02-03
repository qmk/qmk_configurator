<template>
  <div
    class="
      w-full
      bg-white-panel
      rounded-lg
      flex flex-col
      transition-maxheight
      ease-in-out
    "
    :class="importing ? ['max-h-112px'] : ['max-h-56px']"
  >
    <div class="w-full min-h-56px h-56px p-8px flex flex-row justify-between">
      <button
        class="
          btn
          bg-upload-active
          text-white
          hover:bg-upload-focus hover:text-upload-active
          active:text-black active:bg-upload-active
        "
        @click="$emit('uploadJSON')"
      >
        Upload .JSON
      </button>
      <button
        class="
          btn
          bg-upload-active
          text-white
          hover:bg-upload-focus hover:text-upload-active
          active:text-black active:bg-upload-active
        "
        @click="toggleImporting"
        v-if="!importing"
      >
        Import URL
      </button>
     
        <button
        class="
          btn
        
          text-blue
          hover:bg-glow-blue hover:text-blue
          active:text-black active:bg-upload-active
        "
        @click="toggleImporting"
        v-if="importing"
      >
        Close
      </button>

    </div>
    <transition name="slide-fade">
      <div class="w-full flex flex-row p-2" v-show="importing">
        <input
          class="
            flex-grow
            rounded-sm
            h-40px
            bg-white-700
            placeholder-gray-700
            pl-16px
            mw-80
          "
          type="text"
          placeholder="Paste URL here"
        />
      </div>
    </transition>
  </div>
</template>
<script>
import { defineComponent, ref, unref } from '@vue/composition-api';

export default defineComponent({
  emits: ['uploadJSON', 'importJSON'],
  setup() {
    let importing = ref(false);
    const toggleImporting = () => {
      importing.value = !unref(importing);
    };
    return {
      importing,
      toggleImporting
    };
  }
});
</script>

<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  transition-delay: 600;
}
.slide-fade-exit {
  transition-delay: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
.transition-maxheight {
  transition: max-height 0.2s;
}
</style>
