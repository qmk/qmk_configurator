<template functional>
  <transition name="fade" appear>
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
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
