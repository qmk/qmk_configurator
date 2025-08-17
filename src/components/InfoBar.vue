<template functional>
  <transition name="fadelong" appear>
    <div v-if="props.msg" class="bottom-fixed">
      <div class="info-msg">
        <div v-if="props.msg.alias">
          <ruby>
            {{ props.msg.alias }}<rt>{{ props.msg.code }}</rt> </ruby
          >: {{ props.msg.title }}
        </div>
        <div v-else>
          <span class="msg-code">{{ props.msg.code }}</span
          >: {{ props.msg.title }}
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'InfoBar',
  props: {
    msg: {
      type: Object
    }
  }
};
</script>
<style>
.bottom-fixed {
  position: fixed;
  z-index: 500;
  bottom: 0px;
  left: 0;
  right: 0;
  max-width: fit-content;
  margin-inline: auto;
}

.info-msg {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 150%;
  opacity: 0.8;
  margin: 16px;
  padding: 16px 24px;
  border-radius: 100px;
}

.fadelong-enter-active,
.fadelong-leave-active {
  transition: opacity 0.5s;
}

.fadelong-enter,
.fadelong-leave-to {
  opacity: 0;
}
</style>
