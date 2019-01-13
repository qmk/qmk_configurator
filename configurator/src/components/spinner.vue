<template>
  <transition name="fade" appear>
    <div class="spinner-container" v-show="isVisible" @click="clicked">
      <div class="spinner">
        <h1 class="status">{{ status }}</h1>
        <div>
          <img
            class="space-potato working"
            src="./../..//assets/food-potato.svg"
          />
        </div>
        <h3 class="message" v-html="message"></h3>
      </div>
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
    },
    message: {
      type: String,
      default: 'Brought to you with much &#x1F496; by QMK'
    }
  },
  methods: {
    clicked(ev) {
      this.$emit('click', ev);
    }
  }
};
</script>
<style scoped>
.spinner-container {
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
  background: rgba(30, 30, 30, 0.3);
}
.spinner {
  display: grid;
  grid-template: 10% 1fr 10% / 1fr;
  background: url('./../../assets/galaxy-infinity-milky-way-110854.jpg');
  justify-items: center;
  align-items: center;
  height: 600px;
  width: 600px;
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
  grid-row: 1;
  margin-top: 90px;
  color: #eee;
}
.message {
  grid-row: 3;
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
