<template functional>
  <transition name="veil" appear>
    <div class="veil-container" v-show="props.isVisible">
      <slot name="contents">Something to Unveil</slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'veil-component',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  }
};
</script>
<style>
.veil-container {
  display: grid;
  grid-template: 1fr / 1fr;
  position: fixed;
  top: 0;
  left: 0;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 50000;
}
.veil-enter-active {
  transition: opacity 0.2s ease-in-out;
}
.veil-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.veil-enter,
.veil-leave-to {
  opacity: 0;
}
</style>
