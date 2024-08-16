<template functional>
  <VeilComponent :isVisible="props.isVisible">
    <template #contents>
      <div class="spinner">
        <h1 class="status">{{ props.status }}</h1>
        <div>
          <img
            class="space-potato working"
            src="./../../assets/food-potato.svg"
          />
        </div>
        <h3 class="message" v-html="props.message"></h3>
      </div>
    </template>
  </VeilComponent>
</template>
<script>
export default {
  name: 'spinner-component',
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
<style>
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
.spinner .space-potato {
  width: 400px;
  height: 200px;
}
.spinner .working {
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
.spinner .status {
  grid-row: 1;
  margin-top: 90px;
}
.spinner .message {
  grid-row: 3;
}
</style>
