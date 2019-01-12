<template>
  <transition name="fade" appear>
    <div class="spinner" v-show="isVisible">
      <h1 class="status">{{ status }}</h1>
      <div><img class="space-potato working" src="/food-potato.svg" /></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'spinner',
  props: {
    isVisible: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      default: ''
    }
  }
};
</script>
<style scoped>
.spinner {
  display: grid;
  grid-template: 10% 1fr / 1fr;
  position: fixed;
  top: 15%;
  left: 33%;
  justify-content: center;
  align-items: center;
  background: url('/galaxy-infinity-milky-way-110854.jpg');
  height: 600px;
  width: 600px;
  z-index: 5000;
  opacity: 0.95;
  border-radius: 25%;
}
.space-potato {
  width: 400px;
  height: 200px;
}
.working {
  animation: rotation 12s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(359deg);
  }
}
.status {
  margin-top: 90px;
  color: #eee;
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
