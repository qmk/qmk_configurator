<template>
  <Veil :isVisible="isVisible">
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
  </Veil>
</template>
<script>
import Veil from './Veil';
export default {
  name: 'spinner',
  components: { Veil },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    status: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: 'Brought to you with much &#x1F496; by QMK'
    }
  }
};
</script>
<style scoped>
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
</style>
