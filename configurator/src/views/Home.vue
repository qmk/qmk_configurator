<template>
  <div>
    <div class="main"><Main /></div>
    <keycodes />
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main';
import Keycodes from '@/components/Keycodes';

export default {
  name: 'home',
  components: {
    Main,
    Keycodes
  }
};
</script>
